import React from 'react';
import './App.css';
import './Board'
import Board from './Board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          BATTLE SIMULATOR
        </p>
        <Board />
      </header>
    </div>
  );
}

export default App;
