// const ratingContainer = document.querySelector('.ratings-container');
// const ratings = document.querySelectorAll('.rating');
// const panel = document.getElementById('panel');
// const sendBtn = document.getElementById('send');


// let selected;
// ratingContainer.addEventListener('click',(e)=>{
//     if(e.target.parentNode.classList.contains('rating')){
//         removeActive();
//         e.target.parentNode.classList.add('active');
//         selected = e.target.nextElementSibling.innerHTML;
//     }
// });

// function removeActive(){
//     for(let i=0 ;i<ratings.length;i++){
//         ratings[i].classList.remove('active');
//     }
// }

// sendBtn.addEventListener('click',()=>{
//     panel.innerHTML=`
//         <img src="image/heart.svg" class="img-complete">
//         <strong>ขอบคุณที่ใช้บริการของเรา</strong>
//         <br>
//         <strong>ผลการประเมิน : ${selected}</strong>
//     `;
// });

//change this code to jQuery
$(document).ready(function () {
    const ratingContainer = $('.ratings-container');
    const ratings = $('.rating');
    const panel = $('#panel');
    const sendBtn = $('#send');
    let selected;
    //make event listener for ratingContainer
    ratingContainer.on('click', function (e) {
        //check if click target is rating
        if (e.target.parentNode.classList.contains('rating')) {
            //call function removeActive
            removeActive();
            //add class active
            e.target.parentNode.classList.add('active');
            //get selected
            selected = e.target.nextElementSibling.innerHTML;
        }
    });
    //make function removeActive
    function removeActive() {
        //remove class active
        ratings.removeClass('active');
    }
    //make event listener for sendBtn
    sendBtn.on('click', function () {
        //set panel.innerHTML
        panel.html(`
        <img src="image/heart.svg" class="img-complete">
        <strong>ຂອບໃຈສຳລັບການປະແມ່ນຂອງທ່ານ</strong>
        <br>
        <strong>ຜົນການປະເມີນທີ່ທ່ານໃຫ້ : ${selected}</strong>
    `);
    });
});