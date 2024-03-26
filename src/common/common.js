import {Howl} from "howler"
import {QUESTIONS_EN} from "../data/questions_data";
import {QUESTIONS_CN} from "../data/questions_data_CN";

export const NEW_VERSION = "1.3.8.240320";
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
    createTime: new Date().toISOString(),
    answers: [],
    score: 0,
    currIdx: 0,
    ...exam
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