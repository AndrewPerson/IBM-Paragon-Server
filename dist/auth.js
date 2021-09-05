(()=>{var e={669:(e,t,r)=>{e.exports=r(609)},970:(e,t,r)=>{"use strict";var s=r(867),n=r(26),o=r(97),i=r(327),a=r(685),c=r(687),u=r(938).http,p=r(938).https,f=r(310),d=r(796),h=r(593),l=r(61),m=r(481),g=/https:?/;function y(e,t,r){if(e.hostname=t.host,e.host=t.host,e.port=t.port,e.path=r,t.auth){var s=Buffer.from(t.auth.username+":"+t.auth.password,"utf8").toString("base64");e.headers["Proxy-Authorization"]="Basic "+s}e.beforeRedirect=function(e){e.headers.host=e.host,y(e,t,e.href)}}e.exports=function(e){return new Promise((function(t,r){var v=function(e){t(e)},C=function(e){r(e)},b=e.data,x=e.headers;if(x["User-Agent"]||x["user-agent"]||(x["User-Agent"]="axios/"+h.version),b&&!s.isStream(b)){if(Buffer.isBuffer(b));else if(s.isArrayBuffer(b))b=Buffer.from(new Uint8Array(b));else{if(!s.isString(b))return C(l("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",e));b=Buffer.from(b,"utf-8")}x["Content-Length"]=b.length}var w=void 0;e.auth&&(w=(e.auth.username||"")+":"+(e.auth.password||""));var _=o(e.baseURL,e.url),R=f.parse(_),E=R.protocol||"http:";if(!w&&R.auth){var O=R.auth.split(":");w=(O[0]||"")+":"+(O[1]||"")}w&&delete x.Authorization;var k=g.test(E),F=k?e.httpsAgent:e.httpAgent,A={path:i(R.path,e.params,e.paramsSerializer).replace(/^\?/,""),method:e.method.toUpperCase(),headers:x,agent:F,agents:{http:e.httpAgent,https:e.httpsAgent},auth:w};e.socketPath?A.socketPath=e.socketPath:(A.hostname=R.hostname,A.port=R.port);var T,j=e.proxy;if(!j&&!1!==j){var B=E.slice(0,-1)+"_proxy",S=process.env[B]||process.env[B.toUpperCase()];if(S){var q=f.parse(S),L=process.env.no_proxy||process.env.NO_PROXY,N=!0;if(L&&(N=!L.split(",").map((function(e){return e.trim()})).some((function(e){return!!e&&("*"===e||"."===e[0]&&R.hostname.substr(R.hostname.length-e.length)===e||R.hostname===e)}))),N&&(j={host:q.hostname,port:q.port,protocol:q.protocol},q.auth)){var U=q.auth.split(":");j.auth={username:U[0],password:U[1]}}}}j&&(A.headers.host=R.hostname+(R.port?":"+R.port:""),y(A,j,E+"//"+R.hostname+(R.port?":"+R.port:"")+A.path));var P=k&&(!j||g.test(j.protocol));e.transport?T=e.transport:0===e.maxRedirects?T=P?c:a:(e.maxRedirects&&(A.maxRedirects=e.maxRedirects),T=P?p:u),e.maxBodyLength>-1&&(A.maxBodyLength=e.maxBodyLength);var D=T.request(A,(function(t){if(!D.aborted){var r=t,o=t.req||D;if(204!==t.statusCode&&"HEAD"!==o.method&&!1!==e.decompress)switch(t.headers["content-encoding"]){case"gzip":case"compress":case"deflate":r=r.pipe(d.createUnzip()),delete t.headers["content-encoding"]}var i={status:t.statusCode,statusText:t.statusMessage,headers:t.headers,config:e,request:o};if("stream"===e.responseType)i.data=r,n(v,C,i);else{var a=[];r.on("data",(function(t){a.push(t),e.maxContentLength>-1&&Buffer.concat(a).length>e.maxContentLength&&(r.destroy(),C(l("maxContentLength size of "+e.maxContentLength+" exceeded",e,null,o)))})),r.on("error",(function(t){D.aborted||C(m(t,e,null,o))})),r.on("end",(function(){var t=Buffer.concat(a);"arraybuffer"!==e.responseType&&(t=t.toString(e.responseEncoding),e.responseEncoding&&"utf8"!==e.responseEncoding||(t=s.stripBOM(t))),i.data=t,n(v,C,i)}))}}}));D.on("error",(function(t){D.aborted&&"ERR_FR_TOO_MANY_REDIRECTS"!==t.code||C(m(t,e,null,D))})),e.timeout&&D.setTimeout(e.timeout,(function(){D.abort(),C(l("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",D))})),e.cancelToken&&e.cancelToken.promise.then((function(e){D.aborted||(D.abort(),C(e))})),s.isStream(b)?b.on("error",(function(t){C(m(t,e,null,D))})).pipe(D):D.end(b)}))}},448:(e,t,r)=>{"use strict";var s=r(867),n=r(26),o=r(372),i=r(327),a=r(97),c=r(109),u=r(985),p=r(61);e.exports=function(e){return new Promise((function(t,r){var f=e.data,d=e.headers;s.isFormData(f)&&delete d["Content-Type"];var h=new XMLHttpRequest;if(e.auth){var l=e.auth.username||"",m=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";d.Authorization="Basic "+btoa(l+":"+m)}var g=a(e.baseURL,e.url);if(h.open(e.method.toUpperCase(),i(g,e.params,e.paramsSerializer),!0),h.timeout=e.timeout,h.onreadystatechange=function(){if(h&&4===h.readyState&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))){var s="getAllResponseHeaders"in h?c(h.getAllResponseHeaders()):null,o={data:e.responseType&&"text"!==e.responseType?h.response:h.responseText,status:h.status,statusText:h.statusText,headers:s,config:e,request:h};n(t,r,o),h=null}},h.onabort=function(){h&&(r(p("Request aborted",e,"ECONNABORTED",h)),h=null)},h.onerror=function(){r(p("Network Error",e,null,h)),h=null},h.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(p(t,e,"ECONNABORTED",h)),h=null},s.isStandardBrowserEnv()){var y=(e.withCredentials||u(g))&&e.xsrfCookieName?o.read(e.xsrfCookieName):void 0;y&&(d[e.xsrfHeaderName]=y)}if("setRequestHeader"in h&&s.forEach(d,(function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete d[t]:h.setRequestHeader(t,e)})),s.isUndefined(e.withCredentials)||(h.withCredentials=!!e.withCredentials),e.responseType)try{h.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&h.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){h&&(h.abort(),r(e),h=null)})),f||(f=null),h.send(f)}))}},609:(e,t,r)=>{"use strict";var s=r(867),n=r(849),o=r(321),i=r(185);function a(e){var t=new o(e),r=n(o.prototype.request,t);return s.extend(r,o.prototype,t),s.extend(r,t),r}var c=a(r(655));c.Axios=o,c.create=function(e){return a(i(c.defaults,e))},c.Cancel=r(263),c.CancelToken=r(972),c.isCancel=r(502),c.all=function(e){return Promise.all(e)},c.spread=r(713),c.isAxiosError=r(268),e.exports=c,e.exports.default=c},263:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},972:(e,t,r)=>{"use strict";var s=r(263);function n(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new s(e),t(r.reason))}))}n.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},n.source=function(){var e;return{token:new n((function(t){e=t})),cancel:e}},e.exports=n},502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,r)=>{"use strict";var s=r(867),n=r(327),o=r(782),i=r(572),a=r(185);function c(e){this.defaults=e,this.interceptors={request:new o,response:new o}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=a(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[i,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},c.prototype.getUri=function(e){return e=a(this.defaults,e),n(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},s.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,r){return this.request(a(r||{},{method:e,url:t,data:(r||{}).data}))}})),s.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,r,s){return this.request(a(s||{},{method:e,url:t,data:r}))}})),e.exports=c},782:(e,t,r)=>{"use strict";var s=r(867);function n(){this.handlers=[]}n.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},n.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},n.prototype.forEach=function(e){s.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=n},97:(e,t,r)=>{"use strict";var s=r(793),n=r(303);e.exports=function(e,t){return e&&!s(t)?n(e,t):t}},61:(e,t,r)=>{"use strict";var s=r(481);e.exports=function(e,t,r,n,o){var i=new Error(e);return s(i,t,r,n,o)}},572:(e,t,r)=>{"use strict";var s=r(867),n=r(527),o=r(502),i=r(655);function a(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return a(e),e.headers=e.headers||{},e.data=n(e.data,e.headers,e.transformRequest),e.headers=s.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),s.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||i.adapter)(e).then((function(t){return a(e),t.data=n(t.data,t.headers,e.transformResponse),t}),(function(t){return o(t)||(a(e),t&&t.response&&(t.response.data=n(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function(e,t,r,s,n){return e.config=t,r&&(e.code=r),e.request=s,e.response=n,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},185:(e,t,r)=>{"use strict";var s=r(867);e.exports=function(e,t){t=t||{};var r={},n=["url","method","data"],o=["headers","auth","proxy","params"],i=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],a=["validateStatus"];function c(e,t){return s.isPlainObject(e)&&s.isPlainObject(t)?s.merge(e,t):s.isPlainObject(t)?s.merge({},t):s.isArray(t)?t.slice():t}function u(n){s.isUndefined(t[n])?s.isUndefined(e[n])||(r[n]=c(void 0,e[n])):r[n]=c(e[n],t[n])}s.forEach(n,(function(e){s.isUndefined(t[e])||(r[e]=c(void 0,t[e]))})),s.forEach(o,u),s.forEach(i,(function(n){s.isUndefined(t[n])?s.isUndefined(e[n])||(r[n]=c(void 0,e[n])):r[n]=c(void 0,t[n])})),s.forEach(a,(function(s){s in t?r[s]=c(e[s],t[s]):s in e&&(r[s]=c(void 0,e[s]))}));var p=n.concat(o).concat(i).concat(a),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===p.indexOf(e)}));return s.forEach(f,u),r}},26:(e,t,r)=>{"use strict";var s=r(61);e.exports=function(e,t,r){var n=r.config.validateStatus;r.status&&n&&!n(r.status)?t(s("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},527:(e,t,r)=>{"use strict";var s=r(867);e.exports=function(e,t,r){return s.forEach(r,(function(r){e=r(e,t)})),e}},655:(e,t,r)=>{"use strict";var s=r(867),n=r(16),o={"Content-Type":"application/x-www-form-urlencoded"};function i(e,t){!s.isUndefined(e)&&s.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a,c={adapter:("undefined"!=typeof XMLHttpRequest?a=r(448):"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process)&&(a=r(970)),a),transformRequest:[function(e,t){return n(t,"Accept"),n(t,"Content-Type"),s.isFormData(e)||s.isArrayBuffer(e)||s.isBuffer(e)||s.isStream(e)||s.isFile(e)||s.isBlob(e)?e:s.isArrayBufferView(e)?e.buffer:s.isURLSearchParams(e)?(i(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):s.isObject(e)?(i(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};s.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),s.forEach(["post","put","patch"],(function(e){c.headers[e]=s.merge(o)})),e.exports=c},849:e=>{"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),s=0;s<r.length;s++)r[s]=arguments[s];return e.apply(t,r)}}},327:(e,t,r)=>{"use strict";var s=r(867);function n(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var o;if(r)o=r(t);else if(s.isURLSearchParams(t))o=t.toString();else{var i=[];s.forEach(t,(function(e,t){null!=e&&(s.isArray(e)?t+="[]":e=[e],s.forEach(e,(function(e){s.isDate(e)?e=e.toISOString():s.isObject(e)&&(e=JSON.stringify(e)),i.push(n(t)+"="+n(e))})))})),o=i.join("&")}if(o){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+o}return e}},303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},372:(e,t,r)=>{"use strict";var s=r(867);e.exports=s.isStandardBrowserEnv()?{write:function(e,t,r,n,o,i){var a=[];a.push(e+"="+encodeURIComponent(t)),s.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),s.isString(n)&&a.push("path="+n),s.isString(o)&&a.push("domain="+o),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},793:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},268:e=>{"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},985:(e,t,r)=>{"use strict";var s=r(867);e.exports=s.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function n(e){var s=e;return t&&(r.setAttribute("href",s),s=r.href),r.setAttribute("href",s),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=n(window.location.href),function(t){var r=s.isString(t)?n(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},16:(e,t,r)=>{"use strict";var s=r(867);e.exports=function(e,t){s.forEach(e,(function(r,s){s!==t&&s.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[s])}))}},109:(e,t,r)=>{"use strict";var s=r(867),n=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,o,i={};return e?(s.forEach(e.split("\n"),(function(e){if(o=e.indexOf(":"),t=s.trim(e.substr(0,o)).toLowerCase(),r=s.trim(e.substr(o+1)),t){if(i[t]&&n.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([r]):i[t]?i[t]+", "+r:r}})),i):i}},713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},867:(e,t,r)=>{"use strict";var s=r(849),n=Object.prototype.toString;function o(e){return"[object Array]"===n.call(e)}function i(e){return void 0===e}function a(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==n.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===n.call(e)}function p(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),o(e))for(var r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.call(null,e[n],n,e)}e.exports={isArray:o,isArrayBuffer:function(e){return"[object ArrayBuffer]"===n.call(e)},isBuffer:function(e){return null!==e&&!i(e)&&null!==e.constructor&&!i(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isPlainObject:c,isUndefined:i,isDate:function(e){return"[object Date]"===n.call(e)},isFile:function(e){return"[object File]"===n.call(e)},isBlob:function(e){return"[object Blob]"===n.call(e)},isFunction:u,isStream:function(e){return a(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:p,merge:function e(){var t={};function r(r,s){c(t[s])&&c(r)?t[s]=e(t[s],r):c(r)?t[s]=e({},r):o(r)?t[s]=r.slice():t[s]=r}for(var s=0,n=arguments.length;s<n;s++)p(arguments[s],r);return t},extend:function(e,t,r){return p(t,(function(t,n){e[n]=r&&"function"==typeof t?s(t,r):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},227:(e,t,r)=>{t.formatArgs=function(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;const r="color: "+this.color;t.splice(1,0,r,"color: inherit");let s=0,n=0;t[0].replace(/%[a-zA-Z%]/g,(e=>{"%%"!==e&&(s++,"%c"===e&&(n=s))})),t.splice(n,0,r)},t.save=function(e){try{e?t.storage.setItem("debug",e):t.storage.removeItem("debug")}catch(e){}},t.load=function(){let e;try{e=t.storage.getItem("debug")}catch(e){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e},t.useColors=function(){return!("undefined"==typeof window||!window.process||"renderer"!==window.process.type&&!window.process.__nwjs)||("undefined"==typeof navigator||!navigator.userAgent||!navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},t.storage=function(){try{return localStorage}catch(e){}}(),t.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.log=console.debug||console.log||(()=>{}),e.exports=r(447)(t);const{formatters:s}=e.exports;s.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}},447:(e,t,r)=>{e.exports=function(e){function t(e){let r,n,o,i=null;function a(...e){if(!a.enabled)return;const s=a,n=Number(new Date),o=n-(r||n);s.diff=o,s.prev=r,s.curr=n,r=n,e[0]=t.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let i=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,((r,n)=>{if("%%"===r)return"%";i++;const o=t.formatters[n];if("function"==typeof o){const t=e[i];r=o.call(s,t),e.splice(i,1),i--}return r})),t.formatArgs.call(s,e),(s.log||t.log).apply(s,e)}return a.namespace=e,a.useColors=t.useColors(),a.color=t.selectColor(e),a.extend=s,a.destroy=t.destroy,Object.defineProperty(a,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==i?i:(n!==t.namespaces&&(n=t.namespaces,o=t.enabled(e)),o),set:e=>{i=e}}),"function"==typeof t.init&&t.init(a),a}function s(e,r){const s=t(this.namespace+(void 0===r?":":r)+e);return s.log=this.log,s}function n(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return t.debug=t,t.default=t,t.coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){const e=[...t.names.map(n),...t.skips.map(n).map((e=>"-"+e))].join(",");return t.enable(""),e},t.enable=function(e){let r;t.save(e),t.namespaces=e,t.names=[],t.skips=[];const s=("string"==typeof e?e:"").split(/[\s,]+/),n=s.length;for(r=0;r<n;r++)s[r]&&("-"===(e=s[r].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")))},t.enabled=function(e){if("*"===e[e.length-1])return!0;let r,s;for(r=0,s=t.skips.length;r<s;r++)if(t.skips[r].test(e))return!1;for(r=0,s=t.names.length;r<s;r++)if(t.names[r].test(e))return!0;return!1},t.humanize=r(824),t.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(e).forEach((r=>{t[r]=e[r]})),t.names=[],t.skips=[],t.formatters={},t.selectColor=function(e){let r=0;for(let t=0;t<e.length;t++)r=(r<<5)-r+e.charCodeAt(t),r|=0;return t.colors[Math.abs(r)%t.colors.length]},t.enable(t.load()),t}},158:(e,t,r)=>{"undefined"==typeof process||"renderer"===process.type||!0===process.browser||process.__nwjs?e.exports=r(227):e.exports=r(39)},39:(e,t,r)=>{const s=r(224),n=r(837);t.init=function(e){e.inspectOpts={};const r=Object.keys(t.inspectOpts);for(let s=0;s<r.length;s++)e.inspectOpts[r[s]]=t.inspectOpts[r[s]]},t.log=function(...e){return process.stderr.write(n.format(...e)+"\n")},t.formatArgs=function(r){const{namespace:s,useColors:n}=this;if(n){const t=this.color,n="[3"+(t<8?t:"8;5;"+t),o=`  ${n};1m${s} [0m`;r[0]=o+r[0].split("\n").join("\n"+o),r.push(n+"m+"+e.exports.humanize(this.diff)+"[0m")}else r[0]=(t.inspectOpts.hideDate?"":(new Date).toISOString()+" ")+s+" "+r[0]},t.save=function(e){e?process.env.DEBUG=e:delete process.env.DEBUG},t.load=function(){return process.env.DEBUG},t.useColors=function(){return"colors"in t.inspectOpts?Boolean(t.inspectOpts.colors):s.isatty(process.stderr.fd)},t.destroy=n.deprecate((()=>{}),"Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."),t.colors=[6,2,3,4,5,1];try{const e=r(130);e&&(e.stderr||e).level>=2&&(t.colors=[20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,199,200,201,202,203,204,205,206,207,208,209,214,215,220,221])}catch(e){}t.inspectOpts=Object.keys(process.env).filter((e=>/^debug_/i.test(e))).reduce(((e,t)=>{const r=t.substring(6).toLowerCase().replace(/_([a-z])/g,((e,t)=>t.toUpperCase()));let s=process.env[t];return s=!!/^(yes|on|true|enabled)$/i.test(s)||!/^(no|off|false|disabled)$/i.test(s)&&("null"===s?null:Number(s)),e[r]=s,e}),{}),e.exports=r(447)(t);const{formatters:o}=e.exports;o.o=function(e){return this.inspectOpts.colors=this.useColors,n.inspect(e,this.inspectOpts).split("\n").map((e=>e.trim())).join(" ")},o.O=function(e){return this.inspectOpts.colors=this.useColors,n.inspect(e,this.inspectOpts)}},261:(e,t,r)=>{var s;e.exports=function(){if(!s){try{s=r(158)("follow-redirects")}catch(e){}"function"!=typeof s&&(s=function(){})}s.apply(null,arguments)}},938:(e,t,r)=>{var s=r(310),n=s.URL,o=r(685),i=r(687),a=r(781).Writable,c=r(491),u=r(261),p=["abort","aborted","connect","error","socket","timeout"],f=Object.create(null);p.forEach((function(e){f[e]=function(t,r,s){this._redirectable.emit(e,t,r,s)}}));var d=x("ERR_FR_REDIRECTION_FAILURE",""),h=x("ERR_FR_TOO_MANY_REDIRECTS","Maximum number of redirects exceeded"),l=x("ERR_FR_MAX_BODY_LENGTH_EXCEEDED","Request body larger than maxBodyLength limit"),m=x("ERR_STREAM_WRITE_AFTER_END","write after end");function g(e,t){a.call(this),this._sanitizeOptions(e),this._options=e,this._ended=!1,this._ending=!1,this._redirectCount=0,this._redirects=[],this._requestBodyLength=0,this._requestBodyBuffers=[],t&&this.on("response",t);var r=this;this._onNativeResponse=function(e){r._processResponse(e)},this._performRequest()}function y(e){var t={maxRedirects:21,maxBodyLength:10485760},r={};return Object.keys(e).forEach((function(o){var i=o+":",a=r[i]=e[o],p=t[o]=Object.create(a);Object.defineProperties(p,{request:{value:function(e,o,a){if("string"==typeof e){var p=e;try{e=C(new n(p))}catch(t){e=s.parse(p)}}else n&&e instanceof n?e=C(e):(a=o,o=e,e={protocol:i});return"function"==typeof o&&(a=o,o=null),(o=Object.assign({maxRedirects:t.maxRedirects,maxBodyLength:t.maxBodyLength},e,o)).nativeProtocols=r,c.equal(o.protocol,i,"protocol mismatch"),u("options",o),new g(o,a)},configurable:!0,enumerable:!0,writable:!0},get:{value:function(e,t,r){var s=p.request(e,t,r);return s.end(),s},configurable:!0,enumerable:!0,writable:!0}})})),t}function v(){}function C(e){var t={protocol:e.protocol,hostname:e.hostname.startsWith("[")?e.hostname.slice(1,-1):e.hostname,hash:e.hash,search:e.search,pathname:e.pathname,path:e.pathname+e.search,href:e.href};return""!==e.port&&(t.port=Number(e.port)),t}function b(e,t){var r;for(var s in t)e.test(s)&&(r=t[s],delete t[s]);return r}function x(e,t){function r(e){Error.captureStackTrace(this,this.constructor),this.message=e||t}return r.prototype=new Error,r.prototype.constructor=r,r.prototype.name="Error ["+e+"]",r.prototype.code=e,r}function w(e){for(var t=0;t<p.length;t++)e.removeListener(p[t],f[p[t]]);e.on("error",v),e.abort()}g.prototype=Object.create(a.prototype),g.prototype.abort=function(){w(this._currentRequest),this.emit("abort")},g.prototype.write=function(e,t,r){if(this._ending)throw new m;if(!("string"==typeof e||"object"==typeof e&&"length"in e))throw new TypeError("data should be a string, Buffer or Uint8Array");"function"==typeof t&&(r=t,t=null),0!==e.length?this._requestBodyLength+e.length<=this._options.maxBodyLength?(this._requestBodyLength+=e.length,this._requestBodyBuffers.push({data:e,encoding:t}),this._currentRequest.write(e,t,r)):(this.emit("error",new l),this.abort()):r&&r()},g.prototype.end=function(e,t,r){if("function"==typeof e?(r=e,e=t=null):"function"==typeof t&&(r=t,t=null),e){var s=this,n=this._currentRequest;this.write(e,t,(function(){s._ended=!0,n.end(null,null,r)})),this._ending=!0}else this._ended=this._ending=!0,this._currentRequest.end(null,null,r)},g.prototype.setHeader=function(e,t){this._options.headers[e]=t,this._currentRequest.setHeader(e,t)},g.prototype.removeHeader=function(e){delete this._options.headers[e],this._currentRequest.removeHeader(e)},g.prototype.setTimeout=function(e,t){var r=this;function s(t){t.setTimeout(e),t.removeListener("timeout",t.destroy),t.addListener("timeout",t.destroy)}function n(t){r._timeout&&clearTimeout(r._timeout),r._timeout=setTimeout((function(){r.emit("timeout"),o()}),e),s(t)}function o(){clearTimeout(r._timeout),t&&r.removeListener("timeout",t),this.socket||r._currentRequest.removeListener("socket",n)}return t&&this.on("timeout",t),this.socket?n(this.socket):this._currentRequest.once("socket",n),this.on("socket",s),this.once("response",o),this.once("error",o),this},["flushHeaders","getHeader","setNoDelay","setSocketKeepAlive"].forEach((function(e){g.prototype[e]=function(t,r){return this._currentRequest[e](t,r)}})),["aborted","connection","socket"].forEach((function(e){Object.defineProperty(g.prototype,e,{get:function(){return this._currentRequest[e]}})})),g.prototype._sanitizeOptions=function(e){if(e.headers||(e.headers={}),e.host&&(e.hostname||(e.hostname=e.host),delete e.host),!e.pathname&&e.path){var t=e.path.indexOf("?");t<0?e.pathname=e.path:(e.pathname=e.path.substring(0,t),e.search=e.path.substring(t))}},g.prototype._performRequest=function(){var e=this._options.protocol,t=this._options.nativeProtocols[e];if(t){if(this._options.agents){var r=e.substr(0,e.length-1);this._options.agent=this._options.agents[r]}var n=this._currentRequest=t.request(this._options,this._onNativeResponse);this._currentUrl=s.format(this._options),n._redirectable=this;for(var o=0;o<p.length;o++)n.on(p[o],f[p[o]]);if(this._isRedirect){var i=0,a=this,c=this._requestBodyBuffers;!function e(t){if(n===a._currentRequest)if(t)a.emit("error",t);else if(i<c.length){var r=c[i++];n.finished||n.write(r.data,r.encoding,e)}else a._ended&&n.end()}()}}else this.emit("error",new TypeError("Unsupported protocol "+e))},g.prototype._processResponse=function(e){var t=e.statusCode;this._options.trackRedirects&&this._redirects.push({url:this._currentUrl,headers:e.headers,statusCode:t});var r=e.headers.location;if(r&&!1!==this._options.followRedirects&&t>=300&&t<400){if(w(this._currentRequest),e.destroy(),++this._redirectCount>this._options.maxRedirects)return void this.emit("error",new h);((301===t||302===t)&&"POST"===this._options.method||303===t&&!/^(?:GET|HEAD)$/.test(this._options.method))&&(this._options.method="GET",this._requestBodyBuffers=[],b(/^content-/i,this._options.headers));var n=b(/^host$/i,this._options.headers)||s.parse(this._currentUrl).hostname,o=s.resolve(this._currentUrl,r);u("redirecting to",o),this._isRedirect=!0;var i=s.parse(o);if(Object.assign(this._options,i),i.hostname!==n&&b(/^authorization$/i,this._options.headers),"function"==typeof this._options.beforeRedirect){var a={headers:e.headers};try{this._options.beforeRedirect.call(null,this._options,a)}catch(e){return void this.emit("error",e)}this._sanitizeOptions(this._options)}try{this._performRequest()}catch(e){var c=new d("Redirected request failed: "+e.message);c.cause=e,this.emit("error",c)}}else e.responseUrl=this._currentUrl,e.redirects=this._redirects,this.emit("response",e),this._requestBodyBuffers=[]},e.exports=y({http:o,https:i}),e.exports.wrap=y},560:e=>{"use strict";e.exports=(e,t)=>{t=t||process.argv;const r=e.startsWith("-")?"":1===e.length?"-":"--",s=t.indexOf(r+e),n=t.indexOf("--");return-1!==s&&(-1===n||s<n)}},824:e=>{var t=1e3,r=60*t,s=60*r,n=24*s;function o(e,t,r,s){var n=t>=1.5*r;return Math.round(e/r)+" "+s+(n?"s":"")}e.exports=function(e,i){i=i||{};var a,c,u=typeof e;if("string"===u&&e.length>0)return function(e){if(!((e=String(e)).length>100)){var o=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(o){var i=parseFloat(o[1]);switch((o[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*i;case"weeks":case"week":case"w":return 6048e5*i;case"days":case"day":case"d":return i*n;case"hours":case"hour":case"hrs":case"hr":case"h":return i*s;case"minutes":case"minute":case"mins":case"min":case"m":return i*r;case"seconds":case"second":case"secs":case"sec":case"s":return i*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return i;default:return}}}}(e);if("number"===u&&isFinite(e))return i.long?(a=e,(c=Math.abs(a))>=n?o(a,c,n,"day"):c>=s?o(a,c,s,"hour"):c>=r?o(a,c,r,"minute"):c>=t?o(a,c,t,"second"):a+" ms"):function(e){var o=Math.abs(e);return o>=n?Math.round(e/n)+"d":o>=s?Math.round(e/s)+"h":o>=r?Math.round(e/r)+"m":o>=t?Math.round(e/t)+"s":e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},130:(e,t,r)=>{"use strict";const s=r(37),n=r(560),o=process.env;let i;function a(e){return 0!==(t=function(e){if(!1===i)return 0;if(n("color=16m")||n("color=full")||n("color=truecolor"))return 3;if(n("color=256"))return 2;if(e&&!e.isTTY&&!0!==i)return 0;const t=i?1:0;if("win32"===process.platform){const e=s.release().split(".");return Number(process.versions.node.split(".")[0])>=8&&Number(e[0])>=10&&Number(e[2])>=10586?Number(e[2])>=14931?3:2:1}if("CI"in o)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI"].some((e=>e in o))||"codeship"===o.CI_NAME?1:t;if("TEAMCITY_VERSION"in o)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(o.TEAMCITY_VERSION)?1:0;if("truecolor"===o.COLORTERM)return 3;if("TERM_PROGRAM"in o){const e=parseInt((o.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(o.TERM_PROGRAM){case"iTerm.app":return e>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(o.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(o.TERM)||"COLORTERM"in o?1:(o.TERM,t)}(e))&&{level:t,hasBasic:!0,has256:t>=2,has16m:t>=3};var t}n("no-color")||n("no-colors")||n("color=false")?i=!1:(n("color")||n("colors")||n("color=true")||n("color=always"))&&(i=!0),"FORCE_COLOR"in o&&(i=0===o.FORCE_COLOR.length||0!==parseInt(o.FORCE_COLOR,10)),e.exports={supportsColor:a,stdout:a(process.stdout),stderr:a(process.stderr)}},491:e=>{"use strict";e.exports=require("assert")},685:e=>{"use strict";e.exports=require("http")},687:e=>{"use strict";e.exports=require("https")},37:e=>{"use strict";e.exports=require("os")},781:e=>{"use strict";e.exports=require("stream")},224:e=>{"use strict";e.exports=require("tty")},310:e=>{"use strict";e.exports=require("url")},837:e=>{"use strict";e.exports=require("util")},796:e=>{"use strict";e.exports=require("zlib")},593:e=>{"use strict";e.exports=JSON.parse('{"_from":"axios","_id":"axios@0.21.1","_inBundle":false,"_integrity":"sha512-dKQiRHxGD9PPRIUNIWvZhPTPpl1rf/OxTYKsqKUDjBwYylTvV7SjSHJb9ratfyzM6wCdLCOYLzs73qpg5c4iGA==","_location":"/axios","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"axios","name":"axios","escapedName":"axios","rawSpec":"","saveSpec":null,"fetchSpec":"latest"},"_requiredBy":["#USER","/"],"_resolved":"https://registry.npmjs.org/axios/-/axios-0.21.1.tgz","_shasum":"22563481962f4d6bde9a76d516ef0e5d3c09b2b8","_spec":"axios","_where":"C:\\\\Projects\\\\Paragon\\\\IBM-Server","author":{"name":"Matt Zabriskie"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"bugs":{"url":"https://github.com/axios/axios/issues"},"bundleDependencies":false,"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}],"dependencies":{"follow-redirects":"^1.10.0"},"deprecated":false,"description":"Promise based HTTP client for the browser and node.js","devDependencies":{"bundlesize":"^0.17.0","coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.0.2","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^20.1.0","grunt-karma":"^2.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^1.0.18","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^1.3.0","karma-chrome-launcher":"^2.2.0","karma-coverage":"^1.1.1","karma-firefox-launcher":"^1.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-opera-launcher":"^1.0.0","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^1.2.0","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.7","karma-webpack":"^1.7.0","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^5.2.0","sinon":"^4.5.0","typescript":"^2.8.1","url-search-params":"^0.10.0","webpack":"^1.13.1","webpack-dev-server":"^1.14.1"},"homepage":"https://github.com/axios/axios","jsdelivr":"dist/axios.min.js","keywords":["xhr","http","ajax","promise","node"],"license":"MIT","main":"index.js","name":"axios","repository":{"type":"git","url":"git+https://github.com/axios/axios.git"},"scripts":{"build":"NODE_ENV=production grunt build","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","examples":"node ./examples/server.js","fix":"eslint --fix lib/**/*.js","postversion":"git push && git push --tags","preversion":"npm test","start":"node ./sandbox/server.js","test":"grunt test && bundlesize","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"},"typings":"./index.d.ts","unpkg":"dist/axios.min.js","version":"0.21.1"}')}},t={};function r(s){var n=t[s];if(void 0!==n)return n.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,r),o.exports}(()=>{"use strict";const e=r(669).default;class t{constructor(e){if("error"in e)throw new Error(e.error);if(!("access_token"in e))throw new Error("No access token present in token");if(this.access_token=e.access_token,!("refresh_token"in e))throw new Error("No refresh token present in token");if(this.refresh_token=e.refresh_token,"expiry"in e)this.expiry=new Date(e.expiry);else{var t=new Date;t.setHours(t.getHours()+1),this.expiry=t}if("termination"in e)this.termination=new Date(e.termination);else{var r=new Date;r.setHours(r.getHours()+2160),this.termination=r}}async refresh(t,r){var s=(await e.post("https://student.sbhs.net.au/api/token",new URLSearchParams({refresh_token:this.refresh_token,grant_type:"refresh_token",client_id:t,client_secret:r}),{headers:{"Content-Type":"application/x-www-form-urlencoded"}})).data;if("error"in s)throw new Error(s.error);if(!("access_token"in s))throw new Error("No access token present in token");if(this.access_token=s.access_token,"expiry"in s)this.expiry=new Date(s.expiry);else{var n=new Date;n.setHours(n.getHours()+1),this.expiry=n}}}const s=r(669).default;var n;n={post:async function(e){if(0==e.__ow_body.length)return{status:400,body:"You must provide a code"};var r,n=await s.post("https://student.sbhs.net.au/api/token",new URLSearchParams({code:e.__ow_body,grant_type:"authorization_code",client_id:e.client_id,client_secret:e.client_secret,redirect_uri:"https://beta-paragon.web.app/callback"}),{headers:{"Content-Type":"application/x-www-form-urlencoded"}});try{r=new t(n.data)}catch(e){return{status:500,body:{message:e.message,stack:e.stack}}}return{status:200,body:r}}},global.main=async function(e){if(!(e.__ow_method in n))return{status:405,body:"Unsupported HTTP method"};var t=await n[e.__ow_method](e);return{status:t.status,headers:t.headers,body:t.body}}})()})();