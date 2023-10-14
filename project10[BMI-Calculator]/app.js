// BMI CALCULATION START
function weightValue() {
    let weight=document.getElementById("weight").value
let height=document.getElementById("height").value
let heightsquare=height*height
let result=document.getElementById("bmi-result")
let calculate=document.getElementById("calculate-bmi")
let reset=document.getElementById("reset-bmi")
let bmi=weight/heightsquare
let value= parseFloat(bmi.toFixed(1))
let comment=""
   
    if(weight=="" || height==""){
        console.log("empty value")
        document.getElementById("input-warning").style.display="flex"
    }
    else if(value<18.5){

        result.innerHTML="Your BMI is" + " "+ value +"<br/>" + "<b>" + "This is underweight"
        reset.style.display="inline"
        calculate.style.display="none"
        document.getElementById("height").disabled="true"
        document.getElementById("weight").disabled="true"
    }
    else if(value==18.5 || value < 25.0){
    result.innerHTML="Your BMI is" + " "+ value +"<br/>" + "<b>" + "This is a healthy weight"
    reset.style.display="inline"
    calculate.style.display="none"
    document.getElementById("height").disabled="true"
    document.getElementById("weight").disabled="true"
}
    else if(value==25.0 || value < 30.0){
        result.innerHTML="Your BMI is" + " "+ value +"<br/>" + "<b>" + "This is overweight"
        reset.style.display="inline"
        calculate.style.display="none"
       
        document.getElementById("height").disabled="true"
        document.getElementById("weight").disabled="true"
    }
    else {
        result.innerHTML="Your BMI is" + " "+ value +"<br/>" + "<b>" + "This is obesity"
        reset.style.display="inline"
        calculate.style.display="none"
        document.getElementById("height").disabled="true"
        document.getElementById("weight").disabled="true"
    }
    
    
}

function resetValue(){
    let result=document.getElementById("bmi-result")
    let calculate=document.getElementById("calculate-bmi")
    let reset=document.getElementById("reset-bmi")
    result.innerHTML="<img src='images/question-img.jpg'/>"
    reset.style.display="none"
    calculate.style.display="inline"
    document.getElementById("weight").value=""
    document.getElementById("height").value=""
    document.getElementById("height").disabled=false
        document.getElementById("weight").disabled=false
}
//cancel  input incomplete notification
function cancelWarning(){

    document.getElementById("input-warning").style.display="none"
}
//  input incomplete notification
function inputValue(){

    document.getElementById("input-warning").style.display="none"
}

//  To convert pound to kilogram
function poundUnit (){
    let poundInput=document.getElementById("poundValue").value
   let pound= poundInput*0.453592
  
   let poundVal=parseFloat(pound.toFixed(2))
   if(poundInput.length!==0){document.getElementById("kgpoundValue").innerHTML= poundVal}
   else{document.getElementById("kgpoundValue").innerHTML= ""}
   
}
//  To convert gram to kilogram
function gramUnit (){
    let gramInput=document.getElementById("gramValue").value
    let gram= document.getElementById("gramValue").value*0.001
    let gramVal=parseFloat(gram.toFixed(2))
   
    if(gramInput.length!==0){document.getElementById("kggramValue").innerHTML= gramVal}
   else{document.getElementById("kggramValue").innerHTML= ""}
    
 }
 //  To convert feet to meter
 function feetUnit (){
    let feetInput=document.getElementById("feetValue").value
    let feet= feetInput*0.3048
    let feetVal=parseFloat(feet.toFixed(2))
   
    if(feetInput.length!==0){document.getElementById("meterfeetValue").innerHTML= feetVal}
   else{document.getElementById("meterfeetValue").innerHTML= ""}
    
 }
//  To convert inches to meter
 function inchesUnit (){
    let inchesInput= document.getElementById("inchesValue").value
    let inches= inchesInput*0.0254
    let inchesVal=parseFloat(inches.toFixed(2))
    if(inchesInput.length!==0){document.getElementById("meterinchesValue").innerHTML= inchesVal}
   else{document.getElementById("meterinchesValue").innerHTML= ""}
    
 }
 //  To convert cenimeter to meter
 function centimeterUnit (){
    let centimeterInput= document.getElementById("centimeterValue").value
    let centimeter= centimeterInput*0.01
    let centimeterVal=parseFloat(centimeter.toFixed(2))
    if(centimeterInput.length!==0){document.getElementById("metercentimeterValue").innerHTML= centimeterVal}
   else{document.getElementById("metercentimeterValue").innerHTML= ""}
    
 }
//  BMI CALCULATION ENDS


