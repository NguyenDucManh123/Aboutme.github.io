// Array of colors excluding black and white
const colors = [
    "#FF5733", // Red-Orange
    "#33FF57", // Green
    "#3357FF", // Blue
    "#F0F33F", // Yellow
    "#F33F9C", // Pink
    "#9CFF33", // Lime Green
    "#33F3FF", // Cyan
    "#F33F3F"  // Red
];

// Function to get a random color from the array
function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// Function to change the background color every 5 seconds
function changeBackgroundColor() {
    document.body.style.backgroundColor = getRandomColor();
}

// Change the background color every 5 seconds (5000 milliseconds)
setInterval(changeBackgroundColor, 5000);

document.addEventListener('DOMContentLoaded', function() {
    const introEducationWrapper = document.getElementById('intro-education-wrapper');
    const blackBoard = document.getElementById('black-board');
    const closeButton = document.getElementById('close-button');
    const introButton = document.getElementById('intro-button');
    const gamesButton = document.getElementById('games-button');
    const targetArea = document.getElementById('target-area');
    const gameMessage = document.getElementById('game-message');
    const replayPrompt = document.getElementById('replay-prompt');
    const replayButton = document.getElementById('replay-button');
    const stopButton = document.getElementById('stop-button');
    
    let isBlackBoardVisible = false;
    let gameStarted = false;
    let gameTimer;
    let gameTime = 9000; // Initial time in milliseconds (9 seconds)
    let hitCount = 0;
    const maxHits = 8;
    let cooldownTimer;
    let targetCooldown = 500; // Cooldown period in milliseconds between target spawns

    function showBlackBoard() {
        if (!isBlackBoardVisible) {
            introEducationWrapper.style.opacity = 0;
            setTimeout(() => {
                introEducationWrapper.style.display = 'none';
                blackBoard.classList.add('show');
                isBlackBoardVisible = true;
                startGame(); // Start the game when the black board is shown
            }, 500); // Wait for fade-out to complete
        }
    }
    
    function showContent() {
        if (isBlackBoardVisible) {
            blackBoard.classList.remove('show');
            setTimeout(() => {
                introEducationWrapper.style.display = 'flex';
                introEducationWrapper.style.opacity = 1;
                isBlackBoardVisible = false;
                stopGame(); // Stop the game when returning to content
            }, 500); // Wait for fade-in effect to complete
        }
    }
    
    function startGame() {
        gameStarted = true;
        hitCount = 0; // Reset hit count
        gameTime = 9000; // Reset time to 9 seconds
        gameMessage.textContent = 'Kéo chuột vào ô màu xanh lá!';
        targetArea.style.display = 'block';
        randomizeTargetArea(); // Randomize target area position
        updateGameTimer(); // Start updating the game timer
        replayPrompt.style.display = 'none'; // Ensure replay prompt is hidden
    }
    
    function stopGame() {
        clearInterval(gameTimer);
        clearTimeout(cooldownTimer); // Stop cooldown timer
        targetArea.style.display = 'none';
        gameStarted = false;
    }
    
    function updateGameTimer() {
        const gameInterval = 1000; // Interval in milliseconds (1 second)
        let elapsedTime = 0;
        
        gameTimer = setInterval(() => {
            elapsedTime += gameInterval;
            const remainingTime = gameTime - elapsedTime;
            
            if (remainingTime <= 0) {
                gameMessage.textContent = 'Thời gian đã hết, bạn đã thua!';
                targetArea.style.display = 'none'; // Ensure target is hidden
                showReplayPrompt(); // Show replay prompt on failure
                stopGame(); // Stop the game
            } else {
                // Update the message based on remaining time
                let secondsLeft = Math.ceil(remainingTime / 1000);
                gameMessage.textContent = `Kéo chuột vào ô màu xanh lá trong ${secondsLeft} giây!`;
                // Reduce game time for next round
                gameTime = Math.max(gameTime - 500, 2000); // Ensure minimum game time is 2 seconds
            }
        }, gameInterval);
    }
    
    function randomizeTargetArea() {
        const gameArea = document.querySelector('.game-area');
        const gameAreaWidth = gameArea.clientWidth;
        const gameAreaHeight = gameArea.clientHeight;
        const targetWidth = targetArea.clientWidth;
        const targetHeight = targetArea.clientHeight;
        
        const maxX = gameAreaWidth - targetWidth;
        const maxY = gameAreaHeight - targetHeight;
        
        // Random position within the game area
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        targetArea.style.left = `${randomX}px`;
        targetArea.style.top = `${randomY}px`;
        
        // Start cooldown timer for the next target spawn
        cooldownTimer = setTimeout(() => {
            if (gameStarted) {
                randomizeTargetArea(); // Move target to a new location after cooldown
            }
        }, targetCooldown); // Cooldown period in milliseconds
    }
    
    function showReplayPrompt() {
        replayPrompt.style.display = 'block';
    }
    
    function hideReplayPrompt() {
        replayPrompt.style.display = 'none';
    }
    
    function resetGame() {
        hideReplayPrompt();
        startGame(); // Restart the game
    }
    
    function winGame() {
        gameMessage.textContent = 'Chúc mừng! Bạn đã thắng';
        targetArea.style.display = 'none'; // Ensure target is hidden
        showReplayPrompt(); // Show replay prompt on success
        stopGame(); // Stop the game
    }
    
    // Handle "Giới thiệu về bản thân" button click
    introButton.addEventListener('click', function(e) {
        e.preventDefault();
        showContent();
    });
    
    // Handle "Trò chơi" button click
    gamesButton.addEventListener('click', function(e) {
        e.preventDefault();
        showBlackBoard();
    });
    
    // Handle close button click
    closeButton.addEventListener('click', function() {
        showContent();
    });
    
    // Handle mouse enter event for the game
    targetArea.addEventListener('mouseenter', function() {
        if (gameStarted) {
            hitCount += 1; // Increment hit count
            if (hitCount >= maxHits) {
                winGame();
            } else {
                gameMessage.textContent = `Hit count: ${hitCount}. Hãy cố gắng!`;
                randomizeTargetArea(); // Randomize target area position after each hit
            }
        }
    });
    
    // Handle replay button click
    replayButton.addEventListener('click', function() {
        resetGame();
    });
    
    // Handle stop button click
    stopButton.addEventListener('click', function() {
        hideReplayPrompt();
        showContent(); // Hide the game and show the original content
    });
});
