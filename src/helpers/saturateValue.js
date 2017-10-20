export const saturatePercentage = (min, max, value) =>
    (value - min) * 100 / (max - min);

export const saturateZeroOne = (min, max, value) =>
    saturatePercentage(min, max, value) / 100;
