// const left = document.querySelector('.left');
// const right = document.querySelector('.right');

// const container = document.querySelector('.container');

// left.addEventListener('mouseenter',()=>{
//     container.classList.add('hover-left');
// });

// left.addEventListener('mouseleave',()=>{
//     container.classList.remove('hover-left');
// });


// right.addEventListener('mouseenter',()=>{
//     container.classList.add('hover-right');
// });

// right.addEventListener('mouseleave',()=>{
//     container.classList.remove('hover-right');
// });

//change this code to jQuery

$(document).ready(function () {
    const left = $('.left');
    const right = $('.right');
    const container = $('.container');

    //make mouseenter event listener for left
    left.on('mouseenter', function () {
        //add class hover-left
        container.addClass('hover-left');
    });
    //make mouseleave event listener for left
    left.on('mouseleave', function () {
        //remove class hover-left
        container.removeClass('hover-left');
    }
    );
    //make mouseenter event listener for right
    right.on('mouseenter', function () {
        //add class hover-right
        container.addClass('hover-right');
    }
    );
    //make mouseleave event listener for right
    right.on('mouseleave', function () {
        //remove class hover-right
        container.removeClass('hover-right');
    }
    );
});