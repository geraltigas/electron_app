import { useState } from 'react';
import { Sport } from './AllSports';
import Detect, { BodyState } from './Detect';
import Video from './Video';
import Panel from './Panel';
import { SportToTrain } from '../Right';

interface TeachProps {
  setSelectedSport: (sport: Sport) => void;
  selectedSport: Sport;
  ToDoList: SportToTrain[];
}

let show;

const Teach = (props: TeachProps) => {
  const { setSelectedSport, selectedSport, ToDoList } = props;
  const [bodyState, setBodyState] = useState<BodyState>();
  const [isVideo, setIsVideo] = useState<boolean>(true);

  if (isVideo) {
    show = <Video setIsVideo={setIsVideo} selectedSport={selectedSport} />;
  } else {
    show = (
      <>
        <Detect setBodyState={setBodyState} className="detectTeach" />
        <img
          src={require('../../../static/return.png')}
          id="return"
          alt="return"
          onClick={() => setSelectedSport(null)}
        />
        <Panel
          bodyState={bodyState!}
          ToDoList={ToDoList}
          isTeach
          sportSelected={selectedSport}
        />
      </>
    );
  }

  return <div id="Teach">{show}</div>;
};

export default Teach;
