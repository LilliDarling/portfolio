import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUSPICIOUS_PATHS = [
  '/wp-admin', '/wp-login', '/wp-content', '/wp-includes',
  '/.env', '/.git', '/.htaccess', '/xmlrpc.php',
  '/admin', '/phpmyadmin', '/cgi-bin',
];

const contactRateStore = new Map<string, { count: number; resetTime: number }>();
const CONTACT_MAX_REQUESTS = 5;
const CONTACT_WINDOW_MS = 60 * 60 * 1000;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Log suspicious probes
  if (SUSPICIOUS_PATHS.some(p => pathname.toLowerCase().startsWith(p))) {
    const ip = getClientIp(request);
    console.warn(`[security] Suspicious request: ${pathname} from ${ip}`);
    return new NextResponse(null, { status: 404 });
  }

  // Edge-level rate limiting for contact API
  if (pathname === '/api/contact' && request.method === 'POST') {
    const ip = getClientIp(request);
    const key = `mw:contact:${ip}`;
    const now = Date.now();
    const entry = contactRateStore.get(key);

    // Cleanup expired entries periodically
    if (contactRateStore.size > 1000) {
      for (const [k, v] of contactRateStore) {
        if (now > v.resetTime) contactRateStore.delete(k);
      }
    }

    if (entry && now <= entry.resetTime) {
      if (entry.count >= CONTACT_MAX_REQUESTS) {
        const resetIn = Math.ceil((entry.resetTime - now) / 1000);
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          {
            status: 429,
            headers: {
              'Retry-After': String(resetIn),
              'X-RateLimit-Remaining': '0',
            },
          }
        );
      }
      entry.count += 1;
    } else {
      contactRateStore.set(key, { count: 1, resetTime: now + CONTACT_WINDOW_MS });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)',
  ],
};
