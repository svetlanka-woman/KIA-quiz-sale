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

      const inputGrade = grade.querySelectorAll('input'),
            labelGrade = grade.querySelectorAll('label');
      
      inputGrade.forEach((input, i) => {
        function onchangeInputGrade() {
          if (input.checked) {
            labelGrade.forEach(label => {
              label.style.backgroundColor = 'transparent';
            });
            labelGrade[i].style.backgroundColor = arrColorsGrade[i];
          }
        }
        input.addEventListener('change', onchangeInputGrade);
      });

    });
  }

  renderQuestionGrades();

  const textareaComment = document.querySelectorAll('.comment');

  textareaComment.forEach(comment => {
    comment.addEventListener('input', (e) => {
      const elem = e.target;
      
      elem.style.cssText = 'height: auto;';
      elem.style.cssText = 'height:' + elem.scrollHeight + 'px';
    });
  });
  
  new Swiper('.swiper', {
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
  // const swiper = new Swiper('.swiper', {
  //   // Optional parameters
  //   direction: 'vertical',
  //   loop: true,
  
  //   // If we need pagination
  //   pagination: {
  //     el: '.swiper-pagination',
  //   },
  
  //   // Navigation arrows
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  
  //   // And if we need scrollbar
  //   scrollbar: {
  //     el: '.swiper-scrollbar',
  //   },
  // });

});