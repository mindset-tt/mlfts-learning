// const toggle=document.getElementById('toggle');

// const open=document.getElementById('open');
// const modal=document.getElementById('modal');
// const close=document.getElementById('close');

// toggle.addEventListener('click',()=>{
//     document.body.classList.toggle('show-nav');
// });

// open.addEventListener('click',()=>{
//     modal.classList.add('show-modal');
// });

// close.addEventListener('click',()=>{
//     modal.classList.remove('show-modal');
// });

// window.addEventListener('click',e=>e.target == modal ? modal.classList.remove('show-modal') : false);

//change this to use jquery
$(document).ready(function () {
    const toggle = $('#toggle');
    const open = $('#open');
    const modal = $('#modal');
    const close = $('#close');

    //make event listener for toggle
    toggle.on('click', function () {
        //add or remove class show-nav
        $('body').toggleClass('show-nav');
    });
    //make event listener for open
    open.on('click', function () {
        //add class show-modal
        modal.addClass('show-modal');
    });
    //make event listener for close
    close.on('click', function () {
        //remove class show-modal
        modal.removeClass('show-modal');
    });
    //make event listener for window
    $(window).on('click', function (e) {
        //check if click target is modal or not (modal is popup window form)
        e.target == modal ? modal.removeClass('show-modal') : false;
    });
});