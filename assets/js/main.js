/**
 * CAUÃ VICTOR — VIOLÃO & CONTRABAIXO
 * Scripts de Interatividade, Acessibilidade e Web Audio API
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Controle da Navbar Scrolled
  const header = document.querySelector('.header');
  const handleScroll = () => {
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

  // 3. Sintetizador de Cordas com Web Audio API (Puro Vanilla JS)
  // Gera o som harmônico e realista de corda dedilhada
  let audioCtx = null;

  const getAudioContext = () => {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  };

  // Notas e Frequências Reais de Afinação Padrão
  const frequencies = {
    'E2': 82.41,  // 6ª corda Violão (Mi)
    'A2': 110.00, // 5ª corda Violão (Lá)
    'D3': 146.83, // 4ª corda Violão (Ré)
    'G3': 196.00, // 3ª corda Violão (Sol)
    'B3': 246.94, // 2ª corda Violão (Si)
    'E4': 329.63, // 1ª corda Violão (Mi agudo)
    'E1': 41.20,  // 4ª corda Baixo (Mi grave)
    'A1': 55.00,  // 3ª corda Baixo (Lá grave)
    'D2': 73.42,  // 2ª corda Baixo (Ré grave)
    'G2': 98.00   // 1ª corda Baixo (Sol grave)
  };

  const playPluckSound = (frequency) => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Oscilador principal em onda triangular para som acústico quente
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, now);

      // Oscilador secundário (senoidal) para reforço do harmônico fundamental
      const subOsc = ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(frequency * 2, now);

      // Filtro Lowpass para simular a ressonância da madeira do instrumento
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(frequency * 6, now);
      filter.frequency.exponentialRampToValueAtTime(frequency * 1.5, now + 1.2);

      // Envelope de Ganho (Attack rápido, Decay e Sustain com decaimento natural)
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.linearRampToValueAtTime(0.45, now + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      // Conexões de áudio
      osc.connect(filter);
      subOsc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Início e término
      osc.start(now);
      subOsc.start(now);
      osc.stop(now + 1.9);
      subOsc.stop(now + 1.9);
    } catch (e) {
      console.warn('Web Audio indisponível ou bloqueado pelo navegador:', e);
    }
  };

  const stringButtons = document.querySelectorAll('.string-btn');
  stringButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const note = btn.getAttribute('data-note');
      const freq = frequencies[note];

      if (freq) {
        playPluckSound(freq);
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 300);
      }
    });
  });

  // 4. FAQ Accordion Interativo
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Fecha todos os outros itens para manter o acordeom limpo
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

  // 5. Quiz / Simulador Interativo de Nível
  const quizSteps = document.querySelectorAll('.quiz-step');
  const quizOptions = document.querySelectorAll('.quiz-option-btn');
  const quizResultBox = document.querySelector('.quiz-result-box');
  const quizResultTitle = document.getElementById('quiz-result-title');
  const quizResultDesc = document.getElementById('quiz-result-desc');
  const quizResultCta = document.getElementById('quiz-result-cta');

  const quizState = {
    instrument: '',
    level: '',
    goal: ''
  };

  quizOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.getAttribute('data-step');
      const value = btn.getAttribute('data-value');

      if (step === '1') {
        quizState.instrument = value;
        goToStep(2);
      } else if (step === '2') {
        quizState.level = value;
        goToStep(3);
      } else if (step === '3') {
        quizState.goal = value;
        showQuizResult();
      }
    });
  });

  const goToStep = (stepNumber) => {
    quizSteps.forEach(s => s.classList.remove('active'));
    const nextStep = document.getElementById(`quiz-step-${stepNumber}`);
    if (nextStep) {
      nextStep.classList.add('active');
    }
  };

  const showQuizResult = () => {
    quizSteps.forEach(s => s.classList.remove('active'));
    const resultStep = document.getElementById('quiz-step-result');
    if (resultStep) {
      resultStep.classList.add('active');
    }

    let recomendacao = '';
    let descricao = '';
    let mensagemWhatsapp = '';

    if (quizState.instrument === 'contrabaixo') {
      recomendacao = 'Trilha Groove Master: Contrabaixo do Zero ao Palco';
      descricao = `Excelente escolha! Com foco no seu objetivo (${quizState.goal}), você vai dominar a pegada, ritmo com bateria, slap, pizzicato e harmonia aplicada ao baixo sem perder tempo.`;
      mensagemWhatsapp = `Olá Cauã! Fiz o teste no seu site. Quero aprender Contrabaixo com foco em ${quizState.goal} (meu nível: ${quizState.level}). Gostaria de agendar minha aula experimental!`;
    } else if (quizState.instrument === 'violao') {
      recomendacao = 'Trilha Harmonia Total: Violão Prático e Repertório';
      descricao = `Perfeito! Para o seu objetivo (${quizState.goal}), você vai aprender acordes sem dor nos dedos, pestanas sem travar, dedilhados e batidas rítmicas com as músicas que você curte.`;
      mensagemWhatsapp = `Olá Cauã! Fiz o teste no site. Quero aprender Violão focado em ${quizState.goal} (meu nível: ${quizState.level}). Podemos marcar minha aula experimental?`;
    } else {
      recomendacao = 'Trilha Multi-Instrumentista: Violão & Baixo Integrados';
      descricao = `Sensacional! Aprender violão e baixo juntos te dará uma visão harmônica e rítmica completa que poucos músicos alcançam.`;
      mensagemWhatsapp = `Olá Cauã! Fiz o teste no site e quero aprender Violão e Contrabaixo (meu nível: ${quizState.level}). Quero agendar a aula experimental!`;
    }

    if (quizResultTitle) quizResultTitle.textContent = recomendacao;
    if (quizResultDesc) quizResultDesc.textContent = descricao;
    if (quizResultCta) {
      const encodedMsg = encodeURIComponent(mensagemWhatsapp);
      quizResultCta.setAttribute('href', `https://wa.me/5581984719193?text=${encodedMsg}`);
    }
  };

  // Botão para reiniciar o Quiz se o aluno desejar
  const quizRestartBtn = document.getElementById('quiz-restart-btn');
  if (quizRestartBtn) {
    quizRestartBtn.addEventListener('click', () => {
      quizState.instrument = '';
      quizState.level = '';
      quizState.goal = '';
      goToStep(1);
    });
  }
});
