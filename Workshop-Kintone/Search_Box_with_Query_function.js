(function () {
    "use strict";
    const space = kintone.app.getHeaderSpaceElement();
    const buttonToggle = document.createElement("button");
    const formElement = document.createElement("div");
    const buttonHead = document.createElement("div");
    const bodyContent = document.createElement("div");
    const footerContent = document.createElement("div");
    const searchButton = document.createElement("button");
    const resetButton = document.createElement("button");
    const partialMatch = document.createElement("input");
    const radioInput2 = document.createElement("input");
    const radioItem2 = document.createElement("span");
    const radioInput1 = document.createElement("input");
    const radioItem1 = document.createElement("span");
    const containerRadio = document.createElement("div");
    const divName = document.createElement("div");
    const divDate = document.createElement("div");
    const divMultiSelect = document.createElement("div");
    const divNumber = document.createElement("div");
    const divMultiLine = document.createElement("div");
    const divInBody = document.createElement("div");
    const divDateTime = document.createElement("div");
    const radioSearchReset = document.createElement("div");
    const showText = document.createElement("div");
    const label1 = document.createElement("label");
    const label2 = document.createElement("label");

    // Set up the form
    formElement.style.position = "relative";
    formElement.style.overflow = "hidden";
    formElement.style.height = "80px";
    formElement.style.border = "2px solid #ffd700";
    formElement.style.marginRight = "60px";
    formElement.style.marginTop = "5px";
    formElement.style.marginLeft = "60px";
    formElement.style.borderRadius = "10px";
    formElement.style.transition = "height 0.5s";

    //div of button show hide
    buttonHead.style.display = "flex";
    buttonHead.style.height = "60px";
    buttonHead.style.margin = "0";
    buttonHead.style.borderRadius = "10px";
    buttonHead.style.padding = "15px";
    buttonHead.style.justifyContent = "right";
    buttonHead.appendChild(buttonToggle);
    formElement.appendChild(buttonHead);

    //form
    bodyContent.style.display = "flex";
    bodyContent.style.border = "none";
    bodyContent.style.height = "200px";
    bodyContent.style.border = "none";
    //form show text if not data
    showText.style.display = "flex";
    showText.style.height = "10px";
    showText.style.justifyContent = "center";

    //form
    divInBody.style.display = "flex";
    divInBody.style.border = "none";
    divInBody.style.height = "100px";
    divInBody.style.border = "none";

    //div of footer content
    footerContent.style.display = "flex";
    footerContent.style.height = "100px";
    footerContent.style.padding = "20px";
    footerContent.style.alignItems = "center";
    footerContent.style.justifyContent = "center";
    footerContent.style.border = "none";

    //div Name
    divName.style.display = "flex";
    divName.style.flexDirection = "column";
    divName.style.marginLeft = "225px";
    divName.style.height = "80px";
    divName.style.padding = "10";
    divName.style.alignItems = "center";
    bodyContent.appendChild(divName);

    //div multiSelect
    divMultiSelect.style.display = "flex";
    divMultiSelect.style.justifyContent = "center";
    divMultiSelect.style.height = "200px";
    divMultiSelect.style.width = "400px";
    divMultiSelect.style.marginLeft = "50px";
    divMultiSelect.style.marginBottom = "10px";
    divMultiSelect.style.alignItems = "center";
    bodyContent.appendChild(divMultiSelect);

    //div date
    divDate.style.display = "flex";
    divDate.style.justifyContent = "center";
    divDate.style.height = "80px";
    divDate.style.width = "300px";
    divDate.style.marginRight = "20px";
    bodyContent.appendChild(divDate);

    //div Multiline
    divMultiLine.style.display = "flex";
    divMultiLine.style.justifyContent = "center";
    divMultiLine.style.height = "100px";
    divMultiLine.style.width = "500px";
    divMultiLine.style.marginLeft = "180px";
    divMultiLine.style.alignItems = "center";
    divInBody.appendChild(divMultiLine);

    //number
    divNumber.style.display = "flex";
    divNumber.style.justifyContent = "center";
    divNumber.style.height = "80px";
    divNumber.style.width = "400px";
    divNumber.style.marginLeft = "85px";
    divInBody.appendChild(divNumber);
    formElement.appendChild(bodyContent);
    formElement.appendChild(showText);

    formElement.appendChild(divInBody);

    //div radioSearchReset
    radioSearchReset.style.display = "none";
    radioSearchReset.style.justifyContent = "center";
    radioSearchReset.style.height = "50px";
    radioSearchReset.style.width = "600px";
    radioSearchReset.style.marginLeft = "100px";
    radioSearchReset.style.marginTop = "20px";
    radioSearchReset.style.alignItems = "center";

    //div date time
    divDateTime.style.display = "flex";
    divDateTime.style.justifyContent = "center";
    divDateTime.style.height = "100px";
    divDateTime.style.width = "450px";
    divDateTime.style.marginLeft = "100px";
    divDateTime.style.alignItems = "center";
    footerContent.appendChild(divDateTime);
    footerContent.appendChild(radioSearchReset);
    formElement.appendChild(footerContent);

    // Set the properties for the button element
    buttonToggle.className = "kintoneplugin-button-normal";
    buttonToggle.type = "button";
    buttonToggle.style.position = "absolute";
    buttonToggle.style.backgroundColor = "#ffd700";
    buttonToggle.style.color = "black";
    buttonToggle.innerText = "Show";

    // Set the properties for the "Search" button
    searchButton.className = "kintoneplugin-button-normal";
    searchButton.id = "searchButton";
    searchButton.innerText = "Search";
    searchButton.style.color = "white";
    searchButton.style.width = "75px";
    searchButton.style.backgroundColor = "blue";

    // Set the properties for the "Reset" button
    resetButton.className = "kintoneplugin-button-dialog-cancel";
    resetButton.innerText = "Reset";
    resetButton.style.color = "white";
    resetButton.style.width = "75px";
    resetButton.style.backgroundColor = "red";

    //div of radio
    containerRadio.className = "kintoneplugin-input-radio";
    containerRadio.style.position = "relative";
    containerRadio.style.padding = "10px";
    containerRadio.style.width = "150px";
    containerRadio.style.height = "26px";
    containerRadio.style.border = "1px solid #000";
    containerRadio.style.marginRight = "20px";

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
    radioInput2.name = "logicalOperatorRadio";
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

    // -------------------------------------------------------------------event Function-----------------------------------------------------------------------------------------

    kintone.events.on("app.record.index.show", async (event) => {
        let fields = await kintone.api(kintone.api.url("/k/v1/app/form/fields.json", true), "GET", { app: kintone.app.getId() });
        const properties = fields.properties;

        for (const propertyName in properties) {
            console.log(propertyName);
            if (propertyName === "name") {
                addSingleLineText(`${propertyName}`);
            } else if (propertyName === "date_of_birth") {
                addDatePicker(`${propertyName}`);
            } else if (propertyName === "date_and_time") {
                addDateTimePicker(`${propertyName}`);
            } else if (propertyName === "favourite_sports") {
                addMultilineText(`${propertyName}`);
            } else if (propertyName === "age") {
                addNumber(`${propertyName}`);
            } else if (propertyName === "favourite_foods") {
                addMultiSelectDropdown(`${propertyName}`);
            }

        }
        radioSearchReset.style.display = "flex";


        function addSingleLineText(fieldName) {
            const inputElement = document.createElement("div");
            inputElement.classList.add("kintoneplugin-input-outer");
            inputElement.innerHTML = `
          <b>${fieldName}</b><br>
          <input class="kintoneplugin-input-text" type="text" id="singlelineText">
          `;
            divName.appendChild(inputElement);
        }

        function addDatePicker(fieldName) {
            const datePickerElement = document.createElement("div");
            datePickerElement.classList.add("kintoneplugin-input-outer");
            datePickerElement.innerHTML = `
    <div style="display: flex; justify-content: space-between;">
      <b>${fieldName} (Start)</b>
      <b>${fieldName} (End)</b>
    </div>
    </div>
    <input class="kintoneplugin-input-text" type="date" id="dateStart"> ~
    <input class="kintoneplugin-input-text" type="date" id="dateEnd">
  `;
            divDate.appendChild(datePickerElement);
        }

        function addDateTimePicker(fieldName) {
            const dateTimePickerElement = document.createElement("div");
            dateTimePickerElement.classList.add("kintoneplugin-input-outer");
            dateTimePickerElement.innerHTML = `
    <div style="display: flex; justify-content: space-between;">
      <b>${fieldName} (Start)</b>
      <b>${fieldName} (End)</b>
    </div>
    </div>
    <input class="kintoneplugin-input-text" type="datetime-local" id="dateTimeStart"> ~
    <input class="kintoneplugin-input-text" type="datetime-local" id="dateTimeEnd">
  `;
            divDateTime.appendChild(dateTimePickerElement);
        }

        function addMultilineText(fieldName) {
            const textareaElement = document.createElement("div");
            textareaElement.classList.add("kintoneplugin-input-outer");
            // Create a container div to hold both the textarea and "Partial Match" label
            const containerRadio = document.createElement("div");
            containerRadio.style.display = "flex";
            containerRadio.style.alignItems = "center";
            containerRadio.innerHTML = `
    <div style="flex-grow: 1;">
      <b>${fieldName}</b><br>
      <textarea class="kintoneplugin-input-text" type="textarea" style="width: 299px; height: 91px;" id="multilineText"></textarea>
    </div>
  `;
            partialMatch.classList.add("kintoneplugin-input-checkbox");
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

        function addNumber(fieldName) {
            const inputNumberElement = document.createElement("div");
            inputNumberElement.classList.add("kintoneplugin-input-outer");
            inputNumberElement.innerHTML = `
    <div style="display: flex; justify-content: space-between;">
      <b>${fieldName} (Start)</b>
      <b>${fieldName} (End)</b>
    </div>
    </div>
    <input class="kintoneplugin-input-text" type="number" id="ageStart"> ~
    <input class="kintoneplugin-input-text" type="number" id="ageEnd">
  `;
            divNumber.appendChild(inputNumberElement);
        }

        function addMultiSelectDropdown(fieldName) {
            const multiValue = ["Fried rice", "Pizza", "Salad", "Noodle"];
            const dropdownElement = document.createElement("div");
            dropdownElement.style.width = "150px";
            dropdownElement.classList.add("kintoneplugin-dropdown-list");
            dropdownElement.innerHTML = `<b>${fieldName}<b><br><br>`;
            multiValue.forEach((value) => {
                const dropdownItem = document.createElement("div");
                dropdownItem.classList.add("kintoneplugin-dropdown-list-item");
                dropdownItem.innerHTML = `
          <span class="kintoneplugin-dropdown-list-item-name" id="item">${value}</span>
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
        });

        radioInput2.addEventListener("click", function () {
            if (radioInput2.checked) {
                allValues.logicalOperator = "Or";
            }
        });


        function showSpinner() {
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
        }

        // Function to hide the spinner
        function hideSpinner() {
            // Hide the spinner
            $('.kintone-spinner').hide();
        }

        //   // Record List Event
        //   kintone.events.on('app.record.index.show', (event) => {
        //     // Prevent duplication of the button
        //     if (document.getElementById('my_index_button') !== null) {
        //       return;
        //     }
        //     // Set a button
        //     const myIndexButton = document.createElement('button');
        //     myIndexButton.id = 'my_index_button';
        //     myIndexButton.innerHTML = 'Click Me!';

        //     // Button onclick function
        //     myIndexButton.onclick = () => {
        //       showSpinner(); // Display the spinner
        //       setTimeout(() => {
        //         hideSpinner(); // Hide the spinner
        //       }, (3600000));
        //     };

        //     // Retrieve the header menu space element and set the button there
        //     kintone.app.getHeaderMenuSpaceElement().appendChild(myIndexButton);

        //   });


        const name = document.getElementById("singlelineText");
        const favourite_foods = allValues.multiSelect;
        const favourite_sports = document.getElementById("multilineText");
        const date_of_birthStart = document.getElementById("dateStart");
        const date_of_birthEnd = document.getElementById("dateEnd");
        const date_and_timeStart = document.getElementById("dateTimeStart");
        const date_and_timeEnd = document.getElementById("dateTimeEnd");
        const age_Start = document.getElementById("ageStart");
        const age_End = document.getElementById("ageEnd");

        const partial_Match = document.getElementById("partialMatch");
        const And = document.getElementById("radio-0");
        const Or = document.getElementById("radio-1");

        const SearchButton = document.getElementById("searchButton");
        const multiSelectDropdownItems = document.querySelectorAll(".kintoneplugin-dropdown-list-item span");
        const savedSearchCondition = localStorage.getItem("search_condition");



        if (savedSearchCondition) {
            const searchCondition = JSON.parse(savedSearchCondition);

            // Repopulate the input fields
            if (searchCondition.name) {
                name.value = searchCondition.name;
            }
            if (searchCondition.favourite_foods) {
                // Loop through the multiSelectDropdownItems
                multiSelectDropdownItems.forEach((dropdownItem) => {
                    const selectedItem = dropdownItem.textContent;

                    // Check if the item is in the saved search condition
                    if (searchCondition.favourite_foods.includes(selectedItem)) {
                        // Item is in the saved condition, select it
                        const parentDiv = dropdownItem.closest(
                            ".kintoneplugin-dropdown-list-item"
                        );
                        if (parentDiv) {
                            parentDiv.classList.add(
                                "kintoneplugin-dropdown-list-item-selected"
                            );
                        }

                        // Add it to the allValues.multiSelect array
                        allValues.multiSelect.push(selectedItem);
                    }
                });
            }

            if (searchCondition.favourite_sports) {
                favourite_sports.value = searchCondition.favourite_sports;
            }
            if (searchCondition.partial_Match) {
                partial_Match.checked = true;
            } else if (!searchCondition.partial_Match) {
                partial_Match.checked = false;
            } else {
                partial_Match.checked = true;
            }
            if (searchCondition.search_choice === "And") {
                And.checked = true;
            } else if (searchCondition.search_choice === "Or") {
                Or.checked = true;
            }
            if (searchCondition.date_of_birthStart) {
                date_of_birthStart.value = searchCondition.date_of_birthStart;
            }
            if (searchCondition.date_of_birthEnd) {
                date_of_birthEnd.value = searchCondition.date_of_birthEnd;
            }
            if (searchCondition.date_and_timeStart) {
                date_and_timeStart.value = searchCondition.date_and_timeStart;
            }
            if (searchCondition.date_and_timeEnd) {
                date_and_timeEnd.value = searchCondition.date_and_timeEnd;
            }
            if (searchCondition.age_Start) {
                age_Start.value = searchCondition.age_Start;
            }
            if (searchCondition.age_End) {
                age_End.value = searchCondition.age_End;
            }
        }

        SearchButton.addEventListener("click", function (e) {
            // define queryStrings array
            let queryStrings = [];
            let searchChoice = "and"; // Default to "AND"
            e.preventDefault();

            // Hide the form and show the spinner
            hideForm();
            showSpinner();

            // Validate the input values
            const search_condition = {};
            let date = new Date();
            let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            let todayTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
            try {
                // Validate and assign input values to search_condition object
                // Start check name
                if (name.value.trim() !== "") {
                    search_condition.name = name.value.trim();
                }
                // End check name

                // Check favourite_foods
                if (Array.isArray(favourite_foods) && favourite_foods.length > 0) {
                    search_condition.favourite_foods = favourite_foods;
                }
                // End Check favourite_foods

                //Start check favourite_sports
                if (favourite_sports.value.trim() !== "") {
                    search_condition.favourite_sports = favourite_sports.value.trim();
                    if (partial_Match.checked) {
                        search_condition.partial_Match = true;
                    } else {
                        search_condition.partial_Match = false;
                    }
                }
                // End check favourite_sports

                // Start check "And" or "Or"
                if (And.checked == true) {
                    search_condition.search_choice = And.value;
                } else if (Or.checked == true) {
                    search_condition.search_choice = Or.value;
                }
                // End check "And" or "Or"

                // Start check date_of_birth
                if (
                    date_of_birthStart.value.trim() !== "" &&
                    date_of_birthEnd.value.trim() !== ""
                ) {
                    if (date_of_birthStart.value > date_of_birthEnd.value) {
                        alert(
                            "Date of Birth (Start) should be less than Date of Birth (End)"
                        );
                        return;
                    } else {
                        search_condition.date_of_birthStart = date_of_birthStart.value;
                        search_condition.date_of_birthEnd = date_of_birthEnd.value;
                    }
                }

                if (
                    date_of_birthStart.value.trim() !== "" &&
                    date_of_birthEnd.value.trim() === ""
                ) {
                    if (date_of_birthStart.value > today) {
                        alert("Date of Birth (Start) should be less than Today");
                        return;
                    } else {
                        search_condition.date_of_birthStart = date_of_birthStart.value;
                    }
                }

                if (
                    date_of_birthStart.value.trim() === "" &&
                    date_of_birthEnd.value.trim() !== ""
                ) {
                    search_condition.date_of_birthEnd = date_of_birthEnd.value;
                }
                // End check date_of_birthStart

                // Start check date_and_time
                if (
                    date_and_timeStart.value.trim() !== "" &&
                    date_and_timeEnd.value.trim() !== ""
                ) {
                    if (date_and_timeStart.value > date_and_timeEnd.value) {
                        alert(
                            "Date and Time (Start) should be less than Date and Time (End)"
                        );
                        return;
                    } else {
                        search_condition.date_and_timeStart = date_and_timeStart.value;
                        search_condition.date_and_timeEnd = date_and_timeEnd.value;
                    }
                }

                if (
                    date_and_timeStart.value.trim() !== "" &&
                    date_and_timeEnd.value.trim() === ""
                ) {
                    if (date_and_timeStart.value > todayTime) {
                        alert("Date and Time (Start) should be less than Today");
                        return;
                    } else {
                        search_condition.date_and_timeStart = date_and_timeStart.value;
                    }
                }

                if (
                    date_and_timeStart.value.trim() === "" &&
                    date_and_timeEnd.value.trim() !== ""
                ) {
                    search_condition.date_and_timeEnd = date_and_timeEnd.value;
                }
                // End check date_and_time

                // Start check Age
                if (age_Start.value.trim() !== "" && age_End.value.trim() !== "") {
                    if (age_Start.value > age_End.value) {
                        alert("Age (Start) should be less than Age (End)");
                        return;
                    } else {
                        search_condition.age_Start = age_Start.value;
                        search_condition.age_End = age_End.value;
                    }
                }

                if (age_Start.value.trim() !== "" && age_End.value.trim() === "") {
                    search_condition.age_Start = age_Start.value;
                }
                if (age_Start.value.trim() === "" && age_End.value.trim() !== "") {
                    search_condition.age_End = age_End.value;
                }
                // End check Age

                // Loop through the search_condition object
                for (const [key, val] of Object.entries(search_condition)) {
                    // Create the query string based on the key and value
                    let queryString = "";
                    // Check the key and assign the query string
                    switch (key) {
                        // check name
                        case "name":
                            // Add the query string with Name field
                            queryString = `(name in ("${val}"))`;
                            break;
                        // check favorite_sports
                        case "favourite_sports":
                            // Check if the partial_Match is true or false
                            if (search_condition.partial_Match) {
                                // Add the query string with partial match (like)
                                queryString = `(favourite_sports like "${val}")`;
                            } else {
                                // Add the query string without partial match (not like)
                                queryString = `(favourite_sports not like "${val}")`;
                            }
                            break;
                        // check favourite_foods
                        case "favourite_foods":
                            // Convert the array to a string
                            const jsonString = JSON.stringify(val);
                            // Add the query string with favourite_foods field
                            queryString = `(favourite_foods in (${jsonString.slice(1, -1)}))`;
                            break;
                        // check date_and_time
                        case "date_and_timeStart":
                            // Check if the date_and_timeEnd is in the search_condition object
                            if (key in search_condition && "date_and_timeEnd" in search_condition) {
                                // Add the query string with date_and_timeStart and date_and_timeEnd
                                queryString = `(date_and_time >= "${val}" and date_and_time <= "${search_condition.date_and_timeEnd}")`;
                            } else {
                                // Add the query string with date_and_timeStart
                                queryString = `(date_and_time >= "${val}")`;
                            }
                            break;
                        case "date_and_timeEnd":
                            // Check if the date_and_timeStart is in the search_condition object
                            if (key in search_condition && "date_and_timeStart" in search_condition) {
                                // Add the query string with date_and_timeStart and date_and_timeEnd
                                queryString = `(date_and_time >= "${search_condition.date_and_timeStart}" and date_and_time <= "${val}")`;
                            }
                            else {
                                // Add the query string with date_and_timeEnd
                                queryString = `(date_and_time <= "${val}")`;
                            }
                            break;
                        // check age
                        case "age_Start":
                            // Check if the age_End is in the search_condition object
                            if (key in search_condition && "age_End" in search_condition) {
                                // Add the query string with age_Start and age_End
                                queryString = `(age >= "${val}" and age <= "${search_condition.age_End}")`;
                            } else {
                                // Add the query string with age_Start
                                queryString = `(age >= "${val}")`;
                            }
                            break;
                        case "age_End":
                            // Check if the age_Start is in the search_condition object
                            if ("age_Start" in search_condition) {
                                // Add the query string with age_Start and age_End
                                queryString = `(age >= "${search_condition.age_Start}" and age <= "${val}")`;
                            } else {
                                // Add the query string with age_End
                                queryString = `(age <= "${val}")`;
                            }
                            break;
                        // check date_of_birth
                        case "date_of_birthStart":
                            // Check if the date_of_birthEnd is in the search_condition object
                            if (key in search_condition && "date_of_birthEnd" in search_condition) {
                                // Add the query string with date_of_birthStart and date_of_birthEnd
                                queryString = `(date_of_birth >= "${val}" and date_of_birth <= "${search_condition.date_of_birthEnd}")`;
                            }
                            else {
                                // Add the query string with date_of_birthStart
                                queryString = `(date_of_birth >= "${val}")`;
                            }
                            break;
                        case "date_of_birthEnd":
                            // Check if the date_of_birthStart is in the search_condition object
                            if ("date_of_birthStart" in search_condition) {
                                // Add the query string with date_of_birthStart and date_of_birthEnd
                                queryString = `(date_of_birth >= "${search_condition.date_of_birthStart}" and date_of_birth <= "${val}")`;
                            }
                            else {
                                // Add the query string with date_of_birthEnd
                                queryString = `(date_of_birth <= "${val}")`;
                            }
                            break;
                        // check search_choice
                        case "search_choice":
                            // Check if the value is "And" or "Or"
                            if (val === "Or") {
                                // Set the searchChoice to "or"
                                searchChoice = "or";
                            }
                            break;
                        default:
                            break;
                    }
                    // Add the query string to the queryStrings array
                    if (queryString !== "") {
                        queryStrings.push(queryString);
                    }
                }
                // Remove duplicates using Set
                const uniqueConditions = [...new Set(queryStrings)];
                // Combine the unique query strings
                const combinedQueryString = uniqueConditions.join(` ${searchChoice} `);
                // Save the search condition to the local storage
                localStorage.setItem("search_condition", JSON.stringify(search_condition));
                // Create the search URL
                const url = new URL(kintone.api.url('/k').split('.json')[0] + "/" + kintone.app.getId() + "/");
                // Add the query string to the URL
                url.searchParams.append("query", combinedQueryString);
                console.log(combinedQueryString);
                // Redirect to the search URL
                window.location.href = url.toString();
            } catch (error) {
                console.log(error);
            }
        });

        resetButton.addEventListener("click", function (e) {
            localStorage.removeItem("search_condition");
            const divElements = document.querySelectorAll(".kintoneplugin-dropdown-list-item-selected");
            divElements.forEach((divElement) => {
                divElement.classList.remove("kintoneplugin-dropdown-list-item-selected");
            });
            name.value = "";
            date_of_birthStart.value = "";
            date_of_birthEnd.value = "";
            date_and_timeStart.value = "";
            date_and_timeEnd.value = "";
            age_Start.value = "";
            age_End.value = "";
            const url = new URL(
                kintone.api.url("/k").split(".json")[0] + "/" + kintone.app.getId() + "/");
            window.location.href = url.toString();
        });
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

    });
})();
