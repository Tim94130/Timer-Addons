// Gestion de la connexion et transition vers la section de jeu
document.getElementById("login-button").addEventListener("click", (e) => {
  e.preventDefault();

  // Validation des champs d'entrée
  const username = document.querySelector(".inputBox input[type='text']").value;
  if (username.trim() === "") {
    alert("Please enter your username.");
    return;
  }

  // Cache le wallpaper et affiche la section du jeu après la transition
  const wallpaper = document.getElementById("wallpaper");
  wallpaper.classList.add("hidden");

  setTimeout(() => {
    wallpaper.style.display = "none";
    document.getElementById("game-section").style.display = "block";
  }, 1000); // Durée de la transition
});

let timerInterval;
let preparationInterval;

document.getElementById("dice-image").src = "Assets/dice.svg";

// Lancer le dé et démarrer le compte à rebours de préparation
document.getElementById("roll-dice").addEventListener("click", () => {
  const diceImage = document.getElementById("dice-image");
  const diceResult = document.getElementById("dice-result");
  const delayMessage = document.getElementById("delay-message");
  const timerDisplay = document.getElementById("timer");
  const progressBar = document.getElementById("progress-bar");

  // Cacher le timer principal et réinitialiser la barre de progression avant un nouveau cycle
  timerDisplay.style.display = "none"; // Cacher le timer
  progressBar.style.display = "none"; // Cacher la barre de progression
  progressBar.style.width = "0%"; // Réinitialiser la largeur de la barre de progression

  // Réinitialiser les minuteries avant un nouveau cycle
  clearInterval(timerInterval);
  clearInterval(preparationInterval);

  // Initialiser l'animation du dé
  diceImage.src = "Assets/dice.svg"; // Image de dé en rotation
  diceImage.style.animation = "roll-animation 0.5s linear infinite";

  // Arrêter l'animation et afficher le résultat après 2 secondes
  setTimeout(() => {
    const diceRoll = Math.floor(Math.random() * 6) + 1; // Résultat aléatoire
    diceImage.style.animation = ""; // Retirer l'animation
    diceImage.src = `Assets/dice${diceRoll}.svg`; // Afficher la face du dé
    diceImage.style.animation = "dice-flash 0.4s ease"; // Ajouter un effet de flash
    diceResult.textContent = `Your roll: ${diceRoll}`;

    // Afficher un message de préparation
    delayMessage.style.display = "block";
    delayMessage.textContent =
      "Get ready! The timer will start in 15 seconds...";

    // Démarrer le compte à rebours de préparation
    let preparationTime = 15;
    preparationInterval = setInterval(() => {
      preparationTime -= 1;
      if (preparationTime === 0) {
        clearInterval(preparationInterval);
        delayMessage.style.display = "none"; // Cacher le message après le compte à rebours

        // Afficher le timer principal et la barre de progression
        timerDisplay.style.display = "block"; // Afficher le timer
        progressBar.style.display = "block"; // Afficher la barre de progression
        startTimer(45); // Démarrer le minuteur principal
      }
    }, 1000);
  }, 2000); // Attendre que l'animation du dé soit terminée
});

// Démarrer un minuteur principal et l'afficher
function startTimer(duration) {
  let timeRemaining = duration;
  const timerDisplay = document.getElementById("timer");
  const progressBar = document.getElementById("progress-bar"); // La barre de progression
  const progressBarFill = document.getElementById("progress-bar-fill");

  // Afficher la barre de progression et réinitialiser sa largeur
  progressBar.style.display = "block";
  progressBarFill.style.width = "100%"; // Remplir la barre au maximum au début

  const timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timerDisplay.textContent = `Time left: ${timeRemaining} seconds`;
      progressBarFill.style.width = `${(timeRemaining / duration) * 100}%`; // Mise à jour du pourcentage de la barre
      timeRemaining -= 1;
    } else {
      clearInterval(timerInterval);
      timerDisplay.textContent = "Time's up!";
      document.getElementById("finish").style.display = "block"; // Afficher le bouton Finish
    }
  }, 1000);
}

// Démarrer un minuteur principal avec barre de progression
function startTimer(duration) {
  let timeRemaining = duration;
  const timerDisplay = document.getElementById("timer");
  const progressBar = document.getElementById("progress-bar");

  timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timerDisplay.textContent = `Time left: ${timeRemaining} seconds`;
      timeRemaining -= 1;

      // Mettre à jour la barre de progression
      const progressPercentage = ((duration - timeRemaining) / duration) * 100;
      progressBar.style.width = `${progressPercentage}%`;
    } else {
      clearInterval(timerInterval);
      timerDisplay.textContent = "Time's up!";
      document.getElementById("finish").style.display = "block"; // Afficher le bouton Finish
    }
  }, 1000);
}
