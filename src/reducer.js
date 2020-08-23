import * as constants from './constants'

const initialState = {
  hitFor: 'none',
  winner: 'none',
  damage: 0,
  playerPoints: 100,
  monsterPoints: 100,
  playerDiceTop: 1,
  playerDiceBottom: 1,
  monsterDiceTop: 1,
  monsterDiceBottom: 1
}

const getRandomInt = max => {
  return Math.ceil(Math.random() * Math.floor(max));
}

const getBarColor = points => {
  return points > 70 ? 'lime' : points > 30 ? 'orange' : 'red';
}

const getTurnData = () => {
  const playerDiceTop = getRandomInt(6);
  const playerDiceBottom = getRandomInt(6);
  const monsterDiceTop = getRandomInt(6);
  const monsterDiceBottom = getRandomInt(6);

  const playerScore = playerDiceTop + playerDiceBottom;
  const monsterScore = monsterDiceTop + monsterDiceBottom;
  return {
    playerDiceTop,
    playerDiceBottom,
    monsterDiceTop,
    monsterDiceBottom,
    playerScore,
    monsterScore
  }
}

const attack = state => {
  let damage = 0;
  let turnData = {}

  while (damage === 0) {
    turnData = getTurnData();
    damage = Math.abs(turnData.playerScore - turnData.monsterScore);
  }

  let newState = {
    ...state,
    damage,
    playerDiceTop: turnData.playerDiceTop,
    playerDiceBottom: turnData.playerDiceBottom,
    monsterDiceTop: turnData.monsterDiceTop,
    monsterDiceBottom: turnData.monsterDiceBottom
  }

  if (turnData.playerScore > turnData.monsterScore) {
    if (state.monsterPoints - damage <= 0) {
      return {
        ...state,
        monsterPoints: 0,
        winner: constants.PLAYER,
      }
    } else {
      return {
        ...newState,
        hitFor: constants.PLAYER,
        monsterPoints: state.monsterPoints - damage
      }
    }
  } else {
    if (state.playerPoints - damage <= 0) {
      return {
        ...state,
        playerPoints: 0,
        winner: constants.MONSTER
      }
    } else {
      return {
        ...newState,
        hitFor: constants.MONSTER,
        playerPoints: state.playerPoints - damage
      }
    }
  }
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'attack':
      return attack(state);
    case 'reset':
      return { ...initialState }
    default:
      throw new Error();
  }
}

export {
  reducer as default,
  attack,
  initialState,
  getBarColor,
}