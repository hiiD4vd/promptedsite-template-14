precision highp float;
uniform sampler2D velocity;
varying vec2 uv;
uniform vec2 uMouse;

void main() {
    vec2 uvScaled = uv * 1.5 - (uMouse * 0.25 + 0.25);
    vec2 vel = texture2D(velocity, uv).xy;
    float len = length(vel);
    vel = vel * 0.5 + 0.5;
    
    vec3 color = vec3(vel.x, vel.y, 1.0);
    color = mix(vec3(1.0), color, len);

    float mask = min(smoothstep(0.0, 0.25, uvScaled.x), smoothstep(1.0, 0.75, uvScaled.x));
    mask *= min(smoothstep(0.0, 0.25, uvScaled.y), smoothstep(1.0, 0.75, uvScaled.y));

    gl_FragColor = vec4((1.0 - color), 1.0);
}
