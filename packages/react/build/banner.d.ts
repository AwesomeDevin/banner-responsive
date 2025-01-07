import React from "react";
export interface ResponsiveBannerProps {
    width: number;
    height: number;
    img: string;
    backgroundPosition: 'center' | 'top' | 'bottom' | 'left' | 'right';
    style?: React.CSSProperties;
    className?: string;
}
export default function ResponsiveBanner(props: ResponsiveBannerProps): JSX.Element;
