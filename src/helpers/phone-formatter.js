const formatInputMobile = function(e) {
    var val = this.value.replace(/[^\d]/g, ''),
      delimiters = [' ', ' ', '-', '-'],
      chunks = [],
      formattedNumber = '+7';

    while(val[0] !== '7' && val.trim() !== '') {
      val = val.substr(1, 11);
    }

    val = val.substr(0, 11);
    chunks.push(val.substr(1, 3));
    chunks.push(val.substr(4, 3));
    chunks.push(val.substr(7, 2));
    chunks.push(val.substr(9, 2));
  
    for(var i = 0; i < chunks.length; i++) {
      if (chunks[i]) {
        formattedNumber += delimiters[i] + chunks[i];
      } else {
        break;
      }
    }

    if ((this.value == '' || this.value == '+') && e.inputType.toLowerCase().indexOf('delete') >= 0) {
        this.value = '';
        return
    }

    this.value = formattedNumber;
}

const setupDefaultNumber = function() {
    if (this.value == '') this.value = '+7 ';
    if (this.selectionStart < 2 && this.selectionStart === this.selectionEnd) {
      setTimeout(() => {
        this.selectionStart = this.selectionEnd = this.value.length;
      });
    }
}

export {
    setupDefaultNumber,formatInputMobile
}
  