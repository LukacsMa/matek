let yourPoints;
let yourPoint = 0;
function checkUser() {
  let yourName2 = document.getElementById("nickName").value.toLowerCase();
  let yourName1 = document.getElementById("nickName").value.charAt(0).toUpperCase();
  yourName = yourName1 + yourName2.slice(1);

  if (localStorage.getItem(yourName) != undefined) {

    yourPoints = localStorage.getItem(yourName);

    document.getElementById("udv").innerHTML = `Szia ${yourName}! <br/> Eddigi legjobb pontszámod: ${yourPoints}`;

  } else if (yourName != "") {
    yourPoints = 0;
    document.getElementById("udv").innerHTML = `Szia ${yourName}!`;

  } else {
    alert("Enter a name!")
  }

  console.log(yourName);
  console.log(yourPoints);

  document.getElementById("startButtonDiv").style.display = "block";

}

let myNumber1 = document.querySelector("#number1");
let myNumber2 = document.querySelector("#number2");
let myMake = document.querySelector("#make");
let myTimer = document.querySelector("#timer");
let myImage = document.querySelector("#tomato");
let audioHelyes = document.querySelector("#helyes");
let audioHelytelen = document.querySelector("#helytelen");


myNumber1.innerText = "";
myNumber2.innerText = "";
myMake.innerText = "";
document.querySelector("#answer").value = "";
myImage.src = "paradicsom.png";


let lim;
let yourNumber1;
let yourNumber2;
//generate numbers to addition 
function randomNumber1() {
  lim = 20;
  yourNumber1 = Math.floor(Math.random() * lim + 1);
  lim = 20 - yourNumber1;
  yourNumber2 = Math.floor(Math.random() * lim + 1);
  myNumber2.innerText = yourNumber2;
  myNumber1.innerText = yourNumber1;
}

//number1 - number2 >= 0!   
function randomNumber2() {
  lim = 20;
  yourNumber1 = Math.floor(Math.random() * lim + 1);
  lim = yourNumber1;
  yourNumber2 = Math.floor(Math.random() * lim + 1);
  myNumber1.innerText = yourNumber1;
  myNumber2.innerText = yourNumber2;
}

let countDown = 60;

function countDownFunc() {
  let countDownMin = Math.floor(countDown / 60);
  let countDownSec = countDown - countDownMin * 60;
  if (countDownSec < 10) {
    myTimer.innerText = `${countDownMin} : 0${countDownSec}`;
  } else {
    myTimer.innerText = `${countDownMin} : ${countDownSec}`;
  }

  countDown -= 1;

}

let j;

function randomMake() {
  let makeArray = ['+', "-"];
  j = Math.floor(Math.random() * 2);
  myMake.innerText = makeArray[j];

  if (j === 0) {
    randomNumber1();
  } else if (j === 1) {
    randomNumber2();
  }
}

let mySecond;

function start() {
  //clear window
  yourPoint = 0;
  document.getElementsByClassName("firstContainer")[0].style.display = "none";
  document.getElementById("startButton").disabled = true;
  document.getElementById("startButtonDiv").style.display = "none";
  document.getElementById("checkButtonDiv").style.display = "block";
  randomMake();
  mySecond = setInterval(countDownFunc, 1000);
  myImage.src = "paradicsom.png";
  setTimeout(stop, 1000 * countDown);
}

function stop2() {
  clearInterval(mySecond);
};

function stop() {
  stop2();
  myImage.src = "hurra.gif";
  document.getElementById("points").innerText = `Gratulálok! ${yourPoint} pontot szereztél`;
  countDown = 60;
  document.getElementById("startButton").disabled = false;
  document.getElementById("startButtonDiv").style.display = "block";
  document.getElementById("checkButtonDiv").style.display = "none";

  if (yourPoints === undefined || yourPoint > yourPoints) {
    localStorage.setItem(yourName, yourPoint);
  } else {
    localStorage.setItem(yourName, yourPoints);
  }
}



//check the answer


let myAnswer;

function check() {
  let yourAnswer = Number(document.querySelector("#answer").value);
  if (j === 0) {
    myAnswer = yourNumber1 + yourNumber2;
  } else if (j === 1) {
    myAnswer = yourNumber1 - yourNumber2;
  }

  console.log(myAnswer, yourAnswer);

  if (yourAnswer == myAnswer) {
    yourPoint += 10;
    audioHelyes.play(),
      document.getElementById("points").innerText = yourPoint;
    document.querySelector("#answer").value = "";
    randomMake();

  } else {
    document.querySelector("#answer").value = "";
    yourPoint -= 5;
    audioHelytelen.play();
    document.getElementById("points").innerText = yourPoint;

  }

}
