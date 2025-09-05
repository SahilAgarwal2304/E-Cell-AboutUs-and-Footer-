// Handles fade-in animations when elements scroll into view
class AOS {
  constructor() {
    this.elements = document.querySelectorAll('[data-aos]');
    this.init();
  }
  init() {
    this.observe();
    this.handleScroll();
    window.addEventListener('scroll', () => this.handleScroll());
    window.addEventListener('resize', () => this.handleScroll());
  }
  handleScroll() {
    this.elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('aos-animate');
      }
    });
  }
  observe() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          }
        });
      }, { threshold: 0.1, rootMargin: '50px' });
      this.elements.forEach(element => observer.observe(element));
    }
  }
}

// Parallax effect
class ParallaxController {
  constructor() {
    this.heroSection = document.querySelector('.hero-section');
    this.init();
  }
  init() {
    if (this.heroSection) {
      window.addEventListener('scroll', () => this.handleScroll());
    }
  }
  handleScroll() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.2;
    if (this.heroSection) {
      this.heroSection.style.transform = `translateY(${rate}px)`;
    }
  }
}

// Card hover tilt
class CardEffects {
  constructor() {
    this.cards = document.querySelectorAll('.card, .activity-card');
    this.init();
  }
  init() {
    this.cards.forEach(card => {
      card.addEventListener('mouseenter', e => this.handleMouseEnter(e));
      card.addEventListener('mouseleave', e => this.handleMouseLeave(e));
      card.addEventListener('mousemove', e => this.handleMouseMove(e));
    });
  }
  handleMouseEnter(e) {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
  }
  handleMouseLeave(e) {
    const card = e.currentTarget;
    card.style.transform = '';
    setTimeout(() => { card.style.transition = ''; }, 300);
  }
  handleMouseMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  }
}

// Smooth scrolling
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.init();
  }
  init() {
    this.links.forEach(link =>
      link.addEventListener('click', e => this.handleClick(e))
    );
  }
  handleClick(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// Letter-by-letter title animation
class TextAnimations {
  constructor() {
    this.heroTitle = document.querySelector('.hero-title');
    this.init();
  }
  init() {
    if (this.heroTitle) {
      this.animateTitle();
    }
  }
  animateTitle() {
    const text = this.heroTitle.textContent;
    this.heroTitle.innerHTML = '';
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.animationDelay = `${index * 0.1}s`;
      span.style.animation = 'charFadeIn 0.6s ease-out forwards';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      this.heroTitle.appendChild(span);
    });
  }
}

// Performance optimizations
class PerformanceOptimizer {
  constructor() { this.init(); }
  init() {
    this.addCustomStyles();
    this.optimizeAnimations();
    this.handleReducedMotion();
  }
  addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes charFadeIn {
        to { opacity: 1; transform: translateY(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
      .no-js [data-aos] { opacity: 1; transform: none; }
    `;
    document.head.appendChild(style);
  }
  optimizeAnimations() {
    document.addEventListener('visibilitychange', () => {
      const animations = document.getAnimations();
      animations.forEach(animation => {
        if (document.hidden) animation.pause();
        else animation.play();
      });
    });
  }
  handleReducedMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduced-motion');
    }
  }
}

// Page load animations
class LoadingManager {
  constructor() { this.init(); }
  init() {
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      this.startAnimations();
    });
    setTimeout(() => {
      if (!document.body.classList.contains('loaded')) {
        document.body.classList.add('loaded');
        this.startAnimations();
      }
    }, 3000);
  }
  startAnimations() {
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, i) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 200);
    });
  }
}

// Counter animation
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('[data-counter]');
    this.init();
  }
  init() {
    if (this.counters.length > 0) this.observeCounters();
  }
  observeCounters() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          this.animateCounter(entry.target);
          entry.target.classList.add('counted');
        }
      });
    }, { threshold: 0.5 });
    this.counters.forEach(counter => observer.observe(counter));
  }
  animateCounter(element) {
    const target = parseInt(element.dataset.counter);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }
}

// Error handler
class ErrorHandler {
  constructor() { this.init(); }
  init() {
    window.addEventListener('error', e => {
      console.warn('E-Cell Website Error:', e.error);
      this.fallbackMode();
    });
  }
  fallbackMode() {
    document.body.classList.add('fallback-mode');
    const style = document.createElement('style');
    style.textContent = `
      .fallback-mode [data-aos] {
        opacity: 1 !important;
        transform: none !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.remove('no-js');
  new AOS();
  new ParallaxController();
  new CardEffects();
  new SmoothScroll();
  new TextAnimations();
  new PerformanceOptimizer();
  new LoadingManager();
  new CounterAnimation();
  new ErrorHandler();
  console.log('E-Cell About Us page initialized successfully!');
});
