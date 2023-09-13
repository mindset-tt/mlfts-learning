$(document).ready(function () {
    const wordEl = $('#word');
    const textEl = $('#text');
    const scoreEl = $('#score');
    const timeEl = $('#time');

    const btnLevelEl = $('#level-btn');
    const settingsEl = $('#settings');
    const levelFormEl = $('#level-form');
    const levelEl = $('#level');
    const gameoverEl = $('#gameover-container');

    const words = ["ໝູ", "ແມວ", "ໄກ່", "ແຂ້", "ກະລຸນາ", "ຂອງ", "ລາວ", "ລູກ", "ລົງ", "ລົດ", "ລົມ", "ລົບ"];

    let randomText;
    let score = 0;
    let time = 10; // easy => 15 , medium => 10 , hard=> 5
    const saveMode = localStorage.getItem('mode') !== null ? localStorage.getItem('mode') : 'medium';

    let level = 'medium';

    const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

    const displayWordToUI = () => {
        randomText = getRandomWord();
        wordEl.html(randomText);
        timeEl.html(time);
    };

    textEl.on('input',  (e) => {
        const inputText = $(this).val();

        if (inputText === randomText) {
            if (saveMode == 'easy') {
                time += 5;
            } else if (saveMode == 'medium') {
                time += 3;
            } else if (saveMode == 'hard') {
                time += 2;
            } else {
                time += 1;
            }
            displayWordToUI();
            updateScore();
            $(this).val('');
        }
    });

    const updateScore = () => {
        score += 10;
        scoreEl.html(score);
    };

    const update = () => {
        time--;
        timeEl.html(time);
        if (time === 0) {
            clearInterval(timeInterval);
            gameOver();
        }
    };

    const timeInterval = setInterval(update, 1000);

    const gameOver = () => {
        gameoverEl.html(`
      <h1 style="color:crimson;">ຈົບເກມ!!! GAME OVER!!!!</h1>
      <p>ຄະແນນຂອງທ່ານແມ່ນ = ${score} ຄະແນນ</p>
      <button onclick="location.reload()" style="background-color:lightblue;">ຕ້ອງການເລ່ນອີກຄັ້ງ</button>
      `);
        gameoverEl.css('display', 'flex');
    };

    btnLevelEl.on('click', function () {
        settingsEl.toggleClass('hide');
    });

    levelEl.on('change', (e) => {
        level = $(this).val();
        localStorage.setItem('mode', level);
    });

    startGame = () => {
        levelEl.val(saveMode);
        if (saveMode == 'easy') {
            time = 15;
        } else if (saveMode == 'medium') {
            time = 10;
        } else if (saveMode == 'hard') {
            time = 5;
        } else {
            time = 3;
        }
        displayWordToUI();
    };

    let took = 'rr';
    if (took == 'rr') {
        let wordss = 'rr';
        console.log(wordss);
    }
    console.log(wordss);
    startGame();
    textEl.focus();
});