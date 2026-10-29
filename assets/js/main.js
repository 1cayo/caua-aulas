/**
 * CAUÃ VICTOR — VIOLÃO & CONTRABAIXO
 * Scripts de Interatividade, Acessibilidade e Navegação Responsiva
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Controle da Navbar Scrolled
  const header = document.querySelector('.header');
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Menu Mobile Toggle com Acessibilidade e Overlay
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('primary-navigation');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  const openMobileMenu = () => {
    if (!navMenu || !mobileToggle) return;
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileToggle.classList.add('active');
    navMenu.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.classList.add('no-scroll');
  };

  const closeMobileMenu = () => {
    if (!navMenu || !mobileToggle) return;
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.classList.remove('active');
    navMenu.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  };

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Fechar ao clicar em links do menu
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Fechar ao clicar no overlay escuro
    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        closeMobileMenu();
      });
    }

    // Fechar ao pressionar tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });

    // Fechar se redimensionar para tela grande
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }

  // 3. FAQ Accordion Interativo
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Fecha outros itens para manter acordeom limpo
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('open');
            otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
          }
        });

        // Alterna o item atual
        item.classList.toggle('open', !isOpen);
        questionBtn.setAttribute('aria-expanded', String(!isOpen));
      });
    }
  });
});
