import { clientRect } from "@/utils/client-rect";
import { clamp, map } from "@/utils/math";
import { Observe } from "./observe";
import { Scroll } from "@/utils/scroll";
import { Resize } from "@/utils/subscribable";
const DEFAULT_CONFIG = {
    bounds: [0, 1],
    top: "bottom", // 0%
    bottom: "top", // 100%
    callback: undefined,
    cssVariable: "--progress",
};
export class Track extends Observe {
    value = 0;
    #init = false;
    bounds;
    config;
    resize;
    handleScroll;
    #scrollSub;
    #resizeSub;
    constructor(element, config = {}) {
        super(element, {
            autoStart: false,
            once: false,
            threshold: 0,
        });
        this.element = element;
        // Parse data-scroll-offset attribute if it exists
        const dataOffsets = this.#parseDataScrollOffset();
        this.config = {
            ...DEFAULT_CONFIG,
            top: dataOffsets?.top ?? config.top ?? DEFAULT_CONFIG.top,
            bottom: dataOffsets?.bottom ?? config.bottom ?? DEFAULT_CONFIG.bottom,
            bounds: config.bounds ?? DEFAULT_CONFIG.bounds,
            callback: config.callback,
            cssVariable: config.cssVariable,
        };
        this.#updateCssVariable(0);
        this.#resize();
        this.#scrollSub = Scroll.subscribe(this.#handleScroll);
        this.#resizeSub = Resize.subscribe(this.#resize);
        this.#handleScroll();
        this.#init = true;
    }
    // Parse data-scroll-offset attribute
    #parseDataScrollOffset() {
        const offsetString = this.element.getAttribute('data-scroll-offset');
        if (!offsetString)
            return null;
        const offsets = offsetString.split(',').map(s => s.trim());
        if (offsets.length !== 2)
            return null;
        const top = parseFloat(offsets[0]);
        const bottom = parseFloat(offsets[1]);
        if (isNaN(top) || isNaN(bottom))
            return null;
        return { top, bottom };
    }
    triggerResize() {
        this.#resize();
    }
    #resize = () => {
        this.bounds = computeBounds(this.element, this.config);
        this.resize?.(this.bounds);
        this.#handleScroll();
    };
    #handleScroll = () => {
        if (!this.inView || !this.#init)
            return;
        this.value = clamp(this.config.bounds[0], this.config.bounds[1], map(Scroll.y, this.bounds.top, this.bounds.bottom, this.config.bounds[0], this.config.bounds[1]));
        this.#updateCssVariable(this.value);
        this.handleScroll?.(this.value);
        this.config.callback?.(this.value);
    };
    #updateCssVariable(value) {
        const varName = this.config.cssVariable || "--progress";
        this.element.style.setProperty(varName, String(value));
    }
    destroy() {
        this.config.callback = undefined;
        this.#scrollSub();
        this.#resizeSub();
        const varName = this.config.cssVariable || "--progress";
        this.element.style.removeProperty(varName);
        super.destroy();
    }
    transitionOut() {
        this.destroy();
    }
}
function positionToPercentage(position) {
    if (typeof position === 'number') {
        // No longer clamping to 0-100, allowing any number
        return position / 100;
    }
    switch (position) {
        case 'top': return 1; // 100%
        case 'center': return 0.5; // 50%
        case 'bottom': return 0; // 0%
        default: return 0;
    }
}
function computeBounds(el, config) {
    const bounds = clientRect(el);
    const { top: topPos, bottom: bottomPos, wh } = bounds;
    const topPercentage = positionToPercentage(config.top);
    const bottomPercentage = positionToPercentage(config.bottom);
    // Calculate offsets - now supports values beyond viewport height
    bounds.top = topPos - (wh * (1 - topPercentage));
    bounds.bottom = bottomPos - (wh * (1 - bottomPercentage));
    return bounds;
}
