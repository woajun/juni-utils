/* eslint-disable no-bitwise */
function hexToRgb(hex: string): number[] {
  hex = hex.replace('#', '');

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
}

function rgbToHex(rgb: number[]): string {
  return (
    '#' +
    ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)
  );
}

export const generateCalcColor = (
  aim: number,
  danger: number,
  aimColor: string,
  dangerColor: string,
) => {
  const aimRgb = hexToRgb(aimColor);
  const dangerRgb = hexToRgb(dangerColor);

  const calcColor = (current: number) => {
    if (aim === danger) {
      return aimColor;
    }

    const min = Math.min(aim, danger);
    const max = Math.max(aim, danger);

    if (current <= min) {
      return aimColor;
    } else if (current >= max) {
      return dangerColor;
    } else {
      const range = danger - aim;
      const distanceToAim = current - aim;
      const ratio = distanceToAim / range;

      const r = Math.round(aimRgb[0] + (dangerRgb[0] - aimRgb[0]) * ratio);
      const g = Math.round(aimRgb[1] + (dangerRgb[1] - aimRgb[1]) * ratio);
      const b = Math.round(aimRgb[2] + (dangerRgb[2] - aimRgb[2]) * ratio);

      return rgbToHex([r, g, b]);
    }
  };

  return calcColor;
};
