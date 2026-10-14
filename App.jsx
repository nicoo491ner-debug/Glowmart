import { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Plus, Minus, Trash2 } from 'lucide-react';
import './app.css';

const products = [
{ id: 1, name: 'Glow Body Cream', category: 'Body Care', price: 450, emoji: '🧴', color: '#F6E4D7' },
{ id: 2, name: 'Pure Glycerin', category: 'Skin Care', price: 250, emoji: '✨', color: '#E4E8D9' },
{ id: 3, name: 'Radiance Body Lotion', category: 'Body Care', price: 550, emoji: '🧴', color: '#F0DFE5' },
{ id: 4, name: 'Vitamin C Serum', category: 'Face Care', price: 650, emoji: '💧', color: '#E5E3F5' },
{ id: 5, name: 'Shea Butter', category: 'Skin Care', price: 350, emoji: '🌼', color: '#F4E9C9' },
{ id: 6, name: 'Gentle Face Cleanser', category: 'Face Care', price: 400, emoji: '🫧', color: '#DDEBF0' },
{ id: 7, name: 'Cocoa Body Oil', category: 'Body Care', price: 380, emoji: '✨', color: '#EBD9C9' },
{ id: 8, name: 'Daily Sunscreen', category: 'Face Care', price: 700, emoji: '☀️', color: '#F5E7B9' }
];

const money = value => 'KSh ' + value.toLocaleString('en-KE');

export default function App() {
const [cart, setCart] = useState([]);
const [query, setQuery] = useState('');
const [category, setCategory] = useState('All');
const [showCart, setShowCart] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);

const filtered = products.filter(product =>
product.name.toLowerCase().includes(query.toLowerCase()) &&
(category === 'All' || product.category === category)
);

const addToCart = product => {
setCart(current => {
const found = current.find(item => item.id === product.id);
return found
? current.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
: [...current, { ...product, qty: 1 }];
});
};

const changeQty = (id, amount) => {
setCart(current => current
.map(item => item.id === id ? { ...item, qty: item.qty + amount } : item)
.filter(item => item.qty > 0)
);
};

const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
const count = cart.reduce((sum, item) => sum + item.qty, 0);

return (
<div className="glowmart">
<div className="announcement">A little glow goes a long way ✨</div>

  <header className="navbar">
    <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
      {menuOpen ? <X /> : <Menu />}
    </button>

    <a href="#home" className="brand">glow<span>mart.</span></a>

    <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
      <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
      <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
      <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
    </nav>

    <div className="nav-actions">
      <button className="icon-button" onClick={() => document.getElementById('search')?.focus()} aria-label="Search">
        <Search />
      </button>
      <button className="cart-button" onClick={() => setShowCart(true)} aria-label="Open shopping cart">
        <ShoppingBag />
        <span>Cart ({count})</span>
      </button>
    </div>
  </header>

  <main>
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="eyebrow">YOUR EVERYDAY BEAUTY STORE</span>
        <h1>Discover your<br /><em>natural glow.</em></h1>
        <p>Skincare and body-care essentials to make every day feel a little more beautiful.</p>
        <a className="primary-button" href="#shop">Explore products <span>↗</span></a>
        <div className="hero-note"><span>✳</span> Made for your everyday self-care ritual.</div>
      </div>
      <div className="hero-art">
        <div className="hero-circle"></div>
        <div className="hero-product hero-product-one">🧴</div>
        <div className="hero-product hero-product-two">✨</div>
        <div className="hero-product hero-product-three">🌿</div>
        <span className="art-caption">YOUR GLOW, YOUR WAY</span>
      </div>
    </section>

    <section className="benefits">
      <div>✦ Thoughtfully selected essentials</div>
      <div>♡ Beauty for everyday</div>
      <div>✧ Simple self-care</div>
    </section>

    <section className="shop-section" id="shop">
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE GLOW EDIT</span>
          <h2>Find your favourites.</h2>
        </div>
        <span className="product-count">{filtered.length} products</span>
      </div>

      <div className="shop-controls">
        <div className="search-box">
          <Search size={19} />
          <input id="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search creams, glycerin..." />
        </div>
        <div className="category-list">
          {['All', 'Body Care', 'Skin Care', 'Face Care'].map(item => (
            <button key={item} onClick={() => setCategory(item)} className={category === item ? 'category active' : 'category'}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {filtered.map(product => (
          <article className="product-card" key={product.id}>
            <div className="product-image" style={{ backgroundColor: product.color }}>
              <span className="product-emoji">{product.emoji}</span>
              <span className="product-label">GLOW ESSENTIAL</span>
            </div>
            <div className="product-info">
              <span className="product-category">{product.category}</span>
              <h3>{product.name}</h3>
              <div className="product-bottom">
                <strong>{money(product.price)}</strong>
                <button className="add-button" onClick={() => addToCart(product)} aria-label={'Add ' + product.name + ' to cart'}>
                  <Plus size={19} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <p className="empty-message">No products found. Try another search.</p>}
    </section>

    <section className="about-section" id="about">
      <span className="eyebrow">A MOMENT FOR YOU</span>
      <h2>Your routine. Your rhythm.<br /><em>Your glow.</em></h2>
      <p>GlowMart is your destination for everyday body-care and skincare essentials. Find your favourites and make time for yourself.</p>
      <a className="primary-button" href="#shop">Shop the collection <span>↗</span></a>
    </section>
  </main>

  <footer className="footer">
    <a href="#home" className="brand">glow<span>mart.</span></a>
    <p>Your everyday beauty essentials.</p>
    <span>© 2026 GlowMart. All rights reserved.</span>
  </footer>

  {showCart && (
    <div className="cart-overlay" onClick={() => setShowCart(false)}>
      <section className="cart-panel" onClick={e => e.stopPropagation()}>
        <div className="cart-heading">
          <div><span className="eyebrow">YOUR SELECTION</span><h2>Your cart ({count})</h2></div>
          <button className="icon-button" onClick={() => setShowCart(false)} aria-label="Close cart"><X /></button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart"><ShoppingBag size={42} /><h3>Your cart is waiting.</h3><p>Find something lovely for your routine.</p><button className="primary-button" onClick={() => setShowCart(false)}>Continue shopping</button></div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-icon" style={{ backgroundColor: item.color }}>{item.emoji}</div>
                  <div className="cart-item-details"><strong>{item.name}</strong><span>{money(item.price)}</span>
                    <div className="quantity">
                      <button onClick={() => changeQty(item.id, -1)} aria-label="Decrease quantity"><Minus size={14} /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => changeQty(item.id, 1)} aria-label="Increase quantity"><Plus size={14} /></button>
                    </div>
                  </div>
                  <button className="remove-button" onClick={() => setCart(current => current.filter(p => p.id !== item.id))} aria-label={'Remove ' + item.name}><Trash2 size={17} /></button>
                </div>
              ))}
            </div>
            <div className="cart-total"><span>Subtotal</span><strong>{money(total)}</strong></div>
            <p className="cart-disclaimer">Delivery charges, if any, are calculated separately.</p>
            <button className="primary-button checkout-button" onClick={() => alert('Thank you for shopping with GlowMart! Checkout and payment will be connected in a later step.')}>Continue to checkout ↗</button>
          </>
        )}
      </section>
    </div>
  )}
</div>

);
}
