import { BodyState } from './Detect';
// eslint-disable-next-line import/no-cycle
import { SportToTrain } from '../Right';

let armGuoYuKaoNei = 0;
let armGuoYuKaoWai = 0;
let armTooHigh = 0;

const countS = 5;
let count = countS;

const handleYaLin = (
  groupDoing: number,
  actionDoing: number,
  seperateDone: number,
  errors: string[],
  setGroupDoing: (number: number) => void,
  setActionDoing: (number: number) => void,
  setSeperateDone: (number: number) => void,
  setErrors: (strings: string[]) => void,
  bodyState: BodyState,
  ToDoList: SportToTrain[],
  setAllDone: (bool:boolean) => void,
) => {
  if (bodyState === undefined || bodyState.pose1 === undefined) return;
  // 手臂内外靠检测
  if (
    bodyState.pose1!.left_arm_shoulder_horizon < 30 ||
    bodyState.pose1!.right_arm_shoulder_horizon < 30
  ) {
    if (armGuoYuKaoNei === 0) {
      setErrors([...errors, '手臂过于靠内']);
      armGuoYuKaoNei = 1;
    }
  } else if (
    bodyState.pose1!.left_arm_shoulder_horizon > 60 ||
    bodyState.pose1!.right_arm_shoulder_horizon > 60
  ) {
    if (armGuoYuKaoWai === 0) {
      setErrors([...errors, '手臂过于靠外']);
      armGuoYuKaoWai = 1;
    }
  }

  switch (seperateDone) {
    case 0: {
      if (
        bodyState.pose1!.left_armpit > 30 &&
        bodyState.pose1!.right_armpit > 30
      ) {
        setSeperateDone(1);
      }
      break;
    }
    case 1: {
      if (
        bodyState.pose1!.left_armpit < 30 ||
        bodyState.pose1!.right_armpit < 30
      ) {
        setSeperateDone(0);
      } else if (
        bodyState.pose1!.left_armpit > 60 &&
        bodyState.pose1!.right_armpit > 60
      ) {
        setSeperateDone(2);
      }
      break;
    }
    case 2: {
      if (
        bodyState.pose1!.left_armpit < 30 ||
        bodyState.pose1!.right_armpit < 30
      ) {
        setSeperateDone(0);
      } else if (
        bodyState.pose1!.left_armpit > 80 &&
        bodyState.pose1!.right_armpit > 80
      ) {
        setSeperateDone(3);
      }
      break;
    }
    case 3: {
      if (
        bodyState.pose1!.left_armpit > 100 ||
        bodyState.pose1!.right_armpit > 100
      ) {
        if (armTooHigh === 0) {
          setErrors([...errors, '手臂过高']);
          armTooHigh = 1;
        }
        break;
      } else if (
        bodyState.pose1!.left_armpit < 80 &&
        bodyState.pose1.right_armpit < 80
      ) {
        setSeperateDone(4);
      }
      break;
    }
    case 4: {
      if (
        bodyState.pose1!.left_armpit > 80 ||
        bodyState.pose1!.right_armpit > 80
      ) {
        setSeperateDone(3);
        break;
      } else if (
        bodyState.pose1!.left_armpit < 60 &&
        bodyState.pose1.right_armpit < 60
      ) {
        setSeperateDone(5);
      }
      break;
    }
    case 5: {
      if (
        bodyState.pose1!.left_armpit > 60 ||
        bodyState.pose1!.right_armpit > 60
      ) {
        setSeperateDone(4);
      } else if (
        bodyState.pose1!.left_armpit < 20 ||
        bodyState.pose1!.right_armpit < 20
      ) {
        setSeperateDone(6);
      }
      break;
    }
    case 6: {
      if (count === 5) {
        if (actionDoing === ToDoList[groupDoing].amount) {
          setActionDoing(0);
          if (groupDoing === ToDoList.length) {
            setAllDone(true);
          } else {
            setGroupDoing(groupDoing + 1);
          }
        } else {
          setActionDoing(actionDoing + 1);
        }

        armTooHigh = 0;
        armGuoYuKaoWai = 0;
        armGuoYuKaoNei = 0;
        count -= 1;
      } else {
        if (count === 0) {
          setSeperateDone(0);
          count = 5;
        } else {
          count -= 1;
        }
      }
      break;
    }
    default: {
      break;
    }
  }
};

const handleShenDun = (
  groupDoing: number,
  actionDoing: number,
  seperateDone: number,
  errors: string[],
  setGroupDoing: (number: number) => void,
  setActionDoing: (number: number) => void,
  setSeperateDone: (number: number) => void,
  setErrors: (strings: string[]) => void,
  bodyState: BodyState,
  ToDoList: SportToTrain[],
  setAllDone: (bool: boolean) => void
) => {
  if (bodyState === undefined || bodyState.pose1 === undefined) return;
  // 手臂内外靠检测
  if (
    bodyState.pose1!.left_arm_shoulder_horizon < 30 ||
    bodyState.pose1!.right_arm_shoulder_horizon < 30
  ) {
    if (armGuoYuKaoNei === 0) {
      setErrors([...errors, '手臂过于靠内']);
      armGuoYuKaoNei = 1;
    }
  } else if (
    bodyState.pose1!.left_arm_shoulder_horizon > 60 ||
    bodyState.pose1!.right_arm_shoulder_horizon > 60
  ) {
    if (armGuoYuKaoWai === 0) {
      setErrors([...errors, '手臂过于靠外']);
      armGuoYuKaoWai = 1;
    }
  }

  switch (seperateDone) {
    case 0: {
      if (
        bodyState.pose1!.left_armpit > 30 &&
        bodyState.pose1!.right_armpit > 30
      ) {
        setSeperateDone(1);
      }
      break;
    }
    case 1: {
      if (
        bodyState.pose1!.left_armpit < 30 ||
        bodyState.pose1!.right_armpit < 30
      ) {
        setSeperateDone(0);
      } else if (
        bodyState.pose1!.left_armpit > 60 &&
        bodyState.pose1!.right_armpit > 60
      ) {
        setSeperateDone(2);
      }
      break;
    }
    case 2: {
      if (
        bodyState.pose1!.left_armpit < 30 ||
        bodyState.pose1!.right_armpit < 30
      ) {
        setSeperateDone(0);
      } else if (
        bodyState.pose1!.left_armpit > 80 &&
        bodyState.pose1!.right_armpit > 80
      ) {
        setSeperateDone(3);
      }
      break;
    }
    case 3: {
      if (
        bodyState.pose1!.left_armpit > 100 ||
        bodyState.pose1!.right_armpit > 100
      ) {
        if (armTooHigh === 0) {
          setErrors([...errors, '手臂过高']);
          armTooHigh = 1;
        }
        break;
      } else if (
        bodyState.pose1!.left_armpit < 80 &&
        bodyState.pose1.right_armpit < 80
      ) {
        setSeperateDone(4);
      }
      break;
    }
    case 4: {
      if (
        bodyState.pose1!.left_armpit > 80 ||
        bodyState.pose1!.right_armpit > 80
      ) {
        setSeperateDone(3);
        break;
      } else if (
        bodyState.pose1!.left_armpit < 60 &&
        bodyState.pose1.right_armpit < 60
      ) {
        setSeperateDone(5);
      }
      break;
    }
    case 5: {
      if (
        bodyState.pose1!.left_armpit > 60 ||
        bodyState.pose1!.right_armpit > 60
      ) {
        setSeperateDone(4);
      } else if (
        bodyState.pose1!.left_armpit < 20 ||
        bodyState.pose1!.right_armpit < 20
      ) {
        setSeperateDone(6);
      }
      break;
    }
    case 6: {
      if (count === 5) {
        if (actionDoing === ToDoList[groupDoing].amount) {
          setActionDoing(0);
          if (groupDoing === ToDoList.length) {
            setAllDone(true);
          } else {
            setGroupDoing(groupDoing + 1);
          }
        } else {
          setActionDoing(actionDoing + 1);
        }

        armTooHigh = 0;
        armGuoYuKaoWai = 0;
        armGuoYuKaoNei = 0;
        count -= 1;
      } else {
        if (count === 0) {
          setSeperateDone(0);
          count = 5;
        } else {
          count -= 1;
        }
      }
      break;
    }
    default: {
      break;
    }
  }
};

export { handleYaLin, handleShenDun };
export default handleYaLin;
