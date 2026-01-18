import{w as D,u as o,e as h,f as L}from"./index-L8OlCEhE.js";import{j as c}from"./jsx-runtime-D_zvdyIk.js";import{r as b}from"./index-DvOVhSYJ.js";import{u as M}from"./useClickOutsideModal-CtMuagMQ.js";import{b as F}from"./chunk-24-Kif6bkd-.js";import"./createFluentIcon-BZ9LiokK.js";function j({options:t,selectedOption:a,label:s,placeholder:n="Select an option",onOptionSelect:i,isDisabled:r}){const[d,y]=b.useState(!1),[m,p]=b.useState(-1),w=b.useRef(null);M(d,()=>y(!1),w),b.useEffect(()=>{if(d&&m>=0&&w.current){const e=w.current.querySelectorAll('[role="option"]')[m];e==null||e.focus()}},[m,d]);const q=e=>{r||(y(u=>!u),p(-1))},x=e=>{r||(i(e),p(-1),y(!1))},U=(e,u)=>{switch(e.key){case"Enter":case" ":e.preventDefault(),x(u);break;case"ArrowDown":e.preventDefault(),p(l=>l<t.length-1?l+1:l);break;case"ArrowUp":e.preventDefault(),p(l=>l>0?l-1:-1);break;case"Escape":e.preventDefault(),y(!1),p(-1);break;case"Home":e.preventDefault(),p(0);break;case"End":e.preventDefault(),p(t.length-1);break}};return c.jsxs("div",{className:`generic-dropdown ${r?"generic-dropdown--disabled":""}`,ref:w,children:[c.jsx("p",{className:"generic-dropdown__label",children:s}),c.jsxs("button",{className:`generic-dropdown__selected-option-container ${d?"open":""}`,onClick:q,"aria-haspopup":"listbox","aria-expanded":d,disabled:r,children:[c.jsx("p",{className:"generic-dropdown__selected-option",children:a.displayName||n}),c.jsx(F,{className:`generic-dropdown__fluent-icon ${d?"open":""} `})]}),d&&c.jsx("div",{role:"listbox",className:"generic-dropdown__options",children:t.map((e,u)=>c.jsx("div",{className:`generic-dropdown__option ${m===u?"focused":""} ${e.value===a.value?"selected":""}`,role:"option",onClick:l=>x(e),onKeyDown:l=>U(l,e),tabIndex:m===u?0:-1,"aria-selected":e.value===a.value,children:e.displayName},e.value))})]})}j.__docgenInfo={description:"",methods:[],displayName:"GenericDropdown",props:{options:{required:!0,tsType:{name:"Array",elements:[{name:"DropdownType"}],raw:"DropdownType[]"},description:""},selectedOption:{required:!0,tsType:{name:"DropdownType"},description:""},label:{required:!0,tsType:{name:"string"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Select an option'",computed:!1}},onOptionSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(selectedOption: DropdownType) => void",signature:{arguments:[{type:{name:"DropdownType"},name:"selectedOption"}],return:{name:"void"}}},description:""},isDisabled:{required:!1,tsType:{name:"boolean"},description:""}}};const K=async({canvasElement:t})=>{const a=D(t),s=a.getByRole("button",{expanded:!1});await o.click(s);const n=await a.findByRole("listbox");h(n).toBeInTheDocument();const i=a.getAllByRole("option");await o.click(i[1])},V=async({canvasElement:t})=>{const a=D(t),s=a.getByRole("button");await o.click(s),await a.findByRole("listbox"),await o.keyboard("{ArrowDown}"),await new Promise(n=>setTimeout(n,100)),await o.keyboard("{ArrowDown}"),await new Promise(n=>setTimeout(n,100)),await o.keyboard("{ArrowUp}"),await new Promise(n=>setTimeout(n,100)),await o.keyboard("{End}"),await new Promise(n=>setTimeout(n,100)),await o.keyboard("{Home}"),await new Promise(n=>setTimeout(n,100)),await o.keyboard("{Enter}")},$=async({canvasElement:t})=>{const a=D(t),s=a.getByRole("button",{expanded:!1});await o.click(s);const n=await a.findByRole("listbox");h(n).toBeInTheDocument(),await new Promise(r=>setTimeout(r,1e3)),await o.keyboard("{Escape}"),await new Promise(r=>setTimeout(r,1e3));const i=a.queryByRole("listbox");h(i).not.toBeInTheDocument()},z=async({canvasElement:t})=>{const a=D(t),s=a.getByRole("button");await o.click(s);const n=await a.findByRole("listbox");h(n).toBeInTheDocument(),await new Promise(i=>setTimeout(i,200)),await o.click(t),await new Promise(i=>setTimeout(i,200))},Y={title:"Components/GenericDropdown",component:j,parameters:{layout:"centered",docs:{description:{component:"A fully accessible dropdown component with keyboard navigation support. Supports custom options, selection state, and disabled functionality. Follows ARIA best practices for combobox/listbox patterns."}}},argTypes:{options:{control:"object",description:"Array of dropdown options with value and displayName",table:{type:{summary:"DropdownType[]"}}},selectedOption:{control:"object",description:"Currently selected option object",table:{type:{summary:"DropdownType"}}},label:{control:"text",description:"Label text displayed above the dropdown",table:{type:{summary:"string"}}},placeholder:{control:"text",description:"Placeholder text when no option is selected",table:{type:{summary:"string"},defaultValue:{summary:'"Select an option"'}}},onOptionSelect:{description:"Callback function triggered when an option is selected",table:{type:{summary:"(selectedOption: DropdownType) => void"}},action:"option selected"},isDisabled:{control:"boolean",description:"Whether the dropdown is disabled",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}}},args:{options:[{value:"1",displayName:"Option 1"},{value:"2",displayName:"Option 2"},{value:"3",displayName:"Option 3"}],selectedOption:{value:"",displayName:""},label:"Select Option",placeholder:"Select an option",onOptionSelect:L(),isDisabled:!1},tags:["autodocs"]},v={args:{options:[{value:"react",displayName:"React"},{value:"vue",displayName:"Vue"},{value:"angular",displayName:"Angular"},{value:"svelte",displayName:"Svelte"}],selectedOption:{value:"",displayName:""},label:"Frontend Framework",placeholder:"Choose a framework",isDisabled:!1},play:K},g={args:{options:[{value:"india",displayName:"India"},{value:"usa",displayName:"United States"},{value:"uk",displayName:"United Kingdom"},{value:"canada",displayName:"Canada"}],selectedOption:{value:"india",displayName:"India"},label:"Country",placeholder:"Select a country",isDisabled:!1},play:V},f={args:{options:[{value:"small",displayName:"Small"},{value:"medium",displayName:"Medium"},{value:"large",displayName:"Large"}],selectedOption:{value:"medium",displayName:"Medium"},label:"Size",placeholder:"Select size",isDisabled:!0}},N={args:{options:[{value:"low",displayName:"Low Priority"},{value:"medium",displayName:"Medium Priority"},{value:"high",displayName:"High Priority"},{value:"urgent",displayName:"Urgent"}],selectedOption:{value:"",displayName:""},label:"Priority Level",placeholder:"Set priority",isDisabled:!1},play:async({canvasElement:t,args:a})=>{await $({canvasElement:t}),await z({canvasElement:t})}};var S,k,O;v.parameters={...v.parameters,docs:{...(S=v.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    options: [{
      value: 'react',
      displayName: 'React'
    }, {
      value: 'vue',
      displayName: 'Vue'
    }, {
      value: 'angular',
      displayName: 'Angular'
    }, {
      value: 'svelte',
      displayName: 'Svelte'
    }],
    selectedOption: {
      value: '',
      displayName: ''
    },
    label: 'Frontend Framework',
    placeholder: 'Choose a framework',
    isDisabled: false
  },
  play: playSelectOption
}`,...(O=(k=v.parameters)==null?void 0:k.docs)==null?void 0:O.source}}};var T,B,P;g.parameters={...g.parameters,docs:{...(T=g.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    options: [{
      value: 'india',
      displayName: 'India'
    }, {
      value: 'usa',
      displayName: 'United States'
    }, {
      value: 'uk',
      displayName: 'United Kingdom'
    }, {
      value: 'canada',
      displayName: 'Canada'
    }],
    selectedOption: {
      value: 'india',
      displayName: 'India'
    },
    label: 'Country',
    placeholder: 'Select a country',
    isDisabled: false
  },
  play: playKeyboardNavigation
}`,...(P=(B=g.parameters)==null?void 0:B.docs)==null?void 0:P.source}}};var _,C,R;f.parameters={...f.parameters,docs:{...(_=f.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    options: [{
      value: 'small',
      displayName: 'Small'
    }, {
      value: 'medium',
      displayName: 'Medium'
    }, {
      value: 'large',
      displayName: 'Large'
    }],
    selectedOption: {
      value: 'medium',
      displayName: 'Medium'
    },
    label: 'Size',
    placeholder: 'Select size',
    isDisabled: true
  }
}`,...(R=(C=f.parameters)==null?void 0:C.docs)==null?void 0:R.source}}};var I,A,E;N.parameters={...N.parameters,docs:{...(I=N.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    options: [{
      value: 'low',
      displayName: 'Low Priority'
    }, {
      value: 'medium',
      displayName: 'Medium Priority'
    }, {
      value: 'high',
      displayName: 'High Priority'
    }, {
      value: 'urgent',
      displayName: 'Urgent'
    }],
    selectedOption: {
      value: '',
      displayName: ''
    },
    label: 'Priority Level',
    placeholder: 'Set priority',
    isDisabled: false
  },
  play: async ({
    canvasElement,
    args
  }) => {
    await playEscapeClose({
      canvasElement,
      args
    });
    await playClickOutside({
      canvasElement,
      args
    });
  }
}`,...(E=(A=N.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};const Z=["Default","WithSelection","Disabled","Interactive"];export{v as Default,f as Disabled,N as Interactive,g as WithSelection,Z as __namedExportsOrder,Y as default};
