jQuery.noConflict();

(async function ($, Swal10, PLUGIN_ID) {
  "use strict";

  var configJSON = {}
  console.log(configJSON);

  const config = kintone.plugin.app.getConfig(PLUGIN_ID);
  console.log(config);
  const $cancelButton = document.querySelector(".js-cancel-button");
  // const $importButton = document.querySelector(".js-import-button");
  // const $importInput = document.querySelector(".js-import-input");

  // select the table row to clone
  const rowToClone = document.querySelector("#kintoneplugin-setting-tbody tr:last-child");
  const tBodyContainer = document.getElementById("kintoneplugin-setting-tbody");
  // Variable to keep track of the row count
  let rowCount = 1;


  // -------------------------Call API-------------------------
  let FIELDS;
  try {
    let param = { app: kintone.app.getId() };
    FIELDS = await kintone.api('/k/v1/preview/app/form/fields', 'GET', param);
  } catch (error) {
    return Swal10.fire('Error', error.message || error, 'error');
  }
  // console.log(FIELDS);
  // -------------------------Call API-------------------------

  // ------------------------set dropdown---------------------
  const fieldList = [];
  const singleOptions = [];
  const $fieldDropDown = $('select[name="field_dropdown_column"]');
  const multiple_select = $(".kintoneplugin-dropdown-list");
  async function set_dropdown() {
    const sortedFields = Object.values(FIELDS.properties).sort((a, b) => {
      return a.code.localeCompare(b.code);
    });

    let optionSingle = "";
    sortedFields.forEach((item) => {
      // console.log(item);

      if (item.type !=="STATUS_ASSIGNEE" && item.type !== "MODIFIER" && item.type !== "MULTI_LINE_TEXT" && item.type !== "FILE" && item.type !== "LINK" && item.type !== "USER_SELECT" && item.type !== "ORGANIZATION_SELECT" && item.type !== "GROUP_SELECT" && item.type !== "CREATOR") {
        // console.log("DFD");
        var $option = $('<option>');
        // append value to dropdown
        $option.attr("value", item.code);
        $option.attr("type", item.type);
        $option.text(`${item.label} (${item.code})`);
        fieldList.push(item.code);
        $fieldDropDown.append($option.clone());
      }
      if (item.type !== "CALC") {
        optionSingle = {
          type: item.type,
          code: item.code,
          format: "",
        };
        singleOptions.push(optionSingle);
      }
      if (item.type === "CALC") {
        optionSingle = {
          type: item.type,
          code: item.code,
          format: item.format,
        };
        singleOptions.push(optionSingle);
      }

      if (item.type === "SINGLE_LINE_TEXT") {
        // alert("ddd")
        let option = `                    
          <div class="kintoneplugin-dropdown-list-item" id="${item.code}">
            <span class="kintoneplugin-dropdown-list-item-name">${item.label} (${item.code})</span>
          </div>`;
        multiple_select.append(option);
      }

      $(document).on("change", ".select_field_column", function () {
        const $selectedRow = $(this).closest("tr"); // Find the closest row of the select element

        const selectedType = $(this).find("option:selected").attr("type");

        if (selectedType === "SINGLE_LINE_TEXT") {
          $selectedRow.find(".search-conditions").css("display", "block");
          // Show specific elements within the row for SINGLE_LINE_TEXT
        } else {
          $selectedRow.find(".search-conditions").css("display", "none");
          // Hide specific elements within the row for other types
        }
      });
    });
    return;
  }
  // ------------------------set dropdown---------------------


  // -----------------------------------------------Set config----------------------------------------------------
  const createConfig = () => {
    let config = {};
    config.initial_display = $('.Initial_display').prop('checked') ? "open" : "close";
    let row_num = $('#kintoneplugin-setting-tbody > tr').length;
    let field = [];
    for (let ct = 0; ct < row_num; ct++) {
      // console.log(ct);
      const multiselected = [];
      const selectedSpans = $(`#kintoneplugin-setting-tbody > tr:eq(${ct}) .kintoneplugin-dropdown-list-item-selected`);
      selectedSpans.each((index, span) => {
        const code = span.getAttribute('id');
        // console.log(code);
        multiselected.push(code);
      });
      let titleName = $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .title-field-column').val();
      if (!titleName) {
        Swal10.fire({
          icon: "error",
          title: "error",
          text: "Line " + [ct] + ": Please enter the following items. title name fieldLine " + [ct],
        });
        return
      }

      let multipleFields = $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no";
      let singelField = $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') select[name="field_dropdown_column"]').val();
      // console.log(multipleFields);
      if (multipleFields == "yes") {
        if (!multiselected.length) {
          Swal10.fire({
            icon: "error",
            title: "error",
            text: "Line " + [ct] + ":  Please select the following items. select fields fieldLine " + [ct],
          });
          return
        }
      }
      else {
        if (!singelField) {
          Swal10.fire({
            icon: "error",
            title: "error",
            text: "Line " + [ct] + ":  Please select the following items. select field fieldLine " + [ct],
          });
          return
        }
      }

      if (multipleFields == "no") {
        // filter data from dropdownOptions
        const fieldData = singleOptions.filter(function (item, index) {
          return item.code === singelField;
        })[0];
        const fieldObject = {};
        fieldObject[fieldData.code] = {
          type: fieldData.type,
          code: fieldData.code,
          format: fieldData.format,
          label: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .title-field-column').val(),
          multipleFields: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no",
          partial: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .partial').prop('checked') ? "yes" : "no",
          exact: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .exact').prop('checked') ? "yes" : "no",
          newline: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .NewLine-column').prop('checked') ? "yes" : "no"
        }
        field.push(fieldObject);
        config.field = JSON.stringify(field);
      }
      if (multipleFields === "yes") {
        const multiple = singleOptions.filter(function (item, index) {
          return item.code === multiselected[0];
        })[0];
        const multipleObject = {};
        multipleObject[multiselected.join("-")] = {
          type: "MultiFieldText",
          code: multiselected.join("-"),
          field: multiselected,
          label: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .title-field-column').val(),
          multipleFields: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no",
          partial: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .partial').prop('checked') ? "yes" : "no",
          exact: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .exact').prop('checked') ? "yes" : "no",
          newline: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .NewLine-column').prop('checked') ? "yes" : "no",
        };
        console.log(multipleObject);
        field.push(multipleObject);
        config.field = JSON.stringify(field);
      }
    }
    // console.log(field);
    console.log(config);
    console.log(field);
    return config;
  }
  // -----------------------------------------------Set config----------------------------------------------------



  $(document).ready(function () {
    set_dropdown();
    // check when click on multiple field
    tBodyContainer.addEventListener("click", checkMultipleField);
    // Define the checkMultipleField function
    function checkMultipleField(event) {
      const target = event.target;
      // Check if the clicked element or its parent has the class 'check'
      if (
        target.classList.contains("check") ||
        target.parentElement.classList.contains("check")
      ) {
        // Find the closest row element to the clicked checkbox
        const row = target.closest("tr");
        if (row) {
          // Find the 'multiple-select' and 'kintoneplugin-select' elements within the row
          const rowMultipleSelect = row.querySelector(".multiple-select");
          const rowDropdownSelect = row.querySelector(".kintoneplugin-select");
          const rowSearchConditions = row.querySelector(".search-conditions");
          if (target.checked) {
            // console.log("checked");
            // Hide the dropdown_select within the clicked row
            rowDropdownSelect.style.display = "none";
            // Toggle the 'multiple-select' within the clicked row
            rowMultipleSelect.style.display = "block";
            rowSearchConditions.style.display = "block";
          } else {
            // Show the dropdown_select within the clicked row
            rowDropdownSelect.style.display = "block";
            // Toggle the 'multiple-select' within the clicked row
            rowMultipleSelect.style.display = "none";
            rowSearchConditions.style.display = "none";
          }
        }
      }
    }

    $(document).ready(function () {
      function handleSelectChange() {
        const $selectedRow = $(this).closest("tr");
        const selectedType = $(this).find("option:selected").attr("type");
      
        if (selectedType === "SINGLE_LINE_TEXT") {
          $selectedRow.find(".search-conditions").css("display", "block");
          // Show specific elements within the row for SINGLE_LINE_TEXT
        } else {
          $selectedRow.find(".search-conditions").css("display", "none");
          // Hide specific elements within the row for other types
        }
      }
  
      
      // Triggering the function for each .select_field_column on page load
      $(".select_field_column").each(function() {
        handleSelectChange.call(this); // Passing the correct context using call
      });
        // Event handler calling the function on change
        $(document).on("change", ".select_field_column", handleSelectChange);


      // Call the checkMultipleField function on page load for elements with the class 'check'
      $(".check").each(function () {
        $(this).on("click", checkMultipleField);
        // Simulate click event for page load
        checkMultipleField({ target: this });
        // console.log({ target: this });
      });
    });

    // --------------------------------------------------------------------

    // check row to hide remove row button if its has one row
    function checkRowNumber() {
      const removeButtons = document.querySelectorAll("#kintoneplugin-setting-tbody > tr .removeRow");
      const rows = document.querySelectorAll("#kintoneplugin-setting-tbody > tr");
      if (rows.length === 1) {
        removeButtons[0].style.display = "none";
      } else {
        removeButtons.forEach((button) => {
          button.style.display = "inline-block";
        });
      }
    }

    function createNewRow(type, row) {
      var $rowToClone = $('#kintoneplugin-setting-tbody tr:last');
      // clone the row without its data
      // var $newRow = $rowToClone.clone(false).find('input[type!="radio"]').val('').end();
      // clone the row without its data
      const newRow = rowToClone.cloneNode(true);
      // Increment the row count
      rowCount++;
      const rowSearchConditions = newRow.querySelector(".search-conditions");

      rowSearchConditions.style.display = "none";

      // reset inputs in the new row
      const inputs = newRow.querySelectorAll('input[type="text"]');
      for (const input of inputs) {
        input.value = "";
      }

      // reset radio buttons and checkboxes in the new row
      const radioInputs = newRow.querySelectorAll('input[type="radio"]');
      radioInputs.forEach((radio, index) => {
        radio.setAttribute("name", "choice" + rowCount);
        radio.checked = index === 0; // Check the first radio button, uncheck others
      });
      const checkboxInputs = newRow.querySelectorAll('input[type="checkbox"]');
      for (const checkbox of checkboxInputs) {
        checkbox.checked = false;
      }

      // show dropdown and hide multiple-select in the new row
      newRow.querySelector(".kintoneplugin-select").style.display = "block";
      newRow.querySelector(".multiple-select").style.display = "none";

      // reset multiple select
      const selectedItems = newRow.querySelectorAll(
        ".kintoneplugin-dropdown-list-item-selected"
      );
      for (const item of selectedItems) {
        item.classList.remove("kintoneplugin-dropdown-list-item-selected");
      }

      // clone row after clicking row if adding a new row
      if (type === "new") {
        row.parent().parent().after(newRow);
      }

      if (type === 'config') {
        $rowToClone.after(newRow);
      }
    }

    checkRowNumber();

    // Delegate the click event for dynamically added radio buttons
    $("#kintoneplugin-setting-tbody").on("click", ".radio", function () {
      // console.log(
      //   "Radio button clicked in row " + ($(this).closest("tr").index() + 1)
      // );
    });
    // Delegate the click event for dynamically added rows
    $("#kintoneplugin-setting-tbody").on(
      "click",
      ".kintoneplugin-dropdown-list-item-name",
      function () {
        // Toggle the 'kintoneplugin-dropdown-list-item-selected' class for the clicked item's parent
        // console.log("multiple select");
        $(this).parent().toggleClass("kintoneplugin-dropdown-list-item-selected");
      }
    );

    // add new row in table setting
    document.addEventListener("click", function (event) {
      const target = event.target;

      // Add new row
      if (target.classList.contains("addRow")) {
        createNewRow("new", $(target));
        checkRowNumber();
      }

      // Remove selected row
      if (target.classList.contains("removeRow")) {
        target.closest("tr").remove();
        checkRowNumber();
      }
    });

    //------------------------------------------------save button----------------------------------------------------
    $(".js-save-button").click(function (e) {
      e.preventDefault();
      createConfig();
      let configSave = createConfig();
      kintone.plugin.app.setConfig(configSave, function () {
        Swal10.fire({
          position: 'center',
          icon: 'success',
          title: 'successfully',
          text: 'The plug-in settings have been saved. Please update the app!,',
          showConfirmButton: true,
        }).then(function () {
          // window.location.href = '../../flow?app=' + kintone.app.getId() + '#section=settings'
        })
      });
    });
    //------------------------------------------------save button----------------------------------------------------


    // cancel button
    $cancelButton.addEventListener("click", function () {
      window.location.href = "../../" + kintone.app.getId() + "/plugin/";
    });

    // click to call input file to import json file
    $(".js-import-button").click(function (e) {
      e.preventDefault();
      $(".js-import-input").click();
    })
    $(".js-import-input").change(function () {
      // alert("ggggggg")
      try {
        var file = $(this)[0].files[0];
        var render = new FileReader();
        render.onload = function () {
          var fileContent = render.result;
          if (!fileContent) {
            return alert('Emty data');
          }
          configJSON = JSON.parse(fileContent);
          setDefaultConfig('json')
          $(".js-import-input").val('');
          console.log(fileContent);
          console.log(configJSON);
        }
        render.readAsText(file);
      } catch (error) {
        return alert('error')
      }
    })

    $(".js-export-button").click(function (e) {
      e.preventDefault();
      configJSON = createConfig();
      var blob = new Blob([JSON.stringify(configJSON)], {
        type: 'application/json'
      });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${kintone.app.getId()}_setconfig_search_plug-in.json`;
      link.click();
    });


    // drag and drop table row
    $("#kintoneplugin-setting-tbody").sortable({
      axis: "y",
      handle: ".drag-handle",
      start: function (event, ui) {
        ui.item.addClass("dragging");
      },
      stop: function (event, ui) {
        ui.item.removeClass("dragging");
      },
    });

    // ----------------------------------------------Set dutault config--------------------------
    const setDefaultConfig = (type) => {
      try {
        let configSet = {}
        let field = [];
        var fieldExist = false
        if (type === 'default') {
          configSet = config;
          field = config.field ? JSON.parse(config.field) : [];
          fieldExist = true
        }
        // if it's import from json file
        if (type === 'json') {
          configSet = configJSON;
          field = config.field ? JSON.parse(config.field) : [];
          fieldExist = true
          if (fieldExist){
            let oldConfigRow = parseInt($('#kintoneplugin-setting-tbody tr').length)
            for (let i = oldConfigRow; i > 0; i--) {
              $('#kintoneplugin-setting-tbody > tr:eq(' + i + ')').remove();
            }
          }
          // console.log(configSet);
          // console.log(configSet.displayposition);
        }
        const rows = field.length || 0;
        var hasRow = false;
        var rowSet = 0;
        if (fieldExist) {
          let ObjectName;
          for (let i = 0; i < rows; i++) {
            const obj = field[i];
            const jQueryObject = obj;
            const objectNames = Object.keys(jQueryObject);
            ObjectName = objectNames[0];
            if ($('select[id$="select_field_column"] option:contains("' + obj.code + '")').length >= 0) {
              createNewRow('config', '');
              rowSet++
              $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .title-field-column').val(obj[ObjectName].label);
              $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .multipleField').prop('checked', obj[ObjectName].multipleFields === "yes" ? true : false);
              $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .select_field_column').val(obj[ObjectName].code);
              $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .partial').prop('checked', obj[ObjectName].partial === "yes" ? true : false);
              $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .exact').prop('checked', obj[ObjectName].exact === "yes" ? true : false);
              $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .NewLine-column').prop('checked', obj[ObjectName].newline === "yes" ? true : false);
              if (obj[ObjectName].multipleFields == "yes") {
                obj[ObjectName].field.filter(function (item, index) {
                  const multipleSelected = $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') #' + item);
                  // console.log(multipleSelected);
                  multipleSelected.addClass('kintoneplugin-dropdown-list-item-selected'); multipleSelected
                  return false;
                })[0];
              }
              hasRow = true;
            }
          }
          // console.log(configSet.initial_display);
          $('input[name=Initial_display][value="' + configSet.initial_display + '"]').prop('checked', true);
          if (hasRow) {
            $('#kintoneplugin-setting-tbody > tr:eq(0)').remove()
          }
        } else {
          alert('fieldExist')
        }
        console.log(configSet);
        checkRowNumber();
        return
      } catch (error) {
        return alert('error')
      }
    }
    setDefaultConfig('default');
    // ----------------------------------------------Set dutault config--------------------------
  });

})(jQuery, Sweetalert2_10.noConflict(true), kintone.$PLUGIN_ID);
