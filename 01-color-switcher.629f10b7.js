const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),o=document.body;let a,d;e.addEventListener("click",(()=>{e.disabled=!0,a=setInterval((()=>{d=`#${Math.floor(16777215*Math.random()).toString(16)}`,o.style.backgroundColor=d}),1e3)})),t.addEventListener("click",(()=>{e.disabled=!1,clearInterval(a),o.style.backgroundColor=d||""}));
//# sourceMappingURL=01-color-switcher.629f10b7.js.map
