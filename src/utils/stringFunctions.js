const titleToKebab = (str) => String(str).toLowerCase().split(' ').join('-');

const twelveTo24 = (twelve) => {
  const timeArray = String(twelve).split(':');
  if (Number(timeArray[0]) === 0) return `12:${timeArray[1]} AM`;
  if (Number(timeArray[0]) === 12) return `12:${timeArray[1]} PM`;
  if (Number(timeArray[0]) > 12) return `${timeArray[0] - 12}:${timeArray[1]} PM`;
  return `${timeArray.join(':')} AM`;
};

const stringFunctions = { titleToKebab, twelveTo24 };
export default stringFunctions;
