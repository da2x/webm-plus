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

(function() {
  var requestedHtml5VideoStatus = false;

  window.addEventListener('load', function()
  {
    opera.extension.postMessage('requestHtml5VideoStatus');
    opera.extension.onmessage = function(event)
    {
      if (event.data === 'testHtml5VideoStatus' && !requestedHtml5VideoStatus)
      {
        loadHtml5VideoTestFrame();
      }
      if (event.data === 'goodHtml5VideoStatus')
      {
        reloadVideoPage(event.data);
      }
  }}, false);

  window.addEventListener('DOMContentLoaded', function()
  {
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

  function loadHtml5VideoTestFrame()
  {
    requestedHtml5VideoStatus = true;
    var isHtml5VideoPlayer, videoPlayer = document.getElementById('watch-player');
    if (videoPlayer != null)
    {
      if (videoPlayer.class === 'html5-player') isHtml5VideoPlayer = true;
    }
    if (!isHtml5VideoPlayer)
    {
      var frame = document.createElement('iframe');
      frame.style.height = '1px';
      frame.style.width = '1px';
      frame.setAttribute('id', 'html5formframe');
      frame.setAttribute('src', window.location.protocol + '//' + window.location.hostname + '/html5');
      document.body.appendChild(frame);
  }}

  function reloadVideoPage()
  {
    var videoPage = window.location.pathname.indexOf('/watch'),
    html5Videos = document.getElementsByTagName('video').length;
    if (videoPage === 0 && html5Videos === 0)
    {
      window.location = window.location.href;
  }}

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
}}}());