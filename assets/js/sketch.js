let mobilenet;
let video;
let value = 0;
let regressor;
let AddButton;
let trainButton;
let slider;

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

        regressor.predict(gotResults);
    } else {
        print(loss);
    }
}

function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        // print(results);
        value = result.value;
        regressor.predict(gotResults);
    }
}

function setup() {
    createCanvas(640, 510);
    background(200);
    video = createCapture(VIDEO)
    video.hide();
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    regressor = mobilenet.regression(video, videoReady);

    slider = createSlider(0, 1, 0.5, 0.01);

    AddButton = createButton('Add Image');
    AddButton.mousePressed(() => {
        regressor.addImage(slider.value());
    });

    trainButton = createButton('Train');
    trainButton.mousePressed(() => {
        regressor.train(whileTraining);
    });
}

function draw() {
    background(0);
    image(video, 0, 0);

    rectMode(CENTER);
    fill(255, 0, 200);
    rect(value*width, height / 2, 50, 50);

    fill(255);
    textSize(16);
    text(value, 10, height - 10);
}