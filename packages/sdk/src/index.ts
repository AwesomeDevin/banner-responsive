import { ImageColorUtils } from 'image-color-utils';

export const getMainColor = (
  img: string,
  range: number[] = [0, 100],
  axis: 'x' | 'y' = 'x',
): Promise<{
  color: string;
  image: HTMLImageElement;
}> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = img;
    image.crossOrigin = 'anonymous';

    const run = () => {

      const lefTop =
        axis === 'x'
          ? [range[0] < 0 ? image.width + range[0] : range[0], 0]
          : [0, range[0] < 0 ? image.height + range[0] : range[0]];
      const rightBottom =
        axis === 'x'
          ? [range[1] < 0 ? image.width + range[1] : range[1], image.height]
          : [image.width, range[1] < 0 ? image.height + range[1] : range[1]];
      const drawWidth = rightBottom[0] - lefTop[0];
      const drawHeight = rightBottom[1] - lefTop[1];
      canvas.width = drawWidth;
      canvas.height = drawHeight;

      ctx?.drawImage(image, lefTop[0], lefTop[1], drawWidth, drawHeight, 0, 0, drawWidth, drawHeight);
      createImageBitmap(canvas)
        .then(function(imageBitmap) {
          // 使用imageBitmap...
          const colorUtils = new ImageColorUtils({
            origin: imageBitmap,
            width: drawWidth,
            height: drawHeight,
            onload: () => {
              const res: {
                rgb: string[];
              } = colorUtils.pickColors();
              resolve({
                color:
                  res?.rgb?.[0]
                    ?.match(/rgba\(([0-9,\.]*)\)/)?.[1]
                    ?.split(',')
                    ?.slice(0, 3)
                    .join(',') || '255,255,255',
                image,
              });
            },
          });
        })
        .catch(function(error) {
          console.error('Failed to create ImageBitmap: ' + error);
          // 处理错误...
        });
    };

    image.onload = run;
    // if(image.loaded){
    //   run()
    // }
  });
};
