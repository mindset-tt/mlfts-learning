// const header = document.getElementById('header');
// const title = document.getElementById('title');
// const description = document.getElementById('description');
// const profile_img = document.getElementById('profile_img');
// const seller_name = document.getElementById('name');
// const price = document.getElementById('price');

// const animated_bg = document.querySelectorAll('.animated_bg');
// const animated_text = document.querySelectorAll('.animated_text');

// setTimeout(showContent, 2000);

// function showContent() {
//     header.innerHTML = `
//         <img src="https://cdn.pixabay.com/photo/2013/09/26/11/59/leather-sofa-186636__340.jpg" alt="">
//     `;
//     title.innerHTML = `โซฟา`;
//     description.innerHTML =
//         `
//     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut delectus atque similique architecto id autem. 
//     `;
//     profile_img.innerHTML = `<img src="https://randomuser.me/api/portraits/women/75.jpg" alt="">`;
//     seller_name.innerHTML = `พิมลดา`;
//     price.innerHTML = `ราคา 20,000 บาท`;
//     animated_bg.forEach(el => el.classList.remove('animated_bg'));
//     animated_text.forEach(el => el.classList.remove('animated_text'));
// }

//change this code to jQuery
$(document).ready(function () {
    const header = $('#header');
    const title = $('#title');
    const description = $('#description');
    const profile_img = $('#profile_img');
    const seller_name = $('#name');
    const price = $('#price');
    const animated_bg = $('.animated_bg');
    const animated_text = $('.animated_text');
    //make function showContent
    function showContent() {
        //set header.innerHTML
        header.html(`
        <img src="https://cdn.pixabay.com/photo/2013/09/26/11/59/leather-sofa-186636__340.jpg" alt="">
    `);
        //set title.innerHTML
        title.html(`ໂຊຟາ`);
        //set description.innerHTML
        description.html(`
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut delectus atque similique architecto id autem.
    `);
        //set profile_img
        profile_img.html(`<img src="https://randomuser.me/api/portraits/women/75.jpg" alt="">`);
        //set seller_name
        seller_name.html(`ເມກສະຫວັນ`);
        //set price
        price.html(`ລາຄາ 5,000,000 ກີບ`);
        //remove class animated_bg
        animated_bg.removeClass('animated_bg');
        //remove class animated_text
        animated_text.removeClass('animated_text');
    }
    //call function showContent
    showContent();
});
