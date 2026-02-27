// ============================================
//                CUSTOMIZE THESE
// ============================================

// Replace this with her answer to the door question.
// Ask her: "what's the one thing that i used to be soo addicted to but dropped it?"
// Then put her answer here (lowercase, trimmed).
const HER_ANSWER = "call of duty";  // <-- CHANGE THIS

// Write your own personal reasons. Be specific and real.
const REASONS = [
    "you waited at 3am even when i forgot to text.",
    "you see me when i can't see myself.",
    "you stayed when staying was hard.",
    "you called me out on my bs and i fell harder.",
    "you have faith in me when i have none.",
    "you are the only thing that make life worth living.",
    "you love me without needing me to be perfect.",
    "you are my home. even miles away.",
    "you chose me. and you keep choosing me.",
	"you are mine😘"
];

// ============================================
//            DO NOT EDIT BELOW (unless you know what you're doing)
// ============================================

// Get references to HTML elements
const reasonList = document.getElementById('reason-list');
const door = document.getElementById('door');
const doorButton = document.getElementById('door-button');
const doorAnswer = document.getElementById('door-answer');
const secretMessage = document.getElementById('secret-message');
const playSongButton = document.getElementById('play-song-button');
const ourSong = document.getElementById('our-song');
const photos = document.querySelectorAll('.photo-reveal');

// ----- 1. POPULATE REASONS -----
function loadReasons() {
    REASONS.forEach((reason) => {
        const reasonDiv = document.createElement('div');
        reasonDiv.className = 'reason-item';
        reasonDiv.textContent = reason;
        reasonList.appendChild(reasonDiv);
    });
}

// ----- 2. SCROLL REVEAL (reasons & photos) -----
function checkReveals() {
    // Reasons
    const reasonItems = document.querySelectorAll('.reason-item');
    reasonItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            item.classList.add('visible');
        }
    });
    
    // Photos
    photos.forEach(photo => {
        const rect = photo.getBoundingClientRect();
        if (rect.top < window.innerHeight - 150) {
            photo.classList.add('visible');
        }
    });
}

// ----- 3. LOCKED DOOR (pure love version) -----
function unlockDoor() {
    const answer = doorAnswer.value.trim().toLowerCase();
    if (answer === HER_ANSWER) {
        // Swing the door open
        door.classList.add('open');
        secretMessage.classList.remove('hidden');
        
        // Optional: speak a welcome message
        const msg = new SpeechSynthesisUtterance("you remembered. i love you.");
        msg.rate = 0.9;
        msg.pitch = 1.2;
        window.speechSynthesis.speak(msg);
        
        // Optional: start playing the song automatically
        // ourSong.play();
    } else {
        alert('not quite, baby. try again.'); // gentle feedback
    }
}

// ----- 4. MUSIC CONTROL -----
function toggleMusic() {
    if (ourSong.paused) {
        ourSong.play();
        playSongButton.textContent = '🎵 pause our song';
    } else {
        ourSong.pause();
        playSongButton.textContent = '🎵 play our song';
    }
}

// ----- 5. FLOATING HEARTS (fun extra) -----
function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'floatUp 2s ease-out forwards';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 2000);
}

// Add the float animation if not already in CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ----- 6. INITIALIZATION -----
window.addEventListener('load', () => {
    loadReasons();
    checkReveals();
    
    // Gentle welcome speech after a short delay
    setTimeout(() => {
        const welcome = new SpeechSynthesisUtterance("this is for you. only you.");
        welcome.rate = 0.9;
        window.speechSynthesis.speak(welcome);
    }, 2000);
});

// Listen to scroll events to reveal items
window.addEventListener('scroll', checkReveals);

// Door events
doorButton.addEventListener('click', unlockDoor);
doorAnswer.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') unlockDoor();
});

// Music button
playSongButton.addEventListener('click', toggleMusic);

// Floating hearts on click (anywhere except buttons)
document.body.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') return; // ignore button clicks
    createHeart(e.clientX, e.clientY);
});