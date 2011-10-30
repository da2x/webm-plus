(function() {
  var html5VideoStatus = false;

  window.addEventListener('load', function()
  {
    opera.extension.onmessage = function(event)
    {
      var message = event.data;
      if (message === 'requestHtml5VideoStatus' && !html5VideoStatus) replyTestStatus(event);
      else if (message === 'goodHtml5VideoStatus') broadcastGoodStatus();
  }}, false);

  function broadcastGoodStatus()
  {
    html5VideoUserStatus = true;
    opera.extension.broadcastMessage('goodHtml5VideoStatus');
  }

  function replyTestStatus(event)
  {
    event.source.postMessage('testHtml5VideoStatus');
}}());