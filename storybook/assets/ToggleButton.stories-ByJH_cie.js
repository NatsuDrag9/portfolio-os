import{w as d,u as c,f as x}from"./index-L8OlCEhE.js";import{j as o}from"./jsx-runtime-D_zvdyIk.js";function A({name:e,isActive:s,onToggleClick:t,isDisabled:a=!1}){const w=()=>{t(!s)};return o.jsxs("div",{className:`toggle-button ${a?"toggle-button--disabled":""}`,children:[o.jsx("p",{className:"toggle-button__name",title:e,children:e}),o.jsx("button",{className:`toggle-button__button ${s?"active":""}`,disabled:a,onClick:w,children:o.jsx("span",{className:`toggle-button__circle ${s?"active":""}`})})]})}A.__docgenInfo={description:"",methods:[],displayName:"ToggleButton",props:{name:{required:!0,tsType:{name:"string"},description:""},isActive:{required:!0,tsType:{name:"boolean"},description:""},onToggleClick:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"value"}],return:{name:"void"}}},description:""},isDisabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const _=async({canvasElement:e})=>{const t=d(e).getByRole("button");await c.click(t)},B=async({canvasElement:e})=>{const t=d(e).getByRole("button");for(let a=0;a<5;a++)await c.click(t)},C=async({canvasElement:e})=>{const t=d(e).getByRole("button");await c.click(t),await new Promise(a=>setTimeout(a,500)),await c.click(t)},R={title:"Components/ToggleButton",component:A,parameters:{layout:"centered",docs:{description:{component:"A toggle button component that switches between active and inactive states. Supports disabled state and keyboard accessibility."}}},argTypes:{name:{control:"text",description:"Label text displayed next to the toggle button",table:{type:{summary:"string"}}},isActive:{control:"boolean",description:"Current state of the toggle button",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},isDisabled:{control:"boolean",description:"Whether the toggle button is disabled",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},onToggleClick:{description:"Callback function triggered when the toggle is clicked",table:{type:{summary:"(value: boolean) => void"}},action:"toggled"}},args:{name:"Toggle Setting",isActive:!1,isDisabled:!1,onToggleClick:x()},tags:["autodocs"]},n={args:{name:"Wi-Fi",isActive:!1,isDisabled:!1},play:_},i={args:{name:"Bluetooth",isActive:!0,isDisabled:!1},play:C},l={args:{name:"Location Services",isActive:!1,isDisabled:!0}},r={args:{name:"Dark Mode",isActive:!1,isDisabled:!1},play:B};var u,g,p;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    name: 'Wi-Fi',
    isActive: false,
    isDisabled: false
  },
  play: playToggleToActive
}`,...(p=(g=n.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};var m,b,y;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    name: 'Bluetooth',
    isActive: true,
    isDisabled: false
  },
  play: playToggleWithDelay
}`,...(y=(b=i.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var v,f,T;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    name: 'Location Services',
    isActive: false,
    isDisabled: true
  }
}`,...(T=(f=l.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var h,D,k;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    name: 'Dark Mode',
    isActive: false,
    isDisabled: false
  },
  play: playRapidToggle
}`,...(k=(D=r.parameters)==null?void 0:D.docs)==null?void 0:k.source}}};const I=["Inactive","Active","Disabled","Interactive"];export{i as Active,l as Disabled,n as Inactive,r as Interactive,I as __namedExportsOrder,R as default};
