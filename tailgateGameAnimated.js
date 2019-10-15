

jsPsych.plugins['tailgate'] = (function(){

        var plugin = {};

        plugin.info = {
            name: 'tailgate',
            parameters: { //put variables in here that want to change like numberOfLanes, pattern, speed, numOfCops... BRAKEV and ACCELV
                numberOfLanes: {
                    type: jsPsych.plugins.parameterType.INT,
                    default: 4,
                    description: "The number of lanes in the game -> can be 3, 4, or 5"
                },
                truckSequence1: {
                    type: jsPsych.plugins.parameterType.ARRAY,
                    default: null,
                    description: "An array of four different trucks"
                },
                truckSequence2: {
                    type: jsPsych.plugins.parameterType.ARRAY,
                    default: null,
                    description: "An array of four different trucks"
                },
                truckSequence3: {
                    type: jsPsych.plugins.parameterType.ARRAY,
                    default: null,
                    description: "An array of four different trucks"
                },
                truckSequence4: {
                    type: jsPsych.plugins.parameterType.ARRAY,
                    default: null,
                    description: "An array of four different trucks"
                },
                overallGameTime: {
                    type: jsPsych.plugins.parameterType.INT,
                    default: null,
                    description: "How long a trial is in milliseconds"
                }
            }
        };

        plugin.trial = function(display_element, trial) {

        display_element.innerHTML = "<div id='frame'> <div id = 'container'> <img id = 'Fbox' class = 'laneBox' src = 'assets/F.svg' alt = 'F'> <img id = 'Gbox' class = 'laneBox' src = 'assets/G.svg' alt = 'G'> <img id = 'Hbox' class = 'laneBox' src = 'assets/H.svg' alt = 'H'> <img id = 'Jbox' class = 'laneBox' src = 'assets/J.svg' alt = 'J'> <img id = 'Kbox' class = 'laneBox' src = 'assets/K.svg' alt = 'K'> <img id = 'Lbox' class = 'laneBox' src = 'assets/L.svg' alt = 'L'> " +
                                    "<img id = 'redSquare1' class = 'redSquare' src = 'assets/thin-blue-line-png-15.png' alt = 'Red Square 1'> <img id = 'redSquare2' class = 'redSquare' src = 'assets/thin-blue-line-png-15.png' alt = 'Red Square 2'> <img id = 'redSquare3' class = 'redSquare' src = 'assets/thin-blue-line-png-15.png' alt = 'Red Square 3'> <img id = 'redSquare4' class = 'redSquare' src = 'assets/thin-blue-line-png-15.png' alt = 'Red Square 4'> <img id = 'redSquare5' class = 'redSquare' src = 'assets/thin-blue-line-png-15.png' alt = 'Red Square 5'> <img id = 'redSquare6' class = 'redSquare' src = 'assets/thin-blue-line-png-15.png' alt = 'Red Square 6'> " +
                                    "<img id = 'laneBound1' src = 'assets/yellowline.png' alt = 'Yellow Line'> <img id = 'laneBound2' src = 'assets/yellowline.png' alt = 'Yellow Line'> " +
                                    "<div id = 'countdownFrame'> <img id = 'countDown1' src = 'assets/countdown-1.svg' alt = '1'> </div> <div id = 'countdownFrame2'> <img id = 'countDown2' src = 'assets/countdown-2.svg' alt = '2'> </div> <div id = 'countdownFrame3'> <img id = 'countDown3' src = 'assets/countdown-3.svg' alt = '3'> </div>" +
                                    "<div id = 'tutorialSignFrame'> <img id = 'tutorialSign' src = 'assets/tutorialSign.svg' alt = 'Tutorial Sign'> " +
                                    "<div id = 'tutorialText'> <p id = 'introText'></p> <div id = 'tutButton'> CONTINUE </div> </div> </div>" +
                                    "<div id = 'tutorialSignFrame2'> <img id = 'tutorialSign2' src = 'assets/tutorialSignSide.svg' alt = 'Tutorial Sign Side'> " +
                                    "<div id = 'tutorialText2'> <p id = 'introText2'></p></div></div>" +
                                    "<img id = 'policeCar1' class = 'policeCar' src = 'assets/truck.svg' alt = 'Truck Lane 1'> <img id = 'policeCar2' class = 'policeCar' src = 'assets/truck.svg' alt = 'Truck Lane 2'> <img id = 'policeCar3' class = 'policeCar' src = 'assets/truck.svg' alt = 'Truck Lane 3'> <img id = 'policeCar4' class = 'policeCar' src = 'assets/truck.svg' alt = 'Truck Lane 4'> <img id = 'policeCar5' class = 'policeCar' src = 'assets/truck.svg' alt = 'Truck Lane 5'> <img id = 'policeCar6' class = 'policeCar' src = 'assets/truck.svg' alt = 'Truck Lane 6'> " +
                                    "<img id = 'redPoliceCar1' class = 'policeCar' src = 'assets/truck2.svg' alt = 'Truck Lane 1'> <img id = 'redPoliceCar2' class = 'policeCar' src = 'assets/truck2.svg' alt = 'Truck Lane 2'> <img id = 'redPoliceCar3' class = 'policeCar' src = 'assets/truck2.svg' alt = 'Truck Lane 3'> <img id = 'redPoliceCar4' class = 'policeCar' src = 'assets/truck2.svg' alt = 'Truck Lane 4'> <img id = 'redPoliceCar5' class = 'policeCar' src = 'assets/truck2.svg' alt = 'Truck Lane 5'> <img id = 'redPoliceCar6' class = 'policeCar' src = 'assets/truck2.svg' alt = 'Truck Lane 6'> " +
                                    "<img id = 'greenPoliceCar1' class = 'policeCar' src = 'assets/truck3.svg' alt = 'Truck Lane 1'> <img id = 'greenPoliceCar2' class = 'policeCar' src = 'assets/truck3.svg' alt = 'Truck Lane 2'> <img id = 'greenPoliceCar3' class = 'policeCar' src = 'assets/truck3.svg' alt = 'Truck Lane 3'> <img id = 'greenPoliceCar4' class = 'policeCar' src = 'assets/truck3.svg' alt = 'Truck Lane 4'> <img id = 'greenPoliceCar5' class = 'policeCar' src = 'assets/truck3.svg' alt = 'Truck Lane 5'> <img id = 'greenPoliceCar6' class = 'policeCar' src = 'assets/truck3.svg' alt = 'Truck Lane 6'> " +
                                    "<img id = 'yellowPoliceCar1' class = 'policeCar' src = 'assets/truck4.svg' alt = 'Truck Lane 1'> <img id = 'yellowPoliceCar2' class = 'policeCar' src = 'assets/truck4.svg' alt = 'Truck Lane 2'> <img id = 'yellowPoliceCar3' class = 'policeCar' src = 'assets/truck4.svg' alt = 'Truck Lane 3'> <img id = 'yellowPoliceCar4' class = 'policeCar' src = 'assets/truck4.svg' alt = 'Truck Lane 4'> <img id = 'yellowPoliceCar5' class = 'policeCar' src = 'assets/truck4.svg' alt = 'Truck Lane 5'> <img id = 'yellowPoliceCar6' class = 'policeCar' src = 'assets/truck4.svg' alt = 'Truck Lane 6'> " +
                                    "<img id = 'sportsCar' src = 'assets/car.svg' alt = 'Player'> " +
                                    "<div id = 'roadLine1' class = 'roadLine'></div> <div id = 'roadLine2' class = 'roadLine'></div> <div id = 'roadLine3' class = 'roadLine'></div> <div id = 'roadLine4' class = 'roadLine'></div> <div id = 'roadLine5' class = 'roadLine'></div> </div>   " +
                                    "<div id = 'overlay'> <span id = 'timer-label'>TIME</span> <span id = 'Time'>90.00</span> <span id = 'lineSeparator'> </span> <span id = 'score-label'>SCORE</span> <span id = 'Trucks'>0</span> </div> </div> </div>";

        const canvas = document.getElementById('container'); //div element
        // const context = canvas.getContext('2d');

        const laneBound1 = document.getElementById('laneBound1');
        const laneBound2 = document.getElementById('laneBound2');

        const policeCar1 = document.getElementById('policeCar1');
        const policeCar2 = document.getElementById('policeCar2');
        const policeCar3 = document.getElementById('policeCar3');
        const policeCar4 = document.getElementById('policeCar4');
        const policeCar5 = document.getElementById('policeCar5');
        const policeCar6 = document.getElementById('policeCar6');

        const redPoliceCar1 = document.getElementById('redPoliceCar1');
        const redPoliceCar2 = document.getElementById('redPoliceCar2');
        const redPoliceCar3 = document.getElementById('redPoliceCar3');
        const redPoliceCar4 = document.getElementById('redPoliceCar4');
        const redPoliceCar5 = document.getElementById('redPoliceCar5');
        const redPoliceCar6 = document.getElementById('redPoliceCar6');

        const greenPoliceCar1 = document.getElementById('greenPoliceCar1');
        const greenPoliceCar2 = document.getElementById('greenPoliceCar2');
        const greenPoliceCar3 = document.getElementById('greenPoliceCar3');
        const greenPoliceCar4 = document.getElementById('greenPoliceCar4');
        const greenPoliceCar5 = document.getElementById('greenPoliceCar5');
        const greenPoliceCar6 = document.getElementById('greenPoliceCar6');

        const yellowPoliceCar1 = document.getElementById('yellowPoliceCar1');
        const yellowPoliceCar2 = document.getElementById('yellowPoliceCar2');
        const yellowPoliceCar3 = document.getElementById('yellowPoliceCar3');
        const yellowPoliceCar4 = document.getElementById('yellowPoliceCar4');
        const yellowPoliceCar5 = document.getElementById('yellowPoliceCar5');
        const yellowPoliceCar6 = document.getElementById('yellowPoliceCar6');

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

        const fullScreenIcon = document.getElementById('fullscreenh');
        const soundIcon = document.getElementById('sound');

        const roadLine1 = document.getElementById('roadLine1');
        const roadLine2 = document.getElementById('roadLine2');
        const roadLine3 = document.getElementById('roadLine3');
        const roadLine4 = document.getElementById('roadLine4');
        const roadLine5 = document.getElementById('roadLine5');

        const infoBarImageContainer = document.getElementById('overlay'); //holds the time and score
        const tutorialSign = document.getElementById('tutorialSign');
        const introText = document.getElementById('introText');
        const tutorialSign2 = document.getElementById('tutorialSign2');
        const introText2 = document.getElementById('introText2');
        const tutButton = document.getElementById('tutButton');

        const countDown1 = document.getElementById('countDown1');
        const countDown2 = document.getElementById('countDown2');
        const countDown3 = document.getElementById('countDown3');

        const tutorialText2 = document.getElementById('tutorialText2');

        const timerLabel = document.getElementById('Time');

        const sportsCar = document.getElementById('sportsCar');

//--------Global Variables----------
//canvas.style.height = (window.innerHeight) + 'px';
        var numberOfLanes = 4;

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
        var truckSound = new Audio('assets/ding.wav');
        truckSound.volume = .2;

        var crashSound = new Audio('assets/brakingCar.wav');
        crashSound.volume = .5;

        var backgroundSound = new Audio('assets/backgroundSound.wav');
        backgroundSound.volume = .35;
        backgroundSound.loop = true;

        var continueSound = new Audio('assets/continueSound.wav');
        continueSound.volume = .5;

        var countdownSound = new Audio('assets/countdownSound.wav');
        countdownSound.volume = .5;

        var startGameSound = new Audio('assets/startGameSound.wav');
        startGameSound.volume = .5;

        var emptyLane = 1; //the correct lane user has to input, game starts with first lane empty
        var currentLanePos = 3; //current lane the car player is at, game starts with car at lane 3

        var copPattern = [emptyLane]; //the pattern of empty cop lanes

        var iterator = 0;
        var numCops = 12; //how many waves of cops will come

//variables for game timer
        var time = 0;

        var timerRunning = true; //when game starts, set to true
        const overallGameTime = 6000; //complete the game within this many milliseconds

        var remainingTime = overallGameTime - time;

        var tempTime = 1000;
        var listOfDataPoints = []; //an array of datapoints
        var dataPoint = []; //this array holds ms for input, which truckSequence, and which truck in truckSequence
            //variables for cop timing animation
        var inputTime = []; //array for holding all the times it took for a user to input an answer
        var truckYPos = 5; //y coordinate of where the cop cars are aligned 5% of the height of canvas

            /*if(orientation === false){ //portrait mode
                truckYPos = 8;
            }*/
        var initialtruckYPos = truckYPos; //is not changed

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
        var maxCarV = 2.25;

        var incrementSpeed = 8;

        var changeValCounter = 0;

        var newPos;

//animation variables
        var right = false;
        var left = false;

        var startTruckAnimation = false;

        var startNewWave = false;
        var redrawTrucks = false;
        var continueDrawingTrucks = false;

//handles different truck accelerations
        var inertia = false;
        var initialCarYPos;

        var animationState = '';

        var portraitOffset = 0;

        //braking
        var brakeV = .025; //.012
        var accelV = .015; //.008
        var stopVal = 1.75;
        //var carVtemp = carV;
        var bool = false;
        var tutorial = true;
        var slide = 1;
        var endSlide = false;

        //---Endless Mode/ Truck Sequences---//
        var truckSequence1 = [1,2,3,1];
        var truckSequence2 = [2,1,4,2];
        var truckSequence3 = [3,4,2,3];
        var truckSequence4 = [4,1,3,4];

        var truckSeqLength = 4;
        var numOfTruckSeq = 4;
        var prevTruckSeq = 0;

        var currentTruckSequence = 1;

        var lives = 5; //user starts out with five lives
        var score = 0;

        var mute = false;

        var doubleClickChecker = false;

        var countdownIsPlaying = false; //the 321 countdown is originally not playing
//----------------------------------------

        function findOrientation(){
            if(width <= height){ //portrait mode
                orientation = false;
            }
            else{ //height < width landscape mode
                orientation = true;
            }
        }


//-------Set up initial assets------------

        tutorialPrint();

        function tutorialPrint(){
            if(slide === 1){
                introText.innerHTML = "Tailgate is a game that will test your reaction time.";
            }
            else if(slide === 2){
                introText.innerHTML = "Press the letter of the empty lane on your keyboard or tap the lane if you are on a mobile device.";
            }
            else if(slide === 3){
                tutorialText2.style.visibility = 'visible';
                tutorialSign.style.visibility = 'hidden';
                introText.style.visibility = 'hidden';
                tutButton.style.visibility = 'hidden';
                tutorialSign2.style.visibility = 'visible';
                introText2.innerHTML = "Press the F key or tap the empty lane.";
                introText2.style.visibility = 'visible';
            }
            else if(slide === 4){
                introText2.innerHTML = "Now press the H key or tap the empty lane.";
            }
            else if(slide === 5){
                tutorialText2.style.visibility = 'hidden';
                tutorialSign.style.visibility = 'visible';
                introText.style.visibility = 'visible';
                tutButton.style.visibility = 'visible';
                tutorialSign2.style.visibility = 'hidden';
                introText2.style.visibility = 'hidden';
                introText.innerHTML = "Try to score as many points as possible in 60 seconds.";
                tutButton.innerHTML = "START GAME";
                //add the 3 2 1 go animation
            }
        }
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

            let secs = Math.floor(remainingTime / 100);
            let hundredths = remainingTime % 100;
            if (secs < 10) {
                secs = "0" + secs.toString();
            } else {
                secs = secs.toString();
            }
            hundredths = hundredths.toString();

            document.getElementById("Time").innerText = secs + "." + hundredths;

            findOrientation();

            if(orientation === false){ //portrait mode
                portraitOffset = .015;
                truckYPos = 10;
                initialtruckYPos = truckYPos;
            }
            else if(orientation === true){//landscape
                portraitOffset = 0;
                truckYPos = 5;
                initialtruckYPos = truckYPos;
            }

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
            policeCar1.style.top = truckYPos + '%';
            policeCar1.style.visibility = 'hidden';

            //Police car lane 2
            policeCar2.style.left = secondLaneXPos + truckOffset + 'px';
            policeCar2.style.top = truckYPos + '%';

            //Police car lane 3
            policeCar3.style.left = thirdLaneXPos + truckOffset + 'px';
            policeCar3.style.top = truckYPos + '%';

            redPoliceCar1.style.left = firstLaneXPos + truckOffset + 'px';
            redPoliceCar1.style.top = truckYPos + '%';
            redPoliceCar1.style.visibility = 'hidden';

            redPoliceCar2.style.left = secondLaneXPos + truckOffset + 'px';
            redPoliceCar2.style.top = truckYPos + '%';
            redPoliceCar2.style.visibility = 'hidden';

            redPoliceCar3.style.left = thirdLaneXPos + truckOffset + 'px';
            redPoliceCar3.style.top = truckYPos + '%';
            redPoliceCar3.style.visibility = 'hidden';

            greenPoliceCar1.style.left = firstLaneXPos + truckOffset + 'px';
            greenPoliceCar1.style.top = truckYPos + '%';
            greenPoliceCar1.style.visibility = 'hidden';

            greenPoliceCar2.style.left = secondLaneXPos + truckOffset + 'px';
            greenPoliceCar2.style.top = truckYPos + '%';
            greenPoliceCar2.style.visibility = 'hidden';

            greenPoliceCar3.style.left = thirdLaneXPos + truckOffset + 'px';
            greenPoliceCar3.style.top = truckYPos + '%';
            greenPoliceCar3.style.visibility = 'hidden';

            yellowPoliceCar1.style.left = firstLaneXPos + truckOffset + 'px';
            yellowPoliceCar1.style.top = truckYPos + '%';
            yellowPoliceCar1.style.visibility = 'hidden';

            yellowPoliceCar2.style.left = secondLaneXPos + truckOffset + 'px';
            yellowPoliceCar2.style.top = truckYPos + '%';
            yellowPoliceCar2.style.visibility = 'hidden';

            yellowPoliceCar3.style.left = thirdLaneXPos + truckOffset + 'px';
            yellowPoliceCar3.style.top = truckYPos + '%';
            yellowPoliceCar3.style.visibility = 'hidden';

            redPoliceCar4.style.visibility = 'hidden';
            redPoliceCar5.style.visibility = 'hidden';
            redPoliceCar6.style.visibility = 'hidden';

            greenPoliceCar4.style.visibility = 'hidden';
            greenPoliceCar5.style.visibility = 'hidden';
            greenPoliceCar6.style.visibility = 'hidden';

            yellowPoliceCar4.style.visibility = 'hidden';
            yellowPoliceCar5.style.visibility = 'hidden';
            yellowPoliceCar6.style.visibility = 'hidden';

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
            Jbox.style.left = -150 + '%';
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

            redPoliceCar4.style.left = 150 + '%';
            redPoliceCar4.style.top = -150 + '%';

            redPoliceCar5.style.left = 150 + '%';
            redPoliceCar5.style.top = -150 + '%';

            redPoliceCar6.style.left = 150 + '%';
            redPoliceCar6.style.top = -150 + '%';

            greenPoliceCar4.style.left = 150 + '%';
            greenPoliceCar4.style.top = -150 + '%';

            greenPoliceCar5.style.left = 150 + '%';
            greenPoliceCar5.style.top = -150 + '%';

            greenPoliceCar6.style.left = 150 + '%';
            greenPoliceCar6.style.top = -150 + '%';

            yellowPoliceCar4.style.left = 150 + '%';
            yellowPoliceCar4.style.top = -150 + '%';

            yellowPoliceCar5.style.left = 150 + '%';
            yellowPoliceCar5.style.top = -150 + '%';

            yellowPoliceCar6.style.left = 150 + '%';
            yellowPoliceCar6.style.top = -150 + '%';
            animate();
        }

        function initAssetPos4() {

            initializeHelper();

            drawJBox();

            drawRedBox4();

            //Police car lane 4
            policeCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            policeCar4.style.top = truckYPos + '%';

            redPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            redPoliceCar4.style.top = truckYPos + '%';

            greenPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            greenPoliceCar4.style.top = truckYPos + '%';

            yellowPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            yellowPoliceCar4.style.top = truckYPos + '%';

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

            redPoliceCar5.style.left = 150 + '%';
            redPoliceCar5.style.top = -150 + '%';

            redPoliceCar6.style.left = 150 + '%';
            redPoliceCar6.style.top = -150 + '%';

            greenPoliceCar5.style.left = 150 + '%';
            greenPoliceCar5.style.top = -150 + '%';

            greenPoliceCar6.style.left = 150 + '%';
            greenPoliceCar6.style.top = -150 + '%';

            yellowPoliceCar5.style.left = 150 + '%';
            yellowPoliceCar5.style.top = -150 + '%';

            yellowPoliceCar6.style.left = 150 + '%';
            yellowPoliceCar6.style.top = -150 + '%';

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
            policeCar4.style.top = truckYPos + '%';

            policeCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            policeCar5.style.top = truckYPos + '%';

            redPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            redPoliceCar4.style.top = truckYPos + '%';

            redPoliceCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            redPoliceCar5.style.top = truckYPos + '%';

            greenPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            greenPoliceCar4.style.top = truckYPos + '%';

            greenPoliceCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            greenPoliceCar5.style.top = truckYPos + '%';

            yellowPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            yellowPoliceCar4.style.top = truckYPos + '%';

            yellowPoliceCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            yellowPoliceCar5.style.top = truckYPos + '%';

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

            redPoliceCar6.style.left = 150 + '%';
            redPoliceCar6.style.top = -150 + '%';

            greenPoliceCar6.style.left = 150 + '%';
            greenPoliceCar6.style.top = -150 + '%';

            yellowPoliceCar6.style.left = 150 + '%';
            yellowPoliceCar6.style.top = -150 + '%';

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
            policeCar4.style.top = truckYPos + '%';

            policeCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            policeCar5.style.top = truckYPos + '%';

            policeCar6.style.left = sixthLaneXPos + truckOffset + 'px';
            policeCar6.style.top = truckYPos + '%';

            redPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            redPoliceCar4.style.top = truckYPos + '%';

            redPoliceCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            redPoliceCar5.style.top = truckYPos + '%';

            redPoliceCar6.style.left = sixthLaneXPos + truckOffset + 'px';
            redPoliceCar6.style.top = truckYPos + '%';

            greenPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            greenPoliceCar4.style.top = truckYPos + '%';

            greenPoliceCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            greenPoliceCar5.style.top = truckYPos + '%';

            greenPoliceCar6.style.left = sixthLaneXPos + truckOffset + 'px';
            greenPoliceCar6.style.top = truckYPos + '%';

            yellowPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            yellowPoliceCar4.style.top = truckYPos + '%';

            yellowPoliceCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            yellowPoliceCar5.style.top = truckYPos + '%';

            yellowPoliceCar6.style.left = sixthLaneXPos + truckOffset + 'px';
            yellowPoliceCar6.style.top = truckYPos + '%';

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
            policeCar4.style.top = truckYPos + '%';

            redPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            redPoliceCar4.style.top = truckYPos + '%';

            greenPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            greenPoliceCar4.style.top = truckYPos + '%';

            yellowPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            yellowPoliceCar4.style.top = truckYPos + '%';

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
            policeCar4.style.top = truckYPos + '%';

            policeCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            policeCar5.style.top = truckYPos + '%';

            redPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            redPoliceCar4.style.top = truckYPos + '%';

            redPoliceCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            redPoliceCar5.style.top = truckYPos + '%';

            greenPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            greenPoliceCar4.style.top = truckYPos + '%';

            greenPoliceCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            greenPoliceCar5.style.top = truckYPos + '%';

            yellowPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            yellowPoliceCar4.style.top = truckYPos + '%';

            yellowPoliceCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            yellowPoliceCar5.style.top = truckYPos + '%';

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
            policeCar4.style.top = truckYPos + '%';

            policeCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            policeCar5.style.top = truckYPos + '%';

            policeCar6.style.left = sixthLaneXPos + truckOffset + 'px';
            policeCar6.style.top = truckYPos + '%';

            redPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            redPoliceCar4.style.top = truckYPos + '%';

            redPoliceCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            redPoliceCar5.style.top = truckYPos + '%';

            redPoliceCar6.style.left = sixthLaneXPos + truckOffset + 'px';
            redPoliceCar6.style.top = truckYPos + '%';

            greenPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            greenPoliceCar4.style.top = truckYPos + '%';

            greenPoliceCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            greenPoliceCar5.style.top = truckYPos + '%';

            greenPoliceCar6.style.left = sixthLaneXPos + truckOffset + 'px';
            greenPoliceCar6.style.top = truckYPos + '%';

            yellowPoliceCar4.style.left = fourthLaneXPos + truckOffset + 'px';
            yellowPoliceCar4.style.top = truckYPos + '%';

            yellowPoliceCar5.style.left = fifthLaneXPos + truckOffset + 'px';
            yellowPoliceCar5.style.top = truckYPos + '%';

            yellowPoliceCar6.style.left = sixthLaneXPos + truckOffset + 'px';
            yellowPoliceCar6.style.top = truckYPos + '%';

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

            if(remainingTime <= 0){ //remaing time is goalTime - time and time is incremented every ms
                acceptUserInput = false;
                timerLabel.innerHTML = '0.00';
                timeUp(); //no more time left so game is over
            }

            //laneline drawing happens every frame

            drawLaneLines();

            //player car move left
            if (left === true) {
                moveLeft();
            }

            //player car move right
            if (right === true) {
                moveRight();
            }

            if(animationState === 'movingDownTutorial'){
                var beforeStop = truckYPos < 5;

                if(beforeStop){
                    carV = maxCarV;
                }
                else{
                    animationState = 'stopTrucks';
                }
            }

            if(animationState === 'stopTrucks'){
                carV = 1;

                if(slide === 5){
                    tutorial = false; //done with tutorial
                }
            }

            //truck animation states
            if (animationState === 'movingDown'){
                acceptUserInput = true;
                if (correctInputGiven === false && wrongInputGiven === false) { //if user doesnt input anything\
                    animationState = 'continueDrawingTrucks';
                }
                //user gave wrong input so redraw trucks
                else if (wrongInputGiven === true) {

                    animationState = 'continueDrawingTrucks';
                    acceptUserInput = false;
                    wrongInputGiven = false;
                }
                //user gave right answer
                else if (correctInputGiven === true) {
                    animationState = 'startNewWave';
                    acceptUserInput = false;
                    correctInputGiven = false;
                }
            }
            else if(animationState === 'continueDrawingTrucks'){
                var beforeBrake =  truckYPos < 15;
                    //((orientation === true && truckYPos < 20) ||
                    //(((initialCarYPos/height) * 100 - truckYPos > 8) && orientation === false));

                if(beforeBrake){
                    carV = maxCarV;
                }
                else {
                    animationState ='braking';
                }
            }
            else if(animationState === 'braking'){

                //acceptUserInput = true;

                var stillBraking = truckYPos > 15; //.025 x height

                    //((orientation === true && truckYPos > 15) ||
                    //(((initialCarYPos/height) * 100 - truckYPos > 8) && orientation === false));

                if(stillBraking){ //start braking between 30 and 47
                    carV -= brakeV;
                    if(carV < 0) {
                        carV = 0;
                    }
                    if(carV < 1){ //moving up
                        crashSound.play();
                        acceptUserInput = false;
                    }
                }
                else{
                    acceptUserInput = false;
                    animationState = 'accelerateUp';
                }
            }
            else if(animationState === 'accelerateUp' ){
                if (carV < stopVal) {
                    carV += accelV;
                    if(carV > stopVal) {
                        carV = stopVal;
                    }
                    if(carV > 1){//moving down
                        acceptUserInput = true;
                    }
                }
                else {//truck has finished repositioning the trucks
                    animationState = 'movingDown';
                }
            }
            else if(animationState === 'startNewWave'){
                if (truckYPos < 115) { //continue drawing trucks until off screen
                    carV = 4.0; //1.6
                } else { //trucks are offscreen so start another wave of trucks
                    makeTruckAssetHidden(); //makes the previous truck asset hidden
                    if(iterator === copPattern.length){//if the iterator reaches the end of the the copppattern, then add more trucksequence portions to copPattern
                        getNextTruckSequence();
                        ////changeTruckAsset();
                    }

                    if(tutorial === true && slide === 4){
                        emptyLane = 3;
                        truckYPos = initialtruckYPos - 40;
                        animationState = 'movingDownTutorial'; // use different animation state for tutorial that stops the trucks at a certain point
                    }
                    else if(tutorial === true && slide === 5){
                        emptyLane = 1;
                        truckYPos = initialtruckYPos - 40;
                        animationState = 'movingDownTutorial'; // use different animation state for tutorial that stops the trucks at a certain point
                    }
                    else {
                        emptyLane = copPattern[iterator]; //set the new emptylane
                        tempTime = remainingTime;
                        truckYPos = initialtruckYPos - 40; //250
                        animationState = 'movingDown';
                    }
                }
            }

            //draw the trucks with the updated carV
            truckYPos += carV - truckV;
            drawPoliceHelper();
        }

        function drawLaneLines(){
            let newlaneposition = parseFloat(roadLine1.style.top) + carV;
            if (newlaneposition > 0) {
                newlaneposition = -25 + newlaneposition;
            }
            roadLine1.style.top = newlaneposition + '%';
            roadLine2.style.top = newlaneposition + '%';
            roadLine3.style.top = newlaneposition + '%';
            roadLine4.style.top = newlaneposition + '%';
            roadLine5.style.top = newlaneposition + '%';
        }

        function moveLeft(){
            if (currentPlayerXPos > newPos + (.035 * width / 2)) {
                currentPlayerXPos -= .075 * width;
                sportsCar.style.transform = 'rotate(-15deg)';
                sportsCar.style.left = currentPlayerXPos + 'px';
            } else { //car reaches new position
                sportsCar.style.transform = 'rotate(0deg)';
                left = false;
            }
        }

        function moveRight(){
                //player car move right
                if (currentPlayerXPos < newPos - (.035 * width / 2)) {
                    currentPlayerXPos += .075 * width;
                    sportsCar.style.transform = 'rotate(15deg)';
                    sportsCar.style.left = currentPlayerXPos + 'px';
                } else { //car reaches new position
                    sportsCar.style.transform = 'rotate(0deg)';
                    right = false;
                }
        }

        //------Create cop pattern---------

            //Used with timed version of the game
        //adds the random values to the copPattern array to be used in game
        /*function createTruckPattern() {
            let i, temp;
            for (i = 0; i < numCops - 1; i++) {
                temp = Math.floor((Math.random() * numberOfLanes) + 1);
                if (temp === copPattern[i]) {
                    copPattern.push((temp % numberOfLanes) + 1);
                } else {
                    copPattern.push(temp);
                }
            }
        }*/

        function getNextTruckSequence(){
            let portion;
            prevTruckSeq = currentTruckSequence;
            currentTruckSequence = Math.floor((Math.random() * numOfTruckSeq) + 1); //get a random trucksequence
            if(currentTruckSequence === prevTruckSeq){ //make sure different consecutive truck sequences
                currentTruckSequence = (currentTruckSequence % numOfTruckSeq) + 1;
            }
            switch(currentTruckSequence){
                case 1: for(i = 0; i < truckSequence1.length; i++){
                            copPattern.push(truckSequence1[i]);
                        }
                        break;

                case 2: for(i = 0; i < truckSequence2.length; i++){
                            copPattern.push(truckSequence2[i]);
                        }
                        break;

                case 3: for(i = 0; i < truckSequence3.length; i++){
                            copPattern.push(truckSequence3[i]);
                        }
                        break;

                case 4: for(i = 0; i < truckSequence4.length; i++){
                            copPattern.push(truckSequence4[i]);
                        }
                        break;
            }


            //this is code for random portion of
            /*prevTruckSeq = currentTruckSequence;*/
            /*switch(currentTruckSequence){
                case 1: portion = getTruckSequencePortion(); //truckSeq1
                        if(truckSequence1[0] === copPattern[copPattern.length - 1]){
                            for(j = 1; j < portion; j++){
                                copPattern.push(truckSequence1[j]);
                            }
                        }
                        else{
                            for(j = 0; j < portion; j++){
                                copPattern.push(truckSequence1[j]);
                            }
                        }
                        /!*for(j = 0; j < portion; j++){ //iterate through the portion
                            if(truckSequence1[0] === copPattern[copPattern.length - 1]){ //change if consecutive empty lanes in different sequences are the same
                                j = 1; //get the next value in the truckSequence
                                console.log('hitthis');
                            }
                            copPattern.push(truckSequence1[j]); //push the sequence on pattern array
                        }*!/
                        break;

                case 2: portion = getTruckSequencePortion(); //truckSeq2
                        if(truckSequence2[0] === copPattern[copPattern.length - 1]){
                            for(j = 1; j < portion; j++){
                                copPattern.push(truckSequence2[j]);
                            }
                        }
                        else{
                            for(j = 0; j < portion; j++){
                                copPattern.push(truckSequence2[j]);
                            }
                        }
                        /!*for(j = 0; j < portion; j++){ //iterate through the portion
                            if(truckSequence1[0] === copPattern[copPattern.length - 1]){ //change if consecutive empty lanes in different sequences are the same
                                j = 1; //get the next value in the truckSequence
                                console.log('hitthis');
                            }
                            copPattern.push(truckSequence2[j]); //push the sequence on pattern array
                        }*!/
                        break;

                case 3: portion = getTruckSequencePortion(); //truckSeq3
                        if(truckSequence3[0] === copPattern[copPattern.length - 1]){
                            for(j = 1; j < portion; j++){
                                copPattern.push(truckSequence3[j]);
                            }
                        }
                        else{
                            for(j = 0; j < portion; j++){
                                copPattern.push(truckSequence3[j]);
                            }
                        }
                        /!*for(j = 0; j < portion; j++){ //iterate through the portion
                            if(truckSequence1[0] === copPattern[copPattern.length - 1]){ //change if consecutive empty lanes in different sequences are the same
                                j = 1; //get the next value in the truckSequence
                                console.log('hitthis');
                            }
                            copPattern.push(truckSequence3[j]); //push the sequence on pattern array
                        }*!/
                        break;

                case 4: portion = getTruckSequencePortion(); //truckSeq4
                        if(truckSequence4[0] === copPattern[copPattern.length - 1]){
                            for(j = 1; j < portion; j++){
                                copPattern.push(truckSequence4[j]);
                            }
                        }
                        else{
                            for(j = 0; j < portion; j++){
                                copPattern.push(truckSequence4[j]);
                            }
                        }
                       /!*for(j = 0; j < portion; j++){ //iterate through the portion
                            if(truckSequence1[0] === copPattern[copPattern.length - 1]){ //change if consecutive empty lanes in different sequences are the same
                                j = 1; //get the next value in the truckSequence
                                console.log('hitthis');
                            }
                            copPattern.push(truckSequence4[j]); //push the sequence on pattern array
                        }*!/
                        break;
            }*/
            //console.log(prevTruckSeq + 'p');
            //console.log(currentTruckSequence);
        }

        function initializeTruckSequences(){
            for(j = 0; j < truckSeqLength; j++){ //truckSeqLength = 7;
                truckSequence1[j] = returnCorrectLane(truckSequence1,j);
                truckSequence2[j] = returnCorrectLane(truckSequence2,j);
                truckSequence3[j] = returnCorrectLane(truckSequence3,j);
                truckSequence4[j] = returnCorrectLane(truckSequence4,j);
            }
        }

        function returnCorrectLane(truckSequence, j){
            let temp = Math.floor((Math.random() * numberOfLanes) + 1); //picks a random lane;

            if(truckSequence.length !== 0){ //there is a previous value in the sequence then must check that consecutive numbers are different
                if(temp === truckSequence[j - 1]){ //same consecutive values
                    return (temp % numberOfLanes) + 1; //new different value
                }
            }
            else{ //first value in sequence so check if end of previous truck sequence is the same. if it is, then change value
                if(temp === copPattern[iterator]){
                    return (temp % numberOfLanes) + 1; //new different value
                }
            }

            return temp;
        }

        function getTruckSequencePortion(){
            return Math.floor((Math.random() * truckSeqLength) + 1); //returns value between 1 and truckSeqLength
        }

        //-------Initial game setup---------

        //Text that shows how many cops are left
        drawCopsRemainingText();

        //Pattern used for empty lanes in game
        /*createTruckPattern();*/
        //initializeTruckSequences();

        //getNextTruckSequence();

        //---------------------------------------------

        function drawCopsRemainingText() {
            /*document.getElementById("Trucks").innerText = (numCops * numberOfLanes).toString(10);*/
            document.getElementById("Trucks").innerText = score + "";
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
        //document.addEventListener('click', click);
        document.addEventListener('touchstart', gameTouch);

        tutButton.addEventListener('click', click);
        tutButton.addEventListener('touchstart', tutButtonTouch);

        function click(ev){

            if(doubleClickChecker === false) {
                if (tutorial === true && slide === 1) {
                    acceptUserInput = false;
                    continueSound.play();
                    slide = 2;
                    tutorialPrint();
                } else if (tutorial === true && slide === 2) {
                    continueSound.play();
                    slide = 3;
                    tutorialPrint();
                } else if (startGameBool === true && tutorial === false) { //the game starts here start with 321 countdown
                    countdownIsPlaying = true;
                    tutButton.style.visibility = 'hidden';
                    introText.style.visibility = 'hidden';
                    tutorialSign.style.visibility = 'hidden';

                    countDown3.style.visibility = 'visible';
                    countdownSound.play();

                    countDownTimerInc(); //increment the countdown timer, change the 321 every second

                } else if (endSlide === true) { //this is the restart function
                    endSlide = false;
                    restartGame();
                }
            }
        }

        function gameTouch(ev){
            if(countdownIsPlaying === false) { //while the countdown is playing dont let the user touch anything on the screen
                if (tutorial === true && slide === 3 && findLane(ev) === 1) {
                    doubleClickChecker = false;
                    continueSound.play();
                    slide = 4;
                    //move car to the left and draw the cars going off the screen
                    setCurrentPlayerXPos();
                    newPos = firstLaneXPos + (.04 * width);
                    left = true;
                    currentLanePos = 1;
                    correctInputGiven = true;
                    animationState = 'movingDown';
                    tutorialPrint();
                } else if (tutorial === true && slide === 4 && findLane(ev) === 3) {
                    continueSound.play();
                    slide = 5;
                    //move car to the right and draw the cars going off the screen
                    setCurrentPlayerXPos();
                    newPos = thirdLaneXPos + (.04 * width);
                    right = true;
                    currentLanePos = 3;
                    correctInputGiven = true;
                    animationState = 'movingDown';
                    tutorialPrint();
                }
                if ((startGameBool === true) && (tutorial === false)) { //start the game on mobile when a user presses the screen
                    countdownIsPlaying = true;
                    introText.style.visibility = 'hidden';
                    tutorialSign.style.visibility = 'hidden';
                    tutButton.style.visibility = 'hidden';
                    countDown3.style.visibility = 'visible';
                    countdownSound.play();

                    countDownTimerInc(); //increment the countdown timer, change the 321 every second

                    /*backgroundSound.play();
                       acceptUserInput = true;
                       startGameBool = false;
                       incrementTimer();
                       animationState = 'movingDown';*/
                }

                if ((acceptUserInput === true) && (tutorial === false)) {
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

                        if (currentLanePos < 5) {
                            right = true;
                        } else {
                            left = true;
                        }

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
        }

        function tutButtonTouch(ev) {
            if(tutorial === true && slide === 1){
                doubleClickChecker = true;
                continueSound.play();
                slide = 2;
                tutorialPrint();
            }
            else if(tutorial === true && slide === 2){
                continueSound.play();
                slide = 3;
                tutorialPrint();
            }
        }

        function restartGame(){
            /*//reset variables to original state

            tutorialSign.style.visibility = 'hidden';
            introText.style.visibility = 'hidden';
            tutButton.style.visibility = 'hidden';
            copPattern = [emptyLane];
            iterator = 0;
            time = 0;
            remainingTime = overallGameTime - time;
            tempTime = 1000;
            listOfDataPoints = [];
            dataPoint = [];
            inputTime = [];
            prevTruckSeq = 0;
            currentTruckSequence = 1;
            score = 0;

            //reset player car to original state
            sportsCar.style.left = currentPlayerXPos + (.04 * width) + 'px';
            sportsCar.style.top = (height - carOffset) + 'px';
            initialCarYPos = (height - carOffset);

            //reset starting white trucks to original state

            countDownTimerInc();*/
            location.reload(); //reloads page change in future to  skip tutorial after first playthrough
        }

        function countDownTimerInc(){
            setTimeout(function() {
                countDown3.style.visibility = 'hidden';
                countDown2.style.visibility = 'visible';
                countdownSound.play();

                setTimeout( function(){
                    countDown2.style.visibility = 'hidden';
                    countDown1.style.visibility = 'visible';
                    countdownSound.play();

                    setTimeout( function(){
                        countdownIsPlaying = false;
                        countDown1.style.visibility = 'hidden';
                        startGameSound.play();

                        backgroundSound.play();
                        acceptUserInput = true;
                        startGameBool = false;
                        incrementTimer();
                        animationState = 'movingDown';

                    }, 1000);

                }, 1000);

            }, 1000);
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

        fullScreenIcon.addEventListener('click', toggleFullScreen);
        soundIcon.addEventListener('click', toggleMute);

        function toggleMute(){
            if(mute === false){ //mute
                backgroundSound.muted = true;
                crashSound.muted = true;
                truckSound.muted = true;
                mute = true;
            }
            else{ //unmute
                backgroundSound.muted = false;
                crashSound.muted = false;
                truckSound.muted = false;
                mute = false;
            }

        }

        function toggleFullScreen(e){
                e.stopPropagation();
                var doc = window.document;
                var docEl = doc.documentElement;

                var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
                var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

                if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                    requestFullScreen.call(docEl);
                }
                else {
                    cancelFullScreen.call(doc);
                }
            }

        //Keyboard touch input
        //If FGHJ are pressed, move the player to the correct lane
        document.addEventListener('keydown', event => {
            if((event.key === "f" || event.key === 'F') && tutorial === true && slide === 3){
                slide = 4;
                //move car to the left and draw the cars going off the screen
                continueSound.play();
                setCurrentPlayerXPos();
                newPos = firstLaneXPos + (.04 * width);
                left = true;
                currentLanePos = 1;
                correctInputGiven = true;
                animationState = 'movingDown';
                tutorialPrint();
            }
            else if((event.key === "h" || event.key === 'H') && tutorial === true && slide === 4){
                slide = 5;
                //move car to the right and draw the cars going off the screen
                continueSound.play();
                setCurrentPlayerXPos();
                newPos = thirdLaneXPos + (.04 * width);
                right = true;
                currentLanePos = 3;
                correctInputGiven = true;
                animationState = 'movingDown';
                tutorialPrint();
            }
            if (event.key === "Enter" && startGameBool === true && tutorial === false) {
                tutButton.style.visibility = 'hidden';
                introText.style.visibility = 'hidden';
                tutorialSign.style.visibility = 'hidden';

                countDown3.style.visibility = 'visible';
                countdownSound.play();

                countDownTimerInc(); //increment the countdown timerf, change the 321 every second
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
            } else if ((event.key === "j" || event.key === 'J') && acceptUserInput === true && currentLanePos !== 4 && numberOfLanes !== 3) { //first lane

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
            } else if ((event.key === "k" || event.key === 'K') && acceptUserInput === true && currentLanePos !== 5 && numberOfLanes !== 3 && numberOfLanes !== 4) { //first lane

                acceptUserInput = false;
                setCurrentPlayerXPos();

                newPos = fifthLaneXPos + (.04 * width);

                if (currentLanePos < 5) {
                    right = true;
                } else {
                    left = true;
                }
                //right = true;

                currentLanePos = 5;
                checkInput();
            } else if ((event.key === "l" || event.key === 'L') && acceptUserInput === true && currentLanePos !== 6 && numberOfLanes !== 3 && numberOfLanes !== 4 && numberOfLanes !== 5) { //first lane

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
                    remainingTime = overallGameTime - time;
                    var secs = Math.floor(remainingTime / 100);
                    var hundredths = remainingTime % 100;
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
            if(currentTruckSequence === 1){ //first truck sequence, white truck
                animateTrucks(policeCar1, policeCar2, policeCar3, policeCar4, policeCar5, policeCar6);
            }
            else if(currentTruckSequence === 2){ //draw second truck sequence, red truck
                animateTrucks(redPoliceCar1, redPoliceCar2, redPoliceCar3, redPoliceCar4, redPoliceCar5, redPoliceCar6);
            }
            else if(currentTruckSequence === 3){ //draw third truck sequence, green truck
                animateTrucks(greenPoliceCar1, greenPoliceCar2, greenPoliceCar3, greenPoliceCar4, greenPoliceCar5, greenPoliceCar6);
            }
            else if(currentTruckSequence === 4){ //draw fourth truck sequence, yellow truck
                animateTrucks(yellowPoliceCar1, yellowPoliceCar2, yellowPoliceCar3, yellowPoliceCar4, yellowPoliceCar5, yellowPoliceCar6);
            }
        }

        function animateTrucks(policeCar1, policeCar2, policeCar3, policeCar4, policeCar5, policeCar6){
            //console.log('hitanimatetrucks');
            switch (emptyLane) {
                case 1:
                    policeCar1.style.visibility = 'hidden';
                    policeCar2.style.visibility = 'visible';
                    policeCar3.style.visibility = 'visible';
                    policeCar4.style.visibility = 'visible';
                    policeCar5.style.visibility = 'visible';
                    policeCar6.style.visibility = 'visible';

                    policeCar2.style.top = truckYPos + '%';
                    policeCar3.style.top = truckYPos + '%';
                    policeCar4.style.top = truckYPos + '%';
                    policeCar5.style.top = truckYPos + '%';
                    policeCar6.style.top = truckYPos + '%';
                    break;
                case 2:
                    policeCar2.style.visibility = 'hidden';
                    policeCar1.style.visibility = 'visible';
                    policeCar3.style.visibility = 'visible';
                    policeCar4.style.visibility = 'visible';
                    policeCar5.style.visibility = 'visible';
                    policeCar6.style.visibility = 'visible';

                    policeCar1.style.top = truckYPos + '%';
                    policeCar3.style.top = truckYPos + '%';
                    policeCar4.style.top = truckYPos + '%';
                    policeCar5.style.top = truckYPos + '%';
                    policeCar6.style.top = truckYPos + '%';
                    break;
                case 3:
                    policeCar3.style.visibility = 'hidden';
                    policeCar1.style.visibility = 'visible';
                    policeCar2.style.visibility = 'visible';
                    policeCar4.style.visibility = 'visible';
                    policeCar5.style.visibility = 'visible';
                    policeCar6.style.visibility = 'visible';

                    policeCar1.style.top = truckYPos + '%';
                    policeCar2.style.top = truckYPos + '%';
                    policeCar4.style.top = truckYPos + '%';
                    policeCar5.style.top = truckYPos + '%';
                    policeCar6.style.top = truckYPos + '%';
                    break;
                case 4:
                    policeCar4.style.visibility = 'hidden';
                    policeCar1.style.visibility = 'visible';
                    policeCar2.style.visibility = 'visible';
                    policeCar3.style.visibility = 'visible';
                    policeCar5.style.visibility = 'visible';
                    policeCar6.style.visibility = 'visible';

                    policeCar1.style.top = truckYPos + '%';
                    policeCar2.style.top = truckYPos + '%';
                    policeCar3.style.top = truckYPos + '%';
                    policeCar5.style.top = truckYPos + '%';
                    policeCar6.style.top = truckYPos + '%';
                    break;
                case 5:
                    policeCar5.style.visibility = 'hidden';
                    policeCar1.style.visibility = 'visible';
                    policeCar2.style.visibility = 'visible';
                    policeCar3.style.visibility = 'visible';
                    policeCar4.style.visibility = 'visible';
                    policeCar6.style.visibility = 'visible';

                    policeCar1.style.top = truckYPos + '%';
                    policeCar2.style.top = truckYPos + '%';
                    policeCar3.style.top = truckYPos + '%';
                    policeCar4.style.top = truckYPos + '%';
                    policeCar6.style.top = truckYPos + '%';
                    break;
                case 6:
                    policeCar6.style.visibility = 'hidden';
                    policeCar1.style.visibility = 'visible';
                    policeCar2.style.visibility = 'visible';
                    policeCar3.style.visibility = 'visible';
                    policeCar4.style.visibility = 'visible';
                    policeCar5.style.visibility = 'visible';

                    policeCar1.style.top = truckYPos + '%';
                    policeCar2.style.top = truckYPos + '%';
                    policeCar3.style.top = truckYPos + '%';
                    policeCar4.style.top = truckYPos + '%';
                    policeCar5.style.top = truckYPos + '%';
                    break;
            }
        }

        function makeTruckAssetHidden(){
            //console.log('hitmaketruck hidden');
            switch(prevTruckSeq){
                case 1:
                    policeCar1.style.visibility = 'hidden';
                    policeCar2.style.visibility = 'hidden';
                    policeCar3.style.visibility = 'hidden';
                    policeCar4.style.visibility = 'hidden';
                    policeCar5.style.visibility = 'hidden';
                    policeCar6.style.visibility = 'hidden';
                    break;

                case 2:
                    redPoliceCar1.style.visibility = 'hidden';
                    redPoliceCar2.style.visibility = 'hidden';
                    redPoliceCar3.style.visibility = 'hidden';
                    redPoliceCar4.style.visibility = 'hidden';
                    redPoliceCar5.style.visibility = 'hidden';
                    redPoliceCar6.style.visibility = 'hidden';
                    break;

                case 3:
                    greenPoliceCar1.style.visibility = 'hidden';
                    greenPoliceCar2.style.visibility = 'hidden';
                    greenPoliceCar3.style.visibility = 'hidden';
                    greenPoliceCar4.style.visibility = 'hidden';
                    greenPoliceCar5.style.visibility = 'hidden';
                    greenPoliceCar6.style.visibility = 'hidden';
                    break;

                case 4:
                    yellowPoliceCar1.style.visibility = 'hidden';
                    yellowPoliceCar2.style.visibility = 'hidden';
                    yellowPoliceCar3.style.visibility = 'hidden';
                    yellowPoliceCar4.style.visibility = 'hidden';
                    yellowPoliceCar5.style.visibility = 'hidden';
                    yellowPoliceCar6.style.visibility = 'hidden';
                    break;
            }
            /*console.log('hitswitch');
            console.log(policeCar1);*/

        }

        function timeUp(){
            timerRunning = false;
            animationState = null; //makes trucks move down
            /*console.log(sportsCar.style.top);
            var currentPlayerYPos  = sportsCar.style.top;
            while (currentPlayerYPos > -2000) { //make player car go up and off screen
                currentPlayerYPos -= 1;
                sportsCar.style.top = currentPlayerYPos + 'px';
            }*/
            let sum = 0;
            let i;
            for(i = 1; i < inputTime.length; i++){ //skip the first value in the inputtime array
                sum += inputTime[i];
            }
            var avgInputTime = sum/i;
            var avgInputTimeStr = (avgInputTime /** 100 / 100*/) + "";

            endSlide = true;
            tutorialText2.style.visibility = 'hidden';
            tutorialSign.style.visibility = 'visible';
            introText.style.visibility = 'visible';
            tutButton.style.visibility = 'visible';
            tutorialSign2.style.visibility = 'hidden';
            introText2.style.visibility = 'hidden';
            if(score === 1){
                introText.innerHTML = "You scored " + score + " point";
            }
            else{
                introText.innerHTML = "You scored " + score + " points and had an average input time of " +  parseFloat(avgInputTimeStr).toFixed(2) + " ms";
            }
            tutButton.innerHTML = "NEW GAME";
            /*alert("TIME IS UP, YOU SCORED: " + score + " POINTS");
            window.close();*/
        }

        function changeValues(){
            switch(changeValCounter){
                case 1: brakeV = .04 - portraitOffset;
                        maxCarV = 2.5;
                        break;

                case 2: brakeV = .055 - portraitOffset;
                        maxCarV = 2.75;
                        break;

                case 3: brakeV = .07 - portraitOffset;
                        maxCarV = 3;
                        break;

                case 4: brakeV = .1025 - portraitOffset;
                        maxCarV = 3.25;
                        break;

                case 5: brakeV = .135 - portraitOffset;
                        maxCarV = 3.5;
                        break;

                case 6: brakeV = .1675 - portraitOffset;
                        maxCarV = 3.75;
                        break;
            }
        }

        function checkInput() {
            console.log(currentLanePos);
            console.log(copPattern[iterator]);
            //for timed mode

            /*if (currentLanePos === copPattern[iterator]) { //player gave right input
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
                animationState = 'movingDown';*/
            if(currentLanePos === copPattern[iterator]){ //player gave right input
                truckSound.play();
                let userInputTime = tempTime - remainingTime;
                inputTime.push(userInputTime); //array used for average time user took to input a lane
                dataPoint.push(userInputTime);
                dataPoint.push(currentTruckSequence);
                listOfDataPoints.push(dataPoint);
                //console.log(listOfDataPoints);
                console.log(dataPoint);
                score += 1;
                if(score % incrementSpeed === 0){
                    changeValCounter++;
                    changeValues();
                }
                /*document.getElementById("Truck").innerText = score + "";*/
                drawCopsRemainingText();
                iterator++;
                /*if(iterator === copPattern.length){//if the iterator reaches the end of the the copppattern, then add more trucksequence portions to copPattern
                    getNextTruckSequence();
                    ////changeTruckAsset();
                }*/
                //drawScore(); //need to make this function to replace cops remaining cuz endless mode
                correctInputGiven = true;
                animationState = 'movingDown';
            } else {//player gave wrong input
                crashSound.play();
                lives--;
                wrongInputGiven = true;
                /*if(lives === 0){
                    alert("All lives lost");
                }
                else{
                    animationState = 'movingDown';
                }*/
                animationState = 'movingDown';
            }

        }
    }
return plugin;
})();
