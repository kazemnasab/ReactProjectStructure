export const UserRole = {
  Admin: 0,
  Editor: 1,
};

/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-default';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'fa';
export const localeOptions = [
  { id: 'fa', name: 'Farsi - RTL', direction: 'rtl' },
  { id: 'en', name: 'English - LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English - RTL', direction: 'rtl' },
];

export const currentUser = {
  id: 1,
  name: 'محمد کاظم نسب',
  img: '/assets/img/profiles/l-1.jpg',
  date: 'آخرین بازدید امروز 15:24',
  role: UserRole.Admin,
  roleTitle: 'UserRole.Admin',
  ApiToken: "",
};

export const baseRoot = 'http://localhost:3000/app';
export const adminRoot = '/app';
export const publicPath = '/features/';
export const searchPath = `${adminRoot}/pages/miscellaneous/search`;
//export const servicePath =  "https://localhost:7032/api";//'https://localhost:7069/api';
export const servicePath = "https://localhost:7032/api";//'https://localhost:7069/api';

export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = true;
export const defaultColor = 'light.purplemonster';
export const isDarkSwitchActive = true;
export const defaultDirection = 'rtl';
export const themeRadiusStorageKey = '__theme_radius';
export const isAuthGuardActive = false;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];
