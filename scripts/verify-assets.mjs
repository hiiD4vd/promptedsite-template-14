import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const manifest=JSON.parse(await fs.readFile(new URL('../src/config/assets.json',import.meta.url),'utf8'));
let index=0;const files=Object.entries(manifest.files);
await Promise.all(Array.from({length:4},async()=>{while(index<files.length){const [name,meta]=files[index++];const response=await fetch(manifest.baseUrl+'/'+name,{headers:{Origin:'http://localhost:3000'},signal:AbortSignal.timeout(60000)});if(!response.ok)throw Error(name+': HTTP '+response.status);const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length!==meta.bytes||createHash('sha256').update(bytes).digest('hex')!==meta.sha256)throw Error(name+': checksum mismatch');if(response.headers.get('content-type')?.split(';')[0]!==meta.contentType)throw Error(name+': wrong MIME type');if(!['*','http://localhost:3000'].includes(response.headers.get('access-control-allow-origin')))throw Error(name+': CORS missing');}}));
console.log('Verified '+files.length+' CDN assets, hashes, MIME types and CORS.');
