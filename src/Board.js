import React, { useReducer } from 'react';
import reducer, { initialState, getBarColor } from './reducer'
import * as constants from './constants'

import Dice from './dice';
import './board.css';

const Board = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const playerBarHeight = Math.floor((state.playerPoints / 100 ) * 90);
  const monsterBarHeight = Math.floor((state.monsterPoints / 100 ) * 90);
  const playerBarColor = getBarColor(state.playerPoints);
  const monsterBarColor = getBarColor(state.monsterPoints);
  let text;
  let textColor = 'black';
  if (state.damage === 0) {
    text = '';
  } else if (state.winner === constants.PLAYER){
    text = constants.YOU_WIN;
    textColor = 'green';
  } else if (state.winner === constants.MONSTER) {
    text = constants.GAME_OVER;
    textColor = 'red';
  } else {
    text = `${state.hitFor === constants.PLAYER ? 'YOU' : 'MONSTER '} HIT FOR ${state.damage}!`;
  }
  
  return (
    <div className="board">
      <span className="playerPoints">PLAYER: { state.playerPoints }</span>
      <span className="monsterPoints">MONSTER: { state.monsterPoints }</span>
      <span className="pointsWon" style={{color:textColor}}>{text}</span>
      <div className="player"/>
      <div className="player-bar">
        <div style={{position:"absolute", width:7, height:playerBarHeight, backgroundColor:playerBarColor, left:6, bottom: 5}}/>
      </div>
      <Dice
        diceTop={state.playerDiceTop}
        diceBottom={state.playerDiceBottom}
      />
      <button
        onClick={() => dispatch({ type: state.winner === 'none' ? 'attack' : 'reset'})}
        className="button"
      >
        { state.winner === 'none' ? 'ATTACK!' : 'RESET' }
      </button>
      <Dice
        diceTop={state.monsterDiceTop}
        diceBottom={state.monsterDiceBottom}
      />
      <div className="monster-bar">
        <div style={{position:"absolute", width:7, height:monsterBarHeight, backgroundColor:monsterBarColor, right:7, bottom: 5}}/>
      </div>
      <div className="monster"/>
    </div>
  );
}

export default Board;