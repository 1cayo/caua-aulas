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

  // 4. Mini Player de Vídeo do Depoimento (Miguel Noronha: 29s até 1min 05s)
  const videoMiguel = document.getElementById('video-miguel');
  if (videoMiguel) {
    const START_TIME = 29; // 29 segundos
    const END_TIME = 65;   // 1 minuto e 5 segundos (65 segundos)

    // Ajusta o vídeo para iniciar aos 29s
    const setStartTime = () => {
      if (videoMiguel.currentTime < START_TIME || videoMiguel.currentTime > END_TIME) {
        try {
          videoMiguel.currentTime = START_TIME;
        } catch (e) {
          // Navegadores que bloqueiam seek pré-carregamento tratam no primeiro play
        }
      }
    };

    videoMiguel.addEventListener('loadedmetadata', setStartTime);

    // Garante início nos 29 segundos ao dar play
    videoMiguel.addEventListener('play', () => {
      if (videoMiguel.currentTime < START_TIME || videoMiguel.currentTime >= END_TIME) {
        videoMiguel.currentTime = START_TIME;
      }
    });

    // Controla o tempo de execução durante a reprodução
    videoMiguel.addEventListener('timeupdate', () => {
      // Quando atingir 1m05s (65s), pausa e redefine para os 29 segundos
      if (videoMiguel.currentTime >= END_TIME) {
        videoMiguel.pause();
        videoMiguel.currentTime = START_TIME;
      }
    });

    // Se o usuário tentar mover a barra de progresso fora do trecho delimitado
    videoMiguel.addEventListener('seeking', () => {
      if (videoMiguel.currentTime < START_TIME) {
        videoMiguel.currentTime = START_TIME;
      } else if (videoMiguel.currentTime > END_TIME) {
        videoMiguel.currentTime = END_TIME;
        videoMiguel.pause();
      }
    });
  }
});
