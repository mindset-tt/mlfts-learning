jQuery.noConflict();
(async function ($, Swal10, PLUGIN_ID) {
  "use strict";
  const config = kintone.plugin.app.getConfig(PLUGIN_ID);
  let configJSON = {};
  let checkfields = [];
  let rowCount = 1;
  // -------------------------------Call API---------------------------
  let field_api = "";
  let processManagement = "";
  try {
    let param = { app: kintone.app.getId() };
    field_api = await kintone.api('/k/v1/preview/app/form/fields', 'GET', param);
    processManagement = await kintone.api(kintone.api.url("/k/v1/app/status.json", true), "GET", param);
  } catch (error) {
    return Swal10.fire('Error', error.message || error, 'error');
  }
  // -----------------------------set fieldList------------------------
  const dropdownOptions = [];
  const fieldDropDown = $('select[name="field_dropdown_column"]');
  const multiselect = $(".kintoneplugin-dropdown-list");
  // ----------------------------Select 14 fields----------------------
  const SetFields = [
    "STATUS", "RECORD_NUMBER", "NUMBER", "UPDATED_TIME", "SINGLE_LINE_TEXT", "MULTI_SELECT",
    "CALC", "RADIO_BUTTON", "CHECK_BOX", "MULTI_SELECT", "DROP_DOWN", "DATE", "TIME", "DATETIME"];
  async function setFieldList() {
    const sortedFields = Object.values(field_api.properties).sort((a, b) => {
      return a.code.localeCompare(b.code);
    });
    sortedFields.forEach((item) => {
      if (SetFields.includes(item.type)) {
        let $option = $('<option>');
        $option.attr("value", item.code);
        $option.attr("type", item.type);
        $option.text(`${item.label} (${item.code})`);
        fieldDropDown.append($option.clone());
      }
      const optionDropdown = {
        type: item.type,
        code: item.code,
      };
      dropdownOptions.push(optionDropdown);
      if (item.type === "SINGLE_LINE_TEXT") {
        let multiplOption = `                    
          <div class="kintoneplugin-dropdown-list-item" id="${item.code}">
            <span class="kintoneplugin-dropdown-list-item-name">${item.label} (${item.code})</span>
          </div>`;
        multiselect.append(multiplOption);
      }
    });
    setDefaultConfig('default');
    return;
  }
  // --------------------------Set dutault config----------------------
  function setDefaultConfig (type) {
    try {
      let configSet = {};
      let fields = [];
      let fieldExist = false;
      // --------------------Check type default---------------------------------
      if (type === 'default') {
        configSet = config;
        fields = config.fields ? JSON.parse(config.fields) : [];
        fieldExist = true;
      }
      // ---------------------Check type json-----------------------------------
      if (type === 'json') {
        configSet = configJSON;
        fields = configSet.fields ? JSON.parse(configSet.fields) : [];
        let oldConfigRow = parseInt($('#kintoneplugin-setting-tbody tr').length)
        for (let i = oldConfigRow; i > 0; i--) {
          $('#kintoneplugin-setting-tbody > tr:eq(' + i + ')').remove();
        }
        fieldExist = true;
      }
      //----------------------Set default data----------------------------------
      let rowSet = 0;
      let hasRow = false;
      if (fieldExist) {
        for (let i = 0; i < fields.length; i++) {
          const object = fields[i];
          createNewRow('config', '');
          rowSet++
          $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .title-field-column').val(object.titleName);
          $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .multipleField').prop('checked', object.multipleFields === "yes" ? true : false);
          $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') input[type=radio][value="' + object.partial + '"].choiceSelected').prop('checked', true);
          $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .NewLine-column').prop('checked', object.newline === "yes" ? true : false);
          if (object.multipleFields == "yes") {
            object.fieldCode.filter(function (item_code, index) {
              const multipleSelected = $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') #' + item_code);
              multipleSelected.addClass('kintoneplugin-dropdown-list-item-selected');
              return false;
            })[0];
            $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .select_field_column').val("-----");
          }
          else {
            $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .select_field_column').val(object.fieldCode);
          }
          hasRow = true;
        }
        if (hasRow) {
          $('#kintoneplugin-setting-tbody > tr:eq(0)').remove()
        }
        $('input[name=Initial_display][value="' + configSet.initial_display + '"]').prop('checked', true);
        $(".select_field_column").each(function () {
          handleChangeDropdown.call(this);
        });

        $(".check").each(function () {
          checkMultipleField.call(this);
        });
      }
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
  // --------------------------handleSelectChange----------------------
  function ShowMultipleField(selectedRow) {
    selectedRow.find(".kintoneplugin-select").css("display", "none");
    selectedRow.find(".multiple-select").css("display", "block");
    selectedRow.find(".search-conditions").css("display", "block")
  }
  function HideMultipleField(selectedRow) {
    selectedRow.find(".kintoneplugin-select").css("display", "block");
    selectedRow.find(".multiple-select").css("display", "none");
    selectedRow.find(".search-conditions").css("display", "none")
  }
  // -----------------set default dropdown and multiselect--------------
  let selectedRow = "";
  let selectedType = "";
  let multiSelectedItem = "";
  function handleChangeDropdown() {
    selectedRow = $(this).closest("tr");
    selectedType = $(this).find("option:selected").attr("type");
    if (selectedType === "SINGLE_LINE_TEXT") {
      selectedRow.find(".search-conditions").css("display", "block");
    } else {
      selectedRow.find(".search-conditions").css("display", "none");
    }
  }
  function checkMultipleField() {
    selectedRow = $(this).closest("tr");
    if (this.checked) {
      ShowMultipleField($(selectedRow));
    }
  }
  function ToggleDefaultField(event) {
    selectedRow = $(this).closest("tr");
    multiSelectedItem = selectedRow.find(".multiple-select .kintoneplugin-dropdown-list-item-selected");
    if (event.target.checked) {
      for (let i = 0; i < multiSelectedItem.length; i++) {
        multiSelectedItem[i].classList.remove("kintoneplugin-dropdown-list-item-selected");
      }
      ShowMultipleField($(selectedRow));
    } else {
      selectedRow.find(".select_field_column").val("-----");
      HideMultipleField($(selectedRow));
    }
  }
  //-----------------------------Check row nuber---------------------
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
  // ---------------------------Create new row------------------------
  function createNewRow(type, row) {
    const rowToClone = $("#kintoneplugin-setting-tbody tr:last-child");
    const newRow = rowToClone.clone(true);
    rowCount++;
    //set default value
    newRow.find(".search-conditions").css("display", "none");
    newRow.find('input[type="text"]').val("");
    newRow.find('input[type="checkbox"]').prop("checked", false);
    newRow.find(".kintoneplugin-select").css("display", "block");
    newRow.find(".multiple-select").css("display", "none");
    newRow.find(".kintoneplugin-dropdown-list-item-selected").removeClass("kintoneplugin-dropdown-list-item-selected");
    newRow.find('input[type="radio"]').each((index, radio) => {
      $(radio).attr("name", "choice" + rowCount);
      radio.checked = index === 0; // Checked the first radio button
    });
    if (type === "new") {
      //ເຂົ້າເຖິງ tr ຂອງແຖວທີ່ຖີກກົດປຸ່ມ
      row.parent().parent().after(newRow);
    } else {
      rowToClone.after(newRow);
    }
  }
  //--------------------------Vlidate function---------------------
  function validate() {
    let row_num = $('#kintoneplugin-setting-tbody > tr');
    for (let count = 0; count < row_num.length; count++) {
      let multiselected = [];
      let titleName = $('#kintoneplugin-setting-tbody > tr:eq(' + count + ') .title-field-column').val();
      let multiSlected = $('#kintoneplugin-setting-tbody > tr:eq(' + count + ') .kintoneplugin-dropdown-list-item-selected');
      let multipleFields = $('#kintoneplugin-setting-tbody > tr:eq(' + count + ') .multipleField').prop('checked') ? "yes" : "no";
      let selectedDropdown = $('#kintoneplugin-setting-tbody > tr:eq(' + count + ') .select_field_column').val();
      multiSlected.each((index, span) => {
        const code = span.getAttribute('id');
        multiselected.push(code);
      });
      if (!titleName) {
        Swal10.fire({
          icon: "error",
          title: "error",
          text: "Line: " + [count + 1] + " Please enter the following items.・Display item Title name.",
        });
        return "false";
      }
      if (multipleFields == "no") {
        if (selectedDropdown == "-----") {
          Swal10.fire({
            icon: "error",
            title: "error",
            text: "Line: " + [count + 1] + " Please enter the following items.・Display item Fields (Dropdown).",
          });
          return 'false';
        }
        // ---------Check for duplicate values dropdwon------
        const duplicateDropdown = row_num.toArray().some(function (row, innerIndex) {
          return count !== innerIndex && selectedDropdown === $(row_num[innerIndex]).find(".select_field_column").val();
        });
        if (duplicateDropdown) {
          Swal10.fire({
            icon: "error",
            title: "Error",
            text: "Line: " + (count + 1) + " Please select fields that do not overlap (Dropdown).",
          });
          return 'false';
        }
        // -------------------Check field type is Status----------------
        const fieldData = dropdownOptions.filter(function (item, index) {
          return item.code === selectedDropdown;
        })[0];
        if (fieldData.type == "STATUS") {
          if (processManagement.enable === false) {
            Swal10.fire({
              icon: "error",
              title: "Error",
              text: "Line: " + (count + 1) + " Please enable process management.",
            });
            return 'false';
          }
        }
      }
      else {
        if (multiselected.length <= 0) {
          Swal10.fire({
            icon: "error",
            title: "error",
            text: "Line: " + [count + 1] + " Please enter the following items.・Display item Fields (MultipleFields).",
          });
          return 'false';
        }
      }
    }
  }
  $(document).ready(function () {
    setFieldList();
    checkRowNumber();
    // -------------------Toggle class mutiselect----------------------
    $("#kintoneplugin-setting-tbody").on("click", ".kintoneplugin-dropdown-list-item-name", function () {
      $(this).parent().toggleClass("kintoneplugin-dropdown-list-item-selected");
    }
    );
    $("#kintoneplugin-setting-tbody").on("change", ".select_field_column", function () {
      handleChangeDropdown.call(this);
    });
    $("#kintoneplugin-setting-tbody").on("click", ".check", ToggleDefaultField);
    //-------------------------add new row-------------------------------
    $(".addRow").on('click', function () {
      createNewRow("new", $(this));
      checkRowNumber();
    });

    $(".removeRow").on("click", function () {
      $(this).closest("tr").remove();
      checkRowNumber();
    });
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

    //-------------------------save button------------------------------
    $(".js-save-button").click(async function () {
      let config = {};
      let fields = [];
      let row_num = $('#kintoneplugin-setting-tbody > tr');
      config.initial_display = $('.Initial_display').prop('checked') ? "yes" : "no";
      for (let count = 0; count < row_num.length; count++) {
        let fieldList = "";
        let multiselected = [];
        let partial = $('#kintoneplugin-setting-tbody > tr:eq(' + count + ') .choiceSelected').prop('checked') ? "yes" : "no";
        let newline = $('#kintoneplugin-setting-tbody > tr:eq(' + count + ') .NewLine-column').prop('checked') ? "yes" : "no";
        let titleName = $('#kintoneplugin-setting-tbody > tr:eq(' + count + ') .title-field-column').val();
        let mutiSelected = $('#kintoneplugin-setting-tbody > tr:eq(' + count + ') .kintoneplugin-dropdown-list-item-selected');
        let multipleFields = $('#kintoneplugin-setting-tbody > tr:eq(' + count + ') .multipleField').prop('checked') ? "yes" : "no";
        let selectedDropdown = $('#kintoneplugin-setting-tbody > tr:eq(' + count + ') select[name="field_dropdown_column"]').val();
        mutiSelected.each((index, span) => {
          const code = span.getAttribute('id');
          multiselected.push(code);
        });
        if (validate() === "false") {
          return;
        }
        if (multipleFields == "no") {
          const fieldData = dropdownOptions.filter(function (item, index) {
            return item.code === selectedDropdown;
          })[0];
          fieldList = {
            partial: partial,
            newline: newline,
            titleName: titleName,
            fieldType: fieldData.type,
            multipleFields: multipleFields,
            fieldCode: [`${selectedDropdown}`]
          }
          fields.push(fieldList);
        }
        else {
          fieldList = {
            partial: partial,
            newline: newline,
            titleName: titleName,
            fieldCode: multiselected,
            fieldType: "MultiFieldText",
            multipleFields: multipleFields
          };
          fields.push(fieldList);
        }
        const duplicateMultiselct = {};
        for (let i = 0; i < fields.length; i++) {
          const { multipleFields, fieldCode } = fields[i];
          if (multipleFields === "yes") {
            if (duplicateMultiselct[fieldCode]) {
              Swal10.fire({
                icon: "error",
                title: "error",
                text: `Line: ${count + 1} Please select fields that do not overlap (Multiselect).`,
              });
              return 'false';
            }
            duplicateMultiselct[fieldCode] = true;
          }
        }
      }
      config.fields = JSON.stringify(fields);
      // ----------------------set config-------------------------
      if (config) {
        kintone.plugin.app.setConfig(config, function () {
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
    // ------------------------cancel Button----------------------------
    $(".js-cancel-button").click(function () {
      window.location.href = "../../" + kintone.app.getId() + "/plugin/";
    });
    // ------------------------import button----------------------------
    $(".js-import-button").click(function () {
      $(".js-import-input").click();
    })
    $(".js-import-input").change(function () {
      try {
        let file = $(this)[0].files[0];
        let render = new FileReader();
        render.onload = function () {
          let fileContent = render.result;
          configJSON = JSON.parse(fileContent);
          checkfields = configJSON.fields ? JSON.parse(configJSON.fields) : [];
          if (!fileContent) {
            Swal10.fire({
              icon: "error",
              title: "error",
              text: "File is empty!",
            });
            return
          }
          if (checkfields.length <= 0) {
            Swal10.fire({
              icon: "error",
              title: "error",
              text: "Not have fields",
            });
            return
          }
          setDefaultConfig('json');
        }
        render.readAsText(file);
      } catch (error) {
        return alert('error')
      }
    })
    // ------------------------export button----------------------------
    $(".js-export-button").click(function () {
      let configExport = {};
      let fields = [];
      let row_num = $('#kintoneplugin-setting-tbody > tr');
      configExport.initial_display = $('.Initial_display').prop('checked') ? "yes" : "no";
      for (let count = 0; count < row_num.length; count++) {
        let fieldList = "";
        let multiselected = [];
        let partial = $('#kintoneplugin-setting-tbody > tr:eq(' + count + ') .choiceSelected').prop('checked') ? "yes" : "no";
        let newline = $('#kintoneplugin-setting-tbody > tr:eq(' + count + ') .NewLine-column').prop('checked') ? "yes" : "no";
        let titleName = $('#kintoneplugin-setting-tbody > tr:eq(' + count + ') .title-field-column').val();
        let selectedSpans = $('#kintoneplugin-setting-tbody > tr:eq(' + count + ') .kintoneplugin-dropdown-list-item-selected');
        let multipleFields = $('#kintoneplugin-setting-tbody > tr:eq(' + count + ') .multipleField').prop('checked') ? "yes" : "no";
        let selectedDropdown = $('#kintoneplugin-setting-tbody > tr:eq(' + count + ') select[name="field_dropdown_column"]').val();
        selectedSpans.each((index, span) => {
          const code = span.getAttribute('id');
          multiselected.push(code);
        });
        if (multipleFields == "no") {
          if (selectedDropdown !== "-----") {
            const fieldData = dropdownOptions.filter(function (item, index) {
              return item.code === selectedDropdown;
            })[0];
            fieldList = {
              partial: partial,
              newline: newline,
              titleName: titleName,
              fieldType: fieldData.type,
              multipleFields: multipleFields,
              fieldCode: [`${selectedDropdown}`]
            }
            fields.push(fieldList);
          }
          else {
            fieldList = {
              partial: partial,
              newline: newline,
              fieldType: "",
              titleName: titleName,
              multipleFields: multipleFields,
              fieldCode: [`${selectedDropdown}`]
            }
            fields.push(fieldList);
          }
        }
        if (multipleFields == "yes") {
          fieldList = {
            partial: partial,
            newline: newline,
            titleName: titleName,
            fieldCode: multiselected,
            fieldType: "MultiFieldText",
            multipleFields: multipleFields
          };
          fields.push(fieldList);
        }
        configExport.fields = JSON.stringify(fields);
      }
      let blob = new Blob([JSON.stringify(configExport)], {
        type: 'application/json'
      });
      let date = new Date().toJSON().slice(0, 10)
      let link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${kintone.app.getId()}_setconfig_search_plug-in_${date}.json`;
      link.click();
    });
  });
})(jQuery, Sweetalert2_10.noConflict(true), kintone.$PLUGIN_ID);
