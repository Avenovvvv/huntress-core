/* =========================
   MATRIX EFFECT
========================= */

const canvas = document.getElementById("matrix");

if(canvas){

const ctx = canvas.getContext("2d");

function resizeCanvas(){

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

}

resizeCanvas();

const letters =
"01HUNTRESSVICTORREZNOV";

const matrix = letters.split("");

const fontSize = 16;

let columns =
Math.floor(canvas.width / fontSize);

let drops = [];

function resetDrops(){

columns =
Math.floor(canvas.width / fontSize);

drops = [];

for(let i = 0; i < columns; i++){

drops[i] = 1;

}

}

resetDrops();

function drawMatrix(){

ctx.fillStyle =
"rgba(0,0,0,0.08)";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

ctx.fillStyle = "#ff003c";

ctx.font =
fontSize + "px monospace";

for(let i = 0; i < drops.length; i++){

const text =
matrix[
Math.floor(
Math.random() *
matrix.length
)
];

ctx.fillText(
text,
i * fontSize,
drops[i] * fontSize
);

if(
drops[i] * fontSize >
canvas.height &&
Math.random() > 0.975
){

drops[i] = 0;

}

drops[i]++;

}

}

setInterval(drawMatrix, 40);

window.addEventListener(
"resize",
() => {

resizeCanvas();

resetDrops();

}
);

}

/* =========================
   SIDE MENU
========================= */

function toggleMenu(){

const sideMenu =
document.getElementById(
"sideMenu"
);

if(sideMenu){

sideMenu.classList.toggle(
"active"
);

}

}

/* =========================
   CLOSE MENU OUTSIDE CLICK
========================= */

document.addEventListener(
"click",
function(event){

const sideMenu =
document.getElementById(
"sideMenu"
);

const menuBtn =
document.querySelector(
".menu-btn"
);

if(
sideMenu &&
menuBtn &&
!sideMenu.contains(event.target) &&
!menuBtn.contains(event.target)
){

sideMenu.classList.remove(
"active"
);

}

}
);

/* =========================
   CLOSE MENU ON LINK CLICK
========================= */

const menuLinks =
document.querySelectorAll(
".side-menu a"
);

menuLinks.forEach((link)=>{

link.addEventListener(
"click",
()=>{

const sideMenu =
document.getElementById(
"sideMenu"
);

if(sideMenu){

sideMenu.classList.remove(
"active"
);

}

}
);

});

/* =========================
   TERMS POPUP
========================= */

function acceptTerms(){

window.location.href =
"gateway-loading.html";

}

function denyTerms(){

window.location.href =
"denied.html";

}

/* =========================
   ENTER SYSTEM TRANSITION
========================= */

const enterBtn =
document.getElementById(
"enterBtn"
);

if(enterBtn){

enterBtn.addEventListener(
"click",
() => {

const hunterId =
Math.floor(
Math.random() * 999
)
.toString()
.padStart(3,"0");

let visitorCount =
localStorage.getItem(
"visitorCount"
);

if(!visitorCount){

visitorCount = 1;

}else{

visitorCount =
parseInt(visitorCount) + 1;

}

localStorage.setItem(
"visitorCount",
visitorCount
);

document.body.innerHTML = `

<div style="
height:100vh;
background:black;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
font-family:Orbitron,sans-serif;
color:#00ff88;
padding:30px;
text-align:center;
">

<div style="
font-size:15px;
letter-spacing:4px;
line-height:2.4;
max-width:900px;
">

<p>
INITIALIZING H.U.N.T.R.E.S.S...
</p>

<p>
SCANNING NETWORK...
</p>

<p>
ASSIGNING HUNTER ID...
</p>

<p style="color:#ff335f;">
YOU ARE:
HUNTER_${hunterId}
</p>

<p>
VISITOR #${visitorCount}
</p>

<p>
CONNECTED TO THE NETWORK
</p>

</div>

</div>

`;

setTimeout(() => {

localStorage.setItem(
"hunterId",
hunterId
);

window.location.href =
"dashboard.html";

}, 5000);

}
);

}

/* =========================
   DASHBOARD VISITOR SYSTEM
========================= */

const visitorElement =
document.getElementById(
"visitorCounter"
);

if(visitorElement){

let visitorCount =
localStorage.getItem(
"visitorCount"
);

if(!visitorCount){

visitorCount = 1;

localStorage.setItem(
"visitorCount",
visitorCount
);

}

const hunterId =
localStorage.getItem(
"hunterId"
) || "000";

visitorElement.innerHTML = `

<div style="
font-size:15px;
line-height:2.2;
">

YOU ARE VISITOR #${visitorCount}

<br><br>

CURRENT NODE:
<span style="color:#ff335f;">
HUNTER_${hunterId}
</span>

<br><br>

THE TRUTH REACHED ANOTHER NODE.

</div>

`;

}

/* =========================
   DOSSIER CARD EFFECT
========================= */

const cards =
document.querySelectorAll(
".blog-card"
);

cards.forEach((card) => {

card.addEventListener(
"mousemove",
(e) => {

const rect =
card.getBoundingClientRect();

const x =
e.clientX - rect.left;

const y =
e.clientY - rect.top;

card.style.background = `
radial-gradient(
circle at ${x}px ${y}px,
rgba(255,0,0,0.12),
rgba(10,10,10,0.96)
)
`;

}
);

card.addEventListener(
"mouseleave",
() => {

card.style.background =
"rgba(10,10,10,0.95)";

}
);

});

/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
document.querySelectorAll(
".info-section"
);

function revealOnScroll(){

revealElements.forEach((el) => {

const top =
el.getBoundingClientRect().top;

if(top < window.innerHeight - 100){

el.style.opacity = "1";

el.style.transform =
"translateY(0)";

}

});

}

revealElements.forEach((el) => {

el.style.opacity = "0";

el.style.transform =
"translateY(40px)";

el.style.transition =
"all 0.8s ease";

});

window.addEventListener(
"scroll",
revealOnScroll
);

revealOnScroll();

/* =========================
   SMOOTH SCROLL FIX
========================= */

document.querySelectorAll(
'a[href^="#"]'
).forEach(anchor => {

anchor.addEventListener(
"click",
function(e){

e.preventDefault();

const target =
document.querySelector(
this.getAttribute("href")
);

if(target){

target.scrollIntoView({
behavior:"smooth"
});

}

}
);

});

/* =========================
   TERMINAL TEXT EFFECT
========================= */

const typingElements =
document.querySelectorAll(
".typing-effect"
);

typingElements.forEach((element)=>{

const text =
element.innerText;

element.innerText = "";

let i = 0;

function type(){

if(i < text.length){

element.innerText +=
text.charAt(i);

i++;

setTimeout(type,50);

}

}

type();

});

/* =========================
   DOSSIER ACCESS SOUND
========================= */

const dossierLinks =
document.querySelectorAll(
".blog-card"
);

dossierLinks.forEach((link)=>{

link.addEventListener(
"click",
()=>{

const audio =
new Audio(
"https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
);

audio.volume = 0.2;

audio.play();

}
);

});
const reveals = document.querySelectorAll(".reveal");

function revealSections(){

for(let i = 0; i < reveals.length; i++){

const windowHeight = window.innerHeight;

const revealTop =
reveals[i].getBoundingClientRect().top;

const revealPoint = 120;

if(revealTop < windowHeight - revealPoint){

reveals[i].classList.add("active");

}

}

}

window.addEventListener("scroll", revealSections);

revealSections();
