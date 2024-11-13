(function(a,o){typeof exports=="object"&&typeof module<"u"?o(exports,require("vue"),require("vant")):typeof define=="function"&&define.amd?define(["exports","vue","vant"],o):(a=typeof globalThis<"u"?globalThis:a||self,o(a.VantPopuper={},a.Vue,a.Vant))})(this,function(a,o,p){"use strict";const k=()=>{},P=Object.assign;function N(e){return e!==null&&typeof e=="object"}function E(e){return typeof e=="function"}function T(e){return N(e)&&typeof e.then=="function"&&typeof e.catch=="function"}const g=(e,r=document.body)=>{const t=o.createApp(e),n=document.createElement("div");return r.appendChild(n),{instance:t.mount(n),unmount(){t.unmount(),r.removeChild(n)}}},b=()=>{const e=o.ref(!1),r=s=>{e.value=s};return{show:e,toggle:r,open:()=>r(!0),close:()=>r(!1)}},y=/^on([A-Z].?)/,j=/^Update:/,x=(e,r)=>(...t)=>{const n=e(...t);n==null||typeof n=="boolean"&&n?r():T(n)&&n.then(s=>{s&&r()})},w=(e,r)=>{const t=o.mergeProps(e??{});return P(t,Object.keys(t).reduce((n,s)=>{const c=y.exec(s);if(c){const[,d]=c,l=t[s];!j.test(d)&&E(l)&&(n[s]=x(l,r))}return n},{})),t},m=(e,r)=>P(r.reduce((t,n)=>(y.test(n)&&(t[n]=k),t),{}),e??{}),V=(e,r,t)=>{const{unmount:n}=g(o.defineComponent({setup(){const{show:s,toggle:c,open:d,close:l}=b();o.onMounted(()=>d());const f=()=>{const i=o.mergeProps({position:"bottom",round:!0,closeOnPopstate:!0,lazyRender:!1});return i.position==="bottom"?i.safeAreaInsetBottom=!0:i.position==="top"&&(i.safeAreaInsetTop=!0),P(i,o.mergeProps(i,(t==null?void 0:t.popupProps)??{},{show:s.value,"onUpdate:show":c,onClosed:()=>n()})),i};return()=>o.createVNode(p.Popup,f(),{default:()=>[o.createVNode(e,w(r,l),null)]})}}),t==null?void 0:t.mount)},R=(...e)=>{V(p.DatePicker,m(e[0],["onConfirm","onCancel"]),e[1])},U=(...e)=>{V(p.Picker,m(e[0],["onConfirm","onCancel"]),e[1])},M=(...e)=>{const[r,t]=e,{unmount:n}=g(o.defineComponent({setup(){const{show:s,toggle:c,open:d,close:l}=b();return o.onMounted(()=>d()),()=>o.createVNode(p.Calendar,o.mergeProps(w(m(r,["onConfirm"]),l),{show:s.value,poppable:!0,"onUpdate:show":c,onClosed:()=>n()}),null)}}),t==null?void 0:t.mount)},O=(...e)=>{V(o.defineComponent({emits:["confirm"],setup(r,{emit:t}){const n=o.ref(),s=o.ref(),{defaultDate:c,minDate:d,maxDate:l,...f}=e[0]??{};if(c)n.value=c[0],s.value=c[1];else{const u=new Date;n.value=s.value=[u.getFullYear(),u.getMonth(),u.getDate()].map(String)}const i=o.computed(()=>{const u=o.unref(n);if(!u)return;const[D,C,h]=u.map(Number);return new Date(D,C-1,h)});return()=>o.createVNode(p.PickerGroup,P({title:"请选择时间",tabs:["开始时间","结束时间"],nextStepText:"下一步"},f,{onConfirm(...u){if(f.maxRange){const[D]=u,[C,h]=D.map(S=>new Date(S.selectedValues.join("/")));if((h.getTime()-C.getTime())/(1e3*60*60*24)+1>+f.maxRange){p.showToast(`最多选择 ${f.maxRange} 天`);return}}t("confirm",...u)}}),{default:()=>[o.createVNode(p.DatePicker,{modelValue:n.value,"onUpdate:modelValue":u=>n.value=u,"min-date":d,"max-date":l},null),o.createVNode(p.DatePicker,{modelValue:s.value,"onUpdate:modelValue":u=>s.value=u,"min-date":i.value,"max-date":l},null)]})}}),m(e[0],["onConfirm","onCancel"]),e[1])};a.propsDefaultEventNoop=m,a.useVantCalendar=M,a.useVantDatePicker=R,a.useVantDatePickerGroup=O,a.useVantPicker=U,a.useVantPopup=V,Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});