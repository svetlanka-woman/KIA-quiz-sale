window.addEventListener('DOMContentLoaded', () => {
  "use strict";

  const questionGrades = document.querySelectorAll('.question__grade');

  function renderQuestionGrades() {
    questionGrades.forEach((grade) => {
      const questionId = grade.parentElement.parentElement.getAttribute('id');
      
      for (let i = 0; i < 11; i++) { //оценка от 0 до 10
        grade.innerHTML += `
        <li>
          <input type="radio" id="${questionId}-${i}" name="${questionId}" value="${i}">
          <label for="${questionId}-${i}">${i}</label>
        </li>
        `
      }
    });
  }

  renderQuestionGrades();

});