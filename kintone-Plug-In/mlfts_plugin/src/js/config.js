((PLUGIN_ID) => {
  'use strict';

  // a library that summarizes the processing required when using kintone REST API with JavaScript
  const client = new KintoneRestAPIClient({});

  // Get the elements
  const fieldSelection = document.getElementById('field-selection');
  const bgColor = document.getElementById('bg-color');
  const saveButton = document.getElementById('save');
  const cancelButton = document.getElementById('cancel');

  // Escape HTML:
  // less than symbol (<) with &lt;
  // greater than symbol (>) with &gt;
  // double quotes (") with &quot;
  // single quote (’) with &#39;
  // ampersand (&) with &amp;
  const escapeHtml = (htmlStr) => {
    return htmlStr
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  // Set the saved data if it exists
  const setDefault = () => {
    // Get the saved data
    const conf = kintone.plugin.app.getConfig(PLUGIN_ID);
    if (conf) {
      // Set the saved data to the input field
      fieldSelection.value = conf.fieldSelection;
      bgColor.value = conf.bgColor;
    }
  };

  // Set the user selection field
  const setUserSelection = () => {
    // Get the app ID
    const APP_ID = kintone.app.getId();
    // Set the parameters body
    const params = {
      app: APP_ID,
      preview: true
    };
    // Get the user selection field
    return client.app.getFormFields(params).then((resp) => {
      // loop through the fields
      for (const key of Object.keys(resp.properties)) {
        if (!resp.properties[key]) {
          continue;
        }
        const option = document.createElement('option');
        const prop = resp.properties[key];
        // If the field type is user selection, set the field code and label
        if (prop.type === 'USER_SELECT') {
          // Set the field code and label
          option.setAttribute('value', escapeHtml(prop.code));
          option.innerText = escapeHtml(prop.label);
          // Add the field to the drop-down list
          fieldSelection.appendChild(option);
        }
      }
    }).catch((error) => {
      console.log(error);
      alert('Error occurred.');
    });
  };

  // Set the input data if the save button is clicked
  saveButton.onclick = () => {
    const config = {};
    // Check if the user selection field has been selected
    if (!fieldSelection.value || fieldSelection.value === 'null') {
      alert('The user selection field has not been selected.');
      return false;
    }
    // Check if the background color has been selected
    config.fieldSelection = fieldSelection.value;
    // set the background color with the config object
    config.bgColor = bgColor.value;
    // Set the config object
    kintone.plugin.app.setConfig(config);
    return true;
  };

  // Cancel the process if the cancel button is clicked
  cancelButton.onclick = () => {
    history.back();
  };

  setUserSelection().then(() => {
    setDefault();
  });

})(kintone.$PLUGIN_ID);
