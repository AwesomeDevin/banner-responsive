(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports =  factory() :
  typeof define === 'function' && define.amd ? define([], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.ResponsiveBanner = factory()));
})(this, function() {
"use strict";
//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function() {
	return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

//#endregion

//#region ../sdk/dist/index.js
var dist_exports = {};
__export(dist_exports, { getMainColor: () => getMainColor });
function majorityElement$1(nums) {
	let majority_element = null;
	let count = 0;
	for (const num of nums) {
		if (count == 0) majority_element = num;
		if (num != majority_element) count--;
else count++;
	}
	return majority_element;
}
function rgb2hex$1(rgb) {
	const [R, G, B, A] = rgb;
	let value = "#";
	const newR = R.toString(16);
	const newG = G.toString(16);
	const newB = B.toString(16);
	value += newR.length > 1 ? newR : `0${newR}`;
	value += newG.length > 1 ? newG : `0${newG}`;
	value += newB.length > 1 ? newB : `0${newB}`;
	if (typeof A !== "undefined" && rgb.length > 3) {
		const newA = Math.round(A * 255).toString(16);
		value += newA.length > 1 ? newA : `0${newA}`;
	}
	return value;
}
function rgb2lab$1(rgb) {
	let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
	r = r > .04045 ? Math.pow((r + .055) / 1.055, 2.4) : r / 12.92;
	g = g > .04045 ? Math.pow((g + .055) / 1.055, 2.4) : g / 12.92;
	b = b > .04045 ? Math.pow((b + .055) / 1.055, 2.4) : b / 12.92;
	x = (r * .4124 + g * .3576 + b * .1805) / .95047;
	y = (r * .2126 + g * .7152 + b * .0722) / 1;
	z = (r * .0193 + g * .1192 + b * .9505) / 1.08883;
	x = x > .008856 ? Math.pow(x, .3333333333333333) : 7.787 * x + .13793103448275862;
	y = y > .008856 ? Math.pow(y, .3333333333333333) : 7.787 * y + .13793103448275862;
	z = z > .008856 ? Math.pow(z, .3333333333333333) : 7.787 * z + .13793103448275862;
	return [
		116 * y - 16,
		500 * (x - y),
		200 * (y - z)
	];
}
var ImageColorUtils$1, getMainColor;
var init_dist = __esm({ "../sdk/dist/index.js"() {
	(function(l, r) {
		if (!l || l.getElementById("livereloadscript")) return;
		r = l.createElement("script");
		r.async = 1;
		r.src = "//" + (self.location.host || "localhost").split(":")[0] + ":35729/livereload.js?snipver=1";
		r.id = "livereloadscript";
		l.getElementsByTagName("head")[0].appendChild(r);
	})(self.document);
	ImageColorUtils$1 = class ImageColorUtils$2 {
		constructor(params) {
			const { origin, mockMovePx = 30, boundaryValue = 10, ParticleSize = 10, width, height, onload } = params || {};
			if (!origin) throw new Error("Origin is necessary");
else if ((origin instanceof ImageBitmap || origin instanceof HTMLImageElement) && (!width || !height)) throw new Error("Because of origin is not a http link, width and height is necessary ");
			this.onload = onload;
			ImageColorUtils$2.ParticleSize = ParticleSize;
			ImageColorUtils$2.mockMovePx = mockMovePx;
			ImageColorUtils$2.boundaryValue = boundaryValue;
			this.init(origin, width, height).catch((error) => {
				console.error(error);
			}).then(() => {
				this.onload && this.onload();
			});
		}
		init(origin, width, height) {
			return new Promise((resolve, reject) => {
				if (typeof origin === "string") {
					const img = new Image();
					img.src = origin;
					img.crossOrigin = "Anonymous";
					img.onload = () => {
						const canvasWidth = width || img.width;
						const canvasHeight = height || canvasWidth / img.width * img.height;
						this.initCanvas(img, canvasWidth, canvasHeight);
						resolve(true);
					};
					if (img.complete) {
						const canvasWidth = width || img.width;
						const canvasHeight = height || canvasWidth / img.width * img.height;
						this.initCanvas(img, canvasWidth, canvasHeight);
						resolve(true);
					}
				} else if (origin instanceof ImageBitmap) {
					this.initCanvas(origin, width, height);
					resolve(true);
				} else if (origin instanceof HTMLImageElement) {
					this.initCanvas(origin, width, height);
					resolve(true);
				} else reject(new Error("The origin format is not supported"));
			});
		}
		initCanvas(img, width, height) {
			try {
				this.canvas = new OffscreenCanvas(width, height);
				this.ctx = this.canvas.getContext("2d");
				this.ctx && this.ctx.drawImage(img, 0, 0, width, height);
				this.imageData = this.ctx && this.ctx.getImageData(0, 0, width, height);
			} catch (e) {
				throw new Error(e);
			}
		}
		pickColor(x, y) {
			return ImageColorUtils$2.getRGB(this.imageData.data, x, y, this.canvas.width);
		}
		pickLineColor({ leftTopPosition, rightBottomPosition, scopes }) {
			const data = this.imageData.data;
			const media = {};
			const lineArrayCollection = {
				top: this.getArrayFromTopLine(leftTopPosition, rightBottomPosition),
				left: this.getArrayFromLeftLine(leftTopPosition, rightBottomPosition),
				right: this.getArrayFromRightLine(leftTopPosition, rightBottomPosition),
				bottom: this.getArrayFromBottomLine(leftTopPosition, rightBottomPosition)
			};
			for (const key in lineArrayCollection) {
				if (scopes && !scopes.filter((item) => item === key).length) continue;
				const lineArray = lineArrayCollection[key];
				const rgbArray = [];
				for (const position of lineArray) {
					const x = position[0];
					const y = position[1];
					const [r, g, b] = ImageColorUtils$2.getRGB(data, x, y, this.canvas.width);
					rgbArray.push([
						r,
						g,
						b
					]);
				}
				media[key] = ImageColorUtils$2.getMedian(rgbArray);
			}
			return media;
		}
		static isAdjust(oldVal, newVal, boundaryValue, type) {
			const val = boundaryValue;
			let distance;
			if (!type || type === "rgb") {
				const [R_1, G_1, B_1] = oldVal;
				const [R_2, G_2, B_2] = newVal;
				const rmean = (R_1 + R_2) / 2;
				const R = R_1 - R_2;
				const G = G_1 - G_2;
				const B = B_1 - B_2;
				distance = Math.sqrt((2 + rmean / 256) * Math.pow(R, 2) + 4 * Math.pow(G, 2) + (2 + (255 - rmean) / 256) * Math.pow(B, 2));
			} else if (type === "lab") {
				const labOldVal = rgb2lab$1(oldVal);
				const labnewVal = rgb2lab$1(newVal);
				const [L_1, A_1, B_1] = labOldVal;
				const [L_2, A_2, B_2] = labnewVal;
				distance = Math.sqrt(Math.abs(Math.pow(L_1 - L_2, 2) + Math.pow(A_1 - A_2, 2) + Math.pow(B_1 - B_2, 2)));
			}
			if (distance >= val) return true;
			return false;
		}
		static compare(oldVal, newVal, boundaryValue, type) {
			return !ImageColorUtils$2.isAdjust(oldVal, newVal, boundaryValue || ImageColorUtils$2.boundaryValue, type);
		}
		static getAverage(data) {
			const total = data.reduce((x, y) => [
				x[0] + y[0],
				x[1] + y[1],
				x[2] + y[2]
			]);
			return [
				Math.round(total[0] / data.length),
				Math.round(total[1] / data.length),
				Math.round(total[2] / data.length)
			];
		}
		static getMost(data) {
			const r = majorityElement$1(data.map((item) => item[0]));
			const g = majorityElement$1(data.map((item) => item[1]));
			const b = majorityElement$1(data.map((item) => item[2]));
			const a = majorityElement$1(data.map((item) => item[3]));
			return [
				r,
				g,
				b,
				a
			];
		}
		static getMedian(data) {
			const total0 = data.map((item) => item[0]).sort((x, y) => x > y ? 1 : -1);
			const total1 = data.map((item) => item[1]).sort((x, y) => x > y ? 1 : -1);
			const total2 = data.map((item) => item[2]).sort((x, y) => x > y ? 1 : -1);
			const total3 = data.map((item) => item[3]).sort((x, y) => x > y ? 1 : -1);
			const length = data.length;
			if (length % 2 === 0) {
				const r$1 = (total0[length / 2] + total0[length / 2 - 1]) / 2;
				const g$1 = (total1[length / 2] + total1[length / 2 - 1]) / 2;
				const b$1 = (total2[length / 2] + total2[length / 2 - 1]) / 2;
				const a$1 = (total3[length / 2] + total3[length / 2 - 1]) / 2;
				return [
					r$1,
					g$1,
					b$1,
					a$1
				];
			}
			const r = total0[(length + 1) / 2];
			const g = total1[(length + 1) / 2];
			const b = total2[(length + 1) / 2];
			const a = total3[(length + 1) / 2];
			return [
				r,
				g,
				b,
				a
			];
		}
		static getRGB(data, x, y, width) {
			const index = (width * (y - 1) + x - 1) * 4;
			const [r, g, b, a] = [
				data[index],
				data[index + 1],
				data[index + 2],
				data[index + 3]
			];
			return [
				r,
				g,
				b,
				Math.round(a / 255)
			];
		}
		getArrayFromTopLine(leftTopPosition, rightBottomPosition) {
			const result = [];
			const leftTopX = leftTopPosition[0];
			const leftTopY = leftTopPosition[1];
			const rightBottomX = rightBottomPosition[0];
			for (let x = leftTopX; x <= rightBottomX; x++) result.push([x, leftTopY]);
			return result;
		}
		getArrayFromRightLine(leftTopPosition, rightBottomPosition) {
			const result = [];
			const leftTopY = leftTopPosition[1];
			const rightBottomX = rightBottomPosition[0];
			const rightBottomY = rightBottomPosition[1];
			for (let y = leftTopY; y <= rightBottomY; y++) result.push([rightBottomX, y]);
			return result;
		}
		getArrayFromBottomLine(leftTopPosition, rightBottomPosition) {
			const result = [];
			const leftTopX = leftTopPosition[0];
			const rightBottomX = rightBottomPosition[0];
			const rightBottomY = rightBottomPosition[1];
			for (let x = leftTopX; x <= rightBottomX; x++) result.push([x, rightBottomY]);
			return result;
		}
		getArrayFromLeftLine(leftTopPosition, rightBottomPosition) {
			const result = [];
			const leftTopX = leftTopPosition[0];
			const leftTopY = leftTopPosition[1];
			const rightBottomY = rightBottomPosition[1];
			for (let y = leftTopY; y <= rightBottomY; y++) result.push([leftTopX, y]);
			return result;
		}
		leftTopMockMove({ originColorMedia, leftTopPosition, rightBottomPosition }) {
			const mockMovePx = ImageColorUtils$2.mockMovePx;
			let leftTopx = leftTopPosition[0];
			let leftTopy = leftTopPosition[1];
			for (let count = 1; count <= mockMovePx; count++) {
				const key = "left";
				const movePx = -count;
				const mockLeftTopx = leftTopx + movePx;
				const mockHslMedia = this.pickLineColor({
					leftTopPosition: [mockLeftTopx, leftTopy],
					rightBottomPosition,
					scopes: [key]
				})[key];
				if (ImageColorUtils$2.isAdjust(originColorMedia[key], mockHslMedia, ImageColorUtils$2.boundaryValue)) {
					leftTopx = mockLeftTopx;
					break;
				}
			}
			for (let count = 1; count <= mockMovePx; count++) {
				const key = "top";
				const movePx = -count;
				const mockLeftTopy = leftTopy + movePx;
				const mockHslMedia = this.pickLineColor({
					leftTopPosition: [leftTopx, mockLeftTopy],
					rightBottomPosition,
					scopes: [key]
				})[key];
				if (ImageColorUtils$2.isAdjust(originColorMedia[key], mockHslMedia, ImageColorUtils$2.boundaryValue)) {
					leftTopy = mockLeftTopy;
					break;
				}
			}
			return [leftTopx, leftTopy];
		}
		rightBottomMockMove({ originColorMedia, leftTopPosition, rightBottomPosition }) {
			const mockMovePx = ImageColorUtils$2.mockMovePx;
			let rightBottomx = rightBottomPosition[0];
			let rightBottomy = rightBottomPosition[1];
			for (let count = 1; count <= mockMovePx; count++) {
				const key = "right";
				const movePx = count;
				const mockRightBotttonx = rightBottomx + movePx;
				const mockHslMedia = this.pickLineColor({
					leftTopPosition,
					rightBottomPosition: [mockRightBotttonx, rightBottomy],
					scopes: [key]
				})[key];
				if (ImageColorUtils$2.isAdjust(originColorMedia[key], mockHslMedia, ImageColorUtils$2.boundaryValue)) {
					rightBottomx = mockRightBotttonx;
					break;
				}
			}
			for (let count = 1; count <= mockMovePx; count++) {
				const key = "bottom";
				const movePx = count;
				const mockRightBottomy = rightBottomy + movePx;
				const mockHslMedia = this.pickLineColor({
					leftTopPosition,
					rightBottomPosition: [rightBottomx, mockRightBottomy],
					scopes: [key]
				})[key];
				if (ImageColorUtils$2.isAdjust(originColorMedia[key], mockHslMedia, ImageColorUtils$2.boundaryValue)) {
					rightBottomy = mockRightBottomy;
					break;
				}
			}
			return [rightBottomx, rightBottomy];
		}
		adjust(leftTopPosition, rightBottomPosition) {
			if (!leftTopPosition.length || !rightBottomPosition.length) throw new Error("Position is invalid！");
			const originColorMedia = this.pickLineColor({
				leftTopPosition,
				rightBottomPosition
			});
			const adjustLeftTopPosition = this.leftTopMockMove({
				originColorMedia,
				leftTopPosition,
				rightBottomPosition
			});
			const adjustRightBottomPosition = this.rightBottomMockMove({
				originColorMedia,
				leftTopPosition,
				rightBottomPosition
			});
			const adjustWidth = adjustRightBottomPosition[0] - adjustLeftTopPosition[0];
			const adjustHeight = adjustRightBottomPosition[1] - adjustLeftTopPosition[1];
			const x = adjustLeftTopPosition[0];
			const y = adjustLeftTopPosition[1];
			return {
				x,
				y,
				width: adjustWidth,
				height: adjustHeight
			};
		}
		pickColors() {
			const similarColorsMap = {};
			const res = [];
			const boundaryValue = 20;
			const type = "lab";
			let lastColor;
			for (let x = 1; x < this.canvas.width; x += ImageColorUtils$2.ParticleSize) for (let y = 1; y < this.canvas.height; y += ImageColorUtils$2.ParticleSize) {
				const similarValues = Object.values(similarColorsMap);
				const rgba = ImageColorUtils$2.getRGB(this.imageData.data, x, y, this.canvas.width);
				lastColor = rgba;
				if (rgba[3] === 0) continue;
else if (!similarValues.length) similarColorsMap[similarValues.length] = [rgba];
else if (similarValues.length && lastColor && ImageColorUtils$2.compare(rgba, lastColor, ImageColorUtils$2.boundaryValue, type)) {
					let insert = false;
					for (const similarValue of similarValues) if (ImageColorUtils$2.compare(rgba, similarValue[similarValue.length - 1], boundaryValue, type) && ImageColorUtils$2.compare(rgba, similarValue[Math.floor(similarValue.length / 2)], boundaryValue, type) && ImageColorUtils$2.compare(rgba, similarValue[Math.floor(similarValue.length - 1)], boundaryValue, type)) {
						similarValue.push(rgba);
						insert = true;
					}
					if (!insert) similarColorsMap[similarValues.length] = [rgba];
				}
			}
			const values = Object.values(similarColorsMap);
			values.sort((x, y) => x.length < y.length ? 1 : -1).filter((item) => item.length > Math.floor(this.imageData.data.length / (this.canvas.width * this.canvas.height) * 4)).forEach((item) => {
				if (!res.some((value) => ImageColorUtils$2.compare(value, ImageColorUtils$2.getMedian(item), boundaryValue, type))) res.push(ImageColorUtils$2.getMedian(item));
			});
			return {
				rgb: res.map((item) => `rgba(${item.join(",")})`),
				hex: res.map((item) => rgb2hex$1(item))
			};
		}
	};
	getMainColor = (img, range = [0, 100], axis = "x") => {
		return new Promise((resolve, reject) => {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			const image = new Image();
			image.src = img;
			image.crossOrigin = "anonymous";
			const run = () => {
				const lefTop = axis === "x" ? [range[0] < 0 ? image.width + range[0] : range[0], 0] : [0, range[0] < 0 ? image.height + range[0] : range[0]];
				const rightBottom = axis === "x" ? [range[1] < 0 ? image.width + range[1] : range[1], image.height] : [image.width, range[1] < 0 ? image.height + range[1] : range[1]];
				const drawWidth = rightBottom[0] - lefTop[0];
				const drawHeight = rightBottom[1] - lefTop[1];
				canvas.width = drawWidth;
				canvas.height = drawHeight;
				ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(image, lefTop[0], lefTop[1], drawWidth, drawHeight, 0, 0, drawWidth, drawHeight);
				createImageBitmap(canvas).then(function(imageBitmap) {
					const colorUtils = new ImageColorUtils$1({
						origin: imageBitmap,
						width: drawWidth,
						height: drawHeight,
						onload: () => {
							var _a, _b, _c, _d, _e;
							const res = colorUtils.pickColors();
							resolve({
								color: ((_e = (_d = (_c = (_b = (_a = res === null || res === void 0 ? void 0 : res.rgb) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.match(/rgba\(([0-9,\.]*)\)/)) === null || _c === void 0 ? void 0 : _c[1]) === null || _d === void 0 ? void 0 : _d.split(",")) === null || _e === void 0 ? void 0 : _e.slice(0, 3).join(",")) || "255,255,255",
								image
							});
						}
					});
				}).catch(function(error) {
					console.error("Failed to create ImageBitmap: " + error);
				});
			};
			image.onload = run;
		});
	};
} });

//#endregion
//#region ../../node_modules/.pnpm/image-color-utils@1.3.2/node_modules/image-color-utils/build/index.es.js
var index_es_exports = {};
__export(index_es_exports, {
	ImageColorUtils: () => ImageColorUtils,
	hex2rgb: () => hex2rgb,
	isDeepColorByHsl: () => isDeepColorByHsl,
	isDeepColorByHsv: () => isDeepColorByHsv,
	majorityElement: () => majorityElement,
	rgb2hex: () => rgb2hex,
	rgb2hsl: () => rgb2hsl,
	rgb2hsv: () => rgb2hsv,
	rgb2hue: () => rgb2hue,
	rgb2lab: () => rgb2lab,
	rgb2value: () => rgb2value,
	rgb2whiteness: () => rgb2whiteness
});
function rgb2value(rgb) {
	const [r, g, b] = rgb;
	const value = Math.max(r, g, b);
	return value;
}
function rgb2whiteness(rgb) {
	const [r, g, b] = rgb;
	const whiteness = Math.min(r, g, b);
	return whiteness;
}
function rgb2hue(rgb, fallbackhue = 0) {
	const [r, g, b] = rgb;
	const value = rgb2value(rgb);
	const whiteness = rgb2whiteness(rgb);
	const delta = value - whiteness;
	if (delta) {
		const segment = value === r ? (g - b) / delta : value === g ? (b - r) / delta : (r - g) / delta;
		const shift = value === r ? segment < 0 ? 6 : 0 : value === g ? 2 : 4;
		const hue = (segment + shift) * 60;
		return hue;
	} else return fallbackhue;
}
function majorityElement(nums) {
	let majority_element = null;
	let count = 0;
	for (const num of nums) {
		if (count == 0) majority_element = num;
		if (num != majority_element) count--;
else count++;
	}
	return majority_element;
}
function hex2rgb(hex) {
	const [, r, g, b, a, rr, gg, bb, aa] = hex.match(hexColorMatch) || [];
	if (rr !== undefined || r !== undefined) {
		const red = rr !== undefined ? parseInt(rr, 16) : parseInt(r + r, 16);
		const green = gg !== undefined ? parseInt(gg, 16) : parseInt(g + g, 16);
		const blue = bb !== undefined ? parseInt(bb, 16) : parseInt(b + b, 16);
		const alpha = aa !== undefined ? parseInt(aa, 16) : a !== undefined ? parseInt(a + a, 16) : 255;
		return [
			red,
			green,
			blue,
			alpha
		].map((c) => c * 100 / 255);
	}
	return undefined;
}
function rgb2hex(rgb) {
	const [R, G, B, A] = rgb;
	let value = "#";
	const newR = R.toString(16);
	const newG = G.toString(16);
	const newB = B.toString(16);
	value += newR.length > 1 ? newR : `0${newR}`;
	value += newG.length > 1 ? newG : `0${newG}`;
	value += newB.length > 1 ? newB : `0${newB}`;
	if (typeof A !== "undefined" && rgb.length > 3) {
		const newA = Math.round(A * 255).toString(16);
		value += newA.length > 1 ? newA : `0${newA}`;
	}
	return value;
}
function rgb2lab(rgb) {
	let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
	r = r > .04045 ? Math.pow((r + .055) / 1.055, 2.4) : r / 12.92;
	g = g > .04045 ? Math.pow((g + .055) / 1.055, 2.4) : g / 12.92;
	b = b > .04045 ? Math.pow((b + .055) / 1.055, 2.4) : b / 12.92;
	x = (r * .4124 + g * .3576 + b * .1805) / .95047;
	y = (r * .2126 + g * .7152 + b * .0722) / 1;
	z = (r * .0193 + g * .1192 + b * .9505) / 1.08883;
	x = x > .008856 ? Math.pow(x, .3333333333333333) : 7.787 * x + .13793103448275862;
	y = y > .008856 ? Math.pow(y, .3333333333333333) : 7.787 * y + .13793103448275862;
	z = z > .008856 ? Math.pow(z, .3333333333333333) : 7.787 * z + .13793103448275862;
	return [
		116 * y - 16,
		500 * (x - y),
		200 * (y - z)
	];
}
function rgb2hsl(rgb) {
	let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, max = Math.max(r, g, b), min = Math.min(r, g, b), h, s, l = (max + min) / 2;
	if (max === min) h = s = 0;
else {
		let d = max - min;
		s = l > .5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return [
		h * 360,
		s * 100,
		l * 100
	];
}
function rgb2hsv(rgb) {
	let [r, g, b] = rgb;
	r /= 255;
	g /= 255;
	b /= 255;
	let max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h, s, v = max;
	let d = max - min;
	s = max === 0 ? 0 : d / max;
	if (max === min) h = 0;
else {
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return [
		h * 360,
		s * 100,
		v * 100
	];
}
function isDeepColorByHsl(hsl) {
	const lightness = hsl[2] / 100;
	return lightness <= .6;
}
function isDeepColorByHsv(hsv) {
	const v = hsv[2];
	const s = hsv[1];
	console.log(hsv);
	return v <= 60 || s > 40;
}
var hexColorMatch, ImageColorUtils;
var init_index_es = __esm({ "../../node_modules/.pnpm/image-color-utils@1.3.2/node_modules/image-color-utils/build/index.es.js"() {
	(function(l, r) {
		if (!l || l.getElementById("livereloadscript")) return;
		r = l.createElement("script");
		r.async = 1;
		r.src = "//" + (self.location.host || "localhost").split(":")[0] + ":35729/livereload.js?snipver=1";
		r.id = "livereloadscript";
		l.getElementsByTagName("head")[0].appendChild(r);
	})(self.document);
	hexColorMatch = /^#?(?:([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?|([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?)$/i;
	ImageColorUtils = class ImageColorUtils {
		constructor(params) {
			const { origin, mockMovePx = 30, boundaryValue = 10, ParticleSize = 10, width, height, onload } = params || {};
			if (!origin) throw new Error("Origin is necessary");
else if ((origin instanceof ImageBitmap || origin instanceof HTMLImageElement) && (!width || !height)) throw new Error("Because of origin is not a http link, width and height is necessary ");
			this.onload = onload;
			ImageColorUtils.ParticleSize = ParticleSize;
			ImageColorUtils.mockMovePx = mockMovePx;
			ImageColorUtils.boundaryValue = boundaryValue;
			this.init(origin, width, height).catch((error) => {
				console.error(error);
			}).then(() => {
				this.onload && this.onload();
			});
		}
		init(origin, width, height) {
			return new Promise((resolve, reject) => {
				if (typeof origin === "string") {
					const img = new Image();
					img.src = origin;
					img.crossOrigin = "Anonymous";
					img.onload = () => {
						const canvasWidth = width || img.width;
						const canvasHeight = height || canvasWidth / img.width * img.height;
						this.initCanvas(img, canvasWidth, canvasHeight);
						resolve(true);
					};
					if (img.complete) {
						const canvasWidth = width || img.width;
						const canvasHeight = height || canvasWidth / img.width * img.height;
						this.initCanvas(img, canvasWidth, canvasHeight);
						resolve(true);
					}
				} else if (origin instanceof ImageBitmap) {
					this.initCanvas(origin, width, height);
					resolve(true);
				} else if (origin instanceof HTMLImageElement) {
					this.initCanvas(origin, width, height);
					resolve(true);
				} else reject(new Error("The origin format is not supported"));
			});
		}
		initCanvas(img, width, height) {
			try {
				this.canvas = new OffscreenCanvas(width, height);
				this.ctx = this.canvas.getContext("2d");
				this.ctx && this.ctx.drawImage(img, 0, 0, width, height);
				this.imageData = this.ctx && this.ctx.getImageData(0, 0, width, height);
			} catch (e) {
				throw new Error(e);
			}
		}
		pickColor(x, y) {
			return ImageColorUtils.getRGB(this.imageData.data, x, y, this.canvas.width);
		}
		pickLineColor({ leftTopPosition, rightBottomPosition, scopes }) {
			const data = this.imageData.data;
			const media = {};
			const lineArrayCollection = {
				top: this.getArrayFromTopLine(leftTopPosition, rightBottomPosition),
				left: this.getArrayFromLeftLine(leftTopPosition, rightBottomPosition),
				right: this.getArrayFromRightLine(leftTopPosition, rightBottomPosition),
				bottom: this.getArrayFromBottomLine(leftTopPosition, rightBottomPosition)
			};
			for (const key in lineArrayCollection) {
				if (scopes && !scopes.filter((item) => item === key).length) continue;
				const lineArray = lineArrayCollection[key];
				const rgbArray = [];
				for (const position of lineArray) {
					const x = position[0];
					const y = position[1];
					const [r, g, b] = ImageColorUtils.getRGB(data, x, y, this.canvas.width);
					rgbArray.push([
						r,
						g,
						b
					]);
				}
				media[key] = ImageColorUtils.getMedian(rgbArray);
			}
			return media;
		}
		static isAdjust(oldVal, newVal, boundaryValue, type) {
			const val = boundaryValue;
			let distance;
			if (!type || type === "rgb") {
				const [R_1, G_1, B_1] = oldVal;
				const [R_2, G_2, B_2] = newVal;
				const rmean = (R_1 + R_2) / 2;
				const R = R_1 - R_2;
				const G = G_1 - G_2;
				const B = B_1 - B_2;
				distance = Math.sqrt((2 + rmean / 256) * Math.pow(R, 2) + 4 * Math.pow(G, 2) + (2 + (255 - rmean) / 256) * Math.pow(B, 2));
			} else if (type === "lab") {
				const labOldVal = rgb2lab(oldVal);
				const labnewVal = rgb2lab(newVal);
				const [L_1, A_1, B_1] = labOldVal;
				const [L_2, A_2, B_2] = labnewVal;
				distance = Math.sqrt(Math.abs(Math.pow(L_1 - L_2, 2) + Math.pow(A_1 - A_2, 2) + Math.pow(B_1 - B_2, 2)));
			}
			if (distance >= val) return true;
			return false;
		}
		static compare(oldVal, newVal, boundaryValue, type) {
			return !ImageColorUtils.isAdjust(oldVal, newVal, boundaryValue || ImageColorUtils.boundaryValue, type);
		}
		static getAverage(data) {
			const total = data.reduce((x, y) => [
				x[0] + y[0],
				x[1] + y[1],
				x[2] + y[2]
			]);
			return [
				Math.round(total[0] / data.length),
				Math.round(total[1] / data.length),
				Math.round(total[2] / data.length)
			];
		}
		static getMost(data) {
			const r = majorityElement(data.map((item) => item[0]));
			const g = majorityElement(data.map((item) => item[1]));
			const b = majorityElement(data.map((item) => item[2]));
			const a = majorityElement(data.map((item) => item[3]));
			return [
				r,
				g,
				b,
				a
			];
		}
		static getMedian(data) {
			const total0 = data.map((item) => item[0]).sort((x, y) => x > y ? 1 : -1);
			const total1 = data.map((item) => item[1]).sort((x, y) => x > y ? 1 : -1);
			const total2 = data.map((item) => item[2]).sort((x, y) => x > y ? 1 : -1);
			const total3 = data.map((item) => item[3]).sort((x, y) => x > y ? 1 : -1);
			const length = data.length;
			if (length % 2 === 0) {
				const r$1 = (total0[length / 2] + total0[length / 2 - 1]) / 2;
				const g$1 = (total1[length / 2] + total1[length / 2 - 1]) / 2;
				const b$1 = (total2[length / 2] + total2[length / 2 - 1]) / 2;
				const a$1 = (total3[length / 2] + total3[length / 2 - 1]) / 2;
				return [
					r$1,
					g$1,
					b$1,
					a$1
				];
			}
			const r = total0[(length + 1) / 2];
			const g = total1[(length + 1) / 2];
			const b = total2[(length + 1) / 2];
			const a = total3[(length + 1) / 2];
			return [
				r,
				g,
				b,
				a
			];
		}
		static getRGB(data, x, y, width) {
			const index = (width * (y - 1) + x - 1) * 4;
			const [r, g, b, a] = [
				data[index],
				data[index + 1],
				data[index + 2],
				data[index + 3]
			];
			return [
				r,
				g,
				b,
				Math.round(a / 255)
			];
		}
		getArrayFromTopLine(leftTopPosition, rightBottomPosition) {
			const result = [];
			const leftTopX = leftTopPosition[0];
			const leftTopY = leftTopPosition[1];
			const rightBottomX = rightBottomPosition[0];
			for (let x = leftTopX; x <= rightBottomX; x++) result.push([x, leftTopY]);
			return result;
		}
		getArrayFromRightLine(leftTopPosition, rightBottomPosition) {
			const result = [];
			const leftTopY = leftTopPosition[1];
			const rightBottomX = rightBottomPosition[0];
			const rightBottomY = rightBottomPosition[1];
			for (let y = leftTopY; y <= rightBottomY; y++) result.push([rightBottomX, y]);
			return result;
		}
		getArrayFromBottomLine(leftTopPosition, rightBottomPosition) {
			const result = [];
			const leftTopX = leftTopPosition[0];
			const rightBottomX = rightBottomPosition[0];
			const rightBottomY = rightBottomPosition[1];
			for (let x = leftTopX; x <= rightBottomX; x++) result.push([x, rightBottomY]);
			return result;
		}
		getArrayFromLeftLine(leftTopPosition, rightBottomPosition) {
			const result = [];
			const leftTopX = leftTopPosition[0];
			const leftTopY = leftTopPosition[1];
			const rightBottomY = rightBottomPosition[1];
			for (let y = leftTopY; y <= rightBottomY; y++) result.push([leftTopX, y]);
			return result;
		}
		leftTopMockMove({ originColorMedia, leftTopPosition, rightBottomPosition }) {
			const mockMovePx = ImageColorUtils.mockMovePx;
			let leftTopx = leftTopPosition[0];
			let leftTopy = leftTopPosition[1];
			for (let count = 1; count <= mockMovePx; count++) {
				const key = "left";
				const movePx = -count;
				const mockLeftTopx = leftTopx + movePx;
				const mockHslMedia = this.pickLineColor({
					leftTopPosition: [mockLeftTopx, leftTopy],
					rightBottomPosition,
					scopes: [key]
				})[key];
				if (ImageColorUtils.isAdjust(originColorMedia[key], mockHslMedia, ImageColorUtils.boundaryValue)) {
					leftTopx = mockLeftTopx;
					break;
				}
			}
			for (let count = 1; count <= mockMovePx; count++) {
				const key = "top";
				const movePx = -count;
				const mockLeftTopy = leftTopy + movePx;
				const mockHslMedia = this.pickLineColor({
					leftTopPosition: [leftTopx, mockLeftTopy],
					rightBottomPosition,
					scopes: [key]
				})[key];
				if (ImageColorUtils.isAdjust(originColorMedia[key], mockHslMedia, ImageColorUtils.boundaryValue)) {
					leftTopy = mockLeftTopy;
					break;
				}
			}
			return [leftTopx, leftTopy];
		}
		rightBottomMockMove({ originColorMedia, leftTopPosition, rightBottomPosition }) {
			const mockMovePx = ImageColorUtils.mockMovePx;
			let rightBottomx = rightBottomPosition[0];
			let rightBottomy = rightBottomPosition[1];
			for (let count = 1; count <= mockMovePx; count++) {
				const key = "right";
				const movePx = count;
				const mockRightBotttonx = rightBottomx + movePx;
				const mockHslMedia = this.pickLineColor({
					leftTopPosition,
					rightBottomPosition: [mockRightBotttonx, rightBottomy],
					scopes: [key]
				})[key];
				if (ImageColorUtils.isAdjust(originColorMedia[key], mockHslMedia, ImageColorUtils.boundaryValue)) {
					rightBottomx = mockRightBotttonx;
					break;
				}
			}
			for (let count = 1; count <= mockMovePx; count++) {
				const key = "bottom";
				const movePx = count;
				const mockRightBottomy = rightBottomy + movePx;
				const mockHslMedia = this.pickLineColor({
					leftTopPosition,
					rightBottomPosition: [rightBottomx, mockRightBottomy],
					scopes: [key]
				})[key];
				if (ImageColorUtils.isAdjust(originColorMedia[key], mockHslMedia, ImageColorUtils.boundaryValue)) {
					rightBottomy = mockRightBottomy;
					break;
				}
			}
			return [rightBottomx, rightBottomy];
		}
		adjust(leftTopPosition, rightBottomPosition) {
			if (!leftTopPosition.length || !rightBottomPosition.length) throw new Error("Position is invalid！");
			const originColorMedia = this.pickLineColor({
				leftTopPosition,
				rightBottomPosition
			});
			const adjustLeftTopPosition = this.leftTopMockMove({
				originColorMedia,
				leftTopPosition,
				rightBottomPosition
			});
			const adjustRightBottomPosition = this.rightBottomMockMove({
				originColorMedia,
				leftTopPosition,
				rightBottomPosition
			});
			const adjustWidth = adjustRightBottomPosition[0] - adjustLeftTopPosition[0];
			const adjustHeight = adjustRightBottomPosition[1] - adjustLeftTopPosition[1];
			const x = adjustLeftTopPosition[0];
			const y = adjustLeftTopPosition[1];
			return {
				x,
				y,
				width: adjustWidth,
				height: adjustHeight
			};
		}
		pickColors() {
			const similarColorsMap = {};
			const res = [];
			const boundaryValue = 20;
			const type = "lab";
			let lastColor;
			for (let x = 1; x < this.canvas.width; x += ImageColorUtils.ParticleSize) for (let y = 1; y < this.canvas.height; y += ImageColorUtils.ParticleSize) {
				const similarValues = Object.values(similarColorsMap);
				const rgba = ImageColorUtils.getRGB(this.imageData.data, x, y, this.canvas.width);
				lastColor = rgba;
				if (rgba[3] === 0) continue;
else if (!similarValues.length) similarColorsMap[similarValues.length] = [rgba];
else if (similarValues.length && lastColor && ImageColorUtils.compare(rgba, lastColor, ImageColorUtils.boundaryValue, type)) {
					let insert = false;
					for (const similarValue of similarValues) if (ImageColorUtils.compare(rgba, similarValue[similarValue.length - 1], boundaryValue, type) && ImageColorUtils.compare(rgba, similarValue[Math.floor(similarValue.length / 2)], boundaryValue, type) && ImageColorUtils.compare(rgba, similarValue[Math.floor(similarValue.length - 1)], boundaryValue, type)) {
						similarValue.push(rgba);
						insert = true;
					}
					if (!insert) similarColorsMap[similarValues.length] = [rgba];
				}
			}
			const values = Object.values(similarColorsMap);
			values.sort((x, y) => x.length < y.length ? 1 : -1).filter((item) => item.length > Math.floor(this.imageData.data.length / (this.canvas.width * this.canvas.height) * 4)).forEach((item) => {
				if (!res.some((value) => ImageColorUtils.compare(value, ImageColorUtils.getMedian(item), boundaryValue, type))) res.push(ImageColorUtils.getMedian(item));
			});
			return {
				rgb: res.map((item) => `rgba(${item.join(",")})`),
				hex: res.map((item) => rgb2hex(item))
			};
		}
	};
} });

//#endregion
//#region ../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({ "../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react.development.js"(exports, module) {
	(function() {
		"use strict";
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
		var ReactVersion = "18.2.0";
		var REACT_ELEMENT_TYPE = Symbol.for("react.element");
		var REACT_PORTAL_TYPE = Symbol.for("react.portal");
		var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
		var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
		var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
		var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
		var REACT_CONTEXT_TYPE = Symbol.for("react.context");
		var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
		var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
		var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
		var REACT_MEMO_TYPE = Symbol.for("react.memo");
		var REACT_LAZY_TYPE = Symbol.for("react.lazy");
		var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
		var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
		var FAUX_ITERATOR_SYMBOL = "@@iterator";
		function getIteratorFn(maybeIterable) {
			if (maybeIterable === null || typeof maybeIterable !== "object") return null;
			var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
			if (typeof maybeIterator === "function") return maybeIterator;
			return null;
		}
		/**
		* Keeps track of the current dispatcher.
		*/
		var ReactCurrentDispatcher = { current: null };
		/**
		* Keeps track of the current batch's configuration such as how long an update
		* should suspend for if it needs to.
		*/
		var ReactCurrentBatchConfig = { transition: null };
		var ReactCurrentActQueue = {
			current: null,
			isBatchingLegacy: false,
			didScheduleLegacyUpdate: false
		};
		/**
		* Keeps track of the current owner.
		*
		* The current owner is the component who should own any components that are
		* currently being constructed.
		*/
		var ReactCurrentOwner = { current: null };
		var ReactDebugCurrentFrame = {};
		var currentExtraStackFrame = null;
		function setExtraStackFrame(stack) {
			currentExtraStackFrame = stack;
		}
		{
			ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
				currentExtraStackFrame = stack;
			};
			ReactDebugCurrentFrame.getCurrentStack = null;
			ReactDebugCurrentFrame.getStackAddendum = function() {
				var stack = "";
				if (currentExtraStackFrame) stack += currentExtraStackFrame;
				var impl = ReactDebugCurrentFrame.getCurrentStack;
				if (impl) stack += impl() || "";
				return stack;
			};
		}
		var enableScopeAPI = false;
		var enableCacheElement = false;
		var enableTransitionTracing = false;
		var enableLegacyHidden = false;
		var enableDebugTracing = false;
		var ReactSharedInternals = {
			ReactCurrentDispatcher,
			ReactCurrentBatchConfig,
			ReactCurrentOwner
		};
		{
			ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
			ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
		}
		function warn(format) {
			{
				for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
				printWarning("warn", format, args);
			}
		}
		function error(format) {
			{
				for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
				printWarning("error", format, args);
			}
		}
		function printWarning(level, format, args) {
			{
				var ReactDebugCurrentFrame$2 = ReactSharedInternals.ReactDebugCurrentFrame;
				var stack = ReactDebugCurrentFrame$2.getStackAddendum();
				if (stack !== "") {
					format += "%s";
					args = args.concat([stack]);
				}
				var argsWithFormat = args.map(function(item) {
					return String(item);
				});
				argsWithFormat.unshift("Warning: " + format);
				Function.prototype.apply.call(console[level], console, argsWithFormat);
			}
		}
		var didWarnStateUpdateForUnmountedComponent = {};
		function warnNoop(publicInstance, callerName) {
			{
				var _constructor = publicInstance.constructor;
				var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
				var warningKey = componentName + "." + callerName;
				if (didWarnStateUpdateForUnmountedComponent[warningKey]) return;
				error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
				didWarnStateUpdateForUnmountedComponent[warningKey] = true;
			}
		}
		/**
		* This is the abstract API for an update queue.
		*/
		var ReactNoopUpdateQueue = {
			isMounted: function(publicInstance) {
				return false;
			},
			enqueueForceUpdate: function(publicInstance, callback, callerName) {
				warnNoop(publicInstance, "forceUpdate");
			},
			enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
				warnNoop(publicInstance, "replaceState");
			},
			enqueueSetState: function(publicInstance, partialState, callback, callerName) {
				warnNoop(publicInstance, "setState");
			}
		};
		var assign = Object.assign;
		var emptyObject = {};
		Object.freeze(emptyObject);
		/**
		* Base class helpers for the updating state of a component.
		*/
		function Component(props, context, updater) {
			this.props = props;
			this.context = context;
			this.refs = emptyObject;
			this.updater = updater || ReactNoopUpdateQueue;
		}
		Component.prototype.isReactComponent = {};
		/**
		* Sets a subset of the state. Always use this to mutate
		* state. You should treat `this.state` as immutable.
		*
		* There is no guarantee that `this.state` will be immediately updated, so
		* accessing `this.state` after calling this method may return the old value.
		*
		* There is no guarantee that calls to `setState` will run synchronously,
		* as they may eventually be batched together.  You can provide an optional
		* callback that will be executed when the call to setState is actually
		* completed.
		*
		* When a function is provided to setState, it will be called at some point in
		* the future (not synchronously). It will be called with the up to date
		* component arguments (state, props, context). These values can be different
		* from this.* because your function may be called after receiveProps but before
		* shouldComponentUpdate, and this new state, props, and context will not yet be
		* assigned to this.
		*
		* @param {object|function} partialState Next partial state or function to
		*        produce next partial state to be merged with current state.
		* @param {?function} callback Called after state is updated.
		* @final
		* @protected
		*/
		Component.prototype.setState = function(partialState, callback) {
			if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
			this.updater.enqueueSetState(this, partialState, callback, "setState");
		};
		/**
		* Forces an update. This should only be invoked when it is known with
		* certainty that we are **not** in a DOM transaction.
		*
		* You may want to call this when you know that some deeper aspect of the
		* component's state has changed but `setState` was not called.
		*
		* This will not invoke `shouldComponentUpdate`, but it will invoke
		* `componentWillUpdate` and `componentDidUpdate`.
		*
		* @param {?function} callback Called after update is complete.
		* @final
		* @protected
		*/
		Component.prototype.forceUpdate = function(callback) {
			this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
		};
		/**
		* Deprecated APIs. These APIs used to exist on classic React classes but since
		* we would like to deprecate them, we're not going to move them over to this
		* modern base class. Instead, we define a getter that warns if it's accessed.
		*/
		{
			var deprecatedAPIs = {
				isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
				replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
			};
			var defineDeprecationWarning = function(methodName, info) {
				Object.defineProperty(Component.prototype, methodName, { get: function() {
					warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
					return undefined;
				} });
			};
			for (var fnName in deprecatedAPIs) if (deprecatedAPIs.hasOwnProperty(fnName)) defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
		}
		function ComponentDummy() {}
		ComponentDummy.prototype = Component.prototype;
		/**
		* Convenience component with default shallow equality check for sCU.
		*/
		function PureComponent(props, context, updater) {
			this.props = props;
			this.context = context;
			this.refs = emptyObject;
			this.updater = updater || ReactNoopUpdateQueue;
		}
		var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
		pureComponentPrototype.constructor = PureComponent;
		assign(pureComponentPrototype, Component.prototype);
		pureComponentPrototype.isPureReactComponent = true;
		function createRef() {
			var refObject = { current: null };
			Object.seal(refObject);
			return refObject;
		}
		var isArrayImpl = Array.isArray;
		function isArray(a) {
			return isArrayImpl(a);
		}
		function typeName(value) {
			{
				var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
				var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
				return type;
			}
		}
		function willCoercionThrow(value) {
			try {
				testStringCoercion(value);
				return false;
			} catch (e) {
				return true;
			}
		}
		function testStringCoercion(value) {
			return "" + value;
		}
		function checkKeyStringCoercion(value) {
			if (willCoercionThrow(value)) {
				error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
				return testStringCoercion(value);
			}
		}
		function getWrappedName(outerType, innerType, wrapperName) {
			var displayName = outerType.displayName;
			if (displayName) return displayName;
			var functionName = innerType.displayName || innerType.name || "";
			return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
		}
		function getContextName(type) {
			return type.displayName || "Context";
		}
		function getComponentNameFromType(type) {
			if (type == null) return null;
			if (typeof type.tag === "number") error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
			if (typeof type === "function") return type.displayName || type.name || null;
			if (typeof type === "string") return type;
			switch (type) {
				case REACT_FRAGMENT_TYPE: return "Fragment";
				case REACT_PORTAL_TYPE: return "Portal";
				case REACT_PROFILER_TYPE: return "Profiler";
				case REACT_STRICT_MODE_TYPE: return "StrictMode";
				case REACT_SUSPENSE_TYPE: return "Suspense";
				case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
			}
			if (typeof type === "object") switch (type.$$typeof) {
				case REACT_CONTEXT_TYPE:
					var context = type;
					return getContextName(context) + ".Consumer";
				case REACT_PROVIDER_TYPE:
					var provider = type;
					return getContextName(provider._context) + ".Provider";
				case REACT_FORWARD_REF_TYPE: return getWrappedName(type, type.render, "ForwardRef");
				case REACT_MEMO_TYPE:
					var outerName = type.displayName || null;
					if (outerName !== null) return outerName;
					return getComponentNameFromType(type.type) || "Memo";
				case REACT_LAZY_TYPE: {
					var lazyComponent = type;
					var payload = lazyComponent._payload;
					var init = lazyComponent._init;
					try {
						return getComponentNameFromType(init(payload));
					} catch (x) {
						return null;
					}
				}
			}
			return null;
		}
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		var RESERVED_PROPS = {
			key: true,
			ref: true,
			__self: true,
			__source: true
		};
		var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
		didWarnAboutStringRefs = {};
		function hasValidRef(config) {
			if (hasOwnProperty.call(config, "ref")) {
				var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
				if (getter && getter.isReactWarning) return false;
			}
			return config.ref !== undefined;
		}
		function hasValidKey(config) {
			if (hasOwnProperty.call(config, "key")) {
				var getter = Object.getOwnPropertyDescriptor(config, "key").get;
				if (getter && getter.isReactWarning) return false;
			}
			return config.key !== undefined;
		}
		function defineKeyPropWarningGetter(props, displayName) {
			var warnAboutAccessingKey = function() {
				if (!specialPropKeyWarningShown) {
					specialPropKeyWarningShown = true;
					error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
				}
			};
			warnAboutAccessingKey.isReactWarning = true;
			Object.defineProperty(props, "key", {
				get: warnAboutAccessingKey,
				configurable: true
			});
		}
		function defineRefPropWarningGetter(props, displayName) {
			var warnAboutAccessingRef = function() {
				if (!specialPropRefWarningShown) {
					specialPropRefWarningShown = true;
					error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
				}
			};
			warnAboutAccessingRef.isReactWarning = true;
			Object.defineProperty(props, "ref", {
				get: warnAboutAccessingRef,
				configurable: true
			});
		}
		function warnIfStringRefCannotBeAutoConverted(config) {
			if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
				var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
				if (!didWarnAboutStringRefs[componentName]) {
					error("Component \"%s\" contains the string ref \"%s\". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref", componentName, config.ref);
					didWarnAboutStringRefs[componentName] = true;
				}
			}
		}
		/**
		* Factory method to create a new React element. This no longer adheres to
		* the class pattern, so do not use new to call it. Also, instanceof check
		* will not work. Instead test $$typeof field against Symbol.for('react.element') to check
		* if something is a React Element.
		*
		* @param {*} type
		* @param {*} props
		* @param {*} key
		* @param {string|object} ref
		* @param {*} owner
		* @param {*} self A *temporary* helper to detect places where `this` is
		* different from the `owner` when React.createElement is called, so that we
		* can warn. We want to get rid of owner and replace string `ref`s with arrow
		* functions, and as long as `this` and owner are the same, there will be no
		* change in behavior.
		* @param {*} source An annotation object (added by a transpiler or otherwise)
		* indicating filename, line number, and/or other information.
		* @internal
		*/
		var ReactElement = function(type, key, ref, self$1, source, owner, props) {
			var element = {
				$$typeof: REACT_ELEMENT_TYPE,
				type,
				key,
				ref,
				props,
				_owner: owner
			};
			{
				element._store = {};
				Object.defineProperty(element._store, "validated", {
					configurable: false,
					enumerable: false,
					writable: true,
					value: false
				});
				Object.defineProperty(element, "_self", {
					configurable: false,
					enumerable: false,
					writable: false,
					value: self$1
				});
				Object.defineProperty(element, "_source", {
					configurable: false,
					enumerable: false,
					writable: false,
					value: source
				});
				if (Object.freeze) {
					Object.freeze(element.props);
					Object.freeze(element);
				}
			}
			return element;
		};
		/**
		* Create and return a new ReactElement of the given type.
		* See https://reactjs.org/docs/react-api.html#createelement
		*/
		function createElement(type, config, children) {
			var propName;
			var props = {};
			var key = null;
			var ref = null;
			var self$1 = null;
			var source = null;
			if (config != null) {
				if (hasValidRef(config)) {
					ref = config.ref;
					warnIfStringRefCannotBeAutoConverted(config);
				}
				if (hasValidKey(config)) {
					checkKeyStringCoercion(config.key);
					key = "" + config.key;
				}
				self$1 = config.__self === undefined ? null : config.__self;
				source = config.__source === undefined ? null : config.__source;
				for (propName in config) if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) props[propName] = config[propName];
			}
			var childrenLength = arguments.length - 2;
			if (childrenLength === 1) props.children = children;
else if (childrenLength > 1) {
				var childArray = Array(childrenLength);
				for (var i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
				if (Object.freeze) Object.freeze(childArray);
				props.children = childArray;
			}
			if (type && type.defaultProps) {
				var defaultProps = type.defaultProps;
				for (propName in defaultProps) if (props[propName] === undefined) props[propName] = defaultProps[propName];
			}
			if (key || ref) {
				var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
				if (key) defineKeyPropWarningGetter(props, displayName);
				if (ref) defineRefPropWarningGetter(props, displayName);
			}
			return ReactElement(type, key, ref, self$1, source, ReactCurrentOwner.current, props);
		}
		function cloneAndReplaceKey(oldElement, newKey) {
			var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
			return newElement;
		}
		/**
		* Clone and return a new ReactElement using element as the starting point.
		* See https://reactjs.org/docs/react-api.html#cloneelement
		*/
		function cloneElement(element, config, children) {
			if (element === null || element === undefined) throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
			var propName;
			var props = assign({}, element.props);
			var key = element.key;
			var ref = element.ref;
			var self$1 = element._self;
			var source = element._source;
			var owner = element._owner;
			if (config != null) {
				if (hasValidRef(config)) {
					ref = config.ref;
					owner = ReactCurrentOwner.current;
				}
				if (hasValidKey(config)) {
					checkKeyStringCoercion(config.key);
					key = "" + config.key;
				}
				var defaultProps;
				if (element.type && element.type.defaultProps) defaultProps = element.type.defaultProps;
				for (propName in config) if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) if (config[propName] === undefined && defaultProps !== undefined) props[propName] = defaultProps[propName];
else props[propName] = config[propName];
			}
			var childrenLength = arguments.length - 2;
			if (childrenLength === 1) props.children = children;
else if (childrenLength > 1) {
				var childArray = Array(childrenLength);
				for (var i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
				props.children = childArray;
			}
			return ReactElement(element.type, key, ref, self$1, source, owner, props);
		}
		/**
		* Verifies the object is a ReactElement.
		* See https://reactjs.org/docs/react-api.html#isvalidelement
		* @param {?object} object
		* @return {boolean} True if `object` is a ReactElement.
		* @final
		*/
		function isValidElement(object) {
			return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
		}
		var SEPARATOR = ".";
		var SUBSEPARATOR = ":";
		/**
		* Escape and wrap key so it is safe to use as a reactid
		*
		* @param {string} key to be escaped.
		* @return {string} the escaped key.
		*/
		function escape(key) {
			var escapeRegex = /[=:]/g;
			var escaperLookup = {
				"=": "=0",
				":": "=2"
			};
			var escapedString = key.replace(escapeRegex, function(match) {
				return escaperLookup[match];
			});
			return "$" + escapedString;
		}
		/**
		* TODO: Test that a single child and an array with one item have the same key
		* pattern.
		*/
		var didWarnAboutMaps = false;
		var userProvidedKeyEscapeRegex = /\/+/g;
		function escapeUserProvidedKey(text) {
			return text.replace(userProvidedKeyEscapeRegex, "$&/");
		}
		/**
		* Generate a key string that identifies a element within a set.
		*
		* @param {*} element A element that could contain a manual key.
		* @param {number} index Index that is used if a manual key is not provided.
		* @return {string}
		*/
		function getElementKey(element, index) {
			if (typeof element === "object" && element !== null && element.key != null) {
				checkKeyStringCoercion(element.key);
				return escape("" + element.key);
			}
			return index.toString(36);
		}
		function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
			var type = typeof children;
			if (type === "undefined" || type === "boolean") children = null;
			var invokeCallback = false;
			if (children === null) invokeCallback = true;
else switch (type) {
				case "string":
				case "number":
					invokeCallback = true;
					break;
				case "object": switch (children.$$typeof) {
					case REACT_ELEMENT_TYPE:
					case REACT_PORTAL_TYPE: invokeCallback = true;
				}
			}
			if (invokeCallback) {
				var _child = children;
				var mappedChild = callback(_child);
				var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
				if (isArray(mappedChild)) {
					var escapedChildKey = "";
					if (childKey != null) escapedChildKey = escapeUserProvidedKey(childKey) + "/";
					mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
						return c;
					});
				} else if (mappedChild != null) {
					if (isValidElement(mappedChild)) {
						if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) checkKeyStringCoercion(mappedChild.key);
						mappedChild = cloneAndReplaceKey(
							mappedChild,
							// traverseAllChildren used to do for objects as children
							escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey
);
					}
					array.push(mappedChild);
				}
				return 1;
			}
			var child;
			var nextName;
			var subtreeCount = 0;
			var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
			if (isArray(children)) for (var i = 0; i < children.length; i++) {
				child = children[i];
				nextName = nextNamePrefix + getElementKey(child, i);
				subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
			}
else {
				var iteratorFn = getIteratorFn(children);
				if (typeof iteratorFn === "function") {
					var iterableChildren = children;
					if (iteratorFn === iterableChildren.entries) {
						if (!didWarnAboutMaps) warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
						didWarnAboutMaps = true;
					}
					var iterator = iteratorFn.call(iterableChildren);
					var step;
					var ii = 0;
					while (!(step = iterator.next()).done) {
						child = step.value;
						nextName = nextNamePrefix + getElementKey(child, ii++);
						subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
					}
				} else if (type === "object") {
					var childrenString = String(children);
					throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). " + "If you meant to render a collection of children, use an array " + "instead.");
				}
			}
			return subtreeCount;
		}
		/**
		* Maps children that are typically specified as `props.children`.
		*
		* See https://reactjs.org/docs/react-api.html#reactchildrenmap
		*
		* The provided mapFunction(child, index) will be called for each
		* leaf child.
		*
		* @param {?*} children Children tree container.
		* @param {function(*, int)} func The map function.
		* @param {*} context Context for mapFunction.
		* @return {object} Object containing the ordered map of results.
		*/
		function mapChildren(children, func, context) {
			if (children == null) return children;
			var result = [];
			var count = 0;
			mapIntoArray(children, result, "", "", function(child) {
				return func.call(context, child, count++);
			});
			return result;
		}
		/**
		* Count the number of children that are typically specified as
		* `props.children`.
		*
		* See https://reactjs.org/docs/react-api.html#reactchildrencount
		*
		* @param {?*} children Children tree container.
		* @return {number} The number of children.
		*/
		function countChildren(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		}
		/**
		* Iterates through children that are typically specified as `props.children`.
		*
		* See https://reactjs.org/docs/react-api.html#reactchildrenforeach
		*
		* The provided forEachFunc(child, index) will be called for each
		* leaf child.
		*
		* @param {?*} children Children tree container.
		* @param {function(*, int)} forEachFunc
		* @param {*} forEachContext Context for forEachContext.
		*/
		function forEachChildren(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		}
		/**
		* Flatten a children object (typically specified as `props.children`) and
		* return an array with appropriately re-keyed children.
		*
		* See https://reactjs.org/docs/react-api.html#reactchildrentoarray
		*/
		function toArray(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		}
		/**
		* Returns the first child in a collection of children and verifies that there
		* is only one child in the collection.
		*
		* See https://reactjs.org/docs/react-api.html#reactchildrenonly
		*
		* The current implementation of this function assumes that a single child gets
		* passed without a wrapper, but the purpose of this helper function is to
		* abstract away the particular structure of children.
		*
		* @param {?object} children Child collection structure.
		* @return {ReactElement} The first and only `ReactElement` contained in the
		* structure.
		*/
		function onlyChild(children) {
			if (!isValidElement(children)) throw new Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
		function createContext(defaultValue) {
			var context = {
				$$typeof: REACT_CONTEXT_TYPE,
				_currentValue: defaultValue,
				_currentValue2: defaultValue,
				_threadCount: 0,
				Provider: null,
				Consumer: null,
				_defaultValue: null,
				_globalName: null
			};
			context.Provider = {
				$$typeof: REACT_PROVIDER_TYPE,
				_context: context
			};
			var hasWarnedAboutUsingNestedContextConsumers = false;
			var hasWarnedAboutUsingConsumerProvider = false;
			var hasWarnedAboutDisplayNameOnConsumer = false;
			{
				var Consumer = {
					$$typeof: REACT_CONTEXT_TYPE,
					_context: context
				};
				Object.defineProperties(Consumer, {
					Provider: {
						get: function() {
							if (!hasWarnedAboutUsingConsumerProvider) {
								hasWarnedAboutUsingConsumerProvider = true;
								error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
							}
							return context.Provider;
						},
						set: function(_Provider) {
							context.Provider = _Provider;
						}
					},
					_currentValue: {
						get: function() {
							return context._currentValue;
						},
						set: function(_currentValue) {
							context._currentValue = _currentValue;
						}
					},
					_currentValue2: {
						get: function() {
							return context._currentValue2;
						},
						set: function(_currentValue2) {
							context._currentValue2 = _currentValue2;
						}
					},
					_threadCount: {
						get: function() {
							return context._threadCount;
						},
						set: function(_threadCount) {
							context._threadCount = _threadCount;
						}
					},
					Consumer: { get: function() {
						if (!hasWarnedAboutUsingNestedContextConsumers) {
							hasWarnedAboutUsingNestedContextConsumers = true;
							error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
						}
						return context.Consumer;
					} },
					displayName: {
						get: function() {
							return context.displayName;
						},
						set: function(displayName) {
							if (!hasWarnedAboutDisplayNameOnConsumer) {
								warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
								hasWarnedAboutDisplayNameOnConsumer = true;
							}
						}
					}
				});
				context.Consumer = Consumer;
			}
			{
				context._currentRenderer = null;
				context._currentRenderer2 = null;
			}
			return context;
		}
		var Uninitialized = -1;
		var Pending = 0;
		var Resolved = 1;
		var Rejected = 2;
		function lazyInitializer(payload) {
			if (payload._status === Uninitialized) {
				var ctor = payload._result;
				var thenable = ctor();
				thenable.then(function(moduleObject$1) {
					if (payload._status === Pending || payload._status === Uninitialized) {
						var resolved = payload;
						resolved._status = Resolved;
						resolved._result = moduleObject$1;
					}
				}, function(error$1) {
					if (payload._status === Pending || payload._status === Uninitialized) {
						var rejected = payload;
						rejected._status = Rejected;
						rejected._result = error$1;
					}
				});
				if (payload._status === Uninitialized) {
					var pending = payload;
					pending._status = Pending;
					pending._result = thenable;
				}
			}
			if (payload._status === Resolved) {
				var moduleObject = payload._result;
				if (moduleObject === undefined) error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
				if (!("default" in moduleObject)) error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
				return moduleObject.default;
			} else throw payload._result;
		}
		function lazy(ctor) {
			var payload = {
				_status: Uninitialized,
				_result: ctor
			};
			var lazyType = {
				$$typeof: REACT_LAZY_TYPE,
				_payload: payload,
				_init: lazyInitializer
			};
			{
				var defaultProps;
				var propTypes;
				Object.defineProperties(lazyType, {
					defaultProps: {
						configurable: true,
						get: function() {
							return defaultProps;
						},
						set: function(newDefaultProps) {
							error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
							defaultProps = newDefaultProps;
							Object.defineProperty(lazyType, "defaultProps", { enumerable: true });
						}
					},
					propTypes: {
						configurable: true,
						get: function() {
							return propTypes;
						},
						set: function(newPropTypes) {
							error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
							propTypes = newPropTypes;
							Object.defineProperty(lazyType, "propTypes", { enumerable: true });
						}
					}
				});
			}
			return lazyType;
		}
		function forwardRef(render) {
			{
				if (render != null && render.$$typeof === REACT_MEMO_TYPE) error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
else if (typeof render !== "function") error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
else if (render.length !== 0 && render.length !== 2) error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
				if (render != null) {
					if (render.defaultProps != null || render.propTypes != null) error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
				}
			}
			var elementType = {
				$$typeof: REACT_FORWARD_REF_TYPE,
				render
			};
			{
				var ownName;
				Object.defineProperty(elementType, "displayName", {
					enumerable: false,
					configurable: true,
					get: function() {
						return ownName;
					},
					set: function(name) {
						ownName = name;
						if (!render.name && !render.displayName) render.displayName = name;
					}
				});
			}
			return elementType;
		}
		var REACT_MODULE_REFERENCE;
		REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
		function isValidElementType(type) {
			if (typeof type === "string" || typeof type === "function") return true;
			if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) return true;
			if (typeof type === "object" && type !== null) {
				if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) return true;
			}
			return false;
		}
		function memo(type, compare) {
			if (!isValidElementType(type)) error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
			var elementType = {
				$$typeof: REACT_MEMO_TYPE,
				type,
				compare: compare === undefined ? null : compare
			};
			{
				var ownName;
				Object.defineProperty(elementType, "displayName", {
					enumerable: false,
					configurable: true,
					get: function() {
						return ownName;
					},
					set: function(name) {
						ownName = name;
						if (!type.name && !type.displayName) type.displayName = name;
					}
				});
			}
			return elementType;
		}
		function resolveDispatcher() {
			var dispatcher = ReactCurrentDispatcher.current;
			if (dispatcher === null) error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
			return dispatcher;
		}
		function useContext(Context) {
			var dispatcher = resolveDispatcher();
			if (Context._context !== undefined) {
				var realContext = Context._context;
				if (realContext.Consumer === Context) error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
else if (realContext.Provider === Context) error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
			}
			return dispatcher.useContext(Context);
		}
		function useState(initialState) {
			var dispatcher = resolveDispatcher();
			return dispatcher.useState(initialState);
		}
		function useReducer(reducer, initialArg, init) {
			var dispatcher = resolveDispatcher();
			return dispatcher.useReducer(reducer, initialArg, init);
		}
		function useRef(initialValue) {
			var dispatcher = resolveDispatcher();
			return dispatcher.useRef(initialValue);
		}
		function useEffect(create, deps) {
			var dispatcher = resolveDispatcher();
			return dispatcher.useEffect(create, deps);
		}
		function useInsertionEffect(create, deps) {
			var dispatcher = resolveDispatcher();
			return dispatcher.useInsertionEffect(create, deps);
		}
		function useLayoutEffect(create, deps) {
			var dispatcher = resolveDispatcher();
			return dispatcher.useLayoutEffect(create, deps);
		}
		function useCallback(callback, deps) {
			var dispatcher = resolveDispatcher();
			return dispatcher.useCallback(callback, deps);
		}
		function useMemo(create, deps) {
			var dispatcher = resolveDispatcher();
			return dispatcher.useMemo(create, deps);
		}
		function useImperativeHandle(ref, create, deps) {
			var dispatcher = resolveDispatcher();
			return dispatcher.useImperativeHandle(ref, create, deps);
		}
		function useDebugValue(value, formatterFn) {
			{
				var dispatcher = resolveDispatcher();
				return dispatcher.useDebugValue(value, formatterFn);
			}
		}
		function useTransition() {
			var dispatcher = resolveDispatcher();
			return dispatcher.useTransition();
		}
		function useDeferredValue(value) {
			var dispatcher = resolveDispatcher();
			return dispatcher.useDeferredValue(value);
		}
		function useId() {
			var dispatcher = resolveDispatcher();
			return dispatcher.useId();
		}
		function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
			var dispatcher = resolveDispatcher();
			return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
		}
		var disabledDepth = 0;
		var prevLog;
		var prevInfo;
		var prevWarn;
		var prevError;
		var prevGroup;
		var prevGroupCollapsed;
		var prevGroupEnd;
		function disabledLog() {}
		disabledLog.__reactDisabledLog = true;
		function disableLogs() {
			{
				if (disabledDepth === 0) {
					prevLog = console.log;
					prevInfo = console.info;
					prevWarn = console.warn;
					prevError = console.error;
					prevGroup = console.group;
					prevGroupCollapsed = console.groupCollapsed;
					prevGroupEnd = console.groupEnd;
					var props = {
						configurable: true,
						enumerable: true,
						value: disabledLog,
						writable: true
					};
					Object.defineProperties(console, {
						info: props,
						log: props,
						warn: props,
						error: props,
						group: props,
						groupCollapsed: props,
						groupEnd: props
					});
				}
				disabledDepth++;
			}
		}
		function reenableLogs() {
			{
				disabledDepth--;
				if (disabledDepth === 0) {
					var props = {
						configurable: true,
						enumerable: true,
						writable: true
					};
					Object.defineProperties(console, {
						log: assign({}, props, { value: prevLog }),
						info: assign({}, props, { value: prevInfo }),
						warn: assign({}, props, { value: prevWarn }),
						error: assign({}, props, { value: prevError }),
						group: assign({}, props, { value: prevGroup }),
						groupCollapsed: assign({}, props, { value: prevGroupCollapsed }),
						groupEnd: assign({}, props, { value: prevGroupEnd })
					});
				}
				if (disabledDepth < 0) error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
			}
		}
		var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
		var prefix;
		function describeBuiltInComponentFrame(name, source, ownerFn) {
			{
				if (prefix === undefined) try {
					throw Error();
				} catch (x) {
					var match = x.stack.trim().match(/\n( *(at )?)/);
					prefix = match && match[1] || "";
				}
				return "\n" + prefix + name;
			}
		}
		var reentry = false;
		var componentFrameCache;
		{
			var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
			componentFrameCache = new PossiblyWeakMap();
		}
		function describeNativeComponentFrame(fn, construct) {
			if (!fn || reentry) return "";
			{
				var frame = componentFrameCache.get(fn);
				if (frame !== undefined) return frame;
			}
			var control;
			reentry = true;
			var previousPrepareStackTrace = Error.prepareStackTrace;
			Error.prepareStackTrace = undefined;
			var previousDispatcher;
			{
				previousDispatcher = ReactCurrentDispatcher$1.current;
				ReactCurrentDispatcher$1.current = null;
				disableLogs();
			}
			try {
				if (construct) {
					var Fake = function() {
						throw Error();
					};
					Object.defineProperty(Fake.prototype, "props", { set: function() {
						throw Error();
					} });
					if (typeof Reflect === "object" && Reflect.construct) {
						try {
							Reflect.construct(Fake, []);
						} catch (x) {
							control = x;
						}
						Reflect.construct(fn, [], Fake);
					} else {
						try {
							Fake.call();
						} catch (x) {
							control = x;
						}
						fn.call(Fake.prototype);
					}
				} else {
					try {
						throw Error();
					} catch (x) {
						control = x;
					}
					fn();
				}
			} catch (sample) {
				if (sample && control && typeof sample.stack === "string") {
					var sampleLines = sample.stack.split("\n");
					var controlLines = control.stack.split("\n");
					var s = sampleLines.length - 1;
					var c = controlLines.length - 1;
					while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) c--;
					for (; s >= 1 && c >= 0; s--, c--) if (sampleLines[s] !== controlLines[c]) {
						if (s !== 1 || c !== 1) do {
							s--;
							c--;
							if (c < 0 || sampleLines[s] !== controlLines[c]) {
								var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
								if (fn.displayName && _frame.includes("<anonymous>")) _frame = _frame.replace("<anonymous>", fn.displayName);
								if (typeof fn === "function") componentFrameCache.set(fn, _frame);
								return _frame;
							}
						} while (s >= 1 && c >= 0);
						break;
					}
				}
			} finally {
				reentry = false;
				{
					ReactCurrentDispatcher$1.current = previousDispatcher;
					reenableLogs();
				}
				Error.prepareStackTrace = previousPrepareStackTrace;
			}
			var name = fn ? fn.displayName || fn.name : "";
			var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
			if (typeof fn === "function") componentFrameCache.set(fn, syntheticFrame);
			return syntheticFrame;
		}
		function describeFunctionComponentFrame(fn, source, ownerFn) {
			return describeNativeComponentFrame(fn, false);
		}
		function shouldConstruct(Component$1) {
			var prototype = Component$1.prototype;
			return !!(prototype && prototype.isReactComponent);
		}
		function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
			if (type == null) return "";
			if (typeof type === "function") return describeNativeComponentFrame(type, shouldConstruct(type));
			if (typeof type === "string") return describeBuiltInComponentFrame(type);
			switch (type) {
				case REACT_SUSPENSE_TYPE: return describeBuiltInComponentFrame("Suspense");
				case REACT_SUSPENSE_LIST_TYPE: return describeBuiltInComponentFrame("SuspenseList");
			}
			if (typeof type === "object") switch (type.$$typeof) {
				case REACT_FORWARD_REF_TYPE: return describeFunctionComponentFrame(type.render);
				case REACT_MEMO_TYPE: return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
				case REACT_LAZY_TYPE: {
					var lazyComponent = type;
					var payload = lazyComponent._payload;
					var init = lazyComponent._init;
					try {
						return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
					} catch (x) {}
				}
			}
			return "";
		}
		var loggedTypeFailures = {};
		var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
		function setCurrentlyValidatingElement(element) {
			if (element) {
				var owner = element._owner;
				var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
				ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
			} else ReactDebugCurrentFrame$1.setExtraStackFrame(null);
		}
		function checkPropTypes(typeSpecs, values, location, componentName, element) {
			{
				var has = Function.call.bind(hasOwnProperty);
				for (var typeSpecName in typeSpecs) if (has(typeSpecs, typeSpecName)) {
					var error$1 = void 0;
					try {
						if (typeof typeSpecs[typeSpecName] !== "function") {
							var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; " + "it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`." + "This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
							err.name = "Invariant Violation";
							throw err;
						}
						error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
					} catch (ex) {
						error$1 = ex;
					}
					if (error$1 && !(error$1 instanceof Error)) {
						setCurrentlyValidatingElement(element);
						error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
						setCurrentlyValidatingElement(null);
					}
					if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
						loggedTypeFailures[error$1.message] = true;
						setCurrentlyValidatingElement(element);
						error("Failed %s type: %s", location, error$1.message);
						setCurrentlyValidatingElement(null);
					}
				}
			}
		}
		function setCurrentlyValidatingElement$1(element) {
			if (element) {
				var owner = element._owner;
				var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
				setExtraStackFrame(stack);
			} else setExtraStackFrame(null);
		}
		var propTypesMisspellWarningShown;
		propTypesMisspellWarningShown = false;
		function getDeclarationErrorAddendum() {
			if (ReactCurrentOwner.current) {
				var name = getComponentNameFromType(ReactCurrentOwner.current.type);
				if (name) return "\n\nCheck the render method of `" + name + "`.";
			}
			return "";
		}
		function getSourceInfoErrorAddendum(source) {
			if (source !== undefined) {
				var fileName = source.fileName.replace(/^.*[\\\/]/, "");
				var lineNumber = source.lineNumber;
				return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
			}
			return "";
		}
		function getSourceInfoErrorAddendumForProps(elementProps) {
			if (elementProps !== null && elementProps !== undefined) return getSourceInfoErrorAddendum(elementProps.__source);
			return "";
		}
		/**
		* Warn if there's no key explicitly set on dynamic arrays of children or
		* object keys are not valid. This allows us to keep track of children between
		* updates.
		*/
		var ownerHasKeyUseWarning = {};
		function getCurrentComponentErrorInfo(parentType) {
			var info = getDeclarationErrorAddendum();
			if (!info) {
				var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
				if (parentName) info = "\n\nCheck the top-level render call using <" + parentName + ">.";
			}
			return info;
		}
		/**
		* Warn if the element doesn't have an explicit key assigned to it.
		* This element is in an array. The array could grow and shrink or be
		* reordered. All children that haven't already been validated are required to
		* have a "key" property assigned to it. Error statuses are cached so a warning
		* will only be shown once.
		*
		* @internal
		* @param {ReactElement} element Element that requires a key.
		* @param {*} parentType element's parent's type.
		*/
		function validateExplicitKey(element, parentType) {
			if (!element._store || element._store.validated || element.key != null) return;
			element._store.validated = true;
			var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
			if (ownerHasKeyUseWarning[currentComponentErrorInfo]) return;
			ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
			var childOwner = "";
			if (element && element._owner && element._owner !== ReactCurrentOwner.current) childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
			{
				setCurrentlyValidatingElement$1(element);
				error("Each child in a list should have a unique \"key\" prop.%s%s See https://reactjs.org/link/warning-keys for more information.", currentComponentErrorInfo, childOwner);
				setCurrentlyValidatingElement$1(null);
			}
		}
		/**
		* Ensure that every element either is passed in a static location, in an
		* array with an explicit keys property defined, or in an object literal
		* with valid key property.
		*
		* @internal
		* @param {ReactNode} node Statically passed child of any type.
		* @param {*} parentType node's parent's type.
		*/
		function validateChildKeys(node, parentType) {
			if (typeof node !== "object") return;
			if (isArray(node)) for (var i = 0; i < node.length; i++) {
				var child = node[i];
				if (isValidElement(child)) validateExplicitKey(child, parentType);
			}
else if (isValidElement(node)) {
				if (node._store) node._store.validated = true;
			} else if (node) {
				var iteratorFn = getIteratorFn(node);
				if (typeof iteratorFn === "function") {
					if (iteratorFn !== node.entries) {
						var iterator = iteratorFn.call(node);
						var step;
						while (!(step = iterator.next()).done) if (isValidElement(step.value)) validateExplicitKey(step.value, parentType);
					}
				}
			}
		}
		/**
		* Given an element, validate that its props follow the propTypes definition,
		* provided by the type.
		*
		* @param {ReactElement} element
		*/
		function validatePropTypes(element) {
			{
				var type = element.type;
				if (type === null || type === undefined || typeof type === "string") return;
				var propTypes;
				if (typeof type === "function") propTypes = type.propTypes;
else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) propTypes = type.propTypes;
else return;
				if (propTypes) {
					var name = getComponentNameFromType(type);
					checkPropTypes(propTypes, element.props, "prop", name, element);
				} else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
					propTypesMisspellWarningShown = true;
					var _name = getComponentNameFromType(type);
					error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
				}
				if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
			}
		}
		/**
		* Given a fragment, validate that it can only be provided with fragment props
		* @param {ReactElement} fragment
		*/
		function validateFragmentProps(fragment) {
			{
				var keys = Object.keys(fragment.props);
				for (var i = 0; i < keys.length; i++) {
					var key = keys[i];
					if (key !== "children" && key !== "key") {
						setCurrentlyValidatingElement$1(fragment);
						error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
						setCurrentlyValidatingElement$1(null);
						break;
					}
				}
				if (fragment.ref !== null) {
					setCurrentlyValidatingElement$1(fragment);
					error("Invalid attribute `ref` supplied to `React.Fragment`.");
					setCurrentlyValidatingElement$1(null);
				}
			}
		}
		function createElementWithValidation(type, props, children) {
			var validType = isValidElementType(type);
			if (!validType) {
				var info = "";
				if (type === undefined || typeof type === "object" && type !== null && Object.keys(type).length === 0) info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
				var sourceInfo = getSourceInfoErrorAddendumForProps(props);
				if (sourceInfo) info += sourceInfo;
else info += getDeclarationErrorAddendum();
				var typeString;
				if (type === null) typeString = "null";
else if (isArray(type)) typeString = "array";
else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
					typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
					info = " Did you accidentally export a JSX literal instead of a component?";
				} else typeString = typeof type;
				error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
			}
			var element = createElement.apply(this, arguments);
			if (element == null) return element;
			if (validType) for (var i = 2; i < arguments.length; i++) validateChildKeys(arguments[i], type);
			if (type === REACT_FRAGMENT_TYPE) validateFragmentProps(element);
else validatePropTypes(element);
			return element;
		}
		var didWarnAboutDeprecatedCreateFactory = false;
		function createFactoryWithValidation(type) {
			var validatedFactory = createElementWithValidation.bind(null, type);
			validatedFactory.type = type;
			{
				if (!didWarnAboutDeprecatedCreateFactory) {
					didWarnAboutDeprecatedCreateFactory = true;
					warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
				}
				Object.defineProperty(validatedFactory, "type", {
					enumerable: false,
					get: function() {
						warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
						Object.defineProperty(this, "type", { value: type });
						return type;
					}
				});
			}
			return validatedFactory;
		}
		function cloneElementWithValidation(element, props, children) {
			var newElement = cloneElement.apply(this, arguments);
			for (var i = 2; i < arguments.length; i++) validateChildKeys(arguments[i], newElement.type);
			validatePropTypes(newElement);
			return newElement;
		}
		function startTransition(scope, options) {
			var prevTransition = ReactCurrentBatchConfig.transition;
			ReactCurrentBatchConfig.transition = {};
			var currentTransition = ReactCurrentBatchConfig.transition;
			ReactCurrentBatchConfig.transition._updatedFibers = new Set();
			try {
				scope();
			} finally {
				ReactCurrentBatchConfig.transition = prevTransition;
				if (prevTransition === null && currentTransition._updatedFibers) {
					var updatedFibersCount = currentTransition._updatedFibers.size;
					if (updatedFibersCount > 10) warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
					currentTransition._updatedFibers.clear();
				}
			}
		}
		var didWarnAboutMessageChannel = false;
		var enqueueTaskImpl = null;
		function enqueueTask(task) {
			if (enqueueTaskImpl === null) try {
				var requireString = ("require" + Math.random()).slice(0, 7);
				var nodeRequire = module && module[requireString];
				enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
			} catch (_err) {
				enqueueTaskImpl = function(callback) {
					if (didWarnAboutMessageChannel === false) {
						didWarnAboutMessageChannel = true;
						if (typeof MessageChannel === "undefined") error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
					}
					var channel = new MessageChannel();
					channel.port1.onmessage = callback;
					channel.port2.postMessage(undefined);
				};
			}
			return enqueueTaskImpl(task);
		}
		var actScopeDepth = 0;
		var didWarnNoAwaitAct = false;
		function act(callback) {
			{
				var prevActScopeDepth = actScopeDepth;
				actScopeDepth++;
				if (ReactCurrentActQueue.current === null) ReactCurrentActQueue.current = [];
				var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
				var result;
				try {
					ReactCurrentActQueue.isBatchingLegacy = true;
					result = callback();
					if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
						var queue = ReactCurrentActQueue.current;
						if (queue !== null) {
							ReactCurrentActQueue.didScheduleLegacyUpdate = false;
							flushActQueue(queue);
						}
					}
				} catch (error$1) {
					popActScope(prevActScopeDepth);
					throw error$1;
				} finally {
					ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
				}
				if (result !== null && typeof result === "object" && typeof result.then === "function") {
					var thenableResult = result;
					var wasAwaited = false;
					var thenable = { then: function(resolve, reject) {
						wasAwaited = true;
						thenableResult.then(function(returnValue$1) {
							popActScope(prevActScopeDepth);
							if (actScopeDepth === 0) recursivelyFlushAsyncActWork(returnValue$1, resolve, reject);
else resolve(returnValue$1);
						}, function(error$1) {
							popActScope(prevActScopeDepth);
							reject(error$1);
						});
					} };
					if (!didWarnNoAwaitAct && typeof Promise !== "undefined") Promise.resolve().then(function() {}).then(function() {
						if (!wasAwaited) {
							didWarnNoAwaitAct = true;
							error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
						}
					});
					return thenable;
				} else {
					var returnValue = result;
					popActScope(prevActScopeDepth);
					if (actScopeDepth === 0) {
						var _queue = ReactCurrentActQueue.current;
						if (_queue !== null) {
							flushActQueue(_queue);
							ReactCurrentActQueue.current = null;
						}
						var _thenable = { then: function(resolve, reject) {
							if (ReactCurrentActQueue.current === null) {
								ReactCurrentActQueue.current = [];
								recursivelyFlushAsyncActWork(returnValue, resolve, reject);
							} else resolve(returnValue);
						} };
						return _thenable;
					} else {
						var _thenable2 = { then: function(resolve, reject) {
							resolve(returnValue);
						} };
						return _thenable2;
					}
				}
			}
		}
		function popActScope(prevActScopeDepth) {
			{
				if (prevActScopeDepth !== actScopeDepth - 1) error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
				actScopeDepth = prevActScopeDepth;
			}
		}
		function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
			{
				var queue = ReactCurrentActQueue.current;
				if (queue !== null) try {
					flushActQueue(queue);
					enqueueTask(function() {
						if (queue.length === 0) {
							ReactCurrentActQueue.current = null;
							resolve(returnValue);
						} else recursivelyFlushAsyncActWork(returnValue, resolve, reject);
					});
				} catch (error$1) {
					reject(error$1);
				}
else resolve(returnValue);
			}
		}
		var isFlushing = false;
		function flushActQueue(queue) {
			if (!isFlushing) {
				isFlushing = true;
				var i = 0;
				try {
					for (; i < queue.length; i++) {
						var callback = queue[i];
						do 
							callback = callback(true);
						while (callback !== null);
					}
					queue.length = 0;
				} catch (error$1) {
					queue = queue.slice(i + 1);
					throw error$1;
				} finally {
					isFlushing = false;
				}
			}
		}
		var createElement$1 = createElementWithValidation;
		var cloneElement$1 = cloneElementWithValidation;
		var createFactory = createFactoryWithValidation;
		var Children = {
			map: mapChildren,
			forEach: forEachChildren,
			count: countChildren,
			toArray,
			only: onlyChild
		};
		exports.Children = Children;
		exports.Component = Component;
		exports.Fragment = REACT_FRAGMENT_TYPE;
		exports.Profiler = REACT_PROFILER_TYPE;
		exports.PureComponent = PureComponent;
		exports.StrictMode = REACT_STRICT_MODE_TYPE;
		exports.Suspense = REACT_SUSPENSE_TYPE;
		exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
		exports.cloneElement = cloneElement$1;
		exports.createContext = createContext;
		exports.createElement = createElement$1;
		exports.createFactory = createFactory;
		exports.createRef = createRef;
		exports.forwardRef = forwardRef;
		exports.isValidElement = isValidElement;
		exports.lazy = lazy;
		exports.memo = memo;
		exports.startTransition = startTransition;
		exports.unstable_act = act;
		exports.useCallback = useCallback;
		exports.useContext = useContext;
		exports.useDebugValue = useDebugValue;
		exports.useDeferredValue = useDeferredValue;
		exports.useEffect = useEffect;
		exports.useId = useId;
		exports.useImperativeHandle = useImperativeHandle;
		exports.useInsertionEffect = useInsertionEffect;
		exports.useLayoutEffect = useLayoutEffect;
		exports.useMemo = useMemo;
		exports.useReducer = useReducer;
		exports.useRef = useRef;
		exports.useState = useState;
		exports.useSyncExternalStore = useSyncExternalStore;
		exports.useTransition = useTransition;
		exports.version = ReactVersion;
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
	})();
} });

//#endregion
//#region ../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js
var require_react = __commonJS({ "../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"(exports, module) {
	module.exports = require_react_development();
} });

//#endregion
//#region src/banner.js
var require_banner = __commonJS({ "src/banner.js"(exports) {
	var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	} : function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	});
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	} : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function() {
		var ownKeys = function(o) {
			ownKeys = Object.getOwnPropertyNames || function(o$1) {
				var ar = [];
				for (var k in o$1) if (Object.prototype.hasOwnProperty.call(o$1, k)) ar[ar.length] = k;
				return ar;
			};
			return ownKeys(o);
		};
		return function(mod) {
			if (mod && mod.__esModule) return mod;
			var result = {};
			if (mod != null) {
				for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
			}
			__setModuleDefault(result, mod);
			return result;
		};
	}();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ResponsiveBanner$1;
	const sdk_1 = (init_dist(), __toCommonJS(dist_exports));
	const image_color_utils_1 = (init_index_es(), __toCommonJS(index_es_exports));
	const react_1 = __importStar(require_react());
	const offsetValues = [
		2,
		20,
		120
	];
	const filterWidth = 50;
	const filterOffset = filterWidth / 2;
	const getFinalColor = (rgb) => {
		if (!rgb) return "#fff";
		const rgbArr = rgb.split(",");
		const hsl = (0, image_color_utils_1.rgb2hsv)([
			parseInt(rgbArr[0]),
			parseInt(rgbArr[1]),
			parseInt(rgbArr[2])
		]);
		return (0, image_color_utils_1.isDeepColorByHsv)(hsl) ? "#000" : "#fff";
	};
	const debounce = (fn, delay) => {
		let timer;
		return function(...args) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				fn.apply(this, args);
			}, delay);
		};
	};
	function ResponsiveBanner$1(props) {
		var _a, _b, _c, _d, _e, _f;
		const { width = "100%", height = "100%", img, backgroundPosition = "center", style, className } = props;
		const conRef = (0, react_1.useRef)(null);
		const [mounted, setMounted] = (0, react_1.useState)(0);
		const bannerWidth = (0, react_1.useMemo)(() => {
			var _a$1, _b$1;
			return !mounted ? 0 : width === "100%" ? ((_b$1 = (_a$1 = conRef.current) === null || _a$1 === void 0 ? void 0 : _a$1.parentElement) === null || _b$1 === void 0 ? void 0 : _b$1.offsetWidth) || 0 : width;
		}, [
			width,
			conRef,
			mounted
		]);
		const bannerHeight = (0, react_1.useMemo)(() => {
			var _a$1, _b$1;
			return !mounted ? 0 : height === "100%" ? ((_b$1 = (_a$1 = conRef.current) === null || _a$1 === void 0 ? void 0 : _a$1.parentElement) === null || _b$1 === void 0 ? void 0 : _b$1.offsetHeight) || 0 : height;
		}, [
			height,
			conRef,
			mounted
		]);
		const [coverInfo, setCoverInfo] = (0, react_1.useState)({
			left: "",
			right: "",
			bottom: "",
			top: ""
		});
		const isAdaptY = (0, react_1.useMemo)(() => {
			var _a$1, _b$1, _c$1, _d$1;
			return !!(((_a$1 = coverInfo.image) === null || _a$1 === void 0 ? void 0 : _a$1.width) && ((_b$1 = coverInfo.image) === null || _b$1 === void 0 ? void 0 : _b$1.height) && ((_c$1 = coverInfo.image) === null || _c$1 === void 0 ? void 0 : _c$1.width) / bannerWidth > ((_d$1 = coverInfo.image) === null || _d$1 === void 0 ? void 0 : _d$1.height) / bannerHeight);
		}, [
			(_a = coverInfo.image) === null || _a === void 0 ? void 0 : _a.width,
			(_b = coverInfo.image) === null || _b === void 0 ? void 0 : _b.height,
			bannerWidth,
			bannerHeight
		]);
		const renderedCoverWidth = (0, react_1.useMemo)(() => {
			var _a$1, _b$1, _c$1;
			return isAdaptY || !((_a$1 = coverInfo.image) === null || _a$1 === void 0 ? void 0 : _a$1.width) ? bannerWidth : Math.floor(((_b$1 = coverInfo.image) === null || _b$1 === void 0 ? void 0 : _b$1.width) * bannerHeight / ((_c$1 = coverInfo.image) === null || _c$1 === void 0 ? void 0 : _c$1.height));
		}, [
			isAdaptY,
			(_c = coverInfo.image) === null || _c === void 0 ? void 0 : _c.width,
			(_d = coverInfo.image) === null || _d === void 0 ? void 0 : _d.height,
			bannerWidth,
			bannerHeight
		]);
		const renderedCoverHeight = (0, react_1.useMemo)(() => {
			var _a$1, _b$1, _c$1;
			return isAdaptY && ((_a$1 = coverInfo.image) === null || _a$1 === void 0 ? void 0 : _a$1.height) ? Math.floor(((_b$1 = coverInfo.image) === null || _b$1 === void 0 ? void 0 : _b$1.height) * bannerWidth / ((_c$1 = coverInfo.image) === null || _c$1 === void 0 ? void 0 : _c$1.width)) : bannerHeight;
		}, [
			isAdaptY,
			(_e = coverInfo.image) === null || _e === void 0 ? void 0 : _e.width,
			(_f = coverInfo.image) === null || _f === void 0 ? void 0 : _f.height,
			bannerWidth,
			bannerHeight
		]);
		const gapLength = (0, react_1.useMemo)(() => backgroundPosition === "center" || ["top", "bottom"].includes(backgroundPosition) && !isAdaptY || ["left", "right"].includes(backgroundPosition) && isAdaptY ? 2 : 1, [backgroundPosition, isAdaptY]);
		const gapWidth = (0, react_1.useMemo)(() => Math.ceil(renderedCoverWidth && (bannerWidth - renderedCoverWidth) / gapLength), [
			renderedCoverWidth,
			bannerWidth,
			gapLength
		]);
		const gapHeight = (0, react_1.useMemo)(() => Math.ceil(renderedCoverHeight && (bannerHeight - renderedCoverHeight) / gapLength), [
			renderedCoverHeight,
			bannerHeight,
			gapLength
		]);
		const applyDynamicBg = (0, react_1.useMemo)(() => isAdaptY && gapHeight > 0 || !isAdaptY && gapWidth > 0, [
			isAdaptY,
			gapHeight,
			gapWidth
		]);
		const getLeftGradientValues = (0, react_1.useCallback)(() => {
			switch (backgroundPosition) {
				case "right": return [
					bannerWidth - renderedCoverWidth + offsetValues[0],
					bannerWidth - renderedCoverWidth + offsetValues[1],
					bannerWidth - renderedCoverWidth + offsetValues[2]
				];
				default: return [
					gapWidth + offsetValues[0],
					gapWidth + offsetValues[1],
					gapWidth + offsetValues[2]
				];
			}
		}, [
			backgroundPosition,
			bannerWidth,
			renderedCoverWidth,
			gapWidth
		]);
		const getRightGradientValues = (0, react_1.useCallback)(() => {
			switch (backgroundPosition) {
				case "left": return [
					renderedCoverWidth - offsetValues[2],
					renderedCoverWidth - offsetValues[1],
					renderedCoverWidth - offsetValues[0]
				];
				default: return [
					bannerWidth - gapWidth - offsetValues[2],
					bannerWidth - gapWidth - offsetValues[1],
					bannerWidth - gapWidth - offsetValues[0]
				];
			}
		}, [
			backgroundPosition,
			bannerWidth,
			renderedCoverWidth,
			gapWidth
		]);
		const getTopGradientValues = (0, react_1.useCallback)(() => {
			switch (backgroundPosition) {
				case "bottom": return [
					bannerHeight - renderedCoverHeight + offsetValues[0],
					bannerHeight - renderedCoverHeight + offsetValues[1],
					bannerHeight - renderedCoverHeight + offsetValues[2]
				];
				default: return [
					gapHeight + offsetValues[0],
					gapHeight + offsetValues[1],
					gapHeight + offsetValues[2]
				];
			}
		}, [
			backgroundPosition,
			bannerHeight,
			renderedCoverHeight,
			gapHeight
		]);
		const getBottomGradientValues = (0, react_1.useCallback)(() => {
			switch (backgroundPosition) {
				case "top": return [
					renderedCoverHeight - offsetValues[2],
					renderedCoverHeight - offsetValues[1],
					renderedCoverHeight - offsetValues[0]
				];
				default: return [
					bannerHeight - gapHeight - offsetValues[2],
					bannerHeight - gapHeight - offsetValues[1],
					bannerHeight - gapHeight - offsetValues[0]
				];
			}
		}, [
			backgroundPosition,
			bannerHeight,
			renderedCoverHeight,
			gapHeight
		]);
		const backgroundImage = (0, react_1.useMemo)(() => {
			var _a$1, _b$1;
			if (!((_a$1 = coverInfo.image) === null || _a$1 === void 0 ? void 0 : _a$1.width) || !((_b$1 = coverInfo.image) === null || _b$1 === void 0 ? void 0 : _b$1.height)) return "";
			const leftGradientValues = getLeftGradientValues();
			const rightGradientValues = getRightGradientValues();
			const topGradientValues = getTopGradientValues();
			const bottomGradientValues = getBottomGradientValues();
			const generateLinearGradient = ({ isVertical, startGradientValues, endGradientValues, startRGB, endRGB }) => {
				let startColor, endColor;
				if (startGradientValues && endGradientValues && startRGB && endRGB) {
					startColor = `${getFinalColor(startRGB)} -100px, rgb(${startRGB}) ${startGradientValues[0]}px, rgba(${startRGB}, 0.45) ${startGradientValues[1]}px, transparent ${startGradientValues[2]}px`;
					endColor = `transparent ${endGradientValues[0]}px, rgba(${endRGB}, 0.45) ${endGradientValues[1]}px, rgb(${endRGB}) ${endGradientValues[2]}px, ${getFinalColor(endRGB)} ${bannerWidth + 100}px`;
				} else if (startGradientValues && startRGB) startColor = `${getFinalColor(startRGB)} -100px, rgb(${startRGB}) ${startGradientValues[0]}px, rgba(${startRGB}, 0.45) ${startGradientValues[1]}px, transparent ${startGradientValues[2]}px`;
else if (endGradientValues && endRGB) startColor = `transparent ${endGradientValues[0]}px, rgba(${endRGB}, 0.45) ${endGradientValues[1]}px,rgba(${endRGB},1) ${endGradientValues[2]}px, ${getFinalColor(endRGB)} ${bannerWidth + 100}px`;
				return `linear-gradient(${isVertical ? "180deg" : "90deg"} ${startColor ? `,${startColor}` : ""} ${endColor ? `,${endColor}` : ""}), url(${img})`;
			};
			return generateLinearGradient(Object.assign(Object.assign({ isVertical: isAdaptY }, ([
				"center",
				"right",
				"bottom"
			].includes(backgroundPosition) || ["left"].includes(backgroundPosition) && isAdaptY || ["top"].includes(backgroundPosition) && !isAdaptY) && {
				startGradientValues: isAdaptY ? topGradientValues : leftGradientValues,
				startRGB: isAdaptY ? coverInfo.top : coverInfo.left
			}), ([
				"left",
				"center",
				"top"
			].includes(backgroundPosition) || ["right"].includes(backgroundPosition) && isAdaptY || ["bottom"].includes(backgroundPosition) && !isAdaptY) && {
				endGradientValues: isAdaptY ? bottomGradientValues : rightGradientValues,
				endRGB: isAdaptY ? coverInfo.bottom : coverInfo.right
			}));
		}, [
			coverInfo,
			bannerWidth,
			bannerHeight,
			img,
			backgroundPosition,
			isAdaptY,
			getLeftGradientValues,
			getRightGradientValues,
			getTopGradientValues,
			getBottomGradientValues
		]);
		const containerStyle = Object.assign({
			width,
			height,
			backgroundImage: applyDynamicBg ? backgroundImage : `url(${img})`,
			position: "relative",
			backgroundSize: "contain",
			backgroundPosition,
			overflow: "hidden",
			backgroundRepeat: "no-repeat"
		}, style);
		const initCover = (0, react_1.useCallback)(() => {
			(0, sdk_1.getMainColor)(img, [1, 40]).then((res) => {
				setCoverInfo((origin) => Object.assign(Object.assign({}, origin), {
					left: res.color,
					image: res.image
				}));
			});
			(0, sdk_1.getMainColor)(img, [-40, -1]).then((res) => {
				setCoverInfo((origin) => Object.assign(Object.assign({}, origin), {
					right: res.color,
					image: res.image
				}));
			});
			(0, sdk_1.getMainColor)(img, [-40, -1], "y").then((res) => {
				setCoverInfo((origin) => Object.assign(Object.assign({}, origin), {
					bottom: res.color,
					image: res.image
				}));
			});
			(0, sdk_1.getMainColor)(img, [1, 40], "y").then((res) => {
				setCoverInfo((origin) => Object.assign(Object.assign({}, origin), {
					top: res.color,
					image: res.image
				}));
			});
		}, [img]);
		(0, react_1.useEffect)(() => {
			initCover();
			const fn = debounce(() => {
				setMounted((origin) => origin + 1);
				initCover();
			}, 30);
			window.addEventListener("resize", fn);
			return () => {
				window.removeEventListener("resize", fn);
			};
		}, [initCover]);
		const getTop = (position) => {
			if (position === "top") return isAdaptY ? gapHeight - filterOffset : 0;
else if (position === "bottom") return isAdaptY ? gapLength > 1 ? bannerHeight - gapHeight - filterOffset : renderedCoverHeight - filterOffset : 0;
			return 0;
		};
		const getLeft = (position) => {
			if (position === "left") return isAdaptY ? 0 : gapWidth - filterOffset;
else if (position === "right") return isAdaptY ? 0 : bannerWidth - gapWidth - filterOffset;
			return 0;
		};
		const getFilterStyle = (position) => {
			return {
				position: "absolute",
				top: getTop(position),
				left: getLeft(position),
				width: isAdaptY ? "100%" : filterWidth,
				height: isAdaptY ? filterWidth : "100%",
				zIndex: "inherit",
				filter: "blur(30px)",
				opacity: .7,
				backgroundColor: `rgb(${coverInfo[position || "left"]})`
			};
		};
		(0, react_1.useLayoutEffect)(() => {
			var _a$1;
			setMounted((origin) => origin + 1);
			const observer = new ResizeObserver(() => {
				setMounted((origin) => origin + 1);
			});
			((_a$1 = conRef.current) === null || _a$1 === void 0 ? void 0 : _a$1.parentElement) && observer.observe(conRef.current.parentElement);
			return () => {
				observer.disconnect();
			};
		}, []);
		return react_1.default.createElement("div", {
			ref: conRef,
			style: containerStyle,
			className
		}, applyDynamicBg && react_1.default.createElement(react_1.default.Fragment, null, [
			"right",
			"center",
			"top",
			"bottom"
		].includes(backgroundPosition) && !isAdaptY && react_1.default.createElement("span", { style: getFilterStyle("left") }), [
			"left",
			"center",
			"top",
			"bottom"
		].includes(backgroundPosition) && !isAdaptY && react_1.default.createElement("span", { style: getFilterStyle("right") }), [
			"bottom",
			"center",
			"left",
			"right"
		].includes(backgroundPosition) && isAdaptY && react_1.default.createElement("span", { style: getFilterStyle("top") }), [
			"top",
			"center",
			"left",
			"right"
		].includes(backgroundPosition) && isAdaptY && react_1.default.createElement("span", { style: getFilterStyle("bottom") })));
	}
} });

//#endregion
//#region src/index.ts
var import_banner = __toESM(require_banner());
var src_default = import_banner.default;

//#endregion
return src_default;
});