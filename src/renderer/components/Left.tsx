import HoButton from './utils/HoButton';

interface LeftProps {
  page: number;
  setPage: (index: number) => void;
}

const Left = (props: LeftProps) => {
  const { page, setPage } = props;
  const handleRightButton = (index: number) => {
    return () => {
      setPage(index);
    };
  };

  return (
    <div id="left">
      <div id="left_top">
        <HoButton
          activeSrc={require('../../static/train_active.png')}
          imActiveSrc={require('../../static/train_imactive.png')}
          isActive={page === 0}
          onClick={handleRightButton(0)}
        />
        <HoButton
          activeSrc={require('../../static/todo_list_active.png')}
          imActiveSrc={require('../../static/todo_list_imactive.png')}
          isActive={page === 1}
          onClick={handleRightButton(1)}
        />
        <HoButton
          activeSrc={require('../../static/ai_train_active.png')}
          imActiveSrc={require('../../static/ai_train_imactive.png')}
          isActive={page === 2}
          onClick={handleRightButton(2)}
        />
      </div>
      <div id="left_bottom" />
    </div>
  );
};

export default Left;
