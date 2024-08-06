document.addEventListener('DOMContentLoaded', () => {
    const leftSide = document.getElementById('left-side');
    const rightSide = document.getElementById('right-side');
    const message = document.getElementById('message');
    const startButton = document.getElementById('start-button');
    const introMessage = document.getElementById('intro-message');
    const dots = document.getElementById('dots');
    const finalOption = document.getElementById('final-option');
    const clickSound = document.getElementById('click-sound');
    let leftScore = 10;  // Iniciar con 10 puntos
    let rightScore = 10;  // Iniciar con 10 puntos

    const options = [
        'invitar a un chupito al otro',
        'darle un beso al otro',
        'jugar verdad o atrevimiento'
    ];

    function getRandomOption() {
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
    }

    function showFinalOption() {
        dots.style.display = 'none';
        const randomOption = getRandomOption();
        finalOption.textContent = randomOption;
        finalOption.style.display = 'inline';
    }

    function updateSizes() {
        const totalScore = leftScore + rightScore;
        const leftPercentage = totalScore === 0 ? 50 : (leftScore / totalScore) * 100;
        const rightPercentage = 100 - leftPercentage;

        leftSide.style.flexBasis = `${leftPercentage}%`;
        rightSide.style.flexBasis = `${rightPercentage}%`;

        // Ocultar los números
        leftSide.textContent = '';
        rightSide.textContent = '';

        checkForWinner();
    }

    function checkForWinner() {
        if (leftScore >= rightScore * 2) {
            endGame('¡Rojo gana!');
        } else if (rightScore >= leftScore * 2) {
            endGame('¡Azul gana!');
        }
    }

    function endGame(winner) {
        message.textContent = winner;
        message.style.display = 'block';
        leftSide.removeEventListener('click', incrementLeftScore);
        rightSide.removeEventListener('click', incrementRightScore);

        // Redirigir a una web específica después de 12 segundos
        setTimeout(() => {
            window.location.href = 'https://www.example.com'; // Reemplaza con la URL deseada
        }, 12000);
    }

    function incrementLeftScore() {
        let increment = 1;

        if (leftScore >= 40) {
            increment = 3;
        } else if (leftScore >= 25) {
            increment = 2;
        }

        // Bonus aleatorio
        if (Math.random() < 0.1) {
            increment += 5; // Bonus de 5 puntos
        }

        leftScore += increment;
        updateSizes();
        playClickSound();
        flashColor(leftSide, 'lightcoral');
    }

    function incrementRightScore() {
        let increment = 1;

        if (rightScore >= 40) {
            increment = 3;
        } else if (rightScore >= 25) {
            increment = 2;
        }

        // Bonus aleatorio
        if (Math.random() < 0.1) {
            increment += 5; // Bonus de 5 puntos
        }

        rightScore += increment;
        updateSizes();
        playClickSound();
        flashColor(rightSide, 'lightblue');
    }

    function playClickSound() {
        clickSound.currentTime = 0;
        clickSound.play();
    }

    function flashColor(element, color) {
        const originalColor = element.style.backgroundColor;
        element.style.backgroundColor = color;
        setTimeout(() => {
            element.style.backgroundColor = originalColor;
        }, 200);
    }

    function startGame() {
        startButton.style.display = 'none';
        introMessage.style.display = 'none';
        document.getElementById('game-container').style.display = 'flex';
        leftSide.addEventListener('click', incrementLeftScore);
        rightSide.addEventListener('click', incrementRightScore);
    }

    startButton.addEventListener('click', startGame);

    // Mostrar puntos suspensivos y luego la opción final
    setTimeout(showFinalOption, 3000);
});

    startButton.addEventListener('click', startGame);

    startSlotMachine();
});

