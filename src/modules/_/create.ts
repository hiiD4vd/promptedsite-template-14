// @ts-nocheck
import * as Accordion from '../Accordion';
import * as AudioToggler from '../AudioToggler';
import * as Cursor from '../Cursor';
import * as Outline from '../Outline';
import * as Parallax from '../Parallax';
import * as ScrollController from '@/engine/ScrollController';
import * as loader from '../loader';
import * as menu from '../menu';
import * as progress from '../progress';
import * as scramble from '../scramble';
import * as shapes from '../shapes';
import * as splitlines from '../splitlines';
import * as tags from '../tags';
import * as text from '../text';
import * as viewport from '../viewport';

const modules: Record<string, any> = {
  Accordion,
  AudioToggler,
  Cursor,
  Outline,
  Parallax,
  ScrollController,
  loader,
  menu,
  progress,
  shapes,
  splitlines,
  tags,
  text,
  viewport
};

export function createModules(dataAttribute = "module") {
  return Array.from(document.querySelectorAll(`[data-${dataAttribute}]`))
    .map((element) => {
      const attributeValue = (element as HTMLElement).dataset[dataAttribute];
      if (!attributeValue || attributeValue.toLowerCase() === 'loader') return null;

      // Find module by name (case-insensitive or direct match)
      const modKey = Object.keys(modules).find(k => k.toLowerCase() === attributeValue.toLowerCase());
      if (modKey && modules[modKey]) {
        const mod = modules[modKey];
        const ModuleClass = mod.default || mod[modKey] || Object.values(mod)[0];
        try {
          if (typeof ModuleClass === 'function') {
            return new ModuleClass(element);
          }
        } catch (error) {
          console.warn(`Failed to instantiate ${dataAttribute} ${attributeValue}:`, error);
          return null;
        }
      }
      return null;
    })
    .filter((item) => item !== null);
}
