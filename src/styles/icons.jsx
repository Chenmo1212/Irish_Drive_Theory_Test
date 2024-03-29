import React from 'react';
import {
  FaChevronLeft,
  FaRegStar,
  FaStar,
  FaTh,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaThumbtack,
  FaEraser,
  FaLanguage,
  FaRocket,
  FaTrashAlt,
  FaTimes,
  FaHome,
} from 'react-icons/fa';

const icons = new Map([
  ['back', <FaChevronLeft />],
  ['fav_reg', <FaRegStar />],
  ['fav', <FaStar />],
  ['fa_th', <FaTh />],
  ['eye', <FaEye />],
  ['eye_slash', <FaEyeSlash />],
  ['arrow_left', <FaArrowLeft />],
  ['arrow_right', <FaArrowRight />],
  ['check', <FaCheckCircle />],
  ['thumb_tack', <FaThumbtack />],
  ['clear', <FaEraser />],
  ['language', <FaLanguage />],
  ['rocket', <FaRocket />],
  ['trash', <FaTrashAlt />],
  ['wrong', <FaTimes />],
  ['home', <FaHome />],
]);

export function getIcon(iconName) {
  return icons.get(iconName?.toLowerCase());
}