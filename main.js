rise_up_song = "";
faded_song = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
leftWristScore = 0;
rightWristScore = 0;
faded = "";
rise_up = "";

function setup(){
    canvas = createCanvas(600, 530);
    canvas.position(325, 150);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload(){
    rise_up_song = loadSound("TheFatRat.mp3");
    faded_song = loadSound("Faded.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    faded = faded_song.isPlaying();
    console.log(faded);

    rise_up = rise_up_song.isPlaying();
    console.log(rise_up);

    if(leftWristScore > 0.2){
        circle(leftWristX,leftWristY,20);
        rise_up_song.stop();
        if(faded == false){
            faded_song.play();
        }
        else{
            console.log("Song Name : Faded");
            document.getElementById("song_name").innerHTML = "Song Name : Faded";
        }
    }

    if(rightWristScore > 0.2){
        circle(rightWristX,rightWristY,20);
        faded_song.stop();
        if(rise_up == false){
            rise_up_song.play();
        }
        else{
            console.log("Song Name : Rise Up");
            document.getElementById("song_name").innerHTML = "Song Name : Rise Up";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristScore = results[0].pose.keypoints[9].score;
        console.log(leftWristScore);

        rightWristScore = results[0].pose.keypoints[10].score;
        console.log(rightWristScore);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
    }
}