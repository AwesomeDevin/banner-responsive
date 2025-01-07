
//#region ../../node_modules/.pnpm/image-color-utils@1.3.2/node_modules/image-color-utils/build/index.es.js
(function(l, r) {
	if (!l || l.getElementById("livereloadscript")) return;
	r = l.createElement("script");
	r.async = 1;
	r.src = "//" + (self.location.host || "localhost").split(":")[0] + ":35729/livereload.js?snipver=1";
	r.id = "livereloadscript";
	l.getElementsByTagName("head")[0].appendChild(r);
})(self.document);
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
var ImageColorUtils = class ImageColorUtils {
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

//#endregion
//#region src/index.ts
const getMainColor = (img, range = [0, 100], axis = "x") => {
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
				const colorUtils = new ImageColorUtils({
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

//#endregion
export { getMainColor };