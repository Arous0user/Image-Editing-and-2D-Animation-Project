const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const statusDiv = document.getElementById('status');

const image = new Image();
image.crossOrigin = "Anonymous";
image.src = '/topic3/images/portrait.jpg';

let sourceX, sourceY;
let sourceSelected = false;

image.onload = () => {
    // Clear canvas and draw the image scaled to fit
    const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
    const scaledWidth = image.width * scale;
    const scaledHeight = image.height * scale;
    const x = (canvas.width - scaledWidth) / 2;
    const y = (canvas.height - scaledHeight) / 2;
    ctx.drawImage(image, x, y, scaledWidth, scaledHeight);
};

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (e.altKey) {
        // Alt+Click: Set the source point
        sourceX = x;
        sourceY = y;
        sourceSelected = true;
        statusDiv.textContent = 'Source point selected. Click on a blemish to clone.';
        
    } else if (sourceSelected) {
        // Click: Perform the clone operation
        const radius = 10;
        const diameter = radius * 2;

        // Get the pixel data from the source point
        const sourceData = ctx.getImageData(sourceX - radius, sourceY - radius, diameter, diameter);

        // Put the pixel data at the destination point
        ctx.putImageData(sourceData, x - radius, y - radius);
    } else {
        statusDiv.textContent = 'Please select a source point first by holding Alt and clicking.';
    }
});