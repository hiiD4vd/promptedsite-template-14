import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'tests',timeout:60000,use:{baseURL:'http://127.0.0.1:3314',channel:'chrome'},webServer:{command:'node scripts/serve.mjs dist 3314',url:'http://127.0.0.1:3314',reuseExistingServer:true}});
