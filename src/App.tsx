import React, { CSSProperties, useState } from 'react';
import { Tag, Button, Input, message } from 'antd';
import { SwapOutlined } from '@ant-design/icons'
import { TweenOneGroup } from 'rc-tween-one';
import 'antd/dist/antd.css'
import logo from './logo.svg';
import './App.css';

const chosenStyle: CSSProperties = {
  fontSize: 80,
  padding: 20,
  margin: 0,
}

function App() {
  const [colleagues, setColleagues] = useState<string[]>([
    '柳心', '陈嘉涵', '虫二', '地陆', '古几', '锦觅', 'KK', '空蝉', '廖恺', '李孟遥', '陆逊', '木樨', '钱倩', '七乔', '齐物', '冉空', '思茗', '苏枋', '弦千', '星耀', '徐玲俐', '易大富', '圆葱', '俞建伟', '中远', '梦婷'
    // 'a', 'b', 'c', 'd', 'e'
  ]);
  const [name, setName] = useState<string>('')
  const [colleagueA, setColleagueA] = useState('');
  const [colleagueB, setColleagueB] = useState('');
  const [colleagueC, setColleagueC] = useState('');
  const [history, setHistory] = useState<string[][]>([]);

  const onPick = () => {
    const oneWithLucky = colleagues[Math.floor(colleagues.length * Math.random())];
    const hasA = !!colleagueA;
    const hasB = !!colleagueB;
    if (hasA && hasB && colleagues.length === 1) {
      setColleagueC(oneWithLucky);
    } else if (hasA === hasB) { // 都有或者都没有
      setColleagueA(oneWithLucky);
      setColleagueB('');
      if (hasA && hasB) setHistory([...history, [colleagueA, colleagueB]]);
    } else {
      setColleagueB(oneWithLucky);
    }
    setColleagues((oldList) => oldList.filter(name => name !== oneWithLucky))
  }

  

  return (
    <div style={{ backgroundImage: `url(${require('./img/christmas2.png')})`, height: '100vh', backgroundRepeat: 'round' }}>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div style={{ padding: '0 20px' }}>
        <Input.Group size='small' compact>
          <Input value={name} onChange={(event) => setName(event.target.value)} style={{ width: 100 }} />
          <Button
            size='small'
            style={{ marginRight: 10 }}
            onClick={() => {
              if (colleagues.find(str => str === name)) {
                message.warn('重复的名字')
                return;
              }
              setColleagues([...colleagues, name])
              setName('')
            }}
          >Add Colleague</Button>
        </Input.Group>

        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
          }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 400 }}
          appear={false}
        >
          {colleagues.map(
            (name, index) => (
              <Tag style={{ marginTop: 8 }} closable onClose={() => setColleagues(colleagues.filter((x, i) => i !== index))} key={name}>{name}</Tag>
            )
          )}
          <span style={{ marginLeft: 10 }}>{colleagues.length} left</span>
        </TweenOneGroup>
        <div style={{ marginTop: 10 }}>
          <Button onClick={onPick} type="primary">Pick</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {colleagueA && <h1 style={chosenStyle}>{colleagueA}</h1>}
          {colleagueB && <div><SwapOutlined style={{ color: 'white', fontSize: 50 }} /></div>}
          {colleagueB && <h1 style={chosenStyle}>{colleagueB}</h1>}
          {colleagueC && <div><SwapOutlined style={{ color: 'white', fontSize: 50 }} /></div>}
          {colleagueC && <h1 style={chosenStyle}>{colleagueC}</h1>}
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: 10, left: 10 }}>
        {history.map((([a, b]) => <span style={{ marginRight: 10 }} key={`${a}-${b}`}>{a} - {b}</span>))}
      </div>
    </div>
  );
}

export default App;
