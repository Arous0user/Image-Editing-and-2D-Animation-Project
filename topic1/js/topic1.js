const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const brightnessInput = document.getElementById('brightness');
const contrastInput = document.getElementById('contrast');
const cropButton = document.getElementById('crop');
const resizeButton = document.getElementById('resize');
const saveJpegButton = document.getElementById('save-jpeg');
const savePngButton = document.getElementById('save-png');

const image = new Image();
image.crossOrigin = "Anonymous";
image.src = '/topic1/images/landscape.jpg';
image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
};

function applyFilters() {
    ctx.drawImage(image, 0, 0);
    const brightness = parseInt(brightnessInput.value);
    const contrast = parseInt(contrastInput.value);
    ctx.filter = `brightness(${100 + brightness}%) contrast(${100 + contrast}%)`;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

brightnessInput.addEventListener('input', applyFilters);
contrastInput.addEventListener('input', applyFilters);

cropButton.addEventListener('click', () => {
    // Simple crop to a fixed rectangle
    const croppedWidth = canvas.width * 0.8;
    const croppedHeight = canvas.height * 0.8;
    const croppedX = (canvas.width - croppedWidth) / 2;
    const croppedY = (canvas.height - croppedHeight) / 2;
    const croppedImageData = ctx.getImageData(croppedX, croppedY, croppedWidth, croppedHeight);
    canvas.width = croppedWidth;
    canvas.height = croppedHeight;
    ctx.putImageData(croppedImageData, 0, 0);
});

resizeButton.addEventListener('click', () => {
    // Simple resize to half the dimensions
    const newWidth = canvas.width / 2;
    const newHeight = canvas.height / 2;
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = newWidth;
    tempCanvas.height = newHeight;
    tempCtx.drawImage(canvas, 0, 0, newWidth, newHeight);
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(tempCanvas, 0, 0);
});

function download(format) {
    const link = document.createElement('a');
    link.download = `edited-image.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
}

saveJpegButton.addEventListener('click', () => download('jpeg'));
savePngButton.addEventListener('click', () => download('png'));
