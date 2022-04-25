import './App.css';
import { useState } from 'react';
import Left from './components/Left';
import Right from './components/Right';
import 'antd/dist/antd.css';


// TODO: 左侧按钮动画(悬停有变长显示字)
// TODO: 右侧训练面板
// TODO: 右侧TODOlist
// TODO: 右侧教学选择
// TODO: 右侧教学界面

const MyApp = () => {
  const [page, setPage] = useState(0);

  return (
    <div id="left_and_right">
      <Left page={page} setPage={setPage} />
      <Right page={page} setPage={setPage} />
    </div>
  );
};

export default function App() {
  return <MyApp />;
}
