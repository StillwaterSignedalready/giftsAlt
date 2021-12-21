import React, { useState } from 'react';
import { Tag, Button, Input } from 'antd';
import 'antd/dist/antd.css'
import logo from './logo.svg';
import './App.css';

function App() {
  const [colleagues, setColleagues] = useState<string[]>(['齐物', '思茗', '锦觅', '冯超', '地陆', '中远']);
  const [name, setName] = useState<string>('')

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <div>
        <Input value={name} onChange={(event) => setName(event.target.value)} style={{ width: 100 }} />
        <Button onClick={() => {
          setColleagues([...colleagues, name])
          setName('')
        }}>Add Colleague</Button>
      </div>
      <div>
        {colleagues.map(
          (name, index) => (
            <Tag closable onClose={() => setColleagues(colleagues.filter((x, i) => i !== index))} key={name}>{name}</Tag>
          )
        )}
      </div>
    </div>
  );
}

export default App;
