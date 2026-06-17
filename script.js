// H.U.N.T.R.E.S.S CORE SCRIPT (Sanitized for direct routing)
document.addEventListener('DOMContentLoaded', () => {
    // Wrap all your existing code inside this block
    // This ensures your scripts only run after the HTML is fully built
    console.log("H.U.N.T.R.E.S.S System: DOM Initialized");
});
const canvas = document.getElementById("matrix");
if(canvas){
    const ctx = canvas.getContext("2d");
    function resizeCanvas(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resizeCanvas();
    const letters = "01HUNTRESSVICTORREZNOVCYBERINTEL";
    const matrix = letters.split("");
    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];
    for(let i = 0; i < columns; i++) drops[i] = 1;
    function drawMatrix(){
        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff003c";
        ctx.font = fontSize + "px monospace";
        for(let i = 0; i < drops.length; i++){
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 40);
}
// AI TERMINAL LOGIC
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");
if (terminalInput) {
    terminalInput.addEventListener("keypress", async (e) => {
        if (e.key === "Enter") {
            const text = terminalInput.value.trim();
            terminalInput.value = "";
            terminalOutput.innerHTML += `<p>> ${text}</p>`;
            try {
                const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: text }) });
                const data = await res.json();
                terminalOutput.innerHTML += `<p>> ${data.reply}</p>`;
            } catch (err) { terminalOutput.innerHTML += `<p>> UPLINK FAILED</p>`; }
        }
    });
}