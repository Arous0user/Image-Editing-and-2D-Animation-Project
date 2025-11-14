const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const ball = {
    x: canvas.width / 2,
    y: 50,
    radius: 25,
    yVelocity: 0,
    gravity: 0.5,
    bounce: 0.9,
    squash: 1,
    targetSquash: 1,
};

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update velocity and position
    ball.yVelocity += ball.gravity;
    ball.y += ball.yVelocity;

    // Gradually return to normal shape
    ball.squash += (ball.targetSquash - ball.squash) * 0.2;

    // Set target squash based on velocity
    ball.targetSquash = 1 + Math.abs(ball.yVelocity) / 20;

    // Bounce off the ground
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.yVelocity *= -ball.bounce;
        ball.targetSquash = 1.5; // Exaggerate squash on impact
    }

    // Draw the ball
    ctx.beginPath();
    ctx.ellipse(
        ball.x,
        ball.y,
        ball.radius * ball.squash,
        ball.radius / ball.squash,
        0,
        0,
        Math.PI * 2
    );
    ctx.fillStyle = '#ffc107';
    ctx.fill();
    ctx.closePath();
}

animate();
