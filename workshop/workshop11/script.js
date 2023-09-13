// $(document).ready(() => {
//     const form = $('#form');
//     const username = $('#username');
//     const email = $('#email');
//     const password1 = $('#password');
//     const password2 = $('#re-password');

//     const showerror = (input, message) => {
//         const formControl = input.parent();
//         formControl.addClass('error');
//         const small = formControl.find('small');
//         small.text(message);
//     }

//     const showsuccess = (input) => {
//         const formControl = input.parent();
//         formControl.addClass('success');
//     }

//     const validateEmail = (email) => {
//         const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//         return re.test(String(email).trim().toLowerCase());
//     }

//     const checkInput = (inputArray) => {
//         inputArray.forEach((input) => {
//             if (input.val().trim() === '') {
//                 showerror(input, `ກະລຸນາປ້ອນ ${getInputCase(input)}`);
//             } else {
//                 showsuccess(input);
//             }
//         });
//     }

//     const getInputCase = (input) => {
//         return input.attr('id').charAt(0).toUpperCase() + input.attr('id').slice(1);
//     }

//     const checkPassword = (password1, password2) => {
//         if(password1.val() !== password2.val()){
//             showerror(password2, 'ລະຫັດຜ່ານບໍ່ກົງກັນ');
//         }
//     }

//     const checkInputLength = (input, min, max) => {
//         if(input.val().length <= min){
//             showerror(input, `${getInputCase(input)} ຕ້ອງຫຼາຍກວ່າ ${min} ໂຕ`);
//         }else if(input.val().length > max){
//             showerror(input, `${getInputCase(input)} ຕ້ອງໜ້ອຍຫວ່າ ${max} ໂຕ`);
//         }else{
//             showsuccess(input);
//         }
//     }
    
//     form.on('submit', (e) => {
//         checkInput([username, email, password1, password2]);
//         if (!validateEmail(email.val().trim())) {
//             showerror(email, 'ອີເມວບໍ່ຖືກຕ້ອງ');
//         } else {
//             showsuccess(email);
//         }
//         checkPassword(password1, password2);
//         checkInputLength(username, 5, 10);
//         checkInputLength(password1, 5, 12);
//     });
// });

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password1 = document.getElementById('password');
const password2 = document.getElementById('re-password');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkInput([username, email, password1, password2]);
    if (!validateEmail(email.value.trim())) {
        showerror(email, 'ອີເມວບໍ່ຖືກຕ້ອງ');
    } else {
        showsuccess(email);
    }
    checkPassword(password1, password2);
    checkInputLength(username, 5, 10);
    checkInputLength(password1, 5, 12);
});

function showerror(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showsuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkInput(inputArray) {
    inputArray.forEach(function (input) {
        if (input.value.trim() === '') {
            showerror(input, `ກະລຸນາປ້ອນ ${getInputCase(input)}`);
        } else {
            showsuccess(input);
        }
    });
}

function getInputCase(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkPassword(password1, password2) {
    if (password1.value !== password2.value) {
        showerror(password2, 'ລະຫັດຜ່ານບໍ່ກົງກັນ');
    }
}

function checkInputLength(input, min, max) {
    if (input.value.length <= min) {
        showerror(input, `${getInputCase(input)} ຕ້ອງຫຼາຍກວ່າ ${min} ໂຕ`)
    } else if (input.value.length > max) {
        showerror(input, `${getInputCase(input)} ຕ້ອງໜ້ອຍຫວ່າ ${max} ໂຕ`)
    } else {
        showsuccess(input);
    }
}