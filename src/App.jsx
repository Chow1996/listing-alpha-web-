import { useState, useEffect } from "react";

// ═══ Colors ═══
const C = {
  bg:"#06080C",bg2:"#0C0F15",bg3:"#11141C",bg4:"#181C26",
  t1:"#EEEEF2",t2:"#A0A0B8",t3:"#6E6E88",t4:"#4A4A62",
  ac:"#23F7DD",acd:"rgba(35,247,221,0.07)",acg:"rgba(35,247,221,0.12)",
  bd:"rgba(255,255,255,0.05)",bm:"rgba(255,255,255,0.07)",
  r:"#E74C5A", rg:"rgba(231,76,90,0.08)", rb:"rgba(231,76,90,0.15)",
  g:"#23F7DD", gg:"rgba(35,247,221,0.07)", gb:"rgba(35,247,221,0.12)",
  w:"#4A4A62", wg:"rgba(74,74,98,0.08)",
};
const MO={fontFamily:"'Space Mono',monospace"};
const HD={fontFamily:"'Manrope',sans-serif"};
const LB={fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em"};

// ═══ Components ═══

const HeatBar=({value,color})=>(
  <div style={{width:"100%",height:3,borderRadius:2,background:"rgba(255,255,255,0.05)",overflow:"hidden"}}>
    <div style={{width:`${value}%`,height:"100%",borderRadius:2,background:color,transition:"width 1.2s ease",boxShadow:`0 0 8px ${color}44`}}/>
  </div>
);

const Tag=({children,color=C.t4,bg="rgba(255,255,255,0.04)"})=>(
  <span style={{display:"inline-block",padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:600,color,background:bg,letterSpacing:"0.02em",whiteSpace:"nowrap"}}>{children}</span>
);

const UrgBadge=({level})=>{
  const m={critical:{l:"CRITICAL",c:"#fff",bg:C.r,sh:"0 0 12px rgba(231,76,90,0.4)"},high:{l:"HIGH",c:C.r,bg:C.rg,sh:"none"},medium:{l:"MEDIUM",c:C.g,bg:C.gg,sh:"none"}};
  const s=m[level]||m.medium;
  return <span style={{display:"inline-block",padding:"2px 8px",borderRadius:4,fontSize:9,fontWeight:700,letterSpacing:"0.08em",color:s.c,background:s.bg,boxShadow:s.sh,textTransform:"uppercase"}}>{s.l}</span>;
};

const GlassCard=({children,style={},glow,onClick})=>(
  <div onClick={onClick} style={{background:"rgba(12,15,21,0.65)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid "+C.bm,borderRadius:12,padding:20,position:"relative",overflow:"hidden",cursor:onClick?"pointer":"default",transition:"all 0.25s ease",...style}}
    onMouseEnter={e=>{if(onClick){e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";e.currentTarget.style.transform="translateY(-1px)"}}}
    onMouseLeave={e=>{if(onClick){e.currentTarget.style.borderColor=C.bm;e.currentTarget.style.transform="translateY(0)"}}}>
    <div style={{position:"absolute",inset:0,borderRadius:12,pointerEvents:"none",background:"linear-gradient(180deg,rgba(255,255,255,0.02) 0%,transparent 25%)"}}/>
    {glow&&<div style={{position:"absolute",top:-40,right:-40,width:120,height:120,borderRadius:"50%",background:glow,filter:"blur(40px)",pointerEvents:"none"}}/>}
    <div style={{position:"relative",zIndex:1}}>{children}</div>
  </div>
);

const SectionHeader=({icon,title,count,color,description})=>(
  <div style={{marginBottom:20}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
      <span style={{fontSize:18}}>{icon}</span>
      <h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,letterSpacing:"-0.02em"}}>{title}</h2>
      {count!==undefined&&<span style={{...MO,fontSize:12,fontWeight:700,color,background:`${color}15`,padding:"2px 8px",borderRadius:4}}>{count}</span>}
    </div>
    {description&&<p style={{fontSize:13,color:C.t3,lineHeight:1.6,maxWidth:600}}>{description}</p>}
  </div>
);

// ═══ L3 Card (expandable) ═══
const L3Card=({item,index})=>{
  const[expanded,setExpanded]=useState(false);
  return(
    <GlassCard style={{borderColor:item.urg==="critical"?C.rb:C.bm,animation:`fadeSlideIn 0.5s ease ${index*0.1}s both`}}
      glow={item.urg==="critical"?"rgba(231,76,90,0.15)":"rgba(231,76,90,0.08)"}
      onClick={()=>setExpanded(!expanded)}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <UrgBadge level={item.urg}/>
            <span style={{...MO,fontSize:11,color:C.r,fontWeight:700}}>Heat {item.heat}</span>
          </div>
          <h3 style={{...HD,fontSize:20,fontWeight:800,color:C.t1,letterSpacing:"-0.02em"}}>{item.name}</h3>
        </div>
        <div style={{width:48,height:48,borderRadius:10,background:`linear-gradient(135deg, ${C.rg}, transparent)`,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${C.rb}`,flexShrink:0}}>
          <span style={{...MO,fontSize:16,fontWeight:700,color:C.r}}>{item.heat}</span>
        </div>
      </div>

      <HeatBar value={item.heat} color={C.r}/>

      <p style={{fontSize:13,color:C.t2,lineHeight:1.6,margin:"12px 0"}}>{item.desc}</p>

      {/* Action box */}
      <div style={{background:C.rg,borderRadius:8,padding:"10px 14px",marginBottom:12,border:"1px solid rgba(231,76,90,0.1)"}}>
        <div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>建议行动</div>
        <div style={{fontSize:13,fontWeight:600,color:C.r,lineHeight:1.5}}>{item.act}</div>
      </div>

      {expanded&&(
        <div style={{animation:"fadeIn 0.3s ease"}}>
          {item.comp?.length>0&&<div style={{marginBottom:12}}>
            <div style={{...LB,marginBottom:6}}>竞对动作</div>
            {item.comp.map((a,i)=><div key={i} style={{fontSize:12,color:C.t2,padding:"3px 0 3px 12px",borderLeft:`2px solid ${C.r}44`,marginBottom:2}}>{a}</div>)}
          </div>}
          {item.gap?.length>0&&<div style={{marginBottom:12}}>
            <div style={{...LB,marginBottom:6}}>OKX 缺口</div>
            {item.gap.map((g,i)=><div key={i} style={{fontSize:12,color:C.r,padding:"3px 0 3px 12px",borderLeft:`2px solid ${C.r}44`}}>{g}</div>)}
          </div>}
          {item.kol?.length>0&&<div style={{marginBottom:12}}>
            <div style={{...LB,marginBottom:6}}>KOL</div>
            {item.kol.map((k,i)=><div key={i} style={{fontSize:12,color:C.t3,padding:"2px 0"}}><b style={{color:C.t1}}>{k.n}</b> — {k.v}</div>)}
          </div>}
          <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
            {item.tks?.map((t,i)=><Tag key={i} color={C.ac} bg={C.acd}>${t}</Tag>)}
            {item.sig?.map((s,i)=><Tag key={`s${i}`}>{s}</Tag>)}
          </div>
        </div>
      )}

      {!expanded&&(
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {item.tks?.slice(0,5).map((t,i)=><Tag key={i} color={C.ac} bg={C.acd}>${t}</Tag>)}
        </div>
      )}
    </GlassCard>
  );
};

// ═══ L2 Card ═══
const L2Card=({item,index})=>(
  <GlassCard style={{animation:`fadeSlideIn 0.5s ease ${index*0.08}s both`}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
      <h3 style={{...HD,fontSize:15,fontWeight:700,color:C.t1}}>{item.name}</h3>
      <span style={{...MO,fontSize:12,fontWeight:700,color:C.g}}>Heat {item.heat}</span>
    </div>
    <HeatBar value={item.heat} color={C.g}/>
    <p style={{fontSize:12,color:C.t3,lineHeight:1.6,margin:"10px 0 8px"}}>{item.desc}</p>
    <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
      {item.tks?.slice(0,6).map((t,i)=><Tag key={i} color={C.ac} bg={C.acd}>${t}</Tag>)}
    </div>
  </GlassCard>
);

// ═══ Competitor Action Row ═══
const CompRow=({item})=>(
  <div style={{display:"grid",gridTemplateColumns:"220px 1fr",alignItems:"center",padding:"10px 0",borderBottom:"1px solid "+C.bd,fontSize:12}}>
    <div style={{fontWeight:600,color:C.t1}}>{item.what}</div>
    <div style={{color:C.t3}}>{item.detail}</div>
  </div>
);

// ═══ Loading skeleton ═══
const LoadingSkeleton=()=>(
  <div style={{background:C.bg,color:C.t1,fontFamily:"'DM Sans',sans-serif",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:24}}>
    <div style={{width:22,height:22,borderRadius:5,background:C.ac,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <span style={{fontSize:11,fontWeight:900,color:C.bg}}>a</span>
    </div>
    <div style={{...HD,fontSize:16,fontWeight:700,color:C.t2}}>Loading Listing Alpha...</div>
    <div style={{width:200,height:3,borderRadius:2,background:"rgba(255,255,255,0.05)",overflow:"hidden"}}>
      <div style={{width:"40%",height:"100%",borderRadius:2,background:C.ac,animation:"pulse 1.2s ease-in-out infinite"}}/>
    </div>
  </div>
);

// ═══ App ═══
export default function ListingAlpha(){
  const [D,setD]=useState(null);
  const [error,setError]=useState(null);

  useEffect(()=>{
    fetch("/data.json")
      .then(res=>{
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data=>setD(data))
      .catch(err=>setError(err.message));
  },[]);

  if(error) return(
    <div style={{background:C.bg,color:C.r,fontFamily:"'DM Sans',sans-serif",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>
      Failed to load data: {error}
    </div>
  );

  if(!D) return <LoadingSkeleton/>;

  return(
    <div style={{background:C.bg,color:C.t1,fontFamily:"'DM Sans',sans-serif",minHeight:"100vh",fontVariantNumeric:"tabular-nums"}}>

      {/* ── Nav ── */}
      <nav style={{position:"sticky",top:0,zIndex:50,background:"rgba(6,8,12,0.88)",backdropFilter:"blur(16px)",borderBottom:"1px solid "+C.bd}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 32px",display:"flex",justifyContent:"space-between",alignItems:"center",height:48}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:22,height:22,borderRadius:5,background:C.ac,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:11,fontWeight:900,color:C.bg}}>a</span>
            </div>
            <span style={{...HD,fontSize:14,fontWeight:800,color:C.t1,letterSpacing:"-0.03em"}}>Listing Alpha</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <span style={{...MO,fontSize:11,color:C.t4}}>{D.date}</span>
            <div style={{display:"flex",gap:4}}>
              <Tag color={C.ac} bg={C.acd}>TG {D.st.tg}群</Tag>
              <Tag>KOL {D.st.kol}</Tag>
              <Tag>信号 {D.st.cry}条</Tag>
            </div>
          </div>
        </div>
      </nav>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"24px 32px 60px"}}>

        {/* ── Summary ── */}
        <div style={{animation:"fadeSlideIn 0.5s ease both",marginBottom:32}}>
          <GlassCard style={{borderLeft:`3px solid ${C.ac}`}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:16}}>
              <div style={{flex:1}}>
                <div style={{...LB,marginBottom:8}}>市场概要</div>
                <p style={{fontSize:14,color:C.t2,lineHeight:1.7}}>{D.summary}</p>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",flexShrink:0,maxWidth:200}}>
                {D.topTk.map(t=><Tag key={t} color={C.ac} bg={C.acd}>${t}</Tag>)}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* ══════════════════════════════════════
           L3 — 重点关注
        ══════════════════════════════════════ */}
        <section style={{marginBottom:40}}>
          <SectionHeader icon="🔴" title="重点关注" count={D.L3.length} color={C.r} description="热度高 + 竞对已动 + OKX需决策 → 需要立即启动深度研究"/>
          <div style={{display:"grid",gridTemplateColumns:D.L3.length<=2?"1fr 1fr":"1fr 1fr",gap:12}}>
            {D.L3.map((item,i)=><L3Card key={i} item={item} index={i}/>)}
          </div>
        </section>

        {/* ── Competitor Actions ── */}
        <section style={{marginBottom:40}}>
          <GlassCard style={{borderColor:"rgba(231,76,90,0.1)"}}>
            <div style={{...LB,marginBottom:12}}>竞对动态</div>
            <div style={{display:"grid",gridTemplateColumns:"220px 1fr",padding:"0 0 8px",borderBottom:"1px solid "+C.bm,fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.04em"}}>
              <div>事件</div><div>详情</div>
            </div>
            {D.comp.map((c,i)=><CompRow key={i} item={c}/>)}
          </GlassCard>
        </section>

        {/* ══════════════════════════════════════
           L2 — 活跃讨论
        ══════════════════════════════════════ */}
        <section style={{marginBottom:40}}>
          <SectionHeader icon="🟢" title="活跃讨论" count={D.L2.length} color={C.g} description="多个信源交叉确认，持续追踪热度变化"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {D.L2.map((item,i)=><L2Card key={i} item={item} index={i}/>)}
          </div>
        </section>

        {/* ── KOL ── */}
        <section style={{marginBottom:40}}>
          <GlassCard>
            <div style={{...LB,marginBottom:12}}>KOL 关键观点</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0}}>
              {D.kols.map((k,i)=>(
                <div key={i} style={{padding:"8px 0",borderBottom:`1px solid ${C.bd}`,display:"flex",gap:8,alignItems:"flex-start"}}>
                  <span style={{fontSize:12,flexShrink:0,marginTop:1}}>
                    {k.s==="up"?"🟢":k.s==="dn"?"🔴":"⚪"}
                  </span>
                  <div>
                    <span style={{fontSize:12,fontWeight:700,color:C.t1}}>{k.n}</span>
                    <span style={{fontSize:12,color:C.t3,marginLeft:6}}>{k.v}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* ══════════════════════════════════════
           L1 — 候补池
        ══════════════════════════════════════ */}
        <section style={{marginBottom:40}}>
          <SectionHeader icon="⚪" title="候补池" count={D.L1.length} color={C.w} description="弱信号观察，等待更多信源确认"/>
          <GlassCard style={{padding:0}}>
            {D.L1.map((item,i)=>(
              <div key={i} style={{padding:"14px 20px",borderBottom:i<D.L1.length-1?"1px solid "+C.bd:"none",display:"grid",gridTemplateColumns:"180px 1fr 200px",gap:12,alignItems:"center",transition:"background 0.15s"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.02)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{fontSize:13,fontWeight:600,color:C.t2}}>{item.name}</div>
                <div style={{fontSize:12,color:C.t3,lineHeight:1.5}}>{item.desc}</div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"flex-end"}}>
                  {item.sig.map((s,j)=><Tag key={j} color={C.t4} bg="rgba(255,255,255,0.03)">{s}</Tag>)}
                </div>
              </div>
            ))}
          </GlassCard>
        </section>

        {/* ── Footer ── */}
        <footer style={{borderTop:"1px solid "+C.bd,paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:11,color:C.t4}}>Listing Alpha · OKX Listing Research</div>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <span style={{fontSize:11,color:C.t4}}>TG {D.st.msgs}条 · KOL {D.st.kol}个 · 律动</span>
            <span style={{fontSize:11,color:C.t4}}>Last updated: {D.date}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
