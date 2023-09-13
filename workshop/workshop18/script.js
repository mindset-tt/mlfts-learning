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

    toggle.on('click', function () {
        $('body').toggleClass('show-nav');
    });

    open.on('click', function () {
        modal.addClass('show-modal');
    });

    close.on('click', function () {
        modal.removeClass('show-modal');
    });

    $(window).on('click', function (e) {
        e.target == modal ? modal.removeClass('show-modal') : false;
    });
});