// const textEl = document.getElementById('text');
// const speedEl = document.getElementById('speed');

// const text = "ຍີນດີຕ້ອນຮັບສູ່ໜ້າຫຼັກເວັບໄຊ";
// let speed = 300 / speedEl.value;

// let characterId = 1;

// writeText();

// function writeText() {
//     textEl.innerText = text.slice(0, characterId);
//     characterId++;
//     if (characterId > text.length) {
//         characterId = 1;
//     }
//     setTimeout(writeText, speed);
// }

// speedEl.addEventListener('input', (e) => {
//     speed = 300 / e.target.value;
// });

//change this code to jQuery
$(document).ready(function () {
    const textEl = $('#text');
    const speedEl = $('#speed');

    const text = "ຍີນດີຕ້ອນຮັບສູ່ໜ້າຫຼັກເວັບໄຊ";
    let speed = 300 / speedEl.val();

    let characterId = 1;

    writeText();
    //make function writeText
    function writeText() {
        //get text
        textEl.text(text.slice(0, characterId));
        //increase characterId
        characterId++;
        //check if characterId > text.length
        if (characterId > text.length) {
            //set characterId = 1
            characterId = 1;
        }
        //set timeout for writeText
        setTimeout(writeText, speed);
    }
    //make event listener for speedEl
    speedEl.on('input', function (e) {
        //set speed = 300 / speedEl.value
        speed = 300 / e.target.value;
    });
});