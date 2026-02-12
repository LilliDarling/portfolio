const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email) && email.length <= 254;
}

const NAME_REGEX = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s'.\-]+$/;

export function isValidName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();
  if (trimmed.length < 1) return { valid: false, error: 'Name is required' };
  if (trimmed.length > 100) return { valid: false, error: 'Name must be under 100 characters' };
  if (!NAME_REGEX.test(trimmed)) return { valid: false, error: 'Name contains invalid characters' };
  return { valid: true };
}

export function isValidMessage(message: string): { valid: boolean; error?: string } {
  const trimmed = message.trim();
  if (trimmed.length < 10) return { valid: false, error: 'Message must be at least 10 characters' };
  if (trimmed.length > 5000) return { valid: false, error: 'Message must be under 5000 characters' };
  return { valid: true };
}

export function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, '').replace(/[<>]/g, '');
}

const ETH_ADDRESS_REGEX = /^0x[0-9a-fA-F]{40}$/;

export function isValidEthAddress(address: string): boolean {
  return ETH_ADDRESS_REGEX.test(address);
}

const BASE58_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export function isValidSolAddress(address: string): boolean {
  return BASE58_REGEX.test(address);
}

const MIN_AMOUNT = 0.0001;
const MAX_AMOUNT = 10;

export function isValidCryptoAmount(amount: string): { valid: boolean; error?: string } {
  const num = parseFloat(amount);
  if (isNaN(num) || !isFinite(num)) return { valid: false, error: 'Invalid amount' };
  if (num < MIN_AMOUNT) return { valid: false, error: `Minimum amount is ${MIN_AMOUNT}` };
  if (num > MAX_AMOUNT) return { valid: false, error: `Maximum amount is ${MAX_AMOUNT}` };
  return { valid: true };
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  sanitized?: ContactFormData;
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {};

  const nameResult = isValidName(data.name);
  if (!nameResult.valid) errors.name = nameResult.error!;

  if (!isValidEmail(data.email)) errors.email = 'Invalid email address';

  const messageResult = isValidMessage(data.message);
  if (!messageResult.valid) errors.message = messageResult.error!;

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      name: stripHtmlTags(data.name.trim()),
      email: data.email.trim().toLowerCase(),
      message: stripHtmlTags(data.message.trim()),
    },
  };
}
