// const items = document.querySelectorAll('.item');

// items.forEach((item)=>{
//     item.addEventListener('click',()=>{
//         removeActive();
//         item.classList.add('active');
//     })
// });

// function removeActive(){
//     items.forEach((item)=>{
//         item.classList.remove('active');
//     });
// }

//change this code to jQuery
$(document).ready(function () {
    const items = $('.item');

    items.on('click', function () {
        const item = $(this);
        removeActive();
        item.addClass('active');
    });

    function removeActive() {
        items.removeClass('active');
    }
});