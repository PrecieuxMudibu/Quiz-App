function createChoiceListElements () {
    for (let i=0; i<4; i++) {
        let choice =document.createElement("label");
        choice.classList.add("choice-list__element","choice1");
        choice.innerHTML=`<input type="radio" id="choice${i+1}" name="choice" value"choice${i+1}">.ts`
        choice.setAttribute("id",`label${i+1}`);
        choicesListTable.push(choice);
        questionPageChoiceList.appendChild(choicesListTable[i]);
    }    
}

function giveStyleToElementSelected () {
    for (let i=0; i<choicesListTable.length; i++) choicesListTable[i].addEventListener("click", function (){ giveStyleWhenSelected(choicesListTable[i])});
}

function giveStyleWhenSelected (element) {
    buttonNext.disabled=false;
    buttonNext.style.backgroundColor="#028A3D";
    for (let i=0; i<choicesListTable.length; i++) {
        if (choicesListTable[i].id==element.id) element.style.border="1px solid #028A3D";
        else choicesListTable[i].style.border="1px solid #DDDDDD";
    }
}

function countDown(){
    if (time==0) {
        buttonNext.disabled=false;
        buttonNext.click();
    } else {
        questionPageTimeInText.textContent=time;
        time--;
    }
}

function reduceGauge () {
    timeForProgressBarGauge-=0.01;
    progressBarGauge.style.width=`${(100/60)*timeForProgressBarGauge}%`;
    if (time<10) progressBarGauge.style.backgroundColor="#FF3838";
    else progressBarGauge.style.backgroundColor="#028A3D";
}

function ckeckTheChoice () {
    for (let i=0; i<choicesListTable.length; i++) {
        if  (choicesListTable[i].children[0].checked==true && choicesListTable[i].children[0].value==listOfQuestions[index].trueAnswer) score+=1;
        choicesListTable[i].children[0].checked=false;
    }
}

function displayQuestionAndChoice () {
    buttonNext.disabled=true;
    buttonNext.style.backgroundColor="rgba(2, 138, 61, 0.42)";
    time=60;
    timeForProgressBarGauge=60;
    questionPageTimeInText.textContent="60";
    questionPageQuestion.textContent=listOfQuestions[index].question;
    questionPageNumber.textContent="Question "+(index+1) +"/"+listOfQuestions.length;

    for (let i=0; i<choicesListTable.length; i++) {
        choicesListTable[i].style.border="1px solid #DDDDDD";
        choicesListTable[i].innerHTML=`<input type="radio" id="choice${i+1}" name="choice" value="${listOfQuestions[index].propositions[i]}">${listOfQuestions[index].propositions[i]}`
    }
    if (index==listOfQuestions.length-1) buttonNext.textContent="Terminer";
}

function displayResult () {
    resultPageGamerName.textContent=gamer.nom;
    resultPageGamerEmail.textContent=gamer.email;
    if (score>(listOfQuestions.length/2)) {
        resultPageIconeFailed.style.display="none";
    } else {
        resultPageIconSuccess.style.display="none";
        resultPageIconeFailed.style.color="#FF3838";
    }
    resultPageScore.textContent=score+"/15";
    buttonHome.textContent="Accueil";
}

function testInputs(inputName, inputEmail, errorName, errorEmail) {
    let masque = /\s/g;
    let masqueEmail = /(@[a-z]+.com)$/;
    if (masque.test(inputName.value) || inputName.value=="" || !(masqueEmail.test(inputEmail.value)) || inputEmail.value=="" || inputName.value.length<3) {
        if (masque.test(inputName.value) || inputName.value=="" || inputName.value.length<3) {
            if (inputName.value.length<3 && !(inputName.value=="")) {
                errorName.textContent="Saisissez un nom de plus de trois caractères";
                showError(inputName,errorName);
            } else {
                errorName.textContent="N’oubliez pas de renseigner votre nom avant de commencer le Quiz.";             
                showError(inputName,errorName);
            }            
        } else {
            dontShowError(inputName,errorName);
        }  
        if (!(masqueEmail.test(inputEmail.value)) || inputEmail.value=="") {
            showError(inputEmail,errorEmail);
        } else {
            dontShowError(inputEmail,errorEmail);
        }         
    } else {
        
        gamer.nom=inputName.value;
        gamer.email=inputEmail.value;
        homePage.style.display="none";
        questionPage.style.display="block";
        setInterval(() => countDown(), 1000);
        setInterval(() => reduceGauge(), 10);
        displayQuestionAndChoice ();
    } 
}

function showError (element, error) {
    element.style.border="1px solid #FF3838";
    error.style.display="block";
}

function dontShowError (element, error) {
    element.style.border="1px solid #DDDDDD";
    error.style.display="none";
}

