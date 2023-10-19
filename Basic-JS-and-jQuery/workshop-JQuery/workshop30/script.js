// const userdata = [
//     {
//         name:"พิมลี่พลอย",
//         job:"พนักงานประจำ",
//         text:"อากาศดี อาหารอร่อย ห้องพักสะอาดมาก",
//         image:"https://randomuser.me/api/portraits/women/86.jpg"
//     },
//     {
//         name:"ก้อง รักสยาม",
//         job:"โปรแกรมเมอร์",
//         text:"อากาศดีมากครับ อาหารสะอาดอร่อย เจ้าของร้านใจดีมาก จะมาอุดหนุนใหม่นะครับ",
//         image:"https://randomuser.me/api/portraits/men/12.jpg"
//     },
//     {
//         name:"พี่ตูนคนหล่อ",
//         job:"รับราชการ",
//         text:"อาหารสะอาดอร่อย วิวที่ร้านสวยมาก เจ้าของร้านใจดีและอากาศดีมากครับ ",
//         image:"https://randomuser.me/api/portraits/men/13.jpg"
//     },
//     {
//         name:"พี่โจโจ้",
//         job:"นักเขียน",
//         text:"อาหารอร่อย วิวสวย แต่ที่จอดรถน้อยไปหน่อย!",
//         image:"https://randomuser.me/api/portraits/men/14.jpg"
//     },
//     {
//         name:"น้องตั๊กแตน",
//         job:"พนักงานโรงแรม",
//         text:"ราคาเป็นกันเอง อาหารโคตรอร่อย เจ้าของร้านและพนักงานน่ารัก",
//         image:"https://randomuser.me/api/portraits/women/33.jpg"
//     }
// ];

// const review = document.querySelector('.review');
// const userImage = document.querySelector('.user-image');
// const userName = document.querySelector('.user-name');
// const userJob=document.querySelector('.user-job');

// let activeIndex = 1;

// function showReview(){
//     const {name,job,text,image} = userdata[activeIndex];
//     review.innerHTML=text;
//     userImage.src=image;
//     userName.innerHTML=name;
//     userJob.innerHTML=job;
//     activeIndex++;

//     if(activeIndex>userdata.length-1){
//         activeIndex=0;
//     }
// }

// setInterval(showReview,10000);

//change this code to jQuery
$(document).ready(function () {
    const userdata = [
        {
            name:"ໃຈປະສົງ",
            job:"ພະນັກງານຝຶກງານ",
            text:"ອາກາດດີ ອາຫານແຊບ",
            image:"https://randomuser.me/api/portraits/women/60.jpg"
        },
        {
            name:"ຄຳປະເສີດ",
            job:"ໂປຣແກຣມເມີ",
            text:"ເຈົ້າຂອງຮ້ານໃຈດີ ອາຫານແຊບ ບໍ່ມີກິ່ນເໝັນ",
            image:"https://randomuser.me/api/portraits/lego/7.jpg"
        }
    ];
    const review = $('.review');
    const userImage = $('.user-image');
    const userName = $('.user-name');
    const userJob=$('.user-job');
    let activeIndex = 1;
    //make function showReview
    function showReview(){
        //get name,job,text,image from userdata
        const {name,job,text,image} = userdata[activeIndex];
        //set review.innerHTML
        review.html(text);
        //set userImage.src
        userImage.attr('src',image);
        //set userName.innerHTML
        userName.html(name);
        //set userJob.innerHTML
        userJob.html(job);
        //increase activeIndex
        activeIndex++;
        //check if activeIndex > userdata.length-1
        if(activeIndex>userdata.length-1){
            //set activeIndex = 0
            activeIndex=0;
        }
    }
    //set interval for showReview
    setInterval(showReview,10000);
});