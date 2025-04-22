import './style.css'
// after the page loads, set OG URL to the full canonical URL
import i18next from 'i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
document.addEventListener('DOMContentLoaded', () => {
  const ogUrlMeta = document.head.querySelector<HTMLMetaElement>(
    'meta[property="og:url"]'
  );
  if (ogUrlMeta) {
    ogUrlMeta.content = window.location.href;
  } else {
    // Fallback: create the tag if missing
    const meta = document.createElement('meta');                             // :contentReference[oaicite:1]{index=1}
    meta.setAttribute('property', 'og:url');
    meta.content = window.location.href;                                       // :contentReference[oaicite:2]{index=2}
    document.head.appendChild(meta);
  }
});

i18next
    .use(I18NextHttpBackend)
    .use(I18nextBrowserLanguageDetector)
    .init({
        fallbackLng: 'en',
        debug: false,
        backend: { loadPath: '/locales/{{lng}}.json' },
    }, () => {
        // Translate all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = i18next.t(String(key));
        });

        // Set the language selector to the current language
        const languageSelector = document.getElementById('languageSelector') as HTMLSelectElement | null;
        if (languageSelector) {
            languageSelector.value = i18next.language;
        }

        // Set HTML attributes for direction and language
        document.documentElement.dir = i18next.language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = i18next.language;
    });
function changeLanguage(lng: string) {
    i18next.changeLanguage(lng).then(() => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n')
            el.textContent = i18next.t(key as string);
        });
        document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lng;
    });
}

const languageSelector = document.getElementById('languageSelector') as HTMLSelectElement | null;

languageSelector?.addEventListener('change', (e) => {
    const select = e.target as HTMLSelectElement;
    changeLanguage(select.value);
  });
  
// Language switcher function
