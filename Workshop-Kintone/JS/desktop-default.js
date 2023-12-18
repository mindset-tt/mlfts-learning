(function ($, PLUGIN_ID) {
    "use strict";
    // Check if configuration is already fetched
    let allValues = { multiSelect: [] };
    let bodyContent, radioSearchReset, radioInput1, radioInput2, formElement = ""; // Declare these letiables in a higher scope
    let appFields = {}
    let appStatus = {}
    // Fetch configuration from the plugin
    let json = kintone.plugin.app.getConfig(PLUGIN_ID);
    const obj = JSON.parse(json.fields);
    // Add a flag to check if the form has been created
    let formCreated = false;

    // Show spinner
    function showSpinner() {
        try {
            if ($('.kintone-spinner').length === 0) {
                const spin_div = $('<div id ="kintone-spin" class="kintone-spinner"></div>');
                const spin_bg_div = $('<div id ="kintone-spin-bg" class="kintone-spinner"></div>');
                $(document.body).append(spin_div, spin_bg_div);
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
                const opts = {
                    'color': '#000'
                };
                new Spinner(opts).spin(document.getElementById('kintone-spin'));
            }
            $('.kintone-spinner').show();
        } catch (error) {
            alert(error);
            return;
        }
    }

    // Hide spinner
    function hideSpinner() {
        $('.kintone-spinner').hide();
    }

    // Function to create element
    function createElem(type, classes = [], props = {}) {
        // Create element 
        const elem = $("<" + type + "></" + type + ">");
        // Add classes
        elem.addClass(classes.join(" "));
        // Add props
        $.each(props, function (key, value) {
            elem.prop(key, value);
        });
        return elem.get(0);
    }

    // Function to generate search form
    function generateSearchForm() {
        const space = kintone.app.getHeaderSpaceElement();

        const buttonToggle = createElem("button", ["buttonToggle"], {
            className: "kintoneplugin-button-normal",
            id: "buttonToggle",
            innerText: "Show",
        });

        formElement = createElem("div", ["form-container"]);
        const buttonHead = createElem("div", ["buttonHead"]);
        bodyContent = createElem("div", ["bodyContent"]);
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

        radioInput1 = createElem("input", [], {
            type: "radio",
            name: "logicalOperatorRadio",
            value: "And",
            id: "radio-0",
            checked: true,
        });
        radioInput2 = createElem("input", [], {
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

        radioSearchReset = createElem("div", ["radioSearchReset"]);
        const radioElements = [radioItem1, radioItem2];
        const labels = [label1, label2];
        const radioInputs = [radioInput1, radioInput2];

        radioElements.forEach((radio, index) => {
            radio.append(radioInputs[index]);
            radio.append(labels[index]);
        });

        containerRadio.append(...radioElements);
        radioSearchReset.append(containerRadio, searchButton, resetButton);
        formElement.append(buttonHead, bodyContent, footerContent);
        buttonHead.append(buttonToggle);
        footerContent.append(radioSearchReset);
        space.append(formElement);
    }

    // Function to fetch app fields and status
    async function fetchAppFieldsAndStatus() {
        try {
            // Fetch app fields
            const appFieldsResponse = await kintone.api(kintone.api.url("/k/v1/app/form/fields.json", true), "GET", { app: kintone.app.getId() });
            appFields = appFieldsResponse.properties;
            // Fetch app status
            const appStatusResponse = await kintone.api(kintone.api.url("/k/v1/app/status.json", true), "GET", { app: kintone.app.getId() });
            appStatus = appStatusResponse.states;
            // Further processing or actions with the fetched data
            processFetchedData(appFields, appStatus);
        } catch (error) {
            alert("Error fetching app fields and status:", error);
        }
    }

    // Function to process fetched data and create form elements
    function processFetchedData(appFields, appStatus) {
        try {
            for (let i = 0; i < obj.length; i++) {
                switch (obj[i].fieldType) {
                    case "MultiFieldText":
                    case "SINGLE_LINE_TEXT":
                        addSingleLineText(obj[i].titleName, obj[i].fieldCode.join('-'));
                        break;
                    case "CALC":
                    case "NUMBER":
                    case "RECORD_NUMBER":
                        addRangeInputField(obj[i].titleName, obj[i].fieldCode[0], "number");
                        break;
                    case "DATE":
                        addRangeInputField(obj[i].titleName, obj[i].fieldCode[0], "date");
                        break;
                    case "CREATED_TIME":
                    case "UPDATED_TIME":
                    case "DATETIME":
                        addRangeInputField(obj[i].titleName, obj[i].fieldCode[0], "datetime-local");
                        break;
                    case "TIME":
                        addRangeInputField(obj[i].titleName, obj[i].fieldCode[0], "time");
                        break;
                    case "MULTI_SELECT":
                    case "DROP_DOWN":
                    case "CHECK_BOX":
                    case "RADIO_BUTTON":
                        addMultiSelectDropdown(obj[i].titleName, appFields[obj[i].fieldCode[0]].options, obj[i].fieldType);
                        break;
                    case "STATUS":
                        addMultiSelectDropdown(obj[i].titleName, appStatus, obj[i].fieldType);
                        break;
                    default:
                        break;
                }
                if (obj[i].newline === "yes") {
                    let lineBreak = $('<br>');
                    $('.bodyContent').append(lineBreak);
                }
            }
            $('.radioSearchReset').css('display', 'flex');
        } catch (error) {
            alert(error);
        }

    }

    // Function to add single line text field using jQuery
    function addSingleLineText(fieldlabel, fieldName) {
        let divName = $("<div>").addClass('divName');
        let inputElement = $("<div>").addClass("kintoneplugin-input-outer").html(
            `<b>${fieldlabel}</b><br><input class="kintoneplugin-input-text" type="text" id="singleLineText-${fieldName}">`
        );
        divName.append(inputElement);
        $('.bodyContent').append(divName); // Appending the created div inside .bodyContent using jQuery
    }


    // Function to add range input field using jQuery
    function addRangeInputField(fieldName, fieldId, fieldType) {
        let divDate = $('<div>').addClass('divDate');
        let divDateTime = $('<div>').addClass('divDateTime');
        let divTime = $('<div>').addClass('divTime');
        let divNumber = $('<div>').addClass('divNumber');

        let inputFieldElement = $('<div>').addClass('kintoneplugin-input-outer').html(
            `<div style="display: flex; justify-content: space-between;">
            <b>${fieldName} (Start)</b>
            <b>${fieldName} (End)</b>
        </div>
        <input class="kintoneplugin-input-text" type="${fieldType}" id="${fieldId}Start"> ~
        <input class="kintoneplugin-input-text" type="${fieldType}" id="${fieldId}End">
        `
        );

        let container;
        if (fieldType === 'number') {
            container = divNumber;
        } else if (fieldType === 'date') {
            container = divDate;
        } else if (fieldType === 'datetime-local') {
            container = divDateTime;
        } else if (fieldType === 'time') {
            container = divTime;
        }

        if (container) {
            container.append(inputFieldElement);
            $('.bodyContent').append(container); // Appending the container inside .bodyContent using jQuery
        }
    }

    // Function to add multi select dropdown using jQuery
    function addMultiSelectDropdown(fieldName, options, fieldtype) {
        let divMultiSelect = $('<div>').addClass('divMultiSelect');
        let dropdownElement = $('<div>').css('width', '150px');
        let dropdownName = $('<div>').addClass('kintoneplugin-dropdown-list');

        checkMultipleSelect(fieldtype, options, dropdownElement);

        dropdownName.html(`<b>${fieldName}</b><br>`);
        dropdownName.find('br').after(dropdownElement);
        divMultiSelect.append(dropdownName);
        $('.bodyContent').append(divMultiSelect); // Appending the divMultiSelect inside .bodyContent using jQuery
    }

    // Function to check if the field type is status or not using jQuery
    function checkMultipleSelect(fieldtype, options, dropdownElement) {
        Object.values(options).forEach((value) => {
            let dropdownItem = $('<div>').addClass('kintoneplugin-dropdown-list-item');
            let span = $('<span>').addClass('kintoneplugin-dropdown-list-item-name');

            if (fieldtype === 'STATUS') {
                span.attr('id', value.name).text(value.name);
            } else {
                span.attr('id', value.label).text(value.label);
            }
            let createspace = $('<br>');
            dropdownItem.append(span);
            dropdownElement.append(createspace);
            dropdownElement.append(dropdownItem);
        });
    }

    // Function to attach form event listeners
    async function attachFormEventListeners() {
        $("#buttonToggle").on("click", () => {
            if (
                $(".form-container").css("height") === "80px" ||
                $(".form-container").css("height") === ""
            ) {
                showForm();
            } else {
                hideForm();
            }
        });

        if (json.initial_display === "yes") {
            showForm();
            $("#buttonToggle").text("Hide");
        } else {
            hideForm();
            $("#buttonToggle").text("Show");
        }

        $("#radio-0").on("click", function () {
            if ($("#radio-0").prop("checked")) {
                allValues.logicalOperator = "And";
            }
            $("#radio-1").prop("checked", false);
        });

        $("#radio-1").on("click", function () {
            if ($("#radio-1").prop("checked")) {
                allValues.logicalOperator = "Or";
            }
            $("#radio-0").prop("checked", false);
        });

        $(".kintoneplugin-dropdown-list-item span").on("click", function () {
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

        const savedSearchCondition = sessionStorage.getItem('search_condition');
        checkValueFromSession(savedSearchCondition);

        // Attach event listeners
        $("#searchButton").on("click", handleSearchButton);
        $("#resetButton").on("click", handleResetButton);
    }

    // Function to show form
    function showForm() {
        const contentHeight = $(".form-container").prop('scrollHeight');
        $(".form-container").css('height', contentHeight + 'px');
        $("#buttonToggle").text("Hide");
    }

    // Function to hide form
    function hideForm() {
        $(".form-container").css('height', '80px');
        $("#buttonToggle").text("Show");
    }

    // Function to check value from session
    async function checkValueFromSession(savedSearchCondition) {
        try {
            if (savedSearchCondition) {
                const searchCondition = JSON.parse(savedSearchCondition);
                let singleLineMulti = "";
                for (let i = 0; i < obj.length; i++) {
                    switch (obj[i].fieldType) {
                        case "MultiFieldText":
                        case "SINGLE_LINE_TEXT":
                            singleLineMulti = $("#singleLineText-" + obj[i].fieldCode.join('-'));
                            singleLineMulti.val(searchCondition[obj[i].fieldCode.join('-')]);
                        case "NUMBER":
                        case "DATE":
                        case "DATETIME":
                        case "TIME":
                        case "CREATED_TIME":
                        case "RECORD_NUMBER":
                        case "UPDATED_TIME":
                        case "CALC":
                            if (searchCondition[obj[i].fieldCode[0] + "Start"]) {
                                $(`#${obj[i].fieldCode[0]}Start`).val(searchCondition[obj[i].fieldCode[0] + "Start"]);
                            }
                            if (searchCondition[obj[i].fieldCode[0] + "End"]) {
                                $(`#${obj[i].fieldCode[0]}End`).val(searchCondition[obj[i].fieldCode[0] + "End"]);
                            }
                            break;
                        case "MULTI_SELECT":
                        case "DROP_DOWN":
                        case "CHECK_BOX":
                        case "RADIO_BUTTON":
                        case "STATUS":
                            getMultiselectFromSession(searchCondition, i, appFields, appStatus);
                            break;
                        default:
                            break;
                    }
                }
                if (searchCondition.search_choice === "and") {
                    // radioinput1 checked in jQuery
                    $("#radio-0").prop("checked", true);
                    $("#radio-1").prop("checked", false);
                }
                if (searchCondition.search_choice === "or") {
                    // radioinput2 checked in jQuery
                    $("#radio-1").prop("checked", true);
                    $("#radio-0").prop("checked", false);
                }
            }
        } catch (error) {
            alert(error);
            return;
        }
    }

    // Function to get multiselect from session
    function getMultiselectFromSession(searchCondition, i, appFields, appStatus) {
        if (searchCondition[obj[i].fieldCode[0]]) {
            if (obj[i].fieldType === "STATUS") {
                const optionArray = Object.values(appStatus);
                const optionArrayValue = optionArray.map((item) => item.name);
                const selectedValues = searchCondition[obj[i].fieldCode[0]].filter((value) => optionArrayValue.some((optionValue) => optionValue.toLowerCase() === value.trim().replace(/\s+/g, ' ').toLowerCase()
                )
                );
                const cleanedArray = selectedValues.map(str => str.trim().replace(/\s+/g, ' '));
                $(`#${obj[i].fieldCode[0]}`).val(cleanedArray);
                if (selectedValues.length > 0) {
                    selectedValues.forEach((value) => {
                        const parentDiv = $(`.kintoneplugin-dropdown-list-item:contains(${value})`);
                        parentDiv.addClass("kintoneplugin-dropdown-list-item-selected");
                    });
                }
            }
            else {
                const optionArray = Object.values(appFields[obj[i].fieldCode[0]].options);
                const optionArrayValue = optionArray.map((item) => item.label);
                const selectedValues = searchCondition[obj[i].fieldCode[0]].filter((value) => optionArrayValue.some((optionValue) => optionValue.toLowerCase() === value.trim().replace(/\s+/g, ' ').toLowerCase()
                )
                );
                const cleanedArray = selectedValues.map(str => str.trim().replace(/\s+/g, ' '));
                $(`#${obj[i].fieldCode[0]}`).val(cleanedArray);
                if (selectedValues.length > 0) {
                    selectedValues.forEach((value) => {
                        const parentDiv = $(`.kintoneplugin-dropdown-list-item:contains(${value})`);
                        parentDiv.addClass("kintoneplugin-dropdown-list-item-selected");
                    });
                }
            }
        }
    }
    //Function to handle search button
    async function handleSearchButton() {
        hideForm();
        showSpinner();
        try {
            await performSearch();
        } catch (error) {
            console.log(error);
            hideSpinner();
            return;
        }
    }

    async function performSearch() {
        const search_condition = {};
        const queryStrings = [];
        for (let i = 0; i < obj.length; i++) {
            switch (obj[i].fieldType) {
                case "MultiFieldText":
                case "SINGLE_LINE_TEXT":
                    stringLineSearch(i, search_condition, queryStrings);
                    break;
                case "NUMBER":
                case "DATE":
                case "DATETIME":
                case "TIME":
                case "CREATED_TIME":
                case "RECORD_NUMBER":
                case "UPDATED_TIME":
                case "CALC":
                    rangeSearch(i, search_condition, queryStrings);
                    break;
                case "MULTI_SELECT":
                case "DROP_DOWN":
                case "CHECK_BOX":
                case "RADIO_BUTTON":
                case "STATUS":
                    multipleSelectSearch(obj, i, appStatus, search_condition, queryStrings, appFields);
                    break;
                default:
                    break;
            }
        }
        let searchChoice = "and";
        searchChoice = searchChoiceFunction(search_condition, searchChoice);
        search_condition.search_choice = searchChoice;
        const combinedQueryString = queryStrings.filter(Boolean).join(` ${searchChoice} `);
        console.log(combinedQueryString);
        sessionStorage.setItem("search_condition", JSON.stringify(search_condition));
        window.location.href = '../../' + "k" + "/" + kintone.app.getId() + "/" + "?query=" + combinedQueryString;
    }
    // search single line text field function
    function stringLineSearch(i, search_condition, queryStrings) {
        let singleLineMulti = $("#singleLineText-" + obj[i].fieldCode.join('-'));
        if (singleLineMulti.val()) {
            search_condition[obj[i].fieldCode.join('-')] = singleLineMulti.val();
            let searchString = '';
            if (obj[i].fieldPatail === "yes") {
                searchString = '(' + obj[i].fieldCode.map(code => `${code} like "${search_condition[obj[i].fieldCode.join('-')]}"`).join(' or ') + ')';
            } else {
                searchString = '(' + obj[i].fieldCode.map(code => `${code} = "${search_condition[obj[i].fieldCode.join('-')]}"`).join(' or ') + ')';
            }
            queryStrings.push(searchString);
        }
    }

    // search range input field function
    function rangeSearch(i, search_condition, queryStrings) {
        let numberfieldStart = $(`#${obj[i].fieldCode[0]}Start`);
        let numberfieldEnd = $(`#${obj[i].fieldCode[0]}End`);
        if (numberfieldStart.val() !== "" && numberfieldEnd.val() !== "") {
            if (numberfieldStart.val() > numberfieldEnd.val()) {
                throw (`Start value of ${obj[i].fieldCode[0]} must be less than End value`);
            }
            else {
                search_condition[obj[i].fieldCode[0] + "Start"] = numberfieldStart.val();
                search_condition[obj[i].fieldCode[0] + "End"] = numberfieldEnd.val();

                queryStrings.push(`(${obj[i].fieldCode[0]} >= "${search_condition[obj[i].fieldCode[0] + "Start"]}" and ${obj[i].fieldCode[0]} <= "${search_condition[obj[i].fieldCode[0] + "End"]}")`);
            }
        }
        else if (numberfieldStart.val() !== "" && numberfieldEnd.val() === "") {
            search_condition[obj[i].fieldCode[0] + "Start"] = numberfieldStart.val();
            queryStrings.push(`(${obj[i].fieldCode[0]} >= "${search_condition[obj[i].fieldCode[0] + "Start"]}")`);
        }
        else if (numberfieldStart.val() === "" && numberfieldEnd.val() !== "") {
            search_condition[obj[i].fieldCode[0] + "End"] = numberfieldEnd.val();
            queryStrings.push(`(${obj[i].fieldCode[0]} <= "${search_condition[obj[i].fieldCode[0] + "End"]}")`);
        }
    }

    // search multi select dropdown function
    function multipleSelectSearch(obj, i, appStatus, search_condition, queryStrings, appFields) {
        const multiSelectDropdown = $(".kintoneplugin-dropdown-list-item-selected");
        const multiSelectDropdownArrayValue = multiSelectDropdown.map(function () {
            return $(this).text().trim();
        }).get();

        if (multiSelectDropdownArrayValue.length > 0) {
            if (obj[i].fieldType === "STATUS") {
                const optionArray = Object.values(appStatus);
                const optionArrayValue = optionArray.map((item) => item.name);

                const selectedValues = multiSelectDropdownArrayValue.filter((value) => optionArrayValue.some((optionValue) => optionValue.toLowerCase() === value.trim().replace(/\s+/g, ' ').toLowerCase()
                )
                );
                const cleanedArray = selectedValues.map(str => encodeURIComponent(str.trim().replace(/\s+/g, ' ')));
                search_condition[obj[i].fieldCode[0]] = selectedValues;
                if (selectedValues.length > 0) {
                    queryStrings.push(`(${obj[i].fieldCode[0]} in ("${cleanedArray.join('","')}"))`);
                }
            } else {
                const optionArray = Object.values(appFields[obj[i].fieldCode[0]].options);
                const optionArrayValue = optionArray.map((item) => item.label);

                const selectedValues = multiSelectDropdownArrayValue.filter((value) => optionArrayValue.some((optionValue) => optionValue.toLowerCase() === value.trim().replace(/\s+/g, ' ').toLowerCase()
                )
                );
                const cleanedArray = selectedValues.map(str => encodeURIComponent(str.trim().replace(/\s+/g, ' ')));
                search_condition[obj[i].fieldCode[0]] = selectedValues;
                if (selectedValues.length > 0) {
                    queryStrings.push(`(${obj[i].fieldCode[0]} in ("${cleanedArray.join('","')}"))`);
                }
            }
        }
    }

    // search choice function
    function searchChoiceFunction(search_condition, searchChoice) {
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
        return searchChoice;
    }

    // Function to handle reset button
    function handleResetButton() {
        try {
            allValues = { multiSelect: [] };
            $(".kintoneplugin-input-text").val("");
            $(".kintoneplugin-dropdown-list-item-selected").removeClass("kintoneplugin-dropdown-list-item-selected");
            sessionStorage.removeItem("search_condition");
            window.location.href = '../../' + "k" + "/" + kintone.app.getId() + "/";
        } catch (error) {
            alert(error);
            return;
        }
    }
    // Function to handle index show event
    async function handleIndexShow() {
        // Check if the form has already been created
        if (!formCreated) {
            generateSearchForm();
            await fetchAppFieldsAndStatus();
            attachFormEventListeners();
            formCreated = true; // Set the flag to true once the form is created
        }
    }

    // Attach the event listener for app.record.index.show
    kintone.events.on("app.record.index.show", handleIndexShow);
})(jQuery, kintone.$PLUGIN_ID);