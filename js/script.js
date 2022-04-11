window.addEventListener('DOMContentLoaded', () => {
  "use strict";

  const answers = document.querySelectorAll('.answer-grade'),
        arrColorsGrade = ['#8D0205', '#AE0D07', '#FE5A59', '#FF8353', '#E2A913', '#FFA400', '#D7E317', '#C5F65C', '#00E355', '#00AB23', '#079D26'];

  function renderAnswer() {
    answers.forEach(answer => {
      const questionId = answer.parentElement.getAttribute('id');
      
      answer.innerHTML += `
        <ul class="question__grade">
        </ul>
        <div class="question__description-grade">
          <span>Совершенно <br> не доволен</span>
          <span>Полностью <br> доволен</span>
        </div>
        <div class="question__comment">
          <p>Прокомментируйте, пожалуйста, почему Вы поставили невысокую оценку?</p>
          <textarea class="comment" name="${questionId}-comment" placeholder="Ваш комментарий" wrap="soft" maxlength="1000" rows="1"></textarea>
        </div>
      `;

      const grade = answer.querySelector('.question__grade');
      
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
  renderAnswer();

  const progressBars = document.querySelectorAll('.pagination-question__progressbar'),
        slidesForm1 = document.querySelectorAll('#form1 .swiper-slide'),
        slidesForm2 = document.querySelectorAll('#form2 .swiper-slide');

  function renderProgressBar() {
    progressBars.forEach((bar, b) => {
      bar.innerHTML = '<li class="fill"></li>';
      let barLength = '';
      if (b == 0) {
        barLength = slidesForm1.length
      } else {
        barLength = slidesForm2.length
      }
      for (let k = 1; k < barLength; k++) {
        bar.innerHTML += '<li></li>';
      }
    })
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

  const swiper1 = new Swiper('.swiper1', {
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
    }
  });

  const swiper2 = new Swiper('.swiper2');

  function swiperNext(swiper) {
    setTimeout(() => {
      swiper.slideNext(800);
    }, 800);
  }

  const questionGradesSwiper1 = document.querySelectorAll('.swiper1 .question__grade'),
        questionGradesSwiper2 = document.querySelectorAll('.swiper2 .question__grade');

  function onСhangeInputGrade(grades, swiper) {
    grades.forEach(grade => {
      
      const inputsGrade = grade.querySelectorAll('input'),
            bulletsGrade = grade.querySelectorAll('label');
      let comment = ''; 
            
      if (grade.nextElementSibling.nextElementSibling.classList.contains('question__comment')) {
        comment = grade.nextElementSibling.nextElementSibling;
        comment.classList.add('hide');
      };

      comment.addEventListener('change', () => {
        scrollTopPage();
        if (grade.parentElement.parentElement.getAttribute('id') == 'q12') {
          hideThisShowNext(questionPageNext, startPageEnd);
        } else {
          swiperNext(swiper);
        };
      });

      inputsGrade.forEach((input, i) => {
        input.addEventListener('change', () => {
          if (input.checked) {
            // change bg-color in bullets
            bulletsGrade.forEach(bullet => {
              bullet.style.backgroundColor = 'transparent';
            });
            bulletsGrade[i].style.backgroundColor = arrColorsGrade[i];
            
            removeMessage(grade.parentElement.nextElementSibling);

            if (input.value <= 7) {
              comment.classList.add('show', 'fade');
              comment.classList.remove('hide', 'fade-out');
              scrollShowElement(comment);
            } else {
              if (grade.parentElement.parentElement.getAttribute('id') == 'q12') {
                hideThisShowNext(questionPageNext, startPageEnd);
              } else {
                scrollTopPage();
              setTimeout(() => {
                comment.classList.add('hide');
                comment.querySelector('.comment').value = '';
              }, 400);
              comment.classList.add('fade-out');
              comment.classList.remove('show', 'fade');
              swiperNext(swiper);
              };
            }
          }
        });
      });
    });
  }
  onСhangeInputGrade(questionGradesSwiper1, swiper1);
  onСhangeInputGrade(questionGradesSwiper2, swiper2);

  function verifyPrevAnswer(swiper) {
    swiper.on('slideNextTransitionEnd', () => {
      const swiperSlidePrev = swiper.el.querySelector('.swiper-slide-prev'),
            questionSlidePrev = swiperSlidePrev.querySelector('.question:not(.question.hide)'),
            inputsSlidePrev = questionSlidePrev.querySelectorAll('input');

      console.log(questionSlidePrev);
      const checkedSome = [...inputsSlidePrev].some(input => input.checked); 
      
      if (!checkedSome) {
        if (!questionSlidePrev.querySelector('.message')) {
          const message = document.createElement('div');
        message.classList.add('message');
        message.textContent = `Оцените, пожалуйста!`;
        questionSlidePrev.append(message);
        }
        swiper.slidePrev(1200);
      }
    });
  }
  verifyPrevAnswer(swiper1);
  verifyPrevAnswer(swiper2);

  function removeMessage(message) {
    if (message && message.classList.contains('message')) {
      message.remove();
    };
  }

  const textareaComment = document.querySelectorAll('.comment');

  textareaComment.forEach(comment => {
    comment.addEventListener('input', (e) => {
      const elem = e.target;
      
      elem.style.cssText = 'height: auto;';
      elem.style.cssText = 'height:' + elem.scrollHeight + 'px';
    });
  });

  function hideThisShowNext(thisPage, nextPage) {
    thisPage.classList.toggle('hide');
    nextPage.classList.toggle('hide');
    nextPage.classList.toggle('fade');
  }

  const startButton = document.getElementById('start-button'),
        startPage = document.querySelector('.start-page'),
        questionPage = document.querySelector('.question-page');

  startButton.addEventListener('click', () => {
    hideThisShowNext(startPage, questionPage);
  })

  function progressBarFilling(swiper, progBar) {
    const fractionsProgressBar = [...progBar.children];

    swiper.on('slideChange', () => {
      fractionsProgressBar.forEach((fraction, f) => {
        if (f <= swiper.activeIndex) {
          fraction.classList.add('fill');
        } else {
          fraction.classList.remove('fill');
        }
      });
    });
  }
  progressBarFilling(swiper1, progressBars[0]);
  progressBarFilling(swiper2, progressBars[1]);

  const questionCurrent = document.querySelector('.question-page.next .question-current'),
        questionTotal = document.querySelector('.question-page.next .question-total')

  function renderFractionQuestionPageNext() {
    questionCurrent.textContent = 1 + slidesForm1.length;
    questionTotal.textContent = slidesForm2.length + slidesForm1.length;
    swiper2.on('slideChange', () => {
      questionCurrent.textContent = swiper2.activeIndex + 1 + slidesForm1.length;
    });
  }
  renderFractionQuestionPageNext();

  function renderQuestionSimpleHeight() {
    const questionsSimple = document.querySelectorAll('.question-simple'),
        headerQuestion = document.querySelector('.header-question'),
        headerQuestionHeight = window.getComputedStyle(headerQuestion).height,
        windowInnerHeight = document.documentElement.clientHeight;

    questionsSimple.forEach(question => {
      question.style.height = windowInnerHeight - headerQuestionHeight.slice(0,-2) + 'px';
    });
  }
  renderQuestionSimpleHeight();

  const inputsLastQuestionForm1 = document.querySelectorAll('#q4 input'),
        buttonsStartPageNext = document.querySelectorAll('.start-page.next button'),
        startPageNext = document.querySelector('.start-page.next'),
        questionPageNext = document.querySelector('.question-page.next'),
        startPageEnd = document.querySelector('.start-page.end');

  function onChangeInputsLastQuestionForm1() {
    inputsLastQuestionForm1.forEach(input => {
      input.addEventListener('change', () => {
        hideThisShowNext(questionPage, startPageNext);  
      });
    });
    buttonsStartPageNext.forEach(button => {
      button.addEventListener('click', () => {
        if (button.classList.contains('btn-yes')) {
          hideThisShowNext(startPageNext, questionPageNext);
        } else {
          hideThisShowNext(startPageNext, startPageEnd);
        }
      })
    })
  }
  onChangeInputsLastQuestionForm1();

  const q8_1 = document.getElementById('q8-1'),
        q8_2 = document.getElementById('q8-2'),
        q8_3 = document.getElementById('q8-3');

  function onChangeInputQ7() {
    const inputsQ7 = document.querySelectorAll('#q7 input');

    inputsQ7.forEach(input => {
      input.addEventListener('change', () => {
        if (input.value == 'yes') {
          q8_1.classList.add('hide');
          q8_2.classList.remove('hide');
          q8_3.classList.add('hide');
          swiperNext(swiper2);
        } else {
          q8_1.classList.remove('hide');
          q8_2.classList.add('hide');
          q8_3.classList.add('hide');
          swiperNext(swiper2);
        }
        removeMessage(document.querySelector('#q7 .message'));
      });
    });
  }
  onChangeInputQ7();

  function onChangeInputQ8() {
    const inputsQ8_1 = document.querySelectorAll('#q8-1 input'),
          inputsQ8_2 = document.querySelectorAll('#q8-2 input');

    inputsQ8_1.forEach(input => {
      input.addEventListener('change', () => {
        if (input.value == 'yes') {
          q8_1.classList.add('hide');
          q8_2.classList.remove('hide');
          q8_2.classList.add('fade');

        } else {
          swiperNext(swiper2);
        }
      });
    });

    inputsQ8_2.forEach(input => {
      input.addEventListener('change', () => {
        if (input.value == 'yes') {
          q8_2.classList.add('hide');
          q8_3.classList.remove('hide');
          q8_3.classList.add('fade');
        } else {
          swiperNext(swiper2);
        }
      });
    });
  }
  onChangeInputQ8();

  function onChangeInputQ10() {
    const inputsQ10 = document.querySelectorAll('#q10 input');

    inputsQ10.forEach(input => {
      input.addEventListener('change', () => {
        swiperNext(swiper2);
        removeMessage(document.querySelector('#q10 .message'));
      });
    });
  }
  onChangeInputQ10();

});