const BASE='http://localhost:4000/api';
export async function api(path,opts={}){const token=localStorage.getItem('placement_token'); const r=await fetch(BASE+path,{...opts,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})}}); const data=await r.json().catch(()=>({message:'Invalid server response'})); if(!r.ok)throw data; return data;}
