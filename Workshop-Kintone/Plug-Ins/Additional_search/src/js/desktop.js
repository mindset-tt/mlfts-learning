(function ($, PLUGIN_ID) {
      "use strict";
      // Check if configuration is already fetched
      let ALLVALUES = { multiSelect: [], search_choice: "and" };
      let BODYCONTENT = "";
      let RADIOSEARCHRESET = "";
      let FOOTERCONTENT = "";
      let RADIOINPUT1 = "";
      let RADIOINPUT2 = "";
      let FORMELEMENT = ""; // Declare these letiables in a higher scope
      let APPFIELDS = {};
      let APPSTATUS = {};
      // Fetch configuration from the plugin
      let JSONFROMOBJECT = kintone.plugin.app.getConfig(PLUGIN_ID);
      const OBJECTFIELD = JSON.parse(JSONFROMOBJECT.fields);
      console.log(OBJECTFIELD);
      let formCreated = false;

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
      async function handleIndexShow(event) {
            // Check if the form has already been created
            if (!formCreated) {
                  generateSearchForm();
                  await fetchAppFieldsAndStatus();
                  attachFormEventListeners();
                  formCreated = true; // Set the flag to true once the form is created
            }
            // Additional logic if needed...
      }

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

            FORMELEMENT = createElem("div", ["form-container"]);
            const buttonHead = createElem("div", ["buttonHead"]);
            BODYCONTENT = createElem("div", ["bodyContent"]);
            FOOTERCONTENT = createElem("div", ["footerContent"]);
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

            RADIOINPUT1 = createElem("input", [], {
                  type: "radio",
                  name: "logicalOperatorRadio",
                  value: "And",
                  id: "radio-And",
                  checked: true,
            });

            RADIOINPUT2 = createElem("input", [], {
                  type: "radio",
                  name: "logicalOperatorRadioF",
                  value: "Or",
                  id: "radio-Or",
            });

            const label1 = createElem("label", [], {
                  htmlFor: "radio-And",
                  textContent: "AND",
            });

            const label2 = createElem("label", [], {
                  htmlFor: "radio-Or",
                  textContent: "OR",
            });

            RADIOSEARCHRESET = createElem("div", ["radioSearchReset"]);
            const radioElements = [radioItem1, radioItem2];
            const labels = [label1, label2];
            const radioInputs = [RADIOINPUT1, RADIOINPUT2];

            radioElements.forEach((radio, index) => {
                  radio.append(radioInputs[index]);
                  radio.append(labels[index]);
            });

            containerRadio.append(...radioElements);
            RADIOSEARCHRESET.append(containerRadio, searchButton, resetButton);
            FORMELEMENT.append(buttonHead, BODYCONTENT, FOOTERCONTENT);
            buttonHead.append(buttonToggle);
            FOOTERCONTENT.append(RADIOSEARCHRESET);
            space.append(FORMELEMENT);
      }

      // Function to fetch app fields and status
      async function fetchAppFieldsAndStatus() {
            try {
                  // Fetch app fields
                  const appFieldsResponse = await kintone.api(kintone.api.url("/k/v1/app/form/fields.json", true), "GET", { app: kintone.app.getId() });
                  APPFIELDS = appFieldsResponse.properties;
                  // Fetch app status
                  const appStatusResponse = await kintone.api(kintone.api.url("/k/v1/app/status.json", true), "GET", { app: kintone.app.getId() });
                  APPSTATUS = appStatusResponse.states;

                  // Further processing or actions with the fetched data
                  processFetchedData(APPFIELDS, APPSTATUS);
            } catch (error) {
                  console.error("Error fetching app fields and status:", error);
                  // Handle errors, show messages, or perform necessary actions
            }
      }

      // Function to process fetched data and create form elements
      function processFetchedData(appFields, appStatus) {
            try {
                  for (let i = 0; i < OBJECTFIELD.length; i++) {
                        switch (OBJECTFIELD[i].fieldType) {
                              case "MultiFieldText":
                              case "SINGLE_LINE_TEXT":
                                    addSingleLineText(OBJECTFIELD[i].titleName, OBJECTFIELD[i].fieldCode.join('-'));
                                    break;
                              case "CALC":
                              case "NUMBER":
                              case "RECORD_NUMBER":
                                    addRangeInputField(OBJECTFIELD[i].titleName, OBJECTFIELD[i].fieldCode[0], "number");
                                    break;
                              case "DATE":
                                    addRangeInputField(OBJECTFIELD[i].titleName, OBJECTFIELD[i].fieldCode[0], "date");
                                    break;
                              case "CREATED_TIME":
                              case "UPDATED_TIME":
                              case "DATETIME":
                                    addRangeInputField(OBJECTFIELD[i].titleName, OBJECTFIELD[i].fieldCode[0], "datetime-local");
                                    break;
                              case "TIME":
                                    addRangeInputField(OBJECTFIELD[i].titleName, OBJECTFIELD[i].fieldCode[0], "time");
                                    break;
                              case "MULTI_SELECT":
                              case "DROP_DOWN":
                              case "CHECK_BOX":
                              case "RADIO_BUTTON":
                                    let options = appFields[OBJECTFIELD[i].fieldCode[0]].options;
                                    addMultiSelectDropdown(OBJECTFIELD[i].titleName, options, OBJECTFIELD[i].fieldType, OBJECTFIELD[i].fieldCode[0]);
                                    break;
                              case "STATUS":
                                    let statusOptions = appStatus;
                                    addMultiSelectDropdown(OBJECTFIELD[i].titleName, statusOptions, OBJECTFIELD[i].fieldType, OBJECTFIELD[i].fieldCode[0]);
                                    break;
                              default:
                                    break;
                        }
                        if (OBJECTFIELD[i].newline === "yes") {
                              BODYCONTENT = document.createElement("div");
                              BODYCONTENT.classList.add("bodyContent");
                              FORMELEMENT.appendChild(BODYCONTENT);
                        }
                  }
                  FOOTERCONTENT.appendChild(RADIOSEARCHRESET);
                  FORMELEMENT.append(FOOTERCONTENT);
                  // add radio button to search container
                  RADIOSEARCHRESET.style.display = "flex";
            } catch (error) {
                  alert(error);
                  console.log(error);
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
            console.log(BODYCONTENT);
            BODYCONTENT.appendChild(divName);
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
                  BODYCONTENT.appendChild(container);
            }
      }
      function addMultiSelectDropdown(fieldName, options, fieldtype, fieldId) {
            let divMultiSelect = document.createElement('div');
            divMultiSelect.classList.add('divMultiSelect');

            let dropdownElement = document.createElement('div');
            dropdownElement.style.width = '150px';

            let dropdownTitle = document.createElement('div');
            dropdownTitle.classList.add('divMultiSelectTitle');
            dropdownTitle.innerHTML = `<b>${fieldName}</b><br>`;

            let dropdownMultiSelect = document.createElement('div');
            dropdownMultiSelect.classList.add('kintoneplugin-dropdown-list');
            dropdownMultiSelect.id = 'MultipleSelect' + fieldId;

            checkMultipleSelect(fieldtype, options, dropdownElement);

            dropdownMultiSelect.appendChild(dropdownElement);
            divMultiSelect.appendChild(dropdownTitle);
            divMultiSelect.appendChild(dropdownMultiSelect);
            BODYCONTENT.appendChild(divMultiSelect);
      }

      function checkMultipleSelect(fieldtype, options, dropdownElement) {
            Object.values(options).forEach((value) => {
                  let dropdownItem = document.createElement('div');
                  dropdownItem.classList.add('kintoneplugin-dropdown-list-item');

                  let span = document.createElement('span');
                  span.classList.add('kintoneplugin-dropdown-list-item-name');

                  if (fieldtype === 'STATUS') {
                        span.id = value.name;
                        span.textContent = value.name;
                  } else {
                        span.id = value.label;
                        span.textContent = value.label;
                  }

                  dropdownItem.appendChild(span);
                  dropdownElement.appendChild(dropdownItem);
            });
      }

      // Function to attach form event listeners
      async function attachFormEventListeners() {
            $("#buttonToggle").on("click", () => {
                  if ($(".form-container").css("height") === "80px") {
                        showForm();
                  } else {
                        hideForm();
                  }
            });

            if (JSONFROMOBJECT.initial_display === "yes") {
                  showForm();
                  $("#buttonToggle").text("Hide");
            } else {
                  hideForm();
                  $("#buttonToggle").text("Show");
            }

            $("#radio-And").on("click", () => {
                  $("#radio-And").prop("checked", true);
                  $("#radio-Or").prop("checked", false);
                  ALLVALUES.search_choice = "and";
            });

            $("#radio-Or").on("click", () => {
                  $("#radio-Or").prop("checked", true);
                  $("#radio-And").prop("checked", false);
                  ALLVALUES.search_choice = "or";
            });

            $(".kintoneplugin-dropdown-list-item span").on("click", multiSelectCheck());

            const savedSearchCondition = sessionStorage.getItem('search_condition');
            checkValueFromSession(savedSearchCondition);

            // Attach event listeners
            $("#searchButton").on("click", handleSearchButton);
            $("#resetButton").on("click", handleResetButton);
      }

      function multiSelectCheck() {
            return function () {
                  const selectedItem = $(this).text();
                  const itemIndex = ALLVALUES.multiSelect.indexOf(selectedItem);
                  if (itemIndex !== -1) {
                        ALLVALUES.multiSelect.splice(itemIndex, 1);
                  } else {
                        ALLVALUES.multiSelect.push(selectedItem);
                  }

                  const parentDiv = $(this).closest(".kintoneplugin-dropdown-list-item");
                  console.log(ALLVALUES.multiSelect);
                  if (parentDiv) {
                        parentDiv.toggleClass("kintoneplugin-dropdown-list-item-selected");
                  }
            };
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
                        for (let i = 0; i < OBJECTFIELD.length; i++) {
                              switch (OBJECTFIELD[i].fieldType) {
                                    case "MultiFieldText":
                                    case "SINGLE_LINE_TEXT":
                                          singleLineMulti = $("#singleLineText-" + OBJECTFIELD[i].fieldCode.join('-'));
                                          singleLineMulti.val(searchCondition[OBJECTFIELD[i].fieldCode.join('-')]);
                                    case "NUMBER":
                                    case "DATE":
                                    case "DATETIME":
                                    case "TIME":
                                    case "CREATED_TIME":
                                    case "RECORD_NUMBER":
                                    case "UPDATED_TIME":
                                    case "CALC":
                                          if (searchCondition[OBJECTFIELD[i].fieldCode[0] + "Start"]) {
                                                $(`#${OBJECTFIELD[i].fieldCode[0]}Start`).val(searchCondition[OBJECTFIELD[i].fieldCode[0] + "Start"]);
                                          }
                                          if (searchCondition[OBJECTFIELD[i].fieldCode[0] + "End"]) {
                                                $(`#${OBJECTFIELD[i].fieldCode[0]}End`).val(searchCondition[OBJECTFIELD[i].fieldCode[0] + "End"]);
                                          }
                                          break;
                                    case "MULTI_SELECT":
                                    case "DROP_DOWN":
                                    case "CHECK_BOX":
                                    case "RADIO_BUTTON":
                                    case "STATUS":
                                          getMultiselectFromSession(searchCondition, i);
                                          break;
                                    default:
                                          break;
                              }
                        }
                        if (searchCondition.search_choice === "and") {
                              // radioinput1 checked in jQuery
                              $("#radio-And").prop("checked", true);
                              $("#radio-Or").prop("checked", false);
                        }
                        if (searchCondition.search_choice === "or") {
                              // radioinput2 checked in jQuery
                              $("#radio-Or").prop("checked", true);
                              $("#radio-And").prop("checked", false);
                        }
                  }
            } catch (error) {
                  alert(error);
                  return;
            }
      }

      // Function to get multiselect from session
      function getMultiselectFromSession(searchCondition, i) {
            if (searchCondition[OBJECTFIELD[i].fieldCode[0]]) {
                  searchCondition[OBJECTFIELD[i].fieldCode[0]].forEach((value) => {
                        const parentDiv = $(`.kintoneplugin-dropdown-list-item`).filter(function () {
                              return $(this).text().trim().toLowerCase() === value.trim().toLowerCase();
                        });
                        parentDiv.addClass("kintoneplugin-dropdown-list-item-selected");
                  });
            }
      }

      //Function to handle search button
      async function handleSearchButton() {
            hideForm();
            showSpinner();
            await performSearch();
      }

      async function performSearch() {
            try {
                  const search_condition = {};
                  const queryStrings = [];
                  let searchChoice = "and";
                  for (let i = 0; i < OBJECTFIELD.length; i++) {
                        switch (OBJECTFIELD[i].fieldType) {
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
                                    multipleSelectSearch(i, search_condition, queryStrings);
                                    break;
                              default:
                                    break;
                        }
                  }

                  console.log(ALLVALUES.search_choice);
                  search_condition.search_choice = ALLVALUES.search_choice;
                  const combinedQueryString = queryStrings.filter(Boolean).join(` ${ALLVALUES.search_choice} `);
                  sessionStorage.setItem("search_condition", JSON.stringify(search_condition));
                  window.location.href = '../../' + "k" + "/" + kintone.app.getId() + "/" + "?query=" + combinedQueryString;
            } catch (error) {
                  alert(error);
                  hideSpinner();
                  return;
            }
      }

      // search single line text field function
      function stringLineSearch(i, search_condition, queryStrings) {
            let singleLineMulti = $("#singleLineText-" + OBJECTFIELD[i].fieldCode.join('-'));
            if (singleLineMulti.val()) {
                  search_condition[OBJECTFIELD[i].fieldCode.join('-')] = singleLineMulti.val();
                  let searchString = '';
                  if (OBJECTFIELD[i].fieldPatail === "yes") {
                        searchString = '(' + OBJECTFIELD[i].fieldCode.map(code => `${code} like "${search_condition[OBJECTFIELD[i].fieldCode.join('-')]}"`).join(' or ') + ')';
                  } else {
                        searchString = '(' + OBJECTFIELD[i].fieldCode.map(code => `${code} = "${search_condition[OBJECTFIELD[i].fieldCode.join('-')]}"`).join(' or ') + ')';
                  }
                  queryStrings.push(searchString);
            }
      }

      // search range input field function
      function rangeSearch(i, search_condition, queryStrings) {
            let numberfieldStart = $(`#${OBJECTFIELD[i].fieldCode[0]}Start`);
            let numberfieldEnd = $(`#${OBJECTFIELD[i].fieldCode[0]}End`);
            if (numberfieldStart.val() !== "" && numberfieldEnd.val() !== "") {
                  if (numberfieldStart.val() > numberfieldEnd.val()) {
                        throw (`Start value of ${OBJECTFIELD[i].fieldCode[0]} must be less than End value`);
                  }
                  else {
                        search_condition[OBJECTFIELD[i].fieldCode[0] + "Start"] = numberfieldStart.val();
                        search_condition[OBJECTFIELD[i].fieldCode[0] + "End"] = numberfieldEnd.val();

                        queryStrings.push(`(${OBJECTFIELD[i].fieldCode[0]} >= "${search_condition[OBJECTFIELD[i].fieldCode[0] + "Start"]}" and ${OBJECTFIELD[i].fieldCode[0]} <= "${search_condition[OBJECTFIELD[i].fieldCode[0] + "End"]}")`);
                  }
            }
            else if (numberfieldStart.val() !== "" && numberfieldEnd.val() === "") {
                  search_condition[OBJECTFIELD[i].fieldCode[0] + "Start"] = numberfieldStart.val();
                  queryStrings.push(`(${OBJECTFIELD[i].fieldCode[0]} >= "${search_condition[OBJECTFIELD[i].fieldCode[0] + "Start"]}")`);
            }
            else if (numberfieldStart.val() === "" && numberfieldEnd.val() !== "") {
                  search_condition[OBJECTFIELD[i].fieldCode[0] + "End"] = numberfieldEnd.val();
                  queryStrings.push(`(${OBJECTFIELD[i].fieldCode[0]} <= "${search_condition[OBJECTFIELD[i].fieldCode[0] + "End"]}")`);
            }
      }

      // search multi select dropdown function
      function multipleSelectSearch(i, search_condition, queryStrings) {
            const multiselectDropdown = $(`#MultipleSelect${OBJECTFIELD[i].fieldCode[0]}`);
            console.log($(`#MultipleSelect${OBJECTFIELD[i].fieldCode[0]}`).closest(".kintoneplugin-dropdown-list-item-selected"))
            const multiselectDropdownArrayValue = multiselectDropdown.find(".kintoneplugin-dropdown-list-item-selected").map(function () {
                  console.log($(this));
                  return $(this).text();
            }).get();
            console.log(multiselectDropdownArrayValue);
            if (multiselectDropdownArrayValue.length > 0) {
                  search_condition[OBJECTFIELD[i].fieldCode[0]] = multiselectDropdownArrayValue;
                  queryStrings.push(`(${OBJECTFIELD[i].fieldCode[0]} in ("${multiselectDropdownArrayValue.join('","')}"))`);
            }
      }

      // Function to handle reset button
      function handleResetButton() {
            try {
                  ALLVALUES = { multiSelect: [] };
                  $(".kintoneplugin-input-text").val("");
                  $(".kintoneplugin-dropdown-list-item-selected").removeClass("kintoneplugin-dropdown-list-item-selected");
                  sessionStorage.removeItem("search_condition");
                  window.location.href = '../../' + "k" + "/" + kintone.app.getId() + "/?view=20";
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