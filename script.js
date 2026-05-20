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

ctx.fillStyle = "#00ff88";

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

const matrixInterval =
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

document.body.innerHTML = `

<div class="loading-screen"
style="
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:black;
color:#00ff88;
font-family:Orbitron,sans-serif;
letter-spacing:4px;
text-align:center;
padding:20px;
">

<h1>

ACCESSING H.U.N.T.R.E.S.S...

</h1>

</div>

`;

setTimeout(() => {

window.location.href =
"loading.html";

}, 2500);

}
);

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
