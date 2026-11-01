import EventEmitter from './EventEmitter.js';
import { Clock } from 'three';
export default class Time extends EventEmitter {
    constructor() {
        super();
        // Setup
        this.clock = new Clock();
        this.elapsed = 0;
        this.delta = 0;
        this.frame = window.requestAnimationFrame(() => {
            this.tick();
        });
    }
    destroy() {
        cancelAnimationFrame(this.frame);
        this.clock.stop();
    }
    tick() {
        this.delta = Math.min(this.clock.getDelta(), 1 / 30) * 100; // Prevent long frame jump when tab change in browser - limited to 30fps
        this.elapsed = this.clock.getElapsedTime();
        this.trigger('tick');
        this.frame = window.requestAnimationFrame(() => {
            this.tick();
        });
    }
}
