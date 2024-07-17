import {Howl} from "howler"
import {QUESTIONS_EN} from "../data/questions_data";
import {QUESTIONS_CN} from "../data/questions_data_CN";

export const NEW_VERSION = "1.4.1.240525";
export const DEFAULT_VERSION = "1.0.0.240518";
export const THEME_COLOR = "rgb(83, 109, 254)";
export const CORRECT_COLOR = "rgb(103, 194, 58)";
export const ERROR_COLOR = "rgb(245, 108, 108)";
export const OPTION_LABELS = ['A', "B", "C", "D"];

export const QUESTIONS_CONFIG = {
  appVersion: NEW_VERSION,
  isCN: false,
  isExplain: false,
  isStick: false,
  isCheck: false,
  filterByError: false,
  filterByFavorite: false,
  filteredQuestions: []
}

export const loadFromLocalStorage = (key, defaultValue, ttl = null) => {
  const storedItemStr = localStorage.getItem(key);

  if (storedItemStr) {
    let storedItem = JSON.parse(storedItemStr);

    // If there is no expiry attribute, add the default expiration time
    if (!storedItem.expiry) {
      saveToLocalStorage(key, storedItem.value, ttl);
    }

    // Check if it has expired
    const now = new Date();
    if (storedItem.expiry !== null && now.getTime() > storedItem.expiry) {
      localStorage.removeItem(key);
      saveToLocalStorage(key, defaultValue, ttl);
      return defaultValue;
    }

    storedItem = JSON.parse(localStorage.getItem(key));
    return storedItem.value;
  } else {
    saveToLocalStorage(key, defaultValue, ttl);
    return defaultValue;
  }
};

export const saveToLocalStorage = (key, value, ttl = null) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: ttl !== null ? now.getTime() + ttl : null,  // If ttl is null, it means it will never expire
  };
  localStorage.setItem(key, JSON.stringify(item));
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

    console.info(`App Updated: ${currentVersion} => ${NEW_VERSION}`)
    saveToLocalStorage("allQuestions", questionsEN);
    saveToLocalStorage("allQuestions_CN", questionsCN);
    return true;
  }
  console.info(`App Current Version: ${currentVersion}`);
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

// Insert question index
const updateQuestionIndex = (questions) => questions.map((q, i) => {
  return {
    ...q, index: i + 1
  }
});

export const questionsEN = updateQuestionIndex(QUESTIONS_EN);
export const questionsCN = updateQuestionIndex(QUESTIONS_CN);

// EXAM

export const saveNewExamToLocalStorage = (exam) => {
  const examData = {
    createTime: new Date().toISOString(), answers: [], score: 0, currIdx: 0, completed: false, ...exam
  }
  saveExamToLocalStorage(examData);
}

export const saveExamToLocalStorage = (exam) => {
  let existingResults = loadFromLocalStorage('examResults', {});
  saveToLocalStorage('examResults', {...existingResults, ...exam});
}

export const loadExamFromLocalStorage = () => {
  return loadFromLocalStorage('examResults', {});
}

export const resetTimer = () => {
  saveToLocalStorage('secondsLeft', 40 * 60);
  saveToLocalStorage('timerActive', true);
}

export const stopTimer = () => {
  saveToLocalStorage('timerActive', false);
}