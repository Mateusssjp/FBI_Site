/* Global App Script for FBI Tactical Dashboard */
(() => {
  const ADMIN_EMAIL = "mateusjp270@gmail.com";
  const ADMIN_PASSWORD = "#Mateusl23";
  const EASTER_EGG_CLICKS = 7;

  const state = {
    clickCount: 0,
    language: localStorage.getItem('fbi_lang') || 'en',
    user: null,
  };

  const translations = {
    en: {
      title: 'FBI Ops Dashboard',
      subtitle: 'Tactical operations interface for mission planning.',
      explore: 'Explore Project',
      carousel: 'Mission Preview',
      team: 'Team',
      userStories: 'User Stories',
      profile: 'Profile',
      loginTitle: 'Secure Access',
      loginEmail: 'Email',
      loginPassword: 'Password',
      loginButton: 'Authenticate',
      loginSuccess: 'Access granted',
      loginFail: 'Authentication failed',
      adminPanel: 'Admin Panel',
      logout: 'Logout',
      settings: 'Settings',
      loading: 'Loading...',
      language: 'Language',
      theme: 'Theme',
      easterEgg: 'Hidden protocol activated',
      teamMembers: 'Team members',
      userStory1: 'As an agent, I want to plan missions so I can deploy teams efficiently.',
      userStory2: 'As an operator, I want to track system status in real-time.',
      userStory3: 'As a commander, I want to review mission logs and outcomes.',
      profileTitle: 'Operator Profile',
      profileDescription: 'View the current session and access credentials.',
      profileEmail: 'Email',
      logoutSuccess: 'Signed out successfully.',
    },
    pt: {
      title: 'Dashboard de Operações FBI',
      subtitle: 'Interface tática para planeamento de missões.',
      explore: 'Explorar Projeto',
      carousel: 'Pré-visualização da Missão',
      team: 'Equipa',
      userStories: 'Histórias de Utilizador',
      profile: 'Perfil',
      loginTitle: 'Acesso Seguro',
      loginEmail: 'Email',
      loginPassword: 'Palavra-passe',
      loginButton: 'Autenticar',
      loginSuccess: 'Acesso concedido',
      loginFail: 'Falha na autenticação',
      adminPanel: 'Painel Admin',
      logout: 'Sair',
      settings: 'Definições',
      loading: 'A carregar...',
      language: 'Idioma',
      theme: 'Tema',
      easterEgg: 'Protocolo oculto ativado',
      teamMembers: 'Membros da equipa',
      userStory1: 'Como agente, quero planear missões para implantar equipas eficientemente.',
      userStory2: 'Como operador, quero monitorizar o estado do sistema em tempo real.',
      userStory3: 'Como comandante, quero rever registos de missões e resultados.',
      profileTitle: 'Perfil do Operador',
      profileDescription: 'Veja a sessão atual e credenciais de acesso.',
      profileEmail: 'Email',
      logoutSuccess: 'Sessão terminada com sucesso.',
    },
    it: {
      title: 'Cruscotto Operazioni FBI',
      subtitle: 'Interfaccia tattica per la pianificazione delle missioni.',
      explore: 'Esplora il Progetto',
      carousel: 'Anteprima Missione',
      team: 'Team',
      userStories: 'User Stories',
      profile: 'Profilo',
      loginTitle: 'Accesso Sicuro',
      loginEmail: 'Email',
      loginPassword: 'Password',
      loginButton: 'Autenticati',
      loginSuccess: 'Accesso consentito',
      loginFail: 'Autenticazione fallita',
      adminPanel: 'Pannello Admin',
      logout: 'Esci',
      settings: 'Impostazioni',
      loading: 'Caricamento...',
      language: 'Lingua',
      theme: 'Tema',
      easterEgg: 'Protocollo nascosto attivato',
      teamMembers: 'Membro del team',
      userStory1: 'Come agente, voglio pianificare le missioni per distribuire le squadre efficacemente.',
      userStory2: 'Come operatore, voglio monitorare lo stato del sistema in tempo reale.',
      userStory3: 'Come comandante, voglio rivedere i log delle missioni e i risultati.',
      profileTitle: 'Profilo Operatore',
      profileDescription: 'Visualizza la sessione corrente e le credenziali di accesso.',
      profileEmail: 'Email',
      logoutSuccess: 'Disconnesso con successo.',
    },
    es: {
      title: 'Panel de Operaciones FBI',
      subtitle: 'Interfaz táctica para planificación de misiones.',
      explore: 'Explorar Proyecto',
      carousel: 'Vista previa de la misión',
      team: 'Equipo',
      userStories: 'Historias de Usuario',
      profile: 'Perfil',
      loginTitle: 'Acceso Seguro',
      loginEmail: 'Email',
      loginPassword: 'Contraseña',
      loginButton: 'Autenticar',
      loginSuccess: 'Acceso concedido',
      loginFail: 'Autenticación fallida',
      adminPanel: 'Panel Admin',
      logout: 'Cerrar sesión',
      settings: 'Configuración',
      loading: 'Cargando...',
      language: 'Idioma',
      theme: 'Tema',
      easterEgg: 'Protocolo oculto activado',
      teamMembers: 'Miembros del equipo',
      userStory1: 'Como agente, quiero planificar misiones para desplegar equipos eficazmente.',
      userStory2: 'Como operador, quiero monitorear el estado del sistema en tiempo real.',
      userStory3: 'Como comandante, quiero revisar registros de misiones y resultados.',
      profileTitle: 'Perfil de Operador',
      profileDescription: 'Ver la sesión actual y credenciales de acceso.',
      profileEmail: 'Email',
      logoutSuccess: 'Sesión cerrada con éxito.',
    },
  };

  const getTranslation = (key) => {
    return translations[state.language]?.[key] || translations.en[key] || key;
  };

  const applyTranslations = () => {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = getTranslation(key);
      if (el.placeholder !== undefined && el.hasAttribute('placeholder')) {
        el.placeholder = value;
      }
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.type === 'submit' || el.type === 'button') {
          el.value = value;
        }
      }
      if (el.tagName === 'IMG' && el.dataset.i18nAlt) {
        el.alt = value;
      }
      if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
        el.textContent = value;
      }
    });
  };

  const showToast = (message, variant = 'info') => {
    const toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) return;

    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center text-white border-0';
    toastEl.role = 'alert';
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    toastContainer.appendChild(toastEl);
    const toast = new bootstrap.Toast(toastEl, { delay: 3200 });
    toast.show();

    toastEl.addEventListener('hidden.bs.toast', () => {
      toastEl.remove();
    });
  };

  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('fbi_theme', theme);

    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
      themeSelect.value = theme;
    }
  };

  const applyStoredTheme = () => {
    const stored = localStorage.getItem('fbi_theme');
    if (stored) {
      setTheme(stored);
    } else {
      // Default to dark mode if not explicitly set
      setTheme('dark');
    }
  };

  const setLanguage = (lang) => {
    state.language = lang;
    localStorage.setItem('fbi_lang', lang);

    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
      languageSelect.value = lang;
    }

    applyTranslations();
  };

  const ensureAdminAccess = () => {
    const currentUser = JSON.parse(localStorage.getItem('fbi_user') || 'null');
    if (!currentUser || !currentUser.isAdmin) {
      window.location.href = 'index.html';
    }
  };

  const updateAdminLink = () => {
    const adminLink = document.getElementById('adminLink');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileEmailEl = document.getElementById('profileEmail');
    const userNameEl = document.getElementById('userName');
    const currentUser = JSON.parse(localStorage.getItem('fbi_user') || 'null');

    if (currentUser && currentUser.isAdmin) {
      if (adminLink) {
        adminLink.classList.remove('d-none');
      }
      const logoutBtnSidebar = document.getElementById('logoutBtnSidebar');

    if (logoutBtn) {
      logoutBtn.classList.remove('d-none');
      logoutBtn.onclick = performLogout;
    }

    if (logoutBtnSidebar) {
      logoutBtnSidebar.classList.remove('d-none');
      logoutBtnSidebar.onclick = performLogout;
    }

    if (profileEmailEl) {
      profileEmailEl.value = currentUser.email;
    }
    if (userNameEl) {
      userNameEl.textContent = currentUser.email;
    }
  } else {
    if (adminLink) {
      adminLink.classList.add('d-none');
    }
    if (logoutBtn) {
      logoutBtn.classList.add('d-none');
    }
    if (logoutBtnSidebar) {
      logoutBtnSidebar.classList.add('d-none');
    }
    if (profileEmailEl) {
      profileEmailEl.value = '';
    }
    if (userNameEl) {
      userNameEl.textContent = '';
    }
  }
  };

  const authenticate = (email, password) => {
    return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
  };

  const performLogin = () => {
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');

    if (!emailInput || !passwordInput) return;

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (authenticate(email, password)) {
      const user = { email, isAdmin: true };
      localStorage.setItem('fbi_user', JSON.stringify(user));
      updateAdminLink();
      showToast(getTranslation('loginSuccess'), 'success');
      const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      if (loginModal) {
        loginModal.hide();
      }
      // If this is the standalone login page, redirect into the admin dashboard.
      if (window.location.pathname.toLowerCase().includes('login_backoffice')) {
        window.location.href = 'backoffice.html';
      }
      return true;
    }

    showToast(getTranslation('loginFail'), 'danger');
    return false;
  };

  const performLogout = () => {
    localStorage.removeItem('fbi_user');
    updateAdminLink();
    showToast(getTranslation('logoutSuccess'), 'info');

    // If we are on an admin page, redirect back to the public landing.
    if (document.body.dataset.admin === 'true') {
      window.location.href = 'index.html';
    }
  };

  const initLoginForm = () => {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      performLogin();
    });

    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        performLogin();
      });
    }
  };

  const initEasterEgg = () => {
    const titleEl = document.getElementById('pageTitle');
    if (!titleEl) return;
    titleEl.addEventListener('click', () => {
      state.clickCount += 1;
      if (state.clickCount >= EASTER_EGG_CLICKS) {
        showToast(getTranslation('easterEgg'), 'info');
        state.clickCount = 0;
      }
    });
  };

  const initLanguageMenu = () => {
    const select = document.getElementById('languageSelect');
    if (select) {
      select.value = state.language;
      select.addEventListener('change', () => setLanguage(select.value));
    }

    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
      });
    });
  };

  const initThemeMenu = () => {
    const select = document.getElementById('themeSelect');
    if (select) {
      select.value = document.documentElement.dataset.theme || 'dark';
      select.addEventListener('change', () => setTheme(select.value));
    }

    document.querySelectorAll('[data-theme]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        setTheme(theme);
      });
    });
  };

  const initTooltips = () => {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
      new bootstrap.Tooltip(el, { html: true });
    });
  };

  const hideLoader = () => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 400);
    }
  };

  const initCarousel = () => {
    const carouselEl = document.querySelector('#gameCarousel');
    if (!carouselEl) return;
    const carousel = new bootstrap.Carousel(carouselEl, {
      interval: 5000,
      ride: 'carousel',
      pause: 'hover',
      wrap: true,
    });
  };

  const init = () => {
    applyStoredTheme();
    applyTranslations();
    updateAdminLink();

    if (document.body.dataset.admin === 'true') {
      ensureAdminAccess();
    }

    initLoginForm();
    initEasterEgg();
    initLanguageMenu();
    initThemeMenu();
    initTooltips();
    initCarousel();
    hideLoader();
  };

  document.addEventListener('DOMContentLoaded', init);
})();
