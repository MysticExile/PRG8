const video = document.getElementById("webcam");
const label = document.getElementById("label");

const labelOneBtn = document.querySelector("#Cat");
const labelTwoBtn = document.querySelector("#Dog");
const labelThreeBtn = document.querySelector("#Classify");
const trainbtn = document.querySelector("#train");
const savebtn = document.querySelector("#save");


// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);
// Create a new classifier using those features and with a video element
const classifier = featureExtractor.classification(video, videoReady);

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({video: true})
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}

label.innerText = "Ready when you are!";

// Extractor
// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
    labelOneBtn.addEventListener("click", () => addCat());
    labelTwoBtn.addEventListener("click", () => addDog());
    labelThreeBtn.addEventListener("click", () => classify());
    savebtn.addEventListener("click", () => save());
    trainbtn.addEventListener("click", () => train());
}

// Triggers when the video is ready
function videoReady() {
    console.log('The video is ready!');
}

// Add a new image with a label
function addCat() {
    classifier.addImage(video, 'cat');
    console.log('cat');
}

// Add a new image with a label
function addDog() {
    classifier.addImage(video, 'dog');
    console.log('dog');
}

// // Retrain the network
function train() {
    classifier.train((lossValue) => {
        console.log('Loss is', lossValue)
    });
}

//saves model
function save() {
    featureExtractor.save();
}

//loads model
function load() {
    featureExtractor.load(filesOrPath = null, callback);
}


// Get a prediction for that image
classifier.classify(document.getElementById('image'), (err, result) => {
    console.log(result); // Should output 'cat or dog'
});

//classifies image
function classify() {
    classifier.classify(document.getElementById('webcam'), (err, result) => {
        console.log(result); // Should output 'Cat'
        label.innerText = result[0].label + result[0].confidence;
    });
}

//allows files for input
const image = document.getElementById('output')
const fileButton = document.querySelector("#file")

fileButton.addEventListener("change", (event) => {
    image.src = URL.createObjectURL(event.target.files[0])
})

image.addEventListener('load', () => userImageUploaded())

function userImageUploaded() {
    console.log("The image is now visible in the DOM")
}




