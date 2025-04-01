import React, { useState, useEffect } from 'react';

const Game = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [playerAnimating, setPlayerAnimating] = useState(false);
  const [computerAnimating, setComputerAnimating] = useState(false);

  const choices = ['📄', '🪨', '✂️'];

  const getRandomChoice = () => choices[Math.floor(Math.random() * choices.length)];

  const handleStart = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setPlayerAnimating(true);
    setComputerAnimating(true);

    let playerAnimationInterval;
    let computerAnimationInterval;

    const startAnimations = () => {
      playerAnimationInterval = setInterval(() => {
        setPlayerChoice(getRandomChoice());
      }, 100);

      computerAnimationInterval = setInterval(() => {
        setComputerChoice(getRandomChoice());
      }, 100);
    };

    startAnimations();

    setTimeout(() => {
      clearInterval(playerAnimationInterval);
      clearInterval(computerAnimationInterval);

      const finalPlayerChoice = getRandomChoice();
      const finalComputerChoice = getRandomChoice();

      setPlayerChoice(finalPlayerChoice);
      setComputerChoice(finalComputerChoice);
      setPlayerAnimating(false);
      setComputerAnimating(false);

      if (finalPlayerChoice === finalComputerChoice) {
        setResult('Tie!');
      } else if (
        (finalPlayerChoice === '📄' && finalComputerChoice === '🪨') ||
        (finalPlayerChoice === '🪨' && finalComputerChoice === '✂️') ||
        (finalPlayerChoice === '✂️' && finalComputerChoice === '📄')
      ) {
        setResult('You win!');
      } else {
        setResult('You lose!');
      }
    }, 2000);
  };

  return (
    <div>
      <h2>Paper Rock Scissors</h2>
      <button onClick={handleStart} disabled={playerAnimating}>
        {playerAnimating ? 'Thinking...' : 'Start'}
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <div>
          <h3>You</h3>
          {playerAnimating ? (
            <p>{getRandomChoice()}</p>
          ) : playerChoice ? (
            <p>{playerChoice}</p>
          ) : (
            <p>Waiting</p>
          )}
        </div>
        <div>
          <h3>Computer</h3>
          {computerAnimating ? (
            <p>{getRandomChoice()}</p>
          ) : computerChoice ? (
            <p>{computerChoice}</p>
          ) : (
            <p>Waiting</p>
          )}
        </div>
      </div>

      {result && <p>Result: {result}</p>}
    </div>
  );
};

export default Game;
