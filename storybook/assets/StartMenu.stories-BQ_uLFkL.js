import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as h}from"./index-DvOVhSYJ.js";import{b as T,c as ie,u as y,a as g,A as v}from"./store-Dno_kDI4.js";import{u as R}from"./useClickOutsideModal-CtMuagMQ.js";import{N as ue}from"./natsu-BMYfONG0.js";import{a as ce,b as le,S as de}from"./chunk-6-DJnLnwDl.js";import{a as pe}from"./chunk-27-NUOEs6SA.js";import{A as I}from"./AppIcon-BHBM4NlZ.js";import{u as D}from"./useWindowManager-mUFsa0-7.js";import{a as me,S as he}from"./SecondaryButton-DGUvRoHG.js";import{C as fe,c as we}from"./chunk-24-Kif6bkd-.js";import{w as b,e as r,u as C,a as _}from"./index-L8OlCEhE.js";import"./wallpaper-default-qF7WhCEw.js";import"./chunk-18-DjZtRj47.js";import"./createFluentIcon-BZ9LiokK.js";import"./chunk-4-SzNxvNiQ.js";import"./chunk-25-iOT6TxgI.js";import"./chunk-3-B_RIhxAf.js";import"./chunk-7-CdrDaij8.js";import"./chunk-11-CjlV4GGo.js";import"./index-BYLy_Wld.js";import"./index-DR0bsqIr.js";function ee(){const t=h.useRef(null),[s,n]=h.useState(!1),{username:a,isAdmin:i,uploadedUserAvatar:c}=T();R(s,()=>n(!1),t);const d=()=>{n(m=>!m)};return e.jsxs("button",{className:"start-menu__user-button",type:"button",onClick:d,children:[c?e.jsx("img",{src:c,alt:"user avatar",className:"start-menu__user-avatar"}):e.jsx(ce,{className:"start-menu__fluent-icon"}),e.jsx("p",{className:"start-menu__user-name",children:(a==null?void 0:a.toUpperCase())??"N/A"}),s&&a&&e.jsxs("div",{className:"start-menu__user-card",ref:t,children:[i?e.jsx("img",{src:ue,alt:"admin",className:"start-menu__user-card-icon image"}):e.jsx(le,{className:"start-menu__user-card-icon"}),e.jsxs("div",{className:"start-menu__user-details",children:[e.jsx("h6",{className:"start-menu__user-details-title",children:a}),e.jsx("p",{className:"start-menu__user-details-text",children:"Local Account"}),e.jsx("p",{className:"start-menu__user-details-text",children:"(Personal)"})]})]})]})}ee.__docgenInfo={description:"",methods:[],displayName:"StartMenuUser"};function te(){const t=h.useRef(null),[s,n]=h.useState(!1),{updateBootStatus:a}=ie(),{updateAuthState:i,updateUserAvatar:c}=T(),{reset:d}=y(),{reset:m}=g();R(s,()=>n(!1),t);const p=()=>{d(),m(),i(null),c(void 0),a("DISPLAY_LOGIN_SCREEN")},o=()=>{a("DISPLAY_SHUTDOWN_SCREEN")};return e.jsxs("button",{type:"button",className:"start-menu__power-off",onClick:()=>n(!0),children:[e.jsx(pe,{className:"start-menu__fluent-icon"}),s&&e.jsxs("div",{className:"start-menu__power-off-options",ref:t,children:[e.jsx("span",{className:"start-menu__power-off-option",onClick:p,children:"Sign Out"}),e.jsx("span",{className:"start-menu__power-off-option",onClick:o,children:"Power Off"})]})]})}te.__docgenInfo={description:"",methods:[],displayName:"StartMenuPowerButton"};function ne({searchValue:t,onButtonClick:s,onAppLaunch:n}){const{taskbarPinnedAppIds:a,togglePin:i}=g(),{launchWindow:c,closeWindow:d}=D(),m=t.trim()?v.filter(o=>o.appName.toLowerCase().includes(t.toLowerCase())):[],p=(o,l,u)=>{switch(l){case"new-window":c(o);break;case"pin-to-taskbar":case"unpin-from-taskbar":i(o);break}};return e.jsxs("div",{className:"start-menu__search-results",children:[e.jsx("button",{className:"start-menu__back",type:"button",onClick:s,"aria-label":"Back to main menu",children:e.jsx(me,{className:"start-menu__fluent-icon"})}),e.jsx("h4",{className:"start-menu__category-title",children:m.length>0?"Best Match":"Search Results"}),e.jsx("div",{className:"start-menu__results-container",children:m.length>0?m.map(o=>{const l=a.includes(o.id);return e.jsx(I,{appId:o.id,iconVariant:"start-menu",isPinned:l,onSingleClick:u=>{c(u),n()},onWindowClose:d,onContextMenuItemClick:p},o.id)}):e.jsxs("div",{className:"start-menu__no-results",children:[e.jsx(de,{className:"start-menu__no-results-icon"}),e.jsxs("p",{className:"start-menu__no-results-text",children:["No apps found for “",t,"”"]}),e.jsx("p",{className:"start-menu__no-results-hint",children:"Try searching with a different term"})]})})]})}ne.__docgenInfo={description:"",methods:[],displayName:"PanelSearchResults",props:{searchValue:{required:!0,tsType:{name:"string"},description:""},onButtonClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onAppLaunch:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function j({title:t,buttonProps:s}){return e.jsxs("div",{className:"start-menu__category",children:[e.jsx("h4",{className:"start-menu__category-title",children:t}),s&&e.jsx(he,{icon:s==null?void 0:s.icon,name:s.name,iconPosition:s.iconPosition,onButtonClick:s.onButtonClick})]})}j.__docgenInfo={description:"",methods:[],displayName:"StartMenuCategory",props:{title:{required:!0,tsType:{name:"string"},description:""},buttonProps:{required:!1,tsType:{name:"SecondaryButtonProps"},description:""}}};function se({onButtonClick:t,onAppLaunch:s}){const{taskbarPinnedAppIds:n,togglePin:a}=g(),{launchWindow:i,closeWindow:c}=D(),d=(o,l,u)=>{switch(l){case"new-window":i(o);break;case"pin-to-taskbar":case"unpin-from-taskbar":a(o);break}},m=v.filter(o=>o.startMenuAppCategory==="default"),p=v.filter(o=>o.startMenuAppCategory==="recommended");return e.jsxs("div",{className:"start-menu__panel-one",children:[e.jsxs("div",{className:"start-menu__default-apps-container",children:[e.jsx(j,{title:"Default",buttonProps:{icon:fe,name:"All",iconPosition:"right",onButtonClick:t}}),e.jsx("div",{className:"start-menu__default-apps",children:m.map(o=>{const l=!!n.find(u=>u===o.id);return e.jsx(I,{appId:o.id,iconVariant:"start-menu",isPinned:l,onContextMenuItemClick:d,onSingleClick:u=>{i(u)},onWindowClose:c},o.id)})})]}),e.jsxs("div",{className:"start-menu__recommended-apps-container",children:[e.jsx(j,{title:"Recommended"}),e.jsx("div",{className:"start-menu__recommended-apps",children:p.map(o=>{const l=!!n.find(u=>u===o.id);return e.jsx(I,{appId:o.id,iconVariant:"start-menu",isPinned:l,onContextMenuItemClick:d,onSingleClick:u=>{i(u),s()},onWindowClose:c},o.id)})})]})]})}se.__docgenInfo={description:"",methods:[],displayName:"PanelOne",props:{onButtonClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onAppLaunch:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function ae({onButtonClick:t,onAppLaunch:s}){const{taskbarPinnedAppIds:n,togglePin:a}=g(),{launchWindow:i,closeWindow:c}=D(),d=(o,l,u)=>{switch(l){case"new-window":i(o);break;case"pin-to-taskbar":case"unpin-from-taskbar":a(o);break}},m=o=>{const l=o.reduce((u,f)=>{const w=f.appName.charAt(0).toUpperCase();return u[w]||(u[w]=[]),u[w].push(f),u},{});return Object.keys(l).sort().reduce((u,f)=>(u[f]=l[f].sort((w,x)=>w.appName.localeCompare(x.appName)),u),{})},p=h.useMemo(()=>m(v),[]);return e.jsxs("div",{className:"start-menu__panel-two",children:[e.jsx(j,{title:"All",buttonProps:{icon:we,name:"Back",iconPosition:"left",onButtonClick:t}}),e.jsx("div",{className:"start-menu__all-apps-container",children:Object.entries(p).map(([o,l])=>e.jsxs("div",{className:"start-menu__letter-group",children:[e.jsx("h6",{className:"start-menu__letter-heading",children:o}),e.jsx("div",{className:"start-menu__letter-apps",children:l.map(u=>{const f=!!n.find(w=>w===u.id);return e.jsxs("div",{className:"start-menu__letter-app",role:"menuitem",onClick:()=>{i(u.id),s()},children:[e.jsx(I,{appId:u.id,iconVariant:"start-menu",isPinned:f,onContextMenuItemClick:d,onWindowClose:c},u.id),e.jsx("p",{className:"start-menu__letter-app-name",children:u.appName})]},u.id)})})]},o))})]})}ae.__docgenInfo={description:"",methods:[],displayName:"PanelTwo",props:{onButtonClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onAppLaunch:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function re(){const t=h.useRef(null),s=h.useRef(null),[n,a]=h.useState("panel-one"),{startMenuOpen:i,setStartMenuOpen:c,searchValue:d,setSearchValue:m,taskbarAlignment:p}=y(),{activeWindows:o}=g();h.useEffect(()=>{const x=document.querySelector("[data-start-menu-trigger]");x&&(s.current=x)},[]);const l=()=>{d&&m(""),c(!1)};R(i,l,t,[s]);const u=h.useMemo(()=>o.length===0?1e3:Math.max(...o.map(oe=>oe.zIndex))+1,[o]),f=h.useMemo(()=>d.trim()?"search-results":n==="search-results"?"panel-one":n,[d,n]),w=()=>{m(""),a("panel-one")};return e.jsxs("div",{className:`start-menu ${f} ${p} ${i?"open":""}`,style:{zIndex:u},ref:t,children:[e.jsx(se,{onButtonClick:()=>{a("panel-two")},onAppLaunch:l}),e.jsx(ae,{onButtonClick:()=>{a("panel-one")},onAppLaunch:l}),e.jsx(ne,{searchValue:d,onButtonClick:w,onAppLaunch:l}),e.jsxs("div",{className:"start-menu__bottom",children:[e.jsx(ee,{}),e.jsx(te,{})]})]})}re.__docgenInfo={description:"",methods:[],displayName:"StartMenu"};const _e=async({canvasElement:t})=>{const s=b(t),n=t.querySelector(".start-menu");r(n).toBeInTheDocument(),r(n).toHaveClass("open");const a=t.querySelector(".start-menu__bottom");r(a).toBeInTheDocument();const i=s.getByRole("button",{name:/Natsu/i});r(i).toBeInTheDocument();const c=t.querySelector(".start-menu__power-off");r(c).toBeInTheDocument()},ye=async({canvasElement:t})=>{const s=b(t),n=t.querySelector(".start-menu");r(n).toHaveClass("panel-one");const a=s.getByRole("button",{name:/all/i});r(a).toBeInTheDocument(),await C.click(a),await _(()=>{r(n).toHaveClass("panel-two")});const i=s.getAllByRole("button",{name:/back/i})[0];r(i).toBeInTheDocument(),await C.click(i),await _(()=>{r(n).toHaveClass("panel-one")})},ge=async({canvasElement:t})=>{const n=b(t).getByRole("button",{name:/Natsu/i});r(n).toBeInTheDocument();let a=t.querySelector(".start-menu__user-card");r(a).not.toBeInTheDocument(),await C.click(n),await _(()=>{a=t.querySelector(".start-menu__user-card"),r(a).toBeInTheDocument()});const i=t.querySelector(".start-menu__user-details-title");r(i).toBeInTheDocument();const c=t.querySelector(".start-menu__user-details-text");r(c).toBeInTheDocument()},Se=async({canvasElement:t})=>{const s=b(t),n=t.querySelector(".start-menu");r(n).toHaveClass("panel-one"),y.setState({searchValue:"edge"}),await _(()=>{r(n).toHaveClass("search-results")},{timeout:1e3});const a=t.querySelector(".start-menu__search-results");r(a).toBeInTheDocument();const i=s.getByText(/Best Match|Search Results/i);r(i).toBeInTheDocument();const c=t.querySelector(".start-menu__results-container");r(c).toBeInTheDocument();const d=s.getByRole("button",{name:/back to main menu/i});r(d).toBeInTheDocument(),await new Promise(p=>setTimeout(p,500)),y.setState({searchValue:"nonexistentapp123"}),await _(()=>{const p=s.queryByText(/No apps found for/i);r(p).toBeInTheDocument()},{timeout:1e3});const m=s.getByText(/Try searching with a different term/i);r(m).toBeInTheDocument(),await new Promise(p=>setTimeout(p,500)),await C.click(d),await _(()=>{r(n).toHaveClass("panel-one")},{timeout:1e3}),await _(()=>{const{searchValue:p}=y.getState();r(p).toBe("")})},xe=async({canvasElement:t})=>{const s=t.querySelector(".start-menu__power-off");r(s).toBeInTheDocument();let n=t.querySelector(".start-menu__power-off-options");r(n).not.toBeInTheDocument(),await C.click(s),await _(()=>{n=t.querySelector(".start-menu__power-off-options"),r(n).toBeInTheDocument()});const a=t.querySelector(".start-menu__power-off-option");r(a).toBeInTheDocument(),r(a==null?void 0:a.textContent).toContain("Sign Out");const i=t.querySelectorAll(".start-menu__power-off-option");r(i.length).toBe(2),r(i[1].textContent).toContain("Power Off")},Ce=async({canvasElement:t})=>{const s=t.querySelector(".start-menu__default-apps-container");r(s).toBeInTheDocument();const n=t.querySelector(".start-menu__category-title");r(n).toBeInTheDocument(),r(n==null?void 0:n.textContent).toBe("Default");const a=t.querySelector(".start-menu__recommended-apps-container");r(a).toBeInTheDocument();const i=t.querySelector(".start-menu__default-apps");r(i).toBeInTheDocument();const c=i==null?void 0:i.querySelectorAll("button");r(c).toBeTruthy()},S=(t,s,n)=>{const a=i=>(h.useEffect(()=>{y.setState(t),s&&g.setState(s),n&&T.setState(n)},[]),e.jsx(i,{}));return a.displayName="StoreSetupDecorator",a},Ze={title:"Layout/StartMenu",component:re,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
The Windows 11 Start Menu component that provides access to applications, user account, and power options.

## Features
- **Panel One (Default View)**: Shows pinned/default apps and recommended apps
- **Panel Two (All Apps)**: Alphabetically grouped list of all applications
- **User Section**: Displays current user with expandable profile card
- **Power Options**: Sign out and power off functionality
- **Click Outside**: Automatically closes when clicking outside the menu

## Navigation
- Click "All" button to view all apps (Panel Two)
- Click "Back" button to return to default view (Panel One)

## Panels
- \`panel-one\`: Default view with pinned and recommended apps
- \`panel-two\`: All apps view grouped alphabetically
        `}}},argTypes:{},decorators:[t=>e.jsx("div",{style:{width:"600px",height:"700px",position:"relative",borderRadius:"8px",padding:"20px"},children:e.jsx(t,{})})]},N={decorators:[S({startMenuOpen:!0,startMenuLayout:"grid",showRecommendedApps:!0},{taskbarPinnedAppIds:["file-explorer","edge","vscode"],activeWindows:[]},{username:"Natsu"})],play:_e},P={decorators:[S({startMenuOpen:!0,startMenuLayout:"grid",showRecommendedApps:!0},{taskbarPinnedAppIds:["file-explorer","edge","vscode"],activeWindows:[]},{username:"Natsu"})],play:ye},k={decorators:[S({startMenuOpen:!0,startMenuLayout:"grid",showRecommendedApps:!0},{taskbarPinnedAppIds:[],activeWindows:[]},{username:"Natsu"})],play:ge},M={decorators:[S({startMenuOpen:!0,startMenuLayout:"grid",showRecommendedApps:!0,searchValue:""},{taskbarPinnedAppIds:["file-explorer","edge","vscode"],activeWindows:[]},{username:"Natsu"})],play:Se},A={decorators:[S({startMenuOpen:!0,startMenuLayout:"grid",showRecommendedApps:!0},{taskbarPinnedAppIds:[],activeWindows:[]},{username:"Natsu"})],play:xe},B={decorators:[S({startMenuOpen:!0,startMenuLayout:"grid",showRecommendedApps:!0},{taskbarPinnedAppIds:["file-explorer","edge","vscode","terminal"],activeWindows:[]},{username:"Natsu"})],play:Ce};var O,q,L;N.parameters={...N.parameters,docs:{...(O=N.parameters)==null?void 0:O.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    startMenuOpen: true,
    startMenuLayout: 'grid',
    showRecommendedApps: true
  }, {
    taskbarPinnedAppIds: ['file-explorer', 'edge', 'vscode'],
    activeWindows: []
  }, {
    username: 'Natsu'
  })],
  play: startMenuPlayFunction
}`,...(L=(q=N.parameters)==null?void 0:q.docs)==null?void 0:L.source}}};var W,F,U;P.parameters={...P.parameters,docs:{...(W=P.parameters)==null?void 0:W.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    startMenuOpen: true,
    startMenuLayout: 'grid',
    showRecommendedApps: true
  }, {
    taskbarPinnedAppIds: ['file-explorer', 'edge', 'vscode'],
    activeWindows: []
  }, {
    username: 'Natsu'
  })],
  play: startMenuPanelNavigationPlayFunction
}`,...(U=(F=P.parameters)==null?void 0:F.docs)==null?void 0:U.source}}};var V,H,Y;k.parameters={...k.parameters,docs:{...(V=k.parameters)==null?void 0:V.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    startMenuOpen: true,
    startMenuLayout: 'grid',
    showRecommendedApps: true
  }, {
    taskbarPinnedAppIds: [],
    activeWindows: []
  }, {
    username: 'Natsu'
  })],
  play: startMenuUserCardPlayFunction
}`,...(Y=(H=k.parameters)==null?void 0:H.docs)==null?void 0:Y.source}}};var Z,$,z;M.parameters={...M.parameters,docs:{...(Z=M.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    startMenuOpen: true,
    startMenuLayout: 'grid',
    showRecommendedApps: true,
    searchValue: '' // Will be set in play function
  }, {
    taskbarPinnedAppIds: ['file-explorer', 'edge', 'vscode'],
    activeWindows: []
  }, {
    username: 'Natsu'
  })],
  play: startMenuSearchResultsPlayFunction
}`,...(z=($=M.parameters)==null?void 0:$.docs)==null?void 0:z.source}}};var G,J,K;A.parameters={...A.parameters,docs:{...(G=A.parameters)==null?void 0:G.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    startMenuOpen: true,
    startMenuLayout: 'grid',
    showRecommendedApps: true
  }, {
    taskbarPinnedAppIds: [],
    activeWindows: []
  }, {
    username: 'Natsu'
  })],
  play: startMenuPowerOptionsPlayFunction
}`,...(K=(J=A.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,E;B.parameters={...B.parameters,docs:{...(Q=B.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  decorators: [withStoreSetup({
    startMenuOpen: true,
    startMenuLayout: 'grid',
    showRecommendedApps: true
  }, {
    taskbarPinnedAppIds: ['file-explorer', 'edge', 'vscode', 'terminal'],
    activeWindows: []
  }, {
    username: 'Natsu'
  })],
  play: startMenuAppsPlayFunction
}`,...(E=(X=B.parameters)==null?void 0:X.docs)==null?void 0:E.source}}};const $e=["Default","PanelNavigation","UserCardInteraction","SearchResults","PowerOptionsInteraction","AppsRendering"];export{B as AppsRendering,N as Default,P as PanelNavigation,A as PowerOptionsInteraction,M as SearchResults,k as UserCardInteraction,$e as __namedExportsOrder,Ze as default};
