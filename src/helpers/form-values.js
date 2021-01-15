import {isInputsValid} from "./form-validation";

export const getFormValues = function (form) {
    var formValues = {},
        inputs = document.querySelectorAll(form + ' input,' + form + ' select');

    if (isInputsValid(form)) {
        for (var n = inputs.length; n--; ) {
            if (!inputs[n].parentNode.hidden) {
                var inputName = inputs[n].getAttribute('data-name') || inputs[n].getAttribute('name');
                if (inputs[n].getAttribute('inputmode') === 'tel') {
                    formValues[inputName] = inputs[n].value.replace(/[^\d]/g, '');
                } else {
                    if (inputs[n].getAttribute('type') !== 'checkbox') {
                        if (inputs[n].classList.contains('with_selector')) {
                            if (inputs[n].getAttribute('data-selected-id')) {
                                formValues[inputName] = inputs[n].getAttribute('data-selected-id');
                            }
                        } else {
                            if (inputs[n].value) {
                                formValues[inputName] = inputs[n].value;
                            }
                        }
                    };
                };
            }
        }
    }
    return formValues;
}