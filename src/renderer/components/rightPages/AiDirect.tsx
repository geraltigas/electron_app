import { useState } from 'react';
import { BodyState } from '../utils/Detect';
import AllSports, { Sport } from '../utils/AllSports';
import Teach from '../utils/Teach';
import { SportToTrain } from '../Right';

interface AiDirectProps {
  setBodyState: (state: BodyState) => void;
  sports: Sport[];
  ToDoList: SportToTrain[];
}

const AiDirect = (props: AiDirectProps) => {
  const { sports, ToDoList } = props;
  const [selectedSport, setSelectedSport] = useState<Sport>(null);
  const showDiv: JSX.Element =
    selectedSport == null ? (
      <AllSports sports={sports} setSelectedSport={setSelectedSport} />
    ) : (
      <Teach
        setSelectedSport={setSelectedSport}
        selectedSport={selectedSport}
        ToDoList={ToDoList}
      />
    );
  return <div id="showTrain">{showDiv}</div>;
};

export default AiDirect;
