import { useState, useEffect, useRef } from "react";

const C={bg:"#1A1F2E",bg2:"#212738",t1:"#E2E2EE",t2:"#A8A8C0",t3:"#6E6E88",t4:"#555570",ac:"#23F7DD",acd:"rgba(35,247,221,0.07)",bd:"rgba(255,255,255,0.06)",bm:"rgba(255,255,255,0.08)",r:"#E74C5A",rg:"rgba(231,76,90,0.08)",rb:"rgba(231,76,90,0.15)",g:"#23F7DD",gg:"rgba(35,247,221,0.07)",y:"#FFB302",yg:"rgba(255,179,2,0.08)",p:"#A78BFA",pg:"rgba(167,139,250,0.1)",w:"#6E6E88"};
const MO={fontFamily:"'Space Mono',monospace"};
const HD={fontFamily:"'Manrope',sans-serif"};

// ══════ DEMO DATA (fallback when no index.json) ══════
const DEMO_DATES=["2026-04-15","2026-04-14","2026-04-13"];
const DEMO_WEEKLY={period:"2026-04-09 ~ 04-15",kpis:[{label:"\u65B0\u589EL3",val:5,prev:2,unit:""},{label:"\u7ADE\u5BF9\u52A8\u4F5C",val:12,prev:8,unit:"\u6761"},{label:"\u4FE1\u53F7\u603B\u6570",val:213,prev:156,unit:"\u6761"},{label:"\u8FFD\u8E2A\u53D9\u4E8B",val:8,prev:6,unit:"\u4E2A"}],movers:[{name:"RAVE",from:"L1",to:"L3",heat:92,delta:"+62",type:"up"},{name:"ZEC",from:"L1",to:"L3",heat:88,delta:"+33",type:"up"},{name:"RWA",from:"L2",to:"L3",heat:85,delta:"+27",type:"up"},{name:"AI Agent",from:"L2",to:"L3",heat:76,delta:"+21",type:"up"},{name:"Hyperliquid",from:"L3",to:"L3",heat:71,delta:"+3",type:"stay"},{name:"DePIN",from:"L2",to:"L2",heat:45,delta:"+7",type:"stay"},{name:"Restaking",from:"L2",to:"L2",heat:42,delta:"-3",type:"down"}],events:[{date:"04-15",title:"RAVE\u7206\u53D16000%\uFF0CL3 Critical",color:"#E74C5A"},{date:"04-15",title:"ZEC SEC\u7ED3\u6848+ETF\u843D\u5730",color:"#E74C5A"},{date:"04-14",title:"BN\u4EE3\u5E01\u5316\u80A1\u7968",color:"#FFB302"},{date:"04-14",title:"ASI\u6574\u5408\u542F\u52A8",color:"#23F7DD"},{date:"04-13",title:"BN\u4E0A\u7EBFHYPE",color:"#FFB302"}]};
const DEMO_MONTHLY={period:"2026-03-16 ~ 04-15",kpis:[{label:"\u8FFD\u8E2A\u53D9\u4E8B",val:12,prev:8,unit:"\u4E2A"},{label:"\u7D2F\u8BA1L3\u9884\u8B66",val:9,prev:4,unit:"\u4E2A"},{label:"\u7ADE\u5BF9\u52A8\u4F5C",val:38,prev:22,unit:"\u6761"},{label:"\u4FE1\u53F7\u603B\u6570",val:1840,prev:1200,unit:"\u6761"}],hits:[],misses:[],lifecycle:[{name:"Hyperliquid",days:30,level:"L3",phase:"\u6210\u719F\u671F",heat:[30,35,42,48,55,58,62,68,71]},{name:"AI Agent",days:18,level:"L3",phase:"\u7206\u53D1\u671F",heat:[40,42,45,50,55,60,65,70,76]},{name:"RWA",days:30,level:"L3",phase:"\u7206\u53D1\u671F",heat:[20,22,25,28,35,40,52,58,85]}]};

const WK_DETAILS=[
  {title:"\u65B0\u589EL3 \u2014 5\u4E2A\u53D9\u4E8B\u5347\u7EA7",items:[{name:"RAVE",level:"L3",detail:"L1 \u2192 L3",heat:92},{name:"ZEC",level:"L3",detail:"L1 \u2192 L3",heat:88},{name:"RWA",level:"L3",detail:"L2 \u2192 L3",heat:85},{name:"AI Agent",level:"L3",detail:"L2 \u2192 L3",heat:76},{name:"Hyperliquid",level:"L3",detail:"\u7EF4\u6301 L3",heat:71}]},
  {title:"\u7ADE\u5BF9\u52A8\u4F5C \u2014 12\u6761\u660E\u7EC6",items:[{name:"Bybit \u4E0A\u7EBF RAVE \u73B0\u8D27",detail:"24h $8000\u4E07"},{name:"Bitget \u5F00\u653E RAVE \u5408\u7EA6",detail:"50x\u6760\u6746"},{name:"Coinbase \u4E0A\u67B6 ZEC",detail:"SEC\u7ED3\u6848\u540E"},{name:"BN \u4EE3\u5E01\u5316\u80A1\u7968",detail:"AAPL/TSLA/NVDA"}]},
  {title:"\u4FE1\u53F7\u603B\u6570 \u2014 213\u6761\u660E\u7EC6",items:[{name:"TG\u7FA4\u4FE1\u53F7",detail:"142\u6761"},{name:"KOL\u63D0\u53CA",detail:"38\u6761"},{name:"\u94FE\u4E0A\u5F02\u5E38",detail:"18\u6761"},{name:"\u65B0\u95FB/\u5A92\u4F53",detail:"15\u6761"}]},
  {title:"\u8FFD\u8E2A\u53D9\u4E8B \u2014 8\u4E2A\u660E\u7EC6",items:[{name:"RAVE",level:"L3",heat:92},{name:"ZEC",level:"L3",heat:88},{name:"RWA",level:"L3",heat:85},{name:"AI Agent",level:"L3",heat:76},{name:"Hyperliquid",level:"L3",heat:71}]}
];
const MO_DETAILS=[
  {title:"\u8FFD\u8E2A\u53D9\u4E8B \u2014 12\u4E2A\u660E\u7EC6",items:[{name:"Hyperliquid",level:"L3",detail:"30\u5929",heat:71},{name:"AI Agent",level:"L3",detail:"18\u5929",heat:76},{name:"RWA",level:"L3",detail:"30\u5929",heat:85}]},
  {title:"\u7D2F\u8BA1L3\u9884\u8B66 \u2014 9\u4E2A\u660E\u7EC6",items:[{name:"RAVE",level:"L3",detail:"04-15 \u5347\u7EA7",heat:92},{name:"ZEC",level:"L3",detail:"04-15 \u5347\u7EA7",heat:88},{name:"RWA",level:"L3",detail:"04-14 \u5347\u7EA7",heat:85}]},
  {title:"\u7ADE\u5BF9\u52A8\u4F5C \u2014 38\u6761\u660E\u7EC6",items:[{name:"Binance",detail:"14\u6761\u52A8\u4F5C"},{name:"Bybit",detail:"9\u6761\u52A8\u4F5C"},{name:"Bitget",detail:"7\u6761\u52A8\u4F5C"}]},
  {title:"\u4FE1\u53F7\u603B\u6570 \u2014 1840\u6761\u660E\u7EC6",items:[{name:"TG\u7FA4\u4FE1\u53F7",detail:"980\u6761"},{name:"KOL\u63D0\u53CA",detail:"420\u6761"}]}
];

// ══════ COMPONENTS ══════
const Tag=({children,color=C.t4,bg="rgba(255,255,255,0.04)"})=> <span style={{display:"inline-block",padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:600,color,background:bg,letterSpacing:"0.02em",whiteSpace:"nowrap"}}>{children}</span>;
const HeatBar=({value,color})=> <div style={{width:"100%",height:3,borderRadius:2,background:"rgba(255,255,255,0.05)",overflow:"hidden"}}><div style={{width:value+"%",height:"100%",borderRadius:2,background:color,boxShadow:"0 0 8px "+color+"44"}}/></div>;
const UB=({level})=>{const m={critical:{l:"CRITICAL",c:"#fff",bg:C.r},high:{l:"HIGH",c:C.r,bg:C.rg},medium:{l:"MEDIUM",c:C.g,bg:C.gg}};const s=m[level]||m.medium;return (<span style={{display:"inline-block",padding:"2px 8px",borderRadius:4,fontSize:9,fontWeight:700,letterSpacing:"0.08em",color:s.c,background:s.bg,textTransform:"uppercase"}}>{s.l}</span>)};
const Glass=({children,style={},onClick})=> <div onClick={onClick} style={{background:"rgba(20,25,35,0.7)",backdropFilter:"blur(12px)",border:"1px solid "+C.bm,borderRadius:12,padding:20,position:"relative",overflow:"hidden",cursor:onClick?"pointer":"default",transition:"all 0.2s",...style}}><div style={{position:"relative",zIndex:1}}>{children}</div></div>;
const Spark=({data,color=C.ac,w=60,h=20})=>{if(!data||data.length<2)return null;const mx=Math.max(...data)||1;const pts=data.map((v,i)=>[i/(data.length-1)*w,h-v/mx*h]);return (<svg width={w} height={h} style={{display:"block"}}><path d={"M"+pts.map(p=>p[0]+","+p[1]).join("L")} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>)};
const MiniBar=({data,w=100,h=20})=>{const mx=Math.max(...data)||1;const bw=Math.max(2,Math.floor(w/data.length)-1);return (<div style={{display:"flex",alignItems:"flex-end",gap:1,height:h}}>{data.map((v,i)=> <div key={i} style={{width:bw,borderRadius:"1px 1px 0 0",height:Math.max(2,Math.round(v/mx*h)),background:v>=70?C.r:v>=50?C.ac:"rgba(255,255,255,0.15)",opacity:0.7}}/>)}</div>)};
const LvlTag=({level})=>{const c=level==="L3"?C.r:level==="L2"?C.g:C.t4;const bg=level==="L3"?C.rg:level==="L2"?C.gg:"rgba(255,255,255,0.04)";return <span style={{fontSize:10,fontWeight:700,color:c,background:bg,padding:"2px 6px",borderRadius:4}}>{level}</span>};
const BackBtn=({onClick,label})=> <button onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:600,color:C.t3,cursor:"pointer",padding:"6px 12px",borderRadius:6,border:"1px solid "+C.bm,background:"none",marginBottom:20,fontFamily:"'DM Sans'"}}>{"\u2190"} {label}</button>;
const Loading=()=> <div style={{textAlign:"center",padding:60,color:C.t3,fontSize:13}}>{"\u52A0\u8F7D\u4E2D..."}</div>;

const KpiCard=({label,val,prev,unit,onClick})=>{const d=val-prev;const pct=prev?Math.round(Math.abs(d)/prev*100):0;const up=d>0;return (<div onClick={onClick} style={{background:"rgba(20,25,35,0.7)",backdropFilter:"blur(12px)",border:"1px solid "+C.bm,borderRadius:12,padding:"20px 16px",textAlign:"center",cursor:"pointer",transition:"all 0.2s",position:"relative"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.bm;e.currentTarget.style.transform="none"}}>
  <div style={{...MO,fontSize:28,fontWeight:700,color:C.t1,marginBottom:4}}>{val}{unit&&<span style={{fontSize:14,color:C.t3}}>{unit}</span>}</div>
  <div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>{label}</div>
  <div style={{fontSize:11,fontWeight:600,color:up?C.g:C.r}}>{up?"\u2191":"\u2193"} {pct}%</div>
  <div style={{position:"absolute",top:8,right:10,fontSize:10,color:C.t4}}>{"\u2192"}</div>
</div>)};

// ══════ KPI DETAIL PAGE ══════
const KpiDetailPage=({data,onBack,backLabel})=> (<div>
  <BackBtn onClick={onBack} label={backLabel}/>
  <h2 style={{...HD,fontSize:22,fontWeight:800,color:C.t1,margin:"0 0 20px"}}>{data.title}</h2>
  <Glass style={{padding:0}}>
    {data.items.map((it,i)=> (<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 20px",borderBottom:i<data.items.length-1?"1px solid "+C.bd:"none"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {it.level&&<LvlTag level={it.level}/>}
        <span style={{fontSize:14,fontWeight:600,color:C.t1}}>{it.name}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {it.detail&&<span style={{fontSize:12,color:C.t3}}>{it.detail}</span>}
        {it.heat!==undefined&&<span style={{...MO,fontSize:12,fontWeight:700,color:it.heat>=70?C.r:it.heat>=50?C.g:C.t3}}>Heat {it.heat}</span>}
      </div>
    </div>))}
  </Glass>
</div>);

// ══════ L3/L2 CARDS ══════
const L3Card=({item})=>{const[o,setO]=useState(false);return (<Glass onClick={()=>setO(!o)} style={{borderColor:item.urg==="critical"?C.rb:C.bm,cursor:"pointer"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><UB level={item.urg}/><span style={{...MO,fontSize:11,color:C.r,fontWeight:700}}>Heat {item.heat}</span></div><h3 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{item.name}</h3></div><div style={{...MO,width:44,height:44,borderRadius:10,background:"linear-gradient(135deg,"+C.rg+",transparent)",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid "+C.rb,fontSize:15,fontWeight:700,color:C.r,flexShrink:0}}>{item.heat}</div></div><HeatBar value={item.heat} color={C.r}/><p style={{fontSize:13,color:C.t2,lineHeight:1.6,margin:"10px 0"}}>{item.desc}</p><div style={{background:C.rg,borderRadius:8,padding:"8px 12px",marginBottom:10,border:"1px solid rgba(231,76,90,0.1)"}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginBottom:2}}>{"\u5EFA\u8BAE\u884C\u52A8"}</div><div style={{fontSize:12,fontWeight:600,color:C.r,lineHeight:1.5}}>{item.act}</div></div>{o&&<div>{item.comp?.length>0&&<div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginBottom:4}}>{"\u7ADE\u5BF9"}</div>{item.comp.map((a,i)=> <div key={i} style={{fontSize:12,color:C.t2,padding:"2px 0 2px 10px",borderLeft:"2px solid "+C.rb}}>{a}</div>)}</div>}{item.gap?.length>0&&<div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginBottom:4}}>OKX{"\u7F3A\u53E3"}</div>{item.gap.map((g,i)=> <div key={i} style={{fontSize:12,color:C.r,padding:"2px 0 2px 10px",borderLeft:"2px solid "+C.rb}}>{g}</div>)}</div>}<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{item.tks?.map((t,i)=> <Tag key={i} color={C.ac} bg={C.acd}>${t}</Tag>)}{item.sig?.map((s,i)=> <Tag key={"s"+i}>{s}</Tag>)}</div></div>}{!o&&<div style={{display:"flex",gap:4}}>{item.tks?.slice(0,4).map((t,i)=> <Tag key={i} color={C.ac} bg={C.acd}>${t}</Tag>)}</div>}</Glass>)};
const L2Card=({item})=> <Glass><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><h3 style={{...HD,fontSize:14,fontWeight:700,color:C.t1,margin:0}}>{item.name}</h3><span style={{...MO,fontSize:12,fontWeight:700,color:C.g}}>Heat {item.heat}</span></div><HeatBar value={item.heat} color={C.g}/><p style={{fontSize:12,color:C.t3,lineHeight:1.5,margin:"8px 0 6px"}}>{item.desc}</p><div style={{display:"flex",gap:4}}>{item.tks?.map((t,i)=> <Tag key={i} color={C.ac} bg={C.acd}>${t}</Tag>)}</div></Glass>;

// ══════ PAGE: DAILY ══════
const PageDaily=({D})=>{
  if(!D) return <Loading/>;
  return <div>
  <div style={{marginBottom:28}}><Glass style={{borderLeft:"3px solid "+C.ac}}><div style={{display:"flex",alignItems:"flex-start",gap:16}}><div style={{flex:1}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>{"\u5E02\u573A\u6982\u8981"}</div><p style={{fontSize:14,color:C.t2,lineHeight:1.7,margin:0}}>{D.summary}</p></div><div style={{display:"flex",gap:6,flexWrap:"wrap",flexShrink:0,maxWidth:180}}>{(D.topTk||[]).map(t=> <Tag key={t} color={C.ac} bg={C.acd}>${t}</Tag>)}</div></div></Glass></div>
  {D.L3?.length>0&&<section style={{marginBottom:36}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:18}}>{"\uD83D\uDD34"}</span><h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{"\u91CD\u70B9\u5173\u6CE8"}</h2><span style={{...MO,fontSize:12,fontWeight:700,color:C.r,background:C.rg,padding:"2px 8px",borderRadius:4}}>{D.L3.length}</span></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{D.L3.map((item,i)=> <L3Card key={i} item={item}/>)}</div></section>}
  {D.comp?.length>0&&<section style={{marginBottom:36}}><Glass style={{borderColor:"rgba(231,76,90,0.1)"}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>{"\u7ADE\u5BF9\u52A8\u6001"}</div>{D.comp.map((c,i)=> <div key={i} style={{display:"grid",gridTemplateColumns:"200px 1fr",padding:"8px 0",borderBottom:"1px solid "+C.bd,fontSize:12}}><div style={{fontWeight:600,color:C.t1}}>{c.what}</div><div style={{color:C.t3}}>{c.detail}</div></div>)}</Glass></section>}
  {D.L2?.length>0&&<section style={{marginBottom:36}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:18}}>{"\uD83D\uDFE2"}</span><h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{"\u6D3B\u8DC3\u8BA8\u8BBA"}</h2><span style={{...MO,fontSize:12,fontWeight:700,color:C.g,background:C.gg,padding:"2px 8px",borderRadius:4}}>{D.L2.length}</span></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{D.L2.map((item,i)=> <L2Card key={i} item={item}/>)}</div></section>}
  {D.kols?.length>0&&<section style={{marginBottom:36}}><Glass><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>KOL</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>{D.kols.map((k,i)=> <div key={i} style={{padding:"6px 0",borderBottom:"1px solid "+C.bd,display:"flex",gap:8}}><span style={{fontSize:12}}>{k.s==="up"?"\uD83D\uDFE2":k.s==="dn"?"\uD83D\uDD34":"\u26AA"}</span><div><span style={{fontSize:12,fontWeight:700,color:C.t1}}>{k.n}</span><span style={{fontSize:12,color:C.t3,marginLeft:6}}>{k.v}</span></div></div>)}</div></Glass></section>}
  {D.L1?.length>0&&<section style={{marginBottom:36}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:18}}>{"\u26AA"}</span><h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{"\u5019\u8865\u6C60"}</h2></div><Glass style={{padding:0}}>{D.L1.map((it,i)=> <div key={i} style={{padding:"12px 20px",borderBottom:i<D.L1.length-1?"1px solid "+C.bd:"none",display:"grid",gridTemplateColumns:"160px 1fr 120px",gap:12,alignItems:"center"}}><div style={{fontSize:13,fontWeight:600,color:C.t2}}>{it.name}</div><div style={{fontSize:12,color:C.t3}}>{it.desc}</div><div style={{display:"flex",gap:4,justifyContent:"flex-end"}}>{(it.sig||[]).map((s,j)=> <Tag key={j} color={C.t4} bg="rgba(255,255,255,0.03)">{s}</Tag>)}</div></div>)}</Glass></section>}
</div>};

// ══════ PAGE: WEEKLY ══════
const PageWeekly=({data,onKpi})=> <div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:32}}>{data.kpis.map((k,i)=> <KpiCard key={i} {...k} onClick={()=>onKpi(i)}/>)}</div>
  <section style={{marginBottom:32}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:16}}>{"\uD83D\uDD04"}</span><h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{"\u53D9\u4E8B\u7B49\u7EA7\u53D8\u52A8"}</h2></div><Glass style={{padding:0}}><div style={{display:"grid",gridTemplateColumns:"1.5fr 0.7fr 0.4fr 0.8fr 0.5fr",gap:8,padding:"10px 20px",borderBottom:"1px solid "+C.bm,fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em"}}><div>{"\u53D9\u4E8B"}</div><div>{"\u53D8\u52A8"}</div><div>Heat</div><div>{"\u8D8B\u52BF"}</div><div>Delta</div></div>{(data.movers||[]).map((m,i)=>{const arrow=m.type==="up"?"\u2191":m.type==="down"?"\u2193":"\u2192";const ac2=m.type==="up"?C.g:m.type==="down"?C.r:C.t4;const hc=m.heat>=70?C.r:m.heat>=50?C.g:C.t3;return (<div key={i} style={{display:"grid",gridTemplateColumns:"1.5fr 0.7fr 0.4fr 0.8fr 0.5fr",gap:8,padding:"10px 20px",borderBottom:i<data.movers.length-1?"1px solid "+C.bd:"none",alignItems:"center",fontSize:13}}><div style={{fontWeight:600,color:C.t1}}>{m.name}</div><div><span style={{...MO,fontSize:11,color:C.t3}}>{m.from}</span><span style={{color:ac2,margin:"0 4px"}}>{arrow}</span><span style={{...MO,fontSize:11,fontWeight:700,color:ac2}}>{m.to}</span></div><div style={{...MO,fontWeight:700,color:hc}}>{m.heat}</div><div><HeatBar value={m.heat} color={hc}/></div><div style={{...MO,fontSize:12,fontWeight:700,color:m.type==="down"?C.r:C.g}}>{m.delta}</div></div>)})}</Glass></section>
  <section style={{marginBottom:32}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:16}}>{"\uD83D\uDDD3"}</span><h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{"\u672C\u5468\u4E8B\u4EF6"}</h2></div><Glass>{(data.events||[]).map((ev,i)=> <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"10px 0",borderBottom:i<data.events.length-1?"1px solid "+C.bd:"none"}}><div style={{width:8,height:8,borderRadius:"50%",background:ev.color,marginTop:4,flexShrink:0}}/><div style={{...MO,fontSize:11,color:C.t4,width:48,flexShrink:0}}>{ev.date}</div><div style={{fontSize:13,color:C.t1,fontWeight:500}}>{ev.title}</div></div>)}</Glass></section>
</div>;

// ══════ PAGE: MONTHLY ══════
const PageMonthly=({data,onKpi})=> <div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:32}}>{data.kpis.map((k,i)=> <KpiCard key={i} {...k} onClick={()=>onKpi(i)}/>)}</div>
  {(data.hits?.length>0||data.misses?.length>0)&&<section style={{marginBottom:32}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><div><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><span style={{fontSize:16}}>{"\u2705"}</span><h2 style={{...HD,fontSize:16,fontWeight:800,color:C.g,margin:0}}>{"\u547D\u4E2D"} ({(data.hits||[]).length})</h2></div>{(data.hits||[]).map((h,i)=> <Glass key={i} style={{marginBottom:8,borderColor:"rgba(35,247,221,0.12)"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{...HD,fontSize:14,fontWeight:700,color:C.t1}}>{h.name}</span><span style={{...MO,fontSize:11,fontWeight:700,color:C.g}}>Heat {h.heat}</span></div><p style={{fontSize:12,color:C.t3,margin:0,lineHeight:1.5}}>{h.desc}</p></Glass>)}</div><div><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><span style={{fontSize:16}}>{"\u274C"}</span><h2 style={{...HD,fontSize:16,fontWeight:800,color:C.r,margin:0}}>{"\u9519\u8FC7"} ({(data.misses||[]).length})</h2></div>{(data.misses||[]).map((m,i)=> <Glass key={i} style={{marginBottom:8,borderColor:C.rb}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{...HD,fontSize:14,fontWeight:700,color:C.t1}}>{m.name}</span><span style={{...MO,fontSize:11,fontWeight:700,color:C.r}}>Heat {m.heat}</span></div><p style={{fontSize:12,color:C.t3,margin:0,lineHeight:1.5}}>{m.desc}</p></Glass>)}</div></div></section>}
  {data.lifecycle?.length>0&&<section style={{marginBottom:32}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:16}}>{"\uD83C\uDF00"}</span><h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{"\u53D9\u4E8B\u751F\u547D\u5468\u671F"}</h2></div><Glass style={{padding:0}}><div style={{display:"grid",gridTemplateColumns:"1.2fr 0.5fr 0.4fr 0.5fr 1fr",gap:8,padding:"10px 20px",borderBottom:"1px solid "+C.bm,fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em"}}><div>{"\u53D9\u4E8B"}</div><div>{"\u8FFD\u8E2A"}</div><div>{"\u7B49\u7EA7"}</div><div>{"\u9636\u6BB5"}</div><div>{"\u8D8B\u52BF"}</div></div>{data.lifecycle.map((lc,i)=> (<div key={i} style={{display:"grid",gridTemplateColumns:"1.2fr 0.5fr 0.4fr 0.5fr 1fr",gap:8,padding:"12px 20px",borderBottom:i<data.lifecycle.length-1?"1px solid "+C.bd:"none",alignItems:"center"}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{lc.name}</div><div style={{...MO,fontSize:12,color:C.t2}}>{lc.days}{"\u5929"}</div><div><LvlTag level={lc.level}/></div><div style={{fontSize:12,color:C.t3}}>{lc.phase}</div><div><MiniBar data={lc.heat} w={100} h={20}/></div></div>))}</Glass></section>}
</div>;

// ══════ PAGE: WATCHLIST (auto-generated from index.json) ══════
const PageWL=({dailyIndex,dates})=>{
  // 从 daily 摘要自动生成 watchlist
  const items = [];
  const seen = {};
  const sortedDates = [...dates].sort();

  for(const d of dates){
    const ds = dailyIndex[d];
    if(!ds) continue;
    for(const item of [...(ds.l3||[]),...(ds.l2||[])]){
      const name = item.name;
      if(!seen[name]){
        seen[name] = {name, level:"L1", heat:0, heats:{}, firstDate:d};
      }
      seen[name].heats[d] = item.heat||0;
      seen[name].heat = item.heat||seen[name].heat;
      if(ds.l3?.some(x=>x.name===name)) seen[name].level="L3";
      else if(seen[name].level!=="L3" && ds.l2?.some(x=>x.name===name)) seen[name].level="L2";
    }
  }

  for(const [name,info] of Object.entries(seen)){
    const trend = sortedDates.slice(-9).map(d=>info.heats[d]||0);
    while(trend.length<2) trend.unshift(0);
    const days = Math.max(1, Math.round((new Date(dates[0])-new Date(info.firstDate))/(86400000))+1);
    items.push({name, level:info.level, heat:info.heat, trend, days});
  }
  items.sort((a,b)=>b.heat-a.heat);

  if(items.length===0) return <div style={{textAlign:"center",padding:60,color:C.t3}}>{"\u6682\u65E0\u8FFD\u8E2A\u6570\u636E"}</div>;

  return <div>
    <div style={{marginBottom:24}}>
      <h2 style={{...HD,fontSize:22,fontWeight:800,color:C.t1,marginBottom:4}}>{"\u957F\u671F\u8FFD\u8E2A"}</h2>
      <p style={{fontSize:13,color:C.t3,margin:0}}>{"\u57FA\u4E8E\u6BCF\u65E5 L3/L2 \u6570\u636E\u81EA\u52A8\u751F\u6210"}</p>
    </div>
    {items.map((w,i)=>{const hc=w.heat>=70?C.r:w.heat>=50?C.g:C.t3;return (<div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0",borderBottom:"1px solid "+C.bd}}>
      <div style={{display:"flex",alignItems:"center",gap:14,flex:1}}>
        <LvlTag level={w.level}/>
        <div>
          <div style={{fontSize:15,fontWeight:700,color:C.t1}}>{w.name}</div>
          <div style={{fontSize:11,color:C.t3,marginTop:2}}>{w.days}{"\u5929"}</div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:16}}>
        <Spark data={w.trend} color={hc} w={50} h={18}/>
        <div style={{...MO,fontSize:14,fontWeight:700,color:hc,width:50,textAlign:"right"}}>{w.heat}</div>
      </div>
    </div>)})}
  </div>;
};

// ══════ SELECT STYLE ══════
const SEL={...MO,fontSize:12,color:C.t1,fontWeight:700,padding:"5px 28px 5px 10px",background:"rgba(255,255,255,0.04)",border:"1px solid "+C.bm,borderRadius:6,cursor:"pointer",appearance:"none",WebkitAppearance:"none",backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='10' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236E6E88' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")",backgroundRepeat:"no-repeat",backgroundPosition:"right 8px center",outline:"none"};

// ══════ APP ══════
export default function App(){
  const[tab,setTab]=useState("daily");
  const[dateIdx,setDateIdx]=useState(0);
  const[kpiIdx,setKpiIdx]=useState(null);
  const[kpiSrc,setKpiSrc]=useState(null);

  // index.json data
  const[index,setIndex]=useState(null);
  // Cache of loaded day data: { "2026-04-16": {...} }
  const[dayCache,setDayCache]=useState({});
  const[loadingDay,setLoadingDay]=useState(false);

  // Load index.json on startup
  useEffect(()=>{
    fetch("/index.json").then(r=>r.ok?r.json():null).then(d=>{if(d)setIndex(d)}).catch(()=>{});
  },[]);

  // Derived data
  const dates = index?.dates || DEMO_DATES;
  const weekly = index?.weekly || DEMO_WEEKLY;
  const monthly = index?.monthly || DEMO_MONTHLY;
  const dailyIndex = index?.daily || {};
  const wkDetails = WK_DETAILS;
  const moDetails = MO_DETAILS;

  // Load day data when date changes
  const currentDate = dates[dateIdx] || dates[0];
  useEffect(()=>{
    if(!currentDate) return;
    if(dayCache[currentDate]) return;
    setLoadingDay(true);
    fetch(`/days/${currentDate}.json`)
      .then(r=>r.ok?r.json():null)
      .then(d=>{
        if(d) setDayCache(prev=>({...prev,[currentDate]:d}));
        setLoadingDay(false);
      })
      .catch(()=>setLoadingDay(false));
  },[currentDate]);

  const D = dayCache[currentDate] || null;

  const periods=[{k:"daily",l:"Daily"},{k:"weekly",l:"Weekly"},{k:"monthly",l:"Monthly"}];
  const showKpiDetail=kpiIdx!==null&&kpiSrc;
  const kpiData=showKpiDetail?(kpiSrc==="wk"?wkDetails[kpiIdx]:moDetails[kpiIdx]):null;

  return (<div style={{background:C.bg,color:C.t1,fontFamily:"'DM Sans',sans-serif",minHeight:"100vh",fontVariantNumeric:"tabular-nums"}}>
    <nav style={{position:"sticky",top:0,zIndex:50,background:"rgba(17,22,32,0.92)",backdropFilter:"blur(16px)",borderBottom:"1px solid "+C.bd}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"0 32px",display:"flex",justifyContent:"space-between",alignItems:"center",height:48}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:22,height:22,borderRadius:5,background:C.ac,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:C.bg}}>a</div><span style={{...HD,fontSize:14,fontWeight:800,color:C.t1,letterSpacing:"-0.03em"}}>Listing Alpha</span></div>
          <div style={{display:"flex",gap:1,background:"rgba(255,255,255,0.03)",borderRadius:6,padding:2}}>{periods.map(p=> <button key={p.k} onClick={()=>{setTab(p.k);setKpiIdx(null);setKpiSrc(null)}} style={{padding:"4px 14px",borderRadius:4,fontSize:12,fontWeight:600,color:tab===p.k&&!showKpiDetail?C.t1:C.t4,background:tab===p.k&&!showKpiDetail?"rgba(255,255,255,0.07)":"none",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.15s"}}>{p.l}</button>)}</div>
          <button onClick={()=>{setTab("wl");setKpiIdx(null);setKpiSrc(null)}} style={{padding:"4px 14px",borderRadius:4,fontSize:12,fontWeight:600,color:tab==="wl"?C.t1:C.t4,background:tab==="wl"?"rgba(255,255,255,0.07)":"none",border:"1px solid "+(tab==="wl"?C.bm:"transparent"),cursor:"pointer",fontFamily:"'DM Sans'"}}>Watchlist</button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          {tab==="daily"&&!showKpiDetail&&<select value={dateIdx} onChange={e=>setDateIdx(Number(e.target.value))} style={SEL}>{dates.map((d,i)=> <option key={i} value={i} style={{background:C.bg2}}>{d}</option>)}</select>}
          {tab==="weekly"&&!showKpiDetail&&<div style={{...MO,fontSize:12,color:C.t3}}>{weekly.period}</div>}
          {tab==="monthly"&&!showKpiDetail&&<div style={{...MO,fontSize:12,color:C.t3}}>{monthly.period}</div>}
        </div>
      </div>
    </nav>
    <div style={{maxWidth:1400,margin:"0 auto",padding:"24px 32px 60px"}}>
      {showKpiDetail&&kpiData&&<KpiDetailPage data={kpiData} onBack={()=>{setKpiIdx(null);setKpiSrc(null)}} backLabel={kpiSrc==="wk"?"Weekly":"Monthly"}/>}
      {!showKpiDetail&&tab==="daily"&&(loadingDay&&!D?<Loading/>:<PageDaily D={D}/>)}
      {!showKpiDetail&&tab==="weekly"&&<PageWeekly data={weekly} onKpi={i=>{setKpiIdx(i);setKpiSrc("wk");window.scrollTo(0,0)}}/>}
      {!showKpiDetail&&tab==="monthly"&&<PageMonthly data={monthly} onKpi={i=>{setKpiIdx(i);setKpiSrc("mo");window.scrollTo(0,0)}}/>}
      {!showKpiDetail&&tab==="wl"&&<PageWL dailyIndex={dailyIndex} dates={dates}/>}
    </div>
  </div>)
}
