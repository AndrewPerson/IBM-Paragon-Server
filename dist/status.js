var r=require("process"),l="LOGVERSION 3";function n(o){global.main=async t=>{try{var s=await o(t)}catch(c){return console.log(c),console.log("SUCCEEDED false"),console.log(`MEMORY ${r.memoryUsage().rss}`),{statusCode:500,body:"Internal Server Error"}}var e=s.statusCode||200,a={statusCode:e,body:s.body};return console.log(l),console.log(`SUCCEEDED ${e>=200&&e<300}`),console.log(`MEMORY ${r.memoryUsage().rss}`),a}}n(async o=>(console.log(o),{body:o}));