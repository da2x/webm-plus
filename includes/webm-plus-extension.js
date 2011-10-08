// ==UserScript==
// @include http://youtube.com/*
// @include https://youtube.com/*
// @include http://*.youtube.com/*
// @include https://*.youtube.com/*
// ==/UserScript==

var oexYouTubeWebMPlus = function()
{
  window.addEventListener('DOMContentLoaded', function()
  {
    if (!trialParticipant())
    {
      if (widget.preferences.continueTesting == 'true') trialApplicant();
    }
    if (widget.preferences.videoSaveButton == 'true') downloadVideoButton();
    if (widget.preferences.filterSearch == 'true') filterSearchResults();
    if (widget.preferences.hideFlashPromo == 'true') removeElement('flash10-promo-div');
    if (widget.preferences.hideFlashUpgrade == 'true') setTimeout((function() { removeElement('flash-upgrade'); }), 275);
    if (widget.preferences.preventFlash == 'true') removeElement('movie_player');
  }, false);

  var trialCookieValue = 'f2=40000000',
    trialCookie = 'PREF=' + trialCookieValue;

  function trialParticipant()
  {
    setTimeout(t = cookieTester('PREF',trialCookieValue),1000);
    return t;
  }

  function trialApplicant()
  {
    var d = new Date(),
      ed = (new Date(d.getTime()+(20908800000))).toUTCString(), // eight months
      cv = cookieTester('PREF',false,true);
    if (cv != false && cv != undefined && cv != trialCookie)
    {
      cv = cv.substring(5).replace(/&f2=[0-9]{0,9}|f2=[0-9]{0,9}&|&f2=[0-9]{0,9}/i,'');
      document.cookie = trialCookie + '; expires=Thu, 01-Jan-1970 00:00:01 UTC; ;';
      document.cookie = trialCookie + '&' + cv + '; path=/; domain=.youtube.com; ' +  'expires=' + ed;
    }
    else
    {
      document.cookie = trialCookie + '; path=/; domain=.youtube.com; ' +  'expires=' + ed;
    }
  }

  function cookieTester(ic,iv,rv)
  {
    var i, jar = document.cookie.split(';');
    for(i=0;i < jar.length;i++)
    {
      var c = jar[i];
      while (c.charAt(0) == ' ') c = c.substring(1,c.length);
      if (c.indexOf(ic + '=') == 0 && iv == null) return true;
      else if ((c.indexOf(ic + '=') == 0) && rv != null) return c;
      else if ((c.indexOf(ic + '=') == 0) && (c.substring(ic + '='.length,c.length).indexOf(iv) >= 0) && rv == null) return true;
    }
    return false;
  }

  function downloadVideoButton()
  {
    var v = document.getElementsByTagName('video'),
    c = document.getElementById('watch-actions-right'),
    b = document.createElement('button');
    if (v.length > 0 && c != undefined)
    {
      b.setAttribute('class', 'yt-uix-button yt-uix-tooltip yt-uix-tooltip-reverse');
      b.style.position = 'relative';
      b.style.top = '-4px';
      b.setAttribute('data-tooltip-text', 'Click, then press Ctrl+S to save.');
      b.onclick = function() { window.location = v[0].src; }
      t = document.createTextNode('Download Video');
      b.appendChild(t)
      c.appendChild(b);
    };
  }

  function removeElement(id)
  {
    var e = document.getElementById(id);
    if (e != null) e.parentNode.removeChild(e);
  }

  function filterSearchResults()
  {
    var p, sf = document.getElementById('masthead-search');
    if (sf != null) {
      p = document.createElement('input');
      p.setAttribute('name', 'webm');
      p.setAttribute('type', 'hidden');
      p.setAttribute('value', '1');
      sf.appendChild(p);
  }}
}();