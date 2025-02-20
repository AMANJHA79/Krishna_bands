const init=()=>{
    gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
  lerp: 0.05,
  multiplier: 0.7
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            locoScroll.scrollTo(targetSection);
        }

        const nav = document.querySelector('.nav-links');
        const burger = document.querySelector('.burger');
        if (window.innerWidth <= 768) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            document.body.classList.remove('no-scroll');
        }
    });
});

function navScrollEffect() {
  const nav = document.querySelector('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

gsap.from('.home h1, .home p', {
    duration: 1.2,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: "power4.out",
    scrollTrigger: {
        trigger: '.home',
        start: "top center"
    }
});

gsap.from('.home img', {
    duration: 1.5,
    scale: 0.9,
    opacity: 0,
    ease: "power4.out",
    scrollTrigger: {
        trigger: '.home',
        start: "top center"
    }
});

};

init();

gsap.from('nav a',{
  x: 10,
  delay: 0.5,
  stagger: 0.2,
  duration: 1
})

function navSlide() {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  
  burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
      document.body.classList.toggle("no-scroll");
      
      navLinks.forEach((link, index) => {
          if (link.style.animation) {
              link.style.animation = ""
          } else {
              link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
          }
      });
      burger.classList.toggle("toggle");
  });
  
}

navSlide();

window.addEventListener('load', () => {
    setTimeout(() => {
        locoScroll.update();
        ScrollTrigger.refresh();
    }, 1000);
});

// Update music control functionality
const musicToggle = document.querySelector('.music-toggle');
const backgroundMusic = document.getElementById('background-music');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
  isPlaying = !isPlaying;
  musicToggle.classList.toggle('playing');
  
  // Toggle icon states
  document.querySelector('.fa-volume-high').classList.toggle('active');
  document.querySelector('.fa-volume-low').classList.toggle('active');
  
  if (isPlaying) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
});

// Update ended event
backgroundMusic.addEventListener('ended', () => {
  isPlaying = false;
  musicToggle.classList.remove('playing');
  document.querySelector('.fa-volume-high').classList.remove('active');
  document.querySelector('.fa-volume-low').classList.add('active');
});

// WhatsApp Modal Functions
function showWhatsAppModal() {
    document.getElementById('whatsappModal').classList.remove('hidden');
}

function closeWhatsAppModal() {
    document.getElementById('whatsappModal').classList.add('hidden');
}

function sendWhatsAppMessage() {
    const name = document.getElementById('userName').value;
    const date = document.getElementById('eventDate').value;
    
    if (!name || !date) {
        alert('Please fill in all fields');
        return;
    }

    const message = `Hello Krishna Band!%0A%0AMy name is: ${encodeURIComponent(name)}%0AEvent date: ${encodeURIComponent(date)}`;
    const whatsappUrl = `https://wa.me/917830330030?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    closeWhatsAppModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('whatsappModal');
    if (event.target === modal) {
        closeWhatsAppModal();
    }
}

// Close modal with ESC key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !document.getElementById('whatsappModal').classList.contains('hidden')) {
        closeWhatsAppModal();
    }
});
