let mobilenet;
let video;
let label;
let classifier;
let happyButton;
let sadButton;
let trainButton;

function modelReady() {
    print('Model is Ready !');
    // mobilenet.classify(gotResults);
}

function videoReady() {
    print('Video is Ready !');
}

function whileTraining(loss) {
    if (loss == null) {
        print('Training complete');

        classifier.classify(gotResults);
    } else {
        print(loss);
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        // print(results);
        label = results[0].label;
        mobilenet.classify(gotResults);
    }
}

function setup() {
    createCanvas(640, 510);
    background(200);
    video = createCapture(VIDEO)
    video.hide();
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video, videoReady);

    happyButton = createButton('chandan');
    happyButton.mousePressed(() => {
        classifier.addImage('happy');
    });

    sadButton = createButton('phone');
    sadButton.mousePressed(() => {
        classifier.addImage('sad');
    });

    trainButton = createButton('Train');
    trainButton.mousePressed(() => {
        classifier.train(whileTraining);
    });
}

function draw() {
    background(0);
    image(video, 0, 0);
    fill(255);
    textSize(16);
    text(label, 10, height - 10);
}