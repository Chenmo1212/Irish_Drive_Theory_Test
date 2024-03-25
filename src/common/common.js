import {Howl} from "howler"
import {QUESTIONS_EN} from "../data/questions_data";
import {QUESTIONS_CN} from "../data/questions_data_CN";

export const NEW_VERSION = "1.3.7.240320";
export const DEFAULT_VERSION = "1.0.0.240202";
export const THEME_COLOR = "rgb(83, 109, 254)";
export const CORRECT_COLOR = "rgb(103, 194, 58)";
export const ERROR_COLOR = "rgb(245, 108, 108)";
export const OPTION_LABELS = ['A', "B", "C", "D"];

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

export const removeFromLocalStorage = (keys) => {
  keys.forEach(key => {
    localStorage.removeItem(key);
  })
}

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

  console.log('数据迁移完成。');
  console.log('Data migration completed.');
}
if (updateDataIfNewVersion(loadFromLocalStorage('appVersion', DEFAULT_VERSION), NEW_VERSION)) migrateUserData();

// Insert question index
const updateQuestionIndex = (questions) => questions.map((q, i) => {
  return {
    ...q, index: i + 1
  }
});

export const questionsEN = updateQuestionIndex(QUESTIONS_EN);
export const questionsCN = updateQuestionIndex(QUESTIONS_CN);