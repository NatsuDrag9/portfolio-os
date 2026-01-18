import{w as d,e as a,u as s,f as i}from"./index-L8OlCEhE.js";import{j as v}from"./jsx-runtime-D_zvdyIk.js";import{H as I}from"./chunk-25-iOT6TxgI.js";import{S as q,L as D,a as E}from"./chunk-3-B_RIhxAf.js";import{W as j}from"./chunk-18-DjZtRj47.js";import"./createFluentIcon-BZ9LiokK.js";import"./index-DvOVhSYJ.js";function N({name:o,icon:t,isActive:n,onButtonClick:e}){return v.jsxs("button",{className:`sidebar-menubutton ${n?"sidebar-menubutton--active":""}`,type:"button",onClick:e,"aria-label":o,"aria-pressed":n,children:[v.jsx(t,{className:"sidebar-menubutton__fluent-icon"}),v.jsx("p",{className:"sidebar-menubutton__name",children:o})]})}N.__docgenInfo={description:"",methods:[],displayName:"SidebarMenuButton",props:{name:{required:!0,tsType:{name:"string"},description:""},icon:{required:!0,tsType:{name:"ComponentType",elements:[{name:"signature",type:"object",raw:"{ className?: string }",signature:{properties:[{key:"className",value:{name:"string",required:!1}}]}}],raw:"ComponentType<{ className?: string }>"},description:""},isActive:{required:!0,tsType:{name:"boolean"},description:""},onButtonClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const M=async({canvasElement:o})=>{const n=d(o).getByRole("button");a(n).toBeInTheDocument(),a(n).toHaveAttribute("aria-pressed","false"),a(n).not.toHaveClass("sidebar-menubutton--active"),await s.click(n),await new Promise(e=>setTimeout(e,200))},V=async({canvasElement:o})=>{const n=d(o).getByRole("button");await s.tab(),await new Promise(e=>setTimeout(e,100)),a(document.activeElement).toBe(n),await s.keyboard("{Enter}"),await new Promise(e=>setTimeout(e,200)),await s.tab(),await s.tab({shift:!0}),await new Promise(e=>setTimeout(e,100)),await s.keyboard(" "),await new Promise(e=>setTimeout(e,200))},z=async({canvasElement:o,args:t})=>{const e=d(o).getByRole("button");a(e).toHaveAttribute("aria-label",t==null?void 0:t.name),t!=null&&t.isActive?(a(e).toHaveClass("sidebar-menubutton--active"),a(e).toHaveAttribute("aria-pressed","true")):(a(e).not.toHaveClass("sidebar-menubutton--active"),a(e).toHaveAttribute("aria-pressed","false"));const b=e.querySelector(".sidebar-menubutton__fluent-icon");a(b).toBeInTheDocument();const r=e.querySelector(".sidebar-menubutton__name");a(r).toBeInTheDocument(),a(r==null?void 0:r.textContent).toBe(t==null?void 0:t.name),await new Promise(y=>setTimeout(y,200)),await s.click(e),await new Promise(y=>setTimeout(y,200))},L=async({canvasElement:o})=>{const n=d(o).getByRole("button");for(let e=0;e<3;e++)await s.click(n),await new Promise(b=>setTimeout(b,150))},J={title:"Components/SidebarMenuButton",component:N,parameters:{layout:"centered",docs:{description:{component:"A sidebar navigation button component with icon and text label. Supports active state highlighting and keyboard accessibility. Commonly used in settings panels and navigation sidebars."}}},argTypes:{name:{control:"text",description:"Label text displayed below the icon",table:{type:{summary:"string"}}},icon:{control:!1,description:"Fluent UI icon component to display",table:{type:{summary:"ComponentType<{ className?: string }>"}}},isActive:{control:"boolean",description:"Whether the button is in active/selected state",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},onButtonClick:{description:"Callback function triggered when the button is clicked",table:{type:{summary:"() => void"}},action:"button clicked"}},args:{name:"Home",icon:I,isActive:!1,onButtonClick:i()},tags:["autodocs"]},c={args:{name:"Home",icon:I,isActive:!1,onButtonClick:i()},play:M},u={args:{name:"System",icon:q,isActive:!0,onButtonClick:i()},play:V},l={args:{name:"Personalization",icon:j,isActive:!1,onButtonClick:i()},play:z},m={args:{name:"Display",icon:D,isActive:!1,onButtonClick:i()},play:L},p={args:{name:"Volume",icon:E,isActive:!1,onButtonClick:i()}};var g,f,B;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    name: 'Home',
    icon: HomeRegular,
    isActive: false,
    onButtonClick: fn()
  },
  play: playClickButton
}`,...(B=(f=c.parameters)==null?void 0:f.docs)==null?void 0:B.source}}};var w,k,C;u.parameters={...u.parameters,docs:{...(w=u.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    name: 'System',
    icon: SystemRegular,
    isActive: true,
    onButtonClick: fn()
  },
  play: playKeyboardInteraction
}`,...(C=(k=u.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var A,h,S;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    name: 'Personalization',
    icon: WindowBrushRegular,
    isActive: false,
    onButtonClick: fn()
  },
  play: playActiveStateToggle
}`,...(S=(h=l.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};var T,R,H;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    name: 'Display',
    icon: LaptopRegular,
    isActive: false,
    onButtonClick: fn()
  },
  play: playMultipleButtonClicks
}`,...(H=(R=m.parameters)==null?void 0:R.docs)==null?void 0:H.source}}};var P,_,x;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    name: 'Volume',
    icon: SpeakerEditRegular,
    isActive: false,
    onButtonClick: fn()
  }
}`,...(x=(_=p.parameters)==null?void 0:_.docs)==null?void 0:x.source}}};const Q=["Default","Active","PersonalizationButton","Interactive","VolumeButton"];export{u as Active,c as Default,m as Interactive,l as PersonalizationButton,p as VolumeButton,Q as __namedExportsOrder,J as default};
