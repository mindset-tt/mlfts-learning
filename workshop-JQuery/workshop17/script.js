// const card=document.querySelector('.card');
const showBtn = document.getElementById('show');
const hiddenBtn = document.getElementById('btn-hidden');
const addContainer = document.getElementById('add-container');
const cardContainer = document.getElementById('card-container');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const currentEl = document.getElementById('current');
const clearBtn = document.getElementById('clear');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');

const addCard = document.getElementById('add-card');

let currentActiveCard = 0;
let cardsEl = []; // store all of question card
const cardData = getCardData();

function createCard() {
    cardData.forEach((data, index) => {
        createSingleCard(data, index);
    });
}

function createSingleCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (index == 0) {
        card.classList.add('active');
    }
    card.innerHTML = `
    <div class="inner-card">
                <div class="inner-card-front">
                    <p>${data.question}</p>
                </div>
                <div class="inner-card-back">
                    <p>${data.answer}</p>
                </div>
    </div>
    `;
    card.addEventListener('click', () => card.classList.toggle("show-answer"));
    cardsEl.push(card);
    cardContainer.appendChild(card);
    updateCurrentQuestion();
}

function updateCurrentQuestion() {
    currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}

createCard();
// card.addEventListener('click',()=>card.classList.toggle("show-answer"));
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
hiddenBtn.addEventListener('click', () => addContainer.classList.remove('show'));
nextBtn.addEventListener('click', () => {

    cardsEl[currentActiveCard].className = 'card left';
    currentActiveCard = currentActiveCard + 1;
    if (currentActiveCard > cardsEl.length - 1) { // amount 4 , 0,1,2,3
        currentActiveCard = cardsEl.length - 1;
    }
    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentQuestion();
});

prevBtn.addEventListener('click', () => {

    cardsEl[currentActiveCard].className = 'card right';
    currentActiveCard = currentActiveCard - 1;
    if (currentActiveCard < 0) { // amount 4 , 0,1,2,3
        currentActiveCard = 0;
    }
    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentQuestion();
});


addCard.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;
    if (question.trim() && answer.trim()) {
        const newCard = { question, answer };
        createSingleCard(newCard);
        questionEl.value = '';
        answerEl.value = '';
        addContainer.classList.remove('show');
        cardData.push(newCard);
        setCardData(cardData);
    }
});

function setCardData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

function getCardData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardContainer.innerHTML = '';
    window.location.reload();
});

//change this code to jQuery
// $(document).ready(function () {
//     const showBtn = $('#show');
//     const hiddenBtn = $('#btn-hidden');
//     const addContainer = $('#add-container');
//     const cardContainer = $('#card-container');
//     const nextBtn = $('#next');
//     const prevBtn = $('#prev');
//     const currentEl = $('#current');
//     const clearBtn = $('#clear');
//     const questionEl = $('#question');
//     const answerEl = $('#answer');
//     const addCard = $('#add-card');
//     let currentActiveCard = 0;
//     let cardsEl = []; // store all of question card
//     const cardData = getCardData();

//     //make function to create card
//     function createCard() {
//         //loop through each card
//         cardData.forEach((data, index) => {
//             createSingleCard(data, index);
//         });
//     }

//     //make function to create single card
//     function createSingleCard(data, index) {
//         const card = $('<div>').addClass('card');

//         if (index == 0) {
//             card.addClass('active');
//         }
//         card.html(`
//         <div class="inner-card">
//         <div class="inner-card-front">
//             <p>${data.question}</p>
//         </div>
//         <div class="inner-card-back">
//             <p>${data.answer}</p>
//         </div>
//         </div>`);
//         //make event listener for click card
//         card.on('click', () => card.toggleClass("show-answer"));
//         //push card to cardsEl
//         cardsEl.push(card);
//         //append card to cardContainer
//         cardContainer.append(card);
//         //call function updateCurrentQuestion
//         updateCurrentQuestion();
//     };

//     function updateCurrentQuestion() {
//         //show card length and current active card
//         currentEl.text(`${currentActiveCard + 1} / ${cardsEl.length}`);
//     }

//     createCard();
//     //show answer when click card
//     showBtn.on('click', () => addContainer.addClass('show'));
//     //hide answer when click button hidden
//     hiddenBtn.on('click', () => addContainer.removeClass('show'));
//     //make event listener for get next card
//     nextBtn.on('click', () => {

//         cardsEl[currentActiveCard].removeClass('active').addClass('left');
//         currentActiveCard = currentActiveCard + 1;
//         if (currentActiveCard > cardsEl.length - 1) { // amount 4 , 0,1,2,3
//             currentActiveCard = cardsEl.length - 1;
//         }
//         cardsEl[currentActiveCard].removeClass('right').addClass('active');
//         updateCurrentQuestion();
//     });
//     //make event listener for get previous card
//     prevBtn.on('click', () => {

//         cardsEl[currentActiveCard].removeClass('active').addClass('right');
//         currentActiveCard = currentActiveCard - 1;
//         if (currentActiveCard < 0) { // amount 4 , 0,1,2,3
//             currentActiveCard = 0;
//         }
//         cardsEl[currentActiveCard].removeClass('left').addClass('active');
//         updateCurrentQuestion();
//     });
//     //make event listener for add card
//     addCard.on('click', () => {
//         const question = questionEl.val();
//         const answer = answerEl.val();
//         if (question.trim() && answer.trim()) {
//             const newCard = { question, answer };
//             createSingleCard(newCard);
//             questionEl.val('');
//             answerEl.val('');
//             addContainer.removeClass('show');
//             cardData.push(newCard);
//             setCardData(cardData);
//         }
//     });
//     //make function to set card data to local storage
//     function setCardData(cards) {
//         localStorage.setItem('cards', JSON.stringify(cards));
//         window.location.reload();
//     }
//     //make function to get card data from local storage
//     function getCardData() {
//         const cards = JSON.parse(localStorage.getItem('cards'));
//         return cards === null ? [] : cards;
//     }
//     //make event listener for clear button
//     clearBtn.on('click', () => {
//         localStorage.clear();
//         cardContainer.html('');
//         window.location.reload();
//     });

// });