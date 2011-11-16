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
  var videopage = (window.location.pathname.indexOf('/watch') === 0),
  embedded = (window.location.pathname.indexOf('/embed/') === 0),
  userpage = ((window.location.pathname.indexOf('/user/') === 0) || (window.location.pathname.indexOf('/profile') === 0));
  window.addEventListener('load', function()
  {
    if (embedded) redirectEmbeddedUnlessHtml5();
    opera.extension.onmessage = function(event)
    {
      if (event.data === 'testHtml5VideoStatus' && !embedded)
      {
        loadHtml5TrialTestFrame();
      }
      if (event.data === 'goodHtml5VideoStatus' || event.data === 'badHtml5VideoStatus')
      {
        removeElementById('html5testformframe');
  }}}, false);

  window.addEventListener('DOMContentLoaded', function()
  {
    if (videopage && !isHtml5VideoPlayer())
    {
      replaceFlashWithFramePlayer();
      document.getElementById('watch-player').addEventListener('DOMNodeInserted', replaceFlashWithFramePlayer, false);
    }
    else if (userpage && !isHtml5VideoPlayer())
    {
      replaceFlashWithFramePlayer();
      document.getElementById('playnav-player').addEventListener('DOMNodeInserted', replaceFlashWithFramePlayer, false);
    }
    opera.extension.postMessage('requestHtml5VideoStatus');
    if (videopage)
    {
      if (widget.preferences.getItem('videoSaveButton') === 'true') downloadVideoButton();
      if (widget.preferences.getItem('hideFlashPromo') === 'true') removeElementById('flash10-promo-div');
    }
  }, false);

  function _(string)
  {
    if (typeof(oexWebMPlusi18n) != 'undefined' && oexWebMPlusi18n[string])
    {
      return oexWebMPlusi18n[string];
    }
    return string;
  }

  function removeElementById(id)
  {
    var element = document.getElementById(id);
    if (element != null) element.parentNode.removeChild(element);
  }

  function isHtml5VideoPlayer()
  {
    if (videopage)
    {
      var videoPlayer = document.getElementById('watch-player');
      if (videoPlayer != null)
      {
        if (videoPlayer.class === 'html5-player') return true;
      }
      else return false;
    }
    else if (embedded)
    {
      var videoPlayer = document.getElementById('video-player');
      if (videoPlayer != null)
      {
        if (videoPlayer.class === 'html5-video-player') return true;
      }
      else return false;
    }
    else if (userpage)
    {
      var videoPlayer = document.getElementById('playnav-player');
      if (videoPlayer != null)
      {
        if (videoPlayer.getElementsByTagName('video').length > 0 || videoPlayer.getElementsByTagName('iframe').length > 0)
        {
          return true;
        }
        else if (videoPlayer.getElementsByTagName('embed')[0]) return false;
        else return false;
      }
      else return false;
    }
    else return false;
  }

  function loadHtml5TrialTestFrame()
  {
    var iframe = document.createElement('iframe');
    iframe.style.height = '1px';
    iframe.style.width = '1px';
    iframe.setAttribute('id', 'html5testformframe');
    iframe.setAttribute('src', window.location.protocol + '//' + window.location.hostname + '/html5');
    document.body.appendChild(iframe);
  }

  function redirectEmbeddedUnlessHtml5()
  {
    if (widget.preferences.getItem('redirectEmbedded') === 'true')
    {
      if (!isHtml5VideoPlayer() && embedded)
      {
        if (!~window.location.href.indexOf('html5=True'))
        {
          if (~window.location.href.indexOf('?'))
          {
            window.location = window.location.href + '&html5=True'
          }
          else window.location = window.location.href + '?html5=True'
  }}}}

  function createFramePlayer(videoid)
  {
    if (videoid)
    {
      var iframe = document.createElement('iframe');
      iframe.style.borderWidth = '0px';
      iframe.style.height = '100%';
      iframe.style.width = '100%';
      iframe.src = 'http://www.youtube.com/embed/' + videoid + '?html5=True&autoplay=1&modestbranding=1';
      return iframe;
    }
    else return false; 
  }

  function replaceFlashWithFramePlayer()
  {
    if (widget.preferences.getItem('alternatePlayer') === 'true')
    {
      if (document.getElementById('flash-upgrade'))
      {
        removeElementById('flash-upgrade');
        document.getElementById('watch-player').appendChild(createFramePlayer(window.yt.getConfig('VIDEO_ID')));
      }
      else if (userpage && document.getElementById('playnav-player'))
      {
        var videoPlayer = document.getElementById('playnav-player'),
        flashplayer = document.getElementById('movie_player'),
        videoid = undefined;
        if (flashplayer && flashplayer.getAttribute('flashvars'))
        {
          videoid = flashplayer.getAttribute('flashvars').match(/(?:&video_id=)([a-z,A-Z,0-9,_,-]{0,200})/)[1];
          videoPlayer.removeChild(flashplayer);
          videoPlayer.appendChild(createFramePlayer(videoid));
        }
        else return false;
  }}}

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
}}}());