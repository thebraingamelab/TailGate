jsPsych.plugins['tailgate'] = (function(){

        var plugin = {};

        plugin.info = {
            name: 'tailgate',
            parameters: { //put variables in here that want to change like numberOfLanes, pattern, speed, numOfCops...
                numberOfLanes: {
                    type: jsPsych.plugins.parameterType.INT,
                    default: 4
                },
                truckV: {
                    type: jsPsych.plugins.parameterType.FLOAT,
                    default: 1
                },
                numOfCops: { //number of waves
                    type: jsPsych.plugins.parameterType.INT,
                    default: 12
                },
                copPattern: { //number of waves
                    type: jsPsych.plugins.parameterType.INT,
                    array: true,
                    default: undefined
                }
            }
        };

        plugin.trial = function(display_element, trial) {

        display_element.innerHTML = "<div id='frame'> <div id = 'container'> <img id = 'Fbox' class = 'laneBox' src = 'assets/F.svg' alt = 'F'> <img id = 'Gbox' class = 'laneBox' src = 'assets/G.svg' alt = 'G'> <img id = 'Hbox' class = 'laneBox' src = 'assets/H.svg' alt = 'H'> <img id = 'Jbox' class = 'laneBox' src = 'assets/J.svg' alt = 'J'> <img id = 'Kbox' class = 'laneBox' src = 'assets/K.svg' alt = 'K'> <img id = 'Lbox' class = 'laneBox' src = 'assets/L.svg' alt = 'L'> <img id = 'redSquare1' class = 'redSquare' src = 'assets/thin-blue-line-png-15.png' alt = 'Red Square 1'> <img id = 'redSquare2' class = 'redSquare' src = 'assets/thin-blue-line-png-15.png' alt = 'Red Square 2'> <img id = 'redSquare3' class = 'redSquare' src = 'assets/thin-blue-line-png-15.png' alt = 'Red Square 3'> <img id = 'redSquare4' class = 'redSquare' src = 'assets/thin-blue-line-png-15.png' alt = 'Red Square 4'> <img id = 'redSquare5' class = 'redSquare' src = 'assets/thin-blue-line-png-15.png' alt = 'Red Square 5'> <img id = 'redSquare6' class = 'redSquare' src = 'assets/thin-blue-line-png-15.png' alt = 'Red Square 6'> <img id = 'laneBound1' src = 'assets/yellowline.png' alt = 'Yellow Line'> <img id = 'laneBound2' src = 'assets/yellowline.png' alt = 'Yellow Line'> <img id = 'policeCar1' class = 'policeCar' src = 'assets/truck.svg' alt = 'Truck Lane 1'> <img id = 'policeCar2' class = 'policeCar' src = 'assets/truck.svg' alt = 'Truck Lane 2'> <img id = 'policeCar3' class = 'policeCar' src = 'assets/truck.svg' alt = 'Truck Lane 3'> <img id = 'policeCar4' class = 'policeCar' src = 'assets/truck.svg' alt = 'Truck Lane 4'> <img id = 'policeCar5' class = 'policeCar' src = 'assets/truck.svg' alt = 'Truck Lane 5'> <img id = 'policeCar6' class = 'policeCar' src = 'assets/truck.svg' alt = 'Truck Lane 6'> <img id = 'sportsCar' src = 'assets/car.svg' alt = 'Player'> <div id = 'roadLine1' class = 'roadLine'></div> <div id = 'roadLine2' class = 'roadLine'></div> <div id = 'roadLine3' class = 'roadLine'></div> <div id = 'roadLine4' class = 'roadLine'></div> <div id = 'roadLine5' class = 'roadLine'></div> <div id = 'infoBarImageContainer'> <span id = 'Time'></span> <span id= 'Trucks'></span> </div> </div> </div>";

        const canvas = document.getElementById('container'); //div element
        // const context = canvas.getContext('2d');

        /*window.addEventListener('touchstart', moveTouch, {passive: true});*/

        const laneBound1 = document.getElementById('laneBound1');
        const laneBound2 = document.getElementById('laneBound2');

        const policeCar1 = document.getElementById('policeCar1');
        const policeCar2 = document.getElementById('policeCar2');
        const policeCar3 = document.getElementById('policeCar3');
        const policeCar4 = document.getElementById('policeCar4');
        const policeCar5 = document.getElementById('policeCar5');
        const policeCar6 = document.getElementById('policeCar6');

        const Fbox = document.getElementById('Fbox');
        const Gbox = document.getElementById('Gbox');
        const Hbox = document.getElementById('Hbox');
        const Jbox = document.getElementById('Jbox');
        const Kbox = document.getElementById('Kbox');
        const Lbox = document.getElementById('Lbox');

        const redBox1 = document.getElementById('redSquare1');
        const redBox2 = document.getElementById('redSquare2');
        const redBox3 = document.getElementById('redSquare3');
        const redBox4 = document.getElementById('redSquare4');
        const redBox5 = document.getElementById('redSquare5');
        const redBox6 = document.getElementById('redSquare6');

        const roadLine1 = document.getElementById('roadLine1');
        const roadLine2 = document.getElementById('roadLine2');
        const roadLine3 = document.getElementById('roadLine3');
        const roadLine4 = document.getElementById('roadLine4');
        const roadLine5 = document.getElementById('roadLine5');

        const infoBarImageContainer = document.getElementById('infoBarImageContainer');

        const sportsCar = document.getElementById('sportsCar');

//--------Global Variables----------
//canvas.style.height = (window.innerHeight) + 'px';
        var numberOfLanes = 6;

        var laneOffset;
        var truckOffset;

        var firstLaneXPos;
        var secondLaneXPos;
        var thirdLaneXPos;
        var fourthLaneXPos;
        var fifthLaneXPos;
        var sixthLaneXPos;

        var currentPlayerXPos; //the x coord the player is currently at

//-------------------------------------------------

        var height = canvas.clientHeight;
        var width = canvas.clientWidth;

        //if width is greater than height: landscape
        //if height is greater than width: height
        //if orientation is true, then it is landscape mode
        //if orientation is false, then it is portrait mode
        var orientation = findOrientation();

        var carOffset = .225 * height; //22.5 percent of context height

//Sounds
        var truckSound = new Audio('assets/Truck Drive.mp3');
        truckSound.volume = .7;
        truckSound.playbackRate = 2;

        var crashSound = new Audio('assets/car_brake_crash.mp3');
        crashSound.volume = .2;
        crashSound.playbackRate = 1.5;

        var emptyLane = 1; //the correct lane user has to input, game starts with first lane empty
        var currentLanePos = 3; //current lane the car player is at, game starts with car at lane 3


        var copPattern = [emptyLane]; //the pattern of empty cop lanes

        var iterator = 0;
        var numCops = 12; //how many waves of cops will come

//variables for game timer
        var time = 0;

        var timerRunning = true; //when game starts, set to true
        const goalTime = 1800; //complete the game within this many milliseconds

//variables for cop timing animation
        var copYPos = 5; //y coordinate of where the cop cars are aligned 5% of the height of canvas
        var initialCopYPos = copYPos; //is not changed

//if user is allowed to hit enter to start game
        var startGameBool = true;

//when the game accepts user input, set to true
        var acceptUserInput = false;

//when the user gives correct answer, set to true
        var correctInputGiven = false;

//when the user gives incorrect answer, set to true
        var wrongInputGiven = false;

//carV - truckV is the speed the trucks are moving
//truckV stays at 1 percent movement
//carV is changed throughout animation to simulate braking

        var carV = 1; // 1 percent
        var truckV = 1; // 1 percent

        var newPos;

//animation variables
        var right = false;
        var left = false;

        var startTruckAnimation = false;

        var startNewWave = false;
        var redrawTrucks = false;
        var continueDrawingTrucks = false;

//handles different truck accelerations
        var boolAccel = false;
        var inertia = false;
        var initialCarYPos;

//----------------------------------------

        function findOrientation(){
            if(width <= height){ //landscape mode so true
                orientation = false;
            }
            else{ //height > width portrait mode
                orientation = true;
            }
        }

//-------Set up initial assets------------

        initializeGame();

        function initializeGame() {
            switch (numberOfLanes) {
                case 3:
                    laneOffset = .1 * width; //6.5 percent of context width
                    truckOffset = .03 * width; //3 percent of  context width

                    firstLaneXPos = laneOffset;
                    secondLaneXPos = (width / 3) + laneOffset; //width / 4 - 10
                    thirdLaneXPos = width - (width / 3) + laneOffset; // width / 4 - 20

                    currentPlayerXPos = thirdLaneXPos;

                    window.addEventListener('resize', resize3, {passive: true});
                    initAssetPos3();
                    break;

                case 4:
                    laneOffset = .065 * width; //6.5 percent of context width
                    truckOffset = .03 * width; //3 percent of  context width

                    firstLaneXPos = laneOffset;
                    secondLaneXPos = (width / 4) + laneOffset; //width / 4 - 10
                    thirdLaneXPos = (width / 2) + laneOffset; // width / 4 - 20
                    fourthLaneXPos = (width - (width / 4)) + laneOffset; //width / 4 - 30

                    currentPlayerXPos = thirdLaneXPos;

                    window.addEventListener('resize', resize4, {passive: true});
                    initAssetPos4();
                    break;

                case 5:
                    laneOffset = .03 * width; //6.5 percent of context width
                    truckOffset = .03 * width; //3 percent of  context width

                    firstLaneXPos = laneOffset;
                    secondLaneXPos = (width / 5) + laneOffset; //width / 4 - 10
                    thirdLaneXPos = 2 * (width / 5) + laneOffset; // width / 4 - 20
                    fourthLaneXPos = 3 * (width / 5) + laneOffset; //width / 4 - 30
                    fifthLaneXPos = 4 * (width / 5) + laneOffset;

                    currentPlayerXPos = thirdLaneXPos;

                    window.addEventListener('resize', resize5, {passive: true});
                    initAssetPos5();
                    break;

                case 6:
                    laneOffset = .02 * width; //6.5 percent of context width
                    truckOffset = .02 * width; //3 percent of  context width

                    firstLaneXPos = laneOffset;
                    secondLaneXPos = (width / 6) + laneOffset; //width / 4 - 10
                    thirdLaneXPos = 2 * (width / 6) + laneOffset; // width / 4 - 20
                    fourthLaneXPos = 3 * (width / 6) + laneOffset; //width / 4 - 30
                    fifthLaneXPos = 4 * (width / 6) + laneOffset;
                    sixthLaneXPos = 5 * (width / 6) + laneOffset;

                    currentPlayerXPos = thirdLaneXPos;

                    window.addEventListener('resize', resize6, {passive: true});
                    initAssetPos6();
                    break;
            }
        }

        function initializeHelper() {
            findOrientation();

            laneBound1.style.left = (.015 * width) + 'px';
            laneBound1.style.top = 0 + 'px';//(-.25 * height) + 'px';

            laneBound2.style.left = width - (.025 * width) + 'px';
            laneBound2.style.top = 0 + 'px';

            drawFBox();
            drawGBox();
            drawHBox();

            drawRedBox1();
            drawRedBox2();
            drawRedBox3();

            //Game starts with lane one empty
            //so dont show Police car lane 1
            policeCar1.style.left = firstLaneXPos + truckOffset + 'px';
            policeCar1.style.top = copYPos + '%';
            policeCar1.style.visibility = 'hidden';

            //Police car lane 2
            policeCar2.style.left = secondLaneXPos + truckOffset + 'px';
            policeCar2.style.top = copYPos + '%';

            //Police car lane 3
            policeCar3.style.left = thirdLaneXPos + truckOffset + 'px';
            policeCar3.style.top = copYPos + '%';

            //Road Lane 1
            roadLine1.style.left = secondLaneXPos - laneOffset + 'px';
            roadLine1.style.top = -25 + '%';

            //Road Lane 2
            roadLine2.style.left = thirdLaneXPos - laneOffset + 'px';
            roadLine2.style.top = -25 + '%';

            //Player car starts at lane 3
            sportsCar.style.left = currentPlayerXPos + (.04 * width) + 'px';
            sportsCar.style.top = (height - carOffset) + 'px';
            initialCarYPos = (height - carOffset);

        }

        function initAssetPos3() {
            initializeHelper();

            //print these elements off screen
            //j k l box
            Jbox.style.left = 150 + '%';
            Kbox.style.left = -150 + '%';
            Lbox.style.left = -150 + '%';

            //redsquare 4 5 6
            redBox4.style.left = -150 + '%';
            redBox5.style.left = -150 + '%';
            redBox6.style.left = -150 + '%';

            policeCar4.style.left = 150 + '%';
            policeCar4.style.top = -150 + '%';

            policeCar5.style.left = 150 + '%';
            policeCar5.style.top = -150 + '%';

            policeCar6.style.left = 150 + '%';
            policeCar6.style.top = -150 + '%';

            //Road Lane 3
            roadLine3.style.left = 150 + '%';
            roadLine3.style.top = -150 + '%';

            //Road Lane 4
            roadLine4.style.left = 150 + '%';
            roadLine4.style.top = -150 + '%';

            //Road Lane 5
            roadLine5.style.left = 150 + '%';
            roadLine5.style.left = -150 + '%';
            animate();
        }

        function initAssetPos4() {

            initializeHelper();

            drawJBox();

            drawRedBox4();

            //Police car lane 4
            policeCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            policeCar4.style.top = copYPos + '%';

            //Road Lane 3
            roadLine3.style.left = fourthLaneXPos - laneOffset + 'px';
            roadLine3.style.top = -25 + '%';


            //print these elements offscreen
            //k l box
            Kbox.style.left = -150 + '%';
            Lbox.style.left = -150 + '%';

            //redsquare 5 6
            redBox5.style.left = -150 + '%';
            redBox6.style.left = -150 + '%';

            policeCar5.style.left = 150 + '%';
            policeCar5.style.top = -150 + '%';

            policeCar6.style.left = 150 + '%';
            policeCar6.style.top = -150 + '%';


            //Road Lane 4 5
            roadLine4.style.left = 150 + '%';
            roadLine4.style.top = -150 + '%';

            roadLine5.style.left = 150 + '%';
            roadLine5.style.top = -150 + '%';

            animate();
        }

        function initAssetPos5() {

            initializeHelper();

            drawJBox();
            drawKBox();

            drawRedBox4();
            drawRedBox5();

            //Police car lane 4
            policeCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            policeCar4.style.top = copYPos + '%';

            policeCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            policeCar5.style.top = copYPos + '%';

            //Road Lane 3
            roadLine3.style.left = fourthLaneXPos - laneOffset + 'px';
            roadLine3.style.top = -25 + '%';

            //Road Lane 4
            roadLine4.style.left = fifthLaneXPos - laneOffset + 'px';
            roadLine4.style.top = -25 + '%';

            //draw off screen
            Lbox.style.left = -150 + '%';

            policeCar6.style.left = 150 + '%';
            policeCar6.style.top = -150 + '%';

            redBox6.style.left = -150 + '%';

            roadLine5.style.left = 150 + '%';
            roadLine5.style.top = -150 + '%';

            animate();
        }

        function initAssetPos6() {
            initializeHelper();

            drawJBox();
            drawKBox();
            drawLBox();

            drawRedBox4();
            drawRedBox5();
            drawRedBox6();

            //Police car lane 4
            policeCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            policeCar4.style.top = copYPos + '%';

            policeCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            policeCar5.style.top = copYPos + '%';

            policeCar6.style.left = sixthLaneXPos + truckOffset + 'px';
            policeCar6.style.top = copYPos + '%';

            //Road Lane 3
            roadLine3.style.left = fourthLaneXPos - laneOffset + 'px';
            roadLine3.style.top = -25 + '%';

            //Road Lane 4
            roadLine4.style.left = fifthLaneXPos - laneOffset + 'px';
            roadLine4.style.top = -25 + '%';

            //Road Lane 5
            roadLine5.style.left = sixthLaneXPos - laneOffset + 'px';
            roadLine5.style.top = -25 + '%';

            animate();

        }

        function resize3() {

            height = canvas.clientHeight;
            width = canvas.clientWidth;

            laneOffset = .1 * width; //6.5 percent of context width
            truckOffset = .03 * width; //3 percent of  context width
            carOffset = .225 * height; //22.5 percent of context height

            firstLaneXPos = laneOffset;
            secondLaneXPos = (width / 3) + laneOffset;
            thirdLaneXPos = width - (width / 3) + laneOffset;

            setCurrentPlayerXPos();

            initializeHelper();

            infoBarImageContainer.style.left = 0 + 'px';
            infoBarImageContainer.style.top = (.016 * height) + 'px';
        }

        function resize4() { //redraw if the window size is changed

            height = canvas.clientHeight;
            width = canvas.clientWidth;

            laneOffset = .065 * width; //6.5 percent of context width
            truckOffset = .03 * width; //3 percent of  context width
            carOffset = .225 * height; //22.5 percent of context height

            firstLaneXPos = laneOffset;
            secondLaneXPos = (width / 4) + laneOffset;
            thirdLaneXPos = (width / 2) + laneOffset;
            fourthLaneXPos = (width - (width / 4)) + laneOffset;

            setCurrentPlayerXPos();

            initializeHelper();

            drawJBox();

            drawRedBox4();

            //Police car lane 4
            policeCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            policeCar4.style.top = copYPos + '%';

            //Road Lane 3
            roadLine3.style.left = fourthLaneXPos - laneOffset + 'px';
            roadLine3.style.top = -25 + '%';

            infoBarImageContainer.style.left = 0 + 'px';
            infoBarImageContainer.style.top = (.016 * height) + 'px';
        }

        function resize5() {

            height = canvas.clientHeight;
            width = canvas.clientWidth;

            laneOffset = .035 * width; //6.5 percent of context width
            truckOffset = .03 * width; //3 percent of  context width
            carOffset = .225 * height; //22.5 percent of context height

            firstLaneXPos = laneOffset;
            secondLaneXPos = (width / 5) + laneOffset; //width / 4 - 10
            thirdLaneXPos = 2 * (width / 5) + laneOffset; // width / 4 - 20
            fourthLaneXPos = 3 * (width / 5) + laneOffset; //width / 4 - 30
            fifthLaneXPos = 4 * (width / 5) + laneOffset;

            setCurrentPlayerXPos();

            initializeHelper();

            drawJBox();
            drawKBox();

            drawRedBox4();
            drawRedBox5();

            //Police car lane 4
            policeCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            policeCar4.style.top = copYPos + '%';

            policeCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            policeCar5.style.top = copYPos + '%';

            //Road Lane 3
            roadLine3.style.left = fourthLaneXPos - laneOffset + 'px';
            roadLine3.style.top = -25 + '%';

            roadLine4.style.left = fifthLaneXPos - laneOffset + 'px';
            roadLine4.style.top = -25 + '%';

            infoBarImageContainer.style.left = 0 + 'px';
            infoBarImageContainer.style.top = (.016 * height) + 'px';
        }

        function resize6() {

            height = canvas.clientHeight;
            width = canvas.clientWidth;

            laneOffset = .02 * width; //6.5 percent of context width
            truckOffset = .02 * width; //3 percent of  context width
            carOffset = .225 * height; //22.5 percent of context height

            firstLaneXPos = laneOffset;
            secondLaneXPos = (width / 6) + laneOffset; //width / 4 - 10
            thirdLaneXPos = 2 * (width / 6) + laneOffset; // width / 4 - 20
            fourthLaneXPos = 3 * (width / 6) + laneOffset; //width / 4 - 30
            fifthLaneXPos = 4 * (width / 6) + laneOffset;
            sixthLaneXPos = 5 * (width / 6) + laneOffset;

            setCurrentPlayerXPos();

            initializeHelper();

            drawJBox();
            drawKBox();
            drawLBox();

            drawRedBox4();
            drawRedBox5();
            drawRedBox6();

            //Police car lane 4
            policeCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            policeCar4.style.top = copYPos + '%';

            policeCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            policeCar5.style.top = copYPos + '%';

            policeCar6.style.left = sixthLaneXPos + truckOffset + 'px';
            policeCar6.style.top = copYPos + '%';

            //Road Lane 3
            roadLine3.style.left = fourthLaneXPos - laneOffset + 'px';
            roadLine3.style.top = -25 + '%';

            roadLine4.style.left = fifthLaneXPos - laneOffset + 'px';
            roadLine4.style.top = -25 + '%';

            roadLine5.style.left = sixthLaneXPos - laneOffset + 'px';
            roadLine5.style.top = -25 + '%';

            infoBarImageContainer.style.left = 0 + 'px';
            infoBarImageContainer.style.top = (.016 * height) + 'px';
        }


        function animate() {
            window.requestAnimationFrame(animate);

            //laneline drawing happens every frame
            let carVtemp = carV;

            //adjust carV for drawing laneLines when the car is accelerating
            if (carV < 1) {
                if (copYPos >= 49 && copYPos < 50) {
                    carVtemp = carV - .95; //.95 - .95
                } else if (copYPos >= 40 && copYPos < 49.5) {
                    carVtemp = carV - .2; //.7 -.2
                } else if (copYPos >= 30 && copYPos < 40) {
                    carVtemp = carV + .1; //.55 + .1
                } else if (copYPos >= 25 && copYPos < 30) {
                    carVtemp = carV + .4; //.2 + .4
                } else if (copYPos >= 10 && copYPos < 25) {
                    carVtemp = carV + .8; //.15 + .8
                } else {
                    carVtemp = 1.35;   //1.35
                }
            }

            let newlaneposition = parseFloat(roadLine1.style.top) + carVtemp;
            if (newlaneposition > 0) {
                newlaneposition = -25 + newlaneposition;
            }
            roadLine1.style.top = newlaneposition + '%';
            roadLine2.style.top = newlaneposition + '%';
            roadLine3.style.top = newlaneposition + '%';
            roadLine4.style.top = newlaneposition + '%';
            roadLine5.style.top = newlaneposition + '%';

            //player car move left
            if (left === true) {
                if (currentPlayerXPos > newPos + (.035 * width / 2)) {
                    currentPlayerXPos -= .035 * width;
                    sportsCar.style.transform = 'rotate(-15deg)';
                    sportsCar.style.left = currentPlayerXPos + 'px';
                } else { //car reaches new position
                    sportsCar.style.transform = 'rotate(0deg)';
                    left = false;
                }
            }

            //player car move right
            if (right === true) {
                //player car move right
                if (currentPlayerXPos < newPos - (.035 * width / 2)) {
                    currentPlayerXPos += .035 * width;
                    sportsCar.style.transform = 'rotate(15deg)';
                    sportsCar.style.left = currentPlayerXPos + 'px';
                } else { //car reaches new position
                    sportsCar.style.transform = 'rotate(0deg)';
                    right = false;
                }
            }

            //truck animation
            if (startTruckAnimation === true) {
                acceptUserInput = true;
                if (correctInputGiven === false && wrongInputGiven === false) {
                    if(orientation === true && copYPos < 47){
                        brake();
                    }
                    else if (((initialCarYPos/height) * 100 - copYPos > 18) && orientation === false) { //truck hasn't reached player //350
                        brake();
                    }
                    else { //truck has reached the player so redraw trucks
                        crashSound.play();
                        //inertia = true;
                        acceptUserInput = false;
                        redrawTrucks = true;
                        startTruckAnimation = false;
                        boolAccel = true;
                    }
                }
                //user gave wrong input so redraw trucks
                else if (wrongInputGiven === true) {
                    acceptUserInput = false;
                    wrongInputGiven = false;
                    continueDrawingTrucks = true;
                    startTruckAnimation = false;
                    boolAccel = true;
                }
                //user gave right answer
                else if (correctInputGiven === true) {
                    acceptUserInput = false;
                    correctInputGiven = false;
                    startNewWave = true;
                    startTruckAnimation = false;
                }
            }

            if (continueDrawingTrucks === true) {
                if(orientation === true && copYPos < 47){
                    brakeWrong();
                }
                else if (((initialCarYPos/height) * 100 - copYPos > 18) && orientation === false) { //truck hasn't reached player //350
                    brakeWrong();
                }
                else { //truck has reached the player so redraw the trucks
                    crashSound.play();
                    inertia = true;
                    acceptUserInput = false;
                    redrawTrucks = true;
                    continueDrawingTrucks = false;
                }
            }

            if (redrawTrucks === true) {
                if (copYPos > initialCopYPos - 32) { //still hasnt reset trucks to init position 90 , initialcopypos - 15 percent
                    accelerate();
                } else {//truck has finished repositioning the trucks
                    startTruckAnimation = true;
                    redrawTrucks = false;
                }
            }

            if (startNewWave === true) {
                truckSound.play();
                if (copYPos < 115) { //75
                    carV = 2.5; //1.6
                } else {
                    emptyLane = copPattern[iterator]; //set the new emptylane
                    copYPos = initialCopYPos - 40; //250
                    startTruckAnimation = true;
                    startNewWave = false;
                    boolAccel = false;
                }
            }

            if (inertia === true) {
                if (parseFloat(sportsCar.style.top) > initialCarYPos - 5) {
                    sportsCar.style.top = (parseFloat(sportsCar.style.top) - 2.5) + 'px';
                } else {
                    sportsCar.style.top = initialCarYPos + 'px';
                    inertia = false;
                }
            }

            //draw the trucks with the updated carV
            copYPos += carV - truckV;
            drawPoliceHelper();
        }

        function brake() {
            /*if (copYPos < 47) {
                if (boolAccel === false) {
                    carV = 1.75;
                } else {//boolAccel = true
                    carV = 1.5;
                }
            }*/
            if(orientation === true && copYPos < 47){
                if (boolAccel === false) {
                    carV = 1.75;
                } else {//boolAccel = true
                    carV = 1.5;
                }
            }
            else if (((initialCarYPos/height) * 100 - copYPos > 18) && orientation === false) { //truck hasn't reached player //350
                if (boolAccel === false) {
                    carV = 1.75;
                } else {//boolAccel = true
                    carV = 1.5;
                }
            }
        }

        function brakeWrong() { //called when a wrong input is given to initially accelerate the car to the trucks
            if(orientation === true && copYPos < 47){
                carV = 2.5;
            }
            else if (((initialCarYPos/height) * 100 - copYPos > 18) && orientation === false) { //truck hasn't reached player //350
                carV = 2.5;
            }
        }

        function accelerate() {
            if (copYPos >= 49 && copYPos < 50) {
                carV = .95;
            } else if (copYPos >= 40 && copYPos < 49) {
                carV = .7;
            } else if (copYPos >= 30 && copYPos < 40) {
                carV = .55;
            } else if (copYPos >= 25 && copYPos < 30) {
                carV = .2;
            } else if (copYPos >= 10 && copYPos < 25) {
                carV = .15;
            } else {
                carV = .1;
            }
        }

        //------Create cop pattern---------

        //adds the random values to the copPattern array to be used in game
        function createCopPattern() {
            let i, temp;
            for (i = 0; i < numCops - 1; i++) {
                temp = Math.floor((Math.random() * numberOfLanes) + 1);
                if (temp === copPattern[i]) {
                    copPattern.push((temp % numberOfLanes) + 1);
                } else {
                    copPattern.push(temp);
                }
            }
        }

        //-------Initial game setup---------

        //Text that shows how many cops are left
        drawCopsRemainingText();

        //Pattern used for empty lanes in game
        createCopPattern();

        //---------------------------------------------

        function drawCopsRemainingText() {
            document.getElementById("Trucks").innerText = (numCops * numberOfLanes).toString(10);
        }

        //-------------------------------------------------

        function drawFBox() {
            Fbox.style.left = firstLaneXPos + (.045 * width) + 'px';
            Fbox.style.top = height - (.2 * height) + 'px';

        }

        function drawGBox() {

            Gbox.style.left = secondLaneXPos + (.045 * width) + 'px';
            Gbox.style.top = height - (.2 * height) + 'px';
        }

        function drawHBox() {

            Hbox.style.left = thirdLaneXPos + (.045 * width) + 'px';
            Hbox.style.top = height - (.2 * height) + 'px';
        }

        function drawJBox() {

            Jbox.style.left = fourthLaneXPos + (.045 * width) + 'px';
            Jbox.style.top = height - (.2 * height) + 'px';
        }

        function drawKBox() {

            Kbox.style.left = fifthLaneXPos + (.045 * width) + 'px';
            Kbox.style.top = height - (.2 * height) + 'px';
        }

        function drawLBox() {

            Lbox.style.left = sixthLaneXPos + (.045 * width) + 'px';
            Lbox.style.top = height - (.2 * height) + 'px';
        }

        function drawRedBox1() {
            redBox1.style.left = firstLaneXPos + (.045 * width) + 'px';
            redBox1.style.top = height - (.26 * height) + 'px';
        }

        function drawRedBox2() {
            redBox2.style.left = secondLaneXPos + (.045 * width) + 'px';
            redBox2.style.top = height - (.26 * height) + 'px';
        }

        function drawRedBox3() {
            redBox3.style.left = thirdLaneXPos + (.045 * width) + 'px';
            redBox3.style.top = height - (.26 * height) + 'px';
        }

        function drawRedBox4() {
            redBox4.style.left = fourthLaneXPos + (.045 * width) + 'px';
            redBox4.style.top = height - (.26 * height) + 'px';
        }

        function drawRedBox5() {
            redBox5.style.left = fifthLaneXPos + (.045 * width) + 'px';
            redBox5.style.top = height - (.26 * height) + 'px';
        }

        function drawRedBox6() {
            redBox6.style.left = sixthLaneXPos + (.045 * width) + 'px';
            redBox6.style.top = height - (.26 * height) + 'px';
        }

        //Mobile touch input
        //User presses the lane they want to go to
        //F = 1,  G = 2,  H = 3,   J = 4,   K = 5,  L = 6
        document.addEventListener('touchstart', touch);

        function touch(ev) {
            if (acceptUserInput === true) {
                if (findLane(ev) === 1 && currentLanePos !== 1) {

                    acceptUserInput = false;
                    setCurrentPlayerXPos();

                    //has to move car to the left
                    newPos = firstLaneXPos + (.04 * width);
                    left = true;

                    currentLanePos = 1;
                    checkInput();
                } else if (findLane(ev) === 2 && currentLanePos !== 2) {

                    acceptUserInput = false;
                    setCurrentPlayerXPos();

                    newPos = secondLaneXPos + (.04 * width);
                    if (currentLanePos < 2) {
                        right = true;
                    } else {
                        left = true;
                    }

                    currentLanePos = 2;
                    checkInput();
                } else if (findLane(ev) === 3 && currentLanePos !== 3) {

                    acceptUserInput = false;
                    setCurrentPlayerXPos();

                    newPos = thirdLaneXPos + (.04 * width);
                    if (currentLanePos < 3) {
                        right = true;
                    } else {
                        left = true;
                    }
                    currentLanePos = 3;
                    checkInput();
                } else if (findLane(ev) === 4 && currentLanePos !== 4) {

                    acceptUserInput = false;
                    setCurrentPlayerXPos();

                    newPos = fourthLaneXPos + (.04 * width);

                    if (currentLanePos < 4) {
                        right = true;
                    } else {
                        left = true;
                    }

                    currentLanePos = 4;
                    checkInput();
                } else if (findLane(ev) === 5 && currentLanePos !== 5) {

                    acceptUserInput = false;
                    setCurrentPlayerXPos();

                    newPos = fifthLaneXPos + (.04 * width);

                    //has to move car to the right
                    right = true;

                    currentLanePos = 5;
                    checkInput();
                } else if (findLane(ev) === 6 && currentLanePos !== 6) {

                    acceptUserInput = false;
                    setCurrentPlayerXPos();

                    newPos = sixthLaneXPos + (.04 * width);

                    //has to move car to the right
                    right = true;

                    currentLanePos = 6;
                    checkInput();
                }
            }
        }

        function findLane(ev) {
            let xCoord = ev.touches[0].clientX;
            let desiredLane = 0;
            let section = width / numberOfLanes;
            switch (numberOfLanes) { //3 4 5 6 number of lanes
                case 3:
                    if (xCoord < section)
                        desiredLane = 1;
                    else if (xCoord > section && xCoord < (2 * section))
                        desiredLane = 2;
                    else
                        desiredLane = 3;
                    break;

                case 4:
                    if (xCoord < section)
                        desiredLane = 1;
                    else if (xCoord > section && xCoord < (2 * section))
                        desiredLane = 2;
                    else if (xCoord > (2 * section) && xCoord < (3 * section))
                        desiredLane = 3;
                    else
                        desiredLane = 4;
                    break;

                case 5:
                    if (xCoord < section)
                        desiredLane = 1;
                    else if (xCoord > section && xCoord < (2 * section))
                        desiredLane = 2;
                    else if (xCoord > (2 * section) && xCoord < (3 * section))
                        desiredLane = 3;
                    else if (xCoord > (3 * section) && xCoord < (4 * section))
                        desiredLane = 4;
                    else
                        desiredLane = 5;
                    break;

                case 6:
                    if (xCoord < section)
                        desiredLane = 1;
                    else if (xCoord > section && xCoord < (2 * section))
                        desiredLane = 2;
                    else if (xCoord > (2 * section) && xCoord < (3 * section))
                        desiredLane = 3;
                    else if (xCoord > (3 * section) && xCoord < (4 * section))
                        desiredLane = 4;
                    else if (xCoord > (4 * section) && xCoord < (5 * section))
                        desiredLane = 5;
                    else
                        desiredLane = 6;
                    break;
            }
            return desiredLane;
        }

        //Keyboard touch input
        //If FGHJ are pressed, move the player to the correct lane
        document.addEventListener('keydown', event => {
            if (event.key === "Enter" && startGameBool === true) {
                acceptUserInput = true;
                startGameBool = false;
                incrementTimer();
                startTruckAnimation = true;
            } else if ((event.key === "f" || event.key === 'F') && acceptUserInput === true && currentLanePos !== 1) { //first lane

                acceptUserInput = false;
                setCurrentPlayerXPos();

                //has to move car to the left
                newPos = firstLaneXPos + (.04 * width);
                left = true;

                currentLanePos = 1;
                checkInput();
            } else if ((event.key === "g" || event.key === 'G') && acceptUserInput === true && currentLanePos !== 2) { //first lane

                acceptUserInput = false;
                setCurrentPlayerXPos();

                newPos = secondLaneXPos + (.04 * width);
                if (currentLanePos < 2) {
                    right = true;
                } else {
                    left = true;
                }

                currentLanePos = 2;
                checkInput();
            } else if ((event.key === "h" || event.key === 'H') && acceptUserInput === true && currentLanePos !== 3) { //first lane

                acceptUserInput = false;
                setCurrentPlayerXPos();

                newPos = thirdLaneXPos + (.04 * width);
                if (currentLanePos < 3) {
                    right = true;
                } else {
                    left = true;
                }
                currentLanePos = 3;
                checkInput();
            } else if ((event.key === "j" || event.key === 'J') && acceptUserInput === true && currentLanePos !== 4 && numberOfLanes != 3) { //first lane

                acceptUserInput = false;
                setCurrentPlayerXPos();

                newPos = fourthLaneXPos + (.04 * width);

                if (currentLanePos < 4) {
                    right = true;
                } else {
                    left = true;
                }

                currentLanePos = 4;
                checkInput();
            } else if ((event.key === "k" || event.key === 'K') && acceptUserInput === true && currentLanePos !== 5 && numberOfLanes != 3 && numberOfLanes != 4) { //first lane

                acceptUserInput = false;
                setCurrentPlayerXPos();

                newPos = fifthLaneXPos + (.04 * width);

                //has to move car to the right
                right = true;

                currentLanePos = 5;
                checkInput();
            } else if ((event.key === "l" || event.key === 'L') && acceptUserInput === true && currentLanePos !== 6 && numberOfLanes != 3 && numberOfLanes != 4 && numberOfLanes != 5) { //first lane

                acceptUserInput = false;
                setCurrentPlayerXPos();

                newPos = sixthLaneXPos + (.04 * width);

                //has to move car to the right
                right = true;

                currentLanePos = 6;
                checkInput();
            }
        });


        //for the timer
        function incrementTimer() {
            setTimeout(function () {
                if (timerRunning === true) {
                    time++;
                    var secs = Math.floor(time / 100);
                    var hundredths = time % 100;
                    if (secs < 10) {
                        secs = "0" + secs.toString();
                    } else {
                        secs = secs.toString();
                    }
                    hundredths = hundredths.toString();

                    document.getElementById("Time").innerText = secs + "." + hundredths;
                    incrementTimer();
                }
            }, 10);
        }

        function setCurrentPlayerXPos() {
            switch (currentLanePos) {
                case 1:
                    currentPlayerXPos = firstLaneXPos;
                    break;
                case 2:
                    currentPlayerXPos = secondLaneXPos;
                    break;
                case 3:
                    currentPlayerXPos = thirdLaneXPos;
                    break;
                case 4:
                    currentPlayerXPos = fourthLaneXPos;
                    break;
                case 5:
                    currentPlayerXPos = fifthLaneXPos;
                    break;
                case 6:
                    currentPlayerXPos = sixthLaneXPos;
                    break;
            }
        }

        //actually draws the police cars
        function drawPoliceHelper() {
            switch (emptyLane) {
                case 1:
                    policeCar1.style.visibility = 'hidden';
                    policeCar2.style.visibility = 'visible';
                    policeCar3.style.visibility = 'visible';
                    policeCar4.style.visibility = 'visible';
                    policeCar5.style.visibility = 'visible';
                    policeCar6.style.visibility = 'visible';

                    policeCar2.style.top = copYPos + '%';
                    policeCar3.style.top = copYPos + '%';
                    policeCar4.style.top = copYPos + '%';
                    policeCar5.style.top = copYPos + '%';
                    policeCar6.style.top = copYPos + '%';
                    break;
                case 2:
                    policeCar2.style.visibility = 'hidden';
                    policeCar1.style.visibility = 'visible';
                    policeCar3.style.visibility = 'visible';
                    policeCar4.style.visibility = 'visible';
                    policeCar5.style.visibility = 'visible';
                    policeCar6.style.visibility = 'visible';

                    policeCar1.style.top = copYPos + '%';
                    policeCar3.style.top = copYPos + '%';
                    policeCar4.style.top = copYPos + '%';
                    policeCar5.style.top = copYPos + '%';
                    policeCar6.style.top = copYPos + '%';
                    break;
                case 3:
                    policeCar3.style.visibility = 'hidden';
                    policeCar1.style.visibility = 'visible';
                    policeCar2.style.visibility = 'visible';
                    policeCar4.style.visibility = 'visible';
                    policeCar5.style.visibility = 'visible';
                    policeCar6.style.visibility = 'visible';

                    policeCar1.style.top = copYPos + '%';
                    policeCar2.style.top = copYPos + '%';
                    policeCar4.style.top = copYPos + '%';
                    policeCar5.style.top = copYPos + '%';
                    policeCar6.style.top = copYPos + '%';
                    break;
                case 4:
                    policeCar4.style.visibility = 'hidden';
                    policeCar1.style.visibility = 'visible';
                    policeCar2.style.visibility = 'visible';
                    policeCar3.style.visibility = 'visible';
                    policeCar5.style.visibility = 'visible';
                    policeCar6.style.visibility = 'visible';

                    policeCar1.style.top = copYPos + '%';
                    policeCar2.style.top = copYPos + '%';
                    policeCar3.style.top = copYPos + '%';
                    policeCar5.style.top = copYPos + '%';
                    policeCar6.style.top = copYPos + '%';
                    break;
                case 5:
                    policeCar5.style.visibility = 'hidden';
                    policeCar1.style.visibility = 'visible';
                    policeCar2.style.visibility = 'visible';
                    policeCar3.style.visibility = 'visible';
                    policeCar4.style.visibility = 'visible';
                    policeCar6.style.visibility = 'visible';

                    policeCar1.style.top = copYPos + '%';
                    policeCar2.style.top = copYPos + '%';
                    policeCar3.style.top = copYPos + '%';
                    policeCar4.style.top = copYPos + '%';
                    policeCar6.style.top = copYPos + '%';
                    break;
                case 6:
                    policeCar6.style.visibility = 'hidden';
                    policeCar1.style.visibility = 'visible';
                    policeCar2.style.visibility = 'visible';
                    policeCar3.style.visibility = 'visible';
                    policeCar4.style.visibility = 'visible';
                    policeCar5.style.visibility = 'visible';

                    policeCar1.style.top = copYPos + '%';
                    policeCar2.style.top = copYPos + '%';
                    policeCar3.style.top = copYPos + '%';
                    policeCar4.style.top = copYPos + '%';
                    policeCar5.style.top = copYPos + '%';
                    break;
            }
        }

        function checkInput() {

            if (currentLanePos === copPattern[iterator]) { //player gave right input
                iterator++;
                numCops--;
                drawCopsRemainingText();
                if (iterator === copPattern.length) { //reached the end of the game
                    if (time < goalTime) { //user beat game within goalTime
                        alert("CONGRATS YOU WON!");
                        timerRunning = false;
                        jsPsych.finishTrial();
                        //window.close();
                    } else { //time > goalTime
                        alert("BEAT THE GAME WITHIN " + (goalTime / 100).toString() + " SECONDS!");
                        timerRunning = false;
                    }
                }
                correctInputGiven = true;
                startTruckAnimation = true;
            } else {//player gave wrong input
                wrongInputGiven = true;
                startTruckAnimation = true;
            }
        }
    }
return plugin;
})();

