// ===============================
//   FlexSim Team - JavaScript
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeTXPCharacter();
    wrapSectionTitleLetters();
});

// ===============================
//   Toggle Project Details
// ===============================
let currentProject = null;

function toggleProjectDetails(projectIndex) {
    const container = document.getElementById('projectDetailsContainer');
    const panels = container.querySelectorAll('.details-panel');
    const cards = document.querySelectorAll('.project-card');

    // Wenn dasselbe Projekt nochmal geklickt wird, schließen
    if (currentProject === projectIndex && container.classList.contains('active')) {
        container.classList.remove('active');
        panels[projectIndex].classList.remove('active');
        cards[projectIndex].classList.remove('active');
        currentProject = null;
        return;
    }

    // Alle Panels und Cards deaktivieren
    panels.forEach(panel => panel.classList.remove('active'));
    cards.forEach(card => card.classList.remove('active'));

    // Neues Panel und Card aktivieren
    panels[projectIndex].classList.add('active');
    cards[projectIndex].classList.add('active');
    container.classList.add('active');
    currentProject = projectIndex;
}

// ===============================
//   Toggle Team Details
// ===============================
let currentTeam = null;

function toggleTeamDetails(teamIndex) {
    const container = document.getElementById('teamDetailsContainer');
    const panels = container.querySelectorAll('.details-panel');
    const cards = document.querySelectorAll('.team-card');

    // Wenn dasselbe Team-Mitglied nochmal geklickt wird, schließen
    if (currentTeam === teamIndex && container.classList.contains('active')) {
        container.classList.remove('active');
        panels[teamIndex].classList.remove('active');
        cards[teamIndex].classList.remove('active');
        currentTeam = null;
        return;
    }

    // Alle Panels und Cards deaktivieren
    panels.forEach(panel => panel.classList.remove('active'));
    cards.forEach(card => card.classList.remove('active'));

    // Neues Panel und Card aktivieren
    panels[teamIndex].classList.add('active');
    cards[teamIndex].classList.add('active');
    container.classList.add('active');
    currentTeam = teamIndex;
}

// ===============================
//   Logo Animation
// ===============================
const mainLogo = document.querySelector('.main-logo');
if (mainLogo) {
    mainLogo.addEventListener('click', function() {
        triggerLogoAnimation();
    });
}

function triggerLogoAnimation() {
    const logo = document.querySelector('.main-logo');
    createParticleEffect();

    logo.style.animation = 'none';
    setTimeout(() => {
        logo.style.animation = 'logoPulse 1s ease-out';
    }, 10);

    setTimeout(() => {
        logo.style.animation = 'none';
    }, 1000);
}

function createParticleEffect() {
    const container = document.body;
    const colors = ['#00A8E8', '#0066CC', '#FFD700'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: 50%;
                left: 50%;
                z-index: 9999;
                pointer-events: none;
                border-radius: 50%;
                box-shadow: 0 0 10px currentColor;
            `;

            container.appendChild(particle);

            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 150 + Math.random() * 150;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            particle.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: `translate(calc(-50% + ${vx}px), calc(-50% + ${vy}px)) scale(1)`, opacity: 0 }
            ], {
                duration: 1500,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
        }, i * 15);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes logoPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// ===============================
//   Scroll Animations
// ===============================
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.project-card, .team-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ===============================
//   TXP Character (Optional)
// ===============================
class TXPCharacter {
    constructor() {
        this.container = document.querySelector('.txp-character-container');
        this.img = document.querySelector('.txp-character-img');
        this.character = document.getElementById('txpCharacter');
        this.speechBubble = document.getElementById('txpSpeech');
        this.speechText = document.getElementById('txpSpeechText');

        if (!this.container || !this.img) {
            return;
        }

        this.currentFrame = 0;
        this.totalFrames = 24;
        this.totalTalkFrames = 24;
        this.totalSprungFrames = 120;
        this.animationSpeed = 40;
        this.animationInterval = null;
        this.isSpeaking = false;
        this.isJumping = false;
        this.isDragging = false;
        this.currentAnimation = 'stand';

        // Drag & Drop Variablen
        this.offsetX = 0;
        this.offsetY = 0;

        // Timeout IDs für Sprech-Animation
        this.typingTimeout = null;
        this.hideTimeout = null;

        this.speeches = [
            "Später werde ich Dinge zur Flexsim und zum Team sagen können"
        ];

        this.init();
    }

    init() {
        this.container.style.display = 'block';
        this.startStandAnimation();

        // Click Event nur für Sprechen
        this.character.addEventListener('click', (e) => {
            if (!this.isDragging) {
                this.speak();
            }
        });

        // Drag & Drop Events
        this.character.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.stopDrag());

        // Sprung Animation alle 30 Sekunden
        setInterval(() => {
            if (!this.isSpeaking && !this.isJumping && !this.isDragging) {
                this.startSprungAnimation();
            }
        }, 30000);
    }

    startDrag(e) {
        this.isDragging = true;

        // Entferne alle txp-resting Klassen beim Start des Dragging
        const allCards = document.querySelectorAll('.project-card, .team-card');
        allCards.forEach(card => card.classList.remove('txp-resting'));

        // Position relativ zur Seite (nicht zum Viewport)
        const containerTop = this.container.offsetTop;
        const containerLeft = this.container.offsetLeft;

        this.offsetX = e.clientX - containerLeft;
        this.offsetY = e.clientY + window.scrollY - containerTop;

        // Wechsel zu Drag-Animation (Loop bei Frame 14 und 15)
        this.startDragAnimation();

        this.character.style.cursor = 'grabbing';
        e.preventDefault();
    }

    drag(e) {
        if (!this.isDragging) return;

        // Neue Position basierend auf Maus + Scroll
        let x = e.clientX - this.offsetX;
        let y = e.clientY + window.scrollY - this.offsetY;

        // Grenzen berechnen
        const containerWidth = this.container.offsetWidth;
        const containerHeight = this.container.offsetHeight;
        const windowWidth = window.innerWidth;
        const documentHeight = document.documentElement.scrollHeight;

        // Horizontale Grenzen
        if (x < 0) x = 0;
        if (x + containerWidth > windowWidth) x = windowWidth - containerWidth;

        // Vertikale Grenzen (relativ zum Dokument)
        if (y < 0) y = 0;
        if (y + containerHeight > documentHeight) y = documentHeight - containerHeight;

        this.container.style.left = x + 'px';
        this.container.style.bottom = 'auto';
        this.container.style.top = y + 'px';

        // Kollisionserkennung mit Cards
        this.checkCardCollisions();
    }

    checkCardCollisions() {
        const txpRect = this.container.getBoundingClientRect();
        const allCards = document.querySelectorAll('.project-card, .team-card');
        const logo = document.querySelector('.main-logo');

        // Prüfe Logo-Kollision
        if (logo) {
            const logoRect = logo.getBoundingClientRect();
            const isNearLogo = !(
                txpRect.right < logoRect.left ||
                txpRect.left > logoRect.right ||
                txpRect.bottom < logoRect.top ||
                txpRect.top > logoRect.bottom
            );

            if (isNearLogo) {
                logo.classList.add('txp-near');
            } else {
                logo.classList.remove('txp-near');
            }
        }

        // Prüfe Card-Kollisionen
        allCards.forEach(card => {
            const cardRect = card.getBoundingClientRect();

            // Prüfe ob TXP die Card berührt
            const isColliding = !(
                txpRect.right < cardRect.left ||
                txpRect.left > cardRect.right ||
                txpRect.bottom < cardRect.top ||
                txpRect.top > cardRect.bottom
            );

            if (isColliding) {
                card.classList.add('txp-hover');
            } else {
                card.classList.remove('txp-hover');
            }
        });
    }

    stopDrag() {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.character.style.cursor = 'pointer';

        // Prüfe ob TXP auf einer Card gelandet ist
        const txpRect = this.container.getBoundingClientRect();
        const allCards = document.querySelectorAll('.project-card, .team-card');
        const logo = document.querySelector('.main-logo');
        let isOnCard = false;

        // Prüfe ob TXP auf dem Logo ist
        let isOnLogo = false;
        if (logo) {
            const logoRect = logo.getBoundingClientRect();
            isOnLogo = !(
                txpRect.right < logoRect.left ||
                txpRect.left > logoRect.right ||
                txpRect.bottom < logoRect.top ||
                txpRect.top > logoRect.bottom
            );

            if (isOnLogo) {
                logo.classList.add('txp-near');
            } else {
                logo.classList.remove('txp-near');
            }
        }

        allCards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const isColliding = !(
                txpRect.right < cardRect.left ||
                txpRect.left > cardRect.right ||
                txpRect.bottom < cardRect.top ||
                txpRect.top > cardRect.bottom
            );

            // Entferne txp-hover (Drag-Animation)
            card.classList.remove('txp-hover');

            // Füge txp-resting hinzu wenn TXP auf Card liegt
            if (isColliding) {
                card.classList.add('txp-resting');
                isOnCard = true;
            } else {
                card.classList.remove('txp-resting');
            }
        });

        // Zurück zur Stand-Animation
        this.startStandAnimation();
    }

    startDragAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }

        this.currentAnimation = 'drag';
        this.currentFrame = 30;
        const dragStartFrame = 30;
        const dragEndFrame = 34;

        this.animationInterval = setInterval(() => {
            const frameNumber = String(this.currentFrame).padStart(5, '0');
            this.img.src = `TXP/TXP_Sprung_Pose/TXP Sprung_${frameNumber}.png`;

            this.currentFrame++;
            if (this.currentFrame > dragEndFrame) {
                this.currentFrame = dragStartFrame;
            }
        }, this.animationSpeed);
    }

    startStandAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }

        this.currentAnimation = 'stand';
        this.currentFrame = 0;
        this.totalFrames = 24;

        this.animationInterval = setInterval(() => {
            const frameNumber = String(this.currentFrame).padStart(5, '0');
            this.img.src = `TXP/TXP_Stand_Pose/TXP Stand Pose_${frameNumber}.png`;
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        }, this.animationSpeed);
    }

    startTalkAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }

        this.currentAnimation = 'talk';
        this.currentFrame = 0;
        this.totalFrames = this.totalTalkFrames;

        this.animationInterval = setInterval(() => {
            const frameNumber = String(this.currentFrame).padStart(5, '0');
            this.img.src = `TXP/TXP_Talk_Pose/TXP_Talk Pose_${frameNumber}.png`;
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        }, this.animationSpeed);
    }

    startSprungAnimation() {
        if (this.isJumping) return;

        this.isJumping = true;

        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }

        this.currentAnimation = 'sprung';
        this.currentFrame = 0;

        this.animationInterval = setInterval(() => {
            const frameNumber = String(this.currentFrame).padStart(5, '0');
            let frameName = frameNumber;

            // Spezielle Benennung für Frame 14 und 15
            if (this.currentFrame === 14) {
                frameName = frameNumber + 'A';
            } else if (this.currentFrame === 15) {
                frameName = frameNumber + 'B';
            }

            this.img.src = `TXP/TXP_Sprung_Pose/TXP Sprung_${frameName}.png`;
            this.currentFrame++;

            // Nach dem letzten Frame zurück zur Stand-Animation
            if (this.currentFrame >= this.totalSprungFrames) {
                this.isJumping = false;
                this.startStandAnimation();
            }
        }, this.animationSpeed);
    }

    speak() {
        // Wenn bereits am Sprechen, breche ab und starte neu
        if (this.isSpeaking) {
            if (this.typingTimeout) {
                clearTimeout(this.typingTimeout);
            }
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
            }
        }

        this.isSpeaking = true;
        this.startTalkAnimation();

        // Prüfe ob TXP auf einer Card ist und hole spezifischen Text
        let speechText = this.speeches[0]; // Standard-Text
        let isOnLogo = false;
        const txpRect = this.container.getBoundingClientRect();
        const allCards = document.querySelectorAll('.project-card, .team-card');
        const logo = document.querySelector('.main-logo');

        // Prüfe ob TXP auf dem Logo ist
        if (logo) {
            const logoRect = logo.getBoundingClientRect();
            isOnLogo = !(
                txpRect.right < logoRect.left ||
                txpRect.left > logoRect.right ||
                txpRect.bottom < logoRect.top ||
                txpRect.top > logoRect.bottom
            );

            if (isOnLogo) {
                speechText = "Auf dieser Seite erfährst du alles wichtige zum Thema FlexSim";
                // Sprechblase nach unten verschieben
                this.speechBubble.style.bottom = 'auto';
                this.speechBubble.style.top = '140px';
            } else {
                // Sprechblase normal oben
                this.speechBubble.style.bottom = '140px';
                this.speechBubble.style.top = 'auto';
            }
        }

        // Prüfe Cards nur wenn nicht auf Logo
        if (!isOnLogo) {
            allCards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const isOnCard = !(
                    txpRect.right < cardRect.left ||
                    txpRect.left > cardRect.right ||
                    txpRect.bottom < cardRect.top ||
                    txpRect.top > cardRect.bottom
                );

                if (isOnCard) {
                    // Hole den Namen aus der Card
                    const titleElement = card.querySelector('.project-title, .team-name');
                    if (titleElement) {
                        const cardName = titleElement.textContent;
                        speechText = `Bald werde ich auch mehr zu ${cardName} sagen können`;
                    }
                }
            });
        }

        this.speechBubble.style.display = 'block';
        this.speechText.textContent = '';
        let charIndex = 0;

        const typeChar = () => {
            if (charIndex < speechText.length) {
                this.speechText.textContent += speechText.charAt(charIndex);
                charIndex++;
                this.typingTimeout = setTimeout(typeChar, 50);
            } else {
                this.hideTimeout = setTimeout(() => {
                    this.speechBubble.style.display = 'none';
                    this.isSpeaking = false;
                    this.startStandAnimation();
                }, 3000);
            }
        };

        typeChar();
    }
}

function initializeTXPCharacter() {
    const txpImg = document.querySelector('.txp-character-img');
    if (txpImg) {
        const testImg = new Image();
        testImg.onload = function() {
            new TXPCharacter();
        };
        testImg.onerror = function() {
            const container = document.querySelector('.txp-character-container');
            if (container) {
                container.style.display = 'none';
            }
        };
        testImg.src = 'TXP/TXP_Stand_Pose/TXP Stand Pose_00000.png';
    }
}

// ===============================
//   Section Title Letter Hover Effect
// ===============================
function wrapSectionTitleLetters() {
    const sectionTitles = document.querySelectorAll('.section-title');

    sectionTitles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');

            // Für Leerzeichen einen nicht-brechenden Space verwenden
            if (char === ' ') {
                span.innerHTML = '&nbsp;';
            } else {
                span.textContent = char;
            }

            title.appendChild(span);
        }
    });
}

// ===============================
//   Keyboard Shortcuts
// ===============================
document.addEventListener('keydown', function(event) {
    if (event.key === 'f' || event.key === 'F') {
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
            event.preventDefault();
            triggerLogoAnimation();
        }
    }
});

console.log('FlexSim Team Website loaded successfully!');
