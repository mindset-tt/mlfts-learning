jQuery.noConflict();

(async function ($, Swal10, PLUGIN_ID) {
  "use strict";

  var configJSON = {}
  var checkfields = [];
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

  // ------------------------set fieldList---------------------
  const fieldList = [];
  const dropdownOptions = [];
  const fieldDropDown = $('select[name="field_dropdown_column"]');
  const multiple_select = $(".kintoneplugin-dropdown-list");
  async function setFieldList() {

    const sortedFields = Object.values(FIELDS.properties).sort((a, b) => {
      return a.code.localeCompare(b.code);
    });

    let optionSingle = "";
    sortedFields.forEach((item) => {
      // console.log(item);
      if (item.type !== "STATUS_ASSIGNEE" && item.type !== "MODIFIER" && item.type !== "MULTI_LINE_TEXT" && item.type !== "FILE" && item.type !== "LINK" && item.type !== "USER_SELECT" && item.type !== "ORGANIZATION_SELECT" && item.type !== "GROUP_SELECT" && item.type !== "CREATOR") {
        // console.log("DFD");
        var $option = $('<option>');
        // append value to dropdown
        $option.attr("value", item.code);
        $option.attr("type", item.type);
        $option.text(`${item.label} (${item.code})`);
        fieldList.push(item.code);
        fieldDropDown.append($option.clone());
      }

      if (item.type !== "CALC") {
        optionSingle = {
          type: item.type,
          code: item.code,
        };
        dropdownOptions.push(optionSingle);
      }

      if (item.type === "CALC") {
        optionSingle = {
          type: item.type,
          code: item.code,
          format: item.format,
        };
        dropdownOptions.push(optionSingle);
      }

      if (item.type === "SINGLE_LINE_TEXT") {
        let multiplOption = `                    
          <div class="kintoneplugin-dropdown-list-item" id="${item.code}">
            <span class="kintoneplugin-dropdown-list-item-name">${item.label} (${item.code})</span>
          </div>`;
        multiple_select.append(multiplOption);
      }
    });
    return;
  }
  // ------------------------set dropdown---------------------

  // -----------------------------------------------Set config----------------------------------------------------
  const createConfig = () => {
    let config = {};
    config.initial_display = $('.Initial_display').prop('checked') ? "yes" : "no";
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
        return "noTitleName";
      }

      let multipleFields = $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no";
      let singelField = $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') select[name="field_dropdown_column"]').val();
      // console.log(multipleFields);
      if (multipleFields == "yes") {
        if (!multiselected.length) {
          return "noMultipleFields"
        }
      }
      else {
        if (singelField == "-----") {
          return "noSingelField"
        }
      }

      if (multipleFields == "no") {
        // filter data from dropdownOptions
        const fieldData = dropdownOptions.filter(function (item, index) {
          return item.code === singelField;
        })[0];
        console.log(fieldData.type);
        if (fieldData.type === "SINGLE_LINE_TEXT") {
          const fieldObject = {};
          fieldObject["row" + ct] = {
            type: fieldData.type,
            code: fieldData.code,
            label: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .title-field-column').val(),
            multipleFields: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no",
            partial: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .choiceSelected').prop('checked') ? "yes" : "no",
            newline: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .NewLine-column').prop('checked') ? "yes" : "no"
          }
          field.push(fieldObject);
          config.field = JSON.stringify(field);
        }
        else if (fieldData.type !== "SINGLE_LINE_TEXT" && fieldData.type !== "CALC") {
          const fieldnotText = {};
          fieldnotText["row" + ct] = {
            type: fieldData.type,
            code: fieldData.code,
            label: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .title-field-column').val(),
            multipleFields: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no",
            newline: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .NewLine-column').prop('checked') ? "yes" : "no"
          }
          field.push(fieldnotText);
          config.field = JSON.stringify(field);
        }
        else if (fieldData.type === "CALC") {
          const fieldCalc = {};
          fieldCalc["row" + ct] = {
            type: fieldData.type,
            code: fieldData.code,
            format: fieldData.format,
            label: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .title-field-column').val(),
            multipleFields: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no",
            newline: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .NewLine-column').prop('checked') ? "yes" : "no"
          }
          field.push(fieldCalc);
          config.field = JSON.stringify(field);
        }
      }
      if (multipleFields === "yes") {
        dropdownOptions.filter(function (item, index) {
          return item.code === multiselected[0];
        })[0];
        const multipleObject = {};
        multipleObject["row" + ct] = {
          type: "MultiFieldText",
          code: multiselected.join("-"),
          field: multiselected,
          label: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .title-field-column').val(),
          multipleFields: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no",
          partial: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .choiceSelected').prop('checked') ? "yes" : "no",
          newline: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .NewLine-column').prop('checked') ? "yes" : "no",
        };
        // console.log(multipleObject);
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

  $(document).ready(async function () {
    await setFieldList();
    tBodyContainer.addEventListener("click", setdufaultCheck);
    // Define the checkMultipleField function
    function setdufaultCheck(event) {
      const target = event.target;
      // Check if the clicked element or its parent has the class 'check'
      if (target.classList.contains("check") || target.parentElement.classList.contains("check")) {
        // Find the closest row element to the clicked checkbox
        const row = target.closest("tr");
        if (row) {
          // Find the 'multiple-select' and 'kintoneplugin-select' elements within the row
          const select_field_column = row.querySelector(".select_field_column");
          const multiSelected = row.querySelector(".kintoneplugin-dropdown-list-item-selected")
          if (target.checked) {
            if (multiSelected) {
              multiSelected.classList.remove("kintoneplugin-dropdown-list-item-selected");
            }
            select_field_column.value = "-----";
          } else {
            select_field_column.value = "-----";
            if (multiSelected) {
              multiSelected.classList.remove("kintoneplugin-dropdown-list-item-selected");
            }
          }
        }
      }
    }

    // tBodyContainer.addEventListener("click", handleSelectChange);
    // // // Event handler calling the function on 'change' event
    // $(document).on("change", ".select_field_column", handleSelectChange);
    // function handleSelectChange() {
    //   const $selectedRow = $(this).closest("tr");
    //   const selectedType = $(this).find("option:selected").attr("type");
    //   if (selectedType === "SINGLE_LINE_TEXT") {
    //     $selectedRow.find(".search-conditions").css("display", "block");
    //   } else {
    //     $selectedRow.find(".search-conditions").css("display", "none");
    //   }
    // }
    // $(document).ready(function () {
    //   $(".select_field_column").each(function () {
    //     handleSelectChange.call(this);
    //   });
    //   $(document).on("change", ".select_field_column", handleSelectChange);
    // });

    // $(".check").each(function () {
    //   checkMultipleField({ target: this });
    //   console.log({ target: this });
    // });

    // function checkMultipleField(event) {
    //   const target = event.target;
    //   if (
    //     target.classList.contains("check") ||
    //     target.parentElement.classList.contains("check")
    //   ) {
    //     const row = target.closest("tr");
    //     if (row) {
    //       // Find the 'multiple-select' and 'kintoneplugin-select' elements within the row
    //       const rowMultipleSelect = row.querySelector(".multiple-select");
    //       const rowDropdownSelect = row.querySelector(".kintoneplugin-select");
    //       const rowSearchConditions = row.querySelector(".search-conditions");
    //       if (target.checked) {
    //         console.log("checked");
    //         rowDropdownSelect.style.display = "none";
    //         rowMultipleSelect.style.display = "block";
    //         rowSearchConditions.style.display = "block";
    //       } else {
    //         // Show the dropdown_select within the clicked row
    //         rowDropdownSelect.style.display = "block";
    //         rowMultipleSelect.style.display = "none";
    //         rowSearchConditions.style.display = "none";
    //       }
    //     }
    //   }
    // }

    //------------------------------Check row nuber-------------------------------
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
    //------------------------------Check row nuber-------------------------------

    // -----------------------------Create new row---------------------------------
    function createNewRow(type, row) {
      var $rowToClone = $('#kintoneplugin-setting-tbody tr:last');
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
    // -----------------------------Create new row---------------------------------
    checkRowNumber();
    // Delegate the click event for dynamically added rows
    $("#kintoneplugin-setting-tbody").on("click", ".kintoneplugin-dropdown-list-item-name", function () {
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
          field = configSet.field ? JSON.parse(configSet.field) : [];
          fieldExist = true;
          if (fieldExist) {
            let oldConfigRow = parseInt($('#kintoneplugin-setting-tbody tr').length)
            for (let i = oldConfigRow; i > 0; i--) {
              $('#kintoneplugin-setting-tbody > tr:eq(' + i + ')').remove();
            }
          }
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
            // console.log(obj[ObjectName].partial);
            if ($('select[id$="select_field_column"] option:contains("' + obj.code + '")').length >= 0) {
              createNewRow('config', '');
              rowSet++
              $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .title-field-column').val(obj[ObjectName].label);
              $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .multipleField').prop('checked', obj[ObjectName].multipleFields === "yes" ? true : false);
              $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .select_field_column').val(obj[ObjectName].code);
              $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') input[type=radio][value="' + obj[ObjectName].partial + '"].choiceSelected').prop('checked', true);
              $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .NewLine-column').prop('checked', obj[ObjectName].newline === "yes" ? true : false);
              if (obj[ObjectName].multipleFields == "yes") {
                obj[ObjectName].field.filter(function (item, index) {
                  const multipleSelected = $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') #' + item);
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

          $(".check").each(function () {
            $(this).on("click", handleSelectChange);
            handleSelectChange({ target: this });
          });

      

          $(".select_field_column").each(function () {
            handleSelectChange.call(this);
          });
          $(document).on("change", ".select_field_column", handleSelectChange);


          // Call the checkMultipleField function on page load for elements with the class 'check'
          $(".check").each(function () {
            $(this).on("click", checkMultipleField);
            checkMultipleField({ target: this });
          });


        } else {
          alert('fieldExist')
        }
        console.log(configSet);
        checkRowNumber();
        return
      } catch (error) {
        return alert('error Setdifault confict');
      }
    }
    setDefaultConfig('default');
    // ----------------------------------------------Set dutault config--------------------------
    // $(".check").on("click",checkMultipleField);
    tBodyContainer.addEventListener("click", checkMultipleField);

    function handleSelectChange() {
      const $selectedRow = $(this).closest("tr");
      const selectedType = $(this).find("option:selected").attr("type");
      if (selectedType === "SINGLE_LINE_TEXT") {
        $selectedRow.find(".search-conditions").css("display", "block");
      } else {
        $selectedRow.find(".search-conditions").css("display", "none");
      }
    }
              // Define the checkMultipleField function
              function checkMultipleField(event) {
                console.log(event);
                const target = event.target;
                if (target.classList.contains("check") ||target.parentElement.classList.contains("check")) {
                  const row = target.closest("tr");
                  if (row) {
                    const rowMultipleSelect = row.querySelector(".multiple-select");
                    const rowDropdownSelect = row.querySelector(".kintoneplugin-select");
                    const rowSearchConditions = row.querySelector(".search-conditions");
                    if (target.checked) {
                      console.log("checked");
                      rowDropdownSelect.style.display = "none";
                      rowMultipleSelect.style.display = "block";
                      rowSearchConditions.style.display = "block";
                    } else {
                      const $selectedRow = $(this).closest("tr");
                      const selectedType = $(this).find("option:selected").attr("type");
                      if (selectedType === "SINGLE_LINE_TEXT") {
                        $selectedRow.find(".search-conditions").css("display", "block");
                      } else {
                        $selectedRow.find(".kintoneplugin-select").css("display", "block");
                        $selectedRow.find(".multiple-select").css("display", "none");
                        $selectedRow.find(".search-conditions").css("display", "none");
                        return;
                      }
                      rowDropdownSelect.style.display = "block";
                      rowMultipleSelect.style.display = "none";
                      rowSearchConditions.style.display = "none";
                    }
                  }
                }
              }
    //------------------------------------------------save button----------------------------------------------------
    $(".js-save-button").click(function (e) {
      e.preventDefault();
      createConfig();
      let configSave = createConfig();
      if (configSave === 'noTitleName') {
        Swal10.fire({
          icon: "error",
          title: "error",
          text: "Please enter the following items. title name",
        });
        return
      }
      if (configSave === 'noMultipleFields') {
        Swal10.fire({
          icon: "error",
          title: "error",
          text: "Please select the following items. select fields",
        });
        return
      }
      if (configSave === "noSingelField") {
        Swal10.fire({
          icon: "error",
          title: "error",
          text: "Please select the following items. select field",
        });
        return
      }
      kintone.plugin.app.setConfig(configSave, function () {
        Swal10.fire({
          position: 'center',
          icon: 'success',
          title: 'successfully',
          text: 'The plug-in settings have been saved. Please update the app!,',
          showConfirmButton: true,
        }).then(function () {
          window.location.href = '../../flow?app=' + kintone.app.getId() + '#section=settings'
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
      try {
        var file = $(this)[0].files[0];
        var render = new FileReader();
        render.onload = function () {
          var fileContent = render.result;
          if (!fileContent) {
            Swal10.fire({
              icon: "error",
              title: "error",
              text: "Not have  data",
            });
            return
          }
          configJSON = JSON.parse(fileContent);
          checkfields = configJSON.field ? JSON.parse(configJSON.field) : [];
          if (!configJSON.initial_display) {
            Swal10.fire({
              icon: "error",
              title: "error",
              text: "Not have initial_display",
            });
            return
          }
          else if (checkfields.length <= 0) {
            Swal10.fire({
              icon: "error",
              title: "error",
              text: "Not have fields",
            });
            return
          }
          else {
            setDefaultConfig('json');
          }
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
      var date = new Date().toJSON().slice(0, 10)
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${kintone.app.getId()}_setconfig_search_plug-in_${date}.json`;
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
    console.log(configJSON);
  });

})(jQuery, Sweetalert2_10.noConflict(true), kintone.$PLUGIN_ID);
