// const container = document.getElementById('container');
// const imgs = document.querySelectorAll('#container img');

// const leftBtn = document.getElementById('left');
// const rightBtn = document.getElementById('right');

// //สร้างตัวนับภาพ
// let idx = 0;

// let interval = setInterval(slide,2000);

// function slide(){
//     idx++;
//     changeImage();
// }

// function changeImage(){
//     // console.log(imgs.length);
//     if(idx>imgs.length-1){
//         idx=0;
//     }else if(idx<0){
//         idx=imgs.length-1;
//     }
//     container.style.transform=`translateX(${-idx*500}px)`;
//     // console.log(`translateX(${-idx*500}px)`);
// }

// leftBtn.addEventListener('click',()=>{
//     idx--;
//     changeImage();
//     resetInterval();
// });

// rightBtn.addEventListener('click',()=>{
//     idx++;
//     changeImage();
//     resetInterval();
// });

// function resetInterval(){
//     clearInterval(interval);
//     interval = setInterval(slide,2000);
// }

//change this code to jQuery
$(document).ready(function () {
    const container = $('#container');
    const imgs = $('#container img');

    const leftBtn = $('#left');
    const rightBtn = $('#right');

    //create image index
    let idx = 0;
    //create interval for slide image with 2 seconds
    let interval = setInterval(slide, 2000);

    //make function slide
    function slide() {
        //increase idx
        idx++;
        //call function changeImage
        changeImage();
    }

    //make function changeImage
    function changeImage() {
        //check if idx > imgs.length-1
        if (idx > imgs.length - 1) {
            //set idx = 0
            idx = 0;
            //check if idx < 0
        } else if (idx < 0) {
            //set idx = imgs.length-1
            idx = imgs.length - 1;
        }
        //set container transform
        container.css('transform', `translateX(${-idx * 500}px)`);
    }

    //make event listener for leftBtn
    leftBtn.on('click', function () {
        //decrease idx
        idx--;
        //call function changeImage
        changeImage();
        //call function resetInterval
        resetInterval();
    }
    );

    //make event listener for rightBtn
    rightBtn.on('click', function () {
        //increase idx
        idx++;
        //call function changeImage
        changeImage();
        //call function resetInterval
        resetInterval();
    }
    );

    //make function resetInterval
    function resetInterval() {
        //clear interval
        clearInterval(interval);
        //set interval
        interval = setInterval(slide, 2000);
    }
});

