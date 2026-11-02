export class ObserverManager {
    static instance;
    groups = [];
    constructor() { }
    static getInstance() {
        if (!ObserverManager.instance) {
            ObserverManager.instance = new ObserverManager();
        }
        return ObserverManager.instance;
    }
    configsMatch(config1, config2) {
        return (config1.root === config2.root &&
            config1.rootMargin === config2.rootMargin &&
            config1.threshold === config2.threshold);
    }
    handleIntersection(entries) {
        entries.forEach((entry) => {
            const group = this.groups.find((g) => {
                return Array.from(g.elements.keys()).includes(entry.target);
            });
            if (!group)
                return;
            const element = entry.target;
            const elementData = group.elements.get(element);
            if (!elementData)
                return;
            const { isIntersecting, intersectionRatio, boundingClientRect } = entry;
            const threshold = group.config.threshold || 0.1;
            let direction = -1;
            if (elementData.lastDirection !== undefined) {
                direction = isIntersecting
                    ? boundingClientRect.top > 0
                        ? 1
                        : -1
                    : boundingClientRect.top > 0
                        ? -1
                        : 1;
            }
            elementData.lastDirection = direction;
            if (intersectionRatio === 0) {
                elementData.callbacks.isOut?.({ entry, direction });
                elementData.callbacks.callback?.({ entry, direction, isIn: false });
            }
            else if (intersectionRatio >= threshold) {
                elementData.callbacks.isIn?.({ entry, direction });
                elementData.callbacks.callback?.({ entry, direction, isIn: true });
                if (elementData.once) {
                    this.removeElement(element);
                }
            }
        });
    }
    addElement(element, config, callbacks) {
        this.removeElement(element);
        let group = this.groups.find((g) => this.configsMatch(g.config, config));
        if (!group) {
            const observer = new IntersectionObserver((entries) => this.handleIntersection(entries), {
                ...config,
                threshold: [0, config.threshold || 0.1],
            });
            group = {
                config,
                observer,
                elements: new Map(),
            };
            this.groups.push(group);
        }
        group.elements.set(element, {
            callbacks,
            once: config.once || false,
            lastDirection: undefined,
        });
        group.observer.observe(element);
        return group;
    }
    removeElement(element) {
        const group = this.groups.find((g) => g.elements.has(element));
        if (!group)
            return;
        group.observer.unobserve(element);
        group.elements.delete(element);
        if (group.elements.size === 0) {
            group.observer.disconnect();
            this.groups = this.groups.filter((g) => g !== group);
        }
    }
}
export class Observe {
    element;
    #config;
    isIn(_data) { }
    isOut(_data) { }
    inView;
    callback;
    constructor(element, config = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
        autoStart: false,
        once: false,
        callback: null,
    }) {
        this.element = element;
        this.#config = config;
        this.inView = false;
        this.callback = config.callback;
    }
    start() {
        ObserverManager.getInstance().addElement(this.element, this.#config, {
            isIn: (data) => {
                this.inView = true;
                this.isIn?.(data);
            },
            isOut: (data) => {
                this.inView = false;
                this.isOut?.(data);
            },
            callback: this.callback,
        });
    }
    stop() {
        ObserverManager.getInstance().removeElement(this.element);
    }
    destroy() {
        this.stop();
    }
    transitionOut() {
        this.destroy();
    }
}
