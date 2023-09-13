// const calculatorDisplay = document.querySelector('h1');
// const inputBtn = document.querySelectorAll('button');
// const clearBtn = document.getElementById('clear-btn');


// const calculate = {
//     "/": (firstNumber, secondNumber) => secondNumber != 0 ? firstNumber / secondNumber : "error",
//     "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
//     "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
//     "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
//     "=": (firstNumber, secondNumber) => secondNumber
// }

// let firstValue = 0;
// let operatorValue = '';
// let waitForNext = false;

// function setNumberValue(number) {
//     if (waitForNext) {
//         calculatorDisplay.textContent = number;
//         waitForNext = false;
//     } else {
//         const displayValue = calculatorDisplay.textContent;
//         calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
//     }
// }

// function callOperator(operator) {
//     const currentValue = Number(calculatorDisplay.textContent);
//     if (operatorValue && waitForNext) {
//         operatorValue = operator;
//         return;
//     }
//     if (!firstValue) {
//         firstValue = currentValue;
//     } else {
//         const result = calculate[operatorValue](firstValue, currentValue);
//         calculatorDisplay.textContent = result;
//         firstValue = result;
//         if (firstValue === "error") {
//             resetAll();
//         }
//     }
//     operatorValue = operator;
//     waitForNext = true;

// }

// function addDecimal() {
//     if (waitForNext) return;
//     if (!calculatorDisplay.textContent.includes(".")) {
//         calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
//     }
// }

// inputBtn.forEach((input) => {
//     if (input.classList.length === 0) {
//         input.addEventListener('click', () => setNumberValue(input.value));
//     } else if (input.classList.contains("operator")) {
//         input.addEventListener('click', () => callOperator(input.value));
//     } else if (input.classList.contains("decimal")) {
//         input.addEventListener('click', () => addDecimal());
//     }
// });

// function resetAll() {
//     firstValue = 0;
//     operatorValue = '';
//     waitForNext = false;
//     calculatorDisplay.textContent = '0';
// }
// clearBtn.addEventListener('click', () => resetAll());

// change this to JQuery

$(document).ready(function () {
    
    const calculatorDisplay = $('h1');
    const inputBtn = $('button');
    const clearBtn = $('#clear-btn');

    const calculate = {
        "/": (firstNumber, secondNumber) => secondNumber != 0 ? firstNumber / secondNumber : "error",
        "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
        "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
        "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
        "=": (firstNumber, secondNumber) => secondNumber
    };

    let firstValue = 0;
    let operatorValue = '';
    let waitForNext = false;

    function setNumberValue(number) {
        if (waitForNext) {
            calculatorDisplay.text(number);
            waitForNext = false;
        } else {
            const displayValue = calculatorDisplay.text();
            calculatorDisplay.text(displayValue === '0' ? number : displayValue + number);
        }
    }

    function callOperator(operator) {
        const currentValue = Number(calculatorDisplay.text());
        if (operatorValue && waitForNext) {
            operatorValue = operator;
            return;
        }
        if (!firstValue) {
            firstValue = currentValue;
        } else {
            const result = calculate[operatorValue](firstValue, currentValue);
            calculatorDisplay.text(result);
            firstValue = result;
            if (firstValue === "error") {
                resetAll();
            }
        }
        operatorValue = operator;
        waitForNext = true;
    }

    function addDecimal() {
        if (waitForNext) return;
        if (!calculatorDisplay.text().includes(".")) {
            calculatorDisplay.text(`${calculatorDisplay.text()}.`);
        }
    }

    inputBtn.each(function () {
        if ($(this).attr('class') === undefined) {
            $(this).on('click', function () {
                setNumberValue($(this).val());
            });
        } else if ($(this).hasClass("operator")) {
            $(this).on('click', function () {
                callOperator($(this).val());
            });
        } else if ($(this).hasClass("decimal")) {
            $(this).on('click', function () {
                addDecimal();
            });
        }
    });

    function resetAll() {
        firstValue = 0;
        operatorValue = '';
        waitForNext = false;
        calculatorDisplay.text('0');
    }

    clearBtn.on('click', function () {
        resetAll();
    });

});
