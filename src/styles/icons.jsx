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
]);

export function getIcon(iconName) {
  return icons.get(iconName?.toLowerCase());
}