uniform float u_time;
uniform sampler2D u_cosmicTexture;
uniform sampler2D u_starTexture;
uniform float u_cosmicIntensity;
uniform float u_swirlSpeed;
uniform float u_glowStrength;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  // Time-based animation
  float time = u_time * u_swirlSpeed;
  
  // Create subtle swirling UV coordinates
  vec2 swirlUv = vUv;
  float angle = time * 0.2 + length(vUv - 0.5) * 1.5;
  float cosAngle = cos(angle);
  float sinAngle = sin(angle);
  
  // Apply gentle swirl transformation
  vec2 centeredUv = vUv - 0.5;
  swirlUv.x = centeredUv.x * cosAngle - centeredUv.y * sinAngle + 0.5;
  swirlUv.y = centeredUv.x * sinAngle + centeredUv.y * cosAngle + 0.5;
  
  // Sample galaxy texture - encircling effect using radial coordinates
  vec2 center = vec2(0.5, 0.5);
  vec2 toCenter = vUv - center;
  float galaxyAngle = atan(toCenter.y, toCenter.x);
  float radius = length(toCenter);
  
  // Create radial UV for galaxy encircling effect
  vec2 galaxyUv = vec2(galaxyAngle / (2.0 * 3.14159) + 0.5, radius * 2.0);
  galaxyUv += vec2(time * 0.02, 0.0); // Slow rotation
  vec4 galaxyColor = texture2D(u_cosmicTexture, galaxyUv);
  
  // Sample stars texture directly on petals
  vec4 starColor = texture2D(u_starTexture, vUv * 2.0);
  
  // Create petal mask - stars should appear more on outer areas (petals)
  float petalMask = smoothstep(0.2, 0.6, radius);
  
  // Galaxy backdrop intensity - stronger at edges
  float galaxyIntensity = smoothstep(0.1, 0.8, radius);
  
  // Add high-frequency detail for sharpness
  float sharpDetail = sin(vUv.x * 50.0) * sin(vUv.y * 50.0) * 0.05;
  float mediumDetail = sin(vUv.x * 15.0) * sin(vUv.y * 15.0) * 0.1;
  
  // Combine textures more simply - make textures more visible
  vec4 finalColor = vec4(0.0);
  
  // Add galaxy background (encircling effect)
  finalColor.rgb += galaxyColor.rgb * galaxyIntensity * u_cosmicIntensity * 0.8;
  
  // Add stars on petals
  finalColor.rgb += starColor.rgb * petalMask * u_cosmicIntensity * 0.6;
  
  // Add base color for flower when cosmic intensity is low
  vec3 baseFlowerColor = vec3(0.3, 0.2, 0.4);
  finalColor.rgb += baseFlowerColor * (1.0 - u_cosmicIntensity * 0.7);

  // Apply detail for sharpness
  finalColor.rgb += sharpDetail + mediumDetail;
  
  // Crystal effect - add some reflective highlights
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(-vPosition);
  
  // Basic shading
  float basicShading = max(0.7, dot(normal, normalize(vec3(0.0, 0.0, 1.0))));
  finalColor.rgb *= basicShading;
  
  // Crystal reflections
  float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 2.0);
  finalColor.rgb += fresnel * vec3(0.3, 0.6, 1.0) * 0.3;
  
  // Brighten overall
  finalColor.rgb += vec3(0.2, 0.1, 0.3);
  
  // Sharp contrast enhancement
  finalColor.rgb = pow(finalColor.rgb, vec3(1.3));
  
  // Make completely opaque
  finalColor.a = 1.0;
  
  gl_FragColor = finalColor;
}