import React from "react";
import { ICoverInfo } from "./utils";
export interface ResponsiveBannerProps {
    width?: number;
    height?: number;
    img: string;
    backgroundPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    alt?: string;
    range?: [number, number];
    presetCoverInfo?: Omit<ICoverInfo, 'width' | 'height'> & {
        image: HTMLImageElement;
    };
}
declare function ResponsiveBanner(props: ResponsiveBannerProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof ResponsiveBanner>;
export default _default;
