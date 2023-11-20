/*
 * Aggregation Plug-in
 *
 * Index show customize
 */
jQuery.noConflict();

(function ($, PLUGIN_ID) {

  "use strict";
  // -------------------------------------------------------------------Create Element-----------------------------------------------------------------------------------------
  let json = {
    "initial_display": "no",
    "field": {
      "sample_multifield": {
        "type": "MultiFieldText",
        "code": "sample_multifield",
        "field": ["name", "surname", "middlename"],
        "label": "Sample multifield",
        "patial": "yes",
        "exact": "no",
        "newline": "no",
      },
      "Created_datetime": {
        "type": "CREATED_TIME",
        "code": "Created_datetime",
        "label": "Created datetime",
        "patial": "no",
        "exact": "no",
        "newline": "no",

      },
      "Record_number": {
        "type": "RECORD_NUMBER",
        "code": "Record_number",
        "label": "Record number",
        "patial": "no",
        "exact": "no",
        "newline": "no",

      },
      "diet": {
        "type": "CHECK_BOX",
        "code": "diet",
        "label": "diet",
        "patial": "no",
        "exact": "no",
        "newline": "no",

      },
      "start_date": {
        "type": "DATE",
        "code": "start_date",
        "label": "start date",
        "patial": "no",
        "exact": "no",
        "newline": "no",
      },
      "Status": {
        "type": "STATUS",
        "code": "Status",
        "label": "Status",
        "patial": "no",
        "exact": "no",
        "newline": "no",

      },
      "final_day": {
        "type": "DATETIME",
        "code": "final_day",
        "label": "final date",
        "patial": "no",
        "exact": "no",
        "newline": "no",

      },
      "sex": {
        "type": "RADIO_BUTTON",
        "code": "sex",
        "label": "Sex",
        "patial": "no",
        "exact": "no",
        "newline": "no",

      },
      "weight": {
        "type": "NUMBER",
        "code": "weight",
        "label": "weight(kg)",
        "noLabel": "no",
        "patial": "no",
        "exact": "no",
        "newline": "no",

      },
      "target": {
        "type": "MULTI_SELECT",
        "code": "target",
        "label": "target",
        "patial": "no",
        "exact": "no",
        "newline": "no",

      },
      "start_time": {
        "type": "TIME",
        "code": "start_time",
        "label": "start time",
        "patial": "no",
        "exact": "no",
        "newline": "no",

      },
      "Updated_datetime": {
        "type": "UPDATED_TIME",
        "code": "Updated_datetime",
        "label": "Updated datetime",
        "patial": "no",
        "exact": "no",
        "newline": "no",

      },
      "middlename": {
        "type": "SINGLE_LINE_TEXT",
        "code": "middlename",
        "label": "Middlename",
        "patial": "no",
        "exact": "no",
        "newline": "no",

      },
      "name": {
        "type": "SINGLE_LINE_TEXT",
        "code": "name",
        "label": "Name",
        "patial": "no",
        "exact": "no",
        "newline": "no",

      },
      "surname": {
        "type": "SINGLE_LINE_TEXT",
        "code": "surname",
        "label": "Surname",
        "patial": "no",
        "exact": "no",
        "newline": "no",

      },
      "address": {
        "type": "SINGLE_LINE_TEXT",
        "code": "address",
        "label": "Address",
        "patial": "no",
        "exact": "no",
        "newline": "no",

      },
      "bedtime": {
        "type": "DROP_DOWN",
        "code": "bedtime",
        "label": "Bedtime",
        "patial": "no",
        "exact": "no",
        "newline": "no",
      },
      "bmi": {
        "type": "CALC",
        "code": "bmi",
        "label": "BMI",
        "patial": "no",
        "exact": "no",
        "newline": "no",
        "format": "NUMBER_DIGIT",

      }
    }
  };
  const space = kintone.app.getHeaderSpaceElement();
  const buttonToggle = document.createElement("button");
  buttonToggle.classList.add('buttonToggle')

  const formElement = document.createElement("div");
  formElement.classList.add('form-container');

  const buttonHead = document.createElement("div");
  buttonHead.classList.add('buttonHead');

  const bodyContent = document.createElement("div");
  bodyContent.classList.add('bodyContent');

  const footerContent = document.createElement("div");
  footerContent.classList.add('footerContent');

  const searchButton = document.createElement("button");

  const resetButton = document.createElement("button");
  const radioInput2 = document.createElement("input");
  const radioItem2 = document.createElement("span");
  const radioInput1 = document.createElement("input");
  const radioItem1 = document.createElement("span");
  const containerRadio = document.createElement("div");

  const radioSearchReset = document.createElement("div");
  radioSearchReset.classList.add('radioSearchReset');

  const label1 = document.createElement("label");
  const label2 = document.createElement("label");

  buttonHead.appendChild(buttonToggle);
  formElement.appendChild(buttonHead);
  formElement.appendChild(bodyContent);
  footerContent.appendChild(radioSearchReset);
  formElement.appendChild(footerContent);

  // Set the properties for the button element
  buttonToggle.className = "kintoneplugin-button-normal";
  buttonToggle.id = "buttonToggle"
  buttonToggle.innerText = "Show";
  // Set the properties for the "Search" button
  searchButton.className = "kintoneplugin-button-normal";
  searchButton.id = "searchButton";
  searchButton.innerText = "Search";
  // Set the properties for the "Reset" button
  resetButton.className = "kintoneplugin-button-dialog-cancel";
  resetButton.innerText = "Reset";
  //div of radio
  containerRadio.className = "kintoneplugin-input-radio";
  containerRadio.id = "containerRadio";
  // Create the first radio button item
  radioItem1.className = "kintoneplugin-input-radio-item";
  radioItem1.style.marginLeft = "12px";
  radioItem2.className = "kintoneplugin-input-radio-item";
  // Create the first radio button
  radioInput1.type = "radio";
  radioInput1.name = "logicalOperatorRadio";
  radioInput1.value = "And";
  radioInput1.id = "radio-0";
  radioInput1.checked = "true";

  // Create the second radio button
  radioInput2.type = "radio";
  radioInput2.name = "logicalOperatorRadioF";
  radioInput2.value = "Or";
  radioInput2.id = "radio-1";

  // Create the label for the first radio button
  label1.setAttribute("for", "radio-0");
  label1.textContent = "And";

  // Create the label for the second radio button
  label2.setAttribute("for", "radio-1");
  label2.textContent = "Or";

  // Append radio input and label to the radio item
  radioItem1.appendChild(radioInput1);
  radioItem1.appendChild(label1);
  radioItem2.appendChild(radioInput2);
  radioItem2.appendChild(label2);

  // Append the radio items to the container div
  containerRadio.appendChild(radioItem1);
  containerRadio.appendChild(radioItem2);

  // Function to show the spinner
  function showSpinner() {
    try {
      // Initialize
      if ($('.kintone-spinner').length === 0) {
        // Create elements for the spinner and the background of the spinner
        const spin_div = $('<div id ="kintone-spin" class="kintone-spinner"></div>');
        const spin_bg_div = $('<div id ="kintone-spin-bg" class="kintone-spinner"></div>');

        // Append spinner to the body
        $(document.body).append(spin_div, spin_bg_div);

        // Set a style for the spinner
        $(spin_div).css({
          'position': 'fixed',
          'top': '50%',
          'left': '50%',
          'z-index': '510',
          'background-color': '#fff',
          'padding': '26px',
          '-moz-border-radius': '4px',
          '-webkit-border-radius': '4px',
          'border-radius': '4px'
        });
        $(spin_bg_div).css({
          'position': 'fixed',
          'top': '0px',
          'left': '0px',
          'z-index': '500',
          'width': '100%',
          'height': '200%',
          'background-color': '#000',
          'opacity': '0.5',
          'filter': 'alpha(opacity=50)',
          '-ms-filter': 'alpha(opacity=50)'
        });

        // Set options for the spinner
        const opts = {
          'color': '#000'
        };

        // Create the spinner
        new Spinner(opts).spin(document.getElementById('kintone-spin'));
      }

      // Display the spinner
      $('.kintone-spinner').show();
    } catch (error) {
      alert(error);
      return;
    }
  }

  // Function to hide the spinner
  function hideSpinner() {
    // Hide the spinner
    $('.kintone-spinner').hide();
  }

  // -------------------------------------------------------------------event Function-----------------------------------------------------------------------------------------
  let checkJson = "";
  kintone.events.on("app.record.index.show", async function (e) {
    // Check checkJson is empty or not
    if (checkJson) return;
    let fields = await kintone.api(kintone.api.url("/k/v1/app/form/fields.json", true), "GET", { app: kintone.app.getId() });
    let status = await kintone.api(kintone.api.url("/k/v1/app/status.json", true), "GET", { app: kintone.app.getId() });

    checkJson = json.field;
    let fieldCodes = [];
    let fieldLabels = [];
    let fieldCalcformat = [];
    let fielMultiplefield = [];
    let fieldPatail = [];
    let fieldExact = [];
    // let fieldLines = [];
    Object.keys(json.field).forEach(key => {
      fieldCodes.push(json.field[key].type);
      fieldLabels.push(json.field[key].code);
      fieldCalcformat.push(json.field[key].format);
      fielMultiplefield.push(json.field[key].field);
      fieldPatail.push(json.field[key].patial);
      fieldExact.push(json.field[key].exact);
    });

    for (let i = 0; i < fieldCodes.length; i++) {

      if (fieldCodes[i] === "MultiFieldText") {
        addSingleLineText(fieldLabels[i], fielMultiplefield[i].join('-')); // Joins labels with a comma and space
      }
      if (fieldCodes[i] === "SINGLE_LINE_TEXT") {
        addSingleLineText(fieldLabels[i], fieldLabels[i]);
      }
      if (fieldCodes[i] === "NUMBER") {
        addRangeInputField(fieldLabels[i], "number");
      }
      if (fieldCodes[i] === "DATE") {
        addRangeInputField(fieldLabels[i], "date");
      }
      if (fieldCodes[i] === "DATETIME") {
        addRangeInputField(fieldLabels[i], "datetime-local");
      }
      if (fieldCodes[i] === "TIME") {
        addRangeInputField(fieldLabels[i], "time");
      }
      if (fieldCodes[i] === "MULTI_SELECT") {
        let options = fields.properties[fieldLabels[i]].options;
        addMultiSelectDropdown(fieldLabels[i], options);
      }
      if (fieldCodes[i] === "CALC") {
        addRangeInputField(fieldLabels[i], "number", fieldCalcformat[i]);
      }
      if (fieldCodes[i] === "DROP_DOWN") {
        let options = fields.properties[fieldLabels[i]].options;
        addMultiSelectDropdown(fieldLabels[i], options);
      }
      if (fieldCodes[i] === "CHECK_BOX") {
        let options = fields.properties[fieldLabels[i]].options;
        addMultiSelectDropdown(fieldLabels[i], options);
      }
      if (fieldCodes[i] === "RADIO_BUTTON") {
        let options = fields.properties[fieldLabels[i]].options;
        addMultiSelectDropdown(fieldLabels[i], options);
      }
      if (fieldCodes[i] === "CREATED_TIME") {
        addRangeInputField(fieldLabels[i], "datetime-local");
      }
      if (fieldCodes[i] === "RECORD_NUMBER") {
        addRangeInputField(fieldLabels[i], "number");
      }
      if (fieldCodes[i] === "UPDATED_TIME") {
        addRangeInputField(fieldLabels[i], "datetime-local");
      }
      if (fieldCodes[i] === "STATUS") {
        let options = status.states;
        addMultiSelectDropdown(fieldLabels[i], options, fieldCodes[i]);
      }
    }
    // Append the "Search" and "Reset" and containerRadio to containerbutton
    radioSearchReset.style.display = "flex";

    function addSingleLineText(fieldlabel, fieldName) {
      const divName = document.createElement("div");
      divName.classList.add('divName')
      const inputElement = document.createElement("div");
      inputElement.classList.add("kintoneplugin-input-outer");
      inputElement.innerHTML = `
                    <b>${fieldlabel}</b><br>
                    <input class="kintoneplugin-input-text" type="text" id="singleLineText-${fieldName}">
                `;
      divName.appendChild(inputElement);
      bodyContent.appendChild(divName)
    }

    function addRangeInputField(fieldName, fieldType, format) {
      const divDate = document.createElement("div");
      divDate.classList.add('divDate')

      const divDateTime = document.createElement("div");
      divDateTime.classList.add('divDateTime')

      const divTime = document.createElement("div");
      divTime.classList.add('divTime')

      const divNumber = document.createElement("div");
      divNumber.classList.add('divNumber');

      const formatType = format;
      const inputFieldElement = document.createElement("div");
      inputFieldElement.classList.add("kintoneplugin-input-outer");
      inputFieldElement.innerHTML = `
                    <div style="display: flex; justify-content: space-between;">
                    <b>${fieldName} (Start)</b>
                    <b>${fieldName} (End)</b>
                    </div>
                    </div>
                    <input class="kintoneplugin-input-text" type="${fieldType}" id="${fieldName}Start"> ~
                    <input class="kintoneplugin-input-text" type="${fieldType}" id="${fieldName}End">
                `;
      // Adjust the container based on the fieldType
      const container = fieldType === "number" ? divNumber :
        fieldType === "date" ? divDate :
          fieldType === "datetime-local" ? divDateTime :
            fieldType === "time" ? divTime :
              null; // Add a null check or specify a default container

      if (container) {
        container.appendChild(inputFieldElement);
        bodyContent.appendChild(container)
      }
    }

    function addMultiSelectDropdown(fieldName, options, fieldtype) {
      const divMultiSelect = document.createElement("div");
      divMultiSelect.classList.add('divMultiSelect')
      const dropdownElement = document.createElement("div");
      dropdownElement.style.width = "150px";
      const dropdownName = document.createElement("div");
      dropdownElement.classList.add("kintoneplugin-dropdown-list");
      if (fieldtype === "STATUS") {
        Object.values(options).forEach((value) => {
          const dropdownItem = document.createElement("div");
          dropdownItem.classList.add(`kintoneplugin-dropdown-list-item`);
          dropdownItem.innerHTML = `
                      <span class="kintoneplugin-dropdown-list-item-name" id="${value.name}">${value.name}</span>
                  `;
          dropdownElement.appendChild(dropdownItem);
        });
      }
      else {
        Object.values(options).forEach((value) => {
          const dropdownItem = document.createElement("div");
          dropdownItem.classList.add("kintoneplugin-dropdown-list-item");
          dropdownItem.innerHTML = `
                      <span class="kintoneplugin-dropdown-list-item-name" id="${value.label}">${value.label}</span>
                  `;
          dropdownElement.appendChild(dropdownItem);
        });
      }

      dropdownName.innerHTML = `<b>${fieldName}</b><br>`;
      divMultiSelect.appendChild(dropdownName);
      divMultiSelect.appendChild(dropdownElement);
      bodyContent.appendChild(divMultiSelect)
    }

    function addSelectDropdown(fieldName, options) {

      const divMultiSelectDropdown = document.createElement("div");
      divMultiSelectDropdown.classList.add('divMultiSelectDropdown')
      const dropdownElement = document.createElement("div");
      dropdownElement.style.width = "150px";
      dropdownElement.innerHTML = `<b>${fieldName}</b><br>`;
      let optionsHTML = '';
      Object.values(options).forEach((value) => {
        optionsHTML += `<option value="${value.label}">${value.label}</option>`;
      });
      const dropdownItem = document.createElement("div");
      dropdownItem.innerHTML = `
        <div class="kintoneplugin-select-outer">
          <div class="kintoneplugin-select">
            <select>
              <option value="-----">-----</option>
              ${optionsHTML}
            </select>
          </div>
        </div>
      `;
      dropdownElement.appendChild(dropdownItem);
      divMultiSelectDropdown.appendChild(dropdownElement);
      bodyContent.appendChild(divMultiSelectDropdown)

    }

    function addSelectStatusDropdown(fieldName, options) {
      const divMultiSelectStatusDropdown = document.createElement("div");
      divMultiSelectStatusDropdown.classList.add('divMultiSelectStatusDropdown')
      const dropdownElement = document.createElement("div");
      dropdownElement.style.width = "150px";
      dropdownElement.innerHTML = `<b>${fieldName}</b><br>`;
      let optionsHTML = '';
      Object.values(options).forEach((value) => {
        optionsHTML += `<option value="${value.name}">${value.name}</option>`;
      });
      const dropdownItem = document.createElement("div");
      dropdownItem.innerHTML = `
        <div class="kintoneplugin-select-outer">
          <div class="kintoneplugin-select">
            <select>
              <option value="-----">-----</option>
              ${optionsHTML}
            </select>
          </div>
        </div>
      `;
      dropdownElement.appendChild(dropdownItem);
      divMultiSelectStatusDropdown.appendChild(dropdownElement);

      bodyContent.appendChild(divMultiSelectStatusDropdown)

    }

    function addCheckboxSearch(fieldName, options) {
      const divCheckbox = document.createElement("div");
      divCheckbox.classList.add('divCheckbox')
      const checkboxElement = document.createElement("div");
      checkboxElement.style.width = "150px";
      checkboxElement.innerHTML = `<b>${fieldName}</b><br>`;
      let optionsHTML = '';
      Object.values(options).forEach((value) => {
        const checkboxItem = document.createElement("div");
        checkboxItem.innerHTML = `
            <div class="kintoneplugin-input-checkbox"><span class="kintoneplugin-input-checkbox-item"><input type="checkbox" name="checkbox" value="${value.value}" id="checkbox-${value.index}"><label for="checkbox-${value.index}">${value.label}</label></span></div>
        `;
        checkboxElement.appendChild(checkboxItem);
      });
      divCheckbox.appendChild(checkboxElement);
      bodyContent.appendChild(divCheckbox);
    }

    function addRadioSearch(fieldName, options) {
      const divRadio = document.createElement("div");
      divRadio.classList.add('divRadio')
      const radioElement = document.createElement("div");
      radioElement.style.width = "150px";
      radioElement.innerHTML = `<b>${fieldName}</b><br>`;
      let optionsHTML = '';
      Object.values(options).forEach((value) => {
        const radioItem = document.createElement("div");
        radioItem.innerHTML = `
            <div class="kintoneplugin-input-radio"><span class="kintoneplugin-input-radio-item"><input type="radio" name="radio" value="${value.value}" id="radio-${value.index}"><label for="radio-${value.index}">${value.label}</label></span></div>
        `;
        radioElement.appendChild(radioItem);
      });
      divRadio.appendChild(radioElement);

      bodyContent.appendChild(divRadio)

    }

    // Append the "Search" and "Reset" and containerRadio to containerbutton
    radioSearchReset.appendChild(containerRadio);
    radioSearchReset.appendChild(searchButton);
    radioSearchReset.appendChild(resetButton);

    // Append the form to the header space
    space.appendChild(formElement);

    // -----------------------------------------------------------------Function---------------------------------------------------------------------------------
    let allValues = { multiSelect: [] };


    function toggleButton() {
      if (buttonToggle.innerText === "Show") {
        buttonToggle.innerText = "Hide";
      } else {
        buttonToggle.innerText = "Show";
      }
    }
    function showForm() {
      const contentHeight = formElement.scrollHeight;
      formElement.style.height = contentHeight + "px";
      toggleButton();
    }

    function hideForm() {
      formElement.style.height = "80px";
      toggleButton();
    }

    buttonToggle.addEventListener("click", function () {
      if (
        formElement.style.height === "80px" ||
        formElement.style.height === ""
      ) {
        showForm();
      } else {
        hideForm();
      }
    });

    if (json.initial_display === "yes") {
      showForm();
    }
    else {
      hideForm();
    }

    radioInput1.addEventListener("click", function () {
      if (radioInput1.checked) {
        allValues.logicalOperator = "And";
      }
      radioInput2.checked = false;
    });

    radioInput2.addEventListener("click", function () {
      if (radioInput2.checked) {
        allValues.logicalOperator = "Or";
      }
      radioInput1.checked = false;
    });

    const SearchButton = document.getElementById("searchButton");
    const And = document.getElementById("radio-0");
    const Or = document.getElementById("radio-1");
    const multiSelectDropdownItems = document.querySelectorAll(".kintoneplugin-dropdown-list-item span");

    multiSelectDropdownItems.forEach((dropdownItem) => {
      dropdownItem.addEventListener("click", function () {
        const selectedItem = this.textContent;
        const itemIndex = allValues.multiSelect.indexOf(selectedItem);

        // Toggle the selection based on item existence in the array
        if (itemIndex !== -1) {
          // Item is already in the array, so remove it
          allValues.multiSelect.splice(itemIndex, 1);
        } else {
          // Item is not in the array, so add it
          allValues.multiSelect.push(selectedItem);
        }
        // Toggle the class on the parentDiv element
        const parentDiv = this.closest(".kintoneplugin-dropdown-list-item");
        if (parentDiv) {
          parentDiv.classList.toggle("kintoneplugin-dropdown-list-item-selected");
        }
      });
    });

    SearchButton.addEventListener("click", function (e) {
      try {
        hideForm();
        showSpinner();
        let queryStrings = [];
        let singleLineMulti;
        const search_condition = {};
        for (let i = 0; i < fieldCodes.length; i++) {
          if (fieldCodes[i] === "MultiFieldText") {
            singleLineMulti = document.getElementById("singleLineText-" + fielMultiplefield[i].join('-'));
            if (singleLineMulti.value) {
              search_condition[fielMultiplefield[i].join('-')] = singleLineMulti.value;
              // remove join('-') to search with each field with or on the same value
              let searchString = '';
              if (Array.isArray(fielMultiplefield[i]) && fielMultiplefield[i].length > 0) {
                if (fieldPatail[i] === "yes" && fieldExact[i] === "no") {
                  searchString = '(' + fielMultiplefield[i].map(code => `${code} like "${search_condition[fielMultiplefield[i].join('-')]}"`).join(' or ') + ')';
                }
                else if (fieldPatail[i] === "no" && fieldExact[i] === "yes") {
                  searchString = '(' + fieldLabels[i].map(code => `${code} in "${search_condition[fielMultiplefield[i].join('-')]}"`).join(' and ') + ')';
                }
              }
              queryStrings.push(searchString);
            }
          }
          else if (fieldCodes[i] === "SINGLE_LINE_TEXT") {
            singleLineMulti = document.getElementById("singleLineText-" + fieldLabels[i]);
            if (singleLineMulti.value) {
              search_condition[fieldLabels[i]] = singleLineMulti.value;
              // remove join('-') to search with each field with or on the same value
              let searchString = '';
              // if (Array.isArray(fieldLabels[i]) && fieldLabels[i].length > 0) {
              if (fieldPatail[i] === "yes" && fieldExact[i] === "no") {
                searchString = `(${fieldLabels[i]} like "${search_condition[fieldLabels[i]]}%")`
              }
              else if (fieldPatail[i] === "no" && fieldExact[i] === "yes") {
                searchString = `(${fieldLabels[i]} in "${search_condition[fieldLabels[i]]}")`
              }

              queryStrings.push(searchString);
            }
          }
          else if (fieldCodes[i] === "NUMBER" || fieldCodes[i] === "DATE" || fieldCodes[i] === "DATETIME" || fieldCodes[i] === "TIME" || fieldCodes[i] === "CREATED_TIME" || fieldCodes[i] === "RECORD_NUMBER" || fieldCodes[i] === "UPDATED_TIME" || fieldCodes[i] === "CALC") {
            let numberfieldStart = document.getElementById(`${fieldLabels[i]}Start`);
            let numberfieldEnd = document.getElementById(`${fieldLabels[i]}End`);
            if (numberfieldStart.value !== "" && numberfieldEnd.value !== "") {
              if (numberfieldStart.value > numberfieldEnd.value) {
                throw (`Start value of ${fieldLabels[i]} must be less than End value`);
              }
              else {
                search_condition[fieldLabels[i] + "Start"] = numberfieldStart.value;
                search_condition[fieldLabels[i] + "End"] = numberfieldEnd.value;
                queryStrings.push(`(${fieldLabels[i]} >= "${search_condition[fieldLabels[i] + "Start"]}" and ${fieldLabels[i]} <= "${search_condition[fieldLabels[i] + "End"]}")`);
              }
            }
            else if (numberfieldStart.value !== "" && numberfieldEnd.value === "") {
              search_condition[fieldLabels[i] + "Start"] = numberfieldStart.value;
              queryStrings.push(`(${fieldLabels[i]} >= "${search_condition[fieldLabels[i] + "Start"]}")`);
            }
            else if (numberfieldStart.value === "" && numberfieldEnd.value !== "") {
              search_condition[fieldLabels[i] + "End"] = numberfieldEnd.value;
              queryStrings.push(`(${fieldLabels[i]} <= "${search_condition[fieldLabels[i] + "End"]}")`);
            }

          }
          else if (fieldCodes[i] === "MULTI_SELECT" || fieldCodes[i] === "DROP_DOWN" || fieldCodes[i] === "CHECK_BOX" || fieldCodes[i] === "RADIO_BUTTON" || fieldCodes[i] === "STATUS") {
            let multiSelectDropdown = document.querySelectorAll(".kintoneplugin-dropdown-list-item-selected");
            let multiSelectDropdownArray = Array.from(multiSelectDropdown);
            let multiSelectDropdownArrayValue = multiSelectDropdownArray.map((item) => item.textContent);

            if (multiSelectDropdownArrayValue.length > 0) {
              if (fieldCodes[i] === "STATUS") {
                let options = status.states;
                let optionArray = Object.values(options);
                let optionArrayValue = optionArray.map((item) => item.name);

                let selectedValues = multiSelectDropdownArrayValue.filter((value) =>
                  optionArrayValue.some((optionValue) => {
                    const comparison = optionValue.toLowerCase() === value.trim().replace(/\s+/g, ' ').toLowerCase();
                    return comparison;
                  })
                );

                let cleanedArray = selectedValues.map(str => str.trim().replace(/\s+/g, ' '));
                search_condition[fieldLabels[i]] = selectedValues;
                queryStrings.push(`(${fieldLabels[i]} in ("${cleanedArray.join('","')}"))`);
              } else {
                let options = fields.properties[fieldLabels[i]].options;
                let optionArray = Object.values(options);
                let optionArrayValue = optionArray.map((item) => item.label);

                let selectedValues = multiSelectDropdownArrayValue.filter((value) =>
                  optionArrayValue.some((optionValue) => {
                    const comparison = optionValue.toLowerCase() === value.trim().replace(/\s+/g, ' ').toLowerCase();
                    return comparison;
                  })
                );

                let cleanedArray = selectedValues.map(str => str.trim().replace(/\s+/g, ' '));

                search_condition[fieldLabels[i]] = selectedValues;
                queryStrings.push(`(${fieldLabels[i]} in ("${cleanedArray.join('","')}"))`);
              }
            }
          }
        }


        let searchChoice = "and"; // Default to "AND"
        if (And.checked == true) {
          search_condition.search_choice = And.value;
          Or.checked = false;
          searchChoice = "and";
        }
        if (Or.checked == true) {
          search_condition.search_choice = Or.value;
          And.checked = false;
          searchChoice = "or";
        }
        const combinedQueryString = queryStrings.filter(Boolean).join(` ${searchChoice} `);
        // Save the search condition to the local storage
        sessionStorage.setItem("search_condition", JSON.stringify(search_condition));
        console.log(combinedQueryString);
        //check if link have view
        if (window.location.href.includes("?view=")) {
          // Ask for confirmation
          var proceed = confirm("Do you want to search with value in the box? You will lose the current view");
          // Check if the user wants to proceed
          if (proceed) {
            // Redirect to the URL
            window.location.href = '../../' + "k" + "/" + kintone.app.getId() + "/" + "?query=" + combinedQueryString;
          }
          else {
            // alert("You have canceled the search");
            throw ("You have canceled the search");
          }
        }
        else {
          // Redirect to the URL
          window.location.href = '../../' + "k" + "/" + kintone.app.getId() + "/" + "?query=" + combinedQueryString;
        }

      } catch (error) {
        alert(error);
        hideSpinner();
        return;
      }
    });
  })
})(jQuery, kintone.$PLUGIN_ID);