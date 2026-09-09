const PRODUCTS = [
  {id:1,name:"Robe élégante",category:"Vêtements",price:25000,icon:"👗",badge:"Nouveau",desc:"Une robe élégante et féminine pensée pour vos occasions spéciales."},
  {id:2,name:"Baskets tendance",category:"Chaussures",price:20000,icon:"👟",desc:"Confort et style au quotidien."},
  {id:3,name:"Montre femme luxe",category:"Montres",price:30000,icon:"⌚",desc:"Une montre chic pour compléter votre look."},
  {id:4,name:"Sac à main chic",category:"Sacs",price:28000,icon:"👜",desc:"Sac raffiné avec une finition élégante."},
  {id:5,name:"Lunettes & bijoux",category:"Accessoires",price:15000,icon:"🕶️",desc:"La touche finale pour un style remarquable."},
  {id:6,name:"Ensemble moderne",category:"Promotions",price:28000,old:35000,icon:"👗",badge:"Promo",desc:"Ensemble moderne à prix spécial."},
  {id:7,name:"Escarpins rosés",category:"Chaussures",price:22000,icon:"👠",desc:"Escarpins féminins et élégants."},
  {id:8,name:"Sac bandoulière",category:"Sacs",price:24000,icon:"👜",desc:"Pratique, moderne et facile à porter."},
  {id:9,name:"Boubou premium",category:"Vêtements",price:40000,icon:"🥻",badge:"Nouveau",desc:"Une silhouette élégante inspirée du style africain contemporain."},
  {id:10,name:"Parfum signature",category:"Accessoires",price:18000,icon:"🧴",desc:"Une fragrance douce et sophistiquée."},
  {id:11,name:"Montre classique",category:"Montres",price:27000,icon:"⌚",desc:"Un modèle intemporel pour toutes les occasions."},
  {id:12,name:"Sandales chic",category:"Chaussures",price:16000,icon:"👡",badge:"Promo",desc:"Légères et élégantes pour vos sorties."},

  {id:13,name:"Vigoz Ensemble California Gris",category:"Vêtements",price:null,image:"assets/vigoz-ensemble-gris.jpg",badge:"Nouveau",desc:"Ensemble Vigoz California composé d'un sweat à capuche et d'un pantalon. Style moderne, confort maximal et finition soignée."},
  {id:14,name:"Vigoz Ensemble Sport Bleu",category:"Vêtements",price:null,image:"assets/vigoz-ensemble-bleu.jpg",badge:"Nouveau",desc:"Ensemble Vigoz bleu avec veste à capuche, détails réfléchissants et pantalon assorti. Idéal pour un style urbain et sportif."},
  {id:15,name:"Vigoz Combishort Femme Gris",category:"Vêtements",price:null,image:"assets/vigoz-combishort-femme.jpg",badge:"Nouveau",desc:"Combishort Vigoz pour femme, tissu doux et respirant, taille élastique et style moderne pour toutes les occasions."}
];

let cart = JSON.parse(localStorage.getItem("anaya_cart") || "[]");

const money = n => (typeof n === "number" && Number.isFinite(n)) ? new Intl.NumberFormat("fr-FR").format(n) + " FCFA" : "Prix sur demande";

function saveCart(){ localStorage.setItem("anaya_cart", JSON.stringify(cart)); renderCart(); }

function productCard(p){
  const image = p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy">` : `<div class="placeholder">${p.icon}</div>`;
  const price = money(p.price);
  const buyLabel = (typeof p.price === "number") ? "Ajouter" : "Demander le prix";
  return `<article class="product-card">
    ${p.badge ? `<span class="badge ${p.badge==='Promo'?'sale':''}">${p.badge}</span>` : ""}
    <div class="product-img">${image}</div>
    <div class="product-info">
      <small>${p.category}</small>
      <h3>${p.name}</h3>
      <div><span class="price">${price}</span>${p.old?`<span class="old">${money(p.old)}</span>`:""}</div>
      <div class="product-actions">
        <button class="details" onclick="showProduct(${p.id})">Voir</button>
        <button class="buy" onclick="addToCart(${p.id})">${buyLabel}</button>
      </div>
    </div>
  </article>`;
}

function renderProducts(){
  let list=[...PRODUCTS];
  const q=(document.getElementById("searchInput").value||"").toLowerCase().trim();
  const cat=document.getElementById("categoryFilter").value;
  const sort=document.getElementById("sortFilter").value;
  if(q) list=list.filter(p=>(p.name+" "+p.category+" "+p.desc).toLowerCase().includes(q));
  if(cat!=="all") list=list.filter(p=>p.category===cat);
  if(sort==="priceAsc") list.sort((a,b)=>(a.price ?? Infinity)-(b.price ?? Infinity));
  if(sort==="priceDesc") list.sort((a,b)=>(b.price ?? -Infinity)-(a.price ?? -Infinity));
  if(sort==="name") list.sort((a,b)=>a.name.localeCompare(b.name));
  document.getElementById("catalogueProducts").innerHTML=list.map(productCard).join("");
  document.getElementById("emptyState").hidden=list.length!==0;
  document.getElementById("featuredProducts").innerHTML=PRODUCTS.slice(0,6).map(productCard).join("");
}

function addToCart(id){
  const p=PRODUCTS.find(x=>x.id===id);
  if(typeof p.price !== "number"){
    const msg = `Bonjour ANAYA, je souhaite connaître le prix du produit : ${p.name}.`;
    window.open(`https://wa.me/22396966666?text=${encodeURIComponent(msg)}`,"_blank");
    return;
  }
  const found=cart.find(x=>x.id===id);
  if(found) found.qty++;
  else cart.push({...p,qty:1});
  saveCart();
  openCart();
}

function renderCart(){
  document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
  const el=document.getElementById("cartItems");
  if(!cart.length){el.innerHTML='<div style="padding:45px 10px;text-align:center;color:#888">Votre panier est vide.<br><br>Ajoutez vos articles préférés ♥</div>'}
  else el.innerHTML=cart.map(x=>`<div class="cart-item">
    <div class="thumb">${x.image ? `<img src="${x.image}" alt="${x.name}">` : x.icon}</div>
    <div><h4>${x.name}</h4><small>${money(x.price)}</small>
      <div class="qty"><button onclick="changeQty(${x.id},-1)">−</button><b>${x.qty}</b><button onclick="changeQty(${x.id},1)">+</button></div>
    </div>
    <button class="remove" onclick="removeItem(${x.id})">×</button>
  </div>`).join("");
  document.getElementById("cartTotal").textContent=money(cart.reduce((s,x)=>s+(typeof x.price==="number"?x.price*x.qty:0),0));
}
function changeQty(id,n){const x=cart.find(i=>i.id===id); if(!x)return; x.qty+=n;if(x.qty<=0)removeItem(id);else saveCart()}
function removeItem(id){cart=cart.filter(x=>x.id!==id);saveCart()}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("show")}

function showProduct(id){
  const p=PRODUCTS.find(x=>x.id===id);
  const photo = p.image ? `<img src="${p.image}" alt="${p.name}">` : p.icon;
  const action = typeof p.price === "number"
    ? `<button class="btn primary" onclick="addToCart(${p.id});document.getElementById('productModal').classList.remove('show')">Ajouter au panier</button>`
    : `<button class="btn primary" onclick="addToCart(${p.id})">Demander le prix sur WhatsApp</button>`;
  document.getElementById("modalContent").innerHTML=`<div class="modal-content">
    <div class="modal-photo">${photo}</div><div class="modal-info">
      <small>${p.category}</small><h2>${p.name}</h2><p>${p.desc}</p>
      <div class="modal-price">${money(p.price)}</div>
      ${action}
    </div></div>`;
  document.getElementById("productModal").classList.add("show");
}
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.getElementById("categoryFilter").addEventListener("change",renderProducts);
document.getElementById("sortFilter").addEventListener("change",renderProducts);
document.querySelectorAll(".category-card").forEach(b=>b.addEventListener("click",()=>{
  document.getElementById("categoryFilter").value=b.dataset.category;
  document.getElementById("catalogue").scrollIntoView({behavior:"smooth"});
  renderProducts();
}));
document.getElementById("cartOpen").onclick=openCart;
document.getElementById("cartClose").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
document.getElementById("modalClose").onclick=()=>document.getElementById("productModal").classList.remove("show");
document.getElementById("clearCart").onclick=()=>{cart=[];saveCart()};
document.getElementById("whatsappOrder").onclick=()=>{
  if(!cart.length){alert("Votre panier est vide.");return}
  const lines=cart.map(x=>`• ${x.name} x${x.qty} — ${money(x.price*x.qty)}`).join("%0A");
  const total=money(cart.reduce((s,x)=>s+x.price*x.qty,0));
  window.open(`https://wa.me/22396966666?text=Bonjour%20ANAYA%2C%20je%20souhaite%20commander%20%3A%0A${lines}%0A%0ATotal%20%3A%20${encodeURIComponent(total)}`,"_blank");
};
document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("contactName").value;
  const msg=document.getElementById("contactMessage").value;
  const url=`https://wa.me/22396966666?text=${encodeURIComponent("Bonjour ANAYA, je suis "+name+". "+msg)}`;
  document.getElementById("contactNotice").textContent="Message prêt : ouverture de WhatsApp…";
  window.open(url,"_blank");
});
const themeToggle=document.getElementById("themeToggle");
const savedTheme=localStorage.getItem("anaya_theme");
if(savedTheme==="dark"){
  document.body.classList.add("dark-mode");
  if(themeToggle){themeToggle.textContent="☀";themeToggle.title="Mode clair";}
}
if(themeToggle) themeToggle.onclick=()=>{
  document.body.classList.toggle("dark-mode");
  const dark=document.body.classList.contains("dark-mode");
  localStorage.setItem("anaya_theme",dark?"dark":"light");
  themeToggle.textContent=dark?"☀":"☾";
  themeToggle.title=dark?"Mode clair":"Mode sombre";
};
document.getElementById("mobileMenu").onclick=()=>document.getElementById("nav").classList.toggle("open");
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
document.getElementById("accountBtn").onclick=()=>alert("Espace client : à connecter à un backend PHP/MySQL pour les comptes, commandes et historique.");

renderProducts(); renderCart();
