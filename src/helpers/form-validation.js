const patterns = {
    region: /^(?!\s*$).+/,
    city: /^(?!\s*$).+/,
    company: /^(?!\s*$).+/,
    position: /^(?!\s*$).+/,
    phoneNumber: /^\+\d\s\d{3}\s\d{3}-\d{2}-\d{2}$/,
    lastName: /^.{2,}$/,
    firstName: /^.{2,}$/,
    middleName: /^.*$/,
    agree: true,
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};


const isInputsValid = function (container, button) {
    var isNonValid = false,
        inputs = document.querySelectorAll(container + ' input,' + container + ' select');
  
    for (var n = inputs.length; n--; ) {
      if (!inputs[n].parentNode.hidden) {
        if (inputs[n].tagName === 'INPUT' && inputs[n].getAttribute('type') === 'checkbox') {
          patterns[inputs[n].getAttribute('id')] === inputs[n].checked || (isNonValid = true);
        } else {
          if (inputs[n].classList.contains('with_selector')) {
            patterns[inputs[n].getAttribute('id')].test(inputs[n].getAttribute('data-selected-id') || '') || (isNonValid = true);
          } else if (patterns[inputs[n].getAttribute('id')]) {
            patterns[inputs[n].getAttribute('id')].test(inputs[n].value.trim()) || (isNonValid = true);
          }
        }
      }
    };
  
    if (button) {
      if (isNonValid) {
        document.querySelector(button).setAttribute('disabled', 'true');
      } else {
        document.querySelector(button).removeAttribute("disabled");     
      };
    };
  
    return !isNonValid;
}

export {
    isInputsValid
}
