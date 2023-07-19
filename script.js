
    // Game variables
    const gridSize = 20;
    const gameBoardSize = 400;
    let snake = [{ x: 0, y: 0 }];
    let food = { x: 0, y: 0 };
    let dx = gridSize;
    let dy = 0;
    let score = 0;

    const gameBoard = document.getElementById("game-board");

    // Function to generate random coordinates for food
    function generateFood() {
      food.x = Math.floor(Math.random() * (gameBoardSize / gridSize)) * gridSize;
      food.y = Math.floor(Math.random() * (gameBoardSize / gridSize)) * gridSize;
    }

    // Function to draw the snake on the game board
    function drawSnake() {
      gameBoard.innerHTML = "";
      snake.forEach(segment => {
        const snakeElement = document.createElement("div");
        snakeElement.className = "snake";
        snakeElement.style.left = `${segment.x}px`;
        snakeElement.style.top = `${segment.y}px`;
        gameBoard.appendChild(snakeElement);
      });
    }

    // Function to draw the food on the game board
    function drawFood() {
      const foodElement = document.createElement("div");
      foodElement.className = "food";
      foodElement.style.left = `${food.x}px`;
      foodElement.style.top = `${food.y}px`;
      gameBoard.appendChild(foodElement);
    }

    // Function to handle game over
    function gameOver() {
      alert(`Game Over! Your score is ${score}`);
      resetGame();
    }

    // Function to reset the game
    function resetGame() {
      snake = [{ x: 0, y: 0 }];
      dx = gridSize;
      dy = 0;
      score = 0;
      generateFood();
    }

    // Function to update the game state
    function update() {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      // Check if the snake hits the wall or itself
      if (
        head.x < 0 ||
        head.x >= gameBoardSize ||
        head.y < 0 ||
        head.y >= gameBoardSize ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        return gameOver();
      }

      snake.unshift(head);

      // Check if the snake eats the food
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        generateFood();
      } else {
        snake.pop();
      }

      drawSnake();
      drawFood();

      setTimeout(update, 200);
    }

    // Function to handle keyboard input
    function handleKeydown(event) {
      if (event.key === "ArrowUp" && dy !== gridSize) {
        dx = 0;
        dy = -gridSize;
      } else if (event.key === "ArrowDown" && dy !== -gridSize) {
        dx = 0;
        dy = gridSize;
      } else if (event.key === "ArrowLeft" && dx !== gridSize) {
        dx = -gridSize;
        dy = 0;
      } else if (event.key === "ArrowRight" && dx !== -gridSize) {
        dx = gridSize;
        dy = 0;
      }
    }

    // Start the game
    generateFood();
    drawSnake();
    drawFood();
    update();

    // Event listener for keyboard input
    document.addEventListener("keydown", handleKeydown);
  