---
title: ResponsiveBanner
order: 0
---

# Effect of Diff - center

```tsx
import Banner from '@banner-responsive/react';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div style={{display: 'flex', gap: 10, overflowX: 'auto' }}>
      <div>
        <div>@banner-responsive/react :</div>
        <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          
          border: '1px solid #e5eafe',
          borderRadius: 18,
          width: 1000,
          height: '30vh',
          overflow: 'hidden'
        }}
      >
        <Banner backgroundPosition="center" img="https://img.lazcdn.com/g/gcp/lazada/caab1d56-6f25-4449-9ab5-277729c2d991_SG-3000-1524.jpg_2200x2200q80.jpg" />
      </div>
    </div>
    <div>
      <div>"div" bg mode - cover :</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          
          border: '1px solid #e5eafe',
          borderRadius: 18,
          width: 1000,
          height: '30vh',
          background: "url('https://img.lazcdn.com/g/gcp/lazada/caab1d56-6f25-4449-9ab5-277729c2d991_SG-3000-1524.jpg_2200x2200q80.jpg') no-repeat center" ,
          backgroundSize: 'cover'
        }}
      >
      </div>
    </div>
    <div>
      <div>"div" bg mode - contain :</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          
          border: '1px solid #e5eafe',
          borderRadius: 18,
          width: 1000,
          height: '30vh',
          background: "url('https://img.lazcdn.com/g/gcp/lazada/caab1d56-6f25-4449-9ab5-277729c2d991_SG-3000-1524.jpg_2200x2200q80.jpg') no-repeat center" ,
          backgroundSize: 'contain'
        }}
      >
      </div>
    </div>
  </div>,
  mountNode,
);
```



# Effect of Diff - right

```tsx
import Banner from '@banner-responsive/react';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div style={{display: 'flex', gap: 10, overflowX: 'auto' }}>
      <div>
        <div>@banner-responsive/react :</div>
        <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          
          border: '1px solid #e5eafe',
          borderRadius: 18,
          width: 1000,
          height: '30vh',
          overflow: 'hidden'
        }}
      >
    <Banner backgroundPosition="right" img="https://img.lazcdn.com/g/gcp/lazada/3384ee66-6160-409e-aad0-174e031c0cd9_SG-8001-3750.jpg_2200x2200q80.jpg" />
   </div>
    </div>
    <div>
      <div>"div" bg mode - cover :</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          
          border: '1px solid #e5eafe',
          borderRadius: 18,
          width: 1000,
          height: '30vh',
          background: "url('https://img.lazcdn.com/g/gcp/lazada/3384ee66-6160-409e-aad0-174e031c0cd9_SG-8001-3750.jpg_2200x2200q80.jpg') no-repeat right" ,
          backgroundSize: 'cover'
        }}
      >
      </div>
    </div>
    <div>
      <div>"div" bg mode - contain :</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          
          border: '1px solid #e5eafe',
          borderRadius: 18,
          width: 1000,
          height: '30vh',
          background: "url('https://img.lazcdn.com/g/gcp/lazada/3384ee66-6160-409e-aad0-174e031c0cd9_SG-8001-3750.jpg_2200x2200q80.jpg') no-repeat right",
          backgroundSize: 'contain'
        }}
      >
      </div>
    </div>
  </div>,
  mountNode,
);
```


# Effect of Diff - left

```tsx
import Banner from '@banner-responsive/react';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div style={{display: 'flex', gap: 10, overflowX: 'auto' }}>
      <div>
        <div>@banner-responsive/react :</div>
        <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          
          border: '1px solid #e5eafe',
          borderRadius: 18,
          width: 1000,
          height: '30vh',
          overflow: 'hidden'
        }}
      >
    <Banner backgroundPosition="left" img="https://img.lazcdn.com/g/tps/imgextra/i1/O1CN01x0Y38j22hDHsu3cgK_!!6000000007151-0-tps-2400-1215.jpg_2200x2200q80.jpg" />
   </div>
    </div>
    <div>
      <div>"div" bg mode - cover :</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          
          border: '1px solid #e5eafe',
          borderRadius: 18,
          width: 1000,
          height: '30vh',
          background: "url('https://img.lazcdn.com/g/tps/imgextra/i1/O1CN01x0Y38j22hDHsu3cgK_!!6000000007151-0-tps-2400-1215.jpg_2200x2200q80.jpg') no-repeat left" ,
          backgroundSize: 'cover'
        }}
      >
      </div>
    </div>
    <div>
      <div>"div" bg mode - contain :</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          
          border: '1px solid #e5eafe',
          borderRadius: 18,
          width: 1000,
          height: '30vh',
          background: "url('https://img.lazcdn.com/g/tps/imgextra/i1/O1CN01x0Y38j22hDHsu3cgK_!!6000000007151-0-tps-2400-1215.jpg_2200x2200q80.jpg') no-repeat left",
          backgroundSize: 'contain'
        }}
      >
      </div>
    </div>
  </div>,
  mountNode,
);
```



# Effect of Diff - top

```tsx
import Banner from '@banner-responsive/react';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
 <div style={{display: 'flex', gap: 10, overflowX: 'auto' }}>
      <div>
        <div>@banner-responsive/react :</div>
        <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          
          border: '1px solid #e5eafe',
          borderRadius: 18,
          width: 1000,
          height: 750,
          overflow: 'hidden'
        }}
      >
    <Banner backgroundPosition="top" img="https://img.lazcdn.com/g/gcp/lazada/d6c294a7-f228-4be7-8fff-5d3af62d78d9_SG-2400-1215.png_2200x2200q80.png" />
    </div>
    </div>
    <div>
      <div>"div" bg mode - cover :</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          
          border: '1px solid #e5eafe',
          borderRadius: 18,
          width: 1000,
          height: 750,
          background: "url('https://img.lazcdn.com/g/gcp/lazada/d6c294a7-f228-4be7-8fff-5d3af62d78d9_SG-2400-1215.png_2200x2200q80.png') no-repeat top" ,
          backgroundSize: 'cover'
        }}
      >
      </div>
    </div>
    <div>
      <div>"div" bg mode - contain :</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          
          border: '1px solid #e5eafe',
          borderRadius: 18,
          width: 1000,
          height: 750,
          background: "url('https://img.lazcdn.com/g/gcp/lazada/d6c294a7-f228-4be7-8fff-5d3af62d78d9_SG-2400-1215.png_2200x2200q80.png') no-repeat top",
          backgroundSize: 'contain'
        }}
      >
      </div>
    </div>
  </div>,
  mountNode,
);
```

# Effect of Diff - bottom

```tsx
import Banner from '@banner-responsive/react';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
 <div style={{display: 'flex', gap: 10, overflowX: 'auto' }}>
      <div>
        <div>@banner-responsive/react :</div>
        <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          
          border: '1px solid #e5eafe',
          borderRadius: 18,
          width: 1000,
          height: 750,
          overflow: 'hidden'
        }}
      >
    <Banner backgroundPosition="bottom" img="https://img.lazcdn.com/g/gcp/lazada/d6c294a7-f228-4be7-8fff-5d3af62d78d9_SG-2400-1215.png_2200x2200q80.png" />
    </div>
    </div>
    <div>
      <div>"div" bg mode - cover :</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          
          border: '1px solid #e5eafe',
          borderRadius: 18,
          width: 1000,
          height: 750,
          background: "url('https://img.lazcdn.com/g/gcp/lazada/d6c294a7-f228-4be7-8fff-5d3af62d78d9_SG-2400-1215.png_2200x2200q80.png') no-repeat bottom" ,
          backgroundSize: 'cover'
        }}
      >
      </div>
    </div>
    <div>
      <div>"div" bg mode - contain :</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          
          border: '1px solid #e5eafe',
          borderRadius: 18,
          width: 1000,
          height: 750,
          background: "url('https://img.lazcdn.com/g/gcp/lazada/d6c294a7-f228-4be7-8fff-5d3af62d78d9_SG-2400-1215.png_2200x2200q80.png') no-repeat bottom",
          backgroundSize: 'contain'
        }}
      >
      </div>
    </div>
  </div>,
  mountNode,
);
```




### SDK - getMainColor

```tsx
import Banner from '@banner-responsive/react';
import { getMainColor } from '@banner-responsive/sdk'
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


const Com = () => {

  const [value,setValue ] = useState('https://img.lazcdn.com/g/gcp/lazada/3384ee66-6160-409e-aad0-174e031c0cd9_SG-8001-3750.jpg_2200x2200q80.jpg')
  const [coverInfo,setCoverInfo] = useState({})

  const initColor = (img) => {
    // left color
    getMainColor(img, [1, 40]).then((res) => {
      setCoverInfo((origin) => ({
        ...origin,
        left: res.color,
        image: res.image,
      }));
    });

    // right color
    getMainColor(img, [-40, -1]).then((res) => {
      setCoverInfo((origin) => ({
        ...origin,
        right: res.color,
        image: res.image,
      }));
    });

    // bottom color
    getMainColor(img, [-40, -1], 'y').then((res) => {
      setCoverInfo((origin) => ({
        ...origin,
        bottom: res.color,
        image: res.image,
      }));
    });


    // top color
    getMainColor(img, [1, 40], 'y').then((res) => {
      setCoverInfo((origin) => ({
        ...origin,
        top: res.color,
        image: res.image,
      }));
    });
  }

  useEffect(()=>{
    initColor(value)
  },[value])



  return <div style={{display: 'flex', gap: 20, overflowX: 'auto', flexDirection: 'column', width: '100%', height: '100%' }}>
    <input defaultValue={value} onChange={(e)=>{
      setValue(e.target.value)
    }}/>
    {['left','right','top','bottom'].map(item=><div key={item} style={{display: 'flex', alignItems:'center'}}> {item.charAt(0).toUpperCase() + item.slice(1)} Border Color：<div style={{width: 40, height: 40, border: '1px solid #eee', backgroundColor: `rgb(${coverInfo[item]})`}}></div></div>)}

    <Banner img={value} height={800} presetCoverInfo={coverInfo} alt='1' />
  </div>
}

ReactDOM.render(<Com />, mountNode)
```