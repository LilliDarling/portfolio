// basicVertex.glsl
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
uniform float u_time;
uniform float u_pulseFactor;

void main() {
    vUv = uv; // Pass UV coordinates to fragment shader
    vPosition = position;
    vNormal = normal;

    // Optional: Subtle vertex displacement for a "breathing" effect
    vec3 animatedPosition = position;
    float displacement = sin(u_time * 2.0) * u_pulseFactor;
    animatedPosition += normal * displacement; // Push vertices along their normal

    gl_Position = projectionMatrix * modelViewMatrix * vec4(animatedPosition, 1.0);
}