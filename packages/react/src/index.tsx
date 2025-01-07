import { getMainColor } from "@banner-responsive/sdk";
import { isDeepColorByHsv, rgb2hsv } from "image-color-utils";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

  // 用于计算渐变的偏移量
const offsetValues = [2, 20, 120];

// 计算滤镜的宽度
const filterWidth = 50

const filterOffset = filterWidth / 2;

const getFinalColor = (rgb: string) => {
  if (!rgb) return '#fff';
  const rgbArr = rgb.split(',');
  const hsl = rgb2hsv([parseInt(rgbArr[0]), parseInt(rgbArr[1]), parseInt(rgbArr[2])]);
  return isDeepColorByHsv(hsl) ? '#000' : '#fff';
};

const debounce = (fn: Function, delay: number) => {
  let timer: any
  return function (this: any, ...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export interface ResponsiveBannerProps {
  width?: number;
  height?: number;
  img: string;
  backgroundPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export default function ResponsiveBanner(props: ResponsiveBannerProps) {

  const { width = '100%' , height = '100%', img, backgroundPosition = 'center', style, className, children } = props;

  const conRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(0);

  // 实际的banner宽高
  const bannerWidth = useMemo(()=>!mounted ? 0 : width === '100%' ? conRef.current?.parentElement?.offsetWidth || 0 : width,[
    width,
    conRef,
    mounted
  ])
  const bannerHeight = useMemo(()=>!mounted ? 0 : height === '100%'  ? conRef.current?.parentElement?.offsetHeight || 0 : height,[
    height,
    conRef,
    mounted
  ])
  


  const [coverInfo, setCoverInfo] = useState<{
    left: string;
    right: string;
    bottom: string;
    top: string
    image?: HTMLImageElement;
  }>({
    left: '',
    right: '',
    bottom: '',
    top: '',
  });



  // 是否适应Y轴
  const isAdaptY =  useMemo(()=>!!(coverInfo.image?.width && coverInfo.image?.height && coverInfo.image?.width / bannerWidth > coverInfo.image?.height / bannerHeight),[
    coverInfo.image?.width,
    coverInfo.image?.height,
    bannerWidth,
    bannerHeight,
  ])
  
  // 渲染的图片宽高
  const renderedCoverWidth = useMemo(()=>isAdaptY || !coverInfo.image?.width
  ? bannerWidth
  : Math.floor((coverInfo.image?.width * bannerHeight) / coverInfo.image?.height),[
    isAdaptY,
    coverInfo.image?.width,
    coverInfo.image?.height,
    bannerWidth,
    bannerHeight,
  ])
  const renderedCoverHeight = useMemo(()=> isAdaptY && coverInfo.image?.height
  ? Math.floor((coverInfo.image?.height * bannerWidth) / coverInfo.image?.width)
  : bannerHeight,[
    isAdaptY,
    coverInfo.image?.width,
    coverInfo.image?.height,
    bannerWidth,
    bannerHeight
  ])

  // 为1时，表示只有一边有空白，为2时表示两边都有空白
  const gapLength = useMemo(()=>(
    backgroundPosition === 'center' 
    || ['top','bottom'].includes(backgroundPosition) && !isAdaptY 
    || ['left','right'].includes(backgroundPosition) && isAdaptY) ? 2 : 1
  ,[backgroundPosition,isAdaptY])
  
  // 计算空白区域的宽度
  const gapWidth = useMemo(()=>Math.ceil(renderedCoverWidth && (bannerWidth - renderedCoverWidth) / gapLength),[
    renderedCoverWidth,
    bannerWidth,
    gapLength
  ])
  
  // 计算空白区域的高度
  const gapHeight = useMemo(()=>Math.ceil(renderedCoverHeight && (bannerHeight - renderedCoverHeight) / gapLength),[
    renderedCoverHeight,
    bannerHeight,
    gapLength
  ])


  // 是否需要应用动态背景
  const applyDynamicBg = useMemo(()=>isAdaptY && gapHeight > 0 || !isAdaptY && gapWidth > 0,[
    isAdaptY,
    gapHeight,
    gapWidth
  ])



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
    },[
      backgroundPosition,
      bannerWidth,
      renderedCoverWidth,
      gapWidth,
    ])

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
    },[
      backgroundPosition,
      bannerWidth,
      renderedCoverWidth,
      gapWidth,
    ])

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
    },[
      backgroundPosition,
      bannerHeight,
      renderedCoverHeight,
      gapHeight,
    ])

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
        ]
      }
    },[
      backgroundPosition,
      bannerHeight,
      renderedCoverHeight,
      gapHeight,
    ])

  const backgroundImage = useMemo(()=>{
    if(!coverInfo.image?.width || !coverInfo.image?.height) return ''


    const leftGradientValues = getLeftGradientValues();
    const rightGradientValues = getRightGradientValues()

    const topGradientValues = getTopGradientValues()
    const bottomGradientValues = getBottomGradientValues()

    const generateLinearGradient = ({
      isVertical,
      startGradientValues,
      endGradientValues,
      startRGB,
      endRGB,
    }: {
      isVertical?: boolean
      startGradientValues?: number[]
      endGradientValues?: number[]
      startRGB?: string
      endRGB?: string
    }) => {

      let startColor, endColor

      if(startGradientValues && endGradientValues && startRGB && endRGB){
        startColor = `${getFinalColor(startRGB)} -100px, rgb(${startRGB}) ${
          startGradientValues[0]
        }px, rgba(${startRGB}, 0.1) ${startGradientValues[1]}px, transparent ${
          startGradientValues[2]
        }px`

        endColor = `transparent ${endGradientValues[0]}px, rgba(${endRGB}, 0.1) ${
          endGradientValues[1]
        }px, rgb(${endRGB}) ${endGradientValues[2]}px, ${getFinalColor(endRGB)} ${bannerWidth +
          100}px`
      } else if(startGradientValues && startRGB){
        startColor =  `${getFinalColor(startRGB)} -100px, rgb(${startRGB}) ${
          startGradientValues[0]
        }px, rgba(${startRGB}, 0.1) ${startGradientValues[1]}px, transparent ${
          startGradientValues[2]
        }px`
      }else if(endGradientValues && endRGB){
        startColor = `transparent ${endGradientValues[0]}px, rgba(${
          endRGB
        }, 0.1) ${endGradientValues[1]}px,rgba(${endRGB},1) ${endGradientValues[2]}px, ${getFinalColor(
          endRGB,
        )} ${bannerWidth + 100}px`
      }

      return `linear-gradient(${isVertical ? '180deg' : '90deg'} ${startColor ? `,${startColor}`:''} ${endColor ? `,${endColor}`:''}), url(${img})`;
    }



    return generateLinearGradient({
      isVertical: isAdaptY,
      ...(['center','right', 'bottom'].includes(backgroundPosition) || ['left'].includes(backgroundPosition) && isAdaptY || ['top'].includes(backgroundPosition) && !isAdaptY) && {
        startGradientValues: isAdaptY ? topGradientValues : leftGradientValues,
        startRGB: isAdaptY ? coverInfo.top : coverInfo.left,
      },
      ...(['left','center', 'top'].includes(backgroundPosition) || ['right'].includes(backgroundPosition) && isAdaptY || ['bottom'].includes(backgroundPosition) && !isAdaptY) && {
        endGradientValues: isAdaptY ? bottomGradientValues : rightGradientValues,
        endRGB: isAdaptY ? coverInfo.bottom : coverInfo.right,
      },
    })

  },[
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
  ])

  

  const containerStyle = {
    width,
    height,
    backgroundImage: applyDynamicBg ? backgroundImage : `url(${img})`,
    position: 'relative' as 'relative',
    backgroundSize: 'contain',
    backgroundPosition,
    overflow: 'hidden',
    backgroundRepeat: 'no-repeat',

    ...style,
  }

  const initCover = useCallback(() => {

    getMainColor(img, [1, 40])
      .then(res => {
        setCoverInfo(origin => ({
          ...origin,
          left: res.color,
          image: res.image,
        }));
      })
     


    getMainColor(img, [-40, -1]).then(res => {
      setCoverInfo(origin => ({
        ...origin,
        right: res.color,
        image: res.image,
      }));
    });

    getMainColor(img, [-40, -1], 'y').then(res => {
      setCoverInfo(origin => ({
        ...origin,
        bottom: res.color,
        image: res.image,
      }));
    });

    getMainColor(img, [1, 40], 'y').then(res => {
      setCoverInfo(origin => ({
        ...origin,
        top: res.color,
        image: res.image,
      }));
    });
  },[img])


  useEffect(()=>{
    initCover();


    const fn = debounce(() => {
      setMounted(origin=>origin+1)
      initCover();
    }, 30);
    window.addEventListener('resize', fn);
    return () => {
      window.removeEventListener('resize', fn);
    };

  },[initCover])

  const getTop = (position?: 'left' | 'right' | 'top' | 'bottom') => {

    if(position === 'top') {
      return isAdaptY ? gapHeight - filterOffset : 0
    }else if(position === 'bottom' ){
      return isAdaptY ? gapLength > 1 ? bannerHeight - gapHeight - filterOffset  :(renderedCoverHeight - filterOffset) : 0
    }
    return 0
  }

  const getLeft = (position?: 'left' | 'right' | 'top' | 'bottom') => {
    if(position === 'left') {
      return isAdaptY ? 0 : gapWidth - filterOffset
    }else if(position === 'right' ){
      return isAdaptY ? 0 : bannerWidth - gapWidth - filterOffset
    }
    return 0
  }



  const getFilterStyle = (position?: 'left' | 'right' | 'top' | 'bottom') => {
    return {
      position: 'absolute' as 'absolute',
      top: getTop(position),
      left: getLeft(position),
      width: isAdaptY ?  '100%' : filterWidth,
      height: isAdaptY ? filterWidth : '100%',
      zIndex: 'inherit',
      filter: 'blur(30px)',
      opacity: 0.7,
      backgroundColor:`rgb(${coverInfo[position || 'left']})`,
    }
  }

  useLayoutEffect(()=>{
    setMounted(origin=>origin+1)
    const observer = new ResizeObserver(()=>{
      setMounted(origin=>origin+1)
    });
    conRef.current?.parentElement && observer.observe(conRef.current.parentElement);
    return () => {
      observer.disconnect();
    };
  },[])

  return <div ref={conRef} style={containerStyle} className={className}>
    {applyDynamicBg && (
        <>
          {(['right','center', 'top','bottom'].includes(backgroundPosition)) && !isAdaptY && <span
            style={getFilterStyle('left')}
          ></span>}
          {(['left','center', 'top','bottom'].includes(backgroundPosition))&& !isAdaptY && <span
            style={getFilterStyle('right')}
          ></span>}

          {['bottom','center', 'left', 'right'].includes(backgroundPosition) && isAdaptY && <span
            style={getFilterStyle('top')}
          ></span>}
          {['top','center', 'left', 'right'].includes(backgroundPosition) && isAdaptY && <span
            style={getFilterStyle('bottom')}
          ></span>}
          
        </>
      )}
      {children}
  </div>
}