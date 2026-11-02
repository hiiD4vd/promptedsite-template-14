export { Track } from "./track";
export { Observe } from "./observe";
export { createModules } from "./create";
export function computeParams(element, a) {
    const delay = element.dataset.delay;
    if (delay)
        a.delay += parseFloat(delay);
}
