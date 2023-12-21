import {
  defaultDirection,
  defaultLocale,
  defaultColor,
  localeOptions,
  themeColorStorageKey,
  themeRadiusStorageKey,
  currentUser
} from 'constants/defaultValues';

export const mapOrder = (array, order, key) => {
  // eslint-disable-next-line func-names
  array.sort(function (a, b) {
    const A = a[key];
    const B = b[key];
    if (order.indexOf(`${A}`) > order.indexOf(`${B}`)) {
      return 1;
    }
    return -1;
  });
  return array;
};

export const getDateWithFormat = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!

  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}.${mm}.${yyyy}`;
};

export const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
};

export const getDirection = () => {
  let direction = defaultDirection;

  try {
    if (localStorage.getItem('direction')) {
      const localValue = localStorage.getItem('direction');
      if (localValue === 'rtl' || localValue === 'ltr') {
        direction = localValue;
      }
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getDirection -> error', error);
    direction = defaultDirection;
  }
  return {
    direction,
    isRtl: direction === 'rtl',
  };
};
export const setDirection = (localValue) => {
  let direction = 'ltr';
  if (localValue === 'rtl' || localValue === 'ltr') {
    direction = localValue;
  }
  try {
    localStorage.setItem('direction', direction);
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setDirection -> error', error);
  }
};

export const getCurrentColor = () => {
  let currentColor = defaultColor;
  try {
    if (localStorage.getItem(themeColorStorageKey)) {
      currentColor = localStorage.getItem(themeColorStorageKey);
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getCurrentColor -> error', error);
    currentColor = defaultColor;
  }
  return currentColor;
};

export const setCurrentColor = (color) => {
  try {
    localStorage.setItem(themeColorStorageKey, color);
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentColor -> error', error);
  }
};

export const getCurrentRadius = () => {
  let currentRadius = 'rounded';
  try {
    if (localStorage.getItem(themeRadiusStorageKey)) {
      currentRadius = localStorage.getItem(themeRadiusStorageKey);
    }
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : getCurrentRadius -> error',
      error
    );
    currentRadius = 'rounded';
  }
  return currentRadius;
};
export const setCurrentRadius = (radius) => {
  try {
    localStorage.setItem(themeRadiusStorageKey, radius);
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : setCurrentRadius -> error',
      error
    );
  }
};

export const getCurrentLanguage = () => {
  let language = defaultLocale;
  try {
    language =
      localStorage.getItem('currentLanguage') &&
        localeOptions.filter(
          (x) => x.id === localStorage.getItem('currentLanguage')
        ).length > 0
        ? localStorage.getItem('currentLanguage')
        : defaultLocale;
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : getCurrentLanguage -> error',
      error
    );
    language = defaultLocale;
  }
  return language;
};
export const setCurrentLanguage = (locale) => {
  try {
    localStorage.setItem('currentLanguage', locale);
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : setCurrentLanguage -> error',
      error
    );
  }
};

export const getCurrentUser = () => {
return currentUser;
  let user = null;
  try {
    user =
      localStorage.getItem('api_current_user') != null
        ? JSON.parse(localStorage.getItem('api_current_user'))
        : null;
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js  : getCurrentUser -> error', error);
    user = null;
  }
  return user;
};

export const getCurrentToken = () => {
  let user = getCurrentUser();
  if (user)
    return user.token;
  return "";
};

export const setCurrentUser = async (user) => {
  try {
    if (user) {
      return await localStorage.setItem('api_current_user', JSON.stringify(user));
    } else {
      return await localStorage.removeItem('api_current_user');
    }
  } catch (error) {
    return await console.log('>>>>: src/helpers/Utils.js : setCurrentUser -> error', error);
  }
};


export const formatNumberWithCommas = (num)=> {
  const numStr = num.toString();
  const numArr = numStr.split('');
  let commaCount = 0;
  
  for (let i = numArr.length - 1; i >= 0; i--) {
    commaCount++;
    if (commaCount === 3 && i !== 0) {
      numArr.splice(i, 0, ',');
      commaCount = 0;
    }
  }
  
  return numArr.join('');
}


export const  converNumberToLetter = (number)=> {
  const Letters = {
    "0-0": "",
    "0-1": "یک",
    "0-2": "دو",
    "0-3": "سه",
    "0-4": "چهار",
    "0-5": "پنج",
    "0-6": "شش",
    "0-7": "هفت",
    "0-8": "هشت",
    "0-9": "نه",
    "10": "ده",
    "11": "یازده",
    "12": "دوازده",
    "13": "سیزده",
    "14": "چهارده",
    "15": "پانزده",
    "16": "شانزده",
    "17": "هفده",
    "18": "هجده",
    "19": "نوزده",
    "1-0": "",
    "1-2": "بیست",
    "1-3": "سی",
    "1-4": "چهل",
    "1-5": "پنجاه",
    "1-6": "شصت",
    "1-7": "هفتاد",
    "1-8": "هشتاد",
    "1-9": "نود",
    "2-0": "",
    "2-1": "صد",
    "2-2": "دویست",
    "2-3": "سیصد",
    "2-4": "چهارصد",
    "2-5": "پانصد",
    "2-6": "ششصد",
    "2-7": "هفتصد",
    "2-8": "هشتصد",
    "2-9": "نهصد",
    "0": "",
    "1": "هزار",
    "2": "میلیون",
    "3": "میلیارد",
    "4": "بیلیون"
  };

  if (number === 0)
    return "صفر";

  let inp = number.toString();
  let temp = "";
  let output = "";
  let index = inp.length % 3;
  let value = 0;
  let camma = "";

  if (index > 0) {
    temp = inp.substring(0, index);
    value = parseInt(temp);

    if (value >= 10 && value < 20)
      output += " " + Letters[value.toString()];
    else {
      output += " " + Letters["1-" + Math.floor((value % 100) / 10)];
      if (Letters["1-" + Math.floor((value % 100) / 10)] !== "")
        camma = " و";
      output += " " + Letters["0-" + (value % 10)];
      camma = "";
    }

    output += " " + Letters[((inp.length - index) / 3).toString()];
  }

  while (index + 3 <= inp.length) {
    temp = inp.substring(index, index + 3);
    value = parseInt(temp);
    camma = "";

    if (Letters["2-" + Math.floor(value / 100)] !== "" && output.length > 0)
      camma = " و";

    output += camma + " " + Letters["2-" + Math.floor(value / 100)];

    if (value % 100 >= 10 && value % 100 < 20) {
      if (Letters[value % 100+""] !== "" && output.length > 0)
        camma = " و";
      output += camma + " " + Letters[value % 100];
    } else {
      camma = "";
      if (Letters["1-" + Math.floor((value % 100) / 10)] !== "" && output.length > 0)
        camma = " و";
      output += camma + " " + Letters["1-" + Math.floor((value % 100) / 10)];
      camma = "";
      if (Letters["0-" + (value % 10)] !== "" && output.length > 0)
        camma = " و";
      output += camma + " " + Letters["0-" + (value % 10)];
    }

    index += 3;
    if (value !== 0)
      output += " " + Letters[((inp.length - index) / 3).toString()];
  }

  return output;
}
