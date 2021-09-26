const e=require("process");const t=require("axios").default;class r{constructor(e){if("error"in e)throw new Error(e.error);if(!("access_token"in e))throw new Error("No access token present in token");if(this.access_token=e.access_token,!("refresh_token"in e))throw new Error("No refresh token present in token");if(this.refresh_token=e.refresh_token,"expiry"in e)this.expiry=new Date(e.expiry);else{var t=new Date;t.setHours(t.getHours()+1),this.expiry=t}if("termination"in e)this.termination=new Date(e.termination);else{var r=new Date;r.setHours(r.getHours()+2160),this.termination=r}}async refresh(e,r){var s=(await t.post("https://student.sbhs.net.au/api/token",new URLSearchParams({refresh_token:this.refresh_token,grant_type:"refresh_token",client_id:e,client_secret:r}),{headers:{"Content-Type":"application/x-www-form-urlencoded"}})).data;if("error"in s)throw new Error(s.error);if(!("access_token"in s))throw new Error("No access token present in token");if(this.access_token=s.access_token,"expiry"in s)this.expiry=new Date(s.expiry);else{var o=new Date;o.setHours(o.getHours()+1),this.expiry=o}}}const s=require("axios").default;var o;o={get:async function(e){if(!e.token)return{statusCode:400,body:"You must provide a token"};var t=new r(JSON.parse(e.token));if(new Date>t.termination)return{statusCode:422,body:"Token is terminated"};new Date>t.expiry&&await t.refresh(e.client_id,e.client_secret);var o={result:{},token:t},a=[];return Object.keys(n).forEach((e=>{a.push(async function(e,t){return(await s.get(`https://student.sbhs.net.au/api/${e}`,{headers:{Authorization:`Bearer ${t.access_token}`}})).data}(e,t).then((t=>{o.result[n[e]]=t})))})),await Promise.all(a),{statusCode:200,body:o}}},global.main=async function(t){if(!(t.__ow_method in o))return{statusCode:405,body:"Unsupported HTTP method"};var r;try{r=await o[t.__ow_method](t)}catch(t){return console.log("LOGVERSION 3"),console.log("SUCCEEDED false"),console.log(`MEMORY ${e.memoryUsage().rss}`),{statusCode:500,body:`Error: ${t.message} Stack Trace: ${t.stack}`}}var s={statusCode:r.statusCode,headers:r.headers,body:r.body};return console.log("LOGVERSION 3"),console.log(`SUCCEEDED ${r.statusCode>=200&&r.statusCode<300}`),console.log(`MEMORY ${e.memoryUsage().rss}`),s};const n={"dailynews/list.json":"announcements","timetable/daytimetable.json":"dailytimetable","timetable/timetable.json":"timetable","details/userinfo.json":"userinfo"};
