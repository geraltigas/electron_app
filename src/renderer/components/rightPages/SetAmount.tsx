import { Button, InputNumber, Modal, Select, Table } from 'antd';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
// eslint-disable-next-line import/no-cycle
import { getSport, SportToTrain } from '../Right';
import { Sport } from '../utils/AllSports';

const { Column } = Table;

interface SetAmountProps {
  sportToTrain: SportToTrain[];
  setSportToTrain: (sportToTrain: SportToTrain[]) => void;
  sports: Sport[];
}

const SetAmount = (props: SetAmountProps) => {
  const { sportToTrain, setSportToTrain, sports } = props;

  const [visibility, setVisibility] = useState<boolean>(false);
  const [type, setType] = useState<string>('Edit');
  const [modelData, setModelData] = useState({
    name: '',
    amount: 0,
    key: -1,
  });

  const dataSource = sportToTrain.map((toT, index) => {
    return {
      key: `${index}`,
      name: toT.name,
      amount: toT.amount,
    };
  });

  const handleEdit = (data: { amount: number; name: string; key: number }) => {
    return () => {
      setType('Edit');
      setVisibility(true);
      const modelT = { ...modelData };
      modelT.key = data.key;
      modelT.name = data.name;
      modelT.amount = data.amount;
      setModelData(modelT);
    };
  };

  const handleDelete = (data: { key: number }) => {
    return () => {
      setType('Delete');
      setVisibility(true);
      const modelT = { ...modelData };
      modelT.key = data.key;
      setModelData(modelT);
    };
  };

  const handleCancel = () => {
    setVisibility(false);
  };

  const handleOk = () => {
    switch (type) {
      case 'Edit': {
        const sportT = [...sportToTrain];
        sportT[modelData.key] = new SportToTrain(
          modelData.name,
          modelData.amount,
          getSport(modelData.name)
        );
        setSportToTrain(sportT);
        break;
      }
      case 'Delete': {
        const dataT = [...sportToTrain];
        dataT.splice(modelData.key, 1);
        setSportToTrain(dataT);
        break;
      }
      case 'Add': {
        const dataT = [...sportToTrain];
        dataT.push(
          new SportToTrain(
            modelData.name,
            modelData.amount,
            getSport(modelData.name)
          )
        );
        setSportToTrain(dataT);
        break;
      }
      default: {
        break;
      }
    }
    setVisibility(false);
  };

  const onChange = (value: number) => {
    const dataT = { ...modelData };
    dataT.amount = value;
    setModelData(dataT);
  };

  const handleOptionsChange = (value: string) => {
    const dataT = { ...modelData };
    dataT.name = value;
    setModelData(dataT);
  };

  const onAdd = () => {
    setType('Add');
    setVisibility(true);
    setModelData({
      key: 0,
      name: sports[0].name,
      amount: 1,
    });
  };

  const sportOption = sports.map((sp, index) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <Select.Option key={index} value={sp.name}>
        {sp.name}
      </Select.Option>
    );
  });

  let model;

  switch (type) {
    case 'Edit': {
      model = (
        <>
          <Select
            defaultValue={modelData.name}
            onChange={handleOptionsChange}
            style={{
              width: '100px',
              margin: '10px',
            }}
          >
            {sportOption}
          </Select>
          <InputNumber
            style={{
              width: '100px',
            }}
            min={1}
            defaultValue={modelData.amount}
            onChange={onChange}
          />
        </>
      );
      break;
    }
    case 'Delete': {
      model = <div>确认要删除?</div>;
      break;
    }
    case 'Add': {
      model = (
        <>
          <Select
            defaultValue={modelData.name}
            onChange={handleOptionsChange}
            style={{
              width: '100px',
              margin: '10px',
            }}
          >
            {sportOption}
          </Select>
          <InputNumber
            style={{
              width: '100px',
            }}
            min={1}
            defaultValue={modelData.amount}
            onChange={onChange}
          />
        </>
      );
      break;
    }
    default: {
      break;
    }
  }

  return (
    <div className="scroll">
      <div id="setAmount" className="Card_1">
        <Button
          type="primary"
          shape="circle"
          onClick={onAdd}
          size="large"
          id="addButton"
        >
          <PlusOutlined />
        </Button>
        <Table dataSource={dataSource}>
          <Column title="运动类型" dataIndex="name" key="name" />
          <Column title="运动量" dataIndex="amount" key="amount" />
          <Column
            title="操作"
            render={(e) => {
              return (
                <div>
                  <Button onClick={handleEdit(e)} type="link" size="large">
                    Edit
                  </Button>
                  <Button
                    onClick={handleDelete(e)}
                    danger
                    type="text"
                    size="large"
                  >
                    Delete
                  </Button>
                </div>
              );
            }}
          />
        </Table>
        <Modal
          title={type}
          visible={visibility}
          onCancel={handleCancel}
          onOk={handleOk}
          style={{
            borderRadius: '20px',
          }}
        >
          {model}
        </Modal>
      </div>
    </div>
  );
};

export default SetAmount;
