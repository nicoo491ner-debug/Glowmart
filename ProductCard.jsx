import {Link} from 'react-router-dom';import {Heart,Star} from 'lucide-react';import {useShop,money} from '../lib/store.jsx';import {sellers} from '../data/demo';
export default function ProductCard({p}){const {add,wish,wishToggle}=useShop();const off=Math.round((1-p.price/p.was)*100);const sl=sellers.find(s=>s.id===p.seller);
return <div className="card"><Link to={`/product/${p.id}`} className="imgw"><img src={p.image} alt={p.name} loading="lazy"/>
{(off>0||p.badge)&&<span className="badge">{off>=20?off+'% OFF':p.badge||'SALE'}</span>}</Link>
<button className={'wish'+(wish.includes(p.id)?' on':'')} aria-label="Wishlist" onClick={()=>wishToggle(p.id)}><Heart size={18}/></button>
<div className="cb"><div className="sn">{sl?.name}</div><Link to={`/product/${p.id}`} className="pn">{p.name}</Link>
<div className="rt"><Star size={13} fill="#c8a45c" stroke="#c8a45c"/>{p.rating} <span>({p.reviews})</span></div>
<div className="pr"><b>{money(p.price)}</b>{off>0&&<s>{money(p.was)}</s>}</div>
<button className="btn sm" onClick={()=>add(p.id)}>Add to Cart</button></div></div>}
