precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Noise function
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// Blend colors
vec3 blend(vec3 base, vec3 blend) {
    return mix(base, blend, 0.5);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = u_mouse/u_resolution.xy;
    
    // Create multiple noise layers
    float n1 = snoise(st + u_time * 0.1) * 0.5 + 0.5;
    float n2 = snoise(st * 2.0 - u_time * 0.05) * 0.5 + 0.5;
    float n3 = snoise(st * 4.0 + u_time * 0.15) * 0.5 + 0.5;
    
    // Create color blobs
    vec3 color1 = vec3(0.706, 0.565, 1.0); // #B490FF
    vec3 color2 = vec3(0.412, 0.392, 0.969); // #6964F7
    vec3 color3 = vec3(0.165, 0.165, 0.196); // #2A2A32
    
    // Blend colors based on noise
    vec3 finalColor = blend(
        blend(color1 * n1, color2 * n2),
        color3 * n3
    );
    
    // Add mouse spotlight
    float spotlight = smoothstep(0.5, 0.0, length(st - mouse));
    finalColor = mix(finalColor, color1, spotlight * 0.3);
    
    gl_FragColor = vec4(finalColor, 1.0);
}