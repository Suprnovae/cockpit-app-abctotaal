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
    'OK': 'Akkoord',
    'Cancel': 'Annuleer',
    'Verify credentials, try again': 'Verifieer uw login gegevens en probeer nogmaals',
    'Invalid credentials': 'Ongeldige login gegevens',
  },
  'en': {
    'Profile': 'Profile',
    'Overview': 'Overview',
    'Login': 'Login',
    'Email': 'E-mail address',
    'Password': 'Password',
    'OK': 'OK',
    'Cancel': 'Cancel',
    'Verify credentials, try again': 'Please verify your credentials and try again',
    'Invalid credentials': 'Invalid credentials',
  }
};

export default I18n;
