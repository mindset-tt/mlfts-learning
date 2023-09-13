// const categories = document.querySelectorAll('.category');

// window.addEventListener('scroll',showCategory)


// function showCategory(){
//     const calculateHeight = window.innerHeight-20;

//     categories.forEach(category=>{
//         const topPosition = category.getBoundingClientRect().top;
//         if(topPosition<calculateHeight){
//             category.classList.add('active');
//         }else{
//             category.classList.remove('active');
//         }
//     });
// }

//change this code to jQuery

$(document).ready(function () {
    const categories = $('.category');
    //make scroll event with function showCategory
    $(window).on('scroll', showCategory);


    function showCategory() {
        //calculate height of window
        const calculateHeight = $(window).scrollTop() + $(window).height() - 20;
        //loop through each category
        categories.each(function () {
            //get top position of each category
            const topPosition = $(this).offset().top;
            //check if top position is less than calculate height
            if (topPosition < calculateHeight) {
                //add active class
                $(this).addClass('active');
            } else {
                //remove active class
                $(this).removeClass('active');
            }
        });
    }

    showCategory(); // Call showCategory initially
});