import{j as e}from"./jsx-runtime-D_zvdyIk.js";function T({customText:t,fullscreen:S=!1}){const L=()=>t?t.map((b,_)=>e.jsx("p",{className:"loader__text",children:b},`${_+1}`)):e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"loader__text",children:"React + Typescript"}),e.jsx("p",{className:"loader__text",children:"Vite"}),e.jsx("p",{className:"loader__text",children:"Zustand store"}),e.jsx("p",{className:"loader__text",children:"Microsoft Fluent UI and Design Tokens"})]});return e.jsxs("div",{className:`loader ${S?"loader--fullscreen":""}`,children:[e.jsx("span",{className:"loader__spinner"}),e.jsx("div",{className:"loader__text-container",children:L()})]})}T.__docgenInfo={description:"",methods:[],displayName:"Loader",props:{customText:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},fullscreen:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const k={title:"Components/Loader",component:T,parameters:{layout:"centered",docs:{description:{component:"A loading spinner component with animated text display. Shows either custom text or default tech stack information. Useful for loading states, splash screens, or while waiting for data to load."}}},tags:["autodocs"],argTypes:{customText:{description:"Array of custom text strings to display below the spinner. If not provided, displays default tech stack information.",table:{type:{summary:"string[]",detail:"Array of strings to be displayed sequentially"},defaultValue:{summary:"undefined",detail:'When undefined, displays: "React + Typescript", "Vite", "Zustand store", "Microsoft Fluent UI and Design Tokens"'},category:"Props"},control:"object"},fullscreen:{description:"When enabled, loader fills the entire screen with a backdrop. Useful for page transitions and full-page loading states.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Props"},control:"boolean"}}},s={args:{},parameters:{docs:{description:{story:"Default loader with tech stack information. Displays React + TypeScript, Vite, Zustand store, and Microsoft Fluent UI text."}}},decorators:[t=>e.jsx("div",{style:{height:"400px",width:"500px",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(t,{})})]},r={args:{customText:["Loading your dashboard..."]},parameters:{docs:{description:{story:"Loader with a single custom text line. Useful for simple loading messages."}}},decorators:[t=>e.jsx("div",{style:{height:"400px",width:"500px",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(t,{})})]},n={args:{customText:["Fetching user data...","Loading portfolio...","Calculating analytics...","Almost there!"]},parameters:{docs:{description:{story:"Loader with multiple custom text lines. Ideal for showing progress through multiple loading steps."}}},decorators:[t=>e.jsx("div",{style:{height:"400px",width:"500px",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(t,{})})]},a={args:{customText:["Welcome","Loading your workspace..."],fullscreen:!0},parameters:{layout:"fullscreen",docs:{description:{story:"Fullscreen loader that covers the entire viewport. Perfect for page transitions, login screens, or initial app loading states. Features a semi-transparent backdrop with centered content."}}},decorators:[t=>e.jsx("div",{style:{width:"100vw",height:"100vh",position:"relative"},children:e.jsx(t,{})})]},o={args:{customText:["Preparing your investment advisory dashboard","Syncing real-time market data","This may take a few moments"]},parameters:{docs:{description:{story:"Loader with longer text lines. Demonstrates how the component handles more verbose loading messages."}}},decorators:[t=>e.jsx("div",{style:{height:"400px",width:"600px",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(t,{})})]};var i,l,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default loader with tech stack information. Displays React + TypeScript, Vite, Zustand store, and Microsoft Fluent UI text.'
      }
    }
  },
  decorators: [Story => <div style={{
    height: '400px',
    width: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>\r
        <Story />\r
      </div>]
}`,...(d=(l=s.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var c,p,m;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    customText: ['Loading your dashboard...']
  },
  parameters: {
    docs: {
      description: {
        story: 'Loader with a single custom text line. Useful for simple loading messages.'
      }
    }
  },
  decorators: [Story => <div style={{
    height: '400px',
    width: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>\r
        <Story />\r
      </div>]
}`,...(m=(p=r.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var u,g,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    customText: ['Fetching user data...', 'Loading portfolio...', 'Calculating analytics...', 'Almost there!']
  },
  parameters: {
    docs: {
      description: {
        story: 'Loader with multiple custom text lines. Ideal for showing progress through multiple loading steps.'
      }
    }
  },
  decorators: [Story => <div style={{
    height: '400px',
    width: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>\r
        <Story />\r
      </div>]
}`,...(h=(g=n.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var y,f,x;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    customText: ['Welcome', 'Loading your workspace...'],
    fullscreen: true
  },
  parameters: {
    layout: 'fullscreen',
    // Override layout for fullscreen story
    docs: {
      description: {
        story: 'Fullscreen loader that covers the entire viewport. Perfect for page transitions, login screens, or initial app loading states. Features a semi-transparent backdrop with centered content.'
      }
    }
  },
  decorators: [Story => <div style={{
    width: '100vw',
    height: '100vh',
    position: 'relative'
  }}>\r
        <Story />\r
      </div>]
}`,...(x=(f=a.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var w,v,j;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    customText: ['Preparing your investment advisory dashboard', 'Syncing real-time market data', 'This may take a few moments']
  },
  parameters: {
    docs: {
      description: {
        story: 'Loader with longer text lines. Demonstrates how the component handles more verbose loading messages.'
      }
    }
  },
  decorators: [Story => <div style={{
    height: '400px',
    width: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>\r
        <Story />\r
      </div>]
}`,...(j=(v=o.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};const C=["Default","CustomSingleLine","CustomMultipleLines","Fullscreen","LongTextExample"];export{n as CustomMultipleLines,r as CustomSingleLine,s as Default,a as Fullscreen,o as LongTextExample,C as __namedExportsOrder,k as default};
