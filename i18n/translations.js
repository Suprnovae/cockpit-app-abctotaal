import I18n from 'react-native-i18n';

I18n.fallbacks = 'nl';

I18n.defaultLocale = 'nl';

I18n.translations = {
//  'fr': {
//    'Profile': 'Profile US',
//    'Overview': 'Overview US',
//    'Login': 'Login US',
//  },
  'nl': {
    'Profile': 'Profiel',
    'Overview': 'Overzicht',
    'Login': 'Inloggen',
    'Email': 'E-mail adres',
    'Password': 'Wachtwoord',
  },
  'en': {
    'Profile': 'Profile',
    'Overview': 'Overview',
    'Login': 'Login',
    'Email': 'E-mail address',
    'Password': 'Password',
  }
};

export default I18n;
