const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

// Set up the drawing color and line width
ctx.strokeStyle = 'black';
ctx.lineWidth = 2;

// Functions to start, draw, and stop drawing
function startDrawing(event) {
    drawing = true;
    // Begin drawing right when the mouse is clicked
    draw(event);
}

function stopDrawing() {
    drawing = false;
    // Start a new path for the next drawing
    ctx.beginPath();
}

function draw(event) {
    if (!drawing) return;

    ctx.lineCap = 'round';
    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

// Add event listeners to handle mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
// Stop drawing when the mouse leaves the canvas
canvas.addEventListener('mouseout', stopDrawing);

// Save the canvas as an image
var final_grayscaleData;

document.getElementById('saveButton').addEventListener('click', () => {
    const imgData = canvas.toDataURL('image/png');
    const img = new Image();
    img.src = imgData;
    document.body.appendChild(img);

    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = 28;
    resizedCanvas.height = 28;
    const resizedCtx = resizedCanvas.getContext('2d');

    resizedCtx.drawImage(canvas, 0, 0, 28, 28);

    const imageData = resizedCtx.getImageData(0, 0, 28, 28);
    const grayscaleData = [];
    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const gray = 0.3 * r + 0.59 * g + 0.11 * b;
        grayscaleData.push(gray / 255);
    }
    final_grayscaleData = grayscaleData;
});

// Loads the model


// Creates a Digit Recognition CNN with the input being the image
const model = tf.sequential();
model.add(tf.layers.conv2d({
    inputShape: [28, 28, 1], // Input shape for grayscale images
    filters: 32,
    kernelSize: 3,
    activation: 'relu'
}));
model.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));
model.add(tf.layers.conv2d({ filters: 64, kernelSize: 3, activation: 'relu' }));
model.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));
model.add(tf.layers.flatten());
model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
model.add(tf.layers.dense({ units: 10, activation: 'softmax' })); // 10 classes for digits 0-9

model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
});

// Prepares for prediction
const inputTensor = tf.tensor(final_grayscaleData, [1, 28, 28, 1]);
const prediction = model.predict(inputTensor);
const predictedClass = prediction.argMax(-1).dataSync()[0];

// Outputs this prediction
let quickdrawResult = document.querySelector('#quickdraw-result');
quickdrawResult.innerHTML = "Yay!";
console.log('Yay');
