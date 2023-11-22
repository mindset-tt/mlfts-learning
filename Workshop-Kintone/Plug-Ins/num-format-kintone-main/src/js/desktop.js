jQuery.noConflict();

(function ($, PLUGIN_ID) {
    "use strict";
    let checkJson = "";
    kintone.events.on("app.record.index.show", async function (e) {
        // -------------------------------------------------------------------Create Element----------------------------------------------------------------------------------------
        let json = kintone.plugin.app.getConfig(PLUGIN_ID);

        const obj = JSON.parse(json.field)
        const field = Object.values(obj)
        const fields = {};

        for (let i = 0; i < field.length; i++) {
            let key = Object.keys(field[i])[0];
            fields[key] = field[i][key];
        }
        console.log(fields);
        const createElem = (type, classes = [], props = {}) => {
            const elem = document.createElement(type);
            classes.forEach((cls) => elem.classList.add(cls));
            Object.entries(props).forEach(([key, value]) => {
                elem[key] = value;
            });
            return elem;
        };

        const space = kintone.app.getHeaderSpaceElement();

        const buttonToggle = createElem("button", ["buttonToggle"], {
            className: "kintoneplugin-button-normal",
            id: "buttonToggle",
            innerText: "Show",
        });

        const formElement = createElem("div", ["form-container"]);
        const buttonHead = createElem("div", ["buttonHead"]);
        const bodyContent = createElem("div", ["bodyContent"]);
        const footerContent = createElem("div", ["footerContent"]);
        const searchButton = createElem("button", [], {
            className: "kintoneplugin-button-normal",
            id: "searchButton",
            innerText: "Search",
        });
        const resetButton = createElem("button", [], {
            className: "kintoneplugin-button-dialog-cancel",
            id: "resetButton",
            innerText: "Reset",
        });
        const containerRadio = createElem("div", ["kintoneplugin-input-radio"], {
            id: "containerRadio",
        });

        const radioItem1 = createElem("span", ["kintoneplugin-input-radio-item"], {
            style: "margin-left: 12px",
        });
        const radioItem2 = createElem("span", ["kintoneplugin-input-radio-item"]);

        const radioInput1 = createElem("input", [], {
            type: "radio",
            name: "logicalOperatorRadio",
            value: "And",
            id: "radio-0",
            checked: true,
        });
        const radioInput2 = createElem("input", [], {
            type: "radio",
            name: "logicalOperatorRadioF",
            value: "Or",
            id: "radio-1",
        });

        const label1 = createElem("label", [], {
            htmlFor: "radio-0",
            textContent: "And",
        });
        const label2 = createElem("label", [], {
            htmlFor: "radio-1",
            textContent: "Or",
        });

        const radioSearchReset = createElem("div", ["radioSearchReset"]);
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
        // Check checkJson is empty or not
        if (checkJson) return;
        // Get the field information
        let fieldss = await kintone.api(kintone.api.url("/k/v1/app/form/fields.json", true), "GET", { app: kintone.app.getId() });
        // Get the status information
        let status = await kintone.api(kintone.api.url("/k/v1/app/status.json", true), "GET", { app: kintone.app.getId() });
        // Get the json from the config
        checkJson = fields;
        // Get the json from the config
        let fieldCodes = [];
        let fieldLabels = [];
        let fielMultiplefield = [];
        let fieldPatail = [];
        let fieldExact = [];
        let fieldNewline = [];
        // Loop through the fields
        Object.keys(fields).forEach(key => {
            fieldCodes.push(fields[key].type);
            fieldLabels.push(fields[key].code);
            fielMultiplefield.push(fields[key].field);
            fieldPatail.push(fields[key].patial);
            fieldExact.push(fields[key].exact);
            fieldNewline.push(fields[key].newline);
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
                    addRangeInputField(fieldLabels[i], "number");
                    break;
                case "DATE":
                    addRangeInputField(fieldLabels[i], "date");
                    break;
                case "DATETIME":
                    addRangeInputField(fieldLabels[i], "datetime-local");
                    break;
                case "TIME":
                    addRangeInputField(fieldLabels[i], "time");
                    break;
                case "MULTI_SELECT":
                case "DROP_DOWN":
                case "CHECK_BOX":
                case "RADIO_BUTTON":
                    let options = fieldss.properties[fieldLabels[i]].options;
                    addMultiSelectDropdown(fieldLabels[i], options);
                    break;
                case "CALC":
                case "RECORD_NUMBER":
                case "CREATED_TIME":
                case "UPDATED_TIME":
                    addRangeInputField(fieldLabels[i], fieldCodes[i] === "CALC" ? "number" : "datetime-local");
                    break;
                case "STATUS":
                    let statusOptions = status.states;
                    addMultiSelectDropdown(fieldLabels[i], statusOptions, fieldCodes[i]);
                    break;
                default:
                    // Handle any other cases or leave it empty if not required
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
        //Single line text field
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
        //Range input field
        function addRangeInputField(fieldName, fieldType) {
            const divDate = document.createElement("div");
            divDate.classList.add('divDate')

            const divDateTime = document.createElement("div");
            divDateTime.classList.add('divDateTime')

            const divTime = document.createElement("div");
            divTime.classList.add('divTime')

            const divNumber = document.createElement("div");
            divNumber.classList.add('divNumber');

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

            // Append the input field element to the container
            if (container) {
                container.appendChild(inputFieldElement);
                bodyContent.appendChild(container)
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
        console.log(json.initial_display);
        if (json.initial_display === "open") {
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
        // Get the saved search condition from the session storage
        const savedSearchCondition = sessionStorage.getItem('search_condition');
        if (savedSearchCondition) {
            const searchCondition = JSON.parse(savedSearchCondition);
            let singleLineMulti;
            for (let i = 0; i < fieldLabels.length; i++) {
                if (fieldCodes[i] === "MultiFieldText") {
                    singleLineMulti = $("#singleLineText-" + fielMultiplefield[i].join('-'));
                    if (searchCondition[fielMultiplefield[i].join('-')]) {
                        singleLineMulti.val(searchCondition[fielMultiplefield[i].join('-')]);
                    }
                } else if (fieldCodes[i] === "SINGLE_LINE_TEXT") {
                    singleLineMulti = $("#singleLineText-" + fieldLabels[i]);
                    if (searchCondition[fieldLabels[i]]) {
                        singleLineMulti.val(searchCondition[fieldLabels[i]]);
                    }
                } else if (fieldCodes[i] === "NUMBER" || fieldCodes[i] === "DATE" || fieldCodes[i] === "DATETIME" || fieldCodes[i] === "TIME" || fieldCodes[i] === "CREATED_TIME" || fieldCodes[i] === "RECORD_NUMBER" || fieldCodes[i] === "UPDATED_TIME" || fieldCodes[i] === "CALC") {
                    if (searchCondition[fieldLabels[i] + "Start"]) {
                        $(`#${fieldLabels[i]}Start`).val(searchCondition[fieldLabels[i] + "Start"]);
                    }
                    if (searchCondition[fieldLabels[i] + "End"]) {
                        $(`#${fieldLabels[i]}End`).val(searchCondition[fieldLabels[i] + "End"]);
                    }
                } else if (fieldCodes[i] === "MULTI_SELECT" || fieldCodes[i] === "DROP_DOWN" || fieldCodes[i] === "CHECK_BOX" || fieldCodes[i] === "RADIO_BUTTON" || fieldCodes[i] === "STATUS") {
                    console.log(searchCondition[fieldLabels[i]]);
                    if (searchCondition[fieldLabels[i]]) {
                        if (fieldLabels[i] === "Status") {
                            const options = status.states;
                            const optionArray = Object.values(options);
                            const optionArrayValue = optionArray.map((item) => item.name);
                            const selectedValues = searchCondition[fieldLabels[i]].filter((value) =>
                                optionArrayValue.some((optionValue) =>
                                    optionValue.toLowerCase() === value.trim().replace(/\s+/g, ' ').toLowerCase()
                                )
                            );
                            const cleanedArray = selectedValues.map(str => str.trim().replace(/\s+/g, ' '));
                            $(`#${fieldLabels[i]}`).val(cleanedArray);
                            if (selectedValues.length > 0) {
                                // Toggle the class on the parentDiv element for each selected value with jQuery
                                selectedValues.forEach((value) => {
                                    const parentDiv = $(`.kintoneplugin-dropdown-list-item:contains(${value})`);
                                    parentDiv.addClass("kintoneplugin-dropdown-list-item-selected");
                                });
                            }
                        }
                        else {
                            const options = fieldss.properties[fieldLabels[i]].options;
                            const optionArray = Object.values(options);
                            const optionArrayValue = optionArray.map((item) => item.label);
                            const selectedValues = searchCondition[fieldLabels[i]].filter((value) =>
                                optionArrayValue.some((optionValue) =>
                                    optionValue.toLowerCase() === value.trim().replace(/\s+/g, ' ').toLowerCase()
                                )
                            );
                            const cleanedArray = selectedValues.map(str => str.trim().replace(/\s+/g, ' '));
                            $(`#${fieldLabels[i]}`).val(cleanedArray);
                            if (selectedValues.length > 0) {
                                // Toggle the class on the parentDiv element for each selected value with jQuery
                                selectedValues.forEach((value) => {
                                    const parentDiv = $(`.kintoneplugin-dropdown-list-item:contains(${value})`);
                                    parentDiv.addClass("kintoneplugin-dropdown-list-item-selected");
                                });
                            }
                        }
                    }
                }
                if (searchCondition.search_choice === "And") {
                    And.checked = true;
                    Or.checked = false;
                }
                if (searchCondition.search_choice === "Or") {
                    Or.checked = true;
                    And.checked = false;
                }
            }
        }
        // loop through the dropdown items
        multiSelectDropdownItems.forEach((dropdownItem) => {
            // Add a click event listener to each dropdown item
            dropdownItem.addEventListener("click", function () {
                // Get the selected item
                const selectedItem = this.textContent;
                // Get the index of the selected item in the array
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
                // Check if the parentDiv exists
                if (parentDiv) {
                    // Toggle the class
                    parentDiv.classList.toggle("kintoneplugin-dropdown-list-item-selected");
                }
            });
        });

        $("#searchButton").on("click", function (e) {
            try {
                hideForm();
                showSpinner();
                let queryStrings = [];
                let singleLineMulti;
                let singleLine;
                const search_condition = {};

                for (let i = 0; i < fieldCodes.length; i++) {
                    if (fieldCodes[i] === "MultiFieldText") {
                        singleLineMulti = $("#singleLineText-" + fielMultiplefield[i].join('-'));
                        search_condition[fieldLabels[i]] = singleLineMulti.val();
                        if (singleLineMulti.val()) {
                            search_condition[fielMultiplefield[i].join('-')] = singleLineMulti.val();
                            let searchString = '';
                            if (Array.isArray(fielMultiplefield[i]) && fielMultiplefield[i].length > 0) {
                                if (fieldPatail[i] === "yes") {
                                    searchString = '(' + fielMultiplefield[i].map(code => `${code} like "${encodeURIComponent(search_condition[fielMultiplefield[i].join('-')])}"`).join(' or ') + ')';
                                } else {
                                    searchString = '(' + fielMultiplefield[i].map(code => `${code} = "${encodeURIComponent(search_condition[fielMultiplefield[i].join('-')])}"`).join(' or ') + ')';
                                }
                            }
                            queryStrings.push(searchString);
                        }
                    } else if (fieldCodes[i] === "SINGLE_LINE_TEXT") {
                        singleLine = $("#singleLineText-" + fieldLabels[i]);
                        if (singleLine.val()) {
                            search_condition[fieldLabels[i]] = singleLine.val();
                            let searchString = '';
                            if (fieldPatail[i] === "yes") {
                                searchString = `(${fieldLabels[i]} like "${encodeURIComponent(search_condition[fieldLabels[i]])}")`;
                            } else {
                                searchString = `(${fieldLabels[i]} = "${encodeURIComponent(search_condition[fieldLabels[i]])}")`;
                            }
                            queryStrings.push(searchString);
                        }
                    } else if (fieldCodes[i] === "NUMBER" || fieldCodes[i] === "DATE" || fieldCodes[i] === "DATETIME" || fieldCodes[i] === "TIME" || fieldCodes[i] === "CREATED_TIME" || fieldCodes[i] === "RECORD_NUMBER" || fieldCodes[i] === "UPDATED_TIME" || fieldCodes[i] === "CALC") {
                        // Get the value of the field
                        let numberfieldStart = $(`#${fieldLabels[i]}Start`);
                        let numberfieldEnd = $(`#${fieldLabels[i]}End`);
                        // Check if the value is not empty
                        if (numberfieldStart.val() !== "" && numberfieldEnd.val() !== "") {
                            // Check if the start value is greater than the end value
                            if (numberfieldStart.val() > numberfieldEnd.val()) {
                                // alert(`Start value of ${fieldLabels[i]} must be less than End value`);
                                throw (`Start value of ${fieldLabels[i]} must be less than End value`);
                            }
                            else {
                                // Save the value to the search condition
                                search_condition[fieldLabels[i] + "Start"] = numberfieldStart.val();
                                search_condition[fieldLabels[i] + "End"] = numberfieldEnd.val();
                                // push search string to query string in jQuery
                                queryStrings.push(`(${fieldLabels[i]} >= "${search_condition[fieldLabels[i] + "Start"]}" and ${fieldLabels[i]} <= "${search_condition[fieldLabels[i] + "End"]}")`);
                            }
                        }

                        // Check if the start value is not empty and the end value is empty
                        else if (numberfieldStart.val() !== "" && numberfieldEnd.val() === "") {
                            // Save the value to the search condition
                            search_condition[fieldLabels[i] + "Start"] = numberfieldStart.val();
                            // push search string to query string in jQuery
                            queryStrings.push(`(${fieldLabels[i]} >= "${search_condition[fieldLabels[i] + "Start"]}")`);
                        }
                        // Check if the start value is empty and the end value is not empty
                        else if (numberfieldStart.val() === "" && numberfieldEnd.val() !== "") {
                            // Save the value to the search condition
                            search_condition[fieldLabels[i] + "End"] = numberfieldEnd.val();
                            // push search string to query string in jQuery
                            queryStrings.push(`(${fieldLabels[i]} <= "${search_condition[fieldLabels[i] + "End"]}")`);
                        }

                    }
                    else if (fieldCodes[i] === "MULTI_SELECT" || fieldCodes[i] === "DROP_DOWN" || fieldCodes[i] === "CHECK_BOX" || fieldCodes[i] === "RADIO_BUTTON" || fieldCodes[i] === "STATUS") {
                        // Get the value of the field
                        const multiSelectDropdown = $(".kintoneplugin-dropdown-list-item-selected");
                        const multiSelectDropdownArrayValue = multiSelectDropdown.map(function () {
                            return $(this).text().trim();
                        }).get();

                        if (multiSelectDropdownArrayValue.length > 0) {
                            if (fieldCodes[i] === "STATUS") {
                                const options = status.states;
                                const optionArray = Object.values(options);
                                const optionArrayValue = optionArray.map((item) => item.name);

                                const selectedValues = multiSelectDropdownArrayValue.filter((value) =>
                                    optionArrayValue.some((optionValue) =>
                                        optionValue.toLowerCase() === value.trim().replace(/\s+/g, ' ').toLowerCase()
                                    )
                                );
                                const cleanedArray = selectedValues.map(str => encodeURIComponent(str.trim().replace(/\s+/g, ' ')));
                                search_condition[fieldLabels[i]] = selectedValues;
                                if (selectedValues.length > 0) {
                                    queryStrings.push(`(${fieldLabels[i]} in ("${cleanedArray.join('","')}"))`);
                                }
                            } else {
                                const options = fieldss.properties[fieldLabels[i]].options;
                                const optionArray = Object.values(options);
                                const optionArrayValue = optionArray.map((item) => item.label);

                                const selectedValues = multiSelectDropdownArrayValue.filter((value) =>
                                    optionArrayValue.some((optionValue) =>
                                        optionValue.toLowerCase() === value.trim().replace(/\s+/g, ' ').toLowerCase()
                                    )
                                );
                                const cleanedArray = selectedValues.map(str => encodeURIComponent(str.trim().replace(/\s+/g, ' ')));
                                search_condition[fieldLabels[i]] = selectedValues;
                                if (selectedValues.length > 0) {
                                    queryStrings.push(`(${fieldLabels[i]} in ("${cleanedArray.join('","')}"))`);
                                }
                            }
                        }
                    }
                }

                let searchChoice = "and"; // Default to "AND"
                if ($("#radio-0").is(":checked")) {
                    search_condition.search_choice = $("#radio-0").val();
                    $("#radio-1").prop("checked", false);
                    searchChoice = "and";
                }
                if ($("#radio-1").is(":checked")) {
                    search_condition.search_choice = $("#radio-1").val();
                    $("#radio-0").prop("checked", false);
                    searchChoice = "or";
                }
                search_condition.search_choice = searchChoice;
                const combinedQueryString = queryStrings.filter(Boolean).join(` ${searchChoice} `);
                console.log(combinedQueryString);
                sessionStorage.setItem("search_condition", JSON.stringify(search_condition));
                window.location.href = '../../' + "k" + "/" + kintone.app.getId() + "/" + "?query=" + combinedQueryString;
            } catch (error) {
                alert(error);
                hideSpinner();
                return;
            }
        });

        const ResetButton = $("#resetButton");
        ResetButton.on("click", function (e) {
            allValues = { multiSelect: [] };
            $(".kintoneplugin-input-text").val("");
            $(".kintoneplugin-dropdown-list-item-selected").removeClass("kintoneplugin-dropdown-list-item-selected");
            sessionStorage.removeItem("search_condition");
            window.location.href = '../../' + "k" + "/" + kintone.app.getId() + "/";
        });
    })
})(jQuery, kintone.$PLUGIN_ID);