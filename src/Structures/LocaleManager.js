const i18next = require('i18next');
const i18nbackend = require('i18next-fs-backend');
const { readdirSync } = require('fs');

module.exports = class LocaleManager {
  constructor(client) {
    this.client = client;
  }

  async loadLocales() {
    await i18next.use(i18nbackend).init({
      ns: ['commands', 'events', 'music'],
      defaultNS: 'commands',
      preload: readdirSync('src/Locales'),
      fallbackLng: 'en-US',
      backend: { loadPath: 'src/Locales/{{lng}}/{{ns}}.json' },
      load: 'all',
      interpolation: {
        escapeValue: false,
        useRawValueToEscape: true
      },
      returnEmptyString: false,
      returnObjects: true
    });
  }
  async reload({ all, langs}) {
    if(all) {
     await i18next.reloadResources() 
    } else if(langs.length <= 1) {
      await i18next.reloadResources(langs)
    }
  }
};
