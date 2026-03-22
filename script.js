const music = document.getElementById('bg-music');
const slider = document.getElementById('volume-slider');
const volPercent = document.getElementById('vol-percent');
const muteBtn = document.getElementById('mute-btn');
const ppBtn = document.getElementById('play-pause-btn');

// Note Particles
const symbols = ['♩', '♪', '♫', '♬', '♭', '♯', '𝄞', '𝄢'];
const container = document.getElementById('particles');
for (let i = 0; i < 40; i++) {
    const note = document.createElement('div');
    note.className = 'note-particle';
    note.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    const side = Math.random() > 0.5 ? 'left' : 'right';
    const pos = Math.random() * 18; 
    note.style.top = Math.random() * 100 + '%';
    if (side === 'left') note.style.left = pos + '%';
    else note.style.right = pos + '%';
    note.style.setProperty('--dur', (12 + Math.random() * 15) + 's');
    note.style.setProperty('--delay', (Math.random() * -20) + 's');
    container.appendChild(note);
}

function enterSite() {
    music.volume = 0; music.play();
    let fade = setInterval(() => {
        if (music.volume < 0.5) music.volume += 0.05;
        else clearInterval(fade);
    }, 200);

    document.getElementById('entrance').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('entrance').style.display = 'none';
        document.getElementById('main-content').style.visibility = 'visible';
        document.getElementById('audio-footer').style.opacity = '1';
        
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add('is-visible');
                else e.target.classList.remove('is-visible');
            });
        }, { threshold: 0.15 });
        document.querySelectorAll('.bullet-point, .finale-section').forEach(el => obs.observe(el));
    }, 500);
}

// Controls
ppBtn.onclick = () => {
    if (music.paused) { music.play(); ppBtn.innerText = "PAUSE"; }
    else { music.pause(); ppBtn.innerText = "PLAY"; }
};

slider.oninput = (e) => { 
    const val = parseFloat(e.target.value);
    music.volume = val; 
    volPercent.innerText = Math.round(val * 100) + '%';
};

muteBtn.onclick = () => {
    music.muted = !music.muted;
    muteBtn.innerText = music.muted ? "UNMUTE" : "MUTE";
};