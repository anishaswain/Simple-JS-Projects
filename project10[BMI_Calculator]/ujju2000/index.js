

const btnClick = document.querySelector('button');
const result = document.querySelector('.result');
const statement = document.querySelector('.statement');


btnClick.addEventListener('click' , () => {
    let height = document.getElementById('height').value;
    let width = document.getElementById('width').value;
    height = (height / 30.48).toFixed(2);
   
    let bmi = (width / (height * height)).toFixed(2);
    result.textContent = bmi;
    let conclusion;
    if(bmi < 1.85) {
        conclusion = 'you are underweight';
    }
    else if(bmi >= 1.85 && bmi < 2.5) {
        conclusion = 'you are normal';
    }
    else if(bmi >= 2.5 && bmi < 3.0) {
        conclusion = 'you are overweight';
    }
    else {
        conclusion = 'you are obese';
    }
    statement.textContent = conclusion;

    statement.style.display = 'block';
})
