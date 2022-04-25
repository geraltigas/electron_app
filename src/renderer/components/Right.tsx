import { useState } from 'react';
import Train from './rightPages/Train';
import SetAmount from './rightPages/SetAmount';
import AiDirect from './rightPages/AiDirect';
import { BodyState } from './utils/Detect';
import { Sport } from './utils/AllSports';

interface RightProps {
  page: number;
  setPage: (value: number) => void;
}

class SportToTrain {
  name: string;

  amount: number;

  reflect: Sport;

  constructor(name: string, amount: number, sport: Sport) {
    this.name = name;
    this.amount = amount;
    this.reflect = sport;
  }
}

const description1 = ['1', '2', '3'];

const sports: Sport[] = [
  new Sport('哑铃平举', require('../../static/yaling.png'), 6, description1),
  new Sport('深蹲', require('../../static/shendun.png'), 5, description1),
  new Sport('开合跳', require('../../static/kaihe.png'), 5, description1),
  new Sport('高抬腿', require('../../static/gaotai.png'), 5, description1),
  new Sport('平板支撑', require('../../static/pingban.png'), 5, description1),
];

const getSport = (id: string): Sport => {
  // @ts-ignore
  sports.forEach((sport: Sport) => {
    if (sport.name === id) return sport;
  });
  return sports[0];
};

const Right = (props: RightProps) => {
  const { page } = props;
  const [bodyState, setBodyState] = useState<BodyState>(new BodyState());
  const [sportToTrain, setSportToTrain] = useState<SportToTrain[]>([
    new SportToTrain('哑铃平举', 12, sports[0]),
  ]);

  let route: JSX.Element;

  switch (page) {
    case 0: {
      route = (
        <Train
          bodyState={bodyState}
          setBodyState={setBodyState}
          ToDoList={sportToTrain}
        />
      );
      break;
    }
    case 1: {
      route = (
        <SetAmount
          sportToTrain={sportToTrain}
          setSportToTrain={setSportToTrain}
          sports={sports}
        />
      );
      break;
    }
    case 2: {
      route = (
        <AiDirect
          setBodyState={setBodyState}
          sports={sports}
          ToDoList={sportToTrain}
        />
      );
      break;
    }
    default: {
      route = <div>void</div>;
      break;
    }
  }

  return <div id="right">{route}</div>;
};

export { SportToTrain, getSport };

export default Right;
