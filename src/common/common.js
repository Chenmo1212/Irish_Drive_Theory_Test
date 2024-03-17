import {Howl} from "howler"

export const NEW_VERSION = "1.3.4.240316";
export const DEFAULT_VERSION = "1.0.0.240202";
export const THEME_COLOR = "rgb(83, 109, 254)"
export const ERROR_COLOR = "rgb(245, 108, 108)"
export const OPTION_LABELS = ['A', "B", "C", "D"]

export const loadFromLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) return JSON.parse(storedValue);
  else {
    saveToLocalStorage(key, defaultValue);
    return defaultValue;
  }
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const compareVersions = (version1, version2) => version1.localeCompare(version2);

export const updateDataIfNewVersion = (currentVersion, newVersion) => {
  if (compareVersions(currentVersion, newVersion) < 0) {
    saveToLocalStorage('appVersion', newVersion);
    return true;
  }
  return false;
};


export const NORMAL_SOUND = "normal";
export const CORRECT_SOUND = "correct";
export const WRONG_SOUND = "wrong";
export const CLICK_SOUND = "click";
export const DELETE_SOUND = "delete";

export const playSound = (type) => {
  let sound = null;
  switch (type) {
    case NORMAL_SOUND:
      sound = new Howl({src: [NORMAL_SOUND + ".mp3"]});
      break;
    case CORRECT_SOUND:
      sound = new Howl({src: [CORRECT_SOUND + ".mp3"]});
      break;
    case WRONG_SOUND:
      sound = new Howl({src: [WRONG_SOUND + ".mp3"]});
      break;
    case CLICK_SOUND:
      sound = new Howl({src: [CLICK_SOUND + ".mp3"]});
      break;
    case DELETE_SOUND:
      sound = new Howl({src: [DELETE_SOUND + ".mp3"]});
      break;
    default:
      break
  }

  sound && sound.play();
}


function migrateUserData() {
  const currentVersion = JSON.parse(localStorage.getItem('appVersion')) || DEFAULT_VERSION;
  if (compareVersions(currentVersion, NEW_VERSION) < 0) {
    const allQuestions = JSON.parse(localStorage.getItem('allQuestions') || '[]');
    const allAnswers = JSON.parse(localStorage.getItem('allAnswers') || '[]');
    const allFavorites = JSON.parse(localStorage.getItem('allFavorites') || '[]');

    let userAnswers = allQuestions.map((question, index) => ({
      questionId: question.id,
      userAnswer: allAnswers[index],
      isFavorite: allFavorites[index] || false,
    }));

    userAnswers = userAnswers.filter(item => item.userAnswer !== -1 || item.isFavorite);

    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    localStorage.setItem('appVersion', JSON.stringify(NEW_VERSION));

    console.log('数据迁移完成。');
    console.log('Data migration completed.');
  }
}

migrateUserData();