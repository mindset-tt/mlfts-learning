(function ($, PLUGIN_ID) {
    "use strict";

    let checkJson = "";
    let allValues = { multiSelect: [] };
    let bodyContent, radioSearchReset, radioInput1, radioInput2, formElement; // Declare these variables in a higher scope
    // Check if configuration is already fetched
    if (checkJson) return;
    // Fetch configuration from the plugin
    let json = kintone.plugin.app.getConfig(PLUGIN_ID);
    const obj = JSON.parse(json.fields);
    checkJson = json.fields;


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

    // Function to handle index show event
    async function handleIndexShow() {
        generateSearchForm();
        await fetchAppFieldsAndStatus();
        attachFormEventListeners();
    }

    // Function to generate search form
    function generateSearchForm() {
        const createElem = (type, classes = [], props = {}) => {
            // Create element 
            const elem = document.createElement(type);
            // Add classes
            classes.forEach((cls) => elem.classList.add(cls));
            // Add props
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
            radio.appendChild(radioInputs[index]);
            radio.appendChild(labels[index]);
        });

        containerRadio.append(...radioElements);
        radioSearchReset.append(containerRadio, searchButton, resetButton);
        formElement.append(buttonHead, bodyContent, footerContent);
        buttonHead.appendChild(buttonToggle);
        footerContent.appendChild(radioSearchReset);
        space.appendChild(formElement);
    }


    // Function to fetch app fields and status
    async function fetchAppFieldsAndStatus() {
        try {
            // Fetch app fields
            const appFieldsResponse = await kintone.api(kintone.api.url("/k/v1/app/form/fields.json", true), "GET", { app: kintone.app.getId() });
            const appFields = appFieldsResponse.properties;
            console.log(appFields);
            // Fetch app status
            const appStatusResponse = await kintone.api(kintone.api.url("/k/v1/app/status.json", true), "GET", { app: kintone.app.getId() });
            const appStatus = appStatusResponse.states;

            // Further processing or actions with the fetched data
            processFetchedData(appFields, appStatus);

            return { appFields, appStatus };
        } catch (error) {
            console.error("Error fetching app fields and status:", error);
            // Handle errors, show messages, or perform necessary actions
        }
    }

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
                        let options = appFields[obj[i].fieldCode[0]].options;
                        addMultiSelectDropdown(obj[i].titleName, options, obj[i].fieldType);
                        break;
                    case "STATUS":
                        let statusOptions = appStatus;
                        addMultiSelectDropdown(obj[i].titleName, statusOptions, obj[i].fieldType);
                        break;
                    default:
                        break;
                }
                if (obj[i].newline === "yes") {
                    const lineBreak = document.createElement("br");
                    bodyContent.appendChild(lineBreak);
                }
            }
            // add radio button to search container
            radioSearchReset.style.display = "flex";
        } catch (error) {
            alert(error);
            return;
        }

    }

    // Function to add single line text field
    function addSingleLineText(fieldlabel, fieldName) {
        const divName = document.createElement("div");
        divName.classList.add('divName');
        const inputElement = document.createElement("div");
        inputElement.classList.add("kintoneplugin-input-outer");
        inputElement.innerHTML = `
                <b>${fieldlabel}</b><br>
                <input class="kintoneplugin-input-text" type="text" id="singleLineText-${fieldName}">
            `;
        divName.appendChild(inputElement);
        bodyContent.appendChild(divName);
    }

    // Function to add range input field
    function addRangeInputField(fieldName, fieldId, fieldType) {
        const divDate = document.createElement("div");
        divDate.classList.add('divDate');

        const divDateTime = document.createElement("div");
        divDateTime.classList.add('divDateTime');

        const divTime = document.createElement("div");
        divTime.classList.add('divTime');

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
                <input class="kintoneplugin-input-text" type="${fieldType}" id="${fieldId}Start"> ~
                <input class="kintoneplugin-input-text" type="${fieldType}" id="${fieldId}End">
            `;

        const container = fieldType === "number" ? divNumber :
            fieldType === "date" ? divDate :
                fieldType === "datetime-local" ? divDateTime :
                    fieldType === "time" ? divTime :
                        null;
        if (container) {
            container.appendChild(inputFieldElement);
            bodyContent.appendChild(container);
        }
    }
    // Function to add multi select dropdown
    function addMultiSelectDropdown(fieldName, options, fieldtype) {
        const divMultiSelect = document.createElement("div");
        divMultiSelect.classList.add('divMultiSelect');
        const dropdownElement = document.createElement("div");
        dropdownElement.style.width = "150px";
        const dropdownName = document.createElement("div");
        dropdownElement.classList.add("kintoneplugin-dropdown-list");

        checkMultipleSelect(fieldtype, options, dropdownElement);

        dropdownName.innerHTML = `<b>${fieldName}</b><br>`;
        divMultiSelect.appendChild(dropdownName);
        divMultiSelect.appendChild(dropdownElement);
        bodyContent.appendChild(divMultiSelect);
    }

    function checkMultipleSelect(fieldtype, options, dropdownElement) {
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
    }

    // Function to attach form event listeners
    function attachFormEventListeners() {
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

        const And = document.getElementById("radio-0");
        const Or = document.getElementById("radio-1");
        const multiSelectDropdownItems = document.querySelectorAll(".kintoneplugin-dropdown-list-item span");

        multiSelectDropdownItems.forEach((dropdownItem) => {
            dropdownItem.addEventListener("click", function () {
                const selectedItem = this.textContent;
                const itemIndex = allValues.multiSelect.indexOf(selectedItem);
                if (itemIndex !== -1) {
                    allValues.multiSelect.splice(itemIndex, 1);
                } else {
                    allValues.multiSelect.push(selectedItem);
                }

                const parentDiv = this.closest(".kintoneplugin-dropdown-list-item");

                if (parentDiv) {
                    parentDiv.classList.toggle("kintoneplugin-dropdown-list-item-selected");
                }
            });
        });

        const savedSearchCondition = sessionStorage.getItem('search_condition');
        checkValueFromSession(savedSearchCondition, And, Or);

        const searchButton = document.getElementById("searchButton");
        const resetButton = document.getElementById("resetButton");

        // Attach event listeners
        searchButton.addEventListener("click", handleSearchButton);
        resetButton.addEventListener("click", handleResetButton);
    }

    function toggleButton() {
        if (formElement.style.height === "80px") {
            buttonToggle.innerText = "Show";
        }
        if (formElement.style.height !== "80px") {
            buttonToggle.innerText = "Hide";
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

    async function checkValueFromSession(savedSearchCondition, And, Or) {
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
                            const { appFields, appStatus } = await fetchAppFieldsAndStatus(); // Wait for data to be fetched
                            getMultiselectFromSession(searchCondition, i, appFields, appStatus);
                            break;
                        default:
                            break;
                    }
                }
                if (searchCondition.search_choice === "and") {
                    And.checked = true;
                    Or.checked = false;
                }
                if (searchCondition.search_choice === "or") {
                    Or.checked = true;
                    And.checked = false;
                }
            }
        } catch (error) {
            alert(error);
            return;
        }
    }
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

    async function handleSearchButton() {
        try {
            hideForm();
            showSpinner();
            let queryStrings = [];
            const search_condition = {};
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
                        const { appFields, appStatus } = await fetchAppFieldsAndStatus(); // Wait for data to be fetched
                        multipleSelectSearch($, obj, i, appStatus, search_condition, queryStrings, appFields);
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
        } catch (error) {
            console.log(error);
            hideSpinner();
            return;
        }
    }

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
    // Attach the event listener for app.record.index.show
    kintone.events.on("app.record.index.show", handleIndexShow);
})(jQuery, kintone.$PLUGIN_ID);