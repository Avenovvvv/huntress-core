const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

const text =
`> Initializing H.U.N.T.R.E.S.S...
> Establishing encrypted channels...
> Threat database connected...
> Access Level: CONTROLLER
> System Ready`;

let i = 0;
const typing = document.querySelector(".typing-text");

function typeWriter() {

    if(i < text.length){

        typing.innerHTML += text.charAt(i);

        i++;

        setTimeout(typeWriter, 40);
    }
}

typeWriter();

document.getElementById("enterBtn")
.addEventListener("click", () => {

    window.location.href = "gateway.html";

});
/* DYNAMIC SLOGANS */

const slogans = [

    "Built for the evolving battlefield.",

    "Precision through intelligence.",

    "Observe. Hunt. Neutralize.",

    "Where cyber intelligence evolves.",

    "Operational discipline meets digital warfare.",

    "Intelligence is the first line of defense.",

    "Engineered for modern threat landscapes."

];

const sloganElement = document.getElementById("dynamicSlogan");

if(sloganElement){

    const randomSlogan =
    slogans[Math.floor(Math.random() * slogans.length)];

    sloganElement.innerText =
    `"${randomSlogan}"`;
}
