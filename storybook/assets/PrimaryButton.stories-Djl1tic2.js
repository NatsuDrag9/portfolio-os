import{j as b}from"./jsx-runtime-D_zvdyIk.js";import{w as p,e as i,u as a,f as r}from"./index-L8OlCEhE.js";function P({name:n,onButtonClick:t,buttonType:u="button",formId:o=void 0,isDisabled:e=!1}){const d=()=>{t&&t()};return b.jsx("button",{className:"primary-button",type:u,onClick:d,form:o,disabled:e,children:n})}P.__docgenInfo={description:"",methods:[],displayName:"PrimaryButton",props:{name:{required:!0,tsType:{name:"string"},description:""},onButtonClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},buttonType:{required:!1,tsType:{name:"union",raw:"'button' | 'submit'",elements:[{name:"literal",value:"'button'"},{name:"literal",value:"'submit'"}]},description:"",defaultValue:{value:"'button'",computed:!1}},formId:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"undefined",computed:!0}},isDisabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const A=async({canvasElement:n,args:t})=>{const o=p(n).getByRole("button",{name:t==null?void 0:t.name});i(o).toBeInTheDocument(),i(o).toHaveAttribute("type",(t==null?void 0:t.buttonType)||"button"),i(o).toHaveTextContent(t==null?void 0:t.name),await a.click(o),await new Promise(e=>setTimeout(e,200))},D=async({canvasElement:n,args:t})=>{const o=p(n).getByRole("button",{name:t==null?void 0:t.name});await a.tab(),await new Promise(e=>setTimeout(e,100)),i(document.activeElement).toBe(o),await a.keyboard("{Enter}"),await new Promise(e=>setTimeout(e,300)),await a.tab(),await a.tab({shift:!0}),await new Promise(e=>setTimeout(e,100)),await a.keyboard(" "),await new Promise(e=>setTimeout(e,300))},j=async({canvasElement:n,args:t})=>{const o=p(n).getByRole("button",{name:t==null?void 0:t.name});i(o).toHaveAttribute("type","submit"),t!=null&&t.formId&&i(o).toHaveAttribute("form",t==null?void 0:t.formId),await a.click(o),await new Promise(e=>setTimeout(e,300))},q=async({canvasElement:n,args:t})=>{const o=p(n).getByRole("button",{name:t==null?void 0:t.name});for(let e=0;e<3;e++)await a.click(o),await new Promise(d=>setTimeout(d,150))},R={title:"Components/PrimaryButton",component:P,parameters:{layout:"centered",docs:{description:{component:"A primary action button component used for main CTAs and form submissions. Supports both standalone button behavior and form submission with formId association."}}},argTypes:{name:{control:"text",description:"Button label text displayed inside the button",table:{type:{summary:"string"}}},onButtonClick:{description:"Callback function triggered when the button is clicked",table:{type:{summary:"() => void"}},action:"button clicked"},buttonType:{control:"select",options:["button","submit"],description:"HTML button type attribute",table:{type:{summary:"'button' | 'submit'"},defaultValue:{summary:"'button'"}}},formId:{control:"text",description:"Optional form ID to associate the button with a form element",table:{type:{summary:"string"},defaultValue:{summary:"undefined"}}}},args:{name:"Click Me",onButtonClick:r(),buttonType:"button",formId:void 0},tags:["autodocs"]},s={args:{name:"Primary Action",buttonType:"button",onButtonClick:r()},play:A},m={args:{name:"Submit",buttonType:"submit",formId:"example-form",onButtonClick:r()},play:j,decorators:[n=>b.jsx("form",{id:"example-form",onSubmit:t=>{t.preventDefault(),console.log("Form submitted")},children:b.jsx(n,{})})]},c={args:{name:"Save Changes",buttonType:"button",onButtonClick:r()},play:D},l={args:{name:"Confirm",buttonType:"button",onButtonClick:r()},play:q};var y,f,v;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    name: 'Primary Action',
    buttonType: 'button',
    onButtonClick: fn()
  },
  play: playClickButton
}`,...(v=(f=s.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var w,T,B;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    name: 'Submit',
    buttonType: 'submit',
    formId: 'example-form',
    onButtonClick: fn()
  },
  play: playFormSubmit,
  decorators: [Story => <form id="example-form" onSubmit={e => {
    e.preventDefault();
    console.log('Form submitted');
  }}>\r
        <Story />\r
      </form>]
}`,...(B=(T=m.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};var k,C,S;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    name: 'Save Changes',
    buttonType: 'button',
    onButtonClick: fn()
  },
  play: playKeyboardInteraction
}`,...(S=(C=c.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var h,x,I;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    name: 'Confirm',
    buttonType: 'button',
    onButtonClick: fn()
  },
  play: playMultipleClicks
}`,...(I=(x=l.parameters)==null?void 0:x.docs)==null?void 0:I.source}}};const V=["Default","SubmitButton","SaveButton","Interactive"];export{s as Default,l as Interactive,c as SaveButton,m as SubmitButton,V as __namedExportsOrder,R as default};
