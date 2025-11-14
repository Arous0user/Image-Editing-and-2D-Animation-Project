const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const exportGifButton = document.getElementById('export-gif');

const character = {
    head: { x: 100, y: 80, radius: 40, color: '#ffc107' },
    body: { x: 80, y: 120, width: 40, height: 80, color: '#03a9f4' },
    arm: { x: 120, y: 140, width: 40, height: 10, color: '#ffc107' }
};

let frame = 0;
let frameCounter = 0;
const frameDelay = 10; // run animation every 10 screen frames
const waveFrames = [0, -10, -20, -10];

function drawCharacter(armAngle) {
    // Body
    ctx.fillStyle = character.body.color;
    ctx.fillRect(character.body.x, character.body.y, character.body.width, character.body.height);

    // Head
    ctx.fillStyle = character.head.color;
    ctx.beginPath();
    ctx.arc(character.head.x, character.head.y, character.head.radius, 0, Math.PI * 2);
    ctx.fill();

    // Arm
    ctx.save();
    ctx.translate(character.arm.x, character.arm.y);
    ctx.rotate(armAngle * Math.PI / 180);
    ctx.fillStyle = character.arm.color;
    // Draw arm so it rotates around its end
    ctx.fillRect(0, -character.arm.height / 2, character.arm.width, character.arm.height);
    ctx.restore();
}

function animate() {
    requestAnimationFrame(animate);
    
    frameCounter++;
    if (frameCounter < frameDelay) {
        return;
    }
    frameCounter = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacter(waveFrames[frame]);
    frame = (frame + 1) % waveFrames.length;
}

animate();

exportGifButton.addEventListener('click', () => {
    console.log('Export button clicked. Starting GIF creation...');
    try {
        const gif = new GIF({
            workers: 2,
            quality: 10,
            width: canvas.width,
            height: canvas.height,
            workerScript: '/topic5/js/gif.worker.js'
        });

        // Add frames to the GIF
        for (let i = 0; i < waveFrames.length; i++) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCharacter(waveFrames[i]);
            gif.addFrame(ctx, { copy: true, delay: 150 });
        }

        gif.on('progress', (p) => {
            console.log('GIF creation progress:', p);
        });

        gif.on('finished', (blob) => {
            console.log('GIF finished. Creating download link.');
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'waving-character.gif';
            link.click();
        });

        console.log('Starting GIF render...');
        gif.render();

    } catch (e) {
        console.error('An error occurred during GIF creation:', e);
    }
});
