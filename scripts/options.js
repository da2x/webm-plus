(function() {
  window.addEventListener('DOMContentLoaded', function()
  {
    document.title = _('YouTube WebM Plus options');

    var heading = document.getElementsByTagName('h1')[0],
    title = document.createTextNode(_('YouTube WebM Plus options'));
    heading.appendChild(title);

    addOption('continueTesting');
    addOption('redirectEmbedded');
    addOption('alternatePlayer');
    addOption('videoSaveButton')
    addOption('hideFlashPromo');

    document.getElementById('buttonOk').setAttribute('value', _('Done'));

    document.getElementsByTagName('footer')[0].getElementsByTagName('ul')[0].getElementsByTagName('a')[0].firstChild.nodeValue=_('Open source on Github');
  }, false);

  function _(string)
  {
    if (typeof(oexi18n) != 'undefined' && oexi18n[string])
    {
      return oexi18n[string];
    }
    return string;
  }

  function labelStringByOptionId(id)
  {
    var string = null;
    switch (id)
    {
      case 'continueTesting': string = _('Check HTML5 Trial participation status once per session'); break;
      case 'redirectEmbedded': string =  _('Request WebM for embedded videos on third-party Web sites'); break;
      case 'alternatePlayer': string = _('Embed alternate player instead of using Flash'); break;
      case 'videoSaveButton': string =  _('Add a ‘Download Video’ button below all WebM videos'); break;
      case 'hideFlashPromo': string = _('Hide promotions for Adobe Flash Player'); break;
    }
    return string;
  }

  function addOptionToPage(id)
  {
    var option = document.createElement('div'),
    checkbox = document.createElement('input'),
    label = document.createElement('label'),
    i18nstring = labelStringByOptionId(id),
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