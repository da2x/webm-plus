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
    if (!oexWMPbetaParticipant())
    {
      if (widget.preferences.continueTesting == 'true') oexWMPbetaApplicant();
    }
    if (widget.preferences.videoSaveButton == 'true') oexWMPsaveButton();
    if (widget.preferences.filterSearch == 'true') oexWMPfilterSearchResults();
    if (widget.preferences.hideFlashPromo == 'true') oexWMPremoveElement('flash10-promo-div');
    if (widget.preferences.hideFlashUpgrade == 'true') setTimeout((function() { oexWMPremoveElement('flash-upgrade'); }), 275);
    if (widget.preferences.preventFlash == 'true') oexWMPremoveElement('movie_player');
  }, false);

  var oexWMPbcv = 'f2=40000000',
    oexWMPbfc = 'PREF=' + oexWMPbcv;

  function oexWMPbetaParticipant()
  {
    setTimeout(t = oexWMPcookieTester('PREF',oexWMPbcv),1000);
    return t;
  }

  function oexWMPbetaApplicant ()
  {
    var d = new Date(),
      ed = (new Date(d.getTime()+(20908800000))).toUTCString(), // eight months
      cv = oexWMPcookieTester('PREF',false,true);
    if (cv != false && cv != undefined && cv != oexWMPbfc)
    {
      cv = cv.substring(5).replace(/&f2=[0-9]{0,9}|f2=[0-9]{0,9}&|&f2=[0-9]{0,9}/i,'');
      document.cookie = oexWMPbfc + '; expires=Thu, 01-Jan-1970 00:00:01 UTC; ;';
      document.cookie = oexWMPbfc + '&' + cv + '; path=/; domain=.youtube.com; ' +  'expires=' + ed;
    }
    else
    {
      document.cookie = oexWMPbfc + '; path=/; domain=.youtube.com; ' +  'expires=' + ed;
    }
  }

  function oexWMPcookieTester(ic,iv,rv)
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

  function oexWMPsaveButton()
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

  function oexWMPremoveElement(id)
  {
    var e = document.getElementById(id);
    if (e != null) e.parentNode.removeChild(e);
  }

  function oexWMPfilterSearchResults()
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
