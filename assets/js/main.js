/**
 * CAUÃ VICTOR — VIOLÃO & CONTRABAIXO
 * Scripts de Interatividade, Acessibilidade e Micro-interações Dinâmicas (Lottie)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Controle da Navbar Scrolled
  const header = document.querySelector('.header');
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Menu Mobile Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
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

  // 4. Micro-interação Dinâmica com Lottie para Feedbacks de Ação (CTA WhatsApp)
  const actionModal = document.getElementById('action-modal');
  const actionModalLottie = document.getElementById('action-modal-lottie');
  const ctaLinks = document.querySelectorAll('.btn-primary, .btn-cta-large, .nav-cta');

  if (actionModal) {
    ctaLinks.forEach(cta => {
      cta.addEventListener('click', (e) => {
        const href = cta.getAttribute('href');
        // Se for um link de agendamento no WhatsApp
        if (href && href.includes('wa.me')) {
          e.preventDefault();

          // Exibe feedback dinâmico Lottie
          actionModal.classList.add('active');
          actionModal.setAttribute('aria-hidden', 'false');

          if (actionModalLottie && typeof actionModalLottie.seek === 'function') {
            actionModalLottie.seek(0);
            actionModalLottie.play();
          }

          // Transição sutil de confirmação e redirecionamento seguro
          setTimeout(() => {
            window.open(href, '_blank', 'noopener,noreferrer');
            setTimeout(() => {
              actionModal.classList.remove('active');
              actionModal.setAttribute('aria-hidden', 'true');
            }, 400);
          }, 850);
        }
      });
    });

    // Fechar ao clicar fora
    actionModal.addEventListener('click', (e) => {
      if (e.target === actionModal) {
        actionModal.classList.remove('active');
        actionModal.setAttribute('aria-hidden', 'true');
      }
    });
  }
});
