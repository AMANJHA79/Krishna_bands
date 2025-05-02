

var tl = gsap.timeline();
tl.from("nav h1, nav .burger", {
  y: -100,
  opacity: 0,
  duration: 0.3,
  ease: "power2.out",
})

tl.from("nav ul li", {
  y: -100,
  opacity: 0,
  duration: 0.4,
  ease: "power2.out",
  stagger: 0.1,
})

var tl2 = gsap.timeline();
tl2.from(".home .left h1", {
  x: -100,
  opacity: 0,
  duration: 0.8,
  ease: "ease.out",

})
tl2.from(".home p", {
  x: -100,
  opacity: 0,
  duration: 0.8, 
})


// Add mobile menu functionality
function toggleNav() {
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    const body = document.body;
    
    // Toggle menu
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
    body.classList.toggle('no-scroll');

    // Animate links
    document.querySelectorAll('.nav-links li').forEach((link, index) => {
        link.style.animation = navLinks.classList.contains('nav-active') 
            ? `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
            : '';
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav');
    if (!nav.contains(e.target) && document.querySelector('.nav-active')) {
        toggleNav();
    }
});

// Close menu after clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', toggleNav);
});

// Initialize burger menu
document.querySelector('.burger').addEventListener('click', toggleNav);


// WhatsApp Modal Handling
function showWhatsAppModal() {
    const modal = document.getElementById('whatsappModal');
    modal.classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

function closeWhatsAppModal() {
    const modal = document.getElementById('whatsappModal');
    modal.classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

function sendWhatsAppMessage() {
    const name = document.getElementById('userName').value;
    const date = document.getElementById('eventDate').value;
    const message = `Hi Krishna Band! My name is ${name}. I have an event on ${date}. Please contact me.`;
    const encodedMessage = encodeURIComponent(message);
    // Update the phone number format (added country code prefix)
    window.open(`https://wa.me/917830330030?text=${encodedMessage}`, '_blank');
    closeWhatsAppModal();
}

// Add these event listeners
document.querySelector('.whatsapp-float').addEventListener('click', showWhatsAppModal);
document.querySelector('.modal').addEventListener('click', function(e) {
    if(e.target === this) closeWhatsAppModal();
});
document.querySelector('.close').addEventListener('click', closeWhatsAppModal);

// Music Player Handling
document.querySelector('.music-toggle').addEventListener('click', function() {
    const audio = document.getElementById('background-music');
    const isPlaying = !audio.paused;
    
    if(isPlaying) {
        audio.pause();
        document.querySelector('.music-state.on').classList.remove('active');
        document.querySelector('.music-state.off').classList.add('active');
    } else {
        audio.play().catch(() => {/* Handle browser autoplay restrictions */});
        document.querySelector('.music-state.off').classList.remove('active');
        document.querySelector('.music-state.on').classList.add('active');
    }
    this.classList.toggle('playing');
});