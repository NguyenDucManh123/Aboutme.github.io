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
