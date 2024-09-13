import React, { useState, useEffect, useRef } from 'react';

const GRID_SIZE = 12;
const GRID = Array.from({ length: GRID_SIZE }, () => new Array(GRID_SIZE).fill(0));
const INITIAL_SNAKE = [Math.floor(GRID_SIZE / 2), Math.floor(GRID_SIZE / 2)];

const App = () => {

  const generateFood = () => {
    let x = Math.floor(Math.random() * GRID_SIZE);
    let y = Math.floor(Math.random() * GRID_SIZE);
    let isOverlap = snakeCordinates.some(([snakeX, snakeY]) => snakeX === x && snakeY === y);
    while (isOverlap) {
      x = Math.floor(Math.random() * GRID_SIZE);
      y = Math.floor(Math.random() * GRID_SIZE);
      isOverlap = snakeCordinates.some(([snakeX, snakeY]) => snakeX === x && snakeY === y);
    }
    return [x, y];
  };

  const [score, setScore] = useState(0);
  const [snakeCordinates, setSnakeCordinates] = useState([INITIAL_SNAKE]);
  const [food, setFood] = useState(generateFood());
  const [isRunning, setIsRunning] = useState(false);
  const directionRef = useRef('TOP');
  const intervalRef = useRef(null);
  const speedRef = useRef(600);

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === 'ArrowUp' && directionRef.current !== 'BOTTOM') {
      directionRef.current = 'TOP';
    } else if (key === 'ArrowDown' && directionRef.current !== 'TOP') {
      directionRef.current = 'BOTTOM';
    } else if (key === 'ArrowLeft' && directionRef.current !== 'RIGHT') {
      directionRef.current = 'LEFT';
    } else if (key === 'ArrowRight' && directionRef.current !== 'LEFT') {
      directionRef.current = 'RIGHT';
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSnakeCordinates((snakeCordinates) => moveSnake(snakeCordinates, directionRef.current));
      }, speedRef.current);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, snakeCordinates]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const moveSnake = (snakeCordinates, direction) => {
    const [headX, headY] = snakeCordinates[0];
    let newHead;

    if (direction === 'TOP') {
      newHead = [headX - 1, headY];
    } else if (direction === 'BOTTOM') {
      newHead = [headX + 1, headY];
    } else if (direction === 'LEFT') {
      newHead = [headX, headY - 1];
    } else if (direction === 'RIGHT') {
      newHead = [headX, headY + 1];
    }

    // When snake hits the wall, it will appear from the opposite wall
    if (newHead[0] < 0) {
      newHead[0] = GRID_SIZE - 1;
    }
    if (newHead[0] >= GRID_SIZE) {
      newHead[0] = 0;
    }
    if (newHead[1] < 0) {
      newHead[1] = GRID_SIZE - 1;
    }
    if (newHead[1] >= GRID_SIZE) {
      newHead[1] = 0;
    }

    let newSnake = [newHead, ...snakeCordinates];

    // Check if the snake collides with itself
    let isOverlap = newSnake.slice(1).some(([x, y]) => x === newHead[0] && y === newHead[1]);
    if (isOverlap) {
      setSnakeCordinates([INITIAL_SNAKE]);
      setScore(0);
      setFood(generateFood());
      speedRef.current = 600;
      stopGame()
      alert(`Game Over! Your score is ${score}`);
      return [INITIAL_SNAKE];
    }

    // Check if the snake eats the food
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood(generateFood()); // Update food state
      setScore((score) => score + 1);
      if(score % 5 === 0){
        speedRef.current -= 50;
      }
    } else {
      newSnake.pop(); // Remove the tail if no food is eaten
    }

    return newSnake;
  };

  const startGame = () => {
    setIsRunning(true);
  };

  const stopGame = () => {
    setIsRunning(false);
  };

  return (
    <div className='w-[100vw] h-[100vh] bg-slate-800 flex flex-col justify-center items-center'>
      <div className='grid grid-cols-12'>
        {GRID.map((row, rowIndex) => (
          row.map((col, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-8 h-8 ${snakeCordinates.some(([x, y]) => x === rowIndex && y === colIndex) ? 'bg-green-500 rounded' : 'bg-gray-500'} ${
                food[0] === rowIndex && food[1] === colIndex ? 'bg-red-700 rounded-lg' : ''
              }`}
            ></div>
          ))
        ))}
      </div>
      <div className='absolute top-0 right-[50%] translate-x-[50%] p-4 text-white'>
        <h1>Score: {score}</h1>
      </div>
      <div className='mt-4'>
        <button onClick={startGame} className='bg-green-500 text-white px-4 py-2 rounded mr-2'>Start</button>
        <button onClick={stopGame} className='bg-red-500 text-white px-4 py-2 rounded'>Stop</button>
      </div>
    </div>
  );
};

export default App;