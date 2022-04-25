import { Button } from 'antd';
import { Sport } from './AllSports';

interface VideoProps {
  selectedSport: Sport;
  setIsVideo: (bool: boolean) => void;
}

const Video = (props: VideoProps) => {
  const { selectedSport, setIsVideo } = props;
  let file = 1;
  let description;

  const onClick = () => {
    setIsVideo(false);
  };

  switch (selectedSport.name) {
    case '哑铃平举': {
      file = 1;
      description = (
        <div
          style={{
            fontSize: '30px',
          }}
        >
          <h1>哑铃平举</h1>
          <ul>
            <li>手臂平举至于肩同高</li>
            <li>双手形成90度左右张角</li>
          </ul>
        </div>
      );
      break;
    }
    case '深蹲': {
      file = 1;
      description = (
        <div
          style={{
            fontSize: '30px',
          }}
        >
          <h1>深蹲</h1>
          <ul>
            <li>手臂平举至于肩同高</li>
            <li>双手形成90度左右张角</li>
          </ul>
        </div>
      );
      break;
    }
    case '开合跳': {
      file = 1;
      description = (
        <div
          style={{
            fontSize: '30px',
          }}
        >
          <h1>开合跳</h1>
          <ul>
            <li>手臂平举至于肩同高</li>
            <li>双手形成90度左右张角</li>
          </ul>
        </div>
      );
      break;
    }
    case '高抬腿': {
      file = 1;
      description = (
        <div
          style={{
            fontSize: '30px',
          }}
        >
          <h1>高抬腿</h1>
          <ul>
            <li>手臂平举至于肩同高</li>
            <li>双手形成90度左右张角</li>
          </ul>
        </div>
      );
      break;
    }
    case '平板支撑': {
      file = 1;
      description = (
        <div
          style={{
            fontSize: '30px',
          }}
        >
          <h1>平板支撑</h1>
          <ul>
            <li>手臂平举至于肩同高</li>
            <li>双手形成90度左右张角</li>
          </ul>
        </div>
      );
      break;
    }

    default: {
      break;
    }
  }
  return (
    <div id="videoPage">
      <video
        className="Detect Card_1"
        src={`http://127.0.0.1:8000?file=${file}`}
        autoPlay
        loop
      />
      <div id="description" className="Panel Card_1">
        {description}
      </div>
      <Button
        className="videoButton"
        type="primary"
        style={{
          height: '50px',
          width: '120px',
        }}
        onClick={onClick}
      >
        我已了解
      </Button>
    </div>
  );
};

export default Video;
