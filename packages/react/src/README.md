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
          height: 350,
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
          height: 350,
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
          height: 350,
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
          height: 350,
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
          height: 350,
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
          height: 350,
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
          height: 350,
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
          height: 350,
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
          height: 350,
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
