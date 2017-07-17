function menu(){

    var e =$('#first');
    setVoiceOverFocus(e);
    
    console.log('hi there');
}
console.log( JSON.parse( localStorage.getItem( 'cart' ) ) );

function setVoiceOverFocus(element) {
  var focusInterval = 10; // ms, time between function calls
  var focusTotalRepetitions = 10; // number of repetitions

  element.setAttribute('tabindex', '0');
  element.blur();

  var focusRepetitions = 0;
  var interval = window.setInterval(function() {
    element.focus();
    focusRepetitions++;
    if (focusRepetitions >= focusTotalRepetitions) {
      window.clearInterval(interval);
    }
  }, focusInterval);
}