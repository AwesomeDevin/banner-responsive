import { isDeepColorByHsv, rgb2hsv } from "image-color-utils";

export interface ICoverInfo {
  left: string;
  right: string;
  bottom: string;
  top: string;
  imageWidth: number;
  imageHeight: number;
  // image: HTMLImageElement;
}
export const debounce = (fn: any, delay: number) => {
  let timer: any;
  return function (this: any, ...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

export const getFinalColor = (rgb: string) => {
  if (!rgb) return '#fff';
  const rgbArr = rgb.split(',');
  const hsl = rgb2hsv([Number.parseInt(rgbArr[0]), Number.parseInt(rgbArr[1]), Number.parseInt(rgbArr[2])]);
  return isDeepColorByHsv(hsl) ? '#000' : '#fff';
};

export const getCoverInfoCache = (img: string) => {
  const cacheKey = `alife/better-banner${img}`;
  const cache = localStorage.getItem(cacheKey);
  return cache ? (JSON.parse(cache) as ICoverInfo) : null;
};

export const setCoverInfoCache = (img: string, coverInfo: ICoverInfo) => {
  const cacheKey = `alife/better-banner${img}`;
  localStorage.setItem(cacheKey, JSON.stringify(coverInfo));
};
