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
    //make event listener for each item
    items.on('click', function () {
        //get item
        const item = $(this);
        //call function removeActive
        removeActive();
        //add class active
        item.addClass('active');
    });
    //make function removeActive
    function removeActive() {
        //remove class active
        items.removeClass('active');
    }
});