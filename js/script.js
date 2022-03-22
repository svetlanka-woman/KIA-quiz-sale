window.addEventListener('DOMContentLoaded', () => {
  "use strict";

  const questionGrades = document.querySelectorAll('.question__grade'),
        arrColorsGrade = ['#8D0205', '#AE0D07', '#FE5A59', '#FF8353', '#E2A913', '#FFA400', '#D7E317', '#C5F65C', '#00E355', '#00AB23', '#079D26'];

  function renderQuestionGrades() {
    questionGrades.forEach(grade => {
      const questionId = grade.parentElement.parentElement.getAttribute('id');
      
      for (let i = 0; i < 11; i++) { //оценка от 0 до 10
        grade.innerHTML += `
        <li>
          <input type="radio" id="${questionId}-${i}" name="${questionId}" value="${i}">
          <label style="border-color: ${arrColorsGrade[i]}" class="bullet-grade" for="${questionId}-${i}">${i}</label>
        </li>
        `
      };
    });
  }

  renderQuestionGrades();

  const progressBar = document.querySelector('.pagination-question__progressbar'),
        slidesForm1 = document.querySelectorAll('#form1 .swiper-slide');

  function renderProgressBar() {
    progressBar.innerHTML = '<li class="fill"></li>';
    for (let k = 1; k < slidesForm1.length; k++) {
      progressBar.innerHTML += '<li></li>';
    }
  }

  renderProgressBar();
 
  function scrollShowElement(elem) {
    let elemHeight = elem.getBoundingClientRect().height;  

    window.scrollBy({
      top: elemHeight + 20, 
      behavior: 'smooth'
    });
  }

  function scrollTopPage() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function swiperNext() {
    setTimeout(() => {
      swiper.slideNext(800);
    }, 1000);
  }

  function onchangeInputGrade() {
    questionGrades.forEach(grade => {
      
      const inputGrade = grade.querySelectorAll('input'),
            bulletGrade = grade.querySelectorAll('label');
      let comment = ''; 
            
      if (grade.nextElementSibling.nextElementSibling.classList.contains('question__comment')) {
        comment = grade.nextElementSibling.nextElementSibling;
        comment.classList.add('hide');
      };
      
      comment.addEventListener('change', () => {
        scrollTopPage();
        swiperNext();
      });

      inputGrade.forEach((input, i) => {
        input.addEventListener('change', () => {
          if (input.checked) {
            // change bg-color in bullets
            bulletGrade.forEach(bullet => {
              bullet.style.backgroundColor = 'transparent';
            });
            bulletGrade[i].style.backgroundColor = arrColorsGrade[i];
            
            if (input.value <= 7) {
              comment.classList.add('show', 'fade');
              comment.classList.remove('hide', 'fade-out');
              scrollShowElement(comment);
            } else {
              scrollTopPage();
              setTimeout(() => {
                comment.classList.add('hide');
              }, 400);
              comment.classList.add('fade-out');
              comment.classList.remove('show', 'fade');
              swiperNext();
            }
          }
        });
      });
    });
  }

  onchangeInputGrade();

  const textareaComment = document.querySelectorAll('.comment');

  textareaComment.forEach(comment => {
    comment.addEventListener('input', (e) => {
      const elem = e.target;
      
      elem.style.cssText = 'height: auto;';
      elem.style.cssText = 'height:' + elem.scrollHeight + 'px';
    });
  });

  const startButton = document.getElementById('start-button'),
        startPage = document.querySelector('.start-page'),
        questionPage = document.querySelector('.question-page');

  startButton.addEventListener('click', () => {
    startPage.classList.toggle('hide');
    questionPage.classList.toggle('hide');
    questionPage.classList.toggle('fade');
  })
  
  const swiper = new Swiper('.swiper', {
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      renderFraction: function(currentClass, totalClass) {
        return `
          <span class="question-current ${currentClass}"></span>
          /
          <span class="question-total ${totalClass}"></span>
          `
      }
    },
  });

  const questionsSimple = document.querySelectorAll('.question-simple'),
        headerQuestion = document.querySelector('.header-question'),
        headerQuestionHeight = window.getComputedStyle(headerQuestion).height,
        windowInnerHeight = document.documentElement.clientHeight;


  questionsSimple.forEach(question => {
    question.style.height = windowInnerHeight - headerQuestionHeight.slice(0,-2) + 'px';
  })

});