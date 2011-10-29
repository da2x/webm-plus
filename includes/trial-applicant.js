// ==UserScript==
// @include http://youtube.com/html5
// @include http://www.youtube.com/html5
// @include https://youtube.com/html5
// @include https://www.youtube.com/html5
// ==/UserScript==

(function() {

  opera.extension.onmessage = function(event)
  {
    var message  = event.data;
    if (message === 'testCandidate')
    {
      alert('sucess');
    }
    else {
      opera.postError("background process sent: " + message);
      var reply = "background process's message only had " + (message ? message.length : 0) + " characters.";
      event.source.postMessage(reply);
  }};

  window.addEventListener('DOMContentLoaded', function()
  {
    submitFormWithSessionToken();
  }, false);

  var form = document.getElementById('html5form');

  function submitFormWithSessionToken()
  {
    if (form)
    {
      if (form.querySelector("input[name='enable_html5']"))
      {
        if (!form.querySelector("input[name='session_token']"))
        {
          form.addEventListener('DOMNodeInserted', formSubmitter, false);
        }
        else formSubmitter();
      }
      else if (form.querySelector("input[name='disable_html5']"))
      {
        continueTesting();
        opera.extension.postMessage('testCandidate');
    }}
    else opera.postError('HTML5 Trial Applicant form not found.');
  }

  function formSubmitter()
  {
    form.submit();
  }

  function continueTesting()
  { // keep the test subjects in the HTML5 Trial
    var enrichmentCentre = document.getElementById('html5-join-link'),
    escapeElevator = enrichmentCentre.getElementsByTagName('h3')[0];
    enrichmentCentre.removeChild(escapeElevator);
  } // ... there is no escape ...
}());