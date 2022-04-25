// import { useRef, useState } from 'react';
//
// export class BodyState {
//   pose1:
//     | {
//         right_armpit: number;
//         right_arm_shoulder_horizon: number;
//         left_armpit: number;
//         left_arm_shoulder_horizon: number;
//       }
//     | undefined;
// }
//
// interface DetectProps {
//   setBodyState: (body: BodyState) => void;
//   className:string;
// }
//
// let filter = 0;
// const pre = 2;
//
// const Detect = (props: DetectProps) => {
//   const { setBodyState } = props;
//   const address = 'localhost';
//   const port = 10101;
//   const [ws, setWs] = useState<WebSocket>(
//     new WebSocket(`ws://${address}:${port}/video`)
//   );
//
//   // if (ws.readyState === ws.CLOSED) {
//   //   setWs(new WebSocket(`ws://${address}:${port}/video`));
//   //   const temp = setInterval(() => {
//   //     if (ws.readyState === 1) {
//   //       // 想服务器发送数据,请求图片,这里发送的内容随便都可以
//   //       ws.send('msg');
//   //       clearInterval(temp);
//   //     }
//   //   }, 10);
//   // }
//
//   const timer = setInterval(() => {
//     if (ws.readyState === 1) {
//       // 想服务器发送数据,请求图片,这里发送的内容随便都可以
//       ws.send('msg');
//       clearInterval(timer);
//     }
//   }, 10);
//   const imageShow = useRef<HTMLImageElement>(null);
//
//   ws.onmessage = function (res: MessageEvent) {
//     if (imageShow.current != null) {
//       const dataRes: any = JSON.parse(res.data);
//       if (filter < pre) {
//         filter += 1;
//       } else {
//         filter = 0;
//         setBodyState(dataRes.data);
//         console.log(dataRes.data);
//       }
//       const imgSrc: string = dataRes.img;
//       // console.log(img_src)
//       imageShow.current.src = imgSrc;
//       const height = 700;
//       const width = (height / 9) * 16;
//       imageShow.current.style.height = `${height}`;
//       imageShow.current.style.width = `${width}`;
//       // imageShow.current.width = 500;
//       // imageShow.current.height = 400;
//       ws.send('msg'); // 16:9
//     }
//   };
//
//   return (

//   );
// };
//
// export default Detect;

import { useEffect, useRef, useState } from 'react';

let filter = 0;
const pre = 2;

export class BodyState {
  pose1:
    | {
        right_armpit: number;
        left_elbow: number;
        left_armpit: number;
        right_elbow: number;
        left_body_angle: number;
        right_body_angle: number;
      }
    | undefined;

  // pose2:
  //   | {
  //       left_knee_height: number;
  //       right_knee_height: number;
  //       shoulder_width: number;
  //       feet_width: number;
  //       left_arm_height: number;
  //       right_arm_height: number;
  //       left_body_line: number;
  //     }
  //   | undefined;
}

interface DetectProps {
  setBodyState: (body: BodyState) => void;
}
const Detect = (props: DetectProps) => {
  const { setBodyState } = props;
  const address = 'localhost';
  const port = 10101;
  const [ws, setWs] = useState(new WebSocket(`ws://${address}:${port}/video`));
  ws.onclose = () => {
    console.log('closed');
  };
  ws.onopen = () => {
    console.log('open');
  };
  ws.onerror = () => {
    console.log('error');
  };
  const timer = setInterval(function () {
    if (ws.readyState === 1) {
      // 想服务器发送数据,请求图片,这里发送的内容随便都可以
      ws.send('msg');
      clearInterval(timer);
    }
  }, 10);
  setInterval(() => {
    if (ws.readyState === ws.CLOSED) {
      setWs(new WebSocket(`ws://${address}:${port}/video`));
    }
  }, 100);
  const imageShow: any = useRef(null);

  ws.onmessage = function (res: MessageEvent) {
    if (imageShow.current != null) {
      const dataRes: any = JSON.parse(res.data);
      if (filter < pre) {
        filter += 1;
      } else {
        filter = 0;
        setBodyState(dataRes.data);
      }
      const imgSrc: string = dataRes.img;
      // console.log(img_src)
      imageShow.current.src = imgSrc;
      const height = 700;
      const width = (height / 9) * 16;
      imageShow.current.style.height = `${height}`;
      imageShow.current.style.width = `${width}`;
      // imageShow.current.width = 500;
      // imageShow.current.height = 400;
      ws.send('msg'); // 16:9
    }
  };

  return (
    <div className="Card_1 Detect">
      <img ref={imageShow} id="canvas" alt="nothing" />
    </div>
  );
};

export default Detect;
