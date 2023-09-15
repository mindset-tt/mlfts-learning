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
$(document).ready(() => {
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
    removeActive = () => {
        //remove class active
        items.removeClass('active');
    }

    // Loop through each item and set the background image
    items.each((index, element) => {
        //get image name
        var imageName = 'Picture' + (index + 1) + '.jpg';
        //set background image
        $(element).css('background-image', 'url(image/' + imageName + ')');
    });
});