(function() {
  window.addEventListener('DOMContentLoaded', function()
  {
    document.title = _('%widgetname options');

    var heading = document.getElementsByTagName('h1')[0],
    title = document.createTextNode(_('%widgetname options'));
    heading.appendChild(title);

    addOption('continueTesting');
    addOption('videoSaveButton');
    addOption('neverReload');
    addOption('hideFlashPromo');
    addOption('preventFlash');

    document.getElementById('buttonOk').setAttribute('value', _('Done'));

    document.getElementsByTagName('footer')[0].getElementsByTagName('ul')[0].getElementsByTagName('a')[0].firstChild.nodeValue=_('Open source on Github');
  }, false);

  function _(string)
  {
    if (typeof(i18n) != 'undefined' && i18n[string])
    {
      return i18n[string];
    }
    return string;
  }

  function labelStringByOptionId(id)
  {
    var string = null;
    switch (id)
    {
      case 'continueTesting': string = 'Check HTML5 Trial participation status once per session'; break;
      case 'videoSaveButton': string = 'Add a ‘Download Video’ button below all WebM videos'; break;
      case 'neverReload': string = 'Never reload any embedded- or video pages'; break;
      case 'hideFlashPromo': string = 'Hide promotions for Adobe Flash'; break;
      case 'preventFlash': string = 'Prevent all video playback using the Adobe Flash plug-in'; break;
    }
    return string;
  }

  function addOptionToPage(id)
  {
    var option = document.createElement('div'),
    checkbox = document.createElement('input'),
    label = document.createElement('label'),
    i18nstring = _(labelStringByOptionId(id)),
    string = document.createTextNode(i18nstring);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', id);
    option.appendChild(checkbox);
    label.setAttribute('for', id)
    label.appendChild(string);
    option.appendChild(label);
    document.getElementById('options').appendChild(option);
  }

  function saveOptionOnChange(id)
  {
    document.getElementById(id).addEventListener('change',
    function() {
      widget.preferences.setItem(id, ((this.checked) ? 'true' : 'false'));
    }, false);
  }

  function setOptionState(id)
  {
    if (widget.preferences.getItem(id))
    {
      var elem = document.getElementById(id);
      elem.checked = ((widget.preferences.getItem(id) == 'true') ? true : false);
  }}

  function addOption(id)
  {
    addOptionToPage(id);
    saveOptionOnChange(id);
    setOptionState(id);
}}());