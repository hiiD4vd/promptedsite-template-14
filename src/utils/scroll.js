import Lenis from 'lenis';
import gsap from '@/utils/gsap';
const SCROLL_CONFIG = {
    autoResize: true,
    // infinite: true,
    syncTouch: true,
    syncTouchLerp: 0.1,
    // wrapper: document.body,
    // content: document.body,
    // lerp: 0.025,
    wheelMultiplier: 0.25,
    duration: 3,
    // easing: (x: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
    // smoothWheel: true,
    // smoothTouch: false,
    // touchMultiplier: 2,
    // touchInertiaMultiplier: 2,
};
class _Scroll extends Lenis {
    #subscribers = [];
    #resizeObserver = null;
    y;
    max;
    speed;
    percent;
    constructor() {
        super(SCROLL_CONFIG);
        this.y = window.scrollY || 0;
        this.max = window.innerHeight;
        this.speed = 0;
        this.percent = 0;
        this.#init();
    }
    #init() {
        this.percent = this.y / (document.body.scrollHeight - this.max);
        this.on('scroll', this.#handleScroll);
        gsap.ticker.add((time) => this.raf(time * 1000));
        this.observeHeight(() => {
            if (typeof this.resize === 'function') {
                this.resize();
            }
        });
    }
    #handleScroll = ({ scroll, limit, velocity, progress }) => {
        this.y = scroll;
        this.max = limit;
        this.speed = velocity;
        this.percent = progress;
        // console.log("scroll", scroll, limit, velocity, progress);
        this.#subscribers.forEach((subscriber) => {
            subscriber.fn({ scroll, limit, velocity, progress });
            // console.log("subscriber scroll", subscriber, scroll, limit, velocity, progress);
        });
    };
    subscribe(fn, priority = 5, id = Symbol()) {
        const subscriber = { fn, id, priority };
        const index = this.#subscribers.findIndex((sub) => sub.priority <= priority);
        if (index === -1) {
            this.#subscribers.push(subscriber);
        }
        else {
            this.#subscribers.splice(index, 0, subscriber);
        }
        return () => this.#unsubscribe(id);
    }
    #unsubscribe(id) {
        this.#subscribers = this.#subscribers.filter((subscriber) => subscriber.id !== id);
    }
    toTop() {
        this.scrollTo(0, { immediate: true, force: true });
    }
    observeHeight(callback) {
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
        this.#resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                callback(entry.target.scrollHeight);
            }
        });
        this.#resizeObserver.observe(document.body);
        return () => this.#resizeObserver?.disconnect();
    }
}
export const Scroll = new _Scroll();
