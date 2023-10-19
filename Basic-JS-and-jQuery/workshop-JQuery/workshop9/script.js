// const countDownForm = document.getElementById('countDownForm');
// const inputContainer = document.getElementById('input-container');
// const dateEl = document.getElementById('date-picker');
// const countDownEl = document.getElementById('countdown');

// const countdownTitleEl = document.getElementById('countdown-title');
// const countdownButtonEl = document.getElementById('countdown-button');
// const timeEl = document.querySelectorAll('span');

// const completeEl = document.getElementById('complete');
// const completeInfoEl = document.getElementById('complete-info');
// const completeButtonEl = document.getElementById('complete-button');


// let countDownTitle = '';
// let countDownDate = '';

// let countDownValue = Date;
// let countDownActive;
// let saveCountDown;

// const second = 1000;
// const minute = second * 60;
// const hour = minute * 60;
// const day = hour * 24;


// countDownForm.addEventListener('submit', updateCountDown);

// function updateCountDown(e) {
//     e.preventDefault();
//     countDownTitle = e.srcElement[0].value;
//     countDownDate = e.srcElement[1].value;

//     if (countDownTitle === '' || countDownDate === '') {
//         alert("ປ້ອນຂໍ້ມູນກ່ອນ");
//     } else {
//         saveCountDown = { title: countDownTitle, date: countDownDate };
//         localStorage.setItem("countDown", JSON.stringify(saveCountDown));
//         countDownValue = new Date(countDownDate).getTime();
//         setUpTime();
//     }
// }

// function setUpTime() {
//     countDownActive = setInterval(() => {
//         const now = new Date().getTime();
//         const distance = countDownValue - now;
//         const days = Math.floor(distance / day);
//         const hours = Math.floor((distance % day) / hour);
//         const minutes = Math.floor((distance % hour) / minute);
//         const seconds = Math.floor((distance % minute) / second);
//         inputContainer.hidden = true;
//         if (distance > 0) {
//             countDownEl.hidden = true;
//             completeEl.hidden = false;
//             completeInfoEl.textContent = `${countDownTitle} ວັນທີ່ ${countDownDate}`;
//             clearInterval(countDownActive);
//         } else {
//             countdownTitleEl.textContent = `${countDownTitle}`;
//             timeEl[0].textContent = `${days}`;
//             timeEl[1].textContent = `${hours}`;
//             timeEl[2].textContent = `${minutes}`;
//             timeEl[3].textContent = `${seconds}`;
//             countDownEl.hidden = false;
//             completeEl.hidden = true;
//         }

//     }, second);
// }


// function callDatainStore() {
//     if (localStorage.getItem("countDown")) {
//         inputContainer.hidden = true;
//         saveCountDown = JSON.parse(localStorage.getItem("countDown"));
//         countDownTitle = saveCountDown.title;
//         countDownDate = saveCountDown.date;
//         countDownValue = new Date(countDownDate).getTime();
//         setUpTime();
//     }
// }

// function reset() {
//     localStorage.removeItem("countDown");
//     countDownEl.hidden = true;
//     completeEl.hidden = true;
//     inputContainer.hidden = false;
//     clearInterval(countDownActive);
//     countDownTitle = '';
//     countDownDate = '';
// }

// callDatainStore();

// countdownButtonEl.addEventListener('click', reset);
// completeButtonEl.addEventListener('click', reset);

// change this to JQuery

$(document).ready(function () {
    const countDownForm = $('#countDownForm');
    const inputContainer = $('#input-container');
    const dateEl = $('#date-picker');
    const countDownEl = $('#countdown');

    const countdownTitleEl = $('#countdown-title');
    const countdownButtonEl = $('#countdown-button');
    const timeEl = $('span');

    const completeEl = $('#complete');
    const completeInfoEl = $('#complete-info');
    const completeButtonEl = $('#complete-button');


    let countDownTitle = '';
    let countDownDate = '';

    let countDownValue = Date;
    let countDownActive;
    let saveCountDown;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;


    updateCountDown = (e) => {
        e.preventDefault();
        countDownTitle = e.target[0].value;
        countDownDate = e.target[1].value;

        if (countDownTitle === '' || countDownDate === '') {
            alert("ປ້ອນຂໍ້ມູນກ່ອນ");
        } else {
            saveCountDown = { title: countDownTitle, date: countDownDate };
            localStorage.setItem("countDown", JSON.stringify(saveCountDown));
            countDownValue = new Date(countDownDate).getTime();
            setUpTime();
        }
    }

    setUpTime = () => {
        countDownActive = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownValue - now;
            const days = Math.floor(distance / day);
            const hours = Math.floor((distance % day) / hour);
            const minutes = Math.floor((distance % hour) / minute);
            const seconds = Math.floor((distance % minute) / second);
            inputContainer.hide();
            if (distance > 0) {
                countDownEl.hide();
                completeEl.show();
                completeInfoEl.text(`${countDownTitle} ວັນທີ່ ${countDownDate}`);
                clearInterval(countDownActive);
            } else {
                countdownTitleEl.text(`${countDownTitle}`);
                timeEl.eq(0).text(`${days}`);
                timeEl.eq(1).text(`${hours}`);
                timeEl.eq(2).text(`${minutes}`);
                timeEl.eq(3).text(`${seconds}`);
                countDownEl.show();
                completeEl.hide();
            }

        }, second);
    }


    callDatainStore = () => {
        if (localStorage.getItem("countDown")) {
            inputContainer.hide();
            saveCountDown = JSON.parse(localStorage.getItem("countDown"));
            countDownTitle = saveCountDown.title;
            countDownDate = saveCountDown.date;
            countDownValue = new Date(countDownDate).getTime();
            setUpTime();
        }
    }

    reset = () => {
        localStorage.removeItem("countDown");
        countDownEl.hide();
        completeEl.hide();
        inputContainer.show();
        clearInterval(countDownActive);
        countDownTitle = '';
        countDownDate = '';
    }

    callDatainStore();

    countdownButtonEl.on('click', reset);
    completeButtonEl.on('click', reset);
    countDownForm.on('submit', updateCountDown);
});