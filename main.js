status = "";
objects=[];
song="";

function preload()
{
    song=loadSound("alarm.wav");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status = Detecting objects";
}

function modelLoaded() {
    console.log("modelLoaded");
    status = true
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    }

    console.log(result);
    objects = result;
}

function draw() 
{
    image(video ,0 , 0 , 380 , 380);

    if (status != "") 
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) 
        {
            
            document.getElementById("status").innerHTML = "Status = Objects detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x+10, objects[i].y+20);
            noFill()
            stroke(r,g,b);
            rect( objects[i].x , objects[i].y , objects[i].width , objects[i].height );
            if(objects[0].label=="person")
    {
        document.getElementById("result").innerHTML = "Baby Found";
    }
    else
    {
        document.getElementById("result").innerhtml = "Baby not found";
        song.play()
    }
        }
    }

}