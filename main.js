/* ══ SIDE NAV DOTS ══ */
    const sideDots = document.querySelectorAll('.side-dot');
    const sections = ['home', 'about', 'lore', 'univers'];

    sideDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const target = document.getElementById(dot.dataset.target);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    const sectionEls = sections.map(id => document.getElementById(id));
    const sideObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sideDots.forEach(d => d.classList.remove('active'));
          const active = document.querySelector('.side-dot[data-target="' + entry.target.id + '"]');
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.4 });
    sectionEls.forEach(el => { if (el) sideObserver.observe(el); });

    /* ══ PÉTALES PNG ══ */
    const petalsContainer = document.getElementById('petals');
    const petalFiles = ['images/petal-1.png', 'images/petal-2.png', 'images/petal-3.png'];
    const totalPetals = 18; // 6 instances de chaque

    for (let i = 0; i < totalPetals; i++) {
      const wrapper = document.createElement('div');
      wrapper.className = 'petal-item';

      const img = document.createElement('img');
      img.src = petalFiles[i % 3];
      img.alt = '';
      img.draggable = false;

      // Taille aléatoire 30–70px
      const size = 30 + Math.random() * 40;
      img.style.width  = size + 'px';
      img.style.height = 'auto';

      wrapper.appendChild(img);

      // Position horizontale aléatoire
      wrapper.style.left = (Math.random() * 100) + '%';

      // Durée et délai — délai négatif pour que des pétales soient déjà visibles dès le chargement
      const dur   = 10 + Math.random() * 14;
      const delay = -(Math.random() * dur);
      wrapper.style.animationDuration = dur + 's';
      wrapper.style.animationDelay    = delay + 's';

      petalsContainer.appendChild(wrapper);
    }

    /* ══ FRISE CHRONOLOGIQUE SLIDER ══ */
    const track    = document.getElementById('timelineTrack');
    const cards    = Array.from(track.querySelectorAll('.tl-card'));
    const btnPrev  = document.getElementById('tlPrev');
    const btnNext  = document.getElementById('tlNext');
    const dotsWrap = document.getElementById('tlDots');
    const counter  = document.getElementById('tlCounter');
    const total    = cards.length;
    let current    = 0;

    // Créer les dots indicateurs
    cards.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'tl-indicator' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Aller au chapitre ' + (i + 1));
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    });

    function goTo(idx) {
      cards[current].classList.remove('active');
      dotsWrap.children[current].classList.remove('active');
      current = idx;
      cards[current].classList.add('active');
      dotsWrap.children[current].classList.add('active');
      track.style.transform = `translateX(-${current * 100}%)`;
      counter.textContent   = (current + 1) + ' / ' + total;
      btnPrev.disabled = current === 0;
      btnNext.disabled = current === total - 1;
    }

    btnPrev.addEventListener('click', () => { if (current > 0)       goTo(current - 1); });
    btnNext.addEventListener('click', () => { if (current < total-1) goTo(current + 1); });
    goTo(0);

    // Swipe tactile
    let txStart = 0;
    track.addEventListener('touchstart', e => { txStart = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - txStart;
      if (Math.abs(dx) > 50) dx < 0 ? btnNext.click() : btnPrev.click();
    });

    /* ══ SCROLL REVEAL ══ */
    const revealObs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(r => revealObs.observe(r));

    /* ══ THEME SOMBRE / CLAIR ══ */
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// 1. Vérifie si l'utilisateur a déjà choisi un thème par le passé, 
// sinon on prend le thème de son système d'exploitation.
const currentTheme = localStorage.getItem('theme') || 
                     (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

// 2. Fonction pour appliquer le thème
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// 3. Appliquer le thème directement au chargement
applyTheme(currentTheme);

// 4. Action quand on clique sur le bouton
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    // On regarde quel est le thème actuel sur la page
    let activeTheme = document.documentElement.getAttribute('data-theme');
    
    // On inverse le thème
    let newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    // On l'applique et on le sauvegarde
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}
