(()=>{"use strict";var e={151:(e,t,n)=>{function a(){for(var e=document.getElementsByTagName("th"),t=0;t<e.length;t++)e[t].classList.add("sorted-none");const n=document.getElementById("searchInput"),a=document.getElementById("myTable").querySelectorAll("tr:not(:first-child)");n.value="",a.forEach((e=>{e.dataset.keywords=e.textContent.toLowerCase().replace(/[^a-z0-9]+/g," ").trim().split(" ").filter((e=>e.length>2)).join(" ")})),n.addEventListener("keyup",function(e,t){let n;return function(...a){const r=this;clearTimeout(n),n=setTimeout((()=>e.apply(r,a)),t)}}((function(){const e=n.value.toLowerCase().replace(/[^a-z0-9]+/g," ").trim().split(" ");for(const t of a){const n=t.dataset.keywords,a=e.map((e=>n.includes(e))).every((e=>!0===e));t.style.display=a?"":"none"}}),100))}n.d(t,{u:()=>a}),window.addEventListener("DOMContentLoaded",(function(){a()})),window.addEventListener("pageshow",(function(e){searchInput.value="",document.getElementById("myTable").querySelectorAll("tr:not(:first-child)").forEach((e=>{e.style.display=""}))})),window.sortTable=function(e){const t=document.getElementById("myTable"),n=t.querySelectorAll("th"),a=Array.from(t.querySelectorAll("tr:not(:first-child)")),r=n[e],o="asc"===(r.dataset.sortDir||"none")?"desc":"asc";n.forEach((e=>{e.classList.remove("sorted-asc","sorted-desc","sorted-none"),e.dataset.sortDir="none",e.classList.add("sorted-none")})),r.classList.remove("sorted-none"),r.classList.add(`sorted-${o}`),r.dataset.sortDir=o,a.sort(((t,n)=>{const a=t.cells[e].textContent.trim(),r=n.cells[e].textContent.trim(),i=isNaN(a)?a.localeCompare(r):parseFloat(a)-parseFloat(r);return"asc"===o?i:-i}));for(const e of a)t.tBodies[0].appendChild(e)}}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,n),o.exports}n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{async function e(){var e={email:"",user_id:""};try{await new Promise(((e,t)=>{let n=0;const a=setInterval((()=>{"undefined"!=typeof MemberSpace?(clearInterval(a),e()):(n+=100,n>=1e4&&(clearInterval(a),t("MemberSpace did not become available within the maximum wait time.")))}),100)}));const t=await new Promise(((e,t)=>{if(MemberSpace.ready)try{e(window.MemberSpace.getMemberInfo())}catch(e){t("Error fetching MemberSpace member info: "+e)}else{const n=({detail:a})=>{try{e(a)}catch(e){t("Error in MemberSpace.ready event: "+e)}document.removeEventListener("MemberSpace.ready",n)};document.addEventListener("MemberSpace.ready",n)}}));t&&t.isLoggedIn&&(e.email=t.memberInfo.email,e.user_id=t.memberInfo.id)}catch(e){}return e}const t="https://api.colombochetty.com/",a=t+"api/authenticate",r=t+"auth/logout",o=t+"auth/refresh_token",i=t+"graphql",s=new class{async login(e,t){const n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t),credentials:"include"});if(!n.ok)throw n}async logout(e){const t=await fetch(e,{method:"POST",credentials:"include"});if(!t.ok)throw t}async refreshToken(e){const t=this.getCookie("csrf_refresh_token"),n=await fetch(e,{method:"POST",credentials:"include",headers:{"X-CSRF-TOKEN-REFRESH":t}});if(!n.ok)throw n}async getRestData(e){const t=await fetch(e,{method:"GET",credentials:"include"});if(!t.ok)throw t;return await t.text()}async getGraphQLData(e,t){const n=this.getCookie("csrf_access_token"),a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN-ACCESS":n},body:JSON.stringify({query:t}),credentials:"include"});if(!a.ok)throw a;return await a.json()}getCookie(e){let t=null;if(document.cookie&&""!==document.cookie){const n=document.cookie.split(";");for(let a=0;a<n.length;a++){const r=n[a].trim();if(r.substring(0,e.length+1)===e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}}return t}},c=new class{constructor(e,t,n,a,r,o){this.loginUrl=e,this.logoutUrl=n,this.refreshUrl=t,this.memberspace_tokenName=a,this.redirectPage=r,this.apiClient=o}async handleGraphQLError(e,t,n){try{if(this.isUnauthorizedError(e))return await this.handleUnauthorizedError(e),await this.apiClient.getGraphQLData(t,n);throw this.isSigFailure(e),await this.handleLogout(),e}catch(e){throw e}}async handleRestError(e,t){try{if(this.isUnauthorizedError(e))return await this.handleUnauthorizedError(e),await this.apiClient.getRestData(t);throw this.isSigFailure(e),await this.handleLogout(),e}catch(e){throw e}}async handleUnauthorizedError(t){const n=await t.json();if("Token has expired"===n.msg)await this.handleRefresh();else{if('Missing cookie "access_token_cookie"'!==n.msg)throw t;{const t=await e();await this.apiClient.login(this.loginUrl,t)}}}async handleRefresh(){try{await this.apiClient.refreshToken(this.refreshUrl)}catch(e){throw this.handleLogout(),e}}async handleLogout(){localStorage.removeItem(this.memberspace_tokenName),await this.apiClient.logout(this.logoutUrl),window.location.href=this.redirectPage}isUnauthorizedError(e){return e instanceof Response&&401===e.status}isSigFailure(e){return e instanceof Response&&422===e.status}}(a,o,r,"MemberSpaceWidget.token","/account",s);const d={basic:"\n      {\n      individuals {\n        id\n        GIVN\n        SURN\n      }\n    }",with_parents:"\n      {\n      individuals {\n        id\n        GIVN\n        SURN\n        parents {\n          GIVN\n          SURN\n          SEX\n          id \n        } \n      }\n    }",detailed:"\n      {\n      individuals {\n        id\n        GIVN\n        SURN\n        parents {\n          GIVN\n          SURN\n          SEX\n          id \n        } \n        spouses {\n          GIVN\n          SURN\n          id\n          SEX\n        }\n      }\n    }"};async function l(e="basic"){const t=d[e];try{const e=await async function(e){try{return await s.getGraphQLData(i,e)}catch(t){return await c.handleGraphQLError(t,i,e)}}(t);return e}catch(e){throw e}}var h=n(151);const u="";let m=!1;async function f(){try{const e=await l("with_parents");!function(e){const t=document.getElementById("tableBody");let n="";e.forEach((e=>{let t=e.parents.find((e=>"F"===e.SEX)),a=e.parents.find((e=>"M"===e.SEX)),r=t?`<a href="${u}/person?id=${t.id}" class="link">${t.GIVN} ${t.SURN}</a>`:"Unknown",o=a?`<a href="${u}/person?id=${a.id}" class="link">${a.GIVN} ${a.SURN}</a>`:"Unknown";n+=`<tr>\n               <td><a href="${u}/person?id=${e.id}" class="link">${e.GIVN} ${e.SURN}</a></td>\n               <td style="display: none;">${e.SURN}</td>\n               <td>${r}</td>\n               <td>${o}</td>\n             </tr>`})),t.innerHTML=n}(e.data.individuals),(0,h.u)(),m=!0}catch(e){}}document.addEventListener("DOMContentLoaded",f),document.addEventListener("MemberSpace.member.info",(async function(){m||await f()}))})()})();