if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise(async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()})),s.then(()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]})},s=(s,r)=>{Promise.all(s.map(e)).then(e=>r(1===e.length?e[0]:e))},r={require:Promise.resolve(s)};self.define=(s,f,a)=>{r[s]||(r[s]=Promise.resolve().then(()=>{let r={};const o={uri:location.origin+s.slice(1)};return Promise.all(f.map(s=>{switch(s){case"exports":return r;case"module":return o;default:return e(s)}})).then(e=>{const s=a(...e);return r.default||(r.default=s),r})}))}}define("./sw.js",["./workbox-43de6241"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"/assets/fonts/fa-brands-400.eot",revision:"0fabb6606be4c45acfeedd115d0caca4"},{url:"/assets/fonts/fa-brands-400.ttf",revision:"085b1dd8427dbeff10bd55410915a3f6"},{url:"/assets/fonts/fa-brands-400.woff",revision:"dc0bd022735ed218df547742a1b2f172"},{url:"/assets/fonts/fa-brands-400.woff2",revision:"cac68c831145804808381a7032fdc7c2"},{url:"/assets/fonts/fa-regular-400.eot",revision:"ad3a7c0d77e09602f4ab73db3660ffd8"},{url:"/assets/fonts/fa-regular-400.ttf",revision:"1a78af4105d4d56e6c34f76dc70bf1bc"},{url:"/assets/fonts/fa-regular-400.woff",revision:"05b53beb21e3ef13d28244545977152d"},{url:"/assets/fonts/fa-regular-400.woff2",revision:"3a3398a6ef60fc64eacf45665958342e"},{url:"/assets/fonts/fa-solid-900.eot",revision:"89bd2e38475e441a5cd70f663f921d61"},{url:"/assets/fonts/fa-solid-900.ttf",revision:"781e85bb50c8e8301c30de56b31b1f04"},{url:"/assets/fonts/fa-solid-900.woff",revision:"ee09ad7553b8ad3d81150d609d5341a0"},{url:"/assets/fonts/fa-solid-900.woff2",revision:"c500da19d776384ba69573ae6fe274e7"},{url:"/main.bundle-222e571f035e385d67f1.js",revision:"3813d3f171ec14f6bb8d200e982541ef"},{url:"/styles/main.css",revision:"1b6df5ea24496986b9f41a801d47d913"}],{}),e.registerRoute(/\.(?:png|jpg|jpeg|svg)$/,new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:10,purgeOnQuotaError:!0})]}),"GET")}));
