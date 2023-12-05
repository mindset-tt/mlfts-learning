jQuery.noConflict();

(async function ($, Swal10, PLUGIN_ID) {
  "use strict";
  const config = kintone.plugin.app.getConfig(PLUGIN_ID);
  const rowToClone = document.querySelector("#kintoneplugin-setting-tbody tr:last-child");
  let configJSON = {}
  let checkfields = [];
  let rowCount = 1;
  // -------------------------------Call API-------------------------
  let FIELDS;
  try {
    let param = { app: kintone.app.getId() };
    FIELDS = await kintone.api('/k/v1/preview/app/form/fields', 'GET', param);
  } catch (error) {
    return Swal10.fire('Error', error.message || error, 'error');
  }
  // -------------------------------Call API-------------------------

  // -----------------------------set fieldList---------------------
  const dropdownOptions = [];
  const fieldDropDown = $('select[name="field_dropdown_column"]');
  const multiple_select = $(".kintoneplugin-dropdown-list");
  async function setFieldList() {
    const sortedFields = Object.values(FIELDS.properties).sort((a, b) => {
      return a.code.localeCompare(b.code);
    });
    let optionDropdown = "";
    sortedFields.forEach((item) => {
      // --------Select fields out of 9 fields------------------
      if (item.type !== "STATUS_ASSIGNEE" && item.type !== "MODIFIER" && item.type !== "MULTI_LINE_TEXT" && item.type !== "FILE" && item.type !== "LINK" && item.type !== "USER_SELECT" && item.type !== "ORGANIZATION_SELECT" && item.type !== "GROUP_SELECT" && item.type !== "CREATOR") {
        let $option = $('<option>');
        $option.attr("value", item.code);
        $option.attr("type", item.type);
        $option.text(`${item.label} (${item.code})`);
        fieldDropDown.append($option.clone());
      }
      if (item.type) {
        optionDropdown = {
          type: item.type,
          code: item.code,
        };
        dropdownOptions.push(optionDropdown);
      }
      if (item.type === "SINGLE_LINE_TEXT") {
        let multiplOption = `                    
          <div class="kintoneplugin-dropdown-list-item" id="${item.code}">
            <span class="kintoneplugin-dropdown-list-item-name">${item.label} (${item.code})</span>
          </div>`;
        multiple_select.append(multiplOption);
      }
    });
    setDefaultConfig('default');
    return;
  }
  // -----------------------------set fieldList---------------------

  // --------------------------Set dutault config----------------------
  const setDefaultConfig = (type) => {
    try {
      let configSet = {}
      let fields = [];
      let fieldExist = false
      // --------------------Check type default---------------------------------
      if (type === 'default') {
        configSet = config;
        fields = config.fields ? JSON.parse(config.fields) : [];
        fieldExist = true;
      }
      // --------------------Check type default---------------------------------

      // ---------------------Check type json-----------------------------------
      if (type === 'json') {
        configSet = configJSON;
        fields = configSet.fields ? JSON.parse(configSet.fields) : [];
        fieldExist = true;
        if (fieldExist) {
          let oldConfigRow = parseInt($('#kintoneplugin-setting-tbody tr').length)
          for (let i = oldConfigRow; i > 0; i--) {
            $('#kintoneplugin-setting-tbody > tr:eq(' + i + ')').remove();
          }
        }
      }
      // ---------------------Check type json-----------------------------------

      //----------------------Set defaule data----------------------------------
      let rows = fields.length || 0;
      let hasRow = false;
      let rowSet = 0;
      if (fieldExist) {
        for (let i = 0; i < rows; i++) {
          const obj = fields[i];
          if ($('select[id$="select_field_column"] option:contains("' + obj.fieldCode + '")').length >= 0) {
            createNewRow('config', '');
            rowSet++
            $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .title-field-column').val(obj.titleName);
            $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .multipleField').prop('checked', obj.multipleFields === "yes" ? true : false);
            $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') input[type=radio][value="' + obj.partial + '"].choiceSelected').prop('checked', true);
            $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .NewLine-column').prop('checked', obj.newline === "yes" ? true : false);
            if (obj.multipleFields == "yes") {
              obj.fieldCode.filter(function (item, index) {
                const multipleSelected = $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') #' + item);
                multipleSelected.addClass('kintoneplugin-dropdown-list-item-selected');
                return false;
              })[0];
            $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .select_field_column').val("-----");
            }
            else {
              $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .select_field_column').val(obj.fieldCode);
            }

            hasRow = true;
          }
        }
        $('input[name=Initial_display][value="' + configSet.initial_display + '"]').prop('checked', true);
        if (hasRow) {
          $('#kintoneplugin-setting-tbody > tr:eq(0)').remove()
        }

        $(".select_field_column").each(function () {
          handleSelectChange.call(this);
        });

        $(".check").each(function () {
          checkMultipleField({ target: this });
        });
      }
      //----------------------Set defaule data----------------------------------
      checkRowNumber();
      return
    } catch (error) {
      Swal10.fire({
        icon: "error",
        title: "error",
        text: "error Setdifault confict",
      });
      return
    }
  }
  // -------------------------Set default config-----------------------

  // -----------------set default dropdown and multiselect--------------
  function handleSelectChange() {
    const $selectedRow = $(this).closest("tr");
    const selectedType = $(this).find("option:selected").attr("type");
    if (selectedType === "SINGLE_LINE_TEXT") {
      $selectedRow.find(".search-conditions").css("display", "block");
    } else {
      $selectedRow.find(".search-conditions").css("display", "none");
    }
  }
  // -----------------set default dropdown and multiselect--------------

  // -----------------set default dropdown and multiselect-------------
  function checkMultipleField(event) {
    const target = event.target;
    if (target.classList.contains("check") || target.parentElement.classList.contains("check")) {
      const row = target.closest("tr");
      if (row) {
        const rowMultipleSelect = row.querySelector(".multiple-select");
        const rowDropdownSelect = row.querySelector(".kintoneplugin-select");
        const rowSearchConditions = row.querySelector(".search-conditions");
        if (target.checked) {
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
  // ------------------set default dropdown and multiselect------------

  // ------------------------------Set config-------------------------
  const createConfig = () => {
    let config = {};
    config.initial_display = $('.Initial_display').prop('checked') ? "yes" : "no";
    let row_num = $('#kintoneplugin-setting-tbody > tr');
    let fields = [];
    for (let ct = 0; ct < row_num.length; ct++) {
      const dropDownSelected = [];
      const multiselected = [];
      const selectedSpans = $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .kintoneplugin-dropdown-list-item-selected');
      const multipleFields = $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no";
      const selectedDropdown = $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .select_field_column').val();
      if (selectedDropdown !== "-----") {
        dropDownSelected.push(selectedDropdown);
      }
      console.log(selectedDropdown);
      selectedSpans.each((index, span) => {
        const code = span.getAttribute('id');
        multiselected.push(code);
      });
      let titleName = $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .title-field-column').val();
      if (!titleName) {
        Swal10.fire({
          icon: "error",
          title: "error",
          text: "Line: " + [ct + 1] + " Please enter the following items.・Display item Title name.",
        });
        return
      }
      if (multipleFields == "yes") {
        if (!multiselected.length) {
          Swal10.fire({
            icon: "error",
            title: "error",
            text: "Line: " + [ct + 1] + " Please enter the following items.・Display item Fields (MultipleFields).",
          });
          return
        }
        const fieldList = {
          fieldType: "MultiFieldText",
          fieldCode: multiselected,//join("-"),
          titleName: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .title-field-column').val(),
          multipleFields: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no",
          partial: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .choiceSelected').prop('checked') ? "yes" : "no",
          newline: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .NewLine-column').prop('checked') ? "yes" : "no",
        };
        fields.push(fieldList);
      }
      if (multipleFields == "no") {
        if (selectedDropdown == "-----") {
          Swal10.fire({
            icon: "error",
            title: "error",
            text: "Line: " + [ct + 1] + " Please enter the following items.・Display item Fields (Dropdown).",
          });
          return
        }

        const duplicate = row_num.toArray().some(function(row, innerIndex) {
          return ct !== innerIndex && selectedDropdown === $(row_num[innerIndex]).find(".select_field_column").val();
        });
        if (duplicate) {
          Swal10.fire({
            icon: "error",
            title: "Error",
            text: "Line: " + (ct + 1) + " Please select fields that do not overlap (Dropdown).",
          });
          return;
        }

        const fieldData = dropdownOptions.filter(function (item, index) {
          return item.code === selectedDropdown;
        })[0];
        if (fieldData.type === "SINGLE_LINE_TEXT") {
          const fieldList = {
            fieldType: fieldData.type,
            fieldCode: dropDownSelected,
            titleName: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .title-field-column').val(),
            multipleFields: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no",
            partial: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .choiceSelected').prop('checked') ? "yes" : "no",
            newline: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .NewLine-column').prop('checked') ? "yes" : "no"
          }
          fields.push(fieldList);
        }
        else if (fieldData.type !== "SINGLE_LINE_TEXT") {
          const fieldList = {
            fieldType: fieldData.type,
            fieldCode: dropDownSelected,
            titleName: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .title-field-column').val(),
            multipleFields: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no",
            newline: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .NewLine-column').prop('checked') ? "yes" : "no"
          }
          fields.push(fieldList);
        }
      }
      config.fields = JSON.stringify(fields);

      // -------------------Check duplicate Mutifield---------------------------------
      if (config.fields) {
        const fields = JSON.parse(config.fields);
        const checkedFields = {};
        for (let i = 0; i < fields.length; i++) {
          const rowObj = fields[i];
          if (rowObj.multipleFields === "yes") {
            const fieldKey = rowObj.fieldCode;
            if (checkedFields[fieldKey]) {
              Swal10.fire({
                icon: "error",
                title: "error",
                text: "Line: " + [ct + 1] + " Please select fields that do not overlap (Multiselect).",
              });
              return
            }
            checkedFields[fieldKey] = true;
          }
        }
      }
      // -------------------Check duplicate Mutifield---------------------------------
    }
    return config;
  }
  // ------------------------------Set config------------------------

  // ---------------------------Set config Exprot--------------------
  const createExprot = () => {
    const configExport = {};
    configExport.initial_display = $('.Initial_display').prop('checked') ? "yes" : "no";
    const row_num = $('#kintoneplugin-setting-tbody > tr');
    const fields = [];
    for (let ct = 0; ct < row_num.length; ct++) {
      const dropDownSelected = [];
      const multiselected = [];
      const selectedSpans = $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .kintoneplugin-dropdown-list-item-selected');
      const multipleFields = $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no";
      const selectedDropdown = $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') select[name="field_dropdown_column"]').val();
      if (selectedDropdown !== "-----") {
        dropDownSelected.push(selectedDropdown);
      }
      selectedSpans.each((index, span) => {
        const code = span.getAttribute('id');
        multiselected.push(code);
      });
      if (multipleFields == "no") {
        if (selectedDropdown !== "-----"){
          const fieldData = dropdownOptions.filter(function (item, index) {
            return item.code === selectedDropdown;
          })[0];
          if (fieldData.type === "SINGLE_LINE_TEXT") {
            const fieldList = {
              fieldType: fieldData.type,
              fieldCode: dropDownSelected,
              titleName: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .title-field-column').val(),
              multipleFields: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no",
              partial: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .choiceSelected').prop('checked') ? "yes" : "no",
              newline: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .NewLine-column').prop('checked') ? "yes" : "no"
            }
            fields.push(fieldList);
          }
          else if (fieldData.type !== "SINGLE_LINE_TEXT") {
            const fieldList = {
              fieldType: fieldData.type,
              fieldCode: dropDownSelected,
              titleName: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .title-field-column').val(),
              multipleFields: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no",
              newline: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .NewLine-column').prop('checked') ? "yes" : "no"
            }
            fields.push(fieldList);
          }
        }
        else {
          const fieldList = {
            fieldType: "",
            fieldCode: dropDownSelected,
            titleName: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .title-field-column').val(),
            multipleFields: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no",
            partial: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .choiceSelected').prop('checked') ? "yes" : "no",
            newline: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .NewLine-column').prop('checked') ? "yes" : "no"
          }
          fields.push(fieldList);
        }
      }
      if (multipleFields == "yes") {
        const fieldList = {
          fieldType: "MultiFieldText",
          fieldCode: multiselected,//join("-"),
          titleName: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .title-field-column').val(),
          multipleFields: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .multipleField').prop('checked') ? "yes" : "no",
          partial: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .choiceSelected').prop('checked') ? "yes" : "no",
          newline: $('#kintoneplugin-setting-tbody > tr:eq(' + ct + ') .NewLine-column').prop('checked') ? "yes" : "no",
        };
        fields.push(fieldList);
      }
      configExport.fields = JSON.stringify(fields);
    }
    return configExport;
  }
  // ---------------------------Set config Exprot--------------------

  //-----------------------------Check row nuber---------------------
  const checkRowNumber = () => {
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
  //-----------------------------Check row nuber-----------------------

  // -----------------------------Create new row------------------------
  const createNewRow = (type, row) => {
    let $rowToClone = $('#kintoneplugin-setting-tbody tr:last');
    const newRow = rowToClone.cloneNode(true);
    rowCount++;
    const rowSearchConditions = newRow.querySelector(".search-conditions");
    rowSearchConditions.style.display = "none";
    const inputs = newRow.querySelectorAll('input[type="text"]');
    for (const input of inputs) {
      input.value = "";
    }
    const radioInputs = newRow.querySelectorAll('input[type="radio"]');
    radioInputs.forEach((radio, index) => {
      radio.setAttribute("name", "choice" + rowCount);
      radio.checked = index === 0; // Check the first radio button, uncheck others
    });
    const checkboxInputs = newRow.querySelectorAll('input[type="checkbox"]');
    for (const checkbox of checkboxInputs) {
      checkbox.checked = false;
    }
    newRow.querySelector(".kintoneplugin-select").style.display = "block";
    newRow.querySelector(".multiple-select").style.display = "none";
    const selectedItems = newRow.querySelectorAll(
      ".kintoneplugin-dropdown-list-item-selected"
    );
    for (const item of selectedItems) {
      item.classList.remove("kintoneplugin-dropdown-list-item-selected");
    }
    if (type === "new") {
      row.parent().parent().after(newRow);
    }

    if (type === 'config') {
      $rowToClone.after(newRow);
    }
  }
  // -----------------------------Create new row-----------------------

  $(document).ready(function () {
    setFieldList();
    checkRowNumber();

    // -----------Set dufault dropdown value and mutifield valeu---------
    function ToggleDefaultField(event) {
      const target = event.target;
      if (target.classList.contains("check") || target.parentElement.classList.contains("check")) {
        const row = target.closest("tr");
        if (row) {
          const rowMultipleSelect = row.querySelector(".multiple-select");
          const rowDropdownSelect = row.querySelector(".kintoneplugin-select");
          const rowSearchConditions = row.querySelector(".search-conditions");
          const multiSelected = rowMultipleSelect.querySelectorAll(".kintoneplugin-dropdown-list-item-selected");
          if (target.checked) {
            if (multiSelected) {
              for(let i = 0; i < multiSelected.length; i++){
                multiSelected[i].classList.remove("kintoneplugin-dropdown-list-item-selected");
              }
            }
            rowDropdownSelect.style.display = "none";
            rowMultipleSelect.style.display = "block";
            rowSearchConditions.style.display = "block";
          } else {
            const $selectedRow = $(this).closest("tr");
            const selectedType = $(this).find("option:selected").attr("type");
            if (selectedType === "SINGLE_LINE_TEXT") {
              $selectedRow.find(".search-conditions").css("display", "block");
            } 
            
            rowDropdownSelect.style.display = "block";
            rowMultipleSelect.style.display = "none";
            rowSearchConditions.style.display = "none";
            row.querySelector(".select_field_column").value = "-----";
          }
        }
         
      }
    }
    // --------------Set dufault dropdown value and mutifield valeu-------

    // -------------------Toggle class mutiselect----------------------
    $("#kintoneplugin-setting-tbody").on("click", ".kintoneplugin-dropdown-list-item-name", function () {
      $(this).parent().toggleClass("kintoneplugin-dropdown-list-item-selected");
    }
    );
    $("#kintoneplugin-setting-tbody").on("change", ".select_field_column", function () { 
      handleSelectChange.call(this);
    });
    $("#kintoneplugin-setting-tbody").on("click", ".check", ToggleDefaultField);
    // -------------------Toggle class mutiselect------------------------

    //-------------------------add new row-------------------------------
    document.addEventListener("click", function (event) {
      const target = event.target;
      if (target.classList.contains("addRow")) {
        createNewRow("new", $(target));
        checkRowNumber();
      }
      if (target.classList.contains("removeRow")) {
        target.closest("tr").remove();
        checkRowNumber();
      }
    });
    //-------------------------add new row------------------------------

    //-------------------------save button------------------------------
    $(".js-save-button").click(function (e) {
      e.preventDefault();
      createConfig();
      let configSave = createConfig();
      if (configSave) {
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
      }
    });
    //-------------------------save button--------------------------------

    // ------------------------cancel Button-----------------------------
    $(".js-cancel-button").click(function () {
      window.location.href = "../../" + kintone.app.getId() + "/plugin/";
    });
    // ------------------------cancel Button-----------------------------

    // ------------------------import button----------------------------
    $(".js-import-button").click(function (e) {
      e.preventDefault();
      $(".js-import-input").click();
    })
    $(".js-import-input").change(function () {
      try {
        let file = $(this)[0].files[0];
        let render = new FileReader();
        render.onload = function () {
          let fileContent = render.result;
          if (!fileContent) {
            Swal10.fire({
              icon: "error",
              title: "error",
              text: "File is empty!",
            });
            return
          }
          configJSON = JSON.parse(fileContent);
          checkfields = configJSON.fields ? JSON.parse(configJSON.fields) : [];
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
    // ------------------------import button----------------------------

    // ------------------------export button----------------------------
    $(".js-export-button").click(function (e) {
      e.preventDefault();
      configJSON = createExprot();
      let blob = new Blob([JSON.stringify(configJSON)], {
        type: 'application/json'
      });
      let date = new Date().toJSON().slice(0, 10)
      let link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${kintone.app.getId()}_setconfig_search_plug-in_${date}.json`;
      link.click();
    });
    // ------------------------export button----------------------------

    // -------------------drag and drop table row-----------------------
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
    // -------------------drag and drop table row-----------------------
  });

})(jQuery, Sweetalert2_10.noConflict(true), kintone.$PLUGIN_ID);
