(function () {
    "use strict";
    // -------------------------------------------------------------------Create Element-----------------------------------------------------------------------------------------
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
    const partialMatch = document.createElement("input");
    const radioInput2 = document.createElement("input");
    const radioItem2 = document.createElement("span");
    const radioInput1 = document.createElement("input");
    const radioItem1 = document.createElement("span");
    const containerRadio = document.createElement("div");

    const divName = document.createElement("div");
    divName.classList.add('divName')

    const divDate = document.createElement("div");
    divDate.classList.add('divDate')

    const divMultiSelect = document.createElement("div");
    divMultiSelect.classList.add('divMultiSelect')

    const divNumber = document.createElement("div");
    divNumber.classList.add('divNumber');

    const divMultiLine = document.createElement("div");
    divMultiLine.classList.add('divMultiLine')

    const divInBody = document.createElement("div");
    divInBody.classList.add('divInBody')

    const divDateTime = document.createElement("div");
    divDateTime.classList.add('divDateTime')

    const radioSearchReset = document.createElement("div");
    radioSearchReset.classList.add('radioSearchReset');

    const showText = document.createElement("div");
    showText.classList.add('shoeText');

    const label1 = document.createElement("label");
    const label2 = document.createElement("label");

    buttonHead.appendChild(buttonToggle);
    formElement.appendChild(buttonHead);
    bodyContent.appendChild(divName);
    bodyContent.appendChild(divMultiSelect);
    bodyContent.appendChild(divDate);
    divInBody.appendChild(divMultiLine);
    divInBody.appendChild(divNumber);
    formElement.appendChild(bodyContent);
    formElement.appendChild(showText);
    formElement.appendChild(divInBody);
    footerContent.appendChild(divDateTime);
    footerContent.appendChild(radioSearchReset);
    formElement.appendChild(footerContent);

    // Set the properties for the button element
    buttonToggle.className = "kintone-button-normal";
    buttonToggle.id = "buttonToggle"
    buttonToggle.innerText = "Show";
    // Set the properties for the "Search" button
    searchButton.className = "kintone-button-normal";
    searchButton.id = "searchButton";
    searchButton.innerText = "Search";
    // Set the properties for the "Reset" button
    resetButton.className = "kintone-button-dialog-cancel";
    resetButton.innerText = "Reset";
    //div of radio
    containerRadio.className = "kintone-input-radio";
    containerRadio.id = "containerRadio";
    // Create the first radio button item
    radioItem1.className = "kintone-input-radio-item";
    radioItem1.style.marginLeft = "12px";
    radioItem2.className = "kintone-input-radio-item";
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
    kintone.events.on("app.record.index.show", async function () {
        try {
            // Check checkJson is empty or not
            if (checkJson) return;
            // Get the fields of the app
            let fields = await kintone.api(kintone.api.url("/k/v1/app/form/fields.json", true), "GET", { app: kintone.app.getId() });
            // Get the options of the favourite_foods field
            let options = fields.properties.favourite_foods.options;
            // Get the properties of the fields
            checkJson = fields.properties;
            // Loop through the properties
            for (const propertyName in fields.properties) {
                // Check if the property is name, date_of_birth, date_and_time, age, favourite_sports, favourite_foods
                if (propertyName === "name") {
                    addSingleLineText(propertyName);
                } else if (propertyName === "date_of_birth") {
                    addRangeInputField(propertyName, "date");
                } else if (propertyName === "date_and_time") {
                    addRangeInputField(propertyName, "datetime-local");
                } else if (propertyName === "age") {
                    addRangeInputField(propertyName, "number");
                } else if (propertyName === "favourite_sports") {
                    addMultilineText(propertyName);
                } else if (propertyName === "favourite_foods") {
                    addMultiSelectDropdown(propertyName, options);
                }
            }
            // Append the "Search" and "Reset" and containerRadio to containerbutton
            radioSearchReset.style.display = "flex";

            function addSingleLineText(fieldName) {
                const inputElement = document.createElement("div");
                inputElement.classList.add("kintone-input-outer");
                inputElement.innerHTML = `
                    <b>${fieldName}</b><br>
                    <input class="kintone-input-text" type="text" id="singlelineText">
                `;
                divName.appendChild(inputElement);
            }

            function addRangeInputField(fieldName, fieldType) {
                const inputFieldElement = document.createElement("div");
                inputFieldElement.classList.add("kintone-input-outer");
                inputFieldElement.innerHTML = `
                    <div style="display: flex; justify-content: space-between;">
                    <b>${fieldName} (Start)</b>
                    <b>${fieldName} (End)</b>
                    </div>
                    </div>
                    <input class="kintone-input-text" type="${fieldType}" id="${fieldType}Start"> ~
                    <input class="kintone-input-text" type="${fieldType}" id="${fieldType}End">
                `;
                // Adjust the container based on the fieldType
                const container = fieldType === "number" ? divNumber :
                    fieldType === "date" ? divDate :
                        fieldType === "datetime-local" ? divDateTime :
                            null; // Add a null check or specify a default container

                if (container) {
                    container.appendChild(inputFieldElement);
                }
            }

            function addMultilineText(fieldName) {
                const textareaElement = document.createElement("div");
                textareaElement.classList.add("kintone-input-outer");
                // Create a container div to hold both the textarea and "Partial Match" label
                const containerRadio = document.createElement("div");
                containerRadio.style.display = "flex";
                containerRadio.style.alignItems = "center";
                containerRadio.innerHTML = `
                    <div style="flex-grow: 1;">
                        <b>${fieldName}</b><br>
                        <textarea class="kintone-input-text" type="textarea" style="width: 299px; height: 91px;" id="multilineText"></textarea>
                    </div>
                `;
                partialMatch.classList.add("kintone-input-checkbox");
                partialMatch.type = "checkbox";
                partialMatch.style.marginLeft = "10px";
                partialMatch.style.width = "25px";
                partialMatch.style.height = "25px";
                partialMatch.name = "checkbox";
                partialMatch.value = "0";
                partialMatch.id = "partialMatch";
                partialMatch.checked = "true";

                const textPartialMatch = document.createElement("p");
                textPartialMatch.setAttribute("for", "partialMatch");
                textPartialMatch.textContent = "Partial Match";

                // Append the checkbox and label to the containerRadio
                containerRadio.appendChild(partialMatch);
                containerRadio.appendChild(textPartialMatch);
                textareaElement.appendChild(containerRadio);
                divMultiLine.appendChild(textareaElement);
            }

            function addMultiSelectDropdown(fieldName, options) {
                const dropdownElement = document.createElement("div");
                dropdownElement.style.width = "150px";
                dropdownElement.classList.add("kintone-dropdown-list");
                dropdownElement.innerHTML = `<b>${fieldName}</b><br><br>`;

                Object.values(options).forEach((value) => {
                    const dropdownItem = document.createElement("div");
                    dropdownItem.classList.add("kintone-dropdown-list-item");
                    dropdownItem.innerHTML = `
                        <span class="kintone-dropdown-list-item-name" id="item">${value.label}</span>
                    `;
                    dropdownElement.appendChild(dropdownItem);
                });

                divMultiSelect.appendChild(dropdownElement);
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

            const name = document.getElementById("singlelineText");
            const favourite_foods = allValues.multiSelect;
            const favourite_sports = document.getElementById("multilineText");
            const date_of_birthStart = document.getElementById("dateStart");
            const date_of_birthEnd = document.getElementById("dateEnd");
            const date_and_timeStart = document.getElementById("datetime-localStart");
            const date_and_timeEnd = document.getElementById("datetime-localEnd");
            const age_Start = document.getElementById("numberStart");
            const age_End = document.getElementById("numberEnd");

            const partial_Match = document.getElementById("partialMatch");
            const And = document.getElementById("radio-0");
            const Or = document.getElementById("radio-1");

            const SearchButton = document.getElementById("searchButton");
            // Get the saved search condition from the local storage
            const savedSearchCondition = localStorage.getItem("search_condition");

            const multiSelectDropdownItems = document.querySelectorAll(".kintone-dropdown-list-item span");

            multiSelectDropdownItems.forEach((dropdownItem) => {
                dropdownItem.addEventListener("click", function () {
                    try {
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
                        const parentDiv = this.closest(".kintone-dropdown-list-item");
                        if (parentDiv) {
                            parentDiv.classList.toggle("kintone-dropdown-list-item-selected");
                        }
                    }
                    catch (error) {
                        alert(error);
                        return;
                    }
                });
            });

            if (savedSearchCondition) {
                // Parse the saved search condition
                const searchCondition = JSON.parse(savedSearchCondition);
                // Check if the search condition has the name field
                if (searchCondition.name) {
                    name.value = searchCondition.name;
                }

                // Check if the search condition has the favourite_foods field
                if (searchCondition.favourite_foods) {
                    // Loop through the multiSelectDropdownItems
                    multiSelectDropdownItems.forEach((dropdownItem) => {
                        const selectedItem = dropdownItem.textContent;

                        // Check if the item is in the saved search condition
                        if (searchCondition.favourite_foods.includes(selectedItem)) {
                            // Item is in the saved condition, select it
                            const parentDiv = dropdownItem.closest(
                                ".kintone-dropdown-list-item"
                            );
                            if (parentDiv) {
                                parentDiv.classList.add(
                                    "kintone-dropdown-list-item-selected"
                                );
                            }

                            // Add it to the allValues.multiSelect array
                            allValues.multiSelect.push(selectedItem);
                        }
                    });
                }

                // Check if the search condition has the favourite_sports field
                if (searchCondition.favourite_sports) {
                    favourite_sports.value = searchCondition.favourite_sports;
                }

                // Check if the search condition has the partial_Match field
                if (searchCondition.partial_Match) {
                    partial_Match.checked = true;
                } else if (!searchCondition.partial_Match) {
                    partial_Match.checked = false;
                } else {
                    partial_Match.checked = true;
                }

                // Check if the search condition has the search_choice field
                if (searchCondition.search_choice === "And") {
                    And.checked = true;
                    Or.checked = false;
                } else if (searchCondition.search_choice === "Or") {
                    Or.checked = true;
                    And.checked = false;
                }

                // Check if the search condition has the date_of_birthStart and date_of_birthEnd field
                if (searchCondition.date_of_birthStart) {
                    date_of_birthStart.value = searchCondition.date_of_birthStart;
                }
                if (searchCondition.date_of_birthEnd) {
                    date_of_birthEnd.value = searchCondition.date_of_birthEnd;
                }

                // Check if the search condition has the date_and_timeStart and date_and_timeEnd field
                if (searchCondition.date_and_timeStart) {
                    date_and_timeStart.value = searchCondition.date_and_timeStart;
                }
                if (searchCondition.date_and_timeEnd) {
                    date_and_timeEnd.value = searchCondition.date_and_timeEnd;
                }

                // Check if the search condition has the age_Start and age_End field
                if (searchCondition.age_Start) {
                    age_Start.value = searchCondition.age_Start;
                }
                if (searchCondition.age_End) {
                    age_End.value = searchCondition.age_End;
                }
            }


            SearchButton.addEventListener("click", function (e) {
                try {
                    // define queryStrings array
                    let queryStrings = [];

                    e.preventDefault();

                    // Hide the form and show the spinner
                    hideForm();
                    showSpinner();

                    // Validate the input values
                    const search_condition = {};
                    // Validate and assign input values to search_condition object and queryStrings array
                    // Start check name
                    if (name.value !== "") {
                        search_condition.name = name.value;
                        queryStrings.push(`(name in ("${search_condition.name}"))`);
                    }
                    // End check name

                    // Check favourite_foods
                    if (Array.isArray(favourite_foods) && favourite_foods.length > 0) {
                        search_condition.favourite_foods = favourite_foods;
                        // Convert the array to a string
                        const jsonString = JSON.stringify(search_condition.favourite_foods);
                        // Add the query string with favourite_foods field
                        queryStrings.push(`(favourite_foods in (${jsonString.slice(1, -1)}))`);
                    }
                    // End Check favourite_foods

                    //Start check favourite_sports
                    if (favourite_sports.value !== "") {
                        search_condition.favourite_sports = favourite_sports.value;
                        // Check if the partial_Match is true or false
                        if (partial_Match.checked) {
                            search_condition.partial_Match = true;
                            // Add the query string with partial match (like)
                            queryStrings.push(`(Text_area like "${search_condition.favourite_sports}")`);
                        } else {
                            search_condition.partial_Match = false;
                            // Add the query string without partial match (not like)
                            queryStrings.push(`(Text_area not like "${search_condition.favourite_sports}")`);
                        }
                    }
                    // End check favourite_sports

                    // Start check "And" or "Or"
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
                    // End check "And" or "Or"

                    // Start check date_of_birth
                    if (date_of_birthStart.value !== "" && date_of_birthEnd.value !== "") {
                        // Check if the date_of_birthStart is greater than date_of_birthEnd
                        if (date_of_birthStart.value > date_of_birthEnd.value) {
                            throw ("Date of Birth (Start) should be less than Date of Birth (End)");
                        } else {
                            // Assign the value to the search_condition
                            search_condition.date_of_birthStart = date_of_birthStart.value;
                            search_condition.date_of_birthEnd = date_of_birthEnd.value;
                            // Add the query string with date_of_birthStart and date_of_birthEnd
                            queryStrings.push(`(date_of_birth >= "${search_condition.date_of_birthStart}" and date_of_birth <= "${search_condition.date_of_birthEnd}")`);
                        }
                    } else if (date_of_birthStart.value !== "" && date_of_birthEnd.value === "") {
                        search_condition.date_of_birthStart = date_of_birthStart.value;
                        // Add the query string with date_of_birthStart
                        queryStrings.push(`(date_of_birth >= "${search_condition.date_of_birthStart}")`);
                    } else if (date_of_birthStart.value === "" && date_of_birthEnd.value !== "") {
                        search_condition.date_of_birthEnd = date_of_birthEnd.value;
                        // Add the query string with date_of_birthEnd
                        queryStrings.push(`(date_of_birth <= "${search_condition.date_of_birthEnd}")`);
                    }
                    else {

                    }
                    // End check date_of_birthStart

                    // Start check date_and_time
                    if (date_and_timeStart.value !== "" && date_and_timeEnd.value !== "") {
                        // Check if the date_and_timeStart is greater than date_and_timeEnd
                        if (date_and_timeStart.value > date_and_timeEnd.value) {
                            throw ("Date and Time (Start) should be less than Date and Time (End)");
                        } else {
                            search_condition.date_and_timeStart = date_and_timeStart.value;
                            search_condition.date_and_timeEnd = date_and_timeEnd.value;
                            // Add the query string with date_and_timeStart and date_and_timeEnd
                            queryStrings.push(`(date_and_time >= "${search_condition.date_and_timeStart}" and date_and_time <= "${search_condition.date_and_timeEnd}")`);
                        }
                    } else if (date_and_timeStart.value !== "" && date_and_timeEnd.value === "") {
                        search_condition.date_and_timeStart = date_and_timeStart.value;
                        // Add the query string with date_and_timeStart
                        queryStrings.push(`(date_and_time >= "${search_condition.date_and_timeStart}")`);
                    } else if (date_and_timeStart.value === "" && date_and_timeEnd.value !== "") {
                        search_condition.date_and_timeEnd = date_and_timeEnd.value;
                        // Add the query string with date_and_timeEnd
                        queryStrings.push(`(date_and_time <= "${search_condition.date_and_timeEnd}")`);
                    }
                    else {

                    }
                    // End check date_and_time

                    // Start check Age
                    if (age_Start.value !== "" && age_End.value !== "") {
                        // Check if the age_Start is greater than age_End
                        if (age_Start.value > age_End.value) {
                            throw ("Age (Start) should be less than Age (End)");
                        } else {
                            search_condition.age_Start = age_Start.value;
                            search_condition.age_End = age_End.value;
                            // Add the query string with age_Start and age_End
                            queryStrings.push(`(age >= "${search_condition.age_Start}" and age <= "${search_condition.age_End}")`);
                        }
                    } else if (age_Start.value !== "" && age_End.value === "") {
                        search_condition.age_Start = age_Start.value;
                        // Add the query string with age_Start
                        queryStrings.push(`(age >= "${search_condition.age_Start}")`);
                    } else if (age_Start.value === "" && age_End.value !== "") {
                        search_condition.age_End = age_End.value;
                        // Add the query string with age_End
                        queryStrings.push(`(age <= "${search_condition.age_End}")`);
                    }
                    else {

                    }
                    // End check Age
                    // Combine the unique query strings
                    const combinedQueryString = queryStrings.join(` ${searchChoice} `);
                    // Save the search condition to the local storage
                    localStorage.setItem("search_condition", JSON.stringify(search_condition));

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

            resetButton.addEventListener("click", function (e) {
                try {
                    // clear all value in the box and local storage
                    localStorage.removeItem("search_condition");
                    const divElements = document.querySelectorAll(".kintone-dropdown-list-item-selected");
                    divElements.forEach((divElement) => {
                        divElement.classList.remove("kintone-dropdown-list-item-selected");
                    });
                    name.value = "";
                    date_of_birthStart.value = "";
                    date_of_birthEnd.value = "";
                    date_and_timeStart.value = "";
                    date_and_timeEnd.value = "";
                    age_Start.value = "";
                    age_End.value = "";
                    // redirect to the app without query
                    const url = new URL(
                        kintone.api.url("/k").split(".json")[0] + "/" + kintone.app.getId() + "/");
                    window.location.href = url.toString();
                } catch (error) {
                    alert(error);
                    hideSpinner();
                    return;
                }
            });
        } catch (error) {
            alert(error);
            hideSpinner();
            return;
        }
    });

    kintone.events.on("app.record.detail.show", function (event) {
        // Hide the Text_area field
        kintone.app.record.setFieldShown('Text_area', false)
        return event;
    });

    kintone.events.on("app.record.edit.show", function (event) {
        // Hide the Text_area field
        kintone.app.record.setFieldShown('Text_area', false)
        // Add a button to save with partial match search
        let btn = $('<button style="margin-left: 30px; height:48px; background-color:lightgreen; border:none; color:white">Save with patial match search</button>');
        // Add a click event to the button
        $(btn).on('click', function () {
            // Get the record data
            let data = kintone.app.record.get();
            // get the value of favourite_sports
            let favourite_sports = data.record.favourite_sports.value;
            // Create an array to store the combination of favourite_sports
            const arr = [];
            // Loop through the favourite_sports array
            for (let i = 0; i <= favourite_sports.length; i++) {
                for (let j = i + 1; j <= favourite_sports.length; j++) {
                    // Push the combination to the array
                    arr.push(favourite_sports.slice(i, j));
                }
            }
            // Join the array with a pipe
            let combinddata = arr.join('|');
            // Set the value of Text_area field
            data.record.Text_area.value = combinddata;
            // Set data to the record
            kintone.app.record.set(data);
        });
        // Append the button to the header space
        $('.gaia-argoui-app-edit-buttons').append(btn)
        // Return the event
        return event;
    });

    kintone.events.on("app.record.index.edit.submit", function (event) {
        // Get the record data
        let data = event.record;
        // get the value of favourite_sports
        let favourite_sports = data.favourite_sports.value;
        // Create an array to store the combination of favourite_sports
        const arr = [];
        // Loop through the favourite_sports array
        for (let i = 0; i <= favourite_sports.length; i++) {
            for (let j = i + 1; j <= favourite_sports.length; j++) {
                // Push the combination to the array
                arr.push(favourite_sports.slice(i, j));
            }
        }
        // Join the array with a pipe
        let combinddata = arr.join('|');
        // Set the value of Text_area field
        data.Text_area.value = combinddata;
        // Set data to the record
        kintone.app.record.set(data);
        // Return the event
        return event;
    });
})();
