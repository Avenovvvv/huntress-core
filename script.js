const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01HUNTRESSVICTORREZNOV";
const matrix = letters.split("");

const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];

for(let x = 0; x < columns; x++)
{
    drops[x] = 1;
}

function draw()
{
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#00ff00";
    ctx.font = fontSize + "px monospace";

    for(let i = 0; i < drops.length; i++)
    {
        const text = matrix[Math.floor(Math.random()*matrix.length)];

        ctx.fillText(text, i*fontSize, drops[i]*fontSize);

        if(drops[i]*fontSize > canvas.height && Math.random() > 0.975)
        {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(draw, 35);
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {

    document.body.innerHTML = `
<div class="loading-screen">
    <h1>ACCESSING H.U.N.T.R.E.S.S...</h1>
</div>
`;

setTimeout(() => {
    window.location.href = "dashboard.html";
}, 3000);

});
async function sendPrompt(){

    const promptInput =
    document.getElementById("prompt");

    const chatContainer =
    document.getElementById("chat-container");

    const userText =
    promptInput.value;

    if(!userText) return;

    chatContainer.innerHTML += `
        <div class="message user">
            <strong>YOU ></strong>
            ${userText}
        </div>
    `;

    promptInput.value = "";

    const loadingMessage = document.createElement("div");

    loadingMessage.className = "message ai";

    loadingMessage.innerHTML =
    "<strong>HUNTRESS AI ></strong> Thinking...";

    chatContainer.appendChild(loadingMessage);

    chatContainer.scrollTop =
    chatContainer.scrollHeight;

    try{

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {

                method: "POST",

                headers: {

                    "Authorization":
                    "Bearer k-or-v1-090e83d88d1ab06f209d61f63d32cb17ca58e2ead7a731c558bd71cce3f568bc",

                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({

                    model:
                    "anthropic/claude-3-sonnet",

                    messages: [

                        {

                            role: "system",

                            content: `
You are HUNTRESS AI.

An elite cybersecurity,
OSINT,
malware analysis,
digital reconnaissance,
and intelligence assistant.

You specialize in:
- penetration testing
- exploit analysis
- reverse engineering
- OPSEC
- cyber intelligence
- darknet investigations
- threat hunting
- malware behavior analysis

Respond technically,
clearly,
and analytically.
`
                        },

                        {

                            role: "user",

                            content: userText
                        }
                    ]
                })
            }
        );

        const data =
        await response.json();

        loadingMessage.innerHTML = `
            <strong>HUNTRESS AI ></strong>
            ${data.choices[0].message.content}
        `;

        chatContainer.scrollTop =
        chatContainer.scrollHeight;

    }catch(error){

        loadingMessage.innerHTML = `
            <strong>HUNTRESS AI ></strong>
            ERROR CONNECTING TO AI
        `;
    }
}
function toggleMenu() {

    const menu = document.getElementById("sideMenu");

    menu.classList.toggle("active");

}
