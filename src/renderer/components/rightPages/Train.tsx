import Detect, { BodyState } from '../utils/Detect';
// eslint-disable-next-line import/no-named-as-default
import Panel from '../utils/Panel';
import { SportToTrain } from '../Right';

interface TrainProps {
  setBodyState: (state: BodyState) => void;
  bodyState: BodyState;
  ToDoList: SportToTrain[];
}

const Train = (props: TrainProps) => {
  const { setBodyState, bodyState, ToDoList } = props;
  return (
    <div id="Tarin">
      <Detect setBodyState={setBodyState} />
      <Panel bodyState={bodyState} ToDoList={ToDoList} />
    </div>
  );
};

export default Train;
