const PR={5:[2,1],13:[3,2],17:[4,1]};
function build(par,Ps){const Q=(par?2:1)*Ps.reduce((a,b)=>a*b,1),A=new Uint8Array(Q*Q).fill(1);
 for(let x=0;x<Q;x++)for(let y=0;y<Q;y++){let ok=!par||((x+y)&1);for(const p of Ps){const[a,b]=PR[p];const m=(v)=>((v%p)+p)%p;
  if((m(x*a+y*b)===0&&m(y*a-x*b)===0)||(m(x*a-y*b)===0&&m(y*a+x*b)===0)){ok=0;break;}}A[x*Q+y]=ok?1:0;}return[Q,A];}
function offsets(D2){const o=[];for(let dx=-2;dx<=2;dx++)for(let dy=-2;dy<=2;dy++)if((dx||dy)&&dx*dx+dy*dy<=D2)o.push([dx,dy]);return o;}
function run(par,Ps,D2){const[Q,A]=build(par,Ps),O=offsets(D2),N=Q*Q,seen=new Int32Array(N).fill(-1),LX=new Int32Array(N),LY=new Int32Array(N);let inf=false,max=0,c=0,kept=0;
 for(let s=0;s<N;s++){if(!A[s])continue;kept++;if(seen[s]>=0)continue;const st=[s];seen[s]=c;LX[s]=(s/Q)|0;LY[s]=s%Q;let sz=0;
  while(st.length){const u=st.pop();sz++;for(const[dx,dy]of O){const nx=LX[u]+dx,ny=LY[u]+dy,t=((nx%Q+Q)%Q)*Q+((ny%Q+Q)%Q);if(!A[t])continue;if(seen[t]<0){seen[t]=c;LX[t]=nx;LY[t]=ny;st.push(t);}else if(LX[t]!==nx||LY[t]!==ny)inf=true;}}
  if(sz>max)max=sz;c++;}
 return{Q,kept:+(kept/N).toFixed(3),inf,max:inf?null:max};}
const out={};
for(const par of [0,1])for(let m=0;m<8;m++){const Ps=[5,13,17].filter((_,i)=>m>>i&1);for(const D2 of[1,2,4]){const k=(par?'2':'')+(Ps.length?'|'+Ps.join(','):'|')+'|'+D2;out[k]=run(par,Ps,D2);}}
console.log(JSON.stringify(out));
