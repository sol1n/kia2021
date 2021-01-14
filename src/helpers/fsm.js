import {isInputsValid} from './form-validation';

export const fsm = {
    state: 'main',
    previousState: null,
    dispatch: function (actionName, payload) {
      console.log('Transition "' + actionName + '" from state "' + this.state + '"');
      const actions = this.transitions[this.state];
      const action = this.transitions[this.state][actionName];

      if (action) {
        action.call(fsm, payload);
      }
    },
    changeStateTo: function (newState) {
      console.log('State: ', newState);
      this.previousState = this.state;
      this.state = newState;
    },
    transitions: {
      'main': {
        input: function() {
            isInputsValid('#register-form', '#submit-button')
        }, 
      },
    }
  };


export const inputHandler = function() { 
    fsm.dispatch('input') 
};

export const setInputHandler = function(container, handler) {
  var inputs = document.querySelectorAll(container + ' input,' + container + ' select');
  Array.prototype.forEach.call(inputs, function(e) {
    switch (e.tagName) {
      case "INPUT":
        e.oninput = handler;
        break;
      case "SELECT":
        e.onchange = handler;
        break;
    }
  });
};