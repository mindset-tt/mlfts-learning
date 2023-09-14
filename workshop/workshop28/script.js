// const slideContainer = document.querySelector('.slider-container');
// const slideRight = document.querySelector('.right-content');
// const slideLeft = document.querySelector('.left-content');
// const upButton = document.querySelector('.up-button');
// const downButton = document.querySelector('.down-button');


// //จำนวนภาพ Slide
// const slideLength = slideRight.querySelectorAll('div').length;

// let activeIndex = 0;

// upButton.addEventListener('click',()=>changeImage("up"));
// downButton.addEventListener('click',()=>changeImage("down"));

// // 0 - 3
// function changeImage(direction){
//     const slideHeight = slideContainer.clientHeight;
//     if(direction=="up"){
//         activeIndex++;
//         if(activeIndex>slideLength-1){
//             activeIndex=0;
//         }
//     }else if(direction=="down"){
//         activeIndex--;
//         if(activeIndex<0){
//             activeIndex=slideLength-1;
//         }
//     }
//     slideLeft.style.transform = `translateY(-${activeIndex*slideHeight}px)`;
//     slideRight.style.transform = `translateY(-${activeIndex*slideHeight}px)`;
// }

//change this code to jQuery
$(document).ready(function () {
    const slideContainer = $('.slider-container');
    const slideRight = $('.right-content');
    const slideLeft = $('.left-content');
    const upButton = $('.up-button');
    const downButton = $('.down-button');

    //total image of slide
    const slideLength = slideRight.find('div').length;
    
    let activeIndex = 0;

    //make event listener for upButton
    upButton.on('click', function () {
        //call function changeImage
        changeImage("up");
    });
    //make event listener for downButton
    downButton.on('click', function () {
        //call function changeImage
        changeImage("down");
    });

    //make function changeImage
    function changeImage(direction) {
        //get slide height
        const slideHeight = slideContainer.height();
        //check direction
        if (direction == "up") {
            //increase activeIndex
            activeIndex++;
            //check if activeIndex > slideLength-1
            if (activeIndex > slideLength - 1) {
                //set activeIndex = 0
                activeIndex = 0;
            }
            //check direction
        } else if (direction == "down") {
            //decrease activeIndex
            activeIndex--;
            //check if activeIndex < 0
            if (activeIndex < 0) {
                //set activeIndex = slideLength-1
                activeIndex = slideLength - 1;
            }
        }
        //set slideLeft transform
        slideLeft.css('transform', `translateY(-${activeIndex * slideHeight}px)`);
        //set slideRight transform
        slideRight.css('transform', `translateY(-${activeIndex * slideHeight}px)`);
    }
});