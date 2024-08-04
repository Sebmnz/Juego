document.addEventListener('DOMContentLoaded', () => {
    const leftSide = document.getElementById('left-side');
    const rightSide = document.getElementById('right-side');
    const message = document.getElementById('message');
    const startButton = document.getElementById('start-button');
    const introMessage = document.getElementById('intro-message');
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
        leftScore++;
        updateSizes();
    }

    function incrementRightScore() {
        rightScore++;
        updateSizes();
    }

    function startGame() {
        startButton.style.display = 'none';
        introMessage.style.display = 'none';
        document.getElementById('game-container').style.display = 'flex';
        leftSide.addEventListener('click', incrementLeftScore);
        rightSide.addEventListener('click', incrementRightScore);
    }

    const randomOption = getRandomOption();
    introMessage.textContent = `A continuación vais a jugar uno contra el otro y el perdedor tendrá que ${randomOption}.`;

    startButton.addEventListener('click', startGame);

    updateSizes();
});
