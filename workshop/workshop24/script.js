// const questionData = [
// 	{
// 	  question:"1.ຂໍ້ໃດບໍ່ແມ່ນລະບົບປະຕິບັດການ",
//       a:"DOS",
//       b:"Microsoft Word",
//       c:"Microsoft Windows",
//       d:"Android OS",
//       correct:"b"
// 	},
//     {
//         question:"2.ຂໍ້ໃດແມ່ນ Web Browser",
//         a:"Google Chrome",
//         b:"Keyboard",
//         c:"Mouse",
//         d:"Monitor",
//         correct:"a"
//     },
//     {
//         question:"3.ຂໍ້ໃດຄືຮາດແວ",
//         a:"Keyboard",
//         b:"Mouse",
//         c:"Monitor",
//         d:"ຖືກໝົດ",
//         correct:"d"
//     }
// ]


// const questionEl=document.getElementById('question');
// const answerEls=document.querySelectorAll('.answer');
// const container = document.querySelector('.question-container');
// const choiceA=document.getElementById('a-text');
// const choiceB=document.getElementById('b-text');
// const choiceC=document.getElementById('c-text');
// const choiceD=document.getElementById('d-text');

// const submitBtn=document.getElementById('submit');

// let currentQuestion = 0;
// let score=0;
// loadQuestion();

// function loadQuestion(){
//     checkChoice();
//     const currentQuizData = questionData[currentQuestion];
//     questionEl.innerText=currentQuizData.question;
//     choiceA.innerText=currentQuizData.a;
//     choiceB.innerText=currentQuizData.b;
//     choiceC.innerText=currentQuizData.c;
//     choiceD.innerText=currentQuizData.d;
// }

// function checkChoice(){
//     answerEls.forEach(answerEl=>answerEl.checked=false);
// }

// submitBtn.addEventListener('click',()=>{
//     //ตรวจสอบตัวเลือก
//     let answer = getChoiceAnswer();
//     if(answer){
//         if(answer === questionData[currentQuestion].correct){
//             score++;
//         }
//         currentQuestion++;
//         if(currentQuestion<questionData.length){
//             loadQuestion();
//         }else{
//             container.innerHTML=`<h2>คุณได้คะแนน ${score}/${questionData.length}</h2>`;
//         }
//     }
// });

// function getChoiceAnswer(){
//     let answer;
//     answerEls.forEach(answerEl=>{
//         if(answerEl.checked){
//             answer = answerEl.id;
//         }
//     });
//     return answer;
// }

//change this code to jQuery
$(document).ready(function () {

    const questionData = [
        {
          question:"1.ຂໍ້ໃດບໍ່ແມ່ນລະບົບປະຕິບັດການ",
          a:"DOS",
          b:"Microsoft Word",
          c:"Microsoft Windows",
          d:"Android OS",
          correct:"b"
        },
        {
            question:"2.ຂໍ້ໃດແມ່ນ Web Browser",
            a:"Google Chrome",
            b:"Keyboard",
            c:"Mouse",
            d:"Monitor",
            correct:"a"
        },
        {
            question:"3.ຂໍ້ໃດຄືຮາດແວ",
            a:"Keyboard",
            b:"Mouse",
            c:"Monitor",
            d:"ຖືກໝົດ",
            correct:"d"
        }
    ]

    const questionEl=$('#question');
    const answerEls=$('.answer');
    const container = $('.question-container');
    const choiceA=$('#a-text');
    const choiceB=$('#b-text');
    const choiceC=$('#c-text');
    const choiceD=$('#d-text');

    const submitBtn=$('#submit');

    let currentQuestion = 0;
    let score=0;
    loadQuestion();
    //make function to load question
    function loadQuestion(){
        //call function checkChoice
        checkChoice();
        //get current question
        const currentQuizData = questionData[currentQuestion];
        questionEl.text(currentQuizData.question);
        choiceA.text(currentQuizData.a);
        choiceB.text(currentQuizData.b);
        choiceC.text(currentQuizData.c);
        choiceD.text(currentQuizData.d);
    }
    //make function to check choice
    function checkChoice(){
        //loop through each answer
        answerEls.each(function(){
            //set checked to false
            $(this).prop('checked',false);
        });
    }
    //make event listener for submit button
    submitBtn.on('click',function(){
        //check choice
        let answer = getChoiceAnswer();
        //check answer
        if(answer){
            //check correct answer
            if(answer === questionData[currentQuestion].correct){
                score++;
            }
            //increase current question
            currentQuestion++;
            //check current question
            if(currentQuestion<questionData.length){
                //call function loadQuestion
                loadQuestion();
            }
            //show score
            else{
                container.html(`<h2>ທ່ານໄດ້ຄະແນນ ${score}/${questionData.length}</h2>`);
            }
        }
    }
    );
    //make function to get choice answer
    function getChoiceAnswer(){
        let answer;
        //loop through each answer
        answerEls.each(function(){
            //check if answer is checked
            if($(this).prop('checked')){
                //get id of answer
                answer = $(this).attr('id');
            }
        });
        //return answer
        return answer;
    }

});