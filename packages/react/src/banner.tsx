import { getMainColor } from "@banner-responsive/sdk";
import React, { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { debounce, getCoverInfoCache, getFinalColor, ICoverInfo, setCoverInfoCache } from "./utils";

// 用于计算渐变的偏移量
const offsetValues = [2, 20, 120];

// 计算滤镜的宽度
const filterWidth = 50;

const filterOffset = filterWidth / 2;


export interface ResponsiveBannerProps {
  /**
   * Width of the banner
   */
  width?: number;

  /**
   * Height of the banner
   */
  height?: number;

  /**
   * Image url
   */
  img: string;

  /**
   * Background Image position
   */
  backgroundPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';

  /**
   * Custom style
   */
  style?: React.CSSProperties;

  /**
   * Custom class
   */
  className?: string;

  /**
   * Children
   */
  children?: React.ReactNode;

  // /**
  //  * Offset
  //  */
  // offset?: number;

  /**
   * Alt
   */
  alt?: string;

  /**
   * pick color range
   */
  range?: [number, number];

  /**
   * Cover info
   */
  presetCoverInfo?: Omit<ICoverInfo, 'width' | 'height'> & { image: HTMLImageElement };
}

const defaultProps = {
  width: '100%',
  height: '100%',
  backgroundPosition: 'center',
  range: [1, 20],
};

function ResponsiveBanner(props: ResponsiveBannerProps) {
  const {
    width = defaultProps.width,
    height = defaultProps.height,
    img,
    backgroundPosition = defaultProps.backgroundPosition,
    style,
    className,
    // offset = 0,
    alt,
    range = defaultProps.range,
    children,
    presetCoverInfo,
  } = props;

  const conRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(0);

  // 实际的banner宽高
  const bannerWidth = useMemo(
    () => (!mounted ? 0 : width === '100%' ? conRef.current?.parentElement?.offsetWidth || 0 : (width as number)),
    [width, mounted],
  );
  const bannerHeight = useMemo(
    () => (!mounted ? 0 : height === '100%' ? conRef.current?.parentElement?.offsetHeight || 0 : (height as number)),
    [height, mounted],
  );

  const [coverInfo, setCoverInfo] = useState<ICoverInfo>({
    left: '',
    right: '',
    bottom: '',
    top: '',
    imageWidth: 0,
    imageHeight: 0,
  });

  // 是否适应Y轴
  const isAdaptY = useMemo(
    () =>
      !!(
        coverInfo.imageWidth &&
        coverInfo.imageHeight &&
        coverInfo.imageWidth / bannerWidth > coverInfo.imageHeight / bannerHeight
      ),
    [coverInfo.imageWidth, coverInfo.imageHeight, bannerWidth, bannerHeight],
  );

  // 渲染的图片宽高
  const renderedCoverWidth = useMemo(
    () =>
      isAdaptY || !coverInfo.imageWidth
        ? bannerWidth
        : Math.floor((coverInfo.imageWidth * bannerHeight) / coverInfo.imageHeight),
    [isAdaptY, bannerWidth, bannerHeight, coverInfo.imageWidth, coverInfo.imageHeight],
  );

  const renderedCoverHeight = useMemo(
    () =>
      isAdaptY && coverInfo.imageHeight
        ? Math.floor((coverInfo.imageHeight * bannerWidth) / coverInfo.imageWidth)
        : bannerHeight,
    [isAdaptY, bannerWidth, bannerHeight, coverInfo.imageWidth, coverInfo.imageHeight],
  );

  // 为1时，表示只有一边有空白，为2时表示两边都有空白
  const gapLength = useMemo(
    () =>
      backgroundPosition === 'center' ||
      (['top', 'bottom'].includes(backgroundPosition) && !isAdaptY) ||
      (['left', 'right'].includes(backgroundPosition) && isAdaptY)
        ? 2
        : 1,
    [backgroundPosition, isAdaptY],
  );

  // 计算空白区域的宽度
  const gapWidth = useMemo(
    () => Math.ceil(renderedCoverWidth && (bannerWidth - renderedCoverWidth) / gapLength),
    [renderedCoverWidth, bannerWidth, gapLength],
  );

  // 计算空白区域的高度
  const gapHeight = useMemo(
    () => Math.ceil(renderedCoverHeight && (bannerHeight - renderedCoverHeight) / gapLength),
    [renderedCoverHeight, bannerHeight, gapLength],
  );

  // 是否需要应用动态背景
  const applyDynamicBg = useMemo(
    () => (isAdaptY && gapHeight > 0) || (!isAdaptY && gapWidth > 0),
    [isAdaptY, gapHeight, gapWidth],
  );

  const getLeftGradientValues = useCallback(() => {
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
  }, [backgroundPosition, bannerWidth, renderedCoverWidth, gapWidth]);

  const getRightGradientValues = useCallback(() => {
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
  }, [backgroundPosition, bannerWidth, renderedCoverWidth, gapWidth]);

  const getTopGradientValues = useCallback(() => {
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
  }, [backgroundPosition, bannerHeight, renderedCoverHeight, gapHeight]);

  const getBottomGradientValues = useCallback(() => {
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
  }, [backgroundPosition, bannerHeight, renderedCoverHeight, gapHeight]);

  const backgroundImage = useMemo(() => {
    if (!coverInfo.imageWidth || !coverInfo.imageHeight) return '';

    const leftGradientValues = getLeftGradientValues();
    const rightGradientValues = getRightGradientValues();

    const topGradientValues = getTopGradientValues();
    const bottomGradientValues = getBottomGradientValues();

    const generateLinearGradient = ({
      isVertical,
      startGradientValues,
      endGradientValues,
      startRGB,
      endRGB,
    }: {
      isVertical?: boolean;
      startGradientValues?: number[];
      endGradientValues?: number[];
      startRGB?: string;
      endRGB?: string;
    }) => {
      let startColor = '';
      let endColor = '';

      const basic = isVertical ? bannerHeight : bannerWidth;

      if (startGradientValues && endGradientValues && startRGB && endRGB) {
        startColor = `${getFinalColor(startRGB)} -100px, rgb(${startRGB}) ${
          startGradientValues[0]
        }px, rgba(${startRGB}, 0.1) ${startGradientValues[1]}px, transparent ${startGradientValues[2] < endGradientValues[2] ? startGradientValues[2] : endGradientValues[2]}px`;

        endColor = `transparent ${endGradientValues[0]}px, rgba(${endRGB}, 0.1) ${
          endGradientValues[1]
        }px, rgb(${endRGB}) ${endGradientValues[2]}px, ${getFinalColor(endRGB)} ${basic + 100}px`;
      } else if (startGradientValues && startRGB) {
        startColor = `${getFinalColor(startRGB)} -100px, rgb(${startRGB}) ${
          startGradientValues[0]
        }px, rgba(${startRGB}, 0.1) ${startGradientValues[1]}px, transparent ${startGradientValues[2]}px`;
      } else if (endGradientValues && endRGB) {
        startColor = `transparent ${endGradientValues[0]}px, rgba(${
          endRGB
        }, 0.1) ${endGradientValues[1]}px,rgba(${endRGB},1) ${endGradientValues[2]}px, ${getFinalColor(
          endRGB,
        )} ${basic + 100}px`;
      }

      return `linear-gradient(${isVertical ? '180deg' : '90deg'} ${startColor ? `,${startColor}` : ''} ${endColor ? `,${endColor}` : ''}), url(${img})`;
      // return `linear-gradient(${isVertical ? '180deg' : '90deg'} ${startColor ? `,${startColor}`:''} ${endColor ? `,${endColor}`:''})`;
    };

    return generateLinearGradient({
      isVertical: isAdaptY,
      ...((['center', 'right', 'bottom'].includes(backgroundPosition) ||
        (['left'].includes(backgroundPosition) && isAdaptY) ||
        (['top'].includes(backgroundPosition) && !isAdaptY)) && {
        startGradientValues: isAdaptY ? topGradientValues : leftGradientValues,
        startRGB: isAdaptY ? coverInfo.top : coverInfo.left,
      }),
      ...((['left', 'center', 'top'].includes(backgroundPosition) ||
        (['right'].includes(backgroundPosition) && isAdaptY) ||
        (['bottom'].includes(backgroundPosition) && !isAdaptY)) && {
        endGradientValues: isAdaptY ? bottomGradientValues : rightGradientValues,
        endRGB: isAdaptY ? coverInfo.bottom : coverInfo.right,
      }),
    });
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

  const containerStyle = {
    width,
    height,
    backgroundImage: applyDynamicBg ? backgroundImage : `url(${img})`,
    position: 'relative' as const,
    backgroundSize: 'contain',
    backgroundPosition,
    overflow: 'hidden',
    backgroundRepeat: 'no-repeat',

    ...style,
  };

  const initCover = useCallback(() => {
    getMainColor(img, range).then((res) => {
      setCoverInfo((origin) => ({
        ...origin,
        left: res.color,
        imageHeight: res.image.height,
        imageWidth: res.image.width,
      }));
    });

    getMainColor(img, [-range[1], -range[0]]).then((res) => {
      setCoverInfo((origin) => ({
        ...origin,
        right: res.color,
        imageHeight: res.image.height,
        imageWidth: res.image.width,
      }));
    });

    getMainColor(img, [-range[1], -range[0]], 'y').then((res) => {
      setCoverInfo((origin) => ({
        ...origin,
        bottom: res.color,
        imageHeight: res.image.height,
        imageWidth: res.image.width,
      }));
    });

    getMainColor(img, range, 'y').then((res) => {
      setCoverInfo((origin) => ({
        ...origin,
        top: res.color,
        imageHeight: res.image.height,
        imageWidth: res.image.width,
      }));
    });
  }, [img, range]);

  useEffect(() => {
    const run = () => {
      !presetCoverInfo && initCover();
    };
    run();

    const fn = debounce(() => {
      setMounted((origin) => origin + 1);
      run();
    }, 50);
    window.addEventListener('resize', fn);
    return () => {
      window.removeEventListener('resize', fn);
    };
  }, [initCover, presetCoverInfo]);

  const getTop = (position?: 'left' | 'right' | 'top' | 'bottom') => {
    if (position === 'top') {
      return isAdaptY ? gapHeight - filterOffset : 0;
    }
    if (position === 'bottom') {
      return isAdaptY
        ? gapLength > 1
          ? bannerHeight - gapHeight - filterOffset
          : renderedCoverHeight - filterOffset
        : 0;
    }
    return 0;
  };

  const getLeft = (position?: 'left' | 'right' | 'top' | 'bottom') => {
    if (position === 'left') {
      return isAdaptY ? 0 : gapWidth - filterOffset;
    }
    if (position === 'right') {
      return isAdaptY ? 0 : bannerWidth - gapWidth - filterOffset;
    }
    return 0;
  };

  const getFilterStyle = (position?: 'left' | 'right' | 'top' | 'bottom') => {
    return {
      position: 'absolute' as const,
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

  useLayoutEffect(() => {
    setMounted((origin) => origin + 1);
    const observer = new ResizeObserver(() => {
      setMounted((origin) => origin + 1);
    });
    conRef.current?.parentElement && observer.observe(conRef.current.parentElement);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const cache = getCoverInfoCache(img);
    if (presetCoverInfo) {
      setCoverInfo({
        ...presetCoverInfo,
        imageHeight: presetCoverInfo.image?.height,
        imageWidth: presetCoverInfo.image?.width,
      });
    } else if (cache) {
      setCoverInfo(cache);
    }
  }, [presetCoverInfo, img]);

  const imgStyle = {
    width: renderedCoverWidth,
    height: renderedCoverHeight,
    position: 'absolute' as const,
    zIndex: -1,
    left: -document.documentElement.clientWidth,
    top: -document.documentElement.clientHeight,
    // ...backgroundPosition === 'center' && {
    //   left: gapWidth,
    //   top: gapHeight,
    // },
    // ...backgroundPosition === 'top' && {
    //   left: gapHeight,
    //   top: 0,
    // },
    // ...backgroundPosition === 'bottom' && {
    //   left: gapHeight,
    //   bottom: 0,
    // },
    // ...backgroundPosition === 'left' && {
    //   left: 0,
    //   top: gapHeight,
    // },
    // ...backgroundPosition === 'right' && {
    //   right: 0,
    //   top: gapHeight,
    // },
  };

  useEffect(() => {
    coverInfo && setCoverInfoCache(img, coverInfo);
  }, [coverInfo, img]);

  return (
    <div ref={conRef} style={containerStyle} className={className}>
      {img && <img src={img} alt={alt || 'Banner'} style={imgStyle} />}
      {applyDynamicBg && (
        <>
          {['right', 'center', 'top', 'bottom'].includes(backgroundPosition) && !isAdaptY && (
            <span style={getFilterStyle('left')} />
          )}
          {['left', 'center', 'top', 'bottom'].includes(backgroundPosition) && !isAdaptY && (
            <span style={getFilterStyle('right')} />
          )}

          {['bottom', 'center', 'left', 'right'].includes(backgroundPosition) && isAdaptY && (
            <span style={getFilterStyle('top')} />
          )}
          {['top', 'center', 'left', 'right'].includes(backgroundPosition) && isAdaptY && (
            <span style={getFilterStyle('bottom')} />
          )}
        </>
      )}
      {children}
    </div>
  );
}

export default memo(ResponsiveBanner);
