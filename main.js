//1. Storing the video in a variable:
video = "";
//8. Declare the status variable:
status = "";
//14. Declare the objects array to store the result of the objects detected:
objects = [];

function setup(){
    canvas = createCanvas(500, 350);
    canvas.center();
}

function preload(){
    //2. Loaded the video file inside the video variable:
    video = createVideo("video.mp4");
    video.hide();
}

function draw(){
    //3. Set the video on the canvas so we can see it on the webpage:
    image(video, 0, 0, 500, 350);
    //11. To check if the status is not an empty string:
    if(status != ""){
        objectDetector.detect(video, gotResult);

        //16. To add the info of the objects detected on the webpage: 
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected: " + objects.length;

            //17. To display the info of the name of the object:
            fill("purple");
            text(objects[i].label, objects[i].x, objects[i].y); 
            noFill();
            stroke("blue");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

//12. Function to check if we get a result from the recognition model:
function gotResult(error, results){
    //13. To check if we get an error from the recognition model:
    if(error){
        console.log(error);
    }
    console.log(results);
    //15. Store the results of the objects detected on the objects array:
    objects = results;
}

//4. Set the function for the start button:
function start(){
    //5. Starting the cocossd model:
    objectDetector = ml5.objectDetector("cocosd", modelLoaded);
}

//6. Declare the modelLoaded function:
function modelLoaded(){
    //7. Set a message on the console:
    console.log("Model loaded successfuly!");

    //9. Set status as true:
    status = true;
    //10. Set the properties of the video running:
    video.loop();
    video.speed(1);
    video.volume(0);
}