let mobilenet;
let puffin;

function modelLoaded() {
    print('Model is Loaded !');
    mobilenet.classify(puffin, gotResults);
}

function gotResults(error, results){
    if(error) {
        console.error(error);
    } else {
        print(results);

        let label = results[0].label;
        let probability = (results[0].confidence * 100).toFixed(2);
        createP(`${label} : ${probability}%`);
    }
}

function imageReady() {
    image(puffin, 0, 0, width, height);
}

function setup() {
    createCanvas(640, 480);
    background(200);
    puffin = loadImage('assets/images/puffin.jpg', imageReady);
    mobilenet = ml5.imageClassifier('MobileNet', modelLoaded);
}