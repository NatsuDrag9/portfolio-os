import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{P as C,M as T,C as R}from"./chunk-6-DJnLnwDl.js";import{B as j}from"./chunk-26-C7plUSKS.js";import{P as N}from"./chunk-27-NUOEs6SA.js";import{L as I}from"./chunk-18-DjZtRj47.js";import"./createFluentIcon-BZ9LiokK.js";import"./index-DvOVhSYJ.js";function n({image:a,label:_,content:t,contentType:c}){const l=typeof a!="string",d=l?a:null,D=()=>c==="email"?e.jsx("a",{href:`mailto:${t}`,className:"display-card__value email",title:t,children:t}):c==="link"?e.jsx("a",{href:t,className:"display-card__value link",title:t,target:"_blank",rel:"noopener noreferrer",children:t}):e.jsx("p",{className:"display-card__value",title:t,children:t});return e.jsxs("div",{className:"display-card",children:[e.jsx("div",{className:`display-card__left ${l?"fluent-icon":""}`,children:d?e.jsx(d,{className:"display-card__fluent-icon"}):e.jsx("img",{src:l?"":a,alt:"sidebar-avatar",className:"display-card__image"})}),e.jsxs("div",{className:"display-card__right",children:[e.jsx("h6",{className:"display-card__label","data-tool":!0,children:_}),D()]})]})}n.__docgenInfo={description:"",methods:[],displayName:"DisplayCard",props:{image:{required:!0,tsType:{name:"union",raw:"string | ComponentType<{ className: string }>",elements:[{name:"string"},{name:"ComponentType",elements:[{name:"signature",type:"object",raw:"{ className: string }",signature:{properties:[{key:"className",value:{name:"string",required:!0}}]}}],raw:"ComponentType<{ className: string }>"}]},description:""},label:{required:!0,tsType:{name:"string"},description:""},content:{required:!0,tsType:{name:"string"},description:""},contentType:{required:!1,tsType:{name:"union",raw:"'email' | 'link' | string",elements:[{name:"literal",value:"'email'"},{name:"literal",value:"'link'"},{name:"string"}]},description:""}}};const q={title:"Components/DisplayCard",component:n,parameters:{layout:"centered",docs:{description:{component:"A versatile display card component that shows an icon/image alongside a label and content. Supports both Fluent UI icons (as React components) and traditional image URLs. Content can be rendered as plain text, clickable email links, or external links. Commonly used for user profiles, contact information, or data display in sidebar."}}},tags:["autodocs"],argTypes:{image:{description:"Icon or image to display. Can be either a Fluent UI icon component or an image URL string.",table:{type:{summary:"string | ComponentType<{ className: string }>",detail:`Union type that accepts:
- string: Image URL or path
- ComponentType: Fluent UI icon component`},defaultValue:{summary:"required"},category:"Props"},control:!1},label:{description:"Label text displayed above the content. Typically describes the type of information shown.",table:{type:{summary:"string"},defaultValue:{summary:"required"},category:"Props"},control:"text"},content:{description:"Main content text to display. The primary information shown to the user.",table:{type:{summary:"string"},defaultValue:{summary:"required"},category:"Props"},control:"text"},contentType:{description:`Type of content to render. Determines how the content is displayed and whether it's interactive. "email" creates a mailto link, "link" creates an external link with noopener noreferrer, or leave undefined for plain text.`,table:{type:{summary:'"email" | "link" | string'},defaultValue:{summary:"undefined"},category:"Props"},control:{type:"select",options:[void 0,"email","link"]}}}},r={args:{image:C,label:"Username",content:"Admin"},parameters:{docs:{description:{story:"DisplayCard using a Fluent UI icon component with plain text content. The icon is rendered as an SVG with proper styling and accessibility."}}},decorators:[a=>e.jsx("div",{style:{width:"400px",padding:"20px"},children:e.jsx(a,{})})]},i={args:{image:T,label:"Email",content:"admin@savart.com",contentType:"email"},parameters:{docs:{description:{story:"DisplayCard with email content type. The content is rendered as a clickable mailto link that opens the user's default email client when clicked."}}},decorators:[a=>e.jsx("div",{style:{width:"400px",padding:"20px"},children:e.jsx(a,{})})]},s={args:{image:j,label:"Website",content:"https://savart.com",contentType:"link"},parameters:{docs:{description:{story:'DisplayCard with link content type. The content is rendered as a clickable external link that opens in a new tab with proper security attributes (target="_blank" rel="noopener noreferrer").'}}},decorators:[a=>e.jsx("div",{style:{width:"400px",padding:"20px"},children:e.jsx(a,{})})]},o={render:()=>e.jsxs("div",{style:{width:"400px",padding:"20px",display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(n,{image:C,label:"Full Name",content:"Rohit Kumar"}),e.jsx(n,{image:T,label:"Email",content:"rohit@savart.com",contentType:"email"}),e.jsx(n,{image:N,label:"Phone",content:"+91 98765 43210"}),e.jsx(n,{image:j,label:"Company Website",content:"https://savart.com",contentType:"link"}),e.jsx(n,{image:I,label:"Location",content:"Hyderabad, India"}),e.jsx(n,{image:R,label:"Joined",content:"January 2024"})]}),parameters:{docs:{description:{story:"Demonstration of multiple DisplayCards with different content types: plain text (name, phone, location, joined date), email link (opens email client), and external link (opens website). This pattern is common in user profiles and contact information panels where some fields are interactive while others are static."}}}};var p,m,y;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    image: PersonRegular,
    label: 'Username',
    content: 'Admin'
  },
  parameters: {
    docs: {
      description: {
        story: 'DisplayCard using a Fluent UI icon component with plain text content. The icon is rendered as an SVG with proper styling and accessibility.'
      }
    }
  },
  decorators: [Story => <div style={{
    width: '400px',
    padding: '20px'
  }}>\r
        <Story />\r
      </div>]
}`,...(y=(m=r.parameters)==null?void 0:m.docs)==null?void 0:y.source}}};var u,g,h;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    image: MailRegular,
    label: 'Email',
    content: 'admin@savart.com',
    contentType: 'email'
  },
  parameters: {
    docs: {
      description: {
        story: "DisplayCard with email content type. The content is rendered as a clickable mailto link that opens the user's default email client when clicked."
      }
    }
  },
  decorators: [Story => <div style={{
    width: '400px',
    padding: '20px'
  }}>\r
        <Story />\r
      </div>]
}`,...(h=(g=i.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var x,b,f;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    image: BuildingRegular,
    label: 'Website',
    content: 'https://savart.com',
    contentType: 'link'
  },
  parameters: {
    docs: {
      description: {
        story: 'DisplayCard with link content type. The content is rendered as a clickable external link that opens in a new tab with proper security attributes (target="_blank" rel="noopener noreferrer").'
      }
    }
  },
  decorators: [Story => <div style={{
    width: '400px',
    padding: '20px'
  }}>\r
        <Story />\r
      </div>]
}`,...(f=(b=s.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var k,w,v;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '400px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>\r
      <DisplayCard image={PersonRegular} label="Full Name" content="Rohit Kumar" />\r
      <DisplayCard image={MailRegular} label="Email" content="rohit@savart.com" contentType="email" />\r
      <DisplayCard image={PhoneRegular} label="Phone" content="+91 98765 43210" />\r
      <DisplayCard image={BuildingRegular} label="Company Website" content="https://savart.com" contentType="link" />\r
      <DisplayCard image={LocationRegular} label="Location" content="Hyderabad, India" />\r
      <DisplayCard image={CalendarRegular} label="Joined" content="January 2024" />\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of multiple DisplayCards with different content types: plain text (name, phone, location, joined date), email link (opens email client), and external link (opens website). This pattern is common in user profiles and contact information panels where some fields are interactive while others are static.'
      }
    }
  }
}`,...(v=(w=o.parameters)==null?void 0:w.docs)==null?void 0:v.source}}};const M=["WithFluentIcon","WithEmailLink","WithExternalLink","MixedContentTypes"];export{o as MixedContentTypes,i as WithEmailLink,s as WithExternalLink,r as WithFluentIcon,M as __namedExportsOrder,q as default};
