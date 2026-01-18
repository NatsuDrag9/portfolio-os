import{w as s,e,u as c,f as j}from"./index-L8OlCEhE.js";import{Q as V}from"./QuickActionButton-eq64YGTn.js";import{W as K,a as b,b as z}from"./chunk-11-CjlV4GGo.js";import{A as Q,a as E}from"./chunk-24-Kif6bkd-.js";import{S as L,a as O}from"./chunk-4-SzNxvNiQ.js";import"./jsx-runtime-D_zvdyIk.js";import"./createFluentIcon-BZ9LiokK.js";import"./index-DvOVhSYJ.js";const k=async({canvasElement:a,args:t})=>{const o=s(a),n=o.getByRole("button");e(n).toBeInTheDocument(),e(n).toHaveClass("qa-button__button");const i=o.getByText(t==null?void 0:t.name);e(i).toBeInTheDocument(),e(i).toHaveClass("qa-button__name");const l=n.querySelector(".qa-button__fluent-icon");e(l).toBeInTheDocument(),t!=null&&t.isActive?e(n).toHaveClass("qa-button__button--active"):e(n).not.toHaveClass("qa-button__button--active")},G=async({canvasElement:a,args:t})=>{const n=s(a).getByRole("button");e(n).toBeInTheDocument(),t!=null&&t.isActive?e(n).toHaveClass("qa-button__button--active"):e(n).not.toHaveClass("qa-button__button--active"),await c.click(n),e(t==null?void 0:t.onButtonClick).toHaveBeenCalledTimes(1),e(t==null?void 0:t.onButtonClick).toHaveBeenCalledWith(t==null?void 0:t.actionType),await c.click(n),e(t==null?void 0:t.onButtonClick).toHaveBeenCalledTimes(2)},J=async({canvasElement:a,args:t})=>{const n=s(a).getByRole("button");e(n).toBeInTheDocument(),await c.tab(),e(n).toHaveFocus(),await c.keyboard("{Enter}"),e(t==null?void 0:t.onButtonClick).toHaveBeenCalledTimes(1),e(t==null?void 0:t.onButtonClick).toHaveBeenCalledWith(t==null?void 0:t.actionType),await c.keyboard(" "),e(t==null?void 0:t.onButtonClick).toHaveBeenCalledTimes(2)},U=async({canvasElement:a,args:t})=>{const o=s(a),n=o.getByRole("button");e(n).toBeInTheDocument();const i=n.querySelector(".qa-button__fluent-icon");e(i).toBeInTheDocument(),await c.click(n),e(n).toBeInTheDocument();const l=o.getByText(t==null?void 0:t.name);e(l).toBeInTheDocument()},X=async({canvasElement:a,args:t})=>{const o=s(a),n=o.getByRole("button");e(n).toBeInTheDocument(),e(n).toHaveClass("qa-button__button--active");const i=n.querySelector(".qa-button__fluent-icon");e(i).toBeInTheDocument(),e(i).not.toHaveClass("qa-button__fluent-icon--default");const l=o.getByText(t==null?void 0:t.name);e(l).toBeInTheDocument()},it={title:"Components/QuickActionButton",component:V,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A toggleable quick action button used in the Windows 11 Action Center. Displays an icon that changes based on the isActive prop, with a label underneath."}}},argTypes:{actionType:{control:"radio",options:["night-light","airplane","settings"],description:"The type of quick action this button represents",table:{type:{summary:"'night-light' | 'airplane' | 'settings'"}}},components:{description:"Object containing default and clicked icon components",table:{type:{summary:"{ default: ComponentType, clicked: ComponentType }"}}},name:{control:"text",description:"Label displayed below the button",table:{type:{summary:"string"}}},isActive:{control:"boolean",description:"Whether the button is in active state",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},onButtonClick:{action:"buttonClicked",description:"Callback fired when button is clicked, receives actionType",table:{type:{summary:"(actionType: QuickActionsType) => void"}}}},args:{onButtonClick:j(),isActive:!1}},u={args:{actionType:"night-light",name:"Night light",isActive:!1,components:{default:b,clicked:K}},play:k},r={args:{actionType:"airplane",name:"Airplane mode",isActive:!1,components:{default:E,clicked:Q}},play:k},p={args:{actionType:"settings",name:"Settings",isActive:!1,components:{default:O,clicked:L}},play:k},m={args:{actionType:"night-light",name:"Night light",isActive:!0,components:{default:b,clicked:K}},play:X},d={args:{actionType:"night-light",name:"Night light",isActive:!1,components:{default:b,clicked:z}},play:G},y={args:{actionType:"airplane",name:"Airplane mode",isActive:!1,components:{default:E,clicked:Q}},play:J},h={args:{actionType:"settings",name:"Settings",isActive:!1,components:{default:O,clicked:L},onButtonClick:void 0},play:U};var v,A,T;u.parameters={...u.parameters,docs:{...(v=u.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    actionType: 'night-light',
    name: 'Night light',
    isActive: false,
    components: {
      default: WeatherMoonRegular,
      clicked: WeatherSunnyRegular
    }
  },
  play: quickActionButtonPlayFunction
}`,...(T=(A=u.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var B,f,g;r.parameters={...r.parameters,docs:{...(B=r.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    actionType: 'airplane',
    name: 'Airplane mode',
    isActive: false,
    components: {
      default: AirplaneRegular,
      clicked: AirplaneFilled
    }
  },
  play: quickActionButtonPlayFunction
}`,...(g=(f=r.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var C,q,S;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    actionType: 'settings',
    name: 'Settings',
    isActive: false,
    components: {
      default: SettingsRegular,
      clicked: SettingsFilled
    }
  },
  play: quickActionButtonPlayFunction
}`,...(S=(q=p.parameters)==null?void 0:q.docs)==null?void 0:S.source}}};var _,F,R;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    actionType: 'night-light',
    name: 'Night light',
    isActive: true,
    components: {
      default: WeatherMoonRegular,
      clicked: WeatherSunnyRegular
    }
  },
  play: quickActionButtonActivePlayFunction
}`,...(R=(F=m.parameters)==null?void 0:F.docs)==null?void 0:R.source}}};var H,W,D;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    actionType: 'night-light',
    name: 'Night light',
    isActive: false,
    components: {
      default: WeatherMoonRegular,
      clicked: WeatherMoonFilled
    }
  },
  play: quickActionButtonClickPlayFunction
}`,...(D=(W=d.parameters)==null?void 0:W.docs)==null?void 0:D.source}}};var I,w,N;y.parameters={...y.parameters,docs:{...(I=y.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    actionType: 'airplane',
    name: 'Airplane mode',
    isActive: false,
    components: {
      default: AirplaneRegular,
      clicked: AirplaneFilled
    }
  },
  play: quickActionButtonKeyboardPlayFunction
}`,...(N=(w=y.parameters)==null?void 0:w.docs)==null?void 0:N.source}}};var P,M,x;h.parameters={...h.parameters,docs:{...(P=h.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    actionType: 'settings',
    name: 'Settings',
    isActive: false,
    components: {
      default: SettingsRegular,
      clicked: SettingsFilled
    },
    onButtonClick: undefined
  },
  play: quickActionButtonNoCallbackPlayFunction
}`,...(x=(M=h.parameters)==null?void 0:M.docs)==null?void 0:x.source}}};const ct=["NightLight","AirplaneMode","Settings","ActiveState","ClickToggleTest","KeyboardAccessibilityTest","NoCallbackTest"];export{m as ActiveState,r as AirplaneMode,d as ClickToggleTest,y as KeyboardAccessibilityTest,u as NightLight,h as NoCallbackTest,p as Settings,ct as __namedExportsOrder,it as default};
