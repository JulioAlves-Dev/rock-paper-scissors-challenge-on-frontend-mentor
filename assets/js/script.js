// MODAL RULES
const el = (e) => document.querySelector(e),
  elAll = (els) => document.querySelectorAll(els),
  rulesModal = el("div.modal-rules"),
  buttonRulesModalOpen = el("footer .buttons button[data-modal-rules-open]"),
  buttonRulesModalClose = el(
    "div.modal-rules .modal-title-and-close button[data-modal-rules-close]"
  );

buttonRulesModalOpen.addEventListener("click", openModalRules);
buttonRulesModalClose.addEventListener("click", closeModalRules);
function openModalRules() {
  rulesModal.classList.remove("modalRulesAnimationClose");
  rulesModal.style.display = "flex";
  rulesModal.classList.add("modalRulesAnimationOpen");
}
function closeModalRules() {
  rulesModal.classList.remove("modalRulesAnimationOpen");
  rulesModal.classList.add("modalRulesAnimationClose");
  setTimeout(() => {
    rulesModal.style.display = "none";
  }, 499);
}
//

// GAMES

const game = el("main .game");
const games = elAll("main .game div[data-game]");
const gameSelect1 = el("main .game .game-selected-1");
const gameSelectAgain = el("main .game .game-play-again");
const gameSelect2 = el("main .game .game-selected-2");

const gameSelectInt1 = gameSelect1.querySelector(".games-selected-1-int");
const gameSelectInt2 = gameSelect2.querySelector(".games-selected-2-int");

const nameItemsGameArray = ["paper", "scissors", "rock"];

const buttonGameAgain = gameSelectAgain.querySelector("button");

const scoreDiv = el("header .score div");
const valueLocalSt = localStorage.getItem("score-game");

let valueComFinal = "";
let valueMyFinal = "";
let lastWinner = "";
let scoreGame = 0;

if (+valueLocalSt > 0) {
  scoreGame = +valueLocalSt;
  scoreDiv.innerText = +valueLocalSt;
}
games.forEach((game) => {
  game.addEventListener("click", () => gameFunction(game.dataset.game));
});

function addStyleClassGame(value, result, win) {
  valueComFinal = value;
  lastWinner = win;
  gameSelectInt2.classList.add(valueComFinal);
  gameSelect2.querySelector("img").src = `./images/icon-${valueComFinal}.svg`;
  gameSelect2.querySelector("img").alt = valueComFinal;
  gameSelectAgain.querySelector("h2").innerText = result;
  if (result === "TIED" || result === "YOU WIN")
    buttonGameAgain.style.color = "hsl(230, 89%, 62%)";
  else buttonGameAgain.style.color = "hsl(349, 71%, 52%)";

  if (result === "YOU WIN") {
    gameSelectInt1.id = `${win}-winner`;
    scoreGame = scoreGame + 1;
    scoreDiv.innerText = scoreGame;
    localStorage.setItem("score-game", scoreGame);
  } else if (result === "YOU LOSE") {
    gameSelectInt2.id = `${win}-winner`;
  }
}

function gameAgain() {
  [gameSelect1, gameSelectAgain, gameSelect2].forEach((e) => {
    e.style.display = "none";
  });
  games.forEach((e) => {
    game.classList.remove("grid-area-select");
    game.classList.add("grid-area-select-default");
    e.style.display = "flex";
  });
  gameSelectInt1.classList.remove(valueMyFinal);
  gameSelectInt2.classList.remove(valueComFinal);
  gameSelectInt1.id = "";
  gameSelectInt2.id = "";
  gameSelect2.querySelector("img").src = `./images/question-solid.svg`;
  gameSelect2.querySelector("img").alt = "?";
}

function gameFunction(data) {
  valueMyFinal = data;
  games.forEach((game) => {
    game.style.display = "none";
  });

  gameSelect1.style.display = "flex";
  gameSelect2.style.display = "flex";
  gameSelectInt1.classList.add(data);
  gameSelect1.querySelector("img").src = `./images/icon-${data}.svg`;
  gameSelect1.querySelector("img").alt = data;
  game.classList.add("grid-area-select");
  game.classList.remove("grid-area-select-default");

  setTimeout(() => {
    const numberAleatory = Math.floor(Math.random() * (3 - 0) + 0);
    const valueCom = nameItemsGameArray[numberAleatory];

    if (data === valueCom) {
      addStyleClassGame(data, "TIED");
    } else if (data === "paper" && valueCom === "rock") {
      addStyleClassGame(valueCom, "YOU WIN", data);
    } else if (data === "paper" && valueCom === "scissors") {
      addStyleClassGame(valueCom, "YOU LOSE", valueCom);
    } else if (data === "scissors" && valueCom === "paper") {
      addStyleClassGame(valueCom, "YOU WIN", data);
    } else if (data === "scissors" && valueCom === "rock") {
      addStyleClassGame(valueCom, "YOU LOSE", valueCom);
    } else if (data === "rock" && valueCom === "scissors") {
      addStyleClassGame(valueCom, "YOU WIN", data);
    } else if (data === "rock" && valueCom === "paper") {
      addStyleClassGame(valueCom, "YOU LOSE", valueCom);
    }
    gameSelectAgain.style.display = "flex";
    buttonGameAgain.addEventListener("click", gameAgain);
  }, 2000);
}
