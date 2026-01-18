import{j as i}from"./jsx-runtime-D_zvdyIk.js";import{u as W}from"./useMediaQuery-CtBJNUaJ.js";import{w as k,e as o,u as l,a as y}from"./index-L8OlCEhE.js";import{D as h}from"./chunk-3-B_RIhxAf.js";import{c as z}from"./createFluentIcon-BZ9LiokK.js";import{H as C}from"./chunk-25-iOT6TxgI.js";import{B as E}from"./chunk-7-CdrDaij8.js";import{P as O,M as U}from"./chunk-6-DJnLnwDl.js";import{B as Q}from"./chunk-26-C7plUSKS.js";import"./index-DvOVhSYJ.js";const B=z("CodeRegular","1em",["M12.97 3.68a.5.5 0 0 0-.94-.36l-5 13a.5.5 0 1 0 .94.36l5-13ZM5.83 6.12c.2.18.23.5.05.7L3.16 10l2.72 3.17a.5.5 0 0 1-.76.66l-3-3.5a.5.5 0 0 1 0-.66l3-3.5a.5.5 0 0 1 .7-.05Zm8.34 8.26a.5.5 0 0 1-.05-.7l2.72-3.18-2.72-3.17a.5.5 0 1 1 .76-.66l3 3.5a.5.5 0 0 1 0 .66l-3 3.5a.5.5 0 0 1-.7.05Z"]);function V({buttons:n}){const e=W("(max-width: 450px)");return i.jsx("nav",{className:"portfolio-navbar",children:n.map(t=>{const s=typeof t.image!="string"?t.image:null,r=!e||t.isActive;return i.jsxs("button",{type:"button",className:`portfolio-navbar__button ${t.isActive?"portfolio-navbar__button--active":""}`,onClick:()=>t.onButtonClick(t.id),"aria-current":t.isActive?"page":void 0,title:t.name,children:[s?i.jsx(s,{className:"portfolio-navbar__fluent-icon"}):i.jsx("img",{src:t.image,alt:t.name,className:"portfolio-navbar__image"}),r&&i.jsx("span",{className:"portfolio-navbar__button-name",children:t.name})]},t.id)})})}V.__docgenInfo={description:"",methods:[],displayName:"PortfolioNavbar",props:{buttons:{required:!0,tsType:{name:"Array",elements:[{name:"ButtonDetailProps"}],raw:"ButtonDetailProps[]"},description:""}}};const $=async({canvasElement:n,args:e})=>{var d,u,m,c;const t=k(n),a=t.getByRole("navigation");o(a).toBeInTheDocument(),o(a).toHaveClass("portfolio-navbar");const s=t.getAllByRole("button");o(s).toHaveLength(((d=e==null?void 0:e.buttons)==null?void 0:d.length)||0),(u=e==null?void 0:e.buttons)==null||u.forEach((q,Z)=>{o(s[Z]).toHaveTextContent(q.name)});const r=t.getByText(((c=(m=e==null?void 0:e.buttons)==null?void 0:m[0])==null?void 0:c.name)||"");o(r).toBeInTheDocument()},G=async({canvasElement:n,args:e})=>{var d,u,m;const t=k(n),a=(d=e==null?void 0:e.buttons)==null?void 0:d.find(c=>c.isActive);if(a){const c=t.getByText(a.name);o(c).toBeInTheDocument(),o(c).toHaveTextContent(a.name)}const s=t.getAllByRole("button");o(s).toHaveLength(((u=e==null?void 0:e.buttons)==null?void 0:u.length)||0);const r=(m=e==null?void 0:e.buttons)==null?void 0:m.filter(c=>c.isActive);o(r).toHaveLength(1)},J=async({canvasElement:n})=>{const t=k(n).getAllByRole("button"),a=t[0];if(await l.click(a),o(a).toBeInTheDocument(),t.length>1){const r=t[1];await l.click(r),await y(()=>{o(r).toBeInTheDocument()})}const s=t[t.length-1];await l.click(s),await y(()=>{o(s).toBeInTheDocument()})},K=async({canvasElement:n})=>{const t=k(n).getAllByRole("button");t[0].focus(),o(t[0]).toHaveFocus(),await l.tab(),await y(()=>{o(t[1]).toHaveFocus()}),await l.tab(),await y(()=>{o(t[2]).toHaveFocus()}),await l.keyboard("{Enter}"),o(t[2]).toBeInTheDocument(),t[0].focus(),o(t[0]).toHaveFocus(),await l.keyboard(" "),o(t[0]).toBeInTheDocument()},ln={title:"Components/PortfolioNavbar",component:V,parameters:{layout:"centered",docs:{description:{component:"A horizontal navigation bar component with icon/image support for each button. Supports both Fluent UI icons (as React components) and traditional image URLs. Features active state management and click interactions. Commonly used for section navigation, tab switching, or filtering content in portfolio or dashboard interfaces."}}},tags:["autodocs"],argTypes:{buttons:{description:"Array of button configuration objects. Each button has a name, icon/image, click handler, unique ID, and active state.",table:{type:{summary:"ButtonDetailProps[]",detail:`Array<{
  name: string;
  onButtonClick: (id: string | number) => void;
  id: string | number;
  isActive: boolean;
  image: ComponentType<{ className?: string }> | string;
}>`},defaultValue:{summary:"required"},category:"Props"},control:"object"}}},L=[{id:1,name:"Overview",image:C,isActive:!0,onButtonClick:n=>console.log("Clicked:",n)},{id:2,name:"Projects",image:h,isActive:!1,onButtonClick:n=>console.log("Clicked:",n)},{id:3,name:"Skills",image:B,isActive:!1,onButtonClick:n=>console.log("Clicked:",n)},{id:4,name:"Experience",image:E,isActive:!1,onButtonClick:n=>console.log("Clicked:",n)}],p={args:{buttons:L},parameters:{docs:{description:{story:"Default portfolio navbar with four navigation buttons. The first button (Overview) is active by default."}}},decorators:[n=>i.jsx("div",{style:{width:"600px",padding:"20px"},children:i.jsx(n,{})})],play:$},g={args:{buttons:[{id:1,name:"Overview",image:C,isActive:!1,onButtonClick:n=>console.log("Clicked:",n)},{id:2,name:"Projects",image:h,isActive:!1,onButtonClick:n=>console.log("Clicked:",n)},{id:3,name:"Skills",image:B,isActive:!0,onButtonClick:n=>console.log("Clicked:",n)},{id:4,name:"Experience",image:E,isActive:!1,onButtonClick:n=>console.log("Clicked:",n)}]},parameters:{docs:{description:{story:"Navbar with a different active button (Skills). Demonstrates active state styling on the third button with icon support."}}},decorators:[n=>i.jsx("div",{style:{width:"600px",padding:"20px"},children:i.jsx(n,{})})],play:G},v={args:{buttons:L},parameters:{docs:{description:{story:"Interactive navbar demonstrating click behavior. Play function simulates clicking buttons and verifies the click handlers are called."}}},decorators:[n=>i.jsx("div",{style:{width:"600px",padding:"20px"},children:i.jsx(n,{})})],play:J},b={args:{buttons:[{id:"home",name:"Home",image:C,isActive:!0,onButtonClick:n=>console.log("Clicked:",n)},{id:"about",name:"About",image:O,isActive:!1,onButtonClick:n=>console.log("Clicked:",n)},{id:"services",name:"Services",image:Q,isActive:!1,onButtonClick:n=>console.log("Clicked:",n)},{id:"portfolio",name:"Portfolio",image:h,isActive:!1,onButtonClick:n=>console.log("Clicked:",n)},{id:"blog",name:"Blog",image:B,isActive:!1,onButtonClick:n=>console.log("Clicked:",n)},{id:"contact",name:"Contact",image:U,isActive:!1,onButtonClick:n=>console.log("Clicked:",n)}]},parameters:{docs:{description:{story:"Navbar with six buttons and corresponding Fluent UI icons to demonstrate layout with more navigation items. Uses string IDs instead of numbers."}}},decorators:[n=>i.jsx("div",{style:{width:"800px",padding:"20px"},children:i.jsx(n,{})})],play:K},f={args:{buttons:[{id:"home",name:"Home",image:C,isActive:!0,onButtonClick:n=>console.log("Clicked:",n)},{id:"about",name:"About",image:O,isActive:!1,onButtonClick:n=>console.log("Clicked:",n)},{id:"portfolio",name:"Portfolio",image:h,isActive:!1,onButtonClick:n=>console.log("Clicked:",n)},{id:"contact",name:"Contact",image:U,isActive:!1,onButtonClick:n=>console.log("Clicked:",n)}]},parameters:{docs:{description:{story:"Mobile view with multiple buttons showing how the navbar adapts. Active button (Home) displays both icon and name, while inactive buttons show only icons for space efficiency."}},viewport:{defaultViewport:"mobile1"}},decorators:[n=>i.jsx("div",{style:{width:"400px",padding:"20px"},children:i.jsx(n,{})})]};var w,A,x;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    buttons: sampleButtons
  },
  parameters: {
    docs: {
      description: {
        story: 'Default portfolio navbar with four navigation buttons. The first button (Overview) is active by default.'
      }
    }
  },
  decorators: [Story => <div style={{
    width: '600px',
    padding: '20px'
  }}>\r
        <Story />\r
      </div>],
  play: basicNavbarPlay
}`,...(x=(A=p.parameters)==null?void 0:A.docs)==null?void 0:x.source}}};var R,P,S;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    buttons: [{
      id: 1,
      name: 'Overview',
      image: HomeRegular,
      isActive: false,
      onButtonClick: (id: string | number) => console.log('Clicked:', id)
    }, {
      id: 2,
      name: 'Projects',
      image: DocumentRegular,
      isActive: false,
      onButtonClick: (id: string | number) => console.log('Clicked:', id)
    }, {
      id: 3,
      name: 'Skills',
      image: CodeRegular,
      isActive: true,
      onButtonClick: (id: string | number) => console.log('Clicked:', id)
    }, {
      id: 4,
      name: 'Experience',
      image: BriefcaseRegular,
      isActive: false,
      onButtonClick: (id: string | number) => console.log('Clicked:', id)
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Navbar with a different active button (Skills). Demonstrates active state styling on the third button with icon support.'
      }
    }
  },
  decorators: [Story => <div style={{
    width: '600px',
    padding: '20px'
  }}>\r
        <Story />\r
      </div>],
  play: activeStatePlay
}`,...(S=(P=g.parameters)==null?void 0:P.docs)==null?void 0:S.source}}};var D,I,j;v.parameters={...v.parameters,docs:{...(D=v.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    buttons: sampleButtons
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive navbar demonstrating click behavior. Play function simulates clicking buttons and verifies the click handlers are called.'
      }
    }
  },
  decorators: [Story => <div style={{
    width: '600px',
    padding: '20px'
  }}>\r
        <Story />\r
      </div>],
  play: clickInteractionPlay
}`,...(j=(I=v.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};var H,N,T;b.parameters={...b.parameters,docs:{...(H=b.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    buttons: [{
      id: 'home',
      name: 'Home',
      image: HomeRegular,
      isActive: true,
      onButtonClick: (id: string | number) => console.log('Clicked:', id)
    }, {
      id: 'about',
      name: 'About',
      image: PersonRegular,
      isActive: false,
      onButtonClick: (id: string | number) => console.log('Clicked:', id)
    }, {
      id: 'services',
      name: 'Services',
      image: BuildingRegular,
      isActive: false,
      onButtonClick: (id: string | number) => console.log('Clicked:', id)
    }, {
      id: 'portfolio',
      name: 'Portfolio',
      image: DocumentRegular,
      isActive: false,
      onButtonClick: (id: string | number) => console.log('Clicked:', id)
    }, {
      id: 'blog',
      name: 'Blog',
      image: CodeRegular,
      isActive: false,
      onButtonClick: (id: string | number) => console.log('Clicked:', id)
    }, {
      id: 'contact',
      name: 'Contact',
      image: MailRegular,
      isActive: false,
      onButtonClick: (id: string | number) => console.log('Clicked:', id)
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Navbar with six buttons and corresponding Fluent UI icons to demonstrate layout with more navigation items. Uses string IDs instead of numbers.'
      }
    }
  },
  decorators: [Story => <div style={{
    width: '800px',
    padding: '20px'
  }}>\r
        <Story />\r
      </div>],
  play: keyboardNavigationPlay
}`,...(T=(N=b.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};var M,_,F;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    buttons: [{
      id: 'home',
      name: 'Home',
      image: HomeRegular,
      isActive: true,
      onButtonClick: (id: string | number) => console.log('Clicked:', id)
    }, {
      id: 'about',
      name: 'About',
      image: PersonRegular,
      isActive: false,
      onButtonClick: (id: string | number) => console.log('Clicked:', id)
    }, {
      id: 'portfolio',
      name: 'Portfolio',
      image: DocumentRegular,
      isActive: false,
      onButtonClick: (id: string | number) => console.log('Clicked:', id)
    }, {
      id: 'contact',
      name: 'Contact',
      image: MailRegular,
      isActive: false,
      onButtonClick: (id: string | number) => console.log('Clicked:', id)
    }]
  },
  parameters: {
    docs: {
      description: {
        story: 'Mobile view with multiple buttons showing how the navbar adapts. Active button (Home) displays both icon and name, while inactive buttons show only icons for space efficiency.'
      }
    },
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  decorators: [Story => <div style={{
    width: '400px',
    padding: '20px'
  }}>\r
        <Story />\r
      </div>]
}`,...(F=(_=f.parameters)==null?void 0:_.docs)==null?void 0:F.source}}};const dn=["Default","DifferentActiveState","WithClickInteraction","ManyButtons","MobileView"];export{p as Default,g as DifferentActiveState,b as ManyButtons,f as MobileView,v as WithClickInteraction,dn as __namedExportsOrder,ln as default};
