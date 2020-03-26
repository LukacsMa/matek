window.onload = allStorage;


let usersArray = [];
let pointsArray = [];

function allStorage() {
  let userPoints = [];
  let storageKeys = [];

  function forEachKey() {
    for (var i = 0; i < localStorage.length; i++) {
      storageKeys.push(localStorage.key(i));
    }
    return storageKeys;
  }

  let myKeys = forEachKey();

  let values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }

  for (let i = 0; i < values.length; i++) {
    userPoints.push([myKeys[i], values[i]])
  }

  return userPoints;
}

let allUsers = allStorage();


for (let i = 0; i < allUsers.length; i++) {
  usersArray.push(allUsers[i][0]);
  pointsArray.push(allUsers[i][1])
}



function checkUser() {
  yourName2 = document.getElementById("nickName").value.toLowerCase();
  yourName1 = document.getElementById("nickName").value.charAt(0).toUpperCase();
  yourName = yourName1 + yourName2.slice(1);

  if (usersArray.includes(yourName)) {
    let index = usersArray.indexOf(yourName);
    yourPoints = pointsArray[index];
    document.getElementById("udv").innerHTML = `Szia ${yourName}! <br/> Eddigi legjobb pontszámod: ${yourPoints}`;

  } else if (yourName != "") {
    localStorage.setItem(yourName, 0);
    yourPoints = 0;
    document.getElementById("udv").innerHTML = `Szia ${yourName}!`;

  } else {
    alert("Enter a name!")
  }


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

//generate first number

let lim;

//generate numbers to addition 
function randomNumber1() {
  lim = 10;
  yourNumber1 = Math.floor(Math.random() * lim + 1);
  yourNumber2 = yourNumber1 + Math.floor(Math.random() * lim + 1);
  yourNumber3 = yourNumber2 - yourNumber1;
  myNumber2.innerText = yourNumber3;
  myNumber1.innerText = yourNumber1;
}

//number1 - number2 >= 0!   
function randomNumber2() {
  lim = 10;
  yourNumber2 = Math.floor(Math.random() * lim + 1);
  yourNumber1 = yourNumber2 + Math.floor(Math.random() * lim + 1);
  myNumber1.innerText = yourNumber1;
  myNumber2.innerText = yourNumber2;
}

let countDown = 300;

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
  document.getElementsByClassName("firstContainer")[0].style.display = "none";
  document.getElementById("startButton").disabled = true;
  document.getElementById("startButtonDiv").style.display = "none";
  document.getElementById("checkButtonDiv").style.display = "block";
  randomMake();
  mySecond = setInterval(countDownFunc, 1000);
  myImage.src = "paradicsom.png";
}

function stop2() {
  clearInterval(mySecond)
};

function stop() {
  stop2();
  myImage.src = "hurra.gif";
  document.getElementById("points").innerText = `Gratulálok! ${yourPoint} pontot szereztél`;
  countDown = 300;
  document.getElementById("startButton").disabled = false;
  document.getElementById("startButtonDiv").style.display = "block";
  document.getElementById("checkButtonDiv").style.display = "none";

  if (yourPoints === undefined || yourPoint > yourPoints) {
    localStorage.setItem(yourName, yourPoint);
  } else {
    localStorage.setItem(yourName, yourPoints);
  }
}



setTimeout(stop, 100 * 300);

//check the answer

let yourPoint = 0;
let myAnswer;

function check() {
  let yourAnswer = Number(document.querySelector("#answer").value);
  if (j === 0) {
    myAnswer = yourNumber1 + yourNumber3;
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
