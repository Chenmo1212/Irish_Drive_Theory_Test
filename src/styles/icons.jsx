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
} from 'react-icons/fa';

const icons = new Map([
  ['back', <FaChevronLeft />],
  ['fav', <FaRegStar />],
  ['fav_fill', <FaStar />],
  ['fa_th', <FaTh />],
  ['eye', <FaEye />],
  ['eye_slash', <FaEyeSlash />],
  ['arrow_left', <FaArrowLeft />],
  ['arrow_right', <FaArrowRight />],
  ['check', <FaCheckCircle />],
  ['thumb_tack', <FaThumbtack />],
]);

export function getIcon(iconName) {
  return icons.get(iconName?.toLowerCase());
}