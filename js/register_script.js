document.addEventListener("DOMContentLoaded", function() {
    var btnPopup = document.querySelector(".btn-popup");
    var popupForm = document.getElementById("popup-form");
    var registerForm = document.getElementById("register-form");
    popupForm.style.transition = "all 0.5s cubic-bezier(0.7, -0.5, 0.3, 1.5)";
    registerForm.style.transition = "all 0.5s cubic-bezier(0.7, -0.5, 0.3, 1.5)";

    btnPopup.addEventListener("click", function() {
        popupForm.classList.toggle("active");
        btnPopup.classList.toggle("active");
        registerForm.classList.toggle("active");
    });

    new FormValidator(document.getElementById("popup-form"));
});

// ----------------------------------------------------------------------------
class FormValidator {
    constructor(myform) {
        this.__myForm = myform;
        this.submitHandler();

    }

    submitHandler() {
        this.__myForm.addEventListener('submit', (event) => {
            event.preventDefault();
            var validationMessages = [];
            let formElements = this.__myForm.getElementsByTagName("input");
            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                let elementValidations = element.dataset.validation;
                if (elementValidations) {
                    let elementValidationArray = elementValidations.split(" ");
                    for (let j = 0; j < elementValidationArray.length; j++) {
                        const func = elementValidationArray[j];
                        var message = this[func](element);
                        if (message.length > 0) {
                            validationMessages.push(message);
                        }
                    }
                }

            }
            var summeryValidation = document.querySelector(".summery-validation");
            summeryValidation.innerHTML = "";
            for (let i = 0; i < validationMessages.length; i++) {
                const message = validationMessages[i];
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(message));
                summeryValidation.appendChild(li);
            }
        });

    }

    notEmpty(element) {
        let label = element.dataset.label;
        if (element.value === "") {
            return "فیلد" + " " + label + " " + "نباید خالی بماند";
        }
        return "";
    }

    isMobile(element) {
        let label = element.dataset.label;
        const re = /^09[0|1|2|3][0-9]{8}$/;
        if (!re.test(element.value)) {
            return "قالب" + " " + label + " " + "نادرست است";
        }
        return "";
    }
}