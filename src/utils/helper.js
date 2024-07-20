import {Howl} from "howler"

export const THEME_COLOR = "rgb(83, 109, 254)";
export const CORRECT_COLOR = "rgb(103, 194, 58)";
export const ERROR_COLOR = "rgb(245, 108, 108)";
export const OPTION_LABELS = ['A', "B", "C", "D"];

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

export const removeFromLocalStorage = (keys) => {
  keys.forEach(key => {
    localStorage.removeItem(key);
  })
}