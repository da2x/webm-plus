(function() {
  var html5VideoStatus = false;

  window.addEventListener('load', function()
  {
    opera.extension.onmessage = function(event)
    {
      var message = event.data;
      if (message === 'goodHtml5VideoStatus') broadcastGoodStatus();
      if (message === 'requestHtml5VideoStatus' && !html5VideoStatus) replyTestHtml5VideoStatus(event);
  }}, false);

  function broadcastGoodStatus()
  {
    html5VideoUserStatus = true;
    opera.extension.broadcastMessage('goodHtml5VideoStatus');
  }

  function replyTestHtml5VideoStatus(event)
  {
    event.source.postMessage('testHtml5VideoStatus');
}}());