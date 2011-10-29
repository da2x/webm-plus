// ==UserScript==
// @include http://youtube.com/html5
// @include http://www.youtube.com/html5
// @include https://youtube.com/html5
// @include https://www.youtube.com/html5
// ==/UserScript==

(function() {
  var form = document.getElementById('html5form');
  window.addEventListener('DOMContentLoaded', function()
  {
    submitFormWithSessionToken();
  }, false);

  function submitFormWithSessionToken()
  {
    if (widget.preferences.continueTesting == 'true')
    {
      if (form != null)
      {
        if (form.querySelector("input[name='enable_html5']"))
        {
          if (!form.querySelector("input[name='session_token']"))
          {
            form.addEventListener('DOMNodeInserted', submitForm, false);
          }
          else submitForm();
        }
        else if (form.querySelector("input[name='disable_html5']"))
        {
          continueTesting();
          opera.extension.postMessage('goodHtml5VideoStatus');
      }}
      else opera.extension.postMessage('badHtml5VideoStatus');
  }}

  function submitForm()
  {
    form.submit();
  }

  function continueTesting()
  {  // keep the test subjects in the HTML5 Trial
    var enrichmentCentre = document.getElementById('html5-join-link');
    if (enrichmentCentre != null)
    {
      var escapeElevator = enrichmentCentre.getElementsByTagName('h3')[0];
      enrichmentCentre.removeChild(escapeElevator);
  }} // ... there is no escape ...
}());