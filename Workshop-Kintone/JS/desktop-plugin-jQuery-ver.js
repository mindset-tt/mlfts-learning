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
    const createElem = (type, classes = [], props = {}) => {
        const elem = $('<' + type + '></' + type + '>');
        elem.addClass(classes.join(' '));
        Object.entries(props).forEach(([key, value]) => {
            elem.prop(key, value);
        });
        return elem;
    };

    const space = kintone.app.getHeaderSpaceElement();

    const buttonToggle = createElem("button", ["buttonToggle"], {
        class: "kintoneplugin-button-normal",
        id: "buttonToggle",
        text: "Show",
    });

    const formElement = createElem("div", ["form-container"]);
    const buttonHead = createElem("div", ["buttonHead"]);
    const bodyContent = createElem("div", ["bodyContent"]);
    const footerContent = createElem("div", ["footerContent"]);
    const searchButton = createElem("button", [], {
        class: "kintoneplugin-button-normal",
        id: "searchButton",
        text: "Search",
    });
    const resetButton = createElem("button", [], {
        class: "kintoneplugin-button-dialog-cancel",
        id: "resetButton",
        text: "Reset",
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
        for: "radio-0",
        text: "And",
    });
    const label2 = createElem("label", [], {
        for: "radio-1",
        text: "Or",
    });

    const radioSearchReset = createElem("div", ["radioSearchReset"]);
    const radioElements = [radioItem1, radioItem2];
    const labels = [label1, label2];
    const radioInputs = [radioInput1, radioInput2];

    radioElements.forEach((radio, index) => {
        radio.append(radioInputs[index], labels[index]);
    });

    containerRadio.append(...radioElements);
    radioSearchReset.append(containerRadio, searchButton, resetButton);
    formElement.append(buttonHead, bodyContent, footerContent);
    buttonHead.append(buttonToggle);
    footerContent.append(radioSearchReset);
    space.appendChild(formElement[0]);

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
        // Get the field information
        let fields = await kintone.api(kintone.api.url("/k/v1/app/form/fields.json", true), "GET", { app: kintone.app.getId() });
        // Get the status information
        let status = await kintone.api(kintone.api.url("/k/v1/app/status.json", true), "GET", { app: kintone.app.getId() });
        // Get the json from the config
        checkJson = json.field;
        // Get the json from the config
        let fieldCodes = [];
        let fieldLabels = [];
        let fielMultiplefield = [];
        let fieldPatail = [];
        let fieldExact = [];
        let fieldNewline = [];
        // Loop through the fields
        Object.keys(json.field).forEach(key => {
            fieldCodes.push(json.field[key].type);
            fieldLabels.push(json.field[key].code);
            fielMultiplefield.push(json.field[key].field);
            fieldPatail.push(json.field[key].patial);
            fieldExact.push(json.field[key].exact);
            fieldNewline.push(json.field[key].newline);
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
                    let options = fields.properties[fieldLabels[i]].options;
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
        radioSearchReset.css('display', 'flex');
        //Single line text field
        function addSingleLineText(fieldlabel, fieldName) {
            const divName = $('<div>').addClass('divName');
            const inputElement = $('<div>').addClass("kintoneplugin-input-outer").html(`
            <b>${fieldlabel}</b><br>
            <input class="kintoneplugin-input-text" type="text" id="singleLineText-${fieldName}">
        `);
            divName.append(inputElement);
            bodyContent.append(divName);
        }
        //Range input field in jquery
        function addRangeInputField(fieldName, type) {
            const divName = $('<div>').addClass('divName');
            const inputElement = $('<div>').addClass("kintoneplugin-input-outer").html(`
            <b>${fieldName}</b><br>
            <input class="kintoneplugin-input-text" type="${type}" id="rangeInput-${fieldName}-from">
            <input class="kintoneplugin-input-text" type="${type}" id="rangeInput-${fieldName}-to">
        `);
            divName.append(inputElement);
            bodyContent.append(divName);
        }
        //Multi select dropdown
        function addMultiSelectDropdown(fieldName, options, fieldtype) {
            const divMultiSelect = $('<div>').addClass('divMultiSelect');
            const dropdownElement = $('<div>').css('width', '150px').addClass("kintoneplugin-dropdown-list");
            if (fieldtype === "STATUS") {
                Object.values(options).forEach((value) => {
                    const dropdownItem = $('<div>').addClass(`kintoneplugin-dropdown-list-item`).html(`
                        <span class="kintoneplugin-dropdown-list-item-name" id="${value.name}">${value.name}</span>
                    `);
                    dropdownElement.append(dropdownItem);
                });
            } else {
                Object.values(options).forEach((value) => {
                    const dropdownItem = $('<div>').addClass("kintoneplugin-dropdown-list-item").html(`
                        <span class="kintoneplugin-dropdown-list-item-name" id="${value.label}">${value.label}</span>
                    `);
                    dropdownElement.append(dropdownItem);
                });
            }

            const dropdownName = $('<div>').html(`<b>${fieldName}</b><br>`);
            divMultiSelect.append(dropdownName, dropdownElement);
            bodyContent.append(divMultiSelect);
        }

        // -----------------------------------------------------------------Function---------------------------------------------------------------------------------
        let allValues = { multiSelect: [] };

        function toggleButton() {
            if ($('#buttonToggle').text() === "Show") {
                $('#buttonToggle').text("Hide");
            } else {
                $('#buttonToggle').text("Show");
            }
        }

        function showForm() {
            const contentHeight = $('#formElement').prop('scrollHeight');
            $('#formElement').css('height', contentHeight + "px");
            toggleButton();
        }

        function hideForm() {
            $('#formElement').css('height', "80px");
            toggleButton();
        }

        $('#buttonToggle').on("click", function () {
            if ($('#formElement').css('height') === "80px" || $('#formElement').css('height') === "") {
                showForm();
            } else {
                hideForm();
            }
        });

        if (json.initial_display === "yes") {
            showForm();
        } else {
            hideForm();
        }

        $('#radio-0').on("click", function () {
            if ($('#radio-0').prop('checked')) {
                allValues.logicalOperator = "And";
            }
            $('#radio-1').prop('checked', false);
        });

        $('#radio-1').on("click", function () {
            if ($('#radio-1').prop('checked')) {
                allValues.logicalOperator = "Or";
            }
            $('#radio-0').prop('checked', false);
        });

        $('.kintoneplugin-dropdown-list-item span').on("click", function () {
            const selectedItem = $(this).text();
            const itemIndex = allValues.multiSelect.indexOf(selectedItem);

            if (itemIndex !== -1) {
                allValues.multiSelect.splice(itemIndex, 1);
            } else {
                allValues.multiSelect.push(selectedItem);
            }

            const parentDiv = $(this).closest(".kintoneplugin-dropdown-list-item");
            if (parentDiv) {
                parentDiv.toggleClass("kintoneplugin-dropdown-list-item-selected");
            }
        });
        $("#searchButton").on("click", function (e) {
            try {
                hideForm();
                showSpinner();
                let queryStrings = [];
                let singleLineMulti;
                const search_condition = {};

                for (let i = 0; i < fieldCodes.length; i++) {
                    if (fieldCodes[i] === "MultiFieldText") {
                        singleLineMulti = $("#singleLineText-" + fielMultiplefield[i].join('-'));
                        if (singleLineMulti.val()) {
                            search_condition[fielMultiplefield[i].join('-')] = singleLineMulti.val();
                            let searchString = '';
                            if (Array.isArray(fielMultiplefield[i]) && fielMultiplefield[i].length > 0) {
                                if (fieldPatail[i] === "yes" && fieldExact[i] === "no") {
                                    searchString = '(' + fielMultiplefield[i].map(code => `${code} like "${search_condition[fielMultiplefield[i].join('-')]}"`).join(' or ') + ')';
                                } else if (fieldPatail[i] === "no" && fieldExact[i] === "yes") {
                                    searchString = '(' + fieldLabels[i].map(code => `${code} in "${search_condition[fielMultiplefield[i].join('-')]}"`).join(' or ') + ')';
                                }
                            }
                            queryStrings.push(searchString);
                        }
                    } else if (fieldCodes[i] === "SINGLE_LINE_TEXT") {
                        singleLineMulti = $("#singleLineText-" + fieldLabels[i]);
                        if (singleLineMulti.val()) {
                            search_condition[fieldLabels[i]] = singleLineMulti.val();
                            let searchString = '';
                            if (fieldPatail[i] === "yes" && fieldExact[i] === "no") {
                                searchString = `(${fieldLabels[i]} like "${search_condition[fieldLabels[i]]}")`;
                            } else if (fieldPatail[i] === "no" && fieldExact[i] === "yes") {
                                searchString = `(${fieldLabels[i]} in "${search_condition[fieldLabels[i]]}")`;
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

                                const cleanedArray = selectedValues.map(str => str.trim().replace(/\s+/g, ' '));

                                search_condition[fieldLabels[i]] = selectedValues;
                                queryStrings.push(`(${fieldLabels[i]} in ("${cleanedArray.join('","')}"))`);
                            } else {
                                const options = fields.properties[fieldLabels[i]].options;
                                const optionArray = Object.values(options);
                                const optionArrayValue = optionArray.map((item) => item.label);

                                const selectedValues = multiSelectDropdownArrayValue.filter((value) =>
                                    optionArrayValue.some((optionValue) =>
                                        optionValue.toLowerCase() === value.trim().replace(/\s+/g, ' ').toLowerCase()
                                    )
                                );

                                const cleanedArray = selectedValues.map(str => str.trim().replace(/\s+/g, ' '));

                                search_condition[fieldLabels[i]] = selectedValues;
                                queryStrings.push(`(${fieldLabels[i]} in ("${cleanedArray.join('","')}"))`);
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

                const combinedQueryString = queryStrings.filter(Boolean).join(` ${searchChoice} `);

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