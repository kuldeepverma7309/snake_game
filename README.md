# Snake Game

This is a simple Snake Game built using React. The game allows you to control a snake that moves around a grid, eating food to grow longer. The game includes start and stop buttons to control the game state.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Game Mechanics](#game-mechanics)
- [Components](#components)
- [State Management](#state-management)
- [Event Handling](#event-handling)
- [Styling](#styling)
- [Future Improvements](#future-improvements)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/snake-game.git
    cd snake-game
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

## Usage

- Use the arrow keys to control the direction of the snake.
- Click the "Start" button to begin the game.
- Click the "Stop" button to pause the game.
- The snake will grow longer each time it eats the food.
- The game will reset if the snake collides with itself.

## Game Mechanics

### Grid

The game grid is a 12x12 matrix represented as a 2D array. Each cell in the grid can be empty, occupied by the snake, or contain food.

### Snake

The snake is represented as an array of coordinates. The head of the snake is the first element in the array, and the tail is the last element. The snake moves by adding a new head in the direction of movement and removing the tail unless it has just eaten food.

### Food

Food is randomly placed on the grid. When the snake eats the food, the food is relocated to a new random position, and the snake grows longer.

## Components

### App Component

The `App` component is the main component of the game. It manages the state of the game, handles user input, and renders the grid, snake, and food.

### Grid

The grid is rendered as a series of `div` elements arranged in a 12x12 grid. Each cell is styled based on whether it is empty, occupied by the snake, or contains food.

## State Management

The game state is managed using React's `useState` and `useRef` hooks.

- `snakeCordinates`: An array of coordinates representing the snake's position.
- `food`: An array representing the position of the food.
- `score`: The player's score.
- `isRunning`: A boolean indicating whether the game is running.
- `directionRef`: A ref to store the current direction of the snake.

## Event Handling

### Keyboard Input

The `handleKeyDown` function listens for arrow key presses and updates the direction of the snake accordingly.

### Start and Stop Buttons

The `startGame` and `stopGame` functions control the `isRunning` state, which starts and stops the game.

### Snake Movement

The `moveSnake` function updates the snake's position based on the current direction. It also checks for collisions with the walls, the snake itself, and food.

## Styling

The game is styled using Tailwind CSS. The grid, snake, and food are styled with different background colors to distinguish them.

### Example Styles

- Snake: `bg-green-500 rounded`
- Food: `bg-red-700 rounded-lg`
- Empty Cell: `bg-gray-500`

## Future Improvements

- Add levels with increasing difficulty.
- Implement a high score feature.
- Add sound effects and animations.
- Improve the mobile responsiveness of the game.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This project was inspired by the classic Snake game.
- Built with React and Tailwind CSS.