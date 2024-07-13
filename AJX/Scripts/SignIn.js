const $ = new Tool('安吉星');

const AJX_COOKIE = $.getStore('AJX_COOKIE');
const AJX_TOKEN = $.getStore('AJX_TOKEN');

let method = 'POST';
let baseUrl = 'https://www.onstar.com.cn/mssos/sos/credit/v1/';
let headers = {
    Connection: `keep-alive`,
    'Accept-Encoding': `gzip, deflate, br`,
    'Content-Type': `application/json`,
    Origin: `https://www.onstar.com.cn`,
    'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 16_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
    Authorization: AJX_TOKEN,
    Cookie: AJX_COOKIE,
    Host: `www.onstar.com.cn`,
    Referer: `https://www.onstar.com.cn/mweb/ma80/sharedProjects/index.html`,
    'Accept-Language': `zh-CN,zh-Hans;q=0.9`,
    Accept: `*/*`
};

!(async () => {
    if (!AJX_COOKIE || !AJX_TOKEN) {
        $.notify(
            `Cookie读取失败！`,
            `请先打开重写，进入APP-我的-今日签到获取Cookie`
        );
    } else {
        await getSigninInfo();
    }
})()
    .catch(error => $.log(`Error：\n${error}\n${JSON.stringify(error)}`))
    .finally(() => $.done());

// 签到方法
async function getSignin() {
    const url = `${baseUrl}/userSignIn`;
    const reqBody = {};
    const myRequest = {
        url,
        method,
        headers,
        body: JSON.stringify(reqBody)
    };
    const res = await $.request(myRequest);
    const { bizCode, bizMsg } = JSON.parse(res);
    if (bizCode !== 'E0000') {
        $.notify(`❗️❗️❗️签到失败！`, `失败原因：${bizMsg}`);
    } else {
        await getSigninInfo(true);
    }
}

// 获取签到信息
async function getSigninInfo(success) {
    const url = `${baseUrl}/getUserSignInit`;
    const reqBody = {};
    const myRequest = {
        url,
        method: 'GET',
        headers,
        body: JSON.stringify(reqBody)
    };
    const res = await $.request(myRequest);
    const {
        data: {
            currentSign,
            continueDays,
            signRanKing,
            currentYear,
            currentMonth,
            currentDay
        }
    } = JSON.parse(res);
    if (!currentSign) {
        await getSignin();
    } else {
        $.log(`${currentYear}-${currentMonth}-${currentDay}`);
        if (success) {
            $.notify(
                `🎉🎉🎉签到成功！`,
                `已连续签到${continueDays}天，今日签到排名${signRanKing}`
            );
        } else {
            $.notify(
                `❗️❗️❗️今日已签到！`,
                `已连续签到${continueDays}天，今日签到排名${signRanKing}`
            );
        }
    }
}

// prettier-ignore
function Tool(t="📣📣📣"){const e="undefined"!=typeof module&&!!module.exports&&"node",s="undefined"!=typeof $task&&"quanx",o="undefined"!=typeof $httpClient&&"surge",r=e||s||o;this.title=t;const i=t=>(t&&(t.status?t.statusCode=t.status:t.statusCode&&(t.status=t.statusCode)),t),n=(t,e)=>{try{e=JSON.parse(e)}catch(t){}return e},l=()=>{let{localStorage:t,fetch:e}=this;if(!t){let e=require("node-localstorage").LocalStorage;const s=new e("./store");t=s}if(!e){const t=(...t)=>import("node-fetch").then(({default:e})=>e(...t));e=t}return{localStorage:t,fetch:e}};this.log=(t=>{"object"==typeof t?console.log(`\n\n${JSON.stringify(t)}`):console.log(`\n\n${t}`)}),this.request=(async t=>{if(s)try{this.log(`url：\n\n${t.url}`),this.log(`headers：\n\n${JSON.stringify(t.headers)}`),this.log(`body：\n\n${t.body}`);const e=await $task.fetch(t),{status:s,body:o}=i(e);return 200!==s?Promise.reject(e):(this.log("status：",s),this.log("body：",o),Promise.resolve(o))}catch(t){return this.log(`接口响应错误：\n${t}\n${JSON.stringify(t)}`),Promise.reject(t)}if(o)try{this.log(`url：\n\n${t.url}`),this.log(`headers：\n\n${JSON.stringify(t.headers)}`),this.log(`body：\n\n${t.body}`);const{method:e}=t;$httpClient[e.toLowerCase()](t,(t,e,s)=>{if(t)return Promise.reject(t);const{status:o}=i(e);return 200!==o?Promise.reject(e):Promise.resolve(s)})}catch(t){return this.log(`接口响应错误：\n${t}\n${JSON.stringify(t)}`),Promise.reject(t)}if(e)try{const{localStorage:e,fetch:s}=l();this.log(`url：\n\n${t.url}`),this.log(`headers：\n\n${JSON.stringify(t.headers)}`),this.log(`body：\n\n${t.body}`);const{url:o,...r}=t,n=await s(o,r),{status:a}=i(n),h=r.headers.contentType,c="text/html"===h?await n.text():await n.json();return 200!==a?Promise.reject(c):Promise.resolve(c)}catch(t){return this.log(`接口响应错误：\n${t}\n${JSON.stringify(t)}`),Promise.reject(t)}}),this.done=((t={})=>{(s||o)&&$done(t),e&&this.log(t)}),this.wait=(t=>new Promise(e=>{setTimeout(()=>{e(!0)},1e3*t||2e3)})),this.notify=((t="",r="")=>{s&&$notify(this.title,t,r),o&&$notification.post(this.title,t,r),e&&this.log(`${this.title}\n${t}\n${r}`)}),this.getStore=(t=>{if(s)return n(t,$prefs.valueForKey(t));if(o)return n(t,$persistentStore.read(t));if(e){const{localStorage:e,fetch:s}=l();let o=e.getItem(t);return n(t,o)}}),this.setStore=((t,r)=>{if("object"==typeof r&&(r=JSON.stringify(r)),s&&$prefs.setValueForKey(r,t),o&&$persistentStore.write(r,t),e){const{localStorage:e,fetch:s}=l();e.setItem(t,r)}}),this.log(`脚本应用：${this.title}\n脚本环境：${r}`)}
