import{j as c}from"./jsx-runtime-D_zvdyIk.js";import{w as B,e as o,u as l,a as tn,f as i}from"./index-L8OlCEhE.js";import{A as an}from"./AppIcon-D__H03mn.js";import{A as sn,u as U,a as u}from"./store-BKo5rbBN.js";import"./index-DvOVhSYJ.js";import"./index-BYLy_Wld.js";import"./index-DR0bsqIr.js";import"./useClickOutsideModal-CtMuagMQ.js";import"./wallpaper-default-qF7WhCEw.js";import"./chunk-18-DjZtRj47.js";import"./createFluentIcon-BZ9LiokK.js";import"./chunk-4-SzNxvNiQ.js";import"./chunk-25-iOT6TxgI.js";import"./chunk-3-B_RIhxAf.js";import"./chunk-7-CdrDaij8.js";import"./chunk-24-Kif6bkd-.js";import"./chunk-11-CjlV4GGo.js";const on=async({canvasElement:t,args:e})=>{var r;const a=B(t),s=a.getByRole("button");o(s).toBeInTheDocument();const n=sn.find(d=>d.id===(e==null?void 0:e.appId)),p=a.getByAltText(new RegExp(n.appName||"","i"));if(o(p).toBeInTheDocument(),(e==null?void 0:e.iconVariant)==="desktop"){await l.dblClick(s),o(e==null?void 0:e.onDoubleClick).toHaveBeenCalledWith(e==null?void 0:e.appId),o(e==null?void 0:e.onSingleClick).not.toHaveBeenCalled(),o(s.children.length).toBe(2);const d=a.getByText(new RegExp((r=e==null?void 0:e.appId)==null?void 0:r.replace(/-/g," "),"i"));o(d).toBeInTheDocument()}else if((e==null?void 0:e.iconVariant)==="taskbar"||(e==null?void 0:e.iconVariant)==="start-menu"){await l.click(s),o(e==null?void 0:e.onSingleClick).toHaveBeenCalledWith(e==null?void 0:e.appId),o(e==null?void 0:e.onDoubleClick).not.toHaveBeenCalled();const d=s.children;o(d[0]).toHaveClass("app-icon__image")}e!=null&&e.onRightClick&&(await l.pointer({keys:"[MouseRight]",target:s}),o(e==null?void 0:e.onRightClick).toHaveBeenCalledWith(e==null?void 0:e.appId)),e!=null&&e.shape&&o(s).toHaveClass(e.shape)},rn=async({canvasElement:t,args:e})=>{const s=B(t).getByRole("button");if(o(s).toBeInTheDocument(),(e==null?void 0:e.iconVariant)!=="taskbar"){const m=s.querySelector(".app-icon__dot");o(m).not.toBeInTheDocument();return}const n=s.querySelector(".app-icon__dot");o(n).toBeInTheDocument();const p=(n==null?void 0:n.className)||"",d=["app-icon__dot--hidden","app-icon__dot--unfocused","app-icon__dot--focused"].some(m=>p.includes(m));o(d).toBe(!0),p.includes("app-icon__dot--hidden")?(o(n).toHaveClass("app-icon__dot--hidden"),o(n).not.toHaveClass("app-icon__dot--focused"),o(n).not.toHaveClass("app-icon__dot--unfocused")):p.includes("app-icon__dot--focused")?(o(n).toHaveClass("app-icon__dot--focused"),o(n).not.toHaveClass("app-icon__dot--hidden"),o(n).not.toHaveClass("app-icon__dot--unfocused")):p.includes("app-icon__dot--unfocused")&&(o(n).toHaveClass("app-icon__dot--unfocused"),o(n).not.toHaveClass("app-icon__dot--hidden"),o(n).not.toHaveClass("app-icon__dot--focused")),o(n==null?void 0:n.tagName).toBe("SPAN"),o(s.contains(n)).toBe(!0)},dn=async({canvasElement:t,args:e})=>{const s=B(t).getByRole("button");if(o(s).toBeInTheDocument(),(e==null?void 0:e.iconVariant)!=="taskbar")return;let n=s.querySelector(".app-icon__popup-container");o(n).not.toBeInTheDocument(),await l.hover(s);const p=10;let r=0;for(;!n&&r<p;)n=s.querySelector(".app-icon__popup-container"),n||await new Promise(F=>setTimeout(F,50)),r++;o(n).toBeInTheDocument(),o(n).not.toHaveClass("app-icon__popup-container--exiting");const d=n==null?void 0:n.querySelectorAll(".active-windows-popup");o(d).toBeTruthy(),o(((d==null?void 0:d.length)||0)>0).toBe(!0);const m=d==null?void 0:d[0];m&&(e!=null&&e.onWindowFocus)&&(await l.click(m),o(e.onWindowFocus).toHaveBeenCalled(),o(e.onWindowFocus).toHaveBeenCalledWith("vscode-1")),await l.unhover(s),n=s.querySelector(".app-icon__popup-container"),n&&o(n).toHaveClass("app-icon__popup-container--exiting"),await l.hover(s),n=s.querySelector(".app-icon__popup-container"),n&&o(n).not.toHaveClass("app-icon__popup-container--exiting");const H=n==null?void 0:n.querySelectorAll(".active-windows-popup__close-button");if(H&&H.length>0&&(e!=null&&e.onWindowClose)){const F=H[0];await l.click(F),tn(()=>{o(e.onWindowClose).toHaveBeenCalled(),o(e.onWindowClose).toHaveBeenCalledWith("vscode-1")},{timeout:1e3})}},pn=async({canvasElement:t,args:e})=>{const s=B(t).getByRole("button");o(s).toBeInTheDocument();let n=document.querySelector(".rc-menu");o(n).not.toBeInTheDocument(),await l.pointer({keys:"[MouseRight]",target:s});const p=10;let r=0;for(;!n&&r<p;)n=document.querySelector(".rc-menu"),n||await new Promise(d=>setTimeout(d,50)),r++;o(n).toBeInTheDocument(),o(e==null?void 0:e.onRightClick).toHaveBeenCalledWith(e==null?void 0:e.appId)},xn={title:"Components/AppIcon",component:an,parameters:{layout:"centered",docs:{description:{component:`The \`AppIcon\` component displays an application icon that can be clicked to open the application.

**Variants:**
- \`desktop\`: Double-click to open apps, displays icon + name
- \`taskbar\`: Single-click to open apps, displays icon only with dot indicator and hover popup
- \`start-menu\`: Single-click to open apps, displays icon + name

**Sub-components:**
- \`ActiveWindowsPopup\`: Hover popup for taskbar variant showing all open windows for the app. Allows focusing or closing individual windows.
- \`ContextMenu\` (planned): Right-click menu with options like "New window", "Pin/Unpin from taskbar", "Close window(s)"

**Features:**
- Custom icon shapes: square, circle, water-droplet
- Dot indicator states: hidden (no windows), unfocused (grey), focused (accent color pill)
- Multiple windows stacked effect (::before pseudo-element)
- Keyboard accessible with Enter/Space support
- Uses CSS \`:has()\` to prevent hover/active states when interacting with popup`}}},tags:["autodocs"],argTypes:{appId:{control:"select",options:["file-explorer","google-chrome","vscode","firefox","notepad","github"],description:"The unique identifier of the application from APP_REGISTRY",table:{type:{summary:"string"}}},iconVariant:{control:"select",options:["desktop","taskbar","start-menu"],description:"Variant that determines icon size and click behavior. Desktop uses double-click, taskbar/start-menu uses single-click.",table:{type:{summary:"'desktop' | 'taskbar' | 'start-menu'"}}},shape:{control:"select",options:["square","circle","water-droplet"],description:"Optional custom shape for the icon (CSS class applied)",table:{type:{summary:"'square' | 'circle' | 'water-droplet'"}}},onSingleClick:{action:"Single clicked",description:"Callback function triggered on single-click (taskbar/start-menu variants). Called by parent to launch/add window.",table:{type:{summary:"(appId: string) => void"}}},onDoubleClick:{action:"Double clicked",description:"Callback function triggered on double-click (desktop variant). Called by parent to launch/add window.",table:{type:{summary:"(appId: string) => void"}}},onRightClick:{action:"Right clicked",description:"Callback function triggered on right-click. Called by parent for context menu.",table:{type:{summary:"(appId: string) => void"}}},onWindowFocus:{action:"Window focused",description:"Callback function triggered when popup item is clicked. Parent handles bringing window to front.",table:{type:{summary:"(windowId: string) => void"}}},onWindowClose:{action:"Window closed",description:"Callback function triggered when popup close button is clicked. Parent handles window removal.",table:{type:{summary:"(windowId: string) => void"}}}},args:{appId:"vscode",iconVariant:"desktop",onSingleClick:i(),onDoubleClick:i(),onWindowFocus:i(),onWindowClose:i()},decorators:[t=>(U.setState({taskbarAlignment:"bottom",isSearchVisible:!0,startMenuOpen:!1,startMenuLayout:"grid",showRecommendedApps:!0,showMoreIcons:!0,volumeLevel:50,currentTheme:"light"}),u.setState({activeWindows:[],taskbarPinnedAppIds:[],activeBackground:"/default-wallpaper.jpg",windowInstanceCounters:{}}),c.jsx(t,{}))]},w={args:{appId:"vscode",iconVariant:"desktop",shape:"square"},parameters:{docs:{description:{story:"Desktop icon variant - uses double-click to open applications"}}}},k={args:{appId:"google-chrome",iconVariant:"taskbar",shape:"square"},parameters:{docs:{description:{story:"Taskbar icon variant with no open windows - uses single-click to open applications. "}}}},h={args:{appId:"notepad",iconVariant:"start-menu",shape:"square"},parameters:{docs:{description:{story:"Start menu icon variant - uses single-click to open applications"}}}},b={args:{appId:"github",iconVariant:"desktop",shape:"circle"},parameters:{docs:{description:{story:"Icon with circular shape variant"}}}},I={args:{appId:"firefox",iconVariant:"desktop",shape:"water-droplet"},parameters:{docs:{description:{story:"Icon with water droplet shape variant"}}}},v={name:"AppIcon with Play Function",args:{appId:"vscode",iconVariant:"desktop",shape:"square",onSingleClick:i(),onDoubleClick:i(),onRightClick:i()},play:on,parameters:{docs:{description:{story:"Interactive story demonstrating click behaviors for desktop variant (double-click to open)"}}}},g={name:"AppIcon Taskbar with Play Function",args:{appId:"google-chrome",iconVariant:"taskbar",shape:"square",onSingleClick:i(),onDoubleClick:i(),onRightClick:i()},play:on,parameters:{docs:{description:{story:"Interactive story demonstrating click behaviors for taskbar variant (single-click to open)"}}}},C={args:{appId:"vscode",iconVariant:"desktop",shape:"square"},decorators:[t=>(U.getState().setTheme("dark"),c.jsx("div",{style:{padding:"2rem",borderRadius:"8px"},children:c.jsx(t,{})}))],parameters:{backgrounds:{default:"dark"},docs:{description:{story:"Desktop icon with dark theme styling - shows text shadow and adjusted hover states for dark backgrounds"}}}},S={name:"Taskbar with Open Unfocused Window",args:{appId:"vscode",iconVariant:"taskbar",shape:"square"},decorators:[t=>{const{addWindow:e}=u.getState();return e("vscode",{id:"vscode",appName:"VSCode",desktopIcon:"/apps/vscode-96.png",mobileIcon:"/apps/vscode-48.png",defaultPinned:!0,windowName:"VSCodeApp"}),c.jsx(t,{})}],parameters:{docs:{description:{story:"Taskbar icon with one open unfocused window - dot indicator shows unfocused state"}}}},f={name:"Taskbar with Open Focused Window",args:{appId:"vscode",iconVariant:"taskbar",shape:"square"},decorators:[t=>{const{addWindow:e,updateWindowZIndex:a,setWindowIsMaximized:s}=u.getState();e("vscode",{id:"vscode",appName:"VSCode",desktopIcon:"/apps/vscode-96.png",mobileIcon:"/apps/vscode-48.png",defaultPinned:!0,windowName:"VSCodeApp"});const p=u.getState(),r=p.activeWindows[p.activeWindows.length-1];return r.id&&(a(r.id,9999),s(r.id,"normal")),c.jsx(t,{})}],parameters:{docs:{description:{story:"Taskbar icon with one open focused window - dot indicator shows focused state. Hover over the taskbar icon to see the popup."}}}},y={name:"Taskbar with Multiple Open Windows and Unfocused",args:{appId:"vscode",iconVariant:"taskbar",shape:"square"},decorators:[t=>{const{addWindow:e}=u.getState(),a={id:"vscode",appName:"VSCode",desktopIcon:"/apps/vscode-96.png",mobileIcon:"/apps/vscode-48.png",defaultPinned:!0,windowName:"VSCodeApp"};return e("vscode",a),e("vscode",a),e("vscode",a),c.jsx(t,{})}],parameters:{docs:{description:{story:"Taskbar icon with three open windows - dot indicator shows unfocused state. Hover over the taskbar icon to see the popup with all windows listed."}}}},W={name:"Taskbar with Multiple Open Windows and Focused",args:{appId:"vscode",iconVariant:"taskbar",shape:"square"},decorators:[t=>{const{addWindow:e,updateWindowZIndex:a,setWindowIsMaximized:s}=u.getState(),n={id:"vscode",appName:"VSCode",desktopIcon:"/apps/vscode-96.png",mobileIcon:"/apps/vscode-48.png",defaultPinned:!0,windowName:"VSCodeApp"};e("vscode",n),e("vscode",n),e("vscode",n);const p=u.getState(),r=p.activeWindows[p.activeWindows.length-1];return r.id&&(a(r.id,9999),s(r.id,"normal")),c.jsx(t,{})}],parameters:{docs:{description:{story:"Taskbar icon with three open windows - dot indicator shows focused state for the highest zIndex window. Hover over the taskbar icon to see the popup with all windows listed."}}}},M={name:"Taskbar Dot Indicator with Play Function",args:{appId:"vscode",iconVariant:"taskbar",shape:"square",onSingleClick:i()},decorators:[t=>{const{addWindow:e}=u.getState();return e("vscode",{id:"vscode",appName:"VSCode",desktopIcon:"/apps/vscode-96.png",mobileIcon:"/apps/vscode-48.png",defaultPinned:!0,windowName:"VSCodeApp"}),c.jsx(t,{})}],play:rn,parameters:{docs:{description:{story:"Interactive story demonstrating taskbar dot indicator behavior when windows are open"}}}},x={name:"Taskbar Popup - Dark Theme",args:{appId:"google-chrome",iconVariant:"taskbar",shape:"square",onWindowFocus:i(),onWindowClose:i()},decorators:[t=>{U.getState().setTheme("dark");const{addWindow:e}=u.getState(),a={id:"google-chrome",appName:"Google Chrome",desktopIcon:"/apps/chrome-96.png",mobileIcon:"/apps/chrome-48.png",defaultPinned:!0,windowName:"ChromeApp"};return e("google-chrome",a),e("google-chrome",a),c.jsx(t,{})}],parameters:{backgrounds:{default:"dark"},docs:{description:{story:"Taskbar icon popup with dark theme - shows acrylic material effect on dark background. Hover to see the popup."}}}},T={name:"Taskbar Popup - Click & Close Interactions",args:{appId:"vscode",iconVariant:"taskbar",shape:"square",onSingleClick:i(),onWindowFocus:i(),onWindowClose:i()},decorators:[t=>{const{addWindow:e}=u.getState(),a={id:"vscode",appName:"VSCode",desktopIcon:"/apps/vscode-96.png",mobileIcon:"/apps/vscode-48.png",defaultPinned:!0,windowName:"VSCodeApp"};return e("vscode",a),e("vscode",a),c.jsx(t,{})}],play:dn,parameters:{docs:{description:{story:"Interactive story testing popup window click and close button functionality with callback handlers"}}}},P={name:"Desktop Icon - Right Click Context Menu (Unpinned)",args:{appId:"vscode",iconVariant:"desktop",shape:"square",isPinned:!1,onContextMenuItemClick:i()},parameters:{docs:{description:{story:'Desktop icon context menu when app is unpinned from taskbar. Shows "Open", "Pin to taskbar", and "Properties" options.'}}}},V={name:"Desktop Icon - Right Click Context Menu (Pinned)",args:{appId:"vscode",iconVariant:"desktop",shape:"square",isPinned:!0,onContextMenuItemClick:i()},parameters:{docs:{description:{story:'Desktop icon context menu when app is pinned to taskbar. Shows "Open", "Unpin from taskbar", and "Properties" options.'}}}},N={name:"Taskbar Icon - Right Click Context Menu (No Windows)",args:{appId:"google-chrome",iconVariant:"taskbar",shape:"square",isPinned:!0,onContextMenuItemClick:i()},parameters:{docs:{description:{story:'Taskbar icon context menu with no open windows. Shows "New window" and "Unpin from taskbar" options.'}}}},A={name:"Taskbar Icon - Right Click Context Menu (Single Window)",args:{appId:"vscode",iconVariant:"taskbar",shape:"square",isPinned:!0,onContextMenuItemClick:i()},decorators:[t=>{const{addWindow:e}=u.getState();return e("vscode",{id:"vscode",appName:"VSCode",desktopIcon:"/apps/vscode-96.png",mobileIcon:"/apps/vscode-48.png",defaultPinned:!0,windowName:"VSCodeApp"}),c.jsx(t,{})}],parameters:{docs:{description:{story:'Taskbar icon context menu with one open window. Shows "New window", "Unpin from taskbar", and "Close window" (destructive) options.'}}}},D={name:"Taskbar Icon - Right Click Context Menu (Multiple Windows)",args:{appId:"notepad",iconVariant:"taskbar",shape:"square",isPinned:!0,onContextMenuItemClick:i()},decorators:[t=>{const{addWindow:e}=u.getState(),a={id:"notepad",appName:"Notepad",desktopIcon:"/apps/notepad-96.png",mobileIcon:"/apps/notepad-48.png",defaultPinned:!1,windowName:"NotepadApp"};return e("notepad",a),e("notepad",a),e("notepad",a),c.jsx(t,{})}],parameters:{docs:{description:{story:'Taskbar icon context menu with three open windows. Shows "New window", "Unpin from taskbar", "Close window" (single), and "Close all windows" (destructive, multiple) options.'}}}},_={name:"Start Menu Icon - Right Click Context Menu (Unpinned)",args:{appId:"firefox",iconVariant:"start-menu",shape:"square",isPinned:!1,onContextMenuItemClick:i()},parameters:{docs:{description:{story:'Start menu icon context menu when app is unpinned from taskbar. Shows "Open" and "Pin to taskbar" options.'}}}},q={name:"Start Menu Icon - Right Click Context Menu (Pinned)",args:{appId:"firefox",iconVariant:"start-menu",shape:"square",isPinned:!0,onContextMenuItemClick:i()},parameters:{docs:{description:{story:'Start menu icon context menu when app is pinned to taskbar. Shows "Open" and "Unpin from taskbar" options.'}}}},R={name:"Context Menu - Click & Close Interactions",args:{appId:"vscode",iconVariant:"taskbar",shape:"square",isPinned:!0,onRightClick:i(),onContextMenuItemClick:i()},decorators:[t=>{const{addWindow:e}=u.getState();return e("vscode",{id:"vscode",appName:"VSCode",desktopIcon:"/apps/vscode-96.png",mobileIcon:"/apps/vscode-48.png",defaultPinned:!0,windowName:"VSCodeApp"}),c.jsx(t,{})}],play:pn,parameters:{docs:{description:{story:"Interactive story testing context menu item clicks and closing behavior. Right-click the icon to see the menu, click an item to trigger the callback."}}}};var O,j,z;w.parameters={...w.parameters,docs:{...(O=w.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    appId: 'vscode',
    iconVariant: 'desktop',
    shape: 'square'
  },
  parameters: {
    docs: {
      description: {
        story: 'Desktop icon variant - uses double-click to open applications'
      }
    }
  }
}`,...(z=(j=w.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var E,Z,G;k.parameters={...k.parameters,docs:{...(E=k.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    appId: 'google-chrome',
    iconVariant: 'taskbar',
    shape: 'square'
  },
  parameters: {
    docs: {
      description: {
        story: 'Taskbar icon variant with no open windows - uses single-click to open applications. '
      }
    }
  }
}`,...(G=(Z=k.parameters)==null?void 0:Z.docs)==null?void 0:G.source}}};var L,Y,K;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    appId: 'notepad',
    iconVariant: 'start-menu',
    shape: 'square'
  },
  parameters: {
    docs: {
      description: {
        story: 'Start menu icon variant - uses single-click to open applications'
      }
    }
  }
}`,...(K=(Y=h.parameters)==null?void 0:Y.docs)==null?void 0:K.source}}};var J,Q,X;b.parameters={...b.parameters,docs:{...(J=b.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    appId: 'github',
    iconVariant: 'desktop',
    shape: 'circle'
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon with circular shape variant'
      }
    }
  }
}`,...(X=(Q=b.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var $,ee,ne;I.parameters={...I.parameters,docs:{...($=I.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    appId: 'firefox',
    iconVariant: 'desktop',
    shape: 'water-droplet'
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon with water droplet shape variant'
      }
    }
  }
}`,...(ne=(ee=I.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var oe,te,ae;v.parameters={...v.parameters,docs:{...(oe=v.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  name: 'AppIcon with Play Function',
  args: {
    appId: 'vscode',
    iconVariant: 'desktop',
    shape: 'square',
    onSingleClick: fn(),
    onDoubleClick: fn(),
    onRightClick: fn()
  },
  play: appIconPlayFunction,
  parameters: {
    docs: {
      description: {
        story: 'Interactive story demonstrating click behaviors for desktop variant (double-click to open)'
      }
    }
  }
}`,...(ae=(te=v.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var se,ie,re;g.parameters={...g.parameters,docs:{...(se=g.parameters)==null?void 0:se.docs,source:{originalSource:`{
  name: 'AppIcon Taskbar with Play Function',
  args: {
    appId: 'google-chrome',
    iconVariant: 'taskbar',
    shape: 'square',
    onSingleClick: fn(),
    onDoubleClick: fn(),
    onRightClick: fn()
  },
  play: appIconPlayFunction,
  parameters: {
    docs: {
      description: {
        story: 'Interactive story demonstrating click behaviors for taskbar variant (single-click to open)'
      }
    }
  }
}`,...(re=(ie=g.parameters)==null?void 0:ie.docs)==null?void 0:re.source}}};var de,pe,ce;C.parameters={...C.parameters,docs:{...(de=C.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    appId: 'vscode',
    iconVariant: 'desktop',
    shape: 'square'
  },
  decorators: [Story => {
    useSystemUIState.getState().setTheme('dark');
    return <div style={{
      padding: '2rem',
      borderRadius: '8px'
    }}>\r
          <Story />\r
        </div>;
  }],
  parameters: {
    backgrounds: {
      default: 'dark'
    },
    docs: {
      description: {
        story: 'Desktop icon with dark theme styling - shows text shadow and adjusted hover states for dark backgrounds'
      }
    }
  }
}`,...(ce=(pe=C.parameters)==null?void 0:pe.docs)==null?void 0:ce.source}}};var ue,le,me;S.parameters={...S.parameters,docs:{...(ue=S.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  name: 'Taskbar with Open Unfocused Window',
  args: {
    appId: 'vscode',
    iconVariant: 'taskbar',
    shape: 'square'
  },
  decorators: [Story => {
    // Add a window to the workspace
    const {
      addWindow
    } = useWorkspaceState.getState();
    const appMetadata = {
      id: 'vscode',
      appName: 'VSCode',
      desktopIcon: '/apps/vscode-96.png',
      mobileIcon: '/apps/vscode-48.png',
      defaultPinned: true,
      windowName: 'VSCodeApp'
    };
    addWindow('vscode', appMetadata);
    return <Story />;
  }],
  parameters: {
    docs: {
      description: {
        story: 'Taskbar icon with one open unfocused window - dot indicator shows unfocused state'
      }
    }
  }
}`,...(me=(le=S.parameters)==null?void 0:le.docs)==null?void 0:me.source}}};var we,ke,he;f.parameters={...f.parameters,docs:{...(we=f.parameters)==null?void 0:we.docs,source:{originalSource:`{
  name: 'Taskbar with Open Focused Window',
  args: {
    appId: 'vscode',
    iconVariant: 'taskbar',
    shape: 'square'
  },
  decorators: [Story => {
    // Add a window to the workspace and set its zIndex to highest
    const {
      addWindow,
      updateWindowZIndex,
      setWindowIsMaximized
    } = useWorkspaceState.getState();
    const appMetadata = {
      id: 'vscode',
      appName: 'VSCode',
      desktopIcon: '/apps/vscode-96.png',
      mobileIcon: '/apps/vscode-48.png',
      defaultPinned: true,
      windowName: 'VSCodeApp'
    };
    addWindow('vscode', appMetadata);
    const state = useWorkspaceState.getState();
    const lastWindow = state.activeWindows[state.activeWindows.length - 1];
    if (lastWindow.id) {
      updateWindowZIndex(lastWindow.id, 9999); // Set highest zIndex
      setWindowIsMaximized(lastWindow.id, 'normal'); // Set isMaximized
    }
    return <Story />;
  }],
  parameters: {
    docs: {
      description: {
        story: 'Taskbar icon with one open focused window - dot indicator shows focused state. Hover over the taskbar icon to see the popup.'
      }
    }
  }
}`,...(he=(ke=f.parameters)==null?void 0:ke.docs)==null?void 0:he.source}}};var be,Ie,ve;y.parameters={...y.parameters,docs:{...(be=y.parameters)==null?void 0:be.docs,source:{originalSource:`{
  name: 'Taskbar with Multiple Open Windows and Unfocused',
  args: {
    appId: 'vscode',
    iconVariant: 'taskbar',
    shape: 'square'
  },
  decorators: [Story => {
    // Add multiple windows to the workspace
    const {
      addWindow
    } = useWorkspaceState.getState();
    const appMetadata = {
      id: 'vscode',
      appName: 'VSCode',
      desktopIcon: '/apps/vscode-96.png',
      mobileIcon: '/apps/vscode-48.png',
      defaultPinned: true,
      windowName: 'VSCodeApp'
    };
    addWindow('vscode', appMetadata);
    addWindow('vscode', appMetadata);
    addWindow('vscode', appMetadata);
    return <Story />;
  }],
  parameters: {
    docs: {
      description: {
        story: 'Taskbar icon with three open windows - dot indicator shows unfocused state. Hover over the taskbar icon to see the popup with all windows listed.'
      }
    }
  }
}`,...(ve=(Ie=y.parameters)==null?void 0:Ie.docs)==null?void 0:ve.source}}};var ge,Ce,Se;W.parameters={...W.parameters,docs:{...(ge=W.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  name: 'Taskbar with Multiple Open Windows and Focused',
  args: {
    appId: 'vscode',
    iconVariant: 'taskbar',
    shape: 'square'
  },
  decorators: [Story => {
    // Add multiple windows to the workspace
    const {
      addWindow,
      updateWindowZIndex,
      setWindowIsMaximized
    } = useWorkspaceState.getState();
    const appMetadata = {
      id: 'vscode',
      appName: 'VSCode',
      desktopIcon: '/apps/vscode-96.png',
      mobileIcon: '/apps/vscode-48.png',
      defaultPinned: true,
      windowName: 'VSCodeApp'
    };
    addWindow('vscode', appMetadata);
    addWindow('vscode', appMetadata);
    addWindow('vscode', appMetadata);

    // Set last window as focused (highest zIndex)
    const state = useWorkspaceState.getState();
    const lastWindow = state.activeWindows[state.activeWindows.length - 1];
    if (lastWindow.id) {
      updateWindowZIndex(lastWindow.id, 9999);
      setWindowIsMaximized(lastWindow.id, 'normal'); // Set isMaximized
    }
    return <Story />;
  }],
  parameters: {
    docs: {
      description: {
        story: 'Taskbar icon with three open windows - dot indicator shows focused state for the highest zIndex window. Hover over the taskbar icon to see the popup with all windows listed.'
      }
    }
  }
}`,...(Se=(Ce=W.parameters)==null?void 0:Ce.docs)==null?void 0:Se.source}}};var fe,ye,We;M.parameters={...M.parameters,docs:{...(fe=M.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  name: 'Taskbar Dot Indicator with Play Function',
  args: {
    appId: 'vscode',
    iconVariant: 'taskbar',
    shape: 'square',
    onSingleClick: fn()
  },
  decorators: [Story => {
    // Add a window to show dot indicator
    const {
      addWindow
    } = useWorkspaceState.getState();
    const appMetadata = {
      id: 'vscode',
      appName: 'VSCode',
      desktopIcon: '/apps/vscode-96.png',
      mobileIcon: '/apps/vscode-48.png',
      defaultPinned: true,
      windowName: 'VSCodeApp'
    };
    addWindow('vscode', appMetadata);
    return <Story />;
  }],
  play: appIconDotPlayFunction,
  parameters: {
    docs: {
      description: {
        story: 'Interactive story demonstrating taskbar dot indicator behavior when windows are open'
      }
    }
  }
}`,...(We=(ye=M.parameters)==null?void 0:ye.docs)==null?void 0:We.source}}};var Me,xe,Te;x.parameters={...x.parameters,docs:{...(Me=x.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  name: 'Taskbar Popup - Dark Theme',
  args: {
    appId: 'google-chrome',
    iconVariant: 'taskbar',
    shape: 'square',
    onWindowFocus: fn(),
    onWindowClose: fn()
  },
  decorators: [Story => {
    useSystemUIState.getState().setTheme('dark');

    // Add multiple windows
    const {
      addWindow
    } = useWorkspaceState.getState();
    const appMetadata = {
      id: 'google-chrome',
      appName: 'Google Chrome',
      desktopIcon: '/apps/chrome-96.png',
      mobileIcon: '/apps/chrome-48.png',
      defaultPinned: true,
      windowName: 'ChromeApp'
    };
    addWindow('google-chrome', appMetadata);
    addWindow('google-chrome', appMetadata);
    return <Story />;
  }],
  parameters: {
    backgrounds: {
      default: 'dark'
    },
    docs: {
      description: {
        story: 'Taskbar icon popup with dark theme - shows acrylic material effect on dark background. Hover to see the popup.'
      }
    }
  }
}`,...(Te=(xe=x.parameters)==null?void 0:xe.docs)==null?void 0:Te.source}}};var Pe,Ve,Ne;T.parameters={...T.parameters,docs:{...(Pe=T.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  name: 'Taskbar Popup - Click & Close Interactions',
  args: {
    appId: 'vscode',
    iconVariant: 'taskbar',
    shape: 'square',
    onSingleClick: fn(),
    onWindowFocus: fn(),
    onWindowClose: fn()
  },
  decorators: [Story => {
    // Add multiple windows for popup interaction
    const {
      addWindow
    } = useWorkspaceState.getState();
    const appMetadata = {
      id: 'vscode',
      appName: 'VSCode',
      desktopIcon: '/apps/vscode-96.png',
      mobileIcon: '/apps/vscode-48.png',
      defaultPinned: true,
      windowName: 'VSCodeApp'
    };
    addWindow('vscode', appMetadata);
    addWindow('vscode', appMetadata);
    return <Story />;
  }],
  play: appIconPopupPlayFunction,
  parameters: {
    docs: {
      description: {
        story: 'Interactive story testing popup window click and close button functionality with callback handlers'
      }
    }
  }
}`,...(Ne=(Ve=T.parameters)==null?void 0:Ve.docs)==null?void 0:Ne.source}}};var Ae,De,_e;P.parameters={...P.parameters,docs:{...(Ae=P.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  name: 'Desktop Icon - Right Click Context Menu (Unpinned)',
  args: {
    appId: 'vscode',
    iconVariant: 'desktop',
    shape: 'square',
    isPinned: false,
    onContextMenuItemClick: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'Desktop icon context menu when app is unpinned from taskbar. Shows "Open", "Pin to taskbar", and "Properties" options.'
      }
    }
  }
}`,...(_e=(De=P.parameters)==null?void 0:De.docs)==null?void 0:_e.source}}};var qe,Re,Be;V.parameters={...V.parameters,docs:{...(qe=V.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  name: 'Desktop Icon - Right Click Context Menu (Pinned)',
  args: {
    appId: 'vscode',
    iconVariant: 'desktop',
    shape: 'square',
    isPinned: true,
    onContextMenuItemClick: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'Desktop icon context menu when app is pinned to taskbar. Shows "Open", "Unpin from taskbar", and "Properties" options.'
      }
    }
  }
}`,...(Be=(Re=V.parameters)==null?void 0:Re.docs)==null?void 0:Be.source}}};var He,Fe,Ue;N.parameters={...N.parameters,docs:{...(He=N.parameters)==null?void 0:He.docs,source:{originalSource:`{
  name: 'Taskbar Icon - Right Click Context Menu (No Windows)',
  args: {
    appId: 'google-chrome',
    iconVariant: 'taskbar',
    shape: 'square',
    isPinned: true,
    onContextMenuItemClick: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'Taskbar icon context menu with no open windows. Shows "New window" and "Unpin from taskbar" options.'
      }
    }
  }
}`,...(Ue=(Fe=N.parameters)==null?void 0:Fe.docs)==null?void 0:Ue.source}}};var Oe,je,ze;A.parameters={...A.parameters,docs:{...(Oe=A.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  name: 'Taskbar Icon - Right Click Context Menu (Single Window)',
  args: {
    appId: 'vscode',
    iconVariant: 'taskbar',
    shape: 'square',
    isPinned: true,
    onContextMenuItemClick: fn()
  },
  decorators: [Story => {
    // Add a single window to the workspace
    const {
      addWindow
    } = useWorkspaceState.getState();
    const appMetadata = {
      id: 'vscode',
      appName: 'VSCode',
      desktopIcon: '/apps/vscode-96.png',
      mobileIcon: '/apps/vscode-48.png',
      defaultPinned: true,
      windowName: 'VSCodeApp'
    };
    addWindow('vscode', appMetadata);
    return <Story />;
  }],
  parameters: {
    docs: {
      description: {
        story: 'Taskbar icon context menu with one open window. Shows "New window", "Unpin from taskbar", and "Close window" (destructive) options.'
      }
    }
  }
}`,...(ze=(je=A.parameters)==null?void 0:je.docs)==null?void 0:ze.source}}};var Ee,Ze,Ge;D.parameters={...D.parameters,docs:{...(Ee=D.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  name: 'Taskbar Icon - Right Click Context Menu (Multiple Windows)',
  args: {
    appId: 'notepad',
    iconVariant: 'taskbar',
    shape: 'square',
    isPinned: true,
    onContextMenuItemClick: fn()
  },
  decorators: [Story => {
    // Add multiple windows to the workspace
    const {
      addWindow
    } = useWorkspaceState.getState();
    const appMetadata = {
      id: 'notepad',
      appName: 'Notepad',
      desktopIcon: '/apps/notepad-96.png',
      mobileIcon: '/apps/notepad-48.png',
      defaultPinned: false,
      windowName: 'NotepadApp'
    };
    addWindow('notepad', appMetadata);
    addWindow('notepad', appMetadata);
    addWindow('notepad', appMetadata);
    return <Story />;
  }],
  parameters: {
    docs: {
      description: {
        story: 'Taskbar icon context menu with three open windows. Shows "New window", "Unpin from taskbar", "Close window" (single), and "Close all windows" (destructive, multiple) options.'
      }
    }
  }
}`,...(Ge=(Ze=D.parameters)==null?void 0:Ze.docs)==null?void 0:Ge.source}}};var Le,Ye,Ke;_.parameters={..._.parameters,docs:{...(Le=_.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  name: 'Start Menu Icon - Right Click Context Menu (Unpinned)',
  args: {
    appId: 'firefox',
    iconVariant: 'start-menu',
    shape: 'square',
    isPinned: false,
    onContextMenuItemClick: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'Start menu icon context menu when app is unpinned from taskbar. Shows "Open" and "Pin to taskbar" options.'
      }
    }
  }
}`,...(Ke=(Ye=_.parameters)==null?void 0:Ye.docs)==null?void 0:Ke.source}}};var Je,Qe,Xe;q.parameters={...q.parameters,docs:{...(Je=q.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  name: 'Start Menu Icon - Right Click Context Menu (Pinned)',
  args: {
    appId: 'firefox',
    iconVariant: 'start-menu',
    shape: 'square',
    isPinned: true,
    onContextMenuItemClick: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'Start menu icon context menu when app is pinned to taskbar. Shows "Open" and "Unpin from taskbar" options.'
      }
    }
  }
}`,...(Xe=(Qe=q.parameters)==null?void 0:Qe.docs)==null?void 0:Xe.source}}};var $e,en,nn;R.parameters={...R.parameters,docs:{...($e=R.parameters)==null?void 0:$e.docs,source:{originalSource:`{
  name: 'Context Menu - Click & Close Interactions',
  args: {
    appId: 'vscode',
    iconVariant: 'taskbar',
    shape: 'square',
    isPinned: true,
    onRightClick: fn(),
    onContextMenuItemClick: fn()
  },
  decorators: [Story => {
    // Add a window to show context menu with window-related options
    const {
      addWindow
    } = useWorkspaceState.getState();
    const appMetadata = {
      id: 'vscode',
      appName: 'VSCode',
      desktopIcon: '/apps/vscode-96.png',
      mobileIcon: '/apps/vscode-48.png',
      defaultPinned: true,
      windowName: 'VSCodeApp'
    };
    addWindow('vscode', appMetadata);
    return <Story />;
  }],
  play: appIconContextMenuPlayFunction,
  parameters: {
    docs: {
      description: {
        story: 'Interactive story testing context menu item clicks and closing behavior. Right-click the icon to see the menu, click an item to trigger the callback.'
      }
    }
  }
}`,...(nn=(en=R.parameters)==null?void 0:en.docs)==null?void 0:nn.source}}};const Tn=["DesktopIcon","TaskbarIcon","StartMenuIcon","CircleShape","WaterDropletShape","AppIconWithInteractions","AppIconTaskbarInteractions","DarkTheme","TaskbarWithOpenWindow","TaskbarWithFocusedWindow","TaskbarWithMultipleWindowsAndUnfocused","TaskbarWithMultipleWindows","TaskbarDotInteractions","TaskbarPopupDarkTheme","TaskbarPopupInteractions","DesktopIconContextMenu","DesktopIconContextMenuPinned","TaskbarIconContextMenuNoWindows","TaskbarIconContextMenuWithWindows","TaskbarIconContextMenuWithMultipleWindows","StartMenuIconContextMenuUnpinned","StartMenuIconContextMenuPinned","ContextMenuInteractions"];export{g as AppIconTaskbarInteractions,v as AppIconWithInteractions,b as CircleShape,R as ContextMenuInteractions,C as DarkTheme,w as DesktopIcon,P as DesktopIconContextMenu,V as DesktopIconContextMenuPinned,h as StartMenuIcon,q as StartMenuIconContextMenuPinned,_ as StartMenuIconContextMenuUnpinned,M as TaskbarDotInteractions,k as TaskbarIcon,N as TaskbarIconContextMenuNoWindows,D as TaskbarIconContextMenuWithMultipleWindows,A as TaskbarIconContextMenuWithWindows,x as TaskbarPopupDarkTheme,T as TaskbarPopupInteractions,f as TaskbarWithFocusedWindow,W as TaskbarWithMultipleWindows,y as TaskbarWithMultipleWindowsAndUnfocused,S as TaskbarWithOpenWindow,I as WaterDropletShape,Tn as __namedExportsOrder,xn as default};
