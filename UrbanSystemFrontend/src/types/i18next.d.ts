// This file ensures TypeScript knows about our translation keys.
// When developers type t('...'), they will get autocomplete for valid keys!

import 'i18next';
import { resources, defaultNS } from '../lib/i18n';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources['en'];
  }
}
