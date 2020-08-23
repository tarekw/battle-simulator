import './dice.css';
import React from 'react';
import PropTypes from 'prop-types';

const Dice = ({diceTop, diceBottom}) => (
  <div>
    <div className={`dice-${diceTop}`}/>
    <div className={`dice-${diceBottom}`}/>
  </div>
);

Dice.propTypes = {
  diceTop: PropTypes.number.isRequired,
  diceBottom: PropTypes.number.isRequired
}

export default Dice;