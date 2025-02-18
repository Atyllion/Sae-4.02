import { MultipleObject, MoveTheObjects } from "./objects.js";
import { PersonArrival, PersonDeparture, InitTask } from "./characters.js";


let gameStarted = false;

function handleStartButtonClick(element) {
    if (element.getAttribute("id") === "startButton") {
        document.querySelector("#StartMenu")?.remove();
        init();
    }
}

function startGame() {
    AFRAME.registerComponent("event-listener", {
        init: function () {
            this.el.addEventListener("hit", () => handleStartButtonClick(this.el));
            this.el.addEventListener("click", () => handleStartButtonClick(this.el));
        },
    });
}

function init() {
    MultipleObject();
    PersonArrival();
    InitTask();
    Timer();
    requestAnimationFrame(MoveTheObjects); // Ensure MoveTheObjects is called continuously
    
    console.log("Game started !");
}

function Timer() {
    let textTime = document.querySelector("#timer");
    let countdown = 120; // changer la valeur de countdown pour changer la durée du jeu
    let timer = setInterval(function () {
        if (countdown > 0) {
            countdown--;
            textTime.setAttribute("value", countdown);
        } else {
            clearInterval(timer);
            StopGame();
        }
    }, 1000);
}

function StopGame() {
    gameStarted = false;
    const scene = document.querySelector("a-scene");

    // Remove all objects and persons from the scene
    objectsArray.forEach((obj) => {
        if (obj.entity && obj.entity.parentNode) {
            obj.entity.parentNode.removeChild(obj.entity);
        }
    });

    randomObjectInterval = null;

    objectsArray = [];

    const persons = document.querySelectorAll("[class^='person']");
    persons.forEach((person) => {
        if (person.parentNode) {
            person.parentNode.removeChild(person);
        }
    });

    // Stop the random object creation
    clearInterval(randomObjectInterval);

    // Display game over text
    const endMenu = document.createElement("a-entity");
    endMenu.setAttribute("id", "EndMenu");
    endMenu.setAttribute("position", "0 3.66735 -2.3");
    endMenu.setAttribute("rotation", "29.999999999999996 0 0");
    endMenu.setAttribute("scale", "2 2 2");

    const gameOverText = document.createElement("a-text");
    gameOverText.setAttribute("value", "Time's Up ! Your Score :");
    gameOverText.setAttribute("align", "center");
    gameOverText.setAttribute("color", "red");
    gameOverText.setAttribute("text", "color: yellow; font: kelsonsans; side: double; width: 1; wrapCount: 12");
    gameOverText.setAttribute("position", "0 0.83546 -0.48235");

    const gameOverScore = document.createElement("a-text");
    gameOverScore.setAttribute("value", "0");
    gameOverScore.setAttribute("align", "center");
    gameOverScore.setAttribute("color", "red");
    gameOverScore.setAttribute("text", "color: #ffffff; side: double; width: 1.5; wrapCount: 10");
    gameOverScore.setAttribute("position", "0 -0.35 -0.0053");

    gameOverText.appendChild(gameOverScore);

    const highScoreText = document.createElement("a-text");
    highScoreText.setAttribute("value", "High scrore :");
    highScoreText.setAttribute("align", "center");
    highScoreText.setAttribute("color", "red");
    highScoreText.setAttribute("text", "color: yellow; font: kelsonsans; side: double; width: 1; wrapCount: 12");
    highScoreText.setAttribute("position", "0 0.20721 -0.11963");

    const highScoreValue = document.createElement("a-text");
    highScoreValue.setAttribute("value", "0");
    highScoreValue.setAttribute("align", "center");
    highScoreValue.setAttribute("color", "red");
    highScoreValue.setAttribute("text", "color: #ffffff; side: double; width: 1.5; wrapCount: 10");
    highScoreValue.setAttribute("position", "0 -0.3 -0.02313");

    highScoreText.appendChild(highScoreValue);

    endMenu.appendChild(gameOverText);
    endMenu.appendChild(highScoreText);

    scene.appendChild(endMenu);
}

startGame();