import {Routes,Route,Navigate} from 'react-router-dom';import Shell from './layouts/Shell.jsx';import {useShop} from './lib/store.jsx';
import Home from './pages/Home.jsx';import Search from './pages/Search.jsx';import Product from './pages/Product.jsx';import {Cart,Checkout} from './pages/Cart.jsx';
import Account from './pages/Account.jsx';import Seller from './pages/Seller.jsx';import Admin from './pages/Admin.jsx';import Store from './pages/Store.jsx';
// UI-level guard only. Real enforcement = Supabase RLS (see supabase/schema.sql).
const Guard=({role,to='/account',children})=>{const {user}=useShop();return user?.role===role?children:<Navigate to={to} replace/>};
export default function App(){return <Routes><Route element={<Shell/>}>
<Route path="/" element={<Home/>}/><Route path="/search" element={<Search/>}/><Route path="/product/:id" element={<Product/>}/>
<Route path="/store/:id" element={<Store/>}/><Route path="/cart" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="/account" element={<Account/>}/>
<Route path="/seller" element={<Guard role="seller"><Seller/></Guard>}/>
<Route path="/gm-admin" element={<Guard role="admin" to="/gm-admin-login"><Admin/></Guard>}/><Route path="/gm-admin-login" element={<Account admin/>}/>
<Route path="*" element={<Navigate to="/"/>}/></Route></Routes>}
