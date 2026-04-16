import { useState, useEffect } from "react";

const C={bg:"#1A1F2E",bg2:"#212738",t1:"#E2E2EE",t2:"#A8A8C0",t3:"#6E6E88",t4:"#555570",ac:"#23F7DD",acd:"rgba(35,247,221,0.07)",bd:"rgba(255,255,255,0.06)",bm:"rgba(255,255,255,0.08)",r:"#E74C5A",rg:"rgba(231,76,90,0.08)",rb:"rgba(231,76,90,0.15)",g:"#23F7DD",gg:"rgba(35,247,221,0.07)",y:"#FFB302",yg:"rgba(255,179,2,0.08)",p:"#A78BFA",pg:"rgba(167,139,250,0.1)",w:"#6E6E88"};
const MO={fontFamily:"'Space Mono',monospace"};
const HD={fontFamily:"'Manrope',sans-serif"};

// ══════ DEFAULT DATA (demo / fallback) ══════
const DB_DEFAULT={"2026-04-15":{st:{tg:28,kol:6,cry:213},summary:"\u5E02\u573A\u6982\u8981\uFF1A\u7F8E\u4F0A\u505C\u6218\u4FE1\u53F7\u5F3A\u5316risk-on\uFF0CBTC $75K\u3002ZEC SEC\u7ED3\u6848+ETF\u66B4\u6DA853%\uFF1BRAVE 6000%\u4F46\u7B79\u7801\u96C6\u4E2D\u3002",topTk:["RAVE","ZEC","FET","HYPE","ETH","DOG"],L3:[{name:"RAVE \u94ED\u6587\u7206\u53D1",urg:"critical",heat:92,desc:"24h\u6DA86000%\uFF0C3\u94B1\u5305\u630990%\u3002",act:"\u7ACB\u5373\u6DF1\u5EA6\u7814\u7A76\u3002",comp:["Bybit\u73B0\u8D27","Bitget\u5408\u7EA6"],gap:["OKX\u7A7A\u767D"],kol:[{n:"@CryptoWizard",v:"RAVE=new BONK"}],tks:["RAVE","BONK"],sig:["\u94FE\u4E0A\u5F02\u5E38"]},{name:"ZEC ETF\u50AC\u5316",urg:"high",heat:88,desc:"SEC\u7ED3\u6848+ETF\u53CC\u91CD\u5229\u597D\u3002",act:"\u8BC4\u4F30ETF\u6982\u7387\u3002",comp:["CB\u4E0A\u67B6"],gap:["\u5408\u7EA6\u6DF1\u5EA6\u4E0D\u8DB3"],kol:[],tks:["ZEC","XMR"],sig:["SEC"]},{name:"AI FET\u9886\u6DA8",urg:"high",heat:76,desc:"ASI\u63A8\u52A8FET\u3002",act:"\u8DDF\u8E2AASI\u3002",comp:["BN\u5168\u90E8ASI"],gap:["\u7F3AAI\u6307\u6570"],kol:[],tks:["FET"],sig:["ASI"]},{name:"Hyperliquid",urg:"high",heat:71,desc:"TVL $2B\u3002",act:"\u7814\u7A76\u751F\u6001\u3002",comp:["BN HYPE"],gap:["\u751F\u6001\u672A\u8986\u76D6"],kol:[],tks:["HYPE"],sig:["TVL"]}],comp:[{what:"Bybit RAVE",detail:"24h $8000\u4E07"},{what:"CB ZEC",detail:"SEC\u540E\u7ACB\u5373\u6062\u590D"},{what:"BN AI\u6307\u6570",detail:"FET/AGIX/OCEAN"}],L2:[{name:"RWA",heat:58,desc:"Ondo TVL\u65B0\u9AD8\u3002",tks:["ONDO"]},{name:"Meme DOG",heat:52,desc:"BTC Meme\u4E0A\u6DA8\u3002",tks:["DOG"]},{name:"DePIN",heat:45,desc:"\u7528\u6237\u589E\u957F\u3002",tks:["HNT"]},{name:"Restaking",heat:42,desc:"EigenLayer\u6269\u5C55\u3002",tks:["EIGEN"]}],kols:[{s:"up",n:"@CryptoWizard",v:"RAVE 6000% but 90% in 3 wallets"},{s:"dn",n:"@ChainAnalyst",v:"RAVE\u6781\u5371"},{s:"up",n:"@PrivacyMaxi",v:"ZEC+ETF"},{s:"up",n:"@DeFiDegen",v:"HYPE $2B"},{s:"dn",n:"@MacroBear",v:"2027\u964D\u606F"},{s:"up",n:"@ETFAnalyst",v:"ZEC ETF changer"}],L1:[{name:"Agentic Finance",desc:"HTTP 402",sig:["TG"]},{name:"\u91CF\u5B50\u6297\u6027",desc:"NIST",sig:["\u5B66\u672F"]},{name:"BTCFi",desc:"BTC DeFi",sig:["TVL"]}]},"2026-04-14":{st:{tg:26,kol:3,cry:187},summary:"BTC $73K\uFF0CBN\u4EE3\u5E01\u5316\u80A1\u7968\uFF0CRWA\u98D9\u5347\u3002ASI\u542F\u52A8\u3002",topTk:["ONDO","FET","ZEC","HYPE"],L3:[{name:"RWA\u4EE3\u5E01\u5316\u80A1\u7968",urg:"critical",heat:85,desc:"BN\u4E0A\u7EBF\u4EE3\u5E01\u5316\u80A1\u7968\u3002",act:"\u8BC4\u4F30OKX\u53EF\u884C\u6027\u3002",comp:["BN\u5DF2\u4E0A"],gap:["OKX\u65E0"],kol:[],tks:["ONDO"],sig:["BN"]},{name:"ASI\u542F\u52A8",urg:"high",heat:72,desc:"FET/AGIX/OCEAN\u5408\u5E76\u3002",act:"\u8DDF\u8E2A\u3002",comp:[],gap:[],kol:[],tks:["FET"],sig:["ASI"]}],comp:[{what:"BN\u4EE3\u5E01\u5316\u80A1\u7968",detail:"AAPL/TSLA"}],L2:[{name:"Hyperliquid",heat:62,desc:"TVL $1.8B\u3002",tks:["HYPE"]},{name:"DePIN",heat:40,desc:"\u673A\u6784\u5173\u6CE8\u3002",tks:["HNT"]}],kols:[{s:"up",n:"@RWA",v:"Massive"},{s:"up",n:"@AIxCrypto",v:"ASI confirmed"}],L1:[{name:"RAVE",desc:"TG\u8BA8\u8BBA",sig:["TG"]},{name:"ZEC",desc:"SEC\u4F20\u95FB",sig:["\u4F20\u95FB"]}]},"2026-04-13":{st:{tg:25,kol:2,cry:156},summary:"\u5468\u672BBTC $72K\u3002Hyperliquid $4.5B\u3002",topTk:["HYPE","HNT","BTC"],L3:[{name:"Hyperliquid",urg:"high",heat:68,desc:"$4.5B\u65E5\u4EA4\u6613\u3002",act:"\u7B5B\u9009\u9879\u76EE\u3002",comp:["BN HYPE"],gap:["\u751F\u6001\u672A\u8986\u76D6"],kol:[],tks:["HYPE"],sig:["\u751F\u6001"]}],comp:[{what:"BN HYPE",detail:"24h $2\u4EBF"}],L2:[{name:"DePIN",heat:38,desc:"\u878D\u8D44\u3002",tks:["IOTX"]},{name:"BTC Meme",heat:35,desc:"DOG\u3002",tks:["DOG"]}],kols:[{s:"up",n:"@DeFiDegen",v:"HyperEVM shipping"},{s:"n",n:"@MacroBear",v:"\u5468\u672B\u4F4E\u91CF"}],L1:[{name:"RWA",desc:"Ondo\u7A33\u5B9A",sig:["\u7A33"]},{name:"ASI",desc:"\u8BA8\u8BBA",sig:["\u65E9\u671F"]}]}};
const DATES_DEFAULT=["2026-04-15","2026-04-14","2026-04-13"];

const WEEKLY={period:"2026-04-09 ~ 04-15",kpis:[{label:"\u65B0\u589EL3",val:5,prev:2,unit:""},{label:"\u7ADE\u5BF9\u52A8\u4F5C",val:12,prev:8,unit:"\u6761"},{label:"\u4FE1\u53F7\u603B\u6570",val:213,prev:156,unit:"\u6761"},{label:"\u8FFD\u8E2A\u53D9\u4E8B",val:8,prev:6,unit:"\u4E2A"}],movers:[{name:"RAVE",from:"L1",to:"L3",heat:92,delta:"+62",type:"up"},{name:"ZEC",from:"L1",to:"L3",heat:88,delta:"+33",type:"up"},{name:"RWA",from:"L2",to:"L3",heat:85,delta:"+27",type:"up"},{name:"AI Agent",from:"L2",to:"L3",heat:76,delta:"+21",type:"up"},{name:"Hyperliquid",from:"L3",to:"L3",heat:71,delta:"+3",type:"stay"},{name:"DePIN",from:"L2",to:"L2",heat:45,delta:"+7",type:"stay"},{name:"Restaking",from:"L2",to:"L2",heat:42,delta:"-3",type:"down"}],events:[{date:"04-15",title:"RAVE\u7206\u53D16000%\uFF0CL3 Critical",color:"#E74C5A"},{date:"04-15",title:"ZEC SEC\u7ED3\u6848+ETF\u843D\u5730",color:"#E74C5A"},{date:"04-14",title:"BN\u4EE3\u5E01\u5316\u80A1\u7968",color:"#FFB302"},{date:"04-14",title:"ASI\u6574\u5408\u542F\u52A8",color:"#23F7DD"},{date:"04-13",title:"BN\u4E0A\u7EBFHYPE",color:"#FFB302"},{date:"04-11",title:"CB\u8003\u8651\u4E0A\u67B6ZEC",color:"#23F7DD"},{date:"04-10",title:"Ondo TVL $500M",color:"#23F7DD"},{date:"04-09",title:"DePIN\u878D\u8D44\u52A0\u901F",color:"#6E6E88"}]};

const MONTHLY={period:"2026-03-16 ~ 04-15",kpis:[{label:"\u8FFD\u8E2A\u53D9\u4E8B",val:12,prev:8,unit:"\u4E2A"},{label:"\u7D2F\u8BA1L3\u9884\u8B66",val:9,prev:4,unit:"\u4E2A"},{label:"\u7ADE\u5BF9\u52A8\u4F5C",val:38,prev:22,unit:"\u6761"},{label:"\u4FE1\u53F7\u603B\u6570",val:1840,prev:1200,unit:"\u6761"}],hits:[{name:"HYPE",desc:"\u63D0\u524D2\u5468\u53D1\u73B0\uFF0C\u6210\u529F\u4E0A\u5E01",heat:71},{name:"FET",desc:"ASI\u524D\u5DF2\u5E03\u5C40",heat:76},{name:"ONDO",desc:"RWA\u65E9\u671F\u8DDF\u8E2A",heat:58}],misses:[{name:"Pre-IPO",desc:"\u7ADE\u5BF9\u5DF2\u4E0A3\u4E2A\uFF0COKX\u8FD8\u5728\u8BC4\u4F30",heat:30},{name:"RAVE",desc:"\u4FE1\u53F7\u5230\u7206\u53D1\u53EA1\u5929",heat:92}],lifecycle:[{name:"Hyperliquid",days:30,level:"L3",phase:"\u6210\u719F\u671F",heat:[30,35,42,48,55,58,62,68,71]},{name:"AI Agent",days:18,level:"L3",phase:"\u7206\u53D1\u671F",heat:[40,42,45,50,55,60,65,70,76]},{name:"RWA",days:30,level:"L3",phase:"\u7206\u53D1\u671F",heat:[20,22,25,28,35,40,52,58,85]},{name:"ZEC",days:14,level:"L3",phase:"\u7206\u53D1\u671F",heat:[12,18,25,30,42,55,68,75,88]},{name:"DePIN",days:25,level:"L2",phase:"\u589E\u957F\u671F",heat:[15,18,20,22,28,32,35,40,45]},{name:"Pre-IPO",days:35,level:"L1",phase:"\u89C2\u5BDF\u671F",heat:[5,8,10,12,15,18,22,25,30]}]};

const WK_DETAILS=[
  {title:"\u65B0\u589EL3 \u2014 5\u4E2A\u53D9\u4E8B\u5347\u7EA7",items:[{name:"RAVE",level:"L3",detail:"L1 \u2192 L3",heat:92},{name:"ZEC",level:"L3",detail:"L1 \u2192 L3",heat:88},{name:"RWA",level:"L3",detail:"L2 \u2192 L3",heat:85},{name:"AI Agent",level:"L3",detail:"L2 \u2192 L3",heat:76},{name:"Hyperliquid",level:"L3",detail:"\u7EF4\u6301 L3",heat:71}]},
  {title:"\u7ADE\u5BF9\u52A8\u4F5C \u2014 12\u6761\u660E\u7EC6",items:[{name:"Bybit \u4E0A\u7EBF RAVE \u73B0\u8D27",detail:"24h $8000\u4E07"},{name:"Bitget \u5F00\u653E RAVE \u5408\u7EA6",detail:"50x\u6760\u6746"},{name:"Coinbase \u4E0A\u67B6 ZEC",detail:"SEC\u7ED3\u6848\u540E"},{name:"BN \u4EE3\u5E01\u5316\u80A1\u7968",detail:"AAPL/TSLA/NVDA"},{name:"BN \u4E0A\u7EBF HYPE",detail:"24h $2\u4EBF"},{name:"BN AI\u6307\u6570\u4EE3\u5E01",detail:"FET/AGIX/OCEAN"},{name:"Bybit HYPE\u5408\u7EA6",detail:"50x\u6760\u6746"},{name:"Bybit AI\u52A9\u624B",detail:"LLM\u4E0B\u5355"},{name:"Bitget Pre-IPO x2",detail:"\u65B0\u589E2\u4E2A"},{name:"Bybit Pre-IPO x1",detail:"\u65B0\u589E1\u4E2A"},{name:"BN Launchpool",detail:"\u65B0\u9879\u76EE"},{name:"CB \u91CD\u65B0\u4E0A\u67B6\u8BC4\u4F30",detail:"ZEC\u76F8\u5173"}]},
  {title:"\u4FE1\u53F7\u603B\u6570 \u2014 213\u6761\u660E\u7EC6",items:[{name:"TG\u7FA4\u4FE1\u53F7",detail:"142\u6761"},{name:"KOL\u63D0\u53CA",detail:"38\u6761"},{name:"\u94FE\u4E0A\u5F02\u5E38",detail:"18\u6761"},{name:"\u65B0\u95FB/\u5A92\u4F53",detail:"15\u6761"}]},
  {title:"\u8FFD\u8E2A\u53D9\u4E8B \u2014 8\u4E2A\u660E\u7EC6",items:[{name:"RAVE",level:"L3",heat:92},{name:"ZEC",level:"L3",heat:88},{name:"RWA",level:"L3",heat:85},{name:"AI Agent",level:"L3",heat:76},{name:"Hyperliquid",level:"L3",heat:71},{name:"BTC Meme",level:"L2",heat:52},{name:"DePIN",level:"L2",heat:45},{name:"Restaking",level:"L2",heat:42}]}
];
const MO_DETAILS=[
  {title:"\u8FFD\u8E2A\u53D9\u4E8B \u2014 12\u4E2A\u660E\u7EC6",items:[{name:"Hyperliquid",level:"L3",detail:"30\u5929",heat:71},{name:"AI Agent",level:"L3",detail:"18\u5929",heat:76},{name:"RWA",level:"L3",detail:"30\u5929",heat:85},{name:"ZEC",level:"L3",detail:"14\u5929",heat:88},{name:"RAVE",level:"L3",detail:"2\u5929",heat:92},{name:"BTC Meme",level:"L2",detail:"20\u5929",heat:52},{name:"DePIN",level:"L2",detail:"25\u5929",heat:45},{name:"Restaking",level:"L2",detail:"30\u5929",heat:42},{name:"Pre-IPO",level:"L1",detail:"35\u5929",heat:30},{name:"Agentic Finance",level:"L1",detail:"10\u5929",heat:15},{name:"BTCFi",level:"L1",detail:"12\u5929",heat:20},{name:"\u91CF\u5B50\u6297\u6027",level:"L1",detail:"8\u5929",heat:10}]},
  {title:"\u7D2F\u8BA1L3\u9884\u8B66 \u2014 9\u4E2A\u660E\u7EC6",items:[{name:"RAVE",level:"L3",detail:"04-15 \u5347\u7EA7",heat:92},{name:"ZEC",level:"L3",detail:"04-15 \u5347\u7EA7",heat:88},{name:"RWA",level:"L3",detail:"04-14 \u5347\u7EA7",heat:85},{name:"AI Agent",level:"L3",detail:"04-14 \u5347\u7EA7",heat:76},{name:"Hyperliquid",level:"L3",detail:"04-01 \u5347\u7EA7",heat:71},{name:"Meme\u5B63\u8282",detail:"03-28 \u5347\u7EA7\u540E\u56DE\u843D",heat:35},{name:"GameFi",detail:"03-22 \u540E\u56DE\u843D",heat:28},{name:"LSD 2.0",detail:"03-20 \u540E\u56DE\u843D",heat:22},{name:"Ordinals",detail:"03-18 \u540E\u56DE\u843D",heat:18}]},
  {title:"\u7ADE\u5BF9\u52A8\u4F5C \u2014 38\u6761\u660E\u7EC6",items:[{name:"Binance",detail:"14\u6761\u52A8\u4F5C"},{name:"Bybit",detail:"9\u6761\u52A8\u4F5C"},{name:"Bitget",detail:"7\u6761\u52A8\u4F5C"},{name:"Coinbase",detail:"5\u6761\u52A8\u4F5C"},{name:"OKX",detail:"3\u6761\u52A8\u4F5C"}]},
  {title:"\u4FE1\u53F7\u603B\u6570 \u2014 1840\u6761\u660E\u7EC6",items:[{name:"TG\u7FA4\u4FE1\u53F7",detail:"980\u6761"},{name:"KOL\u63D0\u53CA",detail:"420\u6761"},{name:"\u94FE\u4E0A\u5F02\u5E38",detail:"240\u6761"},{name:"\u65B0\u95FB/\u5A92\u4F53",detail:"200\u6761"}]}
];

const WL0=[
  {id:"zec",name:"ZEC",cat:"\u9690\u79C1\u5E01",level:"L3",heat:88,trend:[12,18,25,30,42,55,68,75,88],days:14,lastEvt:"SEC\u7ED3\u6848+ETF",tokens:["ZEC","XMR","SCRT"],events:[{date:"04-15",type:"critical",title:"SEC\u7ED3\u6848+ETF",desc:"\u5347\u7EA7L3"},{date:"04-14",type:"signal",title:"SEC\u4F20\u95FB",desc:"L1"},{date:"04-11",type:"comp",title:"CB\u8003\u8651\u4E0A\u67B6",desc:"\u5185\u90E8\u6D88\u606F"},{date:"04-08",type:"data",title:"\u94FE\u4E0A\u6D3B\u8DC3\u56DE\u5347",desc:"3\u6708\u65B0\u9AD8"},{date:"04-02",type:"signal",title:"AI\u7EB3\u5165",desc:"\u76D1\u7BA1\u4FE1\u53F7"}]},
  {id:"hyper",name:"Hyperliquid",cat:"Perp DEX",level:"L3",heat:71,trend:[30,35,42,48,55,58,62,68,71],days:21,lastEvt:"TVL $2B",tokens:["HYPE","PURR"],events:[{date:"04-15",type:"data",title:"TVL $2B",desc:"\u751F\u6001\u4E0A\u7EBF"},{date:"04-13",type:"comp",title:"BN HYPE",desc:"24h $2\u4EBF"},{date:"04-07",type:"signal",title:"\u7EB3\u5165",desc:"\u56E2\u961F\u8DDF\u8E2A"},{date:"03-28",type:"data",title:"TVL $1B",desc:"\u91CC\u7A0B\u7891"}]},
  {id:"rwa",name:"RWA",cat:"\u4EE3\u5E01\u5316",level:"L3",heat:85,trend:[20,22,25,28,35,40,52,58,85],days:30,lastEvt:"BN\u4EE3\u5E01\u5316\u80A1\u7968",tokens:["ONDO","MKR","COMP"],events:[{date:"04-14",type:"critical",title:"BN\u4EE3\u5E01\u5316\u80A1\u7968",desc:"\u5347\u7EA7L3"},{date:"04-10",type:"data",title:"Ondo $500M",desc:"\u65B0\u9AD8"},{date:"04-01",type:"signal",title:"AI\u68C0\u6D4B",desc:"\u8D44\u91D1\u6D41\u5165"}]},
  {id:"ai",name:"AI Agent",cat:"AI",level:"L3",heat:76,trend:[40,42,45,50,55,60,65,70,76],days:18,lastEvt:"FET +18%",tokens:["FET","AGIX","OCEAN","OLAS"],events:[{date:"04-15",type:"data",title:"FET +18%",desc:"ASI\u63A8\u52A8"},{date:"04-14",type:"critical",title:"ASI\u542F\u52A8",desc:"\u5408\u5E76"},{date:"04-05",type:"comp",title:"BN ASI",desc:"\u7ADE\u5BF9\u5E03\u5C40"}]},
  {id:"depin",name:"DePIN",cat:"\u57FA\u7840\u8BBE\u65BD",level:"L2",heat:45,trend:[15,18,20,22,28,32,35,40,45],days:25,lastEvt:"\u7528\u6237\u589E\u957F",tokens:["HNT","MOBILE","DIMO"],events:[{date:"04-13",type:"data",title:"\u878D\u8D44",desc:"\u673A\u6784\u5165\u573A"},{date:"04-05",type:"signal",title:"AI\u68C0\u6D4B",desc:"Helium +35%"},{date:"03-20",type:"signal",title:"\u7EB3\u5165",desc:"\u591A\u6E90\u786E\u8BA4"}]},
  {id:"preipo",name:"Pre-IPO",cat:"\u7279\u6B8A\u8D44\u4EA7",level:"L1",heat:30,trend:[5,8,10,12,15,18,22,25,30],days:35,lastEvt:"\u7ADE\u5BF9\u5E03\u5C40",tokens:[],events:[{date:"04-10",type:"comp",title:"\u7ADE\u5BF9\u5E03\u5C40",desc:"Bitget/Bybit"},{date:"03-25",type:"signal",title:"\u7EB3\u5165",desc:"AI\u63A8\u8350"}]},
  {id:"meme",name:"BTC Meme",cat:"Meme",level:"L2",heat:52,trend:[10,15,20,25,30,35,40,48,52],days:20,lastEvt:"DOG\u4E0A\u6DA8",tokens:["DOG","PUPS","ORDI"],events:[{date:"04-15",type:"data",title:"DOG\u4E0A\u6DA8",desc:"BTC Meme"},{date:"04-08",type:"signal",title:"\u7EB3\u5165",desc:"\u70ED\u5EA6\u4E0A\u5347"}]},
  {id:"restaking",name:"Restaking",cat:"DeFi",level:"L2",heat:42,trend:[35,38,40,42,44,45,44,43,42],days:30,lastEvt:"LRT\u7ADE\u4E89",tokens:["EIGEN","ETHFI","REZ"],events:[{date:"04-12",type:"data",title:"LRT\u7ADE\u4E89",desc:"\u6536\u76CA\u5206\u5316"},{date:"03-20",type:"signal",title:"\u7EB3\u5165",desc:"\u751F\u6001\u6269\u5C55"}]}
];

// ══════ COMPONENTS ══════
const Tag=({children,color=C.t4,bg="rgba(255,255,255,0.04)"})=> <span style={{display:"inline-block",padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:600,color,background:bg,letterSpacing:"0.02em",whiteSpace:"nowrap"}}>{children}</span>;
const HeatBar=({value,color})=> <div style={{width:"100%",height:3,borderRadius:2,background:"rgba(255,255,255,0.05)",overflow:"hidden"}}><div style={{width:value+"%",height:"100%",borderRadius:2,background:color,boxShadow:"0 0 8px "+color+"44"}}/></div>;
const UB=({level})=>{const m={critical:{l:"CRITICAL",c:"#fff",bg:C.r},high:{l:"HIGH",c:C.r,bg:C.rg},medium:{l:"MEDIUM",c:C.g,bg:C.gg}};const s=m[level]||m.medium;return (<span style={{display:"inline-block",padding:"2px 8px",borderRadius:4,fontSize:9,fontWeight:700,letterSpacing:"0.08em",color:s.c,background:s.bg,textTransform:"uppercase"}}>{s.l}</span>)};
const Glass=({children,style={},onClick})=> <div onClick={onClick} style={{background:"rgba(20,25,35,0.7)",backdropFilter:"blur(12px)",border:"1px solid "+C.bm,borderRadius:12,padding:20,position:"relative",overflow:"hidden",cursor:onClick?"pointer":"default",transition:"all 0.2s",...style}}><div style={{position:"relative",zIndex:1}}>{children}</div></div>;
const Spark=({data,color=C.ac,w=60,h=20})=>{const mx=Math.max(...data)||1;const pts=data.map((v,i)=>[i/(data.length-1)*w,h-v/mx*h]);return (<svg width={w} height={h} style={{display:"block"}}><path d={"M"+pts.map(p=>p[0]+","+p[1]).join("L")} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>)};
const MiniBar=({data,w=100,h=20})=>{const mx=Math.max(...data)||1;const bw=Math.max(2,Math.floor(w/data.length)-1);return (<div style={{display:"flex",alignItems:"flex-end",gap:1,height:h}}>{data.map((v,i)=> <div key={i} style={{width:bw,borderRadius:"1px 1px 0 0",height:Math.max(2,Math.round(v/mx*h)),background:v>=70?C.r:v>=50?C.ac:"rgba(255,255,255,0.15)",opacity:0.7}}/>)}</div>)};
const LvlTag=({level})=>{const c=level==="L3"?C.r:level==="L2"?C.g:C.t4;const bg=level==="L3"?C.rg:level==="L2"?C.gg:"rgba(255,255,255,0.04)";return <span style={{fontSize:10,fontWeight:700,color:c,background:bg,padding:"2px 6px",borderRadius:4}}>{level}</span>};
const BackBtn=({onClick,label})=> <button onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:600,color:C.t3,cursor:"pointer",padding:"6px 12px",borderRadius:6,border:"1px solid "+C.bm,background:"none",marginBottom:20,fontFamily:"'DM Sans'"}}>{"\u2190"} {label}</button>;

const KpiCard=({label,val,prev,unit,onClick})=>{const d=val-prev;const pct=prev?Math.round(Math.abs(d)/prev*100):0;const up=d>0;return (<div onClick={onClick} style={{background:"rgba(20,25,35,0.7)",backdropFilter:"blur(12px)",border:"1px solid "+C.bm,borderRadius:12,padding:"20px 16px",textAlign:"center",cursor:"pointer",transition:"all 0.2s",position:"relative"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.bm;e.currentTarget.style.transform="none"}}>
  <div style={{...MO,fontSize:28,fontWeight:700,color:C.t1,marginBottom:4}}>{val}{unit&&<span style={{fontSize:14,color:C.t3}}>{unit}</span>}</div>
  <div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>{label}</div>
  <div style={{fontSize:11,fontWeight:600,color:up?C.g:C.r}}>{up?"\u2191":"\u2193"} {pct}%</div>
  <div style={{position:"absolute",top:8,right:10,fontSize:10,color:C.t4}}>{"\u2192"}</div>
</div>)};

// ══════ KPI DETAIL PAGE ══════
const KpiDetailPage=({data,onBack,backLabel,onItemClick})=> (<div>
  <BackBtn onClick={onBack} label={backLabel}/>
  <h2 style={{...HD,fontSize:22,fontWeight:800,color:C.t1,margin:"0 0 20px"}}>{data.title}</h2>
  <Glass style={{padding:0}}>
    {data.items.map((it,i)=> {const clickable=!!it.level&&onItemClick;return (<div key={i} onClick={clickable?()=>onItemClick(it.name):undefined} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 20px",borderBottom:i<data.items.length-1?"1px solid "+C.bd:"none",cursor:clickable?"pointer":"default",transition:"background 0.15s"}} onMouseEnter={e=>{if(clickable)e.currentTarget.style.background="rgba(255,255,255,0.02)"}} onMouseLeave={e=>{if(clickable)e.currentTarget.style.background="transparent"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {it.level&&<LvlTag level={it.level}/>}
        <span style={{fontSize:14,fontWeight:600,color:C.t1}}>{it.name}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {it.detail&&<span style={{fontSize:12,color:C.t3}}>{it.detail}</span>}
        {it.heat!==undefined&&<span style={{...MO,fontSize:12,fontWeight:700,color:it.heat>=70?C.r:it.heat>=50?C.g:C.t3}}>Heat {it.heat}</span>}
        {clickable&&<span style={{fontSize:10,color:C.t4}}>{"\u2192"}</span>}
      </div>
    </div>)})}
  </Glass>
</div>);

// ══════ L3/L2 CARDS ══════
const L3Card=({item})=>{const[o,setO]=useState(false);return (<Glass onClick={()=>setO(!o)} style={{borderColor:item.urg==="critical"?C.rb:C.bm,cursor:"pointer"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><UB level={item.urg}/><span style={{...MO,fontSize:11,color:C.r,fontWeight:700}}>Heat {item.heat}</span></div><h3 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{item.name}</h3></div><div style={{...MO,width:44,height:44,borderRadius:10,background:"linear-gradient(135deg,"+C.rg+",transparent)",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid "+C.rb,fontSize:15,fontWeight:700,color:C.r,flexShrink:0}}>{item.heat}</div></div><HeatBar value={item.heat} color={C.r}/><p style={{fontSize:13,color:C.t2,lineHeight:1.6,margin:"10px 0"}}>{item.desc}</p><div style={{background:C.rg,borderRadius:8,padding:"8px 12px",marginBottom:10,border:"1px solid rgba(231,76,90,0.1)"}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginBottom:2}}>{"\u5EFA\u8BAE\u884C\u52A8"}</div><div style={{fontSize:12,fontWeight:600,color:C.r,lineHeight:1.5}}>{item.act}</div></div>{o&&<div>{item.comp?.length>0&&<div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginBottom:4}}>{"\u7ADE\u5BF9"}</div>{item.comp.map((a,i)=> <div key={i} style={{fontSize:12,color:C.t2,padding:"2px 0 2px 10px",borderLeft:"2px solid "+C.rb}}>{a}</div>)}</div>}{item.gap?.length>0&&<div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginBottom:4}}>OKX{"\u7F3A\u53E3"}</div>{item.gap.map((g,i)=> <div key={i} style={{fontSize:12,color:C.r,padding:"2px 0 2px 10px",borderLeft:"2px solid "+C.rb}}>{g}</div>)}</div>}<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{item.tks?.map((t,i)=> <Tag key={i} color={C.ac} bg={C.acd}>${t}</Tag>)}{item.sig?.map((s,i)=> <Tag key={"s"+i}>{s}</Tag>)}</div></div>}{!o&&<div style={{display:"flex",gap:4}}>{item.tks?.slice(0,4).map((t,i)=> <Tag key={i} color={C.ac} bg={C.acd}>${t}</Tag>)}</div>}</Glass>)};
const L2Card=({item})=> <Glass><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><h3 style={{...HD,fontSize:14,fontWeight:700,color:C.t1,margin:0}}>{item.name}</h3><span style={{...MO,fontSize:12,fontWeight:700,color:C.g}}>Heat {item.heat}</span></div><HeatBar value={item.heat} color={C.g}/><p style={{fontSize:12,color:C.t3,lineHeight:1.5,margin:"8px 0 6px"}}>{item.desc}</p><div style={{display:"flex",gap:4}}>{item.tks?.map((t,i)=> <Tag key={i} color={C.ac} bg={C.acd}>${t}</Tag>)}</div></Glass>;

// ══════ PAGE: DAILY ══════
const PageDaily=({D})=> <div>
  <div style={{marginBottom:28}}><Glass style={{borderLeft:"3px solid "+C.ac}}><div style={{display:"flex",alignItems:"flex-start",gap:16}}><div style={{flex:1}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>{"\u5E02\u573A\u6982\u8981"}</div><p style={{fontSize:14,color:C.t2,lineHeight:1.7,margin:0}}>{D.summary}</p></div><div style={{display:"flex",gap:6,flexWrap:"wrap",flexShrink:0,maxWidth:180}}>{D.topTk.map(t=> <Tag key={t} color={C.ac} bg={C.acd}>${t}</Tag>)}</div></div></Glass></div>
  {D.L3?.length>0&&<section style={{marginBottom:36}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:18}}>{"\uD83D\uDD34"}</span><h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{"\u91CD\u70B9\u5173\u6CE8"}</h2><span style={{...MO,fontSize:12,fontWeight:700,color:C.r,background:C.rg,padding:"2px 8px",borderRadius:4}}>{D.L3.length}</span></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{D.L3.map((item,i)=> <L3Card key={i} item={item}/>)}</div></section>}
  {D.comp?.length>0&&<section style={{marginBottom:36}}><Glass style={{borderColor:"rgba(231,76,90,0.1)"}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>{"\u7ADE\u5BF9\u52A8\u6001"}</div>{D.comp.map((c,i)=> <div key={i} style={{display:"grid",gridTemplateColumns:"200px 1fr",padding:"8px 0",borderBottom:"1px solid "+C.bd,fontSize:12}}><div style={{fontWeight:600,color:C.t1}}>{c.what}</div><div style={{color:C.t3}}>{c.detail}</div></div>)}</Glass></section>}
  {D.L2?.length>0&&<section style={{marginBottom:36}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:18}}>{"\uD83D\uDFE2"}</span><h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{"\u6D3B\u8DC3\u8BA8\u8BBA"}</h2><span style={{...MO,fontSize:12,fontWeight:700,color:C.g,background:C.gg,padding:"2px 8px",borderRadius:4}}>{D.L2.length}</span></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{D.L2.map((item,i)=> <L2Card key={i} item={item}/>)}</div></section>}
  {D.kols?.length>0&&<section style={{marginBottom:36}}><Glass><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>KOL</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>{D.kols.map((k,i)=> <div key={i} style={{padding:"6px 0",borderBottom:"1px solid "+C.bd,display:"flex",gap:8}}><span style={{fontSize:12}}>{k.s==="up"?"\uD83D\uDFE2":k.s==="dn"?"\uD83D\uDD34":"\u26AA"}</span><div><span style={{fontSize:12,fontWeight:700,color:C.t1}}>{k.n}</span><span style={{fontSize:12,color:C.t3,marginLeft:6}}>{k.v}</span></div></div>)}</div></Glass></section>}
  {D.L1?.length>0&&<section style={{marginBottom:36}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:18}}>{"\u26AA"}</span><h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{"\u5019\u8865\u6C60"}</h2></div><Glass style={{padding:0}}>{D.L1.map((it,i)=> <div key={i} style={{padding:"12px 20px",borderBottom:i<D.L1.length-1?"1px solid "+C.bd:"none",display:"grid",gridTemplateColumns:"160px 1fr 120px",gap:12,alignItems:"center"}}><div style={{fontSize:13,fontWeight:600,color:C.t2}}>{it.name}</div><div style={{fontSize:12,color:C.t3}}>{it.desc}</div><div style={{display:"flex",gap:4,justifyContent:"flex-end"}}>{(it.sig||[]).map((s,j)=> <Tag key={j} color={C.t4} bg="rgba(255,255,255,0.03)">{s}</Tag>)}</div></div>)}</Glass></section>}
</div>;

// ══════ PAGE: WEEKLY ══════
const PageWeekly=({data,onKpi})=> <div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:32}}>{data.kpis.map((k,i)=> <KpiCard key={i} {...k} onClick={()=>onKpi(i)}/>)}</div>
  <section style={{marginBottom:32}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:16}}>{"\uD83D\uDD04"}</span><h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{"\u53D9\u4E8B\u7B49\u7EA7\u53D8\u52A8"}</h2></div><Glass style={{padding:0}}><div style={{display:"grid",gridTemplateColumns:"1.5fr 0.7fr 0.4fr 0.8fr 0.5fr",gap:8,padding:"10px 20px",borderBottom:"1px solid "+C.bm,fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em"}}><div>{"\u53D9\u4E8B"}</div><div>{"\u53D8\u52A8"}</div><div>Heat</div><div>{"\u8D8B\u52BF"}</div><div>Delta</div></div>{data.movers.map((m,i)=>{const arrow=m.type==="up"?"\u2191":m.type==="down"?"\u2193":"\u2192";const ac2=m.type==="up"?C.g:m.type==="down"?C.r:C.t4;const hc=m.heat>=70?C.r:m.heat>=50?C.g:C.t3;return (<div key={i} style={{display:"grid",gridTemplateColumns:"1.5fr 0.7fr 0.4fr 0.8fr 0.5fr",gap:8,padding:"10px 20px",borderBottom:i<data.movers.length-1?"1px solid "+C.bd:"none",alignItems:"center",fontSize:13}}><div style={{fontWeight:600,color:C.t1}}>{m.name}</div><div><span style={{...MO,fontSize:11,color:C.t3}}>{m.from}</span><span style={{color:ac2,margin:"0 4px"}}>{arrow}</span><span style={{...MO,fontSize:11,fontWeight:700,color:ac2}}>{m.to}</span></div><div style={{...MO,fontWeight:700,color:hc}}>{m.heat}</div><div><HeatBar value={m.heat} color={hc}/></div><div style={{...MO,fontSize:12,fontWeight:700,color:m.type==="down"?C.r:C.g}}>{m.delta}</div></div>)})}</Glass></section>
  <section style={{marginBottom:32}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:16}}>{"\uD83D\uDDD3"}</span><h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{"\u672C\u5468\u4E8B\u4EF6"}</h2></div><Glass>{data.events.map((ev,i)=> <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"10px 0",borderBottom:i<data.events.length-1?"1px solid "+C.bd:"none"}}><div style={{width:8,height:8,borderRadius:"50%",background:ev.color,marginTop:4,flexShrink:0}}/><div style={{...MO,fontSize:11,color:C.t4,width:48,flexShrink:0}}>{ev.date}</div><div style={{fontSize:13,color:C.t1,fontWeight:500}}>{ev.title}</div></div>)}</Glass></section>
</div>;

// ══════ PAGE: MONTHLY ══════
const PageMonthly=({data,onKpi})=> <div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:32}}>{data.kpis.map((k,i)=> <KpiCard key={i} {...k} onClick={()=>onKpi(i)}/>)}</div>
  <section style={{marginBottom:32}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><div><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><span style={{fontSize:16}}>{"\u2705"}</span><h2 style={{...HD,fontSize:16,fontWeight:800,color:C.g,margin:0}}>{"\u547D\u4E2D"} ({data.hits.length})</h2></div>{data.hits.map((h,i)=> <Glass key={i} style={{marginBottom:8,borderColor:"rgba(35,247,221,0.12)"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{...HD,fontSize:14,fontWeight:700,color:C.t1}}>{h.name}</span><span style={{...MO,fontSize:11,fontWeight:700,color:C.g}}>Heat {h.heat}</span></div><p style={{fontSize:12,color:C.t3,margin:0,lineHeight:1.5}}>{h.desc}</p></Glass>)}</div><div><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><span style={{fontSize:16}}>{"\u274C"}</span><h2 style={{...HD,fontSize:16,fontWeight:800,color:C.r,margin:0}}>{"\u9519\u8FC7"} ({data.misses.length})</h2></div>{data.misses.map((m,i)=> <Glass key={i} style={{marginBottom:8,borderColor:C.rb}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{...HD,fontSize:14,fontWeight:700,color:C.t1}}>{m.name}</span><span style={{...MO,fontSize:11,fontWeight:700,color:C.r}}>Heat {m.heat}</span></div><p style={{fontSize:12,color:C.t3,margin:0,lineHeight:1.5}}>{m.desc}</p></Glass>)}</div></div></section>
  <section style={{marginBottom:32}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:16}}>{"\uD83C\uDF00"}</span><h2 style={{...HD,fontSize:18,fontWeight:800,color:C.t1,margin:0}}>{"\u53D9\u4E8B\u751F\u547D\u5468\u671F"}</h2></div><Glass style={{padding:0}}><div style={{display:"grid",gridTemplateColumns:"1.2fr 0.5fr 0.4fr 0.5fr 1fr",gap:8,padding:"10px 20px",borderBottom:"1px solid "+C.bm,fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em"}}><div>{"\u53D9\u4E8B"}</div><div>{"\u8FFD\u8E2A"}</div><div>{"\u7B49\u7EA7"}</div><div>{"\u9636\u6BB5"}</div><div>{"\u8D8B\u52BF"}</div></div>{data.lifecycle.map((lc,i)=> (<div key={i} style={{display:"grid",gridTemplateColumns:"1.2fr 0.5fr 0.4fr 0.5fr 1fr",gap:8,padding:"12px 20px",borderBottom:i<data.lifecycle.length-1?"1px solid "+C.bd:"none",alignItems:"center"}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{lc.name}</div><div style={{...MO,fontSize:12,color:C.t2}}>{lc.days}{"\u5929"}</div><div><LvlTag level={lc.level}/></div><div style={{fontSize:12,color:C.t3}}>{lc.phase}</div><div><MiniBar data={lc.heat} w={100} h={20}/></div></div>))}</Glass></section>
</div>;

// ══════ PAGE: WATCHLIST ══════
const PageWL=({wl,onOpen})=> <div>
  <div style={{marginBottom:24}}>
    <h2 style={{...HD,fontSize:22,fontWeight:800,color:C.t1,marginBottom:4}}>{"\u957F\u671F\u8FFD\u8E2A"}</h2>
    <p style={{fontSize:13,color:C.t3,margin:0}}>AI {"\u81EA\u52A8\u63A8\u8350\u7EB3\u5165\uFF0C\u6301\u7EED\u6DF1\u5EA6\u8DDF\u8E2A"}</p>
  </div>
  {wl.map((w,i)=>{const hc=w.heat>=70?C.r:w.heat>=50?C.g:C.t3;return (<div key={i} onClick={()=>onOpen(w.id)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0",borderBottom:"1px solid "+C.bd,cursor:"pointer",transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.02)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
    <div style={{display:"flex",alignItems:"center",gap:14,flex:1}}>
      <LvlTag level={w.level}/>
      <div>
        <div style={{fontSize:15,fontWeight:700,color:C.t1}}>{w.name}</div>
        <div style={{fontSize:11,color:C.t3,marginTop:2}}>{w.cat} {"\u00B7"} {w.days}{"\u5929"}</div>
      </div>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:16}}>
      <Spark data={w.trend} color={hc} w={50} h={18}/>
      <div style={{...MO,fontSize:14,fontWeight:700,color:hc,width:50,textAlign:"right"}}>{w.heat}</div>
      <div style={{fontSize:10,color:C.t4}}>{"\u2192"}</div>
    </div>
  </div>)})}
</div>;

// ══════ PAGE: TIMELINE ══════
const PageTL=({item,onBack})=>{const hc=item.heat>=70?C.r:item.heat>=50?C.g:C.t3;return (<div>
  <BackBtn onClick={onBack} label="Watchlist"/>
  <div style={{marginBottom:28}}><h1 style={{...HD,fontSize:28,fontWeight:800,color:C.t1,margin:"0 0 8px"}}>{item.name}</h1><div style={{display:"flex",gap:8}}><Tag color={C.t2} bg="rgba(255,255,255,0.06)">{item.cat}</Tag><LvlTag level={item.level}/></div></div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:28}}>
    <Glass style={{textAlign:"center",padding:16}}><div style={{...MO,fontSize:24,fontWeight:700,color:hc}}>{item.heat}</div><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginTop:4}}>{"\u70ED\u5EA6"}</div></Glass>
    <Glass style={{textAlign:"center",padding:16}}><div style={{...MO,fontSize:24,fontWeight:700,color:C.t1}}>{item.days}<span style={{fontSize:12,color:C.t3}}>{"\u5929"}</span></div><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginTop:4}}>{"\u8FFD\u8E2A"}</div></Glass>
    <Glass style={{textAlign:"center",padding:16}}><div style={{...MO,fontSize:24,fontWeight:700,color:C.t1}}>{item.events.length}</div><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginTop:4}}>{"\u4E8B\u4EF6"}</div></Glass>
    <Glass style={{textAlign:"center",padding:16}}><div style={{fontSize:22}}>{item.trend[item.trend.length-1]>item.trend[item.trend.length-2]?"\u2197\uFE0F":"\u2198\uFE0F"}</div><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",marginTop:4}}>{"\u8D8B\u52BF"}</div></Glass>
  </div>
  {item.tokens?.length>0&&<div style={{marginBottom:24}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>{"\u5173\u8054\u4EE3\u5E01"}</div><div style={{display:"flex",gap:6}}>{item.tokens.map((t,i)=> <Tag key={i} color={C.ac} bg={C.acd}>${t}</Tag>)}</div></div>}
  <Glass style={{marginBottom:24}}><div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>{"\u70ED\u5EA6\u8D8B\u52BF"}</div><div style={{display:"flex",alignItems:"flex-end",gap:3,height:60}}>{item.trend.map((v,i)=>{const mx=Math.max(...item.trend);return (<div key={i} style={{flex:1,borderRadius:"3px 3px 0 0",height:Math.max(3,Math.round(v/mx*52)),background:v>=70?C.r:v>=50?C.ac:"rgba(255,255,255,0.1)"}}/>)})}</div></Glass>
  <div style={{fontSize:10,fontWeight:600,color:C.t4,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:12}}>{"\u4E8B\u4EF6\u65F6\u95F4\u7EBF"}</div>
  {item.events.map((ev,i)=>{const dc=ev.type==="critical"?C.r:ev.type==="comp"?C.y:ev.type==="data"?C.ac:C.w;return (<div key={i} style={{position:"relative",paddingLeft:28,paddingBottom:i<item.events.length-1?20:0}}><div style={{position:"absolute",left:0,top:5,width:12,height:12,borderRadius:"50%",border:"2px solid "+dc,background:C.bg}}/>{i<item.events.length-1&&<div style={{position:"absolute",left:5,top:18,width:2,bottom:0,background:"rgba(255,255,255,0.05)"}}/>}<div style={{...MO,fontSize:10,color:C.t4,marginBottom:2}}>{ev.date}</div><div style={{fontSize:14,fontWeight:700,color:C.t1,marginBottom:2}}>{ev.title}</div><div style={{fontSize:12,color:C.t3,lineHeight:1.5}}>{ev.desc}</div></div>)})}
  <div style={{marginTop:32,display:"flex",gap:12}}>
    <Glass style={{flex:1,opacity:0.5}}><div style={{fontSize:12,fontWeight:600,color:C.t4}}>{"\uD83D\uDCCE \u7814\u62A5\u94FE\u63A5"}</div><p style={{fontSize:11,color:C.t4,margin:"6px 0 0"}}>{"\u6682\u65E0\uFF0C\u540E\u7EED\u63A5\u5165"}</p></Glass>
    <Glass style={{flex:1,opacity:0.5}}><div style={{fontSize:12,fontWeight:600,color:C.t4}}>{"\uD83D\uDCDD \u56E2\u961F\u5907\u6CE8"}</div><p style={{fontSize:11,color:C.t4,margin:"6px 0 0"}}>{"\u6682\u65E0"}</p></Glass>
  </div>
</div>)};

// ══════ SELECT STYLE ══════
const SEL={...MO,fontSize:12,color:C.t1,fontWeight:700,padding:"5px 28px 5px 10px",background:"rgba(255,255,255,0.04)",border:"1px solid "+C.bm,borderRadius:6,cursor:"pointer",appearance:"none",WebkitAppearance:"none",backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='10' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236E6E88' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")",backgroundRepeat:"no-repeat",backgroundPosition:"right 8px center",outline:"none"};

// ══════ APP ══════
export default function App(){
  const[tab,setTab]=useState("daily");
  const[dateIdx,setDateIdx]=useState(0);
  const[tlId,setTlId]=useState(null);
  const[wl,setWl]=useState(WL0);
  const[kpiIdx,setKpiIdx]=useState(null);
  const[kpiSrc,setKpiSrc]=useState(null);
  const[liveData,setLiveData]=useState(null);

  // Load data.json — merge all historical days
  useEffect(()=>{
    fetch("/data.json").then(r=>r.ok?r.json():null).then(d=>{if(d)setLiveData(d)}).catch(()=>{});
  },[]);

  // Merge live data into DB (supports multi-day structure)
  const DB = {...DB_DEFAULT};
  let DATES = [...DATES_DEFAULT];
  if(liveData){
    if(liveData.days){
      // Multi-day format: merge each day
      Object.entries(liveData.days).forEach(([date, dayData])=>{
        DB[date] = dayData;
      });
      // Use dates from data.json + defaults, deduplicate
      const allDates = [...new Set([...(liveData.dates||[]), ...DATES_DEFAULT])];
      DATES = allDates.sort().reverse();
    } else if(liveData.date){
      // Legacy single-day format
      DB[liveData.date] = liveData;
      if(!DATES.includes(liveData.date)) DATES = [liveData.date, ...DATES];
      else DATES = [liveData.date, ...DATES.filter(d=>d!==liveData.date)];
    }
  }

  const D=DB[DATES[dateIdx]];
  const tlItem=tlId?wl.find(w=>w.id===tlId):null;
  const sorted=[...wl].sort((a,b)=>b.heat-a.heat);

  const weekly = (liveData&&liveData.weekly) || WEEKLY;
  const monthly = (liveData&&liveData.monthly) || MONTHLY;
  const wkDetails = (liveData&&liveData.wkDetails) || WK_DETAILS;
  const moDetails = (liveData&&liveData.moDetails) || MO_DETAILS;

  const periods=[{k:"daily",l:"Daily"},{k:"weekly",l:"Weekly"},{k:"monthly",l:"Monthly"}];
  const showKpiDetail=kpiIdx!==null&&kpiSrc;
  const kpiData=showKpiDetail?(kpiSrc==="wk"?wkDetails[kpiIdx]:moDetails[kpiIdx]):null;

  return (<div style={{background:C.bg,color:C.t1,fontFamily:"'DM Sans',sans-serif",minHeight:"100vh",fontVariantNumeric:"tabular-nums"}}>
    <nav style={{position:"sticky",top:0,zIndex:50,background:"rgba(17,22,32,0.92)",backdropFilter:"blur(16px)",borderBottom:"1px solid "+C.bd}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"0 32px",display:"flex",justifyContent:"space-between",alignItems:"center",height:48}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:22,height:22,borderRadius:5,background:C.ac,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:C.bg}}>a</div><span style={{...HD,fontSize:14,fontWeight:800,color:C.t1,letterSpacing:"-0.03em"}}>Listing Alpha</span></div>
          <div style={{display:"flex",gap:1,background:"rgba(255,255,255,0.03)",borderRadius:6,padding:2}}>{periods.map(p=> <button key={p.k} onClick={()=>{setTab(p.k);setTlId(null);setKpiIdx(null);setKpiSrc(null)}} style={{padding:"4px 14px",borderRadius:4,fontSize:12,fontWeight:600,color:tab===p.k&&!showKpiDetail?C.t1:C.t4,background:tab===p.k&&!showKpiDetail?"rgba(255,255,255,0.07)":"none",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.15s"}}>{p.l}</button>)}</div>
          <button onClick={()=>{setTab("wl");setTlId(null);setKpiIdx(null);setKpiSrc(null)}} style={{padding:"4px 14px",borderRadius:4,fontSize:12,fontWeight:600,color:tab==="wl"?C.t1:C.t4,background:tab==="wl"?"rgba(255,255,255,0.07)":"none",border:"1px solid "+(tab==="wl"?C.bm:"transparent"),cursor:"pointer",fontFamily:"'DM Sans'"}}>Watchlist</button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          {tab==="daily"&&!showKpiDetail&&<select value={dateIdx} onChange={e=>setDateIdx(Number(e.target.value))} style={SEL}>{DATES.map((d,i)=> <option key={i} value={i} style={{background:C.bg2}}>{d}</option>)}</select>}
          {tab==="weekly"&&!showKpiDetail&&<select style={SEL}><option style={{background:C.bg2}}>W15: 04-09 ~ 04-15</option><option style={{background:C.bg2}}>W14: 04-02 ~ 04-08</option><option style={{background:C.bg2}}>W13: 03-26 ~ 04-01</option></select>}
          {tab==="monthly"&&!showKpiDetail&&<select style={SEL}><option style={{background:C.bg2}}>2026-04</option><option style={{background:C.bg2}}>2026-03</option><option style={{background:C.bg2}}>2026-02</option></select>}
        </div>
      </div>
    </nav>
    <div style={{maxWidth:1400,margin:"0 auto",padding:"24px 32px 60px"}}>
      {showKpiDetail&&kpiData&&<KpiDetailPage data={kpiData} onBack={()=>{setKpiIdx(null);setKpiSrc(null)}} backLabel={kpiSrc==="wk"?"Weekly":"Monthly"} onItemClick={(name)=>{const match=wl.find(w=>w.name===name);if(match){setTab("wl");setTlId(match.id);setKpiIdx(null);setKpiSrc(null);window.scrollTo(0,0)}}}/>}
      {!showKpiDetail&&tab==="daily"&&D&&<PageDaily D={D}/>}
      {!showKpiDetail&&tab==="weekly"&&<PageWeekly data={weekly} onKpi={i=>{setKpiIdx(i);setKpiSrc("wk");window.scrollTo(0,0)}}/>}
      {!showKpiDetail&&tab==="monthly"&&<PageMonthly data={monthly} onKpi={i=>{setKpiIdx(i);setKpiSrc("mo");window.scrollTo(0,0)}}/>}
      {!showKpiDetail&&tab==="wl"&&!tlId&&<PageWL wl={sorted} onOpen={id=>setTlId(id)}/>}
      {!showKpiDetail&&tab==="wl"&&tlItem&&<PageTL item={tlItem} onBack={()=>setTlId(null)}/>}
    </div>
  </div>)
}
