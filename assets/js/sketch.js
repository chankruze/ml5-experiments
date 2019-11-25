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

        for (let i = 0; i < results.length; i++) {
            let label = results[i].label;
            let probability = (results[i].confidence * 100).toFixed(2);
            createP(`${label} : ${probability}%`);
        }
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