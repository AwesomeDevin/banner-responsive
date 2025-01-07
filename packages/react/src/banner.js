"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResponsiveBanner;
const sdk_1 = require("@banner-responsive/sdk");
const image_color_utils_1 = require("image-color-utils");
const react_1 = __importStar(require("react"));
const offsetValues = [2, 20, 120];
const filterWidth = 50;
const filterOffset = filterWidth / 2;
const getFinalColor = (rgb) => {
    if (!rgb)
        return '#fff';
    const rgbArr = rgb.split(',');
    const hsl = (0, image_color_utils_1.rgb2hsv)([parseInt(rgbArr[0]), parseInt(rgbArr[1]), parseInt(rgbArr[2])]);
    return (0, image_color_utils_1.isDeepColorByHsv)(hsl) ? '#000' : '#fff';
};
const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};
function ResponsiveBanner(props) {
    var _a, _b, _c, _d, _e, _f;
    const { width = '100%', height = '100%', img, backgroundPosition = 'center', style, className } = props;
    const conRef = (0, react_1.useRef)(null);
    const [mounted, setMounted] = (0, react_1.useState)(0);
    const bannerWidth = (0, react_1.useMemo)(() => { var _a, _b; return !mounted ? 0 : width === '100%' ? ((_b = (_a = conRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.offsetWidth) || 0 : width; }, [
        width,
        conRef,
        mounted
    ]);
    const bannerHeight = (0, react_1.useMemo)(() => { var _a, _b; return !mounted ? 0 : height === '100%' ? ((_b = (_a = conRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0 : height; }, [
        height,
        conRef,
        mounted
    ]);
    const [coverInfo, setCoverInfo] = (0, react_1.useState)({
        left: '',
        right: '',
        bottom: '',
        top: '',
    });
    const isAdaptY = (0, react_1.useMemo)(() => { var _a, _b, _c, _d; return !!(((_a = coverInfo.image) === null || _a === void 0 ? void 0 : _a.width) && ((_b = coverInfo.image) === null || _b === void 0 ? void 0 : _b.height) && ((_c = coverInfo.image) === null || _c === void 0 ? void 0 : _c.width) / bannerWidth > ((_d = coverInfo.image) === null || _d === void 0 ? void 0 : _d.height) / bannerHeight); }, [
        (_a = coverInfo.image) === null || _a === void 0 ? void 0 : _a.width,
        (_b = coverInfo.image) === null || _b === void 0 ? void 0 : _b.height,
        bannerWidth,
        bannerHeight,
    ]);
    const renderedCoverWidth = (0, react_1.useMemo)(() => {
        var _a, _b, _c;
        return isAdaptY || !((_a = coverInfo.image) === null || _a === void 0 ? void 0 : _a.width)
            ? bannerWidth
            : Math.floor((((_b = coverInfo.image) === null || _b === void 0 ? void 0 : _b.width) * bannerHeight) / ((_c = coverInfo.image) === null || _c === void 0 ? void 0 : _c.height));
    }, [
        isAdaptY,
        (_c = coverInfo.image) === null || _c === void 0 ? void 0 : _c.width,
        (_d = coverInfo.image) === null || _d === void 0 ? void 0 : _d.height,
        bannerWidth,
        bannerHeight,
    ]);
    const renderedCoverHeight = (0, react_1.useMemo)(() => {
        var _a, _b, _c;
        return isAdaptY && ((_a = coverInfo.image) === null || _a === void 0 ? void 0 : _a.height)
            ? Math.floor((((_b = coverInfo.image) === null || _b === void 0 ? void 0 : _b.height) * bannerWidth) / ((_c = coverInfo.image) === null || _c === void 0 ? void 0 : _c.width))
            : bannerHeight;
    }, [
        isAdaptY,
        (_e = coverInfo.image) === null || _e === void 0 ? void 0 : _e.width,
        (_f = coverInfo.image) === null || _f === void 0 ? void 0 : _f.height,
        bannerWidth,
        bannerHeight
    ]);
    const gapLength = (0, react_1.useMemo)(() => (backgroundPosition === 'center'
        || ['top', 'bottom'].includes(backgroundPosition) && !isAdaptY
        || ['left', 'right'].includes(backgroundPosition) && isAdaptY) ? 2 : 1, [backgroundPosition, isAdaptY]);
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
            case 'right':
                return [
                    bannerWidth - renderedCoverWidth + offsetValues[0],
                    bannerWidth - renderedCoverWidth + offsetValues[1],
                    bannerWidth - renderedCoverWidth + offsetValues[2],
                ];
            default:
                return [gapWidth + offsetValues[0], gapWidth + offsetValues[1], gapWidth + offsetValues[2]];
        }
    }, [
        backgroundPosition,
        bannerWidth,
        renderedCoverWidth,
        gapWidth,
    ]);
    const getRightGradientValues = (0, react_1.useCallback)(() => {
        switch (backgroundPosition) {
            case 'left':
                return [
                    renderedCoverWidth - offsetValues[2],
                    renderedCoverWidth - offsetValues[1],
                    renderedCoverWidth - offsetValues[0],
                ];
            default:
                return [
                    bannerWidth - gapWidth - offsetValues[2],
                    bannerWidth - gapWidth - offsetValues[1],
                    bannerWidth - gapWidth - offsetValues[0],
                ];
        }
    }, [
        backgroundPosition,
        bannerWidth,
        renderedCoverWidth,
        gapWidth,
    ]);
    const getTopGradientValues = (0, react_1.useCallback)(() => {
        switch (backgroundPosition) {
            case 'bottom':
                return [
                    bannerHeight - renderedCoverHeight + offsetValues[0],
                    bannerHeight - renderedCoverHeight + offsetValues[1],
                    bannerHeight - renderedCoverHeight + offsetValues[2],
                ];
            default:
                return [gapHeight + offsetValues[0], gapHeight + offsetValues[1], gapHeight + offsetValues[2]];
        }
    }, [
        backgroundPosition,
        bannerHeight,
        renderedCoverHeight,
        gapHeight,
    ]);
    const getBottomGradientValues = (0, react_1.useCallback)(() => {
        switch (backgroundPosition) {
            case 'top':
                return [
                    renderedCoverHeight - offsetValues[2],
                    renderedCoverHeight - offsetValues[1],
                    renderedCoverHeight - offsetValues[0],
                ];
            default:
                return [
                    bannerHeight - gapHeight - offsetValues[2],
                    bannerHeight - gapHeight - offsetValues[1],
                    bannerHeight - gapHeight - offsetValues[0],
                ];
        }
    }, [
        backgroundPosition,
        bannerHeight,
        renderedCoverHeight,
        gapHeight,
    ]);
    const backgroundImage = (0, react_1.useMemo)(() => {
        var _a, _b;
        if (!((_a = coverInfo.image) === null || _a === void 0 ? void 0 : _a.width) || !((_b = coverInfo.image) === null || _b === void 0 ? void 0 : _b.height))
            return '';
        const leftGradientValues = getLeftGradientValues();
        const rightGradientValues = getRightGradientValues();
        const topGradientValues = getTopGradientValues();
        const bottomGradientValues = getBottomGradientValues();
        const generateLinearGradient = ({ isVertical, startGradientValues, endGradientValues, startRGB, endRGB, }) => {
            let startColor, endColor;
            if (startGradientValues && endGradientValues && startRGB && endRGB) {
                startColor = `${getFinalColor(startRGB)} -100px, rgb(${startRGB}) ${startGradientValues[0]}px, rgba(${startRGB}, 0.45) ${startGradientValues[1]}px, transparent ${startGradientValues[2]}px`;
                endColor = `transparent ${endGradientValues[0]}px, rgba(${endRGB}, 0.45) ${endGradientValues[1]}px, rgb(${endRGB}) ${endGradientValues[2]}px, ${getFinalColor(endRGB)} ${bannerWidth +
                    100}px`;
            }
            else if (startGradientValues && startRGB) {
                startColor = `${getFinalColor(startRGB)} -100px, rgb(${startRGB}) ${startGradientValues[0]}px, rgba(${startRGB}, 0.45) ${startGradientValues[1]}px, transparent ${startGradientValues[2]}px`;
            }
            else if (endGradientValues && endRGB) {
                startColor = `transparent ${endGradientValues[0]}px, rgba(${endRGB}, 0.45) ${endGradientValues[1]}px,rgba(${endRGB},1) ${endGradientValues[2]}px, ${getFinalColor(endRGB)} ${bannerWidth + 100}px`;
            }
            return `linear-gradient(${isVertical ? '180deg' : '90deg'} ${startColor ? `,${startColor}` : ''} ${endColor ? `,${endColor}` : ''}), url(${img})`;
        };
        return generateLinearGradient(Object.assign(Object.assign({ isVertical: isAdaptY }, (['center', 'right', 'bottom'].includes(backgroundPosition) || ['left'].includes(backgroundPosition) && isAdaptY || ['top'].includes(backgroundPosition) && !isAdaptY) && {
            startGradientValues: isAdaptY ? topGradientValues : leftGradientValues,
            startRGB: isAdaptY ? coverInfo.top : coverInfo.left,
        }), (['left', 'center', 'top'].includes(backgroundPosition) || ['right'].includes(backgroundPosition) && isAdaptY || ['bottom'].includes(backgroundPosition) && !isAdaptY) && {
            endGradientValues: isAdaptY ? bottomGradientValues : rightGradientValues,
            endRGB: isAdaptY ? coverInfo.bottom : coverInfo.right,
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
        getBottomGradientValues,
    ]);
    const containerStyle = Object.assign({ width,
        height, backgroundImage: applyDynamicBg ? backgroundImage : `url(${img})`, position: 'relative', backgroundSize: 'contain', backgroundPosition, overflow: 'hidden', backgroundRepeat: 'no-repeat' }, style);
    const initCover = (0, react_1.useCallback)(() => {
        (0, sdk_1.getMainColor)(img, [1, 40])
            .then(res => {
            setCoverInfo(origin => (Object.assign(Object.assign({}, origin), { left: res.color, image: res.image })));
        });
        (0, sdk_1.getMainColor)(img, [-40, -1]).then(res => {
            setCoverInfo(origin => (Object.assign(Object.assign({}, origin), { right: res.color, image: res.image })));
        });
        (0, sdk_1.getMainColor)(img, [-40, -1], 'y').then(res => {
            setCoverInfo(origin => (Object.assign(Object.assign({}, origin), { bottom: res.color, image: res.image })));
        });
        (0, sdk_1.getMainColor)(img, [1, 40], 'y').then(res => {
            setCoverInfo(origin => (Object.assign(Object.assign({}, origin), { top: res.color, image: res.image })));
        });
    }, [img]);
    (0, react_1.useEffect)(() => {
        initCover();
        const fn = debounce(() => {
            setMounted(origin => origin + 1);
            initCover();
        }, 30);
        window.addEventListener('resize', fn);
        return () => {
            window.removeEventListener('resize', fn);
        };
    }, [initCover]);
    const getTop = (position) => {
        if (position === 'top') {
            return isAdaptY ? gapHeight - filterOffset : 0;
        }
        else if (position === 'bottom') {
            return isAdaptY ? gapLength > 1 ? bannerHeight - gapHeight - filterOffset : (renderedCoverHeight - filterOffset) : 0;
        }
        return 0;
    };
    const getLeft = (position) => {
        if (position === 'left') {
            return isAdaptY ? 0 : gapWidth - filterOffset;
        }
        else if (position === 'right') {
            return isAdaptY ? 0 : bannerWidth - gapWidth - filterOffset;
        }
        return 0;
    };
    const getFilterStyle = (position) => {
        return {
            position: 'absolute',
            top: getTop(position),
            left: getLeft(position),
            width: isAdaptY ? '100%' : filterWidth,
            height: isAdaptY ? filterWidth : '100%',
            zIndex: 'inherit',
            filter: 'blur(30px)',
            opacity: 0.7,
            backgroundColor: `rgb(${coverInfo[position || 'left']})`,
        };
    };
    (0, react_1.useLayoutEffect)(() => {
        var _a;
        setMounted(origin => origin + 1);
        const observer = new ResizeObserver(() => {
            setMounted(origin => origin + 1);
        });
        ((_a = conRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) && observer.observe(conRef.current.parentElement);
        return () => {
            observer.disconnect();
        };
    }, []);
    return react_1.default.createElement("div", { ref: conRef, style: containerStyle, className: className }, applyDynamicBg && (react_1.default.createElement(react_1.default.Fragment, null,
        (['right', 'center', 'top', 'bottom'].includes(backgroundPosition)) && !isAdaptY && react_1.default.createElement("span", { style: getFilterStyle('left') }),
        (['left', 'center', 'top', 'bottom'].includes(backgroundPosition)) && !isAdaptY && react_1.default.createElement("span", { style: getFilterStyle('right') }),
        ['bottom', 'center', 'left', 'right'].includes(backgroundPosition) && isAdaptY && react_1.default.createElement("span", { style: getFilterStyle('top') }),
        ['top', 'center', 'left', 'right'].includes(backgroundPosition) && isAdaptY && react_1.default.createElement("span", { style: getFilterStyle('bottom') }))));
}
//# sourceMappingURL=banner.js.map