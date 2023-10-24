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
    buttonToggle.className = "kintone-button-normal";
    buttonToggle.type = "button";
    buttonToggle.style.position = "absolute";
    buttonToggle.style.backgroundColor = "#ffd700";
    buttonToggle.style.color = "black";
    buttonToggle.innerText = "Show";

    // Set the properties for the "Search" button
    searchButton.className = "kintone-button-normal";
    searchButton.id = "searchButton";
    searchButton.innerText = "Search";
    searchButton.style.color = "white";
    searchButton.style.width = "75px";
    searchButton.style.backgroundColor = "blue";

    // Set the properties for the "Reset" button
    resetButton.className = "kintone-button-dialog-cancel";
    resetButton.innerText = "Reset";
    resetButton.style.color = "white";
    resetButton.style.width = "75px";
    resetButton.style.backgroundColor = "red";

    //div of radio
    containerRadio.className = "kintone-input-radio";
    containerRadio.style.position = "relative";
    containerRadio.style.padding = "10px";
    containerRadio.style.width = "150px";
    containerRadio.style.height = "26px";
    containerRadio.style.border = "1px solid #000";
    containerRadio.style.marginRight = "20px";

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
    let checkJson = "";
    kintone.events.on("app.record.index.show", async () => {
        if (checkJson) return;
        let fields = await kintone.api(kintone.api.url("/k/v1/app/form/fields.json", true), "GET", { app: kintone.app.getId() });

        let options = fields.properties.favourite_foods.options;

        checkJson = fields.properties;
        for (const propertyName in fields.properties) {
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
        // console.log(Object.entries(properties).length)
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
            console.log(options);
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
        // const multiSelectDropdownItems = document.querySelectorAll(".kintone-dropdown-list-item span");
        const savedSearchCondition = localStorage.getItem("search_condition");

        const multiSelectDropdownItems = document.querySelectorAll(".kintone-dropdown-list-item span");

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
                const parentDiv = this.closest(".kintone-dropdown-list-item");
                if (parentDiv) {
                    parentDiv.classList.toggle("kintone-dropdown-list-item-selected");
                }
            });
        });

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
            try {
                // define queryStrings array
                let queryStrings = [];
                let searchChoice = "and"; // Default to "AND"
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
                        queryStrings.push(`(favourite_sports like "${search_condition.favourite_sports}")`);
                    } else {
                        search_condition.partial_Match = false;
                        // Add the query string without partial match (not like)
                        queryStrings.push(`(favourite_sports not like "${search_condition.favourite_sports}")`);
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
                if (date_of_birthStart.value !== "" && date_of_birthEnd.value !== "") {
                    // Check if the date_of_birthStart is greater than date_of_birthEnd
                    if (date_of_birthStart.value > date_of_birthEnd.value) {
                        throw("Date of Birth (Start) should be less than Date of Birth (End)");
                    } else {
                        // Assign the value to the search_condition
                        search_condition.date_of_birthStart = date_of_birthStart.value;
                        search_condition.date_of_birthEnd = date_of_birthEnd.value;
                        // Add the query string with date_of_birthStart and date_of_birthEnd
                        queryStrings.push(`(date_of_birth >= "${search_condition.date_of_birthStart}" and date_of_birth <= "${search_condition.date_of_birthEnd}")`);
                    }
                }

                if (date_and_timeStart.value !== "" && date_and_timeEnd.value === "") {
                    search_condition.date_of_birthStart = date_of_birthStart.value;
                    // Add the query string with date_of_birthStart
                    queryStrings.push(`(date_of_birth >= "${search_condition.date_of_birthStart}")`);
                }

                if (date_and_timeStart.value === "" && date_and_timeEnd.value !== "") {
                    search_condition.date_of_birthEnd = date_of_birthEnd.value;
                    // Add the query string with date_of_birthEnd
                    queryStrings.push(`(date_of_birth <= "${search_condition.date_of_birthEnd}")`);
                }
                // End check date_of_birthStart

                // Start check date_and_time
                if (date_and_timeStart.value !== "" && date_and_timeEnd.value !== "") {
                    // Check if the date_and_timeStart is greater than date_and_timeEnd
                    if (date_and_timeStart.value > date_and_timeEnd.value) {
                        throw("Date and Time (Start) should be less than Date and Time (End)");
                    } else {
                        search_condition.date_and_timeStart = date_and_timeStart.value;
                        search_condition.date_and_timeEnd = date_and_timeEnd.value;
                        // Add the query string with date_and_timeStart and date_and_timeEnd
                        queryStrings.push(`(date_and_time >= "${search_condition.date_and_timeStart}" and date_and_time <= "${search_condition.date_and_timeEnd}")`);
                    }
                }


                if (date_and_timeStart.value !== "" && date_and_timeEnd.value === "") {
                    search_condition.date_and_timeStart = date_and_timeStart.value;
                    // Add the query string with date_and_timeStart
                    queryStrings.push(`(date_and_time >= "${search_condition.date_and_timeStart}")`);
                }

                if (date_and_timeStart.value === "" && date_and_timeEnd.value !== "") {
                    search_condition.date_and_timeEnd = date_and_timeEnd.value;
                    // Add the query string with date_and_timeEnd
                    queryStrings.push(`(date_and_time <= "${search_condition.date_and_timeEnd}")`);
                }
                // End check date_and_time

                // Start check Age
                if (age_Start.value !== "" && age_End.value !== "") {
                    // Check if the age_Start is greater than age_End
                    if (age_Start.value > age_End.value) {
                        throw("Age (Start) should be less than Age (End)");
                    } else {
                        search_condition.age_Start = age_Start.value;
                        search_condition.age_End = age_End.value;
                        // Add the query string with age_Start and age_End
                        queryStrings.push(`(age >= "${search_condition.age_Start}" and age <= "${search_condition.age_End}")`);
                    }
                }

                if (age_Start.value !== "" && age_End.value === "") {
                    search_condition.age_Start = age_Start.value;
                    // Add the query string with age_Start
                    queryStrings.push(`(age >= "${search_condition.age_Start}")`);
                }
                if (age_Start.value === "" && age_End.value !== "") {
                    search_condition.age_End = age_End.value;
                    // Add the query string with age_End
                    queryStrings.push(`(age <= "${search_condition.age_End}")`);
                }
                // End check Age
                // Combine the unique query strings
                const combinedQueryString = queryStrings.join(` ${searchChoice} `);
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
                alert(error);
                hideSpinner();
                return;
            }
        });

        resetButton.addEventListener("click", function (e) {
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
            const url = new URL(
                kintone.api.url("/k").split(".json")[0] + "/" + kintone.app.getId() + "/");
            window.location.href = url.toString();
        });
    });
})();
