jQuery.noConflict();

(function ($, PLUGIN_ID) {

    "use strict";

    let json = {
        "initial_display": "yes",
        "field": {
            "sample_multifield": {
                "type": "MultiFieldText",
                "code": "sample_multifield",
                "field": ["name", "surname", "middlename"],
                "label": "Sample multifield",
                "patial": "yes",
                "exact": "no",
                "newline": "yes",
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
                "newline": "yes",
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
                "format": "DATE",

            }
        }
    };

    // Extract field definitions
    const field = Object.values(json.field);
    const space = kintone.app.getHeaderSpaceElement();

    // create elements for the form
    function createElement(type, classes = [], props = {}) {
        const elem = document.createElement(type);
        classes.forEach(cls => elem.classList.add(cls));
        Object.entries(props).forEach(([key, value]) => {
            elem[key] = value;
        });
        return elem;
    }
    const buttonToggle = createElement("button", ["buttonToggle"], {
        className: "kintoneplugin-button-normal",
        id: "buttonToggle",
        innerText: "Show",
    });
    const formElement = createElement("div", ["form-container"]);
    const buttonHead = createElement("div", ["buttonHead"]);
    const bodyContent = createElement("div", ["bodyContent"]);
    const footerContent = createElement("div", ["footerContent"]);
    const searchButton = createElement("button", [], {
        className: "kintoneplugin-button-normal",
        id: "searchButton",
        innerText: "Search",
    });
    const resetButton = createElement("button", [], {
        className: "kintoneplugin-button-dialog-cancel",
        id: "resetButton",
        innerText: "Reset",
    });
    const containerRadio = createElement("div", ["kintoneplugin-input-radio"], {
        id: "containerRadio",
    });
    const radioItem1 = createElement("span", ["kintoneplugin-input-radio-item"], {
        style: "margin-left: 12px",
    });
    const radioItem2 = createElement("span", ["kintoneplugin-input-radio-item"]);
    const radioInput1 = createElement("input", [], {
        type: "radio",
        name: "logicalOperatorRadio",
        value: "And",
        id: "radio-0",
        checked: true,
    });
    const radioInput2 = createElement("input", [], {
        type: "radio",
        name: "logicalOperatorRadioF",
        value: "Or",
        id: "radio-1",
    });
    const label1 = createElement("label", [], {
        htmlFor: "radio-0",
        textContent: "And",
    });
    const label2 = createElement("label", [], {
        htmlFor: "radio-1",
        textContent: "Or",
    });
    const radioSearchReset = createElement("div", ["radioSearchReset"]);
    const radioElements = [radioItem1, radioItem2];
    const labels = [label1, label2];
    const radioInputs = [radioInput1, radioInput2];
    radioElements.forEach((radio, index) => {
        radio.appendChild(radioInputs[index]);
        radio.appendChild(labels[index]);
    });
    containerRadio.append(...radioElements);
    radioSearchReset.append(containerRadio, searchButton, resetButton);
    formElement.append(buttonHead, bodyContent, footerContent);
    buttonHead.appendChild(buttonToggle);
    footerContent.appendChild(radioSearchReset);
    space.appendChild(formElement);

    // Function to show the spinner
    function showSpinner() {
        try {
            const spinDivExists = $('.kintone-spinner').length > 0;

            if (!spinDivExists) {
                const spin_div = $('<div id="kintone-spin" class="kintone-spinner"></div>').css({
                    'position': 'fixed',
                    'top': '50%',
                    'left': '50%',
                    'z-index': '510',
                    'background-color': '#fff',
                    'padding': '26px',
                    'border-radius': '4px'
                });

                const spin_bg_div = $('<div id="kintone-spin-bg" class="kintone-spinner"></div>').css({
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

                $(document.body).append(spin_div, spin_bg_div);

                const opts = { 'color': '#000' };
                new Spinner(opts).spin(document.getElementById('kintone-spin'));
            }

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

    let checkJson = "";
    kintone.events.on("app.record.index.show", async function (e) {

        // Check checkJson is empty or not
        if (checkJson) return;
        // Get the field information
        let fields = await kintone.api(kintone.api.url("/k/v1/app/form/fields.json", true), "GET", { app: kintone.app.getId() });
        // Get the status information
        let statuses = await kintone.api(kintone.api.url("/k/v1/app/status.json", true), "GET", { app: kintone.app.getId() });
        // Get the json from the config
        checkJson = field;
        // Get the json from the config
        let fieldCodes = [];
        let fieldLabels = [];
        let fielMultiplefield = [];
        let fieldPatail = [];
        let fieldExact = [];
        let fieldNewline = [];
        // Loop through the fields
        Object.keys(field).forEach(key => {
            fieldCodes.push(field[key].type);
            fieldLabels.push(field[key].code);
            fielMultiplefield.push(field[key].field);
            fieldPatail.push(field[key].patial);
            fieldExact.push(field[key].exact);
            fieldNewline.push(field[key].newline);
        });
        // Loop through the fieldCodes
        for (let i = 0; i < fieldCodes.length; i++) {
            // Check the field type and create the corresponding input field
            switch (fieldCodes[i]) {
                // Add a case for each field type
                case "MultiFieldText":
                    addSingleLineText(fieldLabels[i], fielMultiplefield[i].join('-'));
                    break;
                case "SINGLE_LINE_TEXT":
                    addSingleLineText(fieldLabels[i], fieldLabels[i]);
                    break;
                case "NUMBER":
                case "DATE":
                case "DATETIME":
                case "TIME":
                case "RECORD_NUMBER":
                case "CREATED_TIME":
                case "UPDATED_TIME":
                case "CALC":
                    addRangeInputField(fieldLabels[i], fieldCodes[i] === "NUMBER" || fieldCodes[i] === "RECORD_NUMBER" || fieldCodes[i] === "CALC" ? "number" : fieldCodes[i] === "time" ? "time" : fieldCodes[i] === "DATE" ? "date" : "datetime-local");
                    break;
                case "CHECK_BOX":
                case "MULTI_SELECT":
                case "DROP_DOWN":
                case "RADIO_BUTTON":
                case "STATUS":
                    let options = fields.properties[fieldLabels[i]].options;
                    let status = statuses.states;
                    addMultiSelectDropdown(fieldLabels[i], fieldCodes[i] === "STATUS" ? status : options, fieldCodes[i]);
                    break;
            }
            // Add a line break if fieldNewline is "yes"
            if (fieldNewline[i] === "yes") {
                // Create a line break element
                const lineBreak = document.createElement("br");
                // Append the line break element to the bodyContent
                bodyContent.appendChild(lineBreak);
            }
        }
        // Append the "Search" and "Reset" and containerRadio to containerbutton
        radioSearchReset.style.display = "flex";
        function createElementWithClass(tagName, className) {
            const element = document.createElement(tagName);
            element.classList.add(className);
            return element;
        }

        function addSingleLineText(fieldLabel, fieldName) {
            const divName = createElementWithClass('div', 'divName');
            const inputElement = createElementWithClass('div', 'kintoneplugin-input-outer');
            inputElement.innerHTML = `<b>${fieldLabel}</b><br><input class="kintoneplugin-input-text" type="text" id="singleLineText-${fieldName}">`;
            divName.appendChild(inputElement);
            bodyContent.appendChild(divName);
        }

        function addRangeInputField(fieldName, fieldType) {
            const fieldTypeToClass = {
                number: 'divNumber',
                date: 'divDate',
                'datetime-local': 'divDateTime',
                time: 'divTime'
            };

            const container = createElementWithClass('div', fieldTypeToClass[fieldType]);
            const inputFieldElement = createElementWithClass('div', 'kintoneplugin-input-outer');
            inputFieldElement.innerHTML = `<div style="display: flex; justify-content: space-between;"><b>${fieldName} (Start)</b><b>${fieldName} (End)</b></div><input class="kintoneplugin-input-text" type="${fieldType}" id="${fieldName}Start"> ~ <input class="kintoneplugin-input-text" type="${fieldType}" id="${fieldName}End">`;

            if (container) {
                container.appendChild(inputFieldElement);
                bodyContent.appendChild(container);
            }
        }
        //Multi select dropdown
        function addMultiSelectDropdown(fieldName, options, fieldtype) {
            const divMultiSelect = document.createElement("div");
            divMultiSelect.classList.add('divMultiSelect')
            const dropdownElement = document.createElement("div");
            dropdownElement.style.width = "150px";
            const dropdownName = document.createElement("div");
            dropdownElement.classList.add("kintoneplugin-dropdown-list");
            // Check if the field is a status field
            if (fieldtype === "STATUS") {
                // Loop through the options
                Object.values(options).forEach((value) => {
                    // Create a dropdown item
                    const dropdownItem = document.createElement("div");
                    dropdownItem.classList.add(`kintoneplugin-dropdown-list-item`);
                    dropdownItem.innerHTML = `
                  <span class="kintoneplugin-dropdown-list-item-name" id="${value.name}">${value.name}</span>
              `;
                    dropdownElement.appendChild(dropdownItem);
                });
            }
            else {
                // Loop through the options
                Object.values(options).forEach((value) => {
                    // Create a dropdown item
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
        // -----------------------------------------------------------------Function---------------------------------------------------------------------------------
        let allValues = { multiSelect: [] };

        function toggleButton() {
            buttonToggle.innerText = buttonToggle.innerText === 'Show' ? 'Hide' : 'Show';
        }

        function adjustFormHeight(height) {
            formElement.style.height = height + 'px';
            toggleButton();
        }

        function showForm() {
            adjustFormHeight(formElement.scrollHeight);
        }

        function hideForm() {
            adjustFormHeight(80);
        }

        buttonToggle.addEventListener('click', function () {
            formElement.style.height === '80px' || formElement.style.height === ''
                ? showForm()
                : hideForm();
        });

        if (json.initial_display === 'yes') {
            showForm();
        } else {
            hideForm();
        }

        function handleLogicalOperatorChange(operatorValue, otherRadio) {
            if (operatorValue.checked) {
                allValues.logicalOperator = operatorValue.value;
            }
            otherRadio.checked = false;
        }

        radioInput1.addEventListener('click', function () {
            handleLogicalOperatorChange(radioInput1, radioInput2);
        });

        radioInput2.addEventListener('click', function () {
            handleLogicalOperatorChange(radioInput2, radioInput1);
        });

        const SearchButton = document.getElementById("searchButton");
        const And = document.getElementById("radio-0");
        const Or = document.getElementById("radio-1");
        const multiSelectDropdownItems = document.querySelectorAll(".kintoneplugin-dropdown-list-item span");

        // Loop through each dropdown item
        multiSelectDropdownItems.forEach((dropdownItem) => {
            // Add a click event listener to each dropdown item
            dropdownItem.addEventListener("click", function () {
                // Get the text content of the clicked dropdown item
                const selectedItem = this.textContent;
                // Find the index of the selected item within the 'allValues.multiSelect' array
                const itemIndex = allValues.multiSelect.indexOf(selectedItem);
                // Toggle the selection: If the item is already selected (exists in the 'allValues.multiSelect' array), remove it. Otherwise, add it to the array.
                itemIndex !== -1 ? allValues.multiSelect.splice(itemIndex, 1) : allValues.multiSelect.push(selectedItem);
                // Find the parent div of the clicked dropdown item
                const parentDiv = this.closest(".kintoneplugin-dropdown-list-item");
                // Check if the parent div exists If it exists, toggle the class 'kintoneplugin-dropdown-list-item-selected' on the parent div (adds the class if it doesn't exist, removes if it exists).
                parentDiv && parentDiv.classList.toggle("kintoneplugin-dropdown-list-item-selected");
            });
        });

        SearchButton.addEventListener("click", function (e) {
            try {
                // hide Form
                hideForm();
                // Show spinner
                showSpinner();
                // define search condition
                let queryStrings = [];
                const search_condition = {};
                // Loop through the fields
                for (let i = 0; i < fieldCodes.length; i++) {
                    // Get the field code and label
                    const code = fieldCodes[i];
                    const label = fieldLabels[i];
                    // Check the field type
                    if (code === 'SINGLE_LINE_TEXT' || code === 'MultiFieldText') {
                        const singleLineMulti = document.getElementById(code === 'SINGLE_LINE_TEXT' ? `singleLineText-${label}` : `singleLineText-${fielMultiplefield[i].join('-')}`);
                        if (singleLineMulti.value) {
                            search_condition[label] = singleLineMulti.value;
                            // Create search string based on field type
                            const searchString = fieldPatail[i] === 'yes' ? `(${label} like "${search_condition[label]}")` : `(${label} in "${search_condition[label]}")`;
                            queryStrings.push(searchString);
                        }
                    }
                    else if (code === "NUMBER" || code === "DATE" || code === "DATETIME" || code === "TIME" || code === "CREATED_TIME" || code === "RECORD_NUMBER" || code === "UPDATED_TIME" || code === "CALC") {
                        // Get the value of the field
                        let numberfieldStart = document.getElementById(`${label}Start`);
                        let numberfieldEnd = document.getElementById(`${label}End`);
                        // Check if the value is not empty
                        if (numberfieldStart.value !== "" && numberfieldEnd.value !== "") {
                            // Check if the start value is greater than the end value
                            if (numberfieldStart.value > numberfieldEnd.value) {
                                // alert(`Start value of ${label} must be less than End value`);
                                throw (`Start value of ${label} must be less than End value`);
                            }
                            else {
                                // Save the value to the search condition
                                search_condition[label + "Start"] = numberfieldStart.value;
                                search_condition[label + "End"] = numberfieldEnd.value;
                                // push search string to query string
                                queryStrings.push(`(${label} >= "${search_condition[label + "Start"]}" and ${label} <= "${search_condition[label + "End"]}")`);
                            }
                        }
                        // Check if the start value is not empty and the end value is empty
                        else if (numberfieldStart.value !== "" && numberfieldEnd.value === "") {
                            // Save the value to the search condition
                            search_condition[label + "Start"] = numberfieldStart.value;
                            // push search string to query string
                            queryStrings.push(`(${label} >= "${search_condition[label + "Start"]}")`);
                        }
                        // Check if the start value is empty and the end value is not empty
                        else if (numberfieldStart.value === "" && numberfieldEnd.value !== "") {
                            // Save the value to the search condition
                            search_condition[label + "End"] = numberfieldEnd.value;
                            // push search string to query string
                            queryStrings.push(`(${label} <= "${search_condition[label + "End"]}")`);
                        }
                    }
                    else if (code === "MULTI_SELECT" || code === "DROP_DOWN" || code === "CHECK_BOX" || code === "RADIO_BUTTON" || code === "STATUS") {
                        // Get the value of the field
                        let multiSelectDropdown = document.querySelectorAll(".kintoneplugin-dropdown-list-item-selected");
                        let multiSelectDropdownArray = Array.from(multiSelectDropdown);
                        let multiSelectDropdownArrayValue = multiSelectDropdownArray.map((item) => item.textContent);
                        // Check if the value is not empty
                        if (multiSelectDropdownArrayValue.length > 0) {
                            // Check if the field is a status field
                            if (code === "STATUS") {
                                // Get the options of the status field
                                let options = status.states;
                                let optionArray = Object.values(options);
                                let optionArrayValue = optionArray.map((item) => item.name);
                                // Filter the selected values
                                let selectedValues = multiSelectDropdownArrayValue.filter((value) =>
                                    // Check if the selected value is in the options array
                                    optionArrayValue.some((optionValue) => {
                                        // Compare the selected value and the option value
                                        const comparison = optionValue.toLowerCase() === value.trim().replace(/\s+/g, ' ').toLowerCase();
                                        return comparison;
                                    })
                                );
                                // Clean the selected values
                                let cleanedArray = selectedValues.map(str => str.trim().replace(/\s+/g, ' '));
                                // Save the value to the search condition
                                search_condition[label] = selectedValues;
                                // push search string to query string
                                queryStrings.push(`(${label} in ("${cleanedArray.join('","')}"))`);
                            } else {
                                // Get the options of the field
                                let options = fields.properties[label].options;
                                let optionArray = Object.values(options);
                                let optionArrayValue = optionArray.map((item) => item.label);
                                // Filter the selected values
                                let selectedValues = multiSelectDropdownArrayValue.filter((value) =>
                                    // Check if the selected value is in the options array
                                    optionArrayValue.some((optionValue) => {
                                        // Compare the selected value and the option value
                                        const comparison = optionValue.toLowerCase() === value.trim().replace(/\s+/g, ' ').toLowerCase();
                                        return comparison;
                                    })
                                );
                                // Clean the selected values
                                let cleanedArray = selectedValues.map(str => str.trim().replace(/\s+/g, ' '));
                                // Save the value to the search condition
                                search_condition[label] = selectedValues;
                                // push search string to query string
                                queryStrings.push(`(${label} in ("${cleanedArray.join('","')}"))`);
                            }
                        }
                    }
                }
                // Check searchChoice is And or Or
                let searchChoice = And.checked ? (search_condition.search_choice = And.value, "and") :
                    Or.checked ? (search_condition.search_choice = Or.value, "or") : "and";
                // combine query string with search choice
                const combinedQueryString = queryStrings.filter(Boolean).join(` ${searchChoice} `);
                // Save the search condition to the local storage
                sessionStorage.setItem("search_condition", JSON.stringify(search_condition));
                // Redirect to the URL
                window.location.href = '../../' + "k" + "/" + kintone.app.getId() + "/" + "?query=" + combinedQueryString;
            } catch (error) {
                alert(error);
                hideSpinner();
                showForm();
                return;
            }
        });

        const ResetButton = document.getElementById("resetButton");
        ResetButton.addEventListener("click", function (e) {
            // Clear all the values
            allValues = { multiSelect: [] };
            // Clear all the input fields
            const inputFields = document.querySelectorAll(".kintoneplugin-input-text");
            inputFields.forEach((inputField) => {
                inputField.value = "";
            });
            // Clear all the dropdown items
            const dropdownItems = document.querySelectorAll(".kintoneplugin-dropdown-list-item-selected");
            dropdownItems.forEach((dropdownItem) => {
                dropdownItem.classList.remove("kintoneplugin-dropdown-list-item-selected");
            });
            // Clear the search condition in the local storage
            sessionStorage.removeItem("search_condition");
            // Redirect to the URL
            window.location.href = '../../' + "k" + "/" + kintone.app.getId() + "/";
        });
    });
})(jQuery, kintone.$PLUGIN_ID);