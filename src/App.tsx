import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { MyCounter } from './features/myCounter/MyCounter';
import { useAppSelector } from './app/hooks';
import { Todo } from './features/Todo/Todo';
import { Spinner } from './features/Spinner/Spinner';

function App() {

  const pluto = useAppSelector(s => s.myCounter.value);

  return (
    <div className="container">
      {/* <Counter />
      <MyCounter/>
      <br/>
      <br/>
      <br/>
      <h1>{pluto}</h1> */}
      <Todo/>
      <Spinner/>
    </div>
  );
}

export default App;
