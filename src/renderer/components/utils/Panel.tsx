import { useState } from 'react';
import { Progress } from 'antd';
import { BodyState } from './Detect';
import { Sport } from './AllSports';
import { SportToTrain } from '../Right';
import { handleYaLin } from './changeState';

interface PanelProps {
  bodyState: BodyState;
  ToDoList: SportToTrain[];
  isTeach: boolean;
  sportSelected: Sport;
}

let render;

const Panel = (props: PanelProps) => {
  const { bodyState, ToDoList, isTeach, sportSelected } = props;

  const [errors, setErrors] = useState<string[]>([]);
  const [groupDoing, setGroupDoing] = useState<number>(0);
  const [actionDoing, setActionDoing] = useState<number>(0);
  const [seperateDone, setSeperateDone] = useState<number>(0);
  const [AllDone, setAllDone] = useState<boolean>(false);

  if (!AllDone) {
    switch (ToDoList[groupDoing].name) {
      case '哑铃平举': {
        handleYaLin(
          groupDoing,
          actionDoing,
          seperateDone,
          errors,
          setGroupDoing,
          setActionDoing,
          setSeperateDone,
          setErrors,
          bodyState,
          ToDoList,
          setAllDone
        );
        break;
      }
      case '深蹲': {
        handleYaLin(
          groupDoing,
          actionDoing,
          seperateDone,
          errors,
          setGroupDoing,
          setActionDoing,
          setSeperateDone,
          setErrors,
          bodyState,
          ToDoList,
          setAllDone
        );
        break;
      }
      default: {
        break;
      }
    }
  }

  if (isTeach && !AllDone) {
    render = (
      <div id="TrainPanle">
        <div id="ErrorLog">
          {errors.map((error: string) => {
            return <div className="Error">{error}</div>;
          })}
        </div>
        <Progress
          percent={(seperateDone / ToDoList[groupDoing].reflect.stage) * 100}
          type="dashboard"
          className="SeperateDone"
          width={300}
          strokeColor={{
            '100%': '#26e910',
            '0%': '#e91010',
          }}
          format={(number) => {
            // eslint-disable-next-line no-bitwise,@typescript-eslint/no-non-null-assertion
            return `${number! | 0}%`;
          }}
        />
      </div>
    );
  } else {
    if (ToDoList.length === 0) {
      render = <div>请选择运动量</div>;
    } else {
      render = (
        <div id="TrainPanle">
          <div id="DoneRatio">{`Group Done: ${groupDoing}/${ToDoList.length}`}</div>
          <div id="GroupDone">
            <div className="TextIn">
              Group Progress: {ToDoList[groupDoing].name}
            </div>
            <Progress
              percent={(actionDoing / ToDoList[groupDoing].amount) * 100}
              status="active"
              strokeColor={{
                from: '#e91010',
                to: '#87d068',
              }}
              format={(number) => {
                // eslint-disable-next-line no-bitwise,@typescript-eslint/no-non-null-assertion
                return `${number! | 0}%`;
              }}
            />
          </div>
          <Progress
            percent={(seperateDone / ToDoList[groupDoing].reflect.stage) * 100}
            type="dashboard"
            className="SeperateDone"
            width={300}
            strokeColor={{
              '100%': '#26e910',
              '0%': '#e91010',
            }}
            format={(number) => {
              // eslint-disable-next-line no-bitwise,@typescript-eslint/no-non-null-assertion
              return `${number! | 0}%`;
            }}
          />
        </div>
      );
    }
  }

  if (AllDone) {
    render = <div>all done</div>;
  }

  return (
    <div className="Panel Card_1">
      {render}
    </div>
  );
};

export default Panel;
