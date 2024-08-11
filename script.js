
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


function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}


function changeBackgroundColor() {
    document.body.style.backgroundColor = getRandomColor();
}

setInterval(changeBackgroundColor, 5000);
