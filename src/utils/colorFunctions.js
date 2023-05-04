/* eslint-disable no-plusplus */
// const percentColors = [
//   { pct: 0.0, color: { r: 0xff, g: 0xcc, b: 0xcc } },
//   { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0x00 } },
//   { pct: 1.0, color: { r: 0xd9, g: 0xff, b: 0xd9 } },
// ];

// const getColorShade = (percentage) => {
//   let i = 1;
//   for (; i < percentColors.length - 1; i++) {
//     if (percentage < percentColors[i].pct) {
//       break;
//     }
//   }
//   const lower = percentColors[i - 1];
//   const upper = percentColors[i];
//   const range = upper.pct - lower.pct;
//   const rangePct = (percentage - lower.pct) / range;
//   const pctLower = 1 - rangePct;
//   const pctUpper = rangePct;
//   const color = {
//     r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
//     g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
//     b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
//   };
//   return `rgb(${[color.r, color.g, color.b].join(',')})`;
//   // or output as hex if preferred
// };

// const percentTextColors = [
//   { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0x00 } },
//   { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0x00 } },
//   { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0x00 } },
// ];

// const getColorShadeText = (percentage) => {
//   let i = 1;
//   for (; i < percentTextColors.length - 1; i++) {
//     if (percentage < percentTextColors[i].pct) {
//       break;
//     }
//   }
//   const lower = percentTextColors[i - 1];
//   const upper = percentTextColors[i];
//   const range = upper.pct - lower.pct;
//   const rangePct = (percentage - lower.pct) / range;
//   const pctLower = 1 - rangePct;
//   const pctUpper = rangePct;
//   const color = {
//     r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
//     g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
//     b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
//   };
//   return `rgb(${[color.r, color.g, color.b].join(',')})`;
//   // or output as hex if preferred
// };

const getColorShadeText = (value) => {
  // value from 0 to 1
  const hue = ((value / 100) * 120).toString(10);
  return ['hsl(', hue, ',100%,20%)'].join('');
};

const getColorShade = (value) => {
  // value from 0 to 1
  const hue = ((value / 100) * 120).toString(10);
  return ['hsl(', hue, ',100%,90%)'].join('');
};

const colorFunctions = { getColorShade, getColorShadeText };
export default colorFunctions;
