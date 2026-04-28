import { useState, useEffect } from "react";

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

// ══════ Pagination helper ══════
const Paginator=({page,setPage,total,pageSize})=>{const pages=Math.max(1,Math.ceil(total/pageSize));if(pages<=1)return null;return (<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"12px 0"}}>
  <button onClick={()=>setPage(Math.max(0,page-1))} disabled={page===0} style={{padding:"4px 10px",fontSize:12,color:page===0?C.t4:C.t2,background:"rgba(255,255,255,0.04)",border:"1px solid "+C.bm,borderRadius:4,cursor:page===0?"not-allowed":"pointer",fontFamily:"'DM Sans'"}}>{"\u2190 Prev"}</button>
  <span style={{...MO,fontSize:11,color:C.t3}}>{page+1} / {pages}</span>
  <button onClick={()=>setPage(Math.min(pages-1,page+1))} disabled={page>=pages-1} style={{padding:"4px 10px",fontSize:12,color:page>=pages-1?C.t4:C.t2,background:"rgba(255,255,255,0.04)",border:"1px solid "+C.bm,borderRadius:4,cursor:page>=pages-1?"not-allowed":"pointer",fontFamily:"'DM Sans'"}}>{"Next \u2192"}</button>
</div>)};

// ══════ Period navigator for weekly/monthly tab (prev/next period) ══════
const PeriodNav=({idx,setIdx,total,label})=>{const canPrev=idx<total-1;const canNext=idx>0;const btn={padding:"3px 8px",fontSize:11,fontWeight:600,color:C.t2,background:"rgba(255,255,255,0.04)",border:"1px solid "+C.bm,borderRadius:4,cursor:"pointer",fontFamily:"'DM Sans'"};const btnOff={...btn,color:C.t4,cursor:"not-allowed",opacity:0.5};return (<div style={{display:"flex",alignItems:"center",gap:6}}>
  <button disabled={!canPrev} onClick={()=>canPrev&&setIdx(idx+1)} style={canPrev?btn:btnOff} title={"\u4E0A\u4E00\u5468\u671F"}>{"\u2190"}</button>
  <div style={{...MO,fontSize:12,color:C.t3,minWidth:160,textAlign:"center"}}>{label}{total>1&&<span style={{color:C.t4,marginLeft:6}}>({idx+1}/{total})</span>}</div>
  <button disabled={!canNext} onClick={()=>canNext&&setIdx(idx-1)} style={canNext?btn:btnOff} title={"\u4E0B\u4E00\u5468\u671F"}>{"\u2192"}</button>
</div>)};

// ══════ PAGE: WEEKLY ══════
const PageWeekly=({data,onKpi})=>{
  const[moverPage,setMoverPage]=useState(0);
  const[evtPage,setEvtPage]=useState(0);
  const MPS=12, EPS=15;
  const movers=data.movers||[];
  const events=data.events||[];
  const moverSlice=movers.slice(moverPage*MPS,(moverPage+1)*MPS);
  const evtSlice=events.slice(evtPage*EPS,(evtPage+1)*EPS);
  return <div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:32}}>{data.kpis.map((k,i)=> <KpiCard key={i} {...k} onClick={()=>onKpi(i)}/>)}</div>
  <section style={{marginBottom:32}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:16}}>{"\uD83D\uDD04"}</span><h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{"\u53D9\u4E8B\u7B49\u7EA7\u53D8\u52A8"}</h2><span style={{...MO,fontSize:11,color:C.t4}}>{movers.length} {"\u4E2A\u7C07"}</span></div><Glass style={{padding:0}}><div style={{display:"grid",gridTemplateColumns:"1.5fr 0.7fr 0.4fr 0.8fr 0.5fr",gap:8,padding:"10px 20px",borderBottom:"1px solid "+C.bm,fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em"}}><div>{"\u53D9\u4E8B"}</div><div>{"\u53D8\u52A8"}</div><div>Heat</div><div>{"\u8D8B\u52BF"}</div><div>Delta</div></div>{moverSlice.map((m,i)=>{const arrow=m.type==="up"?"\u2191":m.type==="down"?"\u2193":"\u2192";const ac2=m.type==="up"?C.g:m.type==="down"?C.r:C.t4;const hc=m.heat>=70?C.r:m.heat>=50?C.g:C.t3;return (<div key={i} style={{display:"grid",gridTemplateColumns:"1.5fr 0.7fr 0.4fr 0.8fr 0.5fr",gap:8,padding:"10px 20px",borderBottom:i<moverSlice.length-1?"1px solid "+C.bd:"none",alignItems:"center",fontSize:13}}>
    <div style={{minWidth:0}}>
      <div style={{fontWeight:600,color:C.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.name}</div>
      <div style={{fontSize:10,color:C.t4,marginTop:2,display:"flex",gap:6}}>
        <span style={{...MO}}>{m.cluster}</span>
        {m.aliases?.length>0 && <span title={m.aliases.join("\n")}>{"+"}{m.aliases.length} {"\u522B\u540D"}</span>}
        {m.appearances>1 && <span>{m.appearances} {"\u6B21\u51FA\u73B0"}</span>}
      </div>
    </div>
    <div><span style={{...MO,fontSize:11,color:C.t3}}>{m.from}</span><span style={{color:ac2,margin:"0 4px"}}>{arrow}</span><span style={{...MO,fontSize:11,fontWeight:700,color:ac2}}>{m.to}</span></div>
    <div style={{...MO,fontWeight:700,color:hc}}>{m.heat}</div>
    <div><HeatBar value={m.heat} color={hc}/></div>
    <div style={{...MO,fontSize:12,fontWeight:700,color:m.type==="down"?C.r:C.g}}>{m.delta}</div>
  </div>)})}<Paginator page={moverPage} setPage={setMoverPage} total={movers.length} pageSize={MPS}/></Glass></section>
  <section style={{marginBottom:32}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:16}}>{"\uD83D\uDDD3"}</span><h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{"\u672C\u5468\u4E8B\u4EF6"}</h2><span style={{...MO,fontSize:11,color:C.t4}}>{events.length} {"\u6761"}</span></div><Glass>{evtSlice.map((ev,i)=> <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"10px 0",borderBottom:i<evtSlice.length-1?"1px solid "+C.bd:"none"}}><div style={{width:8,height:8,borderRadius:"50%",background:ev.color,marginTop:4,flexShrink:0}}/><div style={{...MO,fontSize:11,color:C.t4,width:48,flexShrink:0}}>{ev.date}</div><div style={{fontSize:13,color:C.t1,fontWeight:500}}>{ev.title}</div></div>)}<Paginator page={evtPage} setPage={setEvtPage} total={events.length} pageSize={EPS}/></Glass></section>
</div>};

// ══════ PAGE: MONTHLY ══════
const PageMonthly=({data,onKpi})=>{
  const[lcPage,setLcPage]=useState(0);
  const LPS=12;
  const lc=data.lifecycle||[];
  const lcSlice=lc.slice(lcPage*LPS,(lcPage+1)*LPS);
  return <div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:32}}>{data.kpis.map((k,i)=> <KpiCard key={i} {...k} onClick={()=>onKpi(i)}/>)}</div>
  {(data.hits?.length>0||data.misses?.length>0)&&<section style={{marginBottom:32}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><div><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><span style={{fontSize:16}}>{"\u2705"}</span><h2 style={{...HD,fontSize:16,fontWeight:800,color:C.g,margin:0}}>{"\u547D\u4E2D"} ({(data.hits||[]).length})</h2></div>{(data.hits||[]).map((h,i)=> <Glass key={i} style={{marginBottom:8,borderColor:"rgba(35,247,221,0.12)"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{...HD,fontSize:14,fontWeight:700,color:C.t1}}>{h.name}</span><span style={{...MO,fontSize:11,fontWeight:700,color:C.g}}>Heat {h.heat}</span></div><p style={{fontSize:12,color:C.t3,margin:0,lineHeight:1.5}}>{h.desc}</p></Glass>)}</div><div><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><span style={{fontSize:16}}>{"\u274C"}</span><h2 style={{...HD,fontSize:16,fontWeight:800,color:C.r,margin:0}}>{"\u9519\u8FC7"} ({(data.misses||[]).length})</h2></div>{(data.misses||[]).map((m,i)=> <Glass key={i} style={{marginBottom:8,borderColor:C.rb}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{...HD,fontSize:14,fontWeight:700,color:C.t1}}>{m.name}</span><span style={{...MO,fontSize:11,fontWeight:700,color:C.r}}>Heat {m.heat}</span></div><p style={{fontSize:12,color:C.t3,margin:0,lineHeight:1.5}}>{m.desc}</p></Glass>)}</div></div></section>}
  {lc.length>0&&<section style={{marginBottom:32}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:16}}>{"\uD83C\uDF00"}</span><h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{"\u53D9\u4E8B\u751F\u547D\u5468\u671F"}</h2><span style={{...MO,fontSize:11,color:C.t4}}>{lc.length} {"\u4E2A\u7C07"}</span></div><Glass style={{padding:0}}><div style={{display:"grid",gridTemplateColumns:"1.2fr 0.5fr 0.4fr 0.5fr 1fr",gap:8,padding:"10px 20px",borderBottom:"1px solid "+C.bm,fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em"}}><div>{"\u53D9\u4E8B"}</div><div>{"\u8FFD\u8E2A"}</div><div>{"\u7B49\u7EA7"}</div><div>{"\u9636\u6BB5"}</div><div>{"\u8D8B\u52BF"}</div></div>{lcSlice.map((x,i)=> (<div key={i} style={{display:"grid",gridTemplateColumns:"1.2fr 0.5fr 0.4fr 0.5fr 1fr",gap:8,padding:"12px 20px",borderBottom:i<lcSlice.length-1?"1px solid "+C.bd:"none",alignItems:"center"}}>
    <div style={{minWidth:0}}>
      <div style={{fontSize:14,fontWeight:600,color:C.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{x.name}</div>
      <div style={{fontSize:10,color:C.t4,marginTop:2,display:"flex",gap:6}}>
        <span style={{...MO}}>{x.cluster}</span>
        {x.aliases?.length>0 && <span title={x.aliases.join("\n")}>{"+"}{x.aliases.length} {"\u522B\u540D"}</span>}
      </div>
    </div>
    <div style={{...MO,fontSize:12,color:C.t2}}>{x.days}{"\u5929"}</div>
    <div><LvlTag level={x.level}/></div>
    <div style={{fontSize:12,color:C.t3}}>{x.phase}</div>
    <div><MiniBar data={x.heat} w={100} h={20}/></div>
  </div>))}<Paginator page={lcPage} setPage={setLcPage} total={lc.length} pageSize={LPS}/></Glass></section>}
</div>};

// ══════ Client-side cluster key (fallback when item.cluster missing) ══════
// Mirrors web_data.py::cluster_key for older data without cluster field.
const CK_STOPWORDS = new Set(["BTC","ETH","SOL","BNB","XRP","TRX","ADA","OKX","ETF","USDT","USDC","AI","CN","KOL","TG","CEX","DEX","TVL","OI","L1","L2","L3","US","UK","EU","HK","JP","USD","ATH","API","DAO","DPRK","RWA","CPO","KRW","BTCFI","DEFI","SPX","SPY","QQQ","CZ","SEC","IMF","YZI","M","B","T","NFT","P2P","OTC","LRT","LST","V3","V4"]);
const CK_BUCKETS = [
  ["stock_derivatives", ["股票衍生品","股票 swap","股票永续","stock swap","stock perp","股票/商品衍生品","商品衍生品"]],
  ["meme", ["meme 行情","meme 升温","memecoin","币安人生"]],
  ["etf_flow", ["etf 净流入","etf净流入","etf 连续","etf 流入"]],
  ["prediction_market", ["预测市场","polymarket","kalshi"]],
  ["ai_trading_tools", ["vibe coding","ai 交易工具","claude 写","codex 写"]],
  ["stablecoin_flow", ["稳定币巨鲸","稳定币供给","稳定币轮转","tether 铸造"]],
  ["defi_systemic", ["系统性风险","桥漏洞","黑客潮"]],
  ["geopolitics", ["美伊","伊朗","霍尔木兹","iran","hormuz"]],
  ["layerzero_risk", ["layerzero 桥","桥单签"]],
  ["regulation", ["监管格局","法案","禁令","合规"]],
  ["dprk_risk", ["朝鲜","dprk"]],
  ["cex_integration", ["kraken bitnomial","deutsche börse","sberbank"]],
  ["market_pullback", ["risk-off 反转","风险情绪反转"]],
  ["privacy_coins", ["隐私币","zcash","monero"]],
  ["market_risk_on", ["risk-on"]],
];
const CK_CAMEL = {"KelpDAO":"KELP","LayerZero":"LAYERZERO","BitMine":"BMNR","Hyperliquid":"HYPE","Aave":"AAVE","Fluid":"FLUID","Orca":"ORCA","ZachXBT":"ZACHXBT","Jupiter":"JUP","Ethena":"USDE","Sberbank":"SBERBANK","Reserve":"RESERVE"};
function clusterKey(name, tks){
  if(!name) return "misc";
  const low = name.toLowerCase();
  // primary tokens (uppercase A-Z / 0-9, 2-15 chars)
  const primary = [];
  const re = /\b[A-Z][A-Z0-9]{1,14}\b/g;
  let m; while((m=re.exec(name))){ if(!CK_STOPWORDS.has(m[0]) && !primary.includes(m[0])) primary.push(m[0]); }
  Object.entries(CK_CAMEL).forEach(([cc,canon])=>{ if(canon && name.includes(cc) && !primary.includes(canon)) primary.push(canon); });
  // head-match dominant buckets (first 12 chars)
  const head = low.slice(0,12);
  for(const [bk,kws] of CK_BUCKETS){ if(kws.some(k=>head.includes(k))) return bk; }
  if(primary.length) return primary[0];
  for(const [bk,kws] of CK_BUCKETS){ if(kws.some(k=>low.includes(k))) return bk; }
  if(tks){ for(const t of tks){ const n=String(t).toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,15); if(n && !CK_STOPWORDS.has(n)) return n; } }
  return low.replace(/[^\w\u4e00-\u9fa5]+/g,"").slice(0,24) || "misc";
}

// ══════ Build watchlist from daily index (cluster-deduped) ══════
function buildWatchlist(dailyIndex, dates){
  const seen = {};
  const sortedDates = [...dates].sort();
  for(const d of dates){
    const ds = dailyIndex[d];
    if(!ds) continue;
    for(const item of [...(ds.l3||[]),...(ds.l2||[]),...(ds.l1||[])]){
      const ck = item.cluster || clusterKey(item.name, item.tks||[]);
      const lvl = (ds.l3||[]).some(x=>(x.cluster||clusterKey(x.name,x.tks||[]))===ck) ? "L3"
               : (ds.l2||[]).some(x=>(x.cluster||clusterKey(x.name,x.tks||[]))===ck) ? "L2" : "L1";
      if(!seen[ck]){
        seen[ck] = {cluster:ck, name:item.name, names:new Set([item.name]), level:"L1", heat:0, heats:{}, firstDate:d, lastDate:d, descs:{}, tks:new Set(), acts:{}, urgs:{}};
      }
      const info = seen[ck];
      info.names.add(item.name);
      info.heats[d] = Math.max(info.heats[d]||0, item.heat||0);
      if((item.heat||0) >= info.heat){ info.heat = item.heat||info.heat; info.name = item.name; }
      if(item.desc) info.descs[d] = item.desc;
      if(item.act) info.acts[d] = item.act;
      if(item.urg) info.urgs[d] = item.urg;
      (item.tks||[]).forEach(t=>info.tks.add(t));
      if(d >= info.lastDate){ info.lastDate = d; }
      if(d < info.firstDate) info.firstDate = d;
      // 升级等级：L3 > L2 > L1
      const order = {L1:1,L2:2,L3:3};
      if((order[lvl]||1) > (order[info.level]||1)) info.level = lvl;
    }
  }
  const items = [];
  for(const [ck,info] of Object.entries(seen)){
    const trend = sortedDates.slice(-9).map(d=>info.heats[d]||0);
    while(trend.length<2) trend.unshift(0);
    const days = Math.max(1, Math.round((new Date(dates[0])-new Date(info.firstDate))/(86400000))+1);
    const events = [];
    for(const d of [...dates].reverse()){
      if(info.heats[d]){
        const urg = info.urgs[d];
        const etype = urg==="critical"?"critical":urg==="high"?"comp":"data";
        events.push({date:d.slice(5), type:etype, title:info.acts[d]||info.descs[d]||info.name, desc:info.descs[d]||""});
      }
    }
    items.push({
      id:ck.toLowerCase().replace(/[^a-z0-9]/g,"-").slice(0,24) || ck,
      cluster:ck,
      name:info.name,
      aliases:[...info.names].filter(n=>n!==info.name),
      level:info.level, heat:info.heat, trend, days,
      tokens:[...info.tks].slice(0,5),
      events:events.slice(-8),
      lastEvt:events.length?events[events.length-1].title:"",
    });
  }
  // Filter out clusters that never had any heat (pure-L1 noise from minimal daily entries).
  // Old schema had heat on every L1; new schema strips L1 to {name, cluster}.
  const meaningful = items.filter(x => x.level !== "L1" || x.heat > 0 || x.events.length > 0);
  meaningful.sort((a,b)=>b.heat-a.heat);
  return meaningful;
}

// ══════ Date helpers (ISO week / month) ══════
function isoWeekId(dateStr){
  const d = new Date(dateStr+"T00:00:00Z");
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  const wk = Math.ceil((((d - yearStart)/86400000) + 1) / 7);
  return d.getUTCFullYear()+"-W"+String(wk).padStart(2,"0");
}
function monthId(dateStr){ return dateStr.slice(0,7); }
function prevWeekId(weekId){
  const [y,w] = weekId.split("-W").map(Number);
  // ISO Jan 4 is always in week 1 — shift back 7 days from any date in this week
  const jan4 = new Date(Date.UTC(y,0,4));
  const dow = jan4.getUTCDay() || 7;
  const monW1 = new Date(jan4); monW1.setUTCDate(jan4.getUTCDate() - dow + 1);
  const monThis = new Date(monW1); monThis.setUTCDate(monW1.getUTCDate() + (w-1)*7);
  monThis.setUTCDate(monThis.getUTCDate() - 7);
  return isoWeekId(monThis.toISOString().slice(0,10));
}
function prevMonthId(monthIdStr){
  const [y,m] = monthIdStr.split("-").map(Number);
  const py = m===1 ? y-1 : y;
  const pm = m===1 ? 12 : m-1;
  return py+"-"+String(pm).padStart(2,"0");
}

// ══════ Aggregate weekly view from daily index (schema fallback) ══════
function aggregateWeekly(weekId, dailyIndex, allDates){
  const ORDER = {L1:1,L2:2,L3:3};
  const inWk = allDates.filter(d => isoWeekId(d) === weekId).sort();
  const prevWk = prevWeekId(weekId);
  const inPrev = allDates.filter(d => isoWeekId(d) === prevWk).sort();

  const collect = (dates) => {
    const out = {clusters:{}, l3:0, l2:0, l1:0, comp:0};
    for(const d of dates){
      const ds = dailyIndex[d]; if(!ds) continue;
      out.l3 += (ds.l3||[]).length;
      out.l2 += (ds.l2||[]).length;
      out.l1 += (ds.l1||[]).length;
      out.comp += (ds.comp||[]).length;
      for(const lvlKey of ["l3","l2","l1"]){
        const lvl = lvlKey.toUpperCase();
        for(const item of ds[lvlKey]||[]){
          const ck = item.cluster || clusterKey(item.name, item.tks||[]);
          if(!out.clusters[ck]) out.clusters[ck] = {cluster:ck, name:item.name, names:new Set([item.name]), heat:0, level:"L1", appearances:0, descs:[], acts:[], tks:new Set()};
          const c = out.clusters[ck];
          c.names.add(item.name);
          c.appearances += 1;
          if((item.heat||0) >= c.heat){ c.heat = item.heat||c.heat; c.name = item.name; }
          if(ORDER[lvl] > ORDER[c.level]) c.level = lvl;
          if(item.desc) c.descs.push({date:d, desc:item.desc});
          if(item.act) c.acts.push({date:d, act:item.act, urg:item.urg});
          (item.tks||[]).forEach(t=>c.tks.add(t));
        }
      }
    }
    return out;
  };

  const cur = collect(inWk);
  const prev = collect(inPrev);

  // Movers: cross-week level transitions per cluster
  const movers = [];
  for(const [ck, c] of Object.entries(cur.clusters)){
    const prevC = prev.clusters[ck];
    const fromLvl = prevC?.level || "L1";
    const fromHeat = prevC?.heat || 0;
    const heat = c.heat || 0;
    const delta = heat - fromHeat;
    const type = ORDER[c.level] > ORDER[fromLvl] ? "up" : ORDER[c.level] < ORDER[fromLvl] ? "down" : "stay";
    movers.push({
      name: c.name,
      cluster: ck,
      aliases: [...c.names].filter(n=>n!==c.name),
      from: fromLvl, to: c.level, heat,
      delta: (delta>=0?"+":"")+delta,
      type, appearances: c.appearances,
    });
  }
  movers.sort((a,b)=>{
    const tt = {up:0, stay:1, down:2};
    if(tt[a.type] !== tt[b.type]) return tt[a.type]-tt[b.type];
    return (b.heat||0) - (a.heat||0);
  });

  // Events: chronological L3+L2 with title
  const events = [];
  for(const d of inWk){
    const ds = dailyIndex[d]; if(!ds) continue;
    for(const item of ds.l3||[]) events.push({date:d.slice(5), title:item.act||item.desc||item.name, color:C.r});
    for(const item of ds.l2||[]) events.push({date:d.slice(5), title:item.desc||item.name, color:C.g});
  }
  events.sort((a,b)=>b.date.localeCompare(a.date));

  const kpis = [
    {label:"L3 信号", val:cur.l3, prev:prev.l3, unit:"条"},
    {label:"L2 信号", val:cur.l2, prev:prev.l2, unit:"条"},
    {label:"竞对动作", val:cur.comp, prev:prev.comp, unit:"条"},
    {label:"追踪簇数", val:Object.keys(cur.clusters).length, prev:Object.keys(prev.clusters).length, unit:"个"},
  ];

  const period = inWk.length
    ? weekId+" ("+inWk[0].slice(5)+" ~ "+inWk[inWk.length-1].slice(5)+")"
    : weekId;

  return {period, kpis, movers, events, _curClusters: cur.clusters};
}

// ══════ Aggregate monthly view from daily index ══════
function aggregateMonthly(mid, dailyIndex, allDates){
  const ORDER = {L1:1,L2:2,L3:3};
  const inMo = allDates.filter(d => monthId(d) === mid).sort();
  const inPrev = allDates.filter(d => monthId(d) === prevMonthId(mid)).sort();

  const collect = (dates) => {
    const out = {clusters:{}, l3:0, l2:0, l1:0, comp:0, sig:0};
    for(const d of dates){
      const ds = dailyIndex[d]; if(!ds) continue;
      out.l3 += (ds.l3||[]).length;
      out.l2 += (ds.l2||[]).length;
      out.l1 += (ds.l1||[]).length;
      out.comp += (ds.comp||[]).length;
      out.sig += (ds.kolCount||0) + (ds.tgGroups||0);
      for(const lvlKey of ["l3","l2","l1"]){
        const lvl = lvlKey.toUpperCase();
        for(const item of ds[lvlKey]||[]){
          const ck = item.cluster || clusterKey(item.name, item.tks||[]);
          if(!out.clusters[ck]) out.clusters[ck] = {cluster:ck, name:item.name, names:new Set([item.name]), heat:0, level:"L1", heats:{}, levels:{}, descs:{}, firstDate:d, lastDate:d};
          const c = out.clusters[ck];
          c.names.add(item.name);
          if((item.heat||0) >= c.heat){ c.heat = item.heat||c.heat; c.name = item.name; }
          if(ORDER[lvl] > ORDER[c.level]) c.level = lvl;
          c.heats[d] = Math.max(c.heats[d]||0, item.heat||0);
          if(!c.levels[d] || ORDER[lvl] > ORDER[c.levels[d]]) c.levels[d] = lvl;
          if(item.desc) c.descs[d] = item.desc;
          if(d > c.lastDate) c.lastDate = d;
          if(d < c.firstDate) c.firstDate = d;
        }
      }
    }
    return out;
  };

  const cur = collect(inMo);
  const prev = collect(inPrev);

  // Hits: clusters that hit L3 this month, sorted by heat
  const hits = Object.values(cur.clusters)
    .filter(c => c.level === "L3")
    .sort((a,b)=>b.heat-a.heat)
    .slice(0,8)
    .map(c => ({
      name: c.name,
      heat: c.heat,
      desc: c.descs[c.lastDate] || c.descs[c.firstDate] || "",
    }));

  // Misses: clusters that started L3/L2 but ended L1 (downgraded), or had high heat then dropped
  const misses = Object.values(cur.clusters)
    .filter(c => {
      const dates = Object.keys(c.heats).sort();
      if(dates.length < 2) return false;
      const firstHeat = c.heats[dates[0]] || 0;
      const lastHeat = c.heats[dates[dates.length-1]] || 0;
      return firstHeat >= 60 && lastHeat <= firstHeat * 0.6;
    })
    .sort((a,b)=>b.heat-a.heat)
    .slice(0,6)
    .map(c => ({
      name: c.name,
      heat: c.heat,
      desc: c.descs[c.firstDate] || "",
    }));

  // Lifecycle: per-cluster heat trajectory
  const lifecycle = Object.values(cur.clusters)
    .filter(c => c.heat > 0)
    .sort((a,b)=>b.heat-a.heat)
    .slice(0,30)
    .map(c => {
      const heatTrend = inMo.map(d => c.heats[d] || 0);
      const days = inMo.length
        ? Math.round((new Date(c.lastDate) - new Date(c.firstDate))/86400000) + 1
        : 1;
      // Phase heuristic from heat trajectory shape
      const nz = heatTrend.filter(v=>v>0);
      const last3 = heatTrend.slice(-3).reduce((a,b)=>a+b,0)/3;
      const mid3 = heatTrend.slice(Math.floor(heatTrend.length/2)-1, Math.floor(heatTrend.length/2)+2).reduce((a,b)=>a+b,0)/3;
      let phase = "成熟期";
      if(nz.length <= 2) phase = "萌芽期";
      else if(last3 > mid3 * 1.2) phase = "爆发期";
      else if(last3 < mid3 * 0.7) phase = "衰退期";
      return {
        name: c.name,
        cluster: c.cluster,
        aliases: [...c.names].filter(n=>n!==c.name),
        level: c.level,
        phase, days,
        heat: heatTrend,
      };
    });

  const kpis = [
    {label:"L3 信号", val:cur.l3, prev:prev.l3, unit:"条"},
    {label:"L2 信号", val:cur.l2, prev:prev.l2, unit:"条"},
    {label:"竞对动作", val:cur.comp, prev:prev.comp, unit:"条"},
    {label:"追踪簇数", val:Object.keys(cur.clusters).length, prev:Object.keys(prev.clusters).length, unit:"个"},
  ];

  const period = inMo.length
    ? mid+" ("+inMo[0].slice(5)+" ~ "+inMo[inMo.length-1].slice(5)+")"
    : mid;

  return {period, kpis, hits, misses, lifecycle};
}

// ══════ Build KPI drill-down details (weekly / monthly) ══════
function buildWkDetails(wk){
  const movers = wk.movers || [];
  const events = wk.events || [];
  return [
    {title:"L3 信号 — "+(wk.kpis?.[0]?.val||0)+" 条", items: movers.filter(m=>m.to==="L3").slice(0,30).map(m=>({name:m.name, level:m.to, detail:m.from+" → "+m.to, heat:m.heat}))},
    {title:"L2 信号 — "+(wk.kpis?.[1]?.val||0)+" 条", items: movers.filter(m=>m.to==="L2").slice(0,30).map(m=>({name:m.name, level:m.to, detail:m.from+" → "+m.to, heat:m.heat}))},
    {title:"竞对动作 — "+(wk.kpis?.[2]?.val||0)+" 条", items: events.slice(0,30).map(e=>({name:e.title, detail:e.date}))},
    {title:"追踪簇数 — "+(wk.kpis?.[3]?.val||0)+" 个", items: movers.slice(0,30).map(m=>({name:m.name, level:m.to, detail:m.cluster, heat:m.heat}))},
  ];
}
function buildMoDetails(mo){
  const lc = mo.lifecycle || [];
  const hits = mo.hits || [];
  return [
    {title:"L3 信号 — "+(mo.kpis?.[0]?.val||0)+" 条", items: hits.map(h=>({name:h.name, level:"L3", heat:h.heat}))},
    {title:"L2 信号 — "+(mo.kpis?.[1]?.val||0)+" 条", items: lc.filter(x=>x.level==="L2").slice(0,30).map(x=>({name:x.name, level:x.level, detail:x.days+"天", heat:Math.max(...x.heat,0)}))},
    {title:"竞对动作 — "+(mo.kpis?.[2]?.val||0)+" 条", items:[]},
    {title:"追踪簇数 — "+(mo.kpis?.[3]?.val||0)+" 个", items: lc.map(x=>({name:x.name, level:x.level, detail:x.phase+" · "+x.days+"天", heat:Math.max(...x.heat,0)}))},
  ];
}

// ══════ PAGE: WATCHLIST ══════
const PageWL=({wl,onOpen,targets,onOpenDR})=>{
  if(wl.length===0&&targets.length===0) return <div style={{textAlign:"center",padding:60,color:C.t3}}>{"\u6682\u65E0\u8FFD\u8E2A\u6570\u636E"}</div>;
  return <div>
    {targets.length>0&&<section style={{marginBottom:32}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <span style={{fontSize:16}}>{"\uD83D\uDD2C"}</span>
        <h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{"\u6DF1\u5EA6\u8C03\u7814\u6807\u7684"}</h2>
        <span style={{...MO,fontSize:11,fontWeight:700,color:C.ac,background:C.acd,padding:"2px 8px",borderRadius:4}}>{targets.length}</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
        {targets.map(t=>(<Glass key={t.id} onClick={()=>onOpenDR(t.id)} style={{cursor:"pointer"}}>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
            <KindTag kind={t.kind}/>
            <span style={{fontSize:15,fontWeight:700,color:C.t1}}>{t.name}</span>
          </div>
          <div style={{fontSize:12,color:C.t3,lineHeight:1.5,minHeight:40}}>{(t.thesis||"").slice(0,120)}{(t.thesis||"").length>120?"…":""}</div>
          {t.aliases?.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:8}}>{t.aliases.slice(0,4).map((a,i)=><Tag key={i}>{a}</Tag>)}</div>}
        </Glass>))}
      </div>
    </section>}
    <div style={{marginBottom:24}}>
      <h2 style={{...HD,fontSize:22,fontWeight:800,color:C.t1,marginBottom:4}}>{"\u957F\u671F\u8FFD\u8E2A"}</h2>
      <p style={{fontSize:13,color:C.t3,margin:0}}>{"\u57FA\u4E8E\u6BCF\u65E5 L3/L2 \u6570\u636E\u81EA\u52A8\u751F\u6210"}</p>
    </div>
    {wl.map((w,i)=>{const hc=w.heat>=70?C.r:w.heat>=50?C.g:C.t3;return (<div key={i} onClick={()=>onOpen(w.id)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0",borderBottom:"1px solid "+C.bd,cursor:"pointer",transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.02)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
      <div style={{display:"flex",alignItems:"center",gap:14,flex:1,minWidth:0}}>
        <LvlTag level={w.level}/>
        <div style={{minWidth:0,flex:1}}>
          <div style={{fontSize:15,fontWeight:700,color:C.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{w.name}</div>
          <div style={{fontSize:11,color:C.t3,marginTop:2,display:"flex",gap:8,alignItems:"center"}}>
            <span>{w.days}{"\u5929"}</span>
            {w.aliases?.length>0 && <span style={{color:C.t4}}>+{w.aliases.length} {"\u522B\u540D"}</span>}
            <span style={{...MO,fontSize:10,color:C.t4,opacity:0.7}}>{w.cluster}</span>
          </div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:16,flexShrink:0}}>
        <Spark data={w.trend} color={hc} w={50} h={18}/>
        <div style={{...MO,fontSize:14,fontWeight:700,color:hc,width:50,textAlign:"right"}}>{w.heat}</div>
        <div style={{fontSize:10,color:C.t4}}>{"\u2192"}</div>
      </div>
    </div>)})}
  </div>;
};

// ══════ PAGE: TIMELINE (watchlist detail) ══════
const PageTL=({item,onBack})=>{const hc=item.heat>=70?C.r:item.heat>=50?C.g:C.t3;return (<div>
  <BackBtn onClick={onBack} label="Watchlist"/>
  <div style={{marginBottom:28}}>
    <h1 style={{...HD,fontSize:28,fontWeight:800,color:C.t1,margin:"0 0 8px"}}>{item.name}</h1>
    <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
      <LvlTag level={item.level}/>
      <span style={{...MO,fontSize:11,color:C.t4}}>cluster: {item.cluster}</span>
    </div>
    {item.aliases?.length>0 && <div style={{marginTop:10,padding:"8px 12px",background:"rgba(255,255,255,0.03)",borderRadius:6,borderLeft:"2px solid "+C.bm}}>
      <div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginBottom:4}}>{"\u540C\u7C07\u522B\u540D"} ({item.aliases.length})</div>
      {item.aliases.map((a,i)=><div key={i} style={{fontSize:12,color:C.t3,lineHeight:1.6}}>· {a}</div>)}
    </div>}
  </div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:28}}>
    <Glass style={{textAlign:"center",padding:16}}><div style={{...MO,fontSize:24,fontWeight:700,color:hc}}>{item.heat}</div><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginTop:4}}>{"\u70ED\u5EA6"}</div></Glass>
    <Glass style={{textAlign:"center",padding:16}}><div style={{...MO,fontSize:24,fontWeight:700,color:C.t1}}>{item.days}<span style={{fontSize:12,color:C.t3}}>{"\u5929"}</span></div><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginTop:4}}>{"\u8FFD\u8E2A"}</div></Glass>
    <Glass style={{textAlign:"center",padding:16}}><div style={{...MO,fontSize:24,fontWeight:700,color:C.t1}}>{item.events.length}</div><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginTop:4}}>{"\u4E8B\u4EF6"}</div></Glass>
    <Glass style={{textAlign:"center",padding:16}}><div style={{fontSize:22}}>{item.trend[item.trend.length-1]>=(item.trend[item.trend.length-2]||0)?"\u2197\uFE0F":"\u2198\uFE0F"}</div><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginTop:4}}>{"\u8D8B\u52BF"}</div></Glass>
  </div>
  {item.tokens?.length>0&&<div style={{marginBottom:24}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>{"\u5173\u8054\u4EE3\u5E01"}</div><div style={{display:"flex",gap:6}}>{item.tokens.map((t,i)=> <Tag key={i} color={C.ac} bg={C.acd}>${t}</Tag>)}</div></div>}
  <Glass style={{marginBottom:24}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>{"\u70ED\u5EA6\u8D8B\u52BF"}</div><div style={{display:"flex",alignItems:"flex-end",gap:3,height:60}}>{item.trend.map((v,i)=>{const mx=Math.max(...item.trend)||1;return (<div key={i} style={{flex:1,borderRadius:"3px 3px 0 0",height:Math.max(3,Math.round(v/mx*52)),background:v>=70?C.r:v>=50?C.ac:"rgba(255,255,255,0.1)"}}/>)})}</div></Glass>
  {item.events.length>0&&<><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:12}}>{"\u4E8B\u4EF6\u65F6\u95F4\u7EBF"}</div>
  {item.events.map((ev,i)=>{const dc=ev.type==="critical"?C.r:ev.type==="comp"?C.y:ev.type==="data"?C.ac:C.w;return (<div key={i} style={{position:"relative",paddingLeft:28,paddingBottom:i<item.events.length-1?20:0}}><div style={{position:"absolute",left:0,top:5,width:12,height:12,borderRadius:"50%",border:"2px solid "+dc,background:C.bg}}/>{i<item.events.length-1&&<div style={{position:"absolute",left:5,top:18,width:2,bottom:0,background:"rgba(255,255,255,0.05)"}}/>}<div style={{...MO,fontSize:10,color:C.t4,marginBottom:2}}>{ev.date}</div><div style={{fontSize:14,fontWeight:700,color:C.t1,marginBottom:2}}>{ev.title}</div><div style={{fontSize:12,color:C.t3,lineHeight:1.5}}>{ev.desc}</div></div>)})}</>}
</div>)};

// ══════ DEEP RESEARCH ══════
const KIND_STYLE={crypto:{c:C.ac,bg:C.acd,l:"CRYPTO"},stock:{c:C.p,bg:C.pg,l:"STOCK"},event:{c:C.y,bg:C.yg,l:"EVENT"}};
const KindTag=({kind})=>{const s=KIND_STYLE[kind]||{c:C.t3,bg:"rgba(255,255,255,0.04)",l:(kind||"?").toUpperCase()};return <span style={{display:"inline-block",padding:"2px 8px",borderRadius:4,fontSize:9,fontWeight:700,letterSpacing:"0.08em",color:s.c,background:s.bg}}>{s.l}</span>};

const SrcTag=({src,type})=>{const m={blockbeats:{c:C.ac,l:"律动"},x:{c:C.p,l:"X"},web:{c:C.y,l:"WEB"}};const s=m[src]||{c:C.t3,l:src};return <span style={{...MO,fontSize:9,color:s.c,padding:"1px 6px",borderRadius:3,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.05)"}}>{s.l}{type?" · "+type:""}</span>};

const DROverview=({profile,meta,feed,digest})=>(<div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
    <Glass style={{textAlign:"center",padding:16}}><div style={{...MO,fontSize:22,fontWeight:700,color:C.t1}}>{feed.length}</div><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginTop:4}}>Feed 总条数</div></Glass>
    <Glass style={{textAlign:"center",padding:16}}><div style={{...MO,fontSize:22,fontWeight:700,color:C.t1}}>{digest?.new_items??"-"}</div><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginTop:4}}>24h 新增</div></Glass>
    <Glass style={{textAlign:"center",padding:16}}><div style={{...MO,fontSize:22,fontWeight:700,color:C.t1}}>{digest?.top_events?.length??0}</div><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginTop:4}}>重点事件</div></Glass>
    <Glass style={{textAlign:"center",padding:16}}><div style={{...MO,fontSize:11,fontWeight:700,color:digest?.mode?.startsWith("llm")?C.g:C.y}}>{digest?.mode||"n/a"}</div><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginTop:4}}>综合模式</div></Glass>
  </div>
  {profile.aliases?.length>0&&<Glass style={{marginBottom:16}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>别名</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{profile.aliases.map((a,i)=><Tag key={i}>{a}</Tag>)}</div></Glass>}
  {profile.keywords?.length>0&&<Glass style={{marginBottom:16}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>追踪关键词</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{profile.keywords.map((k,i)=><Tag key={i} color={C.ac} bg={C.acd}>#{k}</Tag>)}</div></Glass>}
  {profile.watchers?.length>0&&<Glass style={{marginBottom:16}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>关注的 X 账号</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{profile.watchers.map((w,i)=><Tag key={i} color={C.p} bg={C.pg}>@{w}</Tag>)}</div></Glass>}
  {profile.stakeholders?.length>0&&<Glass style={{marginBottom:16}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>关键利益相关方</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{profile.stakeholders.map((s,i)=><Tag key={i} color={C.y} bg={C.yg}>{s}</Tag>)}</div></Glass>}
  {profile.affected_targets?.length>0&&<Glass style={{marginBottom:16}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>关联标的</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{profile.affected_targets.map((t,i)=><Tag key={i} color={C.r} bg={C.rg}>{t}</Tag>)}</div></Glass>}
  {meta&&<Glass><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>采集运行时</div><div style={{...MO,fontSize:11,color:C.t3,display:"grid",gridTemplateColumns:"auto 1fr",gap:"2px 10px"}}>
    <span>last_poll:</span><span style={{color:C.t2}}>{meta.last_poll_at}</span>
    <span>anthropic:</span><span style={{color:meta.has_anthropic?C.g:C.y}}>{String(meta.has_anthropic)}</span>
    <span>twitter:</span><span style={{color:meta.has_twitter?C.g:C.y}}>{String(meta.has_twitter)}</span>
    <span>this_run_new:</span><span style={{color:C.t2}}>{meta.total_new_this_run}</span>
    <span>sources_ok:</span><span style={{color:C.t2}}>{(meta.sources_ok||[]).map(s=>`${s.src}:${s.new}/${s.got}`).join("  ")}</span>
  </div></Glass>}
</div>);

const DRFeed=({feed})=>{
  const[srcF,setSrcF]=useState("all");
  const[page,setPage]=useState(0);
  const PS=30;
  const srcs=Array.from(new Set(feed.map(f=>f.src)));
  const filtered=srcF==="all"?feed:feed.filter(f=>f.src===srcF);
  const slice=filtered.slice(page*PS,(page+1)*PS);
  if(feed.length===0) return <Glass><div style={{textAlign:"center",padding:30,color:C.t3,fontSize:13}}>{"\u6682\u65E0 feed\uFF0C\u5148\u8DD1 python run.py poll"}</div></Glass>;
  return (<div>
    <div style={{display:"flex",gap:4,marginBottom:12,alignItems:"center"}}>
      <span style={{fontSize:10,color:C.t4,fontWeight:600,textTransform:"uppercase",marginRight:6}}>{"\u6E90"}</span>
      <button onClick={()=>{setSrcF("all");setPage(0)}} style={{padding:"3px 10px",fontSize:11,fontWeight:600,color:srcF==="all"?C.t1:C.t4,background:srcF==="all"?"rgba(255,255,255,0.07)":"none",border:"1px solid "+C.bm,borderRadius:4,cursor:"pointer",fontFamily:"'DM Sans'"}}>All ({feed.length})</button>
      {srcs.map(s=><button key={s} onClick={()=>{setSrcF(s);setPage(0)}} style={{padding:"3px 10px",fontSize:11,fontWeight:600,color:srcF===s?C.t1:C.t4,background:srcF===s?"rgba(255,255,255,0.07)":"none",border:"1px solid "+C.bm,borderRadius:4,cursor:"pointer",fontFamily:"'DM Sans'"}}>{s} ({feed.filter(f=>f.src===s).length})</button>)}
    </div>
    <Glass style={{padding:0}}>{slice.map((it,i)=>(<div key={it.hash||i} style={{padding:"12px 20px",borderBottom:i<slice.length-1?"1px solid "+C.bd:"none"}}>
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4,flexWrap:"wrap"}}>
        <SrcTag src={it.src} type={it.type}/>
        {it.author&&<span style={{...MO,fontSize:10,color:C.p}}>@{it.author}</span>}
        <span style={{...MO,fontSize:10,color:C.t4,marginLeft:"auto"}}>{(it.ts||"").replace("T"," ").slice(0,16)}</span>
      </div>
      <div style={{fontSize:13,color:C.t1,fontWeight:600,lineHeight:1.5,marginBottom:4}}>{it.url?<a href={it.url} target="_blank" rel="noreferrer" style={{color:C.t1,textDecoration:"none"}}>{it.title}</a>:it.title}</div>
      {it.summary&&<div style={{fontSize:12,color:C.t3,lineHeight:1.6}} dangerouslySetInnerHTML={{__html:it.summary.slice(0,400)}}/>}
    </div>))}<Paginator page={page} setPage={setPage} total={filtered.length} pageSize={PS}/></Glass>
  </div>);
};

const DRDigest=({digest,date})=>{
  if(!digest) return <Glass><div style={{textAlign:"center",padding:30,color:C.t3,fontSize:13}}>{"\u6682\u65E0 digest\uFF0C\u5148\u8DD1 python run.py synth"}</div></Glass>;
  return (<div>
    <Glass style={{marginBottom:16,borderLeft:"3px solid "+(digest.mode?.startsWith("llm")?C.g:C.y)}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{...MO,fontSize:11,fontWeight:700,color:C.t3}}>{date||digest.date}</span><span style={{...MO,fontSize:10,padding:"2px 8px",borderRadius:4,background:digest.mode?.startsWith("llm")?C.gg:C.yg,color:digest.mode?.startsWith("llm")?C.g:C.y,fontWeight:700}}>{digest.mode}</span><span style={{...MO,fontSize:11,color:C.t4}}>new {digest.new_items} · top {digest.top_events?.length||0}</span></div></Glass>
    {digest.top_events?.length>0&&<section style={{marginBottom:20}}><h3 style={{...HD,fontSize:14,fontWeight:800,color:C.t1,margin:"0 0 10px"}}>{"\u91CD\u70B9\u4E8B\u4EF6"}</h3>{digest.top_events.map((e,i)=>(<Glass key={i} style={{marginBottom:8,borderColor:e.importance==="high"?C.rb:C.bm}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.t1,marginBottom:4}}>{e.title}</div>{e.evidence&&<div style={{fontSize:11,color:C.t3,lineHeight:1.5}} dangerouslySetInnerHTML={{__html:e.evidence.slice(0,300)}}/>}</div><UB level={e.importance==="high"?"high":e.importance==="low"?"medium":"medium"}/></div></Glass>))}</section>}
    {digest.thesis_delta&&<Glass style={{marginBottom:16,background:C.acd,borderColor:"rgba(35,247,221,0.15)"}}><div style={{fontSize:10,fontWeight:600,color:C.ac,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>{"Thesis \u5DEE\u5206"}</div><div style={{fontSize:13,color:C.t1,lineHeight:1.6}}>{digest.thesis_delta}</div></Glass>}
    {digest.broaden?.length>0&&<section style={{marginBottom:20}}><h3 style={{...HD,fontSize:14,fontWeight:800,color:C.t1,margin:"0 0 10px"}}>{"\uD83D\uDCA1 \u6269\u5BBD\u601D\u8DEF"}</h3>{digest.broaden.map((b,i)=>(<Glass key={i} style={{marginBottom:8,borderLeft:"3px solid "+C.p}}><div style={{fontSize:13,fontWeight:700,color:C.t1,marginBottom:4}}>{b.angle}</div>{b.evidence&&<div style={{fontSize:11,color:C.t3,marginBottom:4,lineHeight:1.5}}>{"\u6839\u636E: "}{b.evidence}</div>}{b.action&&<div style={{fontSize:12,color:C.p,fontWeight:600}}>{"\u2192 "}{b.action}</div>}</Glass>))}</section>}
    {digest.risks?.length>0&&<section style={{marginBottom:20}}><h3 style={{...HD,fontSize:14,fontWeight:800,color:C.r,margin:"0 0 10px"}}>{"\u26A0 \u98CE\u9669\u4FE1\u53F7"}</h3><Glass style={{borderColor:C.rb}}>{digest.risks.map((r,i)=>(<div key={i} style={{fontSize:12,color:C.t2,padding:"6px 0",borderBottom:i<digest.risks.length-1?"1px solid "+C.bd:"none",display:"flex",gap:8}}><span style={{color:C.r}}>{"\u00B7"}</span><span style={{lineHeight:1.5}}>{r}</span></div>))}</Glass></section>}
    {digest.cross_refs?.length>0&&<section><h3 style={{...HD,fontSize:14,fontWeight:800,color:C.t1,margin:"0 0 10px"}}>{"\u2192 \u5173\u8054\u6807\u7684\u5F71\u54CD"}</h3><Glass style={{padding:0}}>{digest.cross_refs.map((cr,i)=>(<div key={i} style={{padding:"10px 20px",borderBottom:i<digest.cross_refs.length-1?"1px solid "+C.bd:"none",display:"grid",gridTemplateColumns:"120px 1fr",gap:10,alignItems:"center"}}><Tag color={C.ac} bg={C.acd}>{cr.target}</Tag><div style={{fontSize:12,color:C.t2,lineHeight:1.5}}>{cr.impact}</div></div>))}</Glass></section>}
  </div>);
};

const DRThesis=({thesis,profile})=>{
  const current=thesis?.current||profile?.thesis||"";
  const history=thesis?.history||[];
  return (<div>
    <Glass style={{marginBottom:16,borderLeft:"3px solid "+C.ac}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <span style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em"}}>{"\u5F53\u524D Thesis"}</span>
        <span style={{...MO,fontSize:11,color:C.ac,fontWeight:700}}>v{thesis?.version||1}</span>
      </div>
      <div style={{fontSize:13,color:C.t1,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{current}</div>
      {thesis?.updated_at&&<div style={{...MO,fontSize:10,color:C.t4,marginTop:8}}>{"updated: "+thesis.updated_at}</div>}
    </Glass>
    {history.length>0&&<section>
      <h3 style={{...HD,fontSize:14,fontWeight:800,color:C.t1,margin:"0 0 10px"}}>{"\u5386\u53F2\u7248\u672C"}</h3>
      {[...history].reverse().map((h,i)=>(<Glass key={i} style={{marginBottom:8}}>
        <div style={{...MO,fontSize:10,color:C.t4,marginBottom:4}}>{h.date}</div>
        {h.reason&&<div style={{fontSize:11,color:C.p,marginBottom:6}}>{"\u6539\u52A8\u7406\u7531: "+h.reason}</div>}
        <div style={{fontSize:12,color:C.t3,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{h.thesis}</div>
      </Glass>))}
    </section>}
  </div>);
};

// ══════ PAGE: DEEP RESEARCH (single target) ══════
const PageDR=({id,targets,onBack})=>{
  const[tab,setTab]=useState("overview");
  const[profile,setProfile]=useState(null);
  const[feed,setFeed]=useState([]);
  const[digest,setDigest]=useState(null);
  const[digestDate,setDigestDate]=useState(null);
  const[thesis,setThesis]=useState(null);
  const[meta,setMeta]=useState(null);
  const[err,setErr]=useState(null);

  useEffect(()=>{
    if(!id)return;
    setProfile(null);setFeed([]);setDigest(null);setThesis(null);setMeta(null);setErr(null);
    fetch(`/targets/${id}/profile.json`).then(r=>r.ok?r.json():null).then(d=>{if(d)setProfile(d);else setErr("profile 不存在");}).catch(e=>setErr(String(e)));
    fetch(`/targets/${id}/thesis.json`).then(r=>r.ok?r.json():null).then(d=>d&&setThesis(d)).catch(()=>{});
    fetch(`/targets/${id}/meta.json`).then(r=>r.ok?r.json():null).then(d=>d&&setMeta(d)).catch(()=>{});
    fetch(`/targets/${id}/feed.jsonl`).then(r=>r.ok?r.text():"").then(t=>{
      const items=(t||"").split(/\n+/).map(l=>{try{return JSON.parse(l);}catch{return null;}}).filter(Boolean);
      items.sort((a,b)=>(b.ts||"").localeCompare(a.ts||""));
      setFeed(items);
    }).catch(()=>setFeed([]));
    // 尝试今日 digest，失败则尝试列出最近的
    const today=new Date().toISOString().slice(0,10);
    fetch(`/targets/${id}/digest/${today}.json`).then(r=>r.ok?r.json():null).then(d=>{if(d){setDigest(d);setDigestDate(today);}}).catch(()=>{});
  },[id]);

  if(err) return <div><BackBtn onClick={onBack} label="Back"/><Glass><div style={{padding:20,color:C.r,fontSize:13}}>{err}</div></Glass></div>;
  if(!profile) return <div><BackBtn onClick={onBack} label="Back"/><Loading/></div>;

  const tabs=[{k:"overview",l:"Overview"},{k:"feed",l:`Feed (${feed.length})`},{k:"digest",l:"Digest"},{k:"thesis",l:"Thesis"}];
  return (<div>
    <BackBtn onClick={onBack} label="← Research Targets"/>
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
        <KindTag kind={profile.kind}/>
        <h1 style={{...HD,fontSize:26,fontWeight:800,color:C.t1,margin:0}}>{profile.name}</h1>
        {profile.ticker&&<span style={{...MO,fontSize:12,color:C.t3}}>{profile.ticker}{profile.exchange?" · "+profile.exchange:""}</span>}
      </div>
      {profile.thesis&&<div style={{fontSize:13,color:C.t2,lineHeight:1.7,whiteSpace:"pre-wrap",padding:"10px 14px",background:"rgba(255,255,255,0.02)",borderRadius:8,borderLeft:"2px solid "+C.bm}}>{profile.thesis}</div>}
    </div>
    <div style={{display:"flex",gap:2,marginBottom:20,borderBottom:"1px solid "+C.bd}}>
      {tabs.map(t=><button key={t.k} onClick={()=>setTab(t.k)} style={{padding:"8px 16px",fontSize:12,fontWeight:600,color:tab===t.k?C.t1:C.t4,background:"none",border:"none",borderBottom:tab===t.k?"2px solid "+C.ac:"2px solid transparent",cursor:"pointer",fontFamily:"'DM Sans'"}}>{t.l}</button>)}
    </div>
    {tab==="overview"&&<DROverview profile={profile} meta={meta} feed={feed} digest={digest}/>}
    {tab==="feed"&&<DRFeed feed={feed}/>}
    {tab==="digest"&&<DRDigest digest={digest} date={digestDate}/>}
    {tab==="thesis"&&<DRThesis thesis={thesis} profile={profile}/>}
  </div>);
};

// ══════ SELECT STYLE ══════
const SEL={...MO,fontSize:12,color:C.t1,fontWeight:700,padding:"5px 28px 5px 10px",background:"rgba(255,255,255,0.04)",border:"1px solid "+C.bm,borderRadius:6,cursor:"pointer",appearance:"none",WebkitAppearance:"none",backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='10' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236E6E88' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")",backgroundRepeat:"no-repeat",backgroundPosition:"right 8px center",outline:"none"};

// ══════ APP ══════
export default function App(){
  const[tab,setTab]=useState("daily");
  const[dateIdx,setDateIdx]=useState(0);
  const[weekIdx,setWeekIdx]=useState(0);
  const[monthIdx,setMonthIdx]=useState(0);
  const[kpiIdx,setKpiIdx]=useState(null);
  const[kpiSrc,setKpiSrc]=useState(null);
  const[tlId,setTlId]=useState(null);

  // index.json data
  const[index,setIndex]=useState(null);
  const[dayCache,setDayCache]=useState({});
  const[loadingDay,setLoadingDay]=useState(false);

  // Deep Research targets
  const[targets,setTargets]=useState([]);
  const[drId,setDrId]=useState(null);

  // Load index.json on startup
  useEffect(()=>{
    fetch("/index.json").then(r=>r.ok?r.json():null).then(d=>{if(d)setIndex(d)}).catch(()=>{});
    fetch("/targets/index.json").then(r=>r.ok?r.json():null).then(d=>{if(d?.targets)setTargets(d.targets)}).catch(()=>{});
  },[]);

  // Derived data
  const dates = index?.dates || DEMO_DATES;
  const dailyIndex = index?.daily || {};

  // Schema detection: new schema has weeks/months as arrays of id strings
  // (e.g. "2026-W18", "2026-04") and weekly/monthly as dicts keyed by id with
  // only summary stats (days/l3Count/...). Old schema has weeks/months as
  // arrays of full view objects ({period, kpis, movers, events, ...}).
  const isNewSchema = Array.isArray(index?.weeks) && index.weeks.length > 0
    && typeof index.weeks[0] === "string";

  let weeks, months, weekly, monthly, wkDetails, moDetails;
  if(isNewSchema){
    // weeks/months are id strings; aggregate views from daily
    weeks = (index.weeks || []).map(id => aggregateWeekly(id, dailyIndex, dates));
    months = (index.months || []).map(id => aggregateMonthly(id, dailyIndex, dates));
    weekly = weeks[Math.min(weekIdx, Math.max(0,weeks.length-1))] || DEMO_WEEKLY;
    monthly = months[Math.min(monthIdx, Math.max(0,months.length-1))] || DEMO_MONTHLY;
    wkDetails = buildWkDetails(weekly);
    moDetails = buildMoDetails(monthly);
  } else {
    weeks = index?.weeks || (index?.weekly ? [index.weekly] : [DEMO_WEEKLY]);
    months = index?.months || (index?.monthly ? [index.monthly] : [DEMO_MONTHLY]);
    weekly = weeks[Math.min(weekIdx, weeks.length-1)] || DEMO_WEEKLY;
    monthly = months[Math.min(monthIdx, months.length-1)] || DEMO_MONTHLY;
    wkDetails = WK_DETAILS;
    moDetails = MO_DETAILS;
  }

  // Build watchlist from daily index
  const wl = buildWatchlist(dailyIndex, dates);
  const tlItem = tlId ? wl.find(w=>w.id===tlId) : null;

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
          <div style={{display:"flex",gap:1,background:"rgba(255,255,255,0.03)",borderRadius:6,padding:2}}>{periods.map(p=> <button key={p.k} onClick={()=>{setTab(p.k);setTlId(null);setDrId(null);setKpiIdx(null);setKpiSrc(null)}} style={{padding:"4px 14px",borderRadius:4,fontSize:12,fontWeight:600,color:tab===p.k&&!showKpiDetail?C.t1:C.t4,background:tab===p.k&&!showKpiDetail?"rgba(255,255,255,0.07)":"none",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.15s"}}>{p.l}</button>)}</div>
          <button onClick={()=>{setTab("wl");setTlId(null);setDrId(null);setKpiIdx(null);setKpiSrc(null)}} style={{padding:"4px 14px",borderRadius:4,fontSize:12,fontWeight:600,color:tab==="wl"?C.t1:C.t4,background:tab==="wl"?"rgba(255,255,255,0.07)":"none",border:"1px solid "+(tab==="wl"?C.bm:"transparent"),cursor:"pointer",fontFamily:"'DM Sans'"}}>Watchlist</button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          {tab==="daily"&&!showKpiDetail&&<select value={dateIdx} onChange={e=>setDateIdx(Number(e.target.value))} style={SEL}>{dates.map((d,i)=> <option key={i} value={i} style={{background:C.bg2}}>{d}</option>)}</select>}
          {tab==="weekly"&&!showKpiDetail&&<PeriodNav idx={weekIdx} setIdx={setWeekIdx} total={weeks.length} label={weekly.period}/>}
          {tab==="monthly"&&!showKpiDetail&&<PeriodNav idx={monthIdx} setIdx={setMonthIdx} total={months.length} label={monthly.period}/>}
        </div>
      </div>
    </nav>
    <div style={{maxWidth:1400,margin:"0 auto",padding:"24px 32px 60px"}}>
      {showKpiDetail&&kpiData&&<KpiDetailPage data={kpiData} onBack={()=>{setKpiIdx(null);setKpiSrc(null)}} backLabel={kpiSrc==="wk"?"Weekly":"Monthly"}/>}
      {!showKpiDetail&&tab==="daily"&&(loadingDay&&!D?<Loading/>:<PageDaily D={D}/>)}
      {!showKpiDetail&&tab==="weekly"&&<PageWeekly data={weekly} onKpi={i=>{setKpiIdx(i);setKpiSrc("wk");window.scrollTo(0,0)}}/>}
      {!showKpiDetail&&tab==="monthly"&&<PageMonthly data={monthly} onKpi={i=>{setKpiIdx(i);setKpiSrc("mo");window.scrollTo(0,0)}}/>}
      {!showKpiDetail&&tab==="wl"&&!tlId&&!drId&&<PageWL wl={wl} onOpen={id=>setTlId(id)} targets={targets} onOpenDR={id=>setDrId(id)}/>}
      {!showKpiDetail&&tab==="wl"&&tlItem&&!drId&&<PageTL item={tlItem} onBack={()=>setTlId(null)}/>}
      {!showKpiDetail&&tab==="wl"&&drId&&<PageDR id={drId} targets={targets} onBack={()=>setDrId(null)}/>}
    </div>
  </div>)
}
