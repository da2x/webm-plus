// ==UserScript==
// @include http://youtube.com/*
// @include http://*.youtube.com/*
// @include https://youtube.com/*
// @include https://*.youtube.com/*
// @exclude http://youtube.com/html5
// @exclude http://*.youtube.com/html5
// @exclude https://youtube.com/html5
// @exclude https://*.youtube.com/html5
// ==/UserScript==

var oexYouTubeWebMPlus = function()
{
  window.addEventListener('DOMContentLoaded', function()
  {
    if (!trialParticipant() && (widget.preferences.getItem('continueTesting') === 'true')) trialApplicant();
    if (widget.preferences.getItem('videoSaveButton') === 'true') downloadVideoButton();
    if (widget.preferences.getItem('filterSearch') === 'true') filterSearchResults();
    if (widget.preferences.getItem('hideFlashPromo') === 'true') removeElementById('flash10-promo-div');
    if (widget.preferences.getItem('hideFlashUpgrade') === 'true') setTimeout((function() { removeElementById('flash-upgrade'); }), 350);
    if (widget.preferences.getItem('preventFlash') === 'true') removeElementById('movie_player');
  }, false);

  function _(string)
  {
    if (typeof(oexWebMPlusi18n) != 'undefined' && oexWebMPlusi18n[string])
    {
      return oexWebMPlusi18n[string];
    }
    return string;
  }

  var trialCookieValue = 'f2=40000000',
    trialCookie = 'PREF=' + trialCookieValue;

  function trialParticipant()
  {
    var test;
    setTimeout(test = cookieTester('PREF',trialCookieValue),1000);
    return test;
  }

  function trialApplicant()
  {
    var date = new Date(),
    expirationDate = (new Date(date.getTime()+(20908800000))).toUTCString(), // eight months
    cookieValue = cookieTester('PREF',false,true),
    isVideoPage = window.location.pathname.indexOf('/watch');
    if (cookieValue != false && cookieValue != undefined && cookieValue != trialCookie)
    {
      cookieValue = cookieValue.substring(5).replace(/&f2=[0-9]{0,9}|f2=[0-9]{0,9}&|f2=[0-9]{0,9}/i,'');
      cookieValue = cookieValue.substring(5).replace(/&f3=[0-9]{0,9}|f3=[0-9]{0,9}&|f3=[0-9]{0,9}/i,'');
      document.cookie = trialCookie + '; expires=Thu, 01-Jan-1970 00:00:01 UTC; ;';
      setTimeout((function() { document.cookie = trialCookie + '&' + cookieValue + '; path=/; domain=.youtube.com; ' + 'expires=' + expirationDate; }), 750);
    }
    else
    {
      document.cookie = trialCookie + '; path=/; domain=.youtube.com; ' + 'expires=' + expirationDate;
    }
    if (~isVideoPage) setTimeout((window.location = window.location.href), 1000);
  }

  function cookieTester(inCookie,inValue,returnValue)
  {
    var i, cookieJar = document.cookie.split(';');
    for(i=0;i < cookieJar.length;i++)
    {
      var cookie = cookieJar[i];
      while (cookie.charAt(0) == ' ') cookie = cookie.substring(1,cookie.length);
      if (cookie.indexOf(inCookie + '=') == 0 && inValue == null) return true;
      else if ((cookie.indexOf(inCookie + '=') == 0) && returnValue != null) return cookie;
      else if ((cookie.indexOf(inCookie + '=') == 0) && (!~(cookie.substring(inCookie + '='.length,cookie.length).indexOf(inValue))) && returnValue == null) return true;
    }
    return false;
  }

  function downloadVideoButton()
  {
    var text, video = document.getElementsByTagName('video'),
    container = document.getElementById('watch-actions-right'),
    button = document.createElement('button');
    if (video.length > 0 && container != undefined)
    {
      button.setAttribute('class', 'yt-uix-button yt-uix-tooltip yt-uix-tooltip-reverse');
      button.style.position = 'relative';
      button.style.top = '-4px';
      button.setAttribute('data-tooltip-text', _('Click, then press Ctrl+S to save.'));
      button.onclick = function() { window.location = video[0].src; }
      text = document.createTextNode(_('Download Video'));
      button.appendChild(text)
      container.appendChild(button);
  }}

  function removeElementById(id)
  {
    var element = document.getElementById(id);
    if (element != null) element.parentNode.removeChild(element);
  }

  function filterSearchResults()
  {
    var parameter, searchField = document.getElementById('masthead-search');
    if (searchField != null) {
      parameter = document.createElement('input');
      parameter.setAttribute('name', 'webm');
      parameter.setAttribute('type', 'hidden');
      parameter.setAttribute('value', '1');
      searchField.appendChild(parameter);
}}}();