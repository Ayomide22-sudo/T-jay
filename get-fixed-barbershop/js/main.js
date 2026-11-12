/* ===== ÉDITEZ ICI / EDIT HERE ===== */
const CFG={
  phone:"2250584877279",            // WhatsApp + appel, format international sans "+" ni espaces
  phoneDisplay:"+225 05 84 87 72 79",
  yangoRef:"getfixedbarbershop",    // nom de votre site, lettres latines seulement (Yango le demande dans le lien)
  zone:"Côte d'Ivoire",              // ville/pays ajoutés à la recherche Google Maps (ex : "Abidjan, Côte d'Ivoire")
  salonCoords:null,                 // position exacte du salon, ex : [5.3560,-4.0100]
  salon:""                          // adresse du salon (vide = "envoyée à la confirmation")
};
// Galerie "Nos coupes" : {src: photo, t: titre, s: service associé}. Liste vide = section cachée.
const GALLERY=[
  {src:"assets/images/gallery/texture-contours.jpg",t:"Texture & contours",s:"Coupe homme"},
  {src:"assets/images/gallery/detail-tresses.jpg",t:"Tresses & dégradé",s:"Tresses & cornrows"},
  {src:"assets/images/gallery/degrade-net.jpg",t:"Dégradé net",s:"Coupe homme"},
  {src:"assets/images/gallery/cornrows.jpg",t:"Cornrows",s:"Tresses & cornrows"}
];
// TikTok : ["video" ou "photo", numéro à la fin du lien de la publication]. L'ordre = l'ordre d'affichage.
const TK_USER="ceogetfixed",TK_SHOW=6; // TK_SHOW = nombre de cartes visibles avant "Voir plus"
const TIKTOK=[
  ["video","7668075205155245320"],
  ["video","7699476206487457042"],
  ["video","7685789237144210696"],
  ["video","7684243716927720711"],
  ["video","7681056030733749511"],
  ["video","7651289482246901000"],
  ["video","7650937641679981832"],
  ["video","7633820971668966676"],
  ["video","7633733079500164372"],
  ["video","7628290998610890004"],
  ["photo","7681059893528530184"],
  ["photo","7651296767207558418"]
];
// Services : [emoji, nom, description, prix facultatif ex "5 000 FCFA", photo]
// La photo = chemin d'une image dans assets/images/ (si le fichier n'existe pas, l'emoji s'affiche à la place)
const SERVICES=[["✂️","Coupe homme","Dégradé, taper ou coupe classique, net et précis.","","assets/images/coupe-homme.jpg"],["🧒","Coupe enfant","Une coupe propre pour les petits, en douceur.","","assets/images/coupe-enfant.jpg"],["🧔","Barbe & contours","Taille, ligne et finitions soignées.","","assets/images/barbe-contours.jpg"],["🌀","Tresses & cornrows","Motifs et tresses selon votre style.","","assets/images/tresses-cornrows.jpg"],["👑","Pack complet","Coupe + barbe : le look CEO de A à Z.","","assets/images/pack-complet.jpg"]];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$('#svc').innerHTML=SERVICES.map((s,i)=>`<div class="card"><div class="ph"><span class="ic">${s[0]}</span>${s[4]?`<img src="${s[4]}" alt="${s[1]}" loading="lazy">`:''}</div><h3>${s[1]}</h3>${s[3]?`<div class="price">${s[3]}</div>`:''}<p>${s[2]}</p><a class="btn ghost sm" href="#reserver" data-i="${i}">Réserver</a></div>`).join('');
$$('.ph img').forEach(i=>{const x=()=>i.remove();i.addEventListener('error',x);if(i.complete&&!i.naturalWidth)x()});
$('#service').innerHTML=SERVICES.map(s=>`<option>${s[1]}</option>`).join('');
$('#svc').onclick=e=>{const a=e.target.closest('[data-i]');if(a)$('#service').selectedIndex=+a.dataset.i};
$('#time').innerHTML=Array.from({length:13},(_,i)=>`<option>${String(i+8).padStart(2,'0')}:00</option>`).join('');
const t=new Date();$('#date').min=$('#date').value=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
{const st=$('#salonT');if(CFG.salon){st.textContent=CFG.salon+' · ';const a=document.createElement('a');a.href='https://www.google.com/maps/dir/?api=1&destination='+(CFG.salonCoords?CFG.salonCoords.join(','):encodeURIComponent(CFG.salon+', '+CFG.zone));a.target='_blank';a.rel='noopener';a.style.color='var(--accent)';a.textContent="Voir l'itinéraire";st.append(a)}else st.textContent="L'adresse exacte du salon vous sera envoyée sur WhatsApp à la confirmation."}
$$('[data-wa]').forEach(a=>a.href='https://wa.me/'+CFG.phone);
$$('[data-tel]').forEach(a=>{a.href='tel:+'+CFG.phone;if(a.dataset.tel==='show')a.textContent=CFG.phoneDisplay});
if(GALLERY.length){$('#galerie').hidden=false;
$('#gal').innerHTML=GALLERY.map((g,i)=>`<button class="g-item" data-g="${i}" aria-label="Agrandir : ${g.t}"><img src="${g.src}" alt="${g.t}" loading="lazy"><span class="g-cap">${g.t}<small>${g.s}</small></span></button>`).join('');
const items=$$('.g-item');
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});items.forEach((el,k)=>{el.style.transitionDelay=(k%3)*90+'ms';io.observe(el)})}else items.forEach(el=>el.classList.add('in'))}
let lb,cur=0;
function closeLb(){lb.hidden=true;document.body.style.overflow=''}
function openLb(i){cur=(i+GALLERY.length)%GALLERY.length;const g=GALLERY[cur];
if(!lb){lb=document.createElement('div');lb.id='lb';lb.innerHTML='<button class="lb-x" aria-label="Fermer">✕</button><button class="lb-n lb-p" aria-label="Précédent">‹</button><div class="lb-box"><img alt=""><p></p><a class="btn pri sm" href="#reserver">Réserver ce style</a></div><button class="lb-n lb-f" aria-label="Suivant">›</button>';document.body.append(lb);
lb.onclick=e=>{if(e.target===lb||e.target.closest('.lb-x'))closeLb();else if(e.target.closest('.lb-p'))openLb(cur-1);else if(e.target.closest('.lb-f'))openLb(cur+1);else if(e.target.closest('a')){const k=SERVICES.findIndex(s=>s[1]===GALLERY[cur].s);if(k>-1)$('#service').selectedIndex=k;closeLb()}}}
const im=lb.querySelector('img');im.src=g.src;im.alt=g.t;lb.querySelector('p').textContent=g.t;lb.hidden=false;document.body.style.overflow='hidden'}
$('#gal').onclick=e=>{const b=e.target.closest('[data-g]');if(b)openLb(+b.dataset.g)};
document.addEventListener('keydown',e=>{if(!lb||lb.hidden)return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')openLb(cur-1);if(e.key==='ArrowRight')openLb(cur+1)});
let pos=null,acc=null,src='';
const M={home:["Votre adresse","Quartier, rue, immeuble…"],meet:["Lieu de rendez-vous proposé","Ex : devant le supermarché de votre quartier"]};
function sync(){const m=$('input[name=mode]:checked').value;$('#place').hidden=m==='salon';$('#salonBox').hidden=m!=='salon';if(M[m]){$('#addrL').textContent=M[m][0];$('#addr').placeholder=M[m][1]}}
$$('input[name=mode]').forEach(r=>r.onchange=sync);sync();
const GEO_MSG={1:"Localisation refusée. Autorisez-la dans votre navigateur (icône 🔒 près de l'adresse) puis réessayez, ou écrivez votre adresse.",2:"Position introuvable. Activez la localisation de votre appareil, ou écrivez votre adresse.",3:"La recherche a pris trop de temps. Réessayez, ou écrivez votre adresse."};
function setPin(lat,lng,a){pos=[+lat.toFixed(6),+lng.toFixed(6)];acc=a;src='gps';
$('#geoS').innerHTML='✅ Position ajoutée · <a style="color:var(--accent)" target="_blank" rel="noopener" href="https://www.google.com/maps?q='+pos.join(',')+'">voir sur la carte</a>'}
$('#geo').onclick=()=>{const s=$('#geoS'),b=$('#geo');
if(!navigator.geolocation||window.isSecureContext===false){s.textContent="Le GPS n'est pas disponible sur cette page (il faut https). Écrivez votre adresse.";return}
b.disabled=true;s.textContent="Recherche de votre position…";
let best=null,done=false,wid,tm;
const fail=e=>{b.disabled=false;s.textContent=GEO_MSG[e&&e.code]||GEO_MSG[2]};
const stop=()=>{done=true;clearTimeout(tm);if(wid!=null)navigator.geolocation.clearWatch(wid)};
const end=()=>{if(done)return;stop();b.disabled=false;if(best)return setPin(best.lat,best.lng,best.a);
navigator.geolocation.getCurrentPosition(p=>setPin(p.coords.latitude,p.coords.longitude,p.coords.accuracy),fail,{enableHighAccuracy:false,timeout:15000,maximumAge:300000})};
tm=setTimeout(end,12000);
wid=navigator.geolocation.watchPosition(p=>{if(done)return;const c=p.coords;if(!best||c.accuracy<best.a){best={lat:c.latitude,lng:c.longitude,a:c.accuracy};setPin(best.lat,best.lng,best.a)}if(c.accuracy<=20)end()},e=>{if(done)return;if(e&&e.code===1){stop();fail(e)}else end()},{enableHighAccuracy:true,maximumAge:0,timeout:12000});
if(done)navigator.geolocation.clearWatch(wid)};
$('#f').onsubmit=e=>{e.preventDefault();const g=id=>$('#'+id).value.trim(),m=$('input[name=mode]:checked').value;
$('#err').textContent='';
if(m!=='salon'&&!g('addr')&&!pos){$('#err').textContent="Ajoutez une adresse ou partagez votre position GPS.";return}
const [y,mo,d]=g('date').split('-').map(Number);
const when=new Date(y,mo-1,d).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})+' à '+g('time');
const T={home:"À DOMICILE - vous venez chez moi",salon:"AU SALON - je viens chez vous",meet:"POINT DE RENCONTRE - on se retrouve à l'endroit ci-dessous"}[m];
const mapQ=s=>"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(s+", "+CFG.zone);
const ll=pos?pos.join(','):'',dest=ll||encodeURIComponent(g('addr')+", "+CFG.zone);
const yango=(la,lo)=>"https://yango.go.link/route?end-lat="+la+"&end-lon="+lo+"&ref="+CFG.yangoRef+"&adj_t=vokme8e_nd9s9z9&lang=fr&adj_deeplink_js=1&adj_fallback="+encodeURIComponent("https://yango.com/en_int/order/?gto="+lo+","+la+"&ref="+CFG.yangoRef);
const dir=md=>"https://www.google.com/maps/dir/?api=1&destination="+dest+"&travelmode="+md;
const lines=["Bonjour Get Fixed,","Je souhaite réserver :","","*RÉSERVATION*","Nom : "+g('name'),"Tél : "+g('phone'),"Service : "+$('#service').value,"Quand : "+when,"","*LIEU DU RENDEZ-VOUS*",T];
if(m==='salon'){if(CFG.salon)lines.push("Salon : "+CFG.salon,"Carte : "+(CFG.salonCoords?"https://www.google.com/maps?q="+CFG.salonCoords.join(','):mapQ(CFG.salon)))}
else{if(g('addr'))lines.push((m==='meet'?"Point de rencontre : ":"Mon adresse : ")+g('addr'));if(g('note'))lines.push("Repère : "+g('note'));
if(pos)lines.push(src==='gps'&&acc!=null?"Précision GPS : environ "+Math.round(acc)+" m"+(acc>100?" (approximative)":""):"Position placée sur la carte par le client","Coordonnées : "+pos[0].toFixed(6)+", "+pos[1].toFixed(6),"Carte : https://www.google.com/maps?q="+ll);
if(!pos&&g('addr'))lines.push("Position approximative (adresse écrite) : "+mapQ(g('addr')));
if(pos||g('addr'))lines.push("","*ITINÉRAIRE*","Voiture / taxi : "+dir('driving'),"Vélo : "+dir('bicycling'));
if(pos)lines.push("Yango : "+yango(pos[0],pos[1]))}
if(g('msg'))lines.push("","Remarque : "+g('msg'));
const text=lines.join("\n"),a=$('#wa');
$('#sum').textContent=text.replace(/\*/g,'');a.href='https://wa.me/'+CFG.phone+'?text='+encodeURIComponent(text);
$('#f').hidden=true;$('#done').hidden=false;$('#done').scrollIntoView({behavior:'smooth',block:'center'});a.click()};
/* Vidéo : joue seulement quand elle est visible, et cache la section si le fichier est absent */
{const v=$('#vid');if(v){v.querySelector('source').addEventListener('error',()=>{$('#video').hidden=true});
if('IntersectionObserver' in window)new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?v.play().catch(()=>{}):v.pause()),{threshold:.4}).observe(v)}}
/* TikTok : cartes légères, la vidéo ne se charge que lorsque la carte approche de l'écran */
{const tk=$('#tk');if(tk){const U='https://www.tiktok.com/@'+TK_USER+'/';
tk.innerHTML=TIKTOK.map((v,i)=>`<div class="tk-c" data-t="${v[0]}" data-id="${v[1]}"${i>=TK_SHOW?' hidden':''}><div class="tk-ph"><b>▶</b><span>${v[0]==='photo'?'Publication photo':'Vidéo TikTok'}</span><a href="${U}${v[0]}/${v[1]}" target="_blank" rel="noopener">Ouvrir sur TikTok</a></div></div>`).join('');
const load=c=>{if(c.dataset.on||c.dataset.t!=='video'||c.hidden)return;c.dataset.on=1;const f=document.createElement('iframe');f.src='https://www.tiktok.com/embed/v2/'+c.dataset.id;f.title='Vidéo TikTok de @'+TK_USER;f.allow='fullscreen; encrypted-media';f.setAttribute('allowfullscreen','');c.append(f)};
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){load(e.target);io.unobserve(e.target)}}),{rootMargin:'300px'}):null;
$$('.tk-c').forEach(c=>io?io.observe(c):load(c));
const more=$('#tkMore');if(TIKTOK.length<=TK_SHOW)more.hidden=true;
more.onclick=()=>{$$('.tk-c[hidden]').forEach(c=>{c.hidden=false;io?io.observe(c):load(c)});more.hidden=true}}}
