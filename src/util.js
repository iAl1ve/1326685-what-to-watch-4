import {MONTH_NAMES} from "./const.js";

export const formatDate = (date) => {
  date = new Date(date);
  return `${MONTH_NAMES[date.getMonth()]}
    ${date.getDate()},
    ${date.getFullYear()}`;
};
