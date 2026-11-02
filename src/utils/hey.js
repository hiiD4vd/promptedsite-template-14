class SimpleEmitter {
    events;
    constructor() {
        this.events = {};
    }
    /**
     * Register an event handler for a given event.
     * @param {string} event - The name of the event.
     * @param {Function} handler - The callback function to handle the event.
     */
    on(event, handler) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(handler);
    }
    /**
     * Unregister an event handler for a given event.
     * @param {string} event - The name of the event.
     * @param {Function} handler - The callback function to remove.
     */
    off(event, handler) {
        if (!this.events[event])
            return;
        this.events[event] = this.events[event].filter((h) => h !== handler);
    }
    /**
     * Emit an event, calling all registered handlers.
     * @param {string} event - The name of the event.
     * @param {*} data - The data to pass to the event handlers.
     */
    emit(event, data) {
        if (!this.events[event])
            return;
        this.events[event].forEach((handler) => handler(data));
    }
}
class State {
    /**
     * @type {SimpleEmitter}
     * @static
     * @private
     */
    static emitter = new SimpleEmitter();
    /**
     * @type {Object}
     * @static
     * @private
     */
    static state = {};
    /**
     * Create a proxy for an object to enable nested reactivity.
     * @param {Object} obj - The object to create a proxy for.
     * @returns {Proxy} - The proxied object.
     * @private
     */
    static createProxy(obj) {
        return new Proxy(obj, {
            set: function (target, property, value, receiver) {
                State.emitter.emit(property.toString(), value);
                return Reflect.set(target, property, value, receiver);
            },
        });
    }
    /**
     * @type {Proxy}
     * @static
     * @private
     */
    static proxy = new Proxy(State.state, {
        set: function (target, property, value, receiver) {
            if (typeof value === "object" && value !== null) {
                value = State.createProxy(value);
            }
            State.emitter.emit(property.toString(), value);
            return Reflect.set(target, property, value, receiver);
        },
    });
    static getProxy() {
        return this.proxy;
    }
    /**
     * Register an event handler for a given event.
     * @param {string} event - The name of the event.
     * @param {Function} handler - The callback function to handle the event.
     */
    static on(event, handler) {
        this.emitter.on(event, handler);
    }
    /**
     * Unregister an event handler for a given event.
     * @param {string} event - The name of the event.
     * @param {Function} handler - The callback function to remove.
     */
    static off(event, handler) {
        this.emitter.off(event, handler);
    }
}
const proxyHandler = {
    /**
     * Proxy handler to intercept property access.
     * @param {Object} target - The target object.
     * @param {string|symbol} property - The name of the property to get.
     * @returns {*} - The value of the property.
     */
    get(target, property) {
        if (property in State) {
            return State[property].bind(State);
        }
        return target[property];
    },
    /**
     * Proxy handler to intercept property setting.
     * @param {Object} target - The target object.
     * @param {string|symbol} property - The name of the property to set.
     * @param {*} value - The new value of the property.
     * @param {Object} receiver - The proxy or object that initially received the request.
     * @returns {boolean} - True if the property was set successfully, false otherwise.
     */
    set(target, property, value, receiver) {
        return Reflect.set(State.getProxy(), property, value, receiver);
    },
};
const _hey = new Proxy(State.getProxy(), proxyHandler);
export default _hey;
