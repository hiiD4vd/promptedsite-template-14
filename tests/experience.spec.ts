import {test,expect} from '@playwright/test';
test('offline loader completes, audio toggles and specifications close with Escape',async({page})=>{
 const errors:string[]=[],external:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',route=>{const url=route.request().url();if(url.startsWith('http')&&!url.startsWith('http://127.0.0.1:3314')){external.push(url);return route.abort();}return route.continue();});
 await page.goto('/');await expect(page.locator('html')).toHaveClass(/is-ready/,{timeout:45000});await page.waitForTimeout(2500);
 await expect(page.locator('canvas')).toHaveCount(1);
 await page.getByRole('button',{name:'Play audio',exact:true}).click();await expect(page.getByRole('button',{name:'Mute audio',exact:true})).toHaveAttribute('aria-pressed','true');
 await page.locator('.indicator-w').click();await expect(page.getByRole('dialog')).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();
 expect(errors).toEqual([]);expect(external).toEqual([]);
});
test('model download failure exits loader with an actionable error',async({page})=>{
 await page.route('**/*.glb',route=>route.abort());await page.goto('/');
 await expect(page.getByRole('alert')).toContainText('could not load',{timeout:15000});
 await expect(page.locator('.loader-w')).not.toBeVisible();
});
test('mobile menu opens and Escape returns focus',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await expect(page.locator('html')).toHaveClass(/is-ready/,{timeout:45000});
 const toggle=page.getByRole('button',{name:'Open main menu'});await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');
 await page.keyboard.press('Escape');await expect(toggle).toHaveAttribute('aria-expanded','false');await expect(toggle).toBeFocused();
});
