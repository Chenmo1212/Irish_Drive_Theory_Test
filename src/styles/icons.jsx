import React from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaBell,
  FaCheckCircle,
  FaChevronLeft,
  FaEraser,
  FaEye,
  FaEyeSlash,
  FaHome,
  FaLanguage,
  FaRegStar,
  FaRocket,
  FaSave,
  FaStar,
  FaTh,
  FaThumbtack,
  FaTimes,
  FaTrashAlt,
} from 'react-icons/fa';

const icons = new Map([
  ['bell', <FaBell/>],
  ['back', <FaChevronLeft/>],
  ['fav_reg', <FaRegStar/>],
  ['fav', <FaStar/>],
  ['fa_th', <FaTh/>],
  ['eye', <FaEye/>],
  ['eye_slash', <FaEyeSlash/>],
  ['arrow_left', <FaArrowLeft/>],
  ['arrow_right', <FaArrowRight/>],
  ['check', <FaCheckCircle/>],
  ['thumb_tack', <FaThumbtack/>],
  ['clear', <FaEraser/>],
  ['language', <FaLanguage/>],
  ['rocket', <FaRocket/>],
  ['trash', <FaTrashAlt/>],
  ['wrong', <FaTimes/>],
  ['home', <FaHome/>],
  ['save', <FaSave/>],
]);

export function getIcon(iconName) {
  return icons.get(iconName?.toLowerCase());
}