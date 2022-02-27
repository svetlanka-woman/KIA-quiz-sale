window.addEventListener('DOMContentLoaded', () => {
  "use strict";

  const questionGrades = document.querySelectorAll('.question__grade'),
        arrColorsGrade = ['#8D0205', '#AE0D07', '#FE5A59', '#FF8353', '#E2A913', '#FFA400', '#D7E317', '#C5F65C', '#00E355', '#00AB23', '#079D26'];


  function renderQuestionGrades() {
    questionGrades.forEach((grade) => {
      const questionId = grade.parentElement.parentElement.getAttribute('id');
      
      for (let i = 0; i < 11; i++) { //оценка от 0 до 10
        grade.innerHTML += `
        <li>
          <input type="radio" id="${questionId}-${i}" name="${questionId}" value="${i}">
          <label style="border-color: ${arrColorsGrade[i]}" class="label-${i}" for="${questionId}-${i}">${i}</label>
        </li>
        `
      }
    });
  }

  renderQuestionGrades();

});