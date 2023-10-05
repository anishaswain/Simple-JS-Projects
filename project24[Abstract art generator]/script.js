const canvas = document.getElementById('art-canvas');
const generateArtButton = document.getElementById('generate-art');
const ctx = canvas.getContext('2d');

generateArtButton.addEventListener('click', generateArt);

function generateArt() {
    const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#581845'];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 30 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = Math.random() < 0.5 ? 'circle' : 'rectangle';

        ctx.fillStyle = color;

        if (shape === 'circle') {
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillRect(x, y, size, size);
        }
    }
}

// Generate art on page load
generateArt();
