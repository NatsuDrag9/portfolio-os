import{j as i}from"./jsx-runtime-D_zvdyIk.js";import{w as c,e as r,u as d,f as ge}from"./index-L8OlCEhE.js";import{r as ve}from"./index-DvOVhSYJ.js";import{w as u,f as Ve,S as ue}from"./dom.esm-Bv4uKQDH.js";import"./chunk-3-B_RIhxAf.js";import"./createFluentIcon-BZ9LiokK.js";import"./chunk-7-CdrDaij8.js";const me=async({canvasElement:t,args:o})=>{const s=c(t).getByRole("slider");r(s).toBeInTheDocument();const e=t.querySelector(`label[for="${o==null?void 0:o.sliderFor}"]`);r(e).toBeInTheDocument(),r(e).toHaveClass("slider__label"),r(s).toHaveValue(String(o==null?void 0:o.sliderValue)),r(s).toHaveAttribute("min","0"),r(s).toHaveAttribute("max","100"),r(s).toHaveAttribute("step","1"),r(s).toHaveClass("slider__range");const n=e==null?void 0:e.querySelector(".slider__fluent-icon");r(n).toBeInTheDocument();const he=t.querySelector(".slider__input-container");r(he).toBeInTheDocument();let l=t.querySelector(".slider__tooltip");r(l).not.toBeInTheDocument(),await d.hover(s),await u(()=>{l=t.querySelector(".slider__tooltip"),r(l).toBeInTheDocument()}),r(l==null?void 0:l.textContent).toBe(String(o==null?void 0:o.sliderValue)),await d.unhover(s),await u(()=>{l=t.querySelector(".slider__tooltip"),r(l).not.toBeInTheDocument()})},Fe=async({canvasElement:t,args:o})=>{const s=c(t).getByRole("slider");r(s).toBeInTheDocument(),r(o==null?void 0:o.sliderFor).toBe("volume");const e=t.querySelector('label[for="volume"]');r(e).toBeInTheDocument(),r(e).toHaveClass("slider__label");const n=e==null?void 0:e.querySelector(".slider__fluent-icon");r(n).toBeInTheDocument()},Se=async({canvasElement:t,args:o})=>{const s=c(t).getByRole("slider");r(s).toBeInTheDocument(),r(o==null?void 0:o.sliderFor).toBe("brightness");const e=t.querySelector('label[for="brightness"]');r(e).toBeInTheDocument(),r(e).toHaveClass("slider__label");const n=e==null?void 0:e.querySelector(".slider__fluent-icon");r(n).toBeInTheDocument()},Be=async({canvasElement:t,args:o})=>{const s=c(t).getByRole("slider");r(s).toBeInTheDocument();const e=Number(s.value);await d.click(s),r(s).toHaveFocus();const n=e+1;Ve.change(s,{target:{value:String(n)}}),await u(()=>{r(Number(s.value)).toBe(n)}),r(o==null?void 0:o.onSliderChange).toHaveBeenCalledWith(n,o==null?void 0:o.sliderFor)},pe=async({canvasElement:t,args:o})=>{const s=c(t).getByRole("slider");r(s).toBeInTheDocument(),r(s).toHaveValue("0");const e=t.querySelector(`label[for="${o==null?void 0:o.sliderFor}"]`);r(e).toBeInTheDocument();const n=e==null?void 0:e.querySelector(".slider__fluent-icon");r(n).toBeInTheDocument()},ye=async({canvasElement:t,args:o})=>{const s=c(t).getByRole("slider");r(s).toBeInTheDocument(),r(s).toHaveValue("100");const e=t.querySelector(`label[for="${o==null?void 0:o.sliderFor}"]`);r(e).toBeInTheDocument();const n=e==null?void 0:e.querySelector(".slider__fluent-icon");r(n).toBeInTheDocument()},Ie=async({canvasElement:t,args:o})=>{const s=c(t).getByRole("slider");r(s).toBeInTheDocument();let e=t.querySelector(".slider__tooltip");r(e).not.toBeInTheDocument(),d.hover(s),await u(()=>{e=t.querySelector(".slider__tooltip"),r(e).toBeInTheDocument()}),r(e==null?void 0:e.textContent).toBe(String(o==null?void 0:o.sliderValue)),d.unhover(s),await u(()=>{e=t.querySelector(".slider__tooltip"),r(e).not.toBeInTheDocument()})},b=t=>{const[o,a]=ve.useState(t.sliderValue),s=(e,n)=>{a(e),t.onSliderChange(e,n)};return i.jsx(ue,{...t,sliderValue:o,onSliderChange:s})},we={title:"Components/Slider",component:ue,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A reusable slider component designed for brightness and volume controls. Displays contextual icons based on the slider type and current value."}}},argTypes:{sliderFor:{control:"radio",options:["volume","brightness"],description:"Determines the slider type and associated icons",table:{type:{summary:"SliderForType"},defaultValue:{summary:"volume"}}},sliderValue:{control:{type:"range",min:0,max:100,step:1},description:"Current value of the slider (0-100)",table:{type:{summary:"number"},defaultValue:{summary:"50"}}},alignment:{control:"radio",options:["horizontal","vertical"],description:"Orientation of the slider",table:{type:{summary:"'horizontal' | 'vertical'"},defaultValue:{summary:"horizontal"}}},onSliderChange:{action:"sliderChanged",description:"Callback fired when slider value changes. Receives the new value and slider type.",table:{type:{summary:"(value: number, sliderFor: SliderForType) => void"}}}},args:{onSliderChange:ge()},render:t=>i.jsx(b,{...t})},m={args:{sliderFor:"volume",sliderValue:50},play:me},p={args:{sliderFor:"volume",sliderValue:0},play:pe},y={args:{sliderFor:"volume",sliderValue:100},play:ye},h={args:{sliderFor:"brightness",sliderValue:50},play:me},g={args:{sliderFor:"brightness",sliderValue:0},play:pe},v={args:{sliderFor:"brightness",sliderValue:100},play:ye},V={args:{sliderFor:"volume",sliderValue:75},play:Fe},F={args:{sliderFor:"brightness",sliderValue:75},play:Se},S={args:{sliderFor:"volume",sliderValue:50},play:Be},B={args:{sliderFor:"brightness",sliderValue:65},parameters:{layout:"centered",docs:{description:{story:"Tests the tooltip functionality on hover and during drag interactions. The tooltip displays the current slider value."}}},play:Ie},I={args:{sliderFor:"volume",sliderValue:50,alignment:"vertical"},parameters:{layout:"centered",docs:{description:{story:"Volume slider in vertical orientation for use in side-aligned taskbars."}}},decorators:[t=>i.jsx("div",{style:{height:"20rem",display:"flex",alignItems:"center"},children:i.jsx(t,{})})]},f={args:{sliderFor:"brightness",sliderValue:50,alignment:"vertical"},parameters:{layout:"centered",docs:{description:{story:"Brightness slider in vertical orientation for use in side-aligned taskbars."}}},decorators:[t=>i.jsx("div",{style:{height:"20rem",display:"flex",alignItems:"center"},children:i.jsx(t,{})})]},T={args:{sliderFor:"volume",sliderValue:50,alignment:"vertical"},parameters:{layout:"centered",docs:{description:{story:"Both sliders in vertical orientation, demonstrating the layout for vertical taskbar quick actions."}}},render:t=>i.jsxs("div",{style:{height:"20rem",display:"flex",flexDirection:"row",gap:"2rem",alignItems:"center"},children:[i.jsx(b,{...t,sliderFor:"brightness"}),i.jsx(b,{...t,sliderFor:"volume"})]})};var x,_,D;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    sliderFor: 'volume',
    sliderValue: 50
  },
  play: sliderPlayFunction
}`,...(D=(_=m.parameters)==null?void 0:_.docs)==null?void 0:D.source}}};var q,w,C;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    sliderFor: 'volume',
    sliderValue: 0
  },
  play: sliderZeroValuePlayFunction
}`,...(C=(w=p.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var P,H,j;y.parameters={...y.parameters,docs:{...(P=y.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    sliderFor: 'volume',
    sliderValue: 100
  },
  play: sliderMaxValuePlayFunction
}`,...(j=(H=y.parameters)==null?void 0:H.docs)==null?void 0:j.source}}};var k,M,R;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    sliderFor: 'brightness',
    sliderValue: 50
  },
  play: sliderPlayFunction
}`,...(R=(M=h.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var W,A,z;g.parameters={...g.parameters,docs:{...(W=g.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    sliderFor: 'brightness',
    sliderValue: 0
  },
  play: sliderZeroValuePlayFunction
}`,...(z=(A=g.parameters)==null?void 0:A.docs)==null?void 0:z.source}}};var Z,$,L;v.parameters={...v.parameters,docs:{...(Z=v.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    sliderFor: 'brightness',
    sliderValue: 100
  },
  play: sliderMaxValuePlayFunction
}`,...(L=($=v.parameters)==null?void 0:$.docs)==null?void 0:L.source}}};var N,O,G;V.parameters={...V.parameters,docs:{...(N=V.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    sliderFor: 'volume',
    sliderValue: 75
  },
  play: sliderVolumeIconPlayFunction
}`,...(G=(O=V.parameters)==null?void 0:O.docs)==null?void 0:G.source}}};var J,K,Q;F.parameters={...F.parameters,docs:{...(J=F.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    sliderFor: 'brightness',
    sliderValue: 75
  },
  play: sliderBrightnessIconPlayFunction
}`,...(Q=(K=F.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var U,X,Y;S.parameters={...S.parameters,docs:{...(U=S.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    sliderFor: 'volume',
    sliderValue: 50
  },
  play: sliderInteractionPlayFunction
}`,...(Y=(X=S.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var E,ee,re;B.parameters={...B.parameters,docs:{...(E=B.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    sliderFor: 'brightness',
    sliderValue: 65
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Tests the tooltip functionality on hover and during drag interactions. The tooltip displays the current slider value.'
      }
    }
  },
  play: sliderTooltipPlayFunction
}`,...(re=(ee=B.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var te,oe,se;I.parameters={...I.parameters,docs:{...(te=I.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    sliderFor: 'volume',
    sliderValue: 50,
    alignment: 'vertical'
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Volume slider in vertical orientation for use in side-aligned taskbars.'
      }
    }
  },
  decorators: [Story => <div style={{
    height: '20rem',
    display: 'flex',
    alignItems: 'center'
  }}>\r
        <Story />\r
      </div>]
}`,...(se=(oe=I.parameters)==null?void 0:oe.docs)==null?void 0:se.source}}};var ne,ie,ae;f.parameters={...f.parameters,docs:{...(ne=f.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    sliderFor: 'brightness',
    sliderValue: 50,
    alignment: 'vertical'
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Brightness slider in vertical orientation for use in side-aligned taskbars.'
      }
    }
  },
  decorators: [Story => <div style={{
    height: '20rem',
    display: 'flex',
    alignItems: 'center'
  }}>\r
        <Story />\r
      </div>]
}`,...(ae=(ie=f.parameters)==null?void 0:ie.docs)==null?void 0:ae.source}}};var le,ce,de;T.parameters={...T.parameters,docs:{...(le=T.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    sliderFor: 'volume',
    sliderValue: 50,
    alignment: 'vertical'
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Both sliders in vertical orientation, demonstrating the layout for vertical taskbar quick actions.'
      }
    }
  },
  render: args => <div style={{
    height: '20rem',
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
    alignItems: 'center'
  }}>\r
      <SliderWithState {...args} sliderFor="brightness" />\r
      <SliderWithState {...args} sliderFor="volume" />\r
    </div>
}`,...(de=(ce=T.parameters)==null?void 0:ce.docs)==null?void 0:de.source}}};const Ce=["VolumeDefault","VolumeMuted","VolumeMax","BrightnessDefault","BrightnessLow","BrightnessMax","VolumeIconTest","BrightnessIconTest","InteractionTest","TooltipTest","VolumeVertical","BrightnessVertical","VerticalSliders"];export{h as BrightnessDefault,F as BrightnessIconTest,g as BrightnessLow,v as BrightnessMax,f as BrightnessVertical,S as InteractionTest,B as TooltipTest,T as VerticalSliders,m as VolumeDefault,V as VolumeIconTest,y as VolumeMax,p as VolumeMuted,I as VolumeVertical,Ce as __namedExportsOrder,we as default};
