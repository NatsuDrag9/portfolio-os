import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{u as f,a as K,Q as Ge,F as Ze,S as B,B as Ke,A as J}from"./store-BKo5rbBN.js";import{r as S,R as Je}from"./index-DvOVhSYJ.js";import{A as Xe}from"./AppIcon-Cs8st3sV.js";import{Q as Ee}from"./QuickActionButton-eq64YGTn.js";import{S as oe,w as U}from"./dom.esm-Bv4uKQDH.js";import{u as et}from"./useClickOutsideModal-CtMuagMQ.js";import{u as Ve}from"./useWindowManager--Y6WpBZB.js";import{u as je}from"./useMediaQuery-CtBJNUaJ.js";import{c as tt}from"./createFluentIcon-BZ9LiokK.js";import{W as st,a as ot}from"./chunk-7-CdrDaij8.js";import{b as nt}from"./chunk-3-B_RIhxAf.js";import{w as X,e as t,u as C}from"./index-L8OlCEhE.js";import"./wallpaper-default-qF7WhCEw.js";import"./chunk-18-DjZtRj47.js";import"./chunk-4-SzNxvNiQ.js";import"./chunk-25-iOT6TxgI.js";import"./chunk-24-Kif6bkd-.js";import"./chunk-11-CjlV4GGo.js";import"./index-BYLy_Wld.js";import"./index-DR0bsqIr.js";const at=tt("Search12Filled","12",["M5 1a4 4 0 1 0 2.25 7.3l2.47 2.48a.75.75 0 1 0 1.06-1.06L8.31 7.25A4 4 0 0 0 5 1ZM2.5 5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z"]);function Z({isOpen:e,onClose:n}){const s=S.useRef(null),{taskbarAlignment:o}=f(),a=je("(max-width: 819px)"),[u,m]=S.useState(!1);et(e,n,s,void 0,{fadeOutDuration:Ze,onBeforeClose:()=>m(!0)});const{activeQuickActions:l,toggleQuickAction:h,brightnessLevel:I,setBrightnessLevel:_,setVolumeLevel:A,volumeLevel:w}=f(),{activeWindows:v}=K(),{launchWindow:L,closeWindow:q}=Ve();S.useEffect(()=>{const c=v.find(T=>{var y;return(y=T.id)==null?void 0:y.startsWith("settings-")}),b=l.includes("settings");(!c&&b||c&&!b)&&h("settings")},[v,l,h]);const G=S.useCallback(c=>{if(c==="settings"){const b=v.find(T=>{var y;return(y=T.id)==null?void 0:y.startsWith("settings-")});b&&b.id?(q(b.id),l.includes("settings")&&h("settings")):(L("settings"),l.includes("settings")||h("settings"));return}h(c)},[v,l,q,L,h]),M=S.useCallback((c,b)=>{if(b==="brightness"){_(c);return}A(c)},[_,A]),x=()=>a||o==="left"||o==="right"?"vertical":"horizontal";return r.jsxs("div",{className:`taskbar__qa-popup taskbar-${o} ${a?"mobile":""} ${u?"exiting":""}`,ref:s,children:[r.jsx("div",{className:`taskbar__qa-buttons taskbar-${o} ${a?"mobile":""}`,children:Object.values(Ge).map(c=>r.jsx(Ee,{actionType:c.actionType,components:c.components,name:c.name,isActive:l.includes(c.actionType),onButtonClick:G},c.actionType))}),r.jsxs("div",{className:`taskbar__qa-sliders taskbar-${o} ${a?"mobile":""}`,children:[r.jsx(oe,{onSliderChange:M,sliderFor:"brightness",sliderValue:I,alignment:x()}),r.jsx(oe,{onSliderChange:M,sliderFor:"volume",sliderValue:w,alignment:x()})]})]})}Z.__docgenInfo={description:"",methods:[],displayName:"QuickActionsPopup",props:{isOpen:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const rt=(e,n,s)=>e.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:n==="12h",timeZone:s}),it=(e,n,s)=>{const o={day:"2-digit",month:"2-digit",year:"numeric",timeZone:s},a=new Intl.DateTimeFormat("en-GB",o).format(e),[u,m,l]=a.split("/");return n==="DD/MM/YYYY"?`${u}-${m}-${l}`:`${m}-${u}-${l}`};function Ne(){const{taskbarAlignment:e,isSearchVisible:n,showMoreIcons:s,setStartMenuOpen:o,startMenuOpen:a,searchValue:u,setSearchValue:m,timeFormat:l,dateFormat:h,autoSyncDateTime:I,timezone:_,activeQuickActions:A}=f(),[w,v]=S.useState(!1),[L,q]=S.useState(""),[G,M]=S.useState(""),x=je("(max-width: 819px)"),{taskbarPinnedAppIds:c,windowInstanceCounters:b,togglePin:T,activeWindows:y}=K(),{focusWindow:Oe,closeWindow:P,restoreOrFocusApp:$e,launchWindow:E}=Ve(),Re=Je.useMemo(()=>{const i=Object.keys(b).filter(W=>b[W]>0),d=new Set([...c,...i]);return Array.from(d)},[c,b]);S.useEffect(()=>{const i=()=>{const p=new Date,k=I?void 0:_;q(rt(p,l,k)),M(it(p,h,k))};i();const d=new Date,W=(60-d.getSeconds())*1e3-d.getMilliseconds(),D=setTimeout(()=>{i();const p=setInterval(i,6e4);return()=>clearInterval(p)},W);return()=>clearTimeout(D)},[l,h,I,_]),S.useEffect(()=>{const i=d=>{d.key==="Meta"&&(d.preventDefault(),o(!o))};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[o]);const He=B.mobileIcon?`${B.mobileIcon} 1x, ${B.desktopIcon} 2x`:B.desktopIcon,Qe=i=>{const d=i.target.value;m(d),d.trim()&&!a&&o(!0)},Ye=()=>{a||o(!0)},ee=()=>{v(i=>!i)},te=()=>{v(!1)},ze=i=>{i.preventDefault(),o(!a)},Ue=S.useCallback((i,d,W)=>{switch(d){case"new-window":E(i);break;case"pin-to-taskbar":case"unpin-from-taskbar":T(i);break;case"close-window":{const D=y.filter(p=>{var k;return(k=p.id)==null?void 0:k.startsWith(`${i}-`)});if(D.length>0){const p=D.reduce((k,se)=>se.zIndex>k.zIndex?se:k);p.id&&P(p.id)}}break;case"close-all-windows":y.filter(p=>{var k;return(k=p.id)==null?void 0:k.startsWith(`${i}-`)}).forEach(p=>{p.id&&P(p.id)});break}},[y,P,E,T]);return r.jsxs("div",{className:`taskbar ${e}`,children:[r.jsx("button",{type:"button",className:"taskbar__windows-button",onClick:ze,"data-start-menu-trigger":!0,"aria-label":"Start menu",children:r.jsx("img",{src:B.desktopIcon,alt:B.name,srcSet:He,className:"taskbar__windows-icon"})}),n&&(e==="top"||e==="bottom")&&r.jsxs("div",{className:`taskbar__search-container ${e}`,children:[r.jsx(at,{className:"taskbar__fluent-icon search-icon"}),r.jsx("input",{type:"search",name:"taskbar-search",id:"taskbar-search",onChange:Qe,onFocus:Ye,placeholder:"Search",value:u,className:"taskbar__search"})]}),r.jsx("div",{className:`taskbar__apps-container ${e}`,children:Re.map(i=>{const d=c.includes(i);return r.jsx(Xe,{appId:i,iconVariant:"taskbar",isPinned:d,onSingleClick:$e,onWindowFocus:Oe,onWindowClose:P,onContextMenuItemClick:Ue},i)})}),r.jsx("div",{className:`taskbar__spacer ${e}`}),r.jsxs("div",{className:`taskbar__right-section ${e}`,children:[s&&r.jsxs("div",{className:`taskbar__static-apps ${e}`,onClick:ee,children:[(e==="top"||e==="bottom")&&r.jsx("p",{className:"taskbar__text",children:"ENG IN"}),A.includes("airplane")?r.jsx(st,{className:"taskbar__fluent-icon"}):r.jsx(ot,{className:"taskbar__fluent-icon"}),r.jsx(nt,{className:"taskbar__fluent-icon"}),r.jsx(Ke,{className:"taskbar__fluent-icon"}),w&&r.jsx(Z,{isOpen:w,onClose:te})]}),r.jsxs("div",{className:`taskbar__date-time ${e}`,onClick:x?ee:void 0,children:[r.jsx("p",{className:"taskbar__time",children:L}),r.jsx("p",{className:"taskbar__date",children:G}),x&&w&&r.jsx(Z,{isOpen:w,onClose:te})]})]})]})}Ne.__docgenInfo={description:"",methods:[],displayName:"Taskbar"};const ct=async({canvasElement:e})=>{const n=X(e),s=e.querySelector(".taskbar");t(s).toBeInTheDocument();const o=n.getAllByRole("button")[0];t(o).toBeInTheDocument(),t(o).toHaveClass("taskbar__windows-button");const a=o.querySelector(".taskbar__windows-icon");t(a).toBeInTheDocument();const u=e.querySelector(".taskbar__search-container");t(u).toBeInTheDocument();const m=n.getByRole("searchbox");t(m).toBeInTheDocument(),t(m).toHaveClass("taskbar__search"),t(m).toHaveAttribute("placeholder","Search");const l=e.querySelector(".search-icon");t(l).toBeInTheDocument();const h=e.querySelector(".taskbar__apps-container");t(h).toBeInTheDocument();const I=e.querySelector(".taskbar__right-section");t(I).toBeInTheDocument();const _=e.querySelector(".taskbar__date-time");t(_).toBeInTheDocument();const A=e.querySelector(".taskbar__time"),w=e.querySelector(".taskbar__date");t(A).toBeInTheDocument(),t(w).toBeInTheDocument()},lt=async({canvasElement:e})=>{const n=e.querySelector(".taskbar");t(n).toBeInTheDocument(),t(n).toHaveClass("bottom");const s=e.querySelector(".taskbar__search-container");t(s).toBeInTheDocument(),t(s).toHaveClass("bottom");const o=e.querySelector(".taskbar__apps-container");t(o).toHaveClass("bottom");const a=e.querySelector(".taskbar__right-section");t(a).toHaveClass("bottom")},ut=async({canvasElement:e})=>{const n=e.querySelector(".taskbar");t(n).toBeInTheDocument(),t(n).toHaveClass("top");const s=e.querySelector(".taskbar__search-container");t(s).toBeInTheDocument(),t(s).toHaveClass("top");const o=e.querySelector(".taskbar__apps-container");t(o).toHaveClass("top");const a=e.querySelector(".taskbar__right-section");t(a).toHaveClass("top")},dt=async({canvasElement:e})=>{const n=e.querySelector(".taskbar");t(n).toBeInTheDocument(),t(n).toHaveClass("left");const s=e.querySelector(".taskbar__search-container");t(s).not.toBeInTheDocument();const o=e.querySelector(".taskbar__apps-container");t(o).toHaveClass("left");const a=e.querySelector(".taskbar__right-section");t(a).toHaveClass("left");const u=e.querySelector(".taskbar__text");t(u).not.toBeInTheDocument()},pt=async({canvasElement:e})=>{const n=e.querySelector(".taskbar");t(n).toBeInTheDocument(),t(n).toHaveClass("right");const s=e.querySelector(".taskbar__search-container");t(s).not.toBeInTheDocument();const o=e.querySelector(".taskbar__apps-container");t(o).toHaveClass("right");const a=e.querySelector(".taskbar__right-section");t(a).toHaveClass("right")},mt=async({canvasElement:e})=>{const n=e.querySelector(".taskbar");t(n).toBeInTheDocument();const s=e.querySelector(".taskbar__search-container");t(s).not.toBeInTheDocument();const o=e.querySelector(".taskbar__search");t(o).not.toBeInTheDocument();const a=e.querySelector(".taskbar__windows-button");t(a).toBeInTheDocument();const u=e.querySelector(".taskbar__apps-container");t(u).toBeInTheDocument()},ht=async({canvasElement:e})=>{const s=X(e).getByRole("searchbox");t(s).toBeInTheDocument(),t(s.value).toBe(""),await C.click(s),t(s).toHaveFocus(),await C.type(s,"test search"),await U(()=>{t(s.value).toBe("test search")}),await C.clear(s),t(s.value).toBe("")},bt=async({canvasElement:e})=>{const s=X(e).getAllByRole("button")[0];t(s).toBeInTheDocument(),t(s).toHaveClass("taskbar__windows-button");const o=f.getState().startMenuOpen;t(o).toBe(!1),await C.click(s),await U(()=>{t(f.getState().startMenuOpen).toBe(!0)}),await C.click(s),await U(()=>{t(f.getState().startMenuOpen).toBe(!1)})},kt=async({canvasElement:e})=>{const n=e.querySelector(".taskbar");t(n).toBeInTheDocument();const s=e.querySelector(".taskbar__apps-container");t(s).toBeInTheDocument();const o=J.filter(a=>a.defaultPinned===!0).length;t(s==null?void 0:s.children.length).toEqual(o)},St=async({canvasElement:e})=>{const n=e.querySelector(".taskbar");t(n).toBeInTheDocument();const s=e.querySelector(".taskbar__static-apps");t(s).toBeInTheDocument();const o=s==null?void 0:s.querySelectorAll(".taskbar__fluent-icon");t(o==null?void 0:o.length).toBeGreaterThanOrEqual(3),await C.click(s),await U(()=>{const l=e.querySelector(".taskbar__qa-popup");t(l).toBeInTheDocument()});const a=e.querySelector(".taskbar__qa-popup"),u=a==null?void 0:a.querySelector(".taskbar__qa-buttons");t(u).toBeInTheDocument();const m=a==null?void 0:a.querySelector(".taskbar__qa-sliders");t(m).toBeInTheDocument()},g=(e,n)=>{const s=o=>(f.setState(e),n&&K.setState(n),r.jsx(o,{}));return s.displayName="StoreSetupDecorator",s},Nt={title:"Layout/Taskbar",component:Ne,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
The Windows 11 taskbar component that provides quick access to applications and system controls.

## Features
- **Start Menu**: Windows icon to open the Start Menu
- **Search Bar**: Quick search functionality
- **Pinned Apps**: Display and interact with pinned applications
- **System Tray**: Quick actions for WiFi, volume, battery, and language
- **Quick Actions Popup**: Access to brightness, volume sliders, and quick settings
- **Date & Time**: Live clock display in 12-hour format (DD-MM-YYYY)

## Taskbar Alignment
The taskbar supports multiple alignment positions:
- \`bottom\` (default): Traditional Windows 11 position
- \`top\`: macOS-style top bar
- \`left\`: Vertical left sidebar
- \`right\`: Vertical right sidebar
        `}}},argTypes:{},decorators:[e=>r.jsx("div",{style:{height:"100vh",position:"relative",width:"100vw"},children:r.jsx(e,{})})]},F={decorators:[g({taskbarAlignment:"bottom",isSearchVisible:!0,showMoreIcons:!0,volumeLevel:50,brightnessLevel:30})],play:ct},V={decorators:[g({taskbarAlignment:"top",isSearchVisible:!0,showMoreIcons:!0,volumeLevel:50,brightnessLevel:30})],play:ut},j={decorators:[g({taskbarAlignment:"left",isSearchVisible:!0,showMoreIcons:!0,volumeLevel:50,brightnessLevel:30})],play:dt},N={decorators:[g({taskbarAlignment:"right",isSearchVisible:!0,showMoreIcons:!0,volumeLevel:50,brightnessLevel:30})],play:pt},O={decorators:[g({taskbarAlignment:"bottom",isSearchVisible:!1,showMoreIcons:!0,volumeLevel:50,brightnessLevel:30})],play:mt},$={decorators:[g({taskbarAlignment:"bottom",isSearchVisible:!0,showMoreIcons:!0,volumeLevel:50,brightnessLevel:30})],play:ht},R={decorators:[g({taskbarAlignment:"bottom",isSearchVisible:!0,showMoreIcons:!0,startMenuOpen:!1,volumeLevel:50,brightnessLevel:30})],play:bt},H={decorators:[g({taskbarAlignment:"bottom",isSearchVisible:!0,showMoreIcons:!0,volumeLevel:50,brightnessLevel:30},{taskbarPinnedAppIds:J.filter(e=>e.defaultPinned===!0).map(e=>e.id),activeWindows:[]})],play:kt},Q={decorators:[g({taskbarAlignment:"bottom",isSearchVisible:!0,showMoreIcons:!0,volumeLevel:50,brightnessLevel:30},{taskbarPinnedAppIds:J.filter(e=>e.defaultPinned===!0).map(e=>e.id),activeWindows:[{id:"vscode-1",title:"Visual Studio Code",windowName:"VSCodeApp",isMaximized:"normal",previousDisplayState:"normal",position:{x:100,y:100},zIndex:1,size:{width:800,height:600}}],windowInstanceCounters:{vscode:1}})]},Y={decorators:[g({taskbarAlignment:"bottom",isSearchVisible:!0,showMoreIcons:!0,volumeLevel:50,brightnessLevel:30})],play:St},z={decorators:[g({taskbarAlignment:"bottom",isSearchVisible:!0,showMoreIcons:!0,volumeLevel:50,brightnessLevel:30})],play:lt};var ne,ae,re;F.parameters={...F.parameters,docs:{...(ne=F.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    taskbarAlignment: 'bottom',
    isSearchVisible: true,
    showMoreIcons: true,
    volumeLevel: 50,
    brightnessLevel: 30
  })],
  play: taskbarPlayFunction
}`,...(re=(ae=F.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var ie,ce,le;V.parameters={...V.parameters,docs:{...(ie=V.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    taskbarAlignment: 'top',
    isSearchVisible: true,
    showMoreIcons: true,
    volumeLevel: 50,
    brightnessLevel: 30
  })],
  play: taskbarTopAlignedPlayFunction
}`,...(le=(ce=V.parameters)==null?void 0:ce.docs)==null?void 0:le.source}}};var ue,de,pe;j.parameters={...j.parameters,docs:{...(ue=j.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    taskbarAlignment: 'left',
    isSearchVisible: true,
    showMoreIcons: true,
    volumeLevel: 50,
    brightnessLevel: 30
  })],
  play: taskbarLeftAlignedPlayFunction
}`,...(pe=(de=j.parameters)==null?void 0:de.docs)==null?void 0:pe.source}}};var me,he,be;N.parameters={...N.parameters,docs:{...(me=N.parameters)==null?void 0:me.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    taskbarAlignment: 'right',
    isSearchVisible: true,
    showMoreIcons: true,
    volumeLevel: 50,
    brightnessLevel: 30
  })],
  play: taskbarRightAlignedPlayFunction
}`,...(be=(he=N.parameters)==null?void 0:he.docs)==null?void 0:be.source}}};var ke,Se,ge;O.parameters={...O.parameters,docs:{...(ke=O.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    taskbarAlignment: 'bottom',
    isSearchVisible: false,
    showMoreIcons: true,
    volumeLevel: 50,
    brightnessLevel: 30
  })],
  play: taskbarSearchHiddenPlayFunction
}`,...(ge=(Se=O.parameters)==null?void 0:Se.docs)==null?void 0:ge.source}}};var ye,we,_e;$.parameters={...$.parameters,docs:{...(ye=$.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    taskbarAlignment: 'bottom',
    isSearchVisible: true,
    showMoreIcons: true,
    volumeLevel: 50,
    brightnessLevel: 30
  })],
  play: taskbarSearchInteractionPlayFunction
}`,...(_e=(we=$.parameters)==null?void 0:we.docs)==null?void 0:_e.source}}};var ve,fe,Ie;R.parameters={...R.parameters,docs:{...(ve=R.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    taskbarAlignment: 'bottom',
    isSearchVisible: true,
    showMoreIcons: true,
    startMenuOpen: false,
    volumeLevel: 50,
    brightnessLevel: 30
  })],
  play: taskbarStartButtonPlayFunction
}`,...(Ie=(fe=R.parameters)==null?void 0:fe.docs)==null?void 0:Ie.source}}};var Ae,Te,Be;H.parameters={...H.parameters,docs:{...(Ae=H.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    taskbarAlignment: 'bottom',
    isSearchVisible: true,
    showMoreIcons: true,
    volumeLevel: 50,
    brightnessLevel: 30
  }, {
    taskbarPinnedAppIds: APP_REGISTRY.filter(app => app.defaultPinned === true).map(item => item.id),
    activeWindows: []
  })],
  play: taskbarWithPinnedAppsPlayFunction
}`,...(Be=(Te=H.parameters)==null?void 0:Te.docs)==null?void 0:Be.source}}};var Ce,xe,De;Q.parameters={...Q.parameters,docs:{...(Ce=Q.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    taskbarAlignment: 'bottom',
    isSearchVisible: true,
    showMoreIcons: true,
    volumeLevel: 50,
    brightnessLevel: 30
  }, {
    taskbarPinnedAppIds: APP_REGISTRY.filter(app => app.defaultPinned === true).map(item => item.id),
    activeWindows: [{
      id: 'vscode-1',
      title: 'Visual Studio Code',
      windowName: 'VSCodeApp',
      isMaximized: 'normal',
      previousDisplayState: 'normal',
      position: {
        x: 100,
        y: 100
      },
      zIndex: 1,
      size: {
        width: 800,
        height: 600
      }
    }],
    windowInstanceCounters: {
      vscode: 1
    }
  })]
}`,...(De=(xe=Q.parameters)==null?void 0:xe.docs)==null?void 0:De.source}}};var Le,qe,Me;Y.parameters={...Y.parameters,docs:{...(Le=Y.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    taskbarAlignment: 'bottom',
    isSearchVisible: true,
    showMoreIcons: true,
    volumeLevel: 50,
    brightnessLevel: 30
  })],
  play: taskbarQuickActionsPlayFunction
}`,...(Me=(qe=Y.parameters)==null?void 0:qe.docs)==null?void 0:Me.source}}};var Pe,We,Fe;z.parameters={...z.parameters,docs:{...(Pe=z.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    taskbarAlignment: 'bottom',
    isSearchVisible: true,
    showMoreIcons: true,
    volumeLevel: 50,
    brightnessLevel: 30
  })],
  play: taskbarBottomAlignedPlayFunction
}`,...(Fe=(We=z.parameters)==null?void 0:We.docs)==null?void 0:Fe.source}}};const Ot=["Default","TopAligned","LeftAligned","RightAligned","SearchHidden","SearchInteraction","StartButtonInteraction","WithPinnedApps","WithActiveWindows","QuickActionsPopup","BottomAligned"];export{z as BottomAligned,F as Default,j as LeftAligned,Y as QuickActionsPopup,N as RightAligned,O as SearchHidden,$ as SearchInteraction,R as StartButtonInteraction,V as TopAligned,Q as WithActiveWindows,H as WithPinnedApps,Ot as __namedExportsOrder,Nt as default};
