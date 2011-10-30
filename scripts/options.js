(function() {
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
      case 'continueTesting': string = 'Rejoin the YouTube HTML5 Trial automatically'; break;
      case 'videoSaveButton': string = 'Add a ‘Download Video’ button below all WebM videos'; break;
      case 'filterSearch': string = 'Filter search result to WebM videos only'; break;
      case 'hideFlashPromo': string = 'Hide promotions for Adobe Flash'; break;
      case 'hideFlashUpgrade': string = 'Hide upgrade warnings for Adobe Flash'; break;
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
    if (id != 'preventFlash')
    {
      document.getElementById(id).addEventListener('change',
      function() {
        widget.preferences.setItem(id, ((this.checked) ? 'true' : 'false'));
      }, false);
    }
    // hideFlashUpgrade option must be enabled when preventFlash is enabled
    else if (id == 'preventFlash')
    {
      document.getElementById(id).addEventListener('change',
      function() {
        widget.preferences.setItem(id, ((this.checked) ? 'true' : 'false'));
        var flashUpgrade = document.getElementById('hideFlashUpgrade');
        if (this.checked == true)
        {
          flashUpgrade.checked = true;
          flashUpgrade.disabled = true;
          widget.preferences.setItem('hideFlashUpgrade', 'true');
        }
        else
        {
          flashUpgrade.disabled = false;
        }
      }, false);
  }}

  function setOptionState(id)
  {
    if (widget.preferences.getItem(id)) 
    {
      var elem = document.getElementById(id);
      elem.checked = ((widget.preferences.getItem(id) == 'true') ? true : false);
      // hideFlashUpgrade option is disabled if preventFlash is enabled
      if (id == 'preventFlash' && elem.checked == true)
      {
        document.getElementById('hideFlashUpgrade').disabled = true
  }}}

  function addOption(id)
  {
    addOptionToPage(id);
    saveOptionOnChange(id);
    setOptionState(id);
  }

  window.addEventListener('DOMContentLoaded', function()
  {
    document.title = _('%widgetname options');

    var heading = document.getElementsByTagName('h1')[0],
    title = document.createTextNode(_('%widgetname options'));
    heading.appendChild(title);

    addOption('continueTesting');
    addOption('videoSaveButton');
    addOption('filterSearch');
    addOption('hideFlashPromo');
    addOption('hideFlashUpgrade');
    addOption('preventFlash');

    document.getElementById('buttonOk').setAttribute('value', _('Done'));
  }, false);
}());