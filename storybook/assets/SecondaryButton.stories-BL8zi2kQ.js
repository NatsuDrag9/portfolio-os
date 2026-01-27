import{S as on,A as en}from"./SecondaryButton-DgYz8Nhr.js";import{w as s,e as o,u,f as tn}from"./index-L8OlCEhE.js";import{C as l}from"./chunk-24-Kif6bkd-.js";import{c as cn}from"./createFluentIcon-BZ9LiokK.js";import{a as an}from"./chunk-4-SzNxvNiQ.js";import"./jsx-runtime-D_zvdyIk.js";import"./index-DvOVhSYJ.js";const Y=cn("AddRegular","1em",["M10 2.5c.28 0 .5.22.5.5v6.5H17a.5.5 0 0 1 0 1h-6.5V17a.5.5 0 0 1-1 0v-6.5H3a.5.5 0 0 1 0-1h6.5V3c0-.28.22-.5.5-.5Z"]),$=async({canvasElement:t,args:n})=>{const e=s(t).getByRole("button");o(e).toBeInTheDocument(),o(e).toHaveClass("secondary-button");const a=e.querySelector(".secondary-button__name");o(a).toBeInTheDocument(),o(a).toHaveTextContent(n==null?void 0:n.name)},nn=async({canvasElement:t})=>{const c=s(t).getByRole("button");o(c).toBeInTheDocument();const e=c.querySelector(".secondary-button__fluent-icon");o(e).toBeInTheDocument();const a=Array.from(c.children),r=a.findIndex(i=>i.classList.contains("secondary-button__fluent-icon")),P=a.findIndex(i=>i.classList.contains("secondary-button__name"));o(r).toBeLessThan(P)},rn=async({canvasElement:t})=>{const c=s(t).getByRole("button");o(c).toBeInTheDocument();const e=c.querySelector(".secondary-button__fluent-icon");o(e).toBeInTheDocument();const a=Array.from(c.children),r=a.findIndex(i=>i.classList.contains("secondary-button__fluent-icon")),P=a.findIndex(i=>i.classList.contains("secondary-button__name"));o(r).toBeGreaterThan(P)},sn=async({canvasElement:t,args:n})=>{const e=s(t).getByRole("button");o(e).toBeInTheDocument();const a=e.querySelector(".secondary-button__fluent-icon");o(a).not.toBeInTheDocument();const r=e.querySelector(".secondary-button__name");o(r).toBeInTheDocument(),o(r).toHaveTextContent(n==null?void 0:n.name)},ln=async({canvasElement:t,args:n})=>{const e=s(t).getByRole("button");o(e).toBeInTheDocument(),await u.click(e),o(n==null?void 0:n.onButtonClick).toHaveBeenCalledTimes(1),await u.click(e),o(n==null?void 0:n.onButtonClick).toHaveBeenCalledTimes(2)},un=async({canvasElement:t,args:n})=>{const e=s(t).getByRole("button");o(e).toBeInTheDocument(),await u.tab(),o(e).toHaveFocus(),await u.keyboard("{Enter}"),o(n==null?void 0:n.onButtonClick).toHaveBeenCalledTimes(1),await u.keyboard(" "),o(n==null?void 0:n.onButtonClick).toHaveBeenCalledTimes(2)},In={title:"Components/SecondaryButton",component:on,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
A secondary button component with optional icon positioning.

## Features
- **Icon Support**: Accepts any Fluent UI icon component
- **Icon Positioning**: Icon can be placed on the left or right side
- **Click Handler**: Optional callback for button clicks
\`\`\`
        `}}},argTypes:{icon:{description:"Fluent UI icon component to display",control:!1,table:{type:{summary:"ComponentType<{ className: string }>"}}},name:{description:"Button label text",control:"text",table:{type:{summary:"string"}}},iconPosition:{description:"Position of the icon relative to the label",control:"radio",options:["left","right",void 0],table:{type:{summary:"'left' | 'right'"},defaultValue:{summary:"undefined"}}},onButtonClick:{description:"Callback function when button is clicked",action:"clicked",table:{type:{summary:"() => void"}}}},args:{onButtonClick:tn()}},m={args:{icon:l,name:"More",iconPosition:"right"},play:$},d={args:{icon:Y,name:"Add Item",iconPosition:"left"},play:nn},p={args:{icon:l,name:"More",iconPosition:"right"},play:rn},y={args:{icon:l,name:"Submit",iconPosition:void 0},play:sn},g={args:{icon:an,name:"Settings",iconPosition:"left"},play:$},h={args:{icon:en,name:"Back",iconPosition:"left"},play:nn},f={args:{icon:l,name:"Click Me",iconPosition:"right"},play:ln},I={args:{icon:l,name:"Press Enter",iconPosition:"right"},play:un},b={args:{icon:l,name:"View All Recommended Applications",iconPosition:"right"}},B={args:{icon:Y,name:"Go",iconPosition:"left"}};var v,R,C;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    icon: ChevronRightRegular,
    name: 'More',
    iconPosition: 'right'
  },
  play: secondaryButtonPlayFunction
}`,...(C=(R=m.parameters)==null?void 0:R.docs)==null?void 0:C.source}}};var S,k,T;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    icon: AddRegular,
    name: 'Add Item',
    iconPosition: 'left'
  },
  play: iconLeftPlayFunction
}`,...(T=(k=d.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};var _,x,F;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    icon: ChevronRightRegular,
    name: 'More',
    iconPosition: 'right'
  },
  play: iconRightPlayFunction
}`,...(F=(x=p.parameters)==null?void 0:x.docs)==null?void 0:F.source}}};var A,L,w;y.parameters={...y.parameters,docs:{...(A=y.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    icon: ChevronRightRegular,
    name: 'Submit',
    iconPosition: undefined
  },
  play: noIconPlayFunction
}`,...(w=(L=y.parameters)==null?void 0:L.docs)==null?void 0:w.source}}};var D,H,E;g.parameters={...g.parameters,docs:{...(D=g.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    icon: SettingsRegular,
    name: 'Settings',
    iconPosition: 'left'
  },
  play: secondaryButtonPlayFunction
}`,...(E=(H=g.parameters)==null?void 0:H.docs)==null?void 0:E.source}}};var M,q,V;h.parameters={...h.parameters,docs:{...(M=h.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    icon: ArrowLeftRegular,
    name: 'Back',
    iconPosition: 'left'
  },
  play: iconLeftPlayFunction
}`,...(V=(q=h.parameters)==null?void 0:q.docs)==null?void 0:V.source}}};var G,N,K;f.parameters={...f.parameters,docs:{...(G=f.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    icon: ChevronRightRegular,
    name: 'Click Me',
    iconPosition: 'right'
  },
  play: clickInteractionPlayFunction
}`,...(K=(N=f.parameters)==null?void 0:N.docs)==null?void 0:K.source}}};var O,U,W;I.parameters={...I.parameters,docs:{...(O=I.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    icon: ChevronRightRegular,
    name: 'Press Enter',
    iconPosition: 'right'
  },
  play: keyboardInteractionPlayFunction
}`,...(W=(U=I.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};var Z,j,z;b.parameters={...b.parameters,docs:{...(Z=b.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    icon: ChevronRightRegular,
    name: 'View All Recommended Applications',
    iconPosition: 'right'
  }
}`,...(z=(j=b.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var J,Q,X;B.parameters={...B.parameters,docs:{...(J=B.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    icon: AddRegular,
    name: 'Go',
    iconPosition: 'left'
  }
}`,...(X=(Q=B.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};const bn=["Default","IconLeft","IconRight","NoIcon","WithSettingsIcon","BackButton","ClickInteraction","KeyboardInteraction","LongText","ShortText"];export{h as BackButton,f as ClickInteraction,m as Default,d as IconLeft,p as IconRight,I as KeyboardInteraction,b as LongText,y as NoIcon,B as ShortText,g as WithSettingsIcon,bn as __namedExportsOrder,In as default};
