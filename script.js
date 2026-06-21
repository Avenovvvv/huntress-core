// H.U.N.T.R.E.S.S CORE SCRIPT (Sanitized and Upgraded)

document.addEventListener('DOMContentLoaded', () => {
    console.log("H.U.N.T.R.E.S.S System: DOM Initialized");
    
    /* ========================= MATRIX BACKGROUND ========================= */
    const canvas = document.getElementById("matrix");
    if(canvas){
        const ctx = canvas.getContext("2d");
        function resizeCanvas(){ 
            canvas.width = window.innerWidth; 
            canvas.height = window.innerHeight; 
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas); // Keeps matrix stable when window resizes
        
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

    /* ========================= AI TERMINAL LOGIC (ARCHIVE PAGE) ========================= */
    const terminalInput = document.getElementById("terminalInput");
    const terminalOutput = document.getElementById("terminalOutput");
    if (terminalInput && terminalOutput) {
        terminalInput.addEventListener("keypress", async (e) => {
            if (e.key === "Enter") {
                const text = terminalInput.value.trim();
                if (!text) return; // Prevent empty sends
                
                terminalInput.value = "";
                terminalOutput.innerHTML += `<p>> ${text}</p>`;
                terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll to bottom

                try {
                    // UPDATED FETCH PATH FOR NETLIFY DEPLOYMENT
                    const res = await fetch('/.netlify/functions/chat', { 
                        method: 'POST', 
                        body: JSON.stringify({ message: text }) 
                    });
                    const data = await res.json();
                    terminalOutput.innerHTML += `<p>> ${data.reply}</p>`;
                    terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll to bottom
                } catch (err) { 
                    terminalOutput.innerHTML += `<p>> UPLINK FAILED: CHECK NETLIFY ENVIRONMENT VARIABLES</p>`; 
                }
            }
        });
    }

    /* ========================= DASHBOARD: TACTICAL TOOLKIT LOGIC ========================= */
    const addToolBtn = document.getElementById("add-tool-btn");
    const newToolInput = document.getElementById("new-tool-input");
    const toolList = document.getElementById("tool-list");

    if (addToolBtn && newToolInput && toolList) {
        // Function to inject new tool into the UI
        const processNewTool = () => {
            const toolName = newToolInput.value.trim();
            if (toolName !== "") {
                const newItem = document.createElement("li");
                newItem.innerHTML = `<span class="status-dot online"></span> ${toolName}`;
                toolList.appendChild(newItem);
                newToolInput.value = "";
                // Auto-scroll to bottom of tool list
                toolList.scrollTop = toolList.scrollHeight;
            }
        };

        // Add by clicking the button
        addToolBtn.addEventListener("click", processNewTool);

        // Add by pressing Enter
        newToolInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                processNewTool();
            }
        });
    }

    /* ========================= DASHBOARD: COMMAND TERMINAL LOGIC ========================= */
    const cmdInput = document.getElementById('terminal-input');
    const cmdOutput = document.getElementById('terminal-output');

    if (cmdInput && cmdOutput) {
        cmdInput.addEventListener('keypress', async function (e) {
            if (e.key === 'Enter') {
                const command = cmdInput.value.trim();
                if (!command) return;
                
                // 1. Echo the user's command to the terminal output
                const cmdLine = document.createElement('div');
                cmdLine.className = 'term-line';
                cmdLine.innerHTML = `<span class="prompt" style="color:var(--danger)">root@huntress:~#</span> ${command}`;
                cmdOutput.appendChild(cmdLine);

                // 2. Process local commands and AI proxy requests
                const responseLine = document.createElement('div');
                responseLine.className = 'term-line sys-msg';
                
                const lowerCmd = command.toLowerCase();
                
                if (lowerCmd === 'help') {
                    responseLine.innerHTML = "Available directives: <br> - clear  : Wipe terminal output<br> - status : Check system uplink<br> - ping   : Test connection<br> - ai [msg]: Send secure query to H.U.N.T.R.E.S.S. AI Core";
                    cmdOutput.appendChild(responseLine);
                } else if (lowerCmd === 'clear') {
                    cmdOutput.innerHTML = '';
                } else if (lowerCmd === 'status') {
                    responseLine.innerHTML = "<span style='color:var(--primary)'>[OK]</span> All subsystems operational. Netlify Serverless proxy locked. OSINT Radar active.";
                    cmdOutput.appendChild(responseLine);
                } else if (lowerCmd === 'ping') {
                    responseLine.innerText = "Pinging remote servers... 32 bytes of data. Time: 12ms. Connection solid.";
                    cmdOutput.appendChild(responseLine);
                } else if (lowerCmd.startsWith('ai ')) {
                    // Extract the message after the "ai " prefix
                    const aiQuery = command.substring(3).trim();
                    responseLine.innerHTML = `<span style="color:#ffd000">Processing query through Netlify Secure Proxy...</span>`;
                    cmdOutput.appendChild(responseLine);
                    cmdOutput.scrollTop = cmdOutput.scrollHeight;
                    
                    try {
                        const res = await fetch('/.netlify/functions/chat', { 
                            method: 'POST', 
                            body: JSON.stringify({ message: aiQuery }) 
                        });
                        const data = await res.json();
                        const aiReply = document.createElement('div');
                        aiReply.className = 'term-line';
                        aiReply.innerHTML = `<span style="color:var(--secondary)">[AI CORE]:</span> ${data.reply}`;
                        cmdOutput.appendChild(aiReply);
                    } catch (err) {
                        const aiErr = document.createElement('div');
                        aiErr.className = 'term-line';
                        aiErr.innerHTML = `<span style="color:var(--danger)">[ERROR]: NEURAL UPLINK FAILED.</span>`;
                        cmdOutput.appendChild(aiErr);
                    }
                } else {
                    responseLine.innerText = `bash: ${command}: command not found. Type 'help' for available directives.`;
                    cmdOutput.appendChild(responseLine);
                }
                
                // 3. Scroll to bottom and clear input field
                cmdOutput.scrollTop = cmdOutput.scrollHeight;
                cmdInput.value = '';
            }
        });
    }
});

/* ========================= DOSSIER CAROUSEL LOGIC ========================= */
// These must stay outside the DOMContentLoaded block so the HTML buttons can trigger them
let currentSlideIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

    // Remove active class from current slide
    slides[currentSlideIndex].classList.remove('active');

    // Calculate new index (Looping around if at the end/beginning)
    currentSlideIndex += direction;
    if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    } else if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    }

    // Add active class to new slide
    slides[currentSlideIndex].classList.add('active');
}

function toggleArchive() {
    const carousel = document.getElementById('carouselContainer');
    const btn = document.getElementById('toggleArchiveBtn');

    if (!carousel || !btn) return;

    // Toggle the grid-active class
    carousel.classList.toggle('grid-active');

    // Update button text and colors based on state
    if (carousel.classList.contains('grid-active')) {
        btn.innerText = "COLLAPSE ARCHIVE";
        btn.style.color = "#00ff88"; // Cyber green
        btn.style.borderColor = "#00ff88";
    } else {
        btn.innerText = "VIEW FULL ARCHIVE";
        btn.style.color = "#ff335f"; // Cyber red
        btn.style.borderColor = "#ff335f";
        
        // Ensure the current slide is correctly highlighted when returning to carousel mode
        const slides = document.querySelectorAll('.carousel-slide');
        slides.forEach(slide => slide.classList.remove('active'));
        if (slides[currentSlideIndex]) {
            slides[currentSlideIndex].classList.add('active');
        }
    }
}

/* ========================= RHS 3-DOTS MENU LOGIC ========================= */
function toggleRhsMenu() {
    const menu = document.getElementById('rhsMenu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Close the menu if the user clicks anywhere else on the screen
document.addEventListener('click', function(event) {
    const menuContainer = document.querySelector('.rhs-menu-container');
    const menu = document.getElementById('rhsMenu');
    if (menu && menuContainer && !menuContainer.contains(event.target)) {
        menu.classList.remove('active');
    }
});