const rangeRadios = document.querySelectorAll("input[name='selection']");
const inputBox = document.getElementById("input-number");
const answerBox = document.getElementById("answer-box");
const checkButton = document.getElementById("send-button");
const resetButton = document.getElementById("reset-button");
const confirmButton = document.getElementById("confirm-selection");
const attempsCounter = document.getElementById("attemps-counter");
const leaderboardArea = document.getElementById("leaderboard");
const resetLeaderboardButton = document.getElementById("reset-leaderboard");
let leaderboard = [];
let randomNumber, minRange, maxRange;
let attemps = 0;

confirmButton.addEventListener('click', (event) => {
    event.preventDefault(); // Evita il ricaricamento della pagina

    // Trova l'opzione selezionata
    const selectedRange = document.querySelector('input[name="selection"]:checked').value;
    [minRange, maxRange] = selectedRange.split('-').map(Number);

    // Genera un numero casuale nel range selezionato
    randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;

    // Abilita i controlli di gioco
    inputBox.disabled = false;
    checkButton.disabled = false;
    resetButton.disabled = false;
});

const verifyNumber = () => {   
    let userNumber = parseInt(inputBox.value);
    let answer = document.createElement("p")
    if (!userNumber || userNumber < minRange || userNumber > maxRange) {
        window.alert(`Scegli un numero compreso tra ${minRange} e ${maxRange}`);
        inputBox.value = "";
    } else if (randomNumber > userNumber) {
        answer.innerText = `Il numero ${userNumber} scelto è troppo basso!`;
        answer.setAttribute("class","error");
        answerBox.appendChild(answer)
        inputBox.value = "";
        attemps++;
        attempsCounter.textContent = `Tentativi: ${attemps}`;
    } else if (randomNumber < userNumber) {
        answer.innerText = `Il numero ${userNumber} scelto è troppo alto!`;
        answer.setAttribute("class","error");
        answerBox.appendChild(answer)
        inputBox.value = "";
        attemps++;
        attempsCounter.textContent = `Tentativi: ${attemps}`;
    } else if (randomNumber === userNumber) {
        attemps++;
        answerBox.innerText = `Congratulazioni!! Hai indovinato in ${attemps} tentativi`;
        answerBox.setAttribute("class","success");
        inputBox.value = "";
        checkButton.disabled = true;
        insertLeaderboardValue(attemps);       
    }
}

const resetGame = () => {
    answerBox.innerText = "Seleziona e conferma un nuovo range per giocare nuovamente";
    answerBox.removeAttribute("class");
    inputBox.disabled = true;
    checkButton.disabled = true;
    resetButton.disabled = true;
    confirmButton.disabled = true;
    randomNumber = null;
    attemps = 0;
    attempsCounter.textContent = `Tentativi: ${attemps}`;

}

const updateLeaderboard = () => {
    leaderboardArea.innerHTML = "";

    leaderboard.sort((a,b) => a.score - b.score);

    leaderboard.forEach((entry) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `Giocatore: ${entry.name} - Tentativi: ${entry.score}` 
        leaderboardArea.appendChild(listItem);
    })
}
const insertLeaderboardValue = (attemps) => {
    const userName = prompt("Inserisci il tuo nome:");
    if (!userName) return;

    leaderboard.push({"name" : userName, "score" : attemps});
    updateLeaderboard();

}

const resetLeaderboard = () => {
    leaderboard = [];
    leaderboardArea.innerHTML = "";
}

checkButton.addEventListener("click", verifyNumber);
resetButton.addEventListener("click", resetGame);
resetLeaderboardButton.addEventListener("click", resetLeaderboard);