const translations = {
  ru: {
    pageTitle: 'Наш проект ко Дню независимости Республики Казахстан — Меновновская средняя школа',
    schoolName: 'Меновновская средняя школа',
    headerSub: 'Творческий проект учеников',
    heroBadge: '16 декабря · День независимости Республики Казахстан',
    heroTitle: 'Наш проект ко Дню независимости Республики Казахстан 🇰🇿',
    heroSubtitle: 'Меновновская средняя школа · 8 «В» класс',
    heroCaption: 'Специальный медиапроект, созданный учениками 8 «В» класса с любовью к Родине, уважением к её истории, культуре и достижениям независимого Казахстана.',
    videosTitle: 'Посмотрите видео по нашему проекту',
    videosDescription: 'Мы подготовили видеоролики на казахском и русском языках. Выберите удобный вариант и посмотрите нашу работу.',
    kzCardTitle: 'Видео на казахском языке',
    kzCardDesc: 'Праздничный видеоролик на государственном языке, посвящённый независимости, единству и будущему нашей страны.',
    kzCardBtn: 'Смотреть в Instagram',
    ruCardTitle: 'Видео на русском языке',
    ruCardDesc: 'Полная версия нашего школьного видеопроекта на русском языке о пути становления и процветания Республики Казахстан.',
    ruCardBtn: 'Смотреть на YouTube',
    footerText: 'Меновновская средняя школа · 8 «В» класс',
    footerSub: 'Ко Дню независимости Республики Казахстан 🇰🇿'
  },
  kk: {
    pageTitle: 'Қазақстан Республикасының Тәуелсіздік күніне арналған жобамыз — Меновновка орта мектебі',
    schoolName: 'Меновновка орта мектебі',
    headerSub: 'Оқушылардың шығармашылық жобасы',
    heroBadge: '16 желтоқсан · Қазақстан Республикасының Тәуелсіздік күні',
    heroTitle: 'Қазақстан Республикасының Тәуелсіздік күніне арналған жобамыз 🇰🇿',
    heroSubtitle: 'Меновновка орта мектебі · 8 «В» сыныбы',
    heroCaption: '8 «В» сынып оқушыларының Отанға деген сүйіспеншілікпен, тәуелсіз Қазақстанның тарихына, мәдениеті мен жетістіктеріне деген құрметпен дайындаған арнайы медиажобасы.',
    videosTitle: 'Жобамыз бойынша бейнероликтерді тамашалаңыз',
    videosDescription: 'Біз қазақ және орыс тілдерінде бейнероликтер дайындадық. Өзіңізге ыңғайлы нұсқаны таңдап, жұмысымызды көріңіз.',
    kzCardTitle: 'Қазақ тіліндегі бейнеролик',
    kzCardDesc: 'Еліміздің тәуелсіздігіне, бірлігі мен жарқын болашағына арналған мемлекеттік тілдегі мерекелік бейнеролик.',
    kzCardBtn: 'Instagram-нан көру',
    ruCardTitle: 'Орыс тіліндегі бейнеролик',
    ruCardDesc: 'Қазақстан Республикасының қалыптасуы мен өркендеу жолы туралы орыс тіліндегі мектеп бейнежобасының толық нұсқасы.',
    ruCardBtn: 'YouTube-тан көру',
    footerText: 'Меновновка орта мектебі · 8 «В» сыныбы',
    footerSub: 'Қазақстан Республикасының Тәуелсіздік күніне орай 🇰🇿'
  }
};

const STORAGE_KEY = 'menovnovskaya_project_lang';

function detectInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ru' || saved === 'kk') {
      return saved;
    }
  } catch (e) {
    // Игнорируем ошибку, если localStorage недоступен
  }

  const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
  if (browserLang.startsWith('kk') || browserLang.startsWith('kz')) {
    return 'kk';
  }
  return 'ru';
}

function applyLanguage(lang) {
  const dictionary = translations[lang] || translations.ru;

  document.documentElement.lang = lang === 'kk' ? 'kk' : 'ru';

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dictionary[key]) {
      el.textContent = dictionary[key];
    }
  });

  const buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach((btn) => {
    const isActive = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    // Игнорируем ошибку сохранения
  }
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 90}ms`;
    observer.observe(item);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const initialLang = detectInitialLanguage();
  applyLanguage(initialLang);

  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      applyLanguage(selectedLang);
    });
  });

  initRevealAnimations();
});
