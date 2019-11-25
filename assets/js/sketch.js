let mobilenet;
let video;
let label;

function modelLoaded() {
    print('Model is Loaded !');
    mobilenet.classify(gotResults);
}

function gotResults(error, results){
    if(error) {
        console.error(error);
    } else {
        // print(results);

        // for (let i = 0; i < results.length; i++) {
        //     label = results[i].label;
        //     let probability = (results[i].confidence * 100).toFixed(2);
        //     createP(`${label} : ${probability}%`);
        // }
        label = results[0].label;
        mobilenet.classify(gotResults);
    }
}

// function imageReady() {
//     image(puffin, 0, 0, width, height);
// }

function setup() {
    createCanvas(640, 510);
    background(200);
    video = createCapture(VIDEO)
    video.hide();
    mobilenet = ml5.imageClassifier('MobileNet', video, modelLoaded);
}

function draw() {
    background(0);
    image(video, 0, 0);
    fill(255);
    textSize(16);
    text(label, 10, height - 10);
}