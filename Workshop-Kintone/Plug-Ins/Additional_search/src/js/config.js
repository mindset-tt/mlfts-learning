jQuery.noConflict();
(async function ($, Swal10, PLUGIN_ID) {
    "use strict";
    let CONFIG = kintone.plugin.app.getConfig(PLUGIN_ID);
    console.log(CONFIG);
    let CONFIGIMPORT = {};
    let CHECKFIELDS = [];
    let ROWCOUNT = 1;
    const ROWTOCLONE = $("#kintoneplugin-setting-tbody tr:first-child");
    // -------------------------------Call API---------------------------
    let GETFIELDS = "";
    let GETSTATUS = "";
    try {
        let param = { app: kintone.app.getId() };
        GETFIELDS = await kintone.api('/k/v1/preview/app/form/fields', 'GET', param);
        GETSTATUS = await kintone.api(kintone.api.url("/k/v1/app/status.json", true), "GET", param);
    } catch (error) {
        return Swal10.fire('Error', error.message || error, 'error');
    }
    // ----------------------------Select 14 fields----------------------
    const SETFIELDS = [
        "STATUS", "RECORD_NUMBER", "NUMBER", "UPDATED_TIME", "SINGLE_LINE_TEXT", "MULTI_SELECT",
        "CALC", "RADIO_BUTTON", "CHECK_BOX", "MULTI_SELECT", "DROP_DOWN", "DATE", "TIME", "DATETIME"];
    // --------------------------Function setFieldList-------------------
    async function setFieldList() {
        const sortedFields = Object.values(GETFIELDS.properties).sort((a, b) => {
            return a.code.localeCompare(b.code);
        });
        const fieldDropDown = $('select[name="field_dropdown_column"]');
        const multiselect = $(".kintoneplugin-dropdown-list");
        let option = $('<option>');
        sortedFields.forEach((item) => {
            if (SETFIELDS.includes(item.type)) {
                if (item.type !== "STATUS") {
                    option.attr("value", item.code);
                    option.attr("type", item.type);
                    option.text(`${item.label} (${item.code})`);
                    fieldDropDown.append(option.clone());
                }
                // Check type is equal STATUS and check status is open or not
                else if (GETSTATUS.enable === true) {
                    option.attr("value", item.code);
                    option.attr("type", item.type);
                    option.text(`${item.label} (${item.code})`);
                    fieldDropDown.append(option.clone());
                }
            }
            if (item.type === "SINGLE_LINE_TEXT") {
                let multiplOption = `                    
                <div class="kintoneplugin-dropdown-list-item" id="${item.code}">
                    <span class="kintoneplugin-dropdown-list-item-name">${item.label} (${item.code})</span>
                </div>`;
                multiselect.append(multiplOption);
            }
        });
        return;
    }
    // --------------------------Set dutault config----------------------
    function setDefaultConfig(type) {
        try {
            let configSet = {};
            let fields = [];
            let rowSet = 0;
            let multipleSelected = "";
            let oldConfigRow = $('#kintoneplugin-setting-tbody tr').length
            // --------------------Check type default---------------------------------
            if (type == 'default') {
                configSet = CONFIG;
                fields = CONFIG.fields ? JSON.parse(CONFIG.fields) : [];
                if (Object.keys(CONFIG).length === 0){
                    createNewRow('config', ROWTOCLONE);
                    return;
                }
            }
            // ---------------------Check type json-----------------------------------
            else if (type == 'json') {
                configSet = CONFIGIMPORT;
                fields = configSet.fields ? JSON.parse(configSet.fields) : [];
                for (let i = oldConfigRow; i >= 1; i--) {
                    $('#kintoneplugin-setting-tbody > tr:eq(' + (i) + ')').remove();
                }
            }
            // ----------------------Set default data----------------------------------
            for (let i = 0; i < fields.length; i++) {
                const object = fields[i];
                createNewRow('config', ROWTOCLONE);
                rowSet++
                $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .title-field-column').val(object.titleName);
                $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .multipleField').prop('checked', object.multipleFields === "yes" ? true : false);
                $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') input[type=radio][value="' + object.partial + '"].choiceSelected').prop('checked', true);
                $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .NewLine-column').prop('checked', object.newline === "yes" ? true : false);
                if (object.multipleFields == "yes") {
                    object.fieldCode.forEach(function (fieldCode) {
                        multipleSelected = $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') #' + fieldCode);
                        multipleSelected.addClass('kintoneplugin-dropdown-list-item-selected');
                    });
                    $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .select_field_column').val("-----");
                } else {
                    $('#kintoneplugin-setting-tbody > tr:eq(' + rowSet + ') .select_field_column').val(object.fieldCode);
                }
            }
            $('input[name=Initial_display][value="' + configSet.initial_display + '"]').prop('checked', true);
            $(".select_field_column").each(function () {
                handleChangeDropdown.call(this);
            });
            $(".check").each(function () {
                checkMultipleField.call(this);
            });
            checkRowNumber();
            return
        } catch (error) {
            Swal10.fire({
                icon: "error",
                title: "error",
                text: "error Setdifault config",
            });
            return
        }
    }
    // ------------------------Function get data-------------------------
    let DATA = [];
    function getData() {
        let fieldData = "";
        let multiSlected = "";
        let multipleCheck = "";
        let multiSelectedArray = [];
        let rowNumber = $('#kintoneplugin-setting-tbody > tr');
        for (let row = 1; row < rowNumber.length; row++) {
            multiSlected = $('#kintoneplugin-setting-tbody > tr:eq(' + row + ') .kintoneplugin-dropdown-list-item-selected');
            multipleCheck = $('#kintoneplugin-setting-tbody > tr:eq(' + row + ') .multipleField').prop('checked') ? "yes" : "no";
            multiSelectedArray = Array.from(multiSlected).map(function (element) {
                return element.getAttribute('id');
            });
            if (multipleCheck == "no") {
                fieldData = {
                    partial: $('#kintoneplugin-setting-tbody > tr:eq(' + row + ') .choiceSelected').prop('checked') ? "yes" : "no",
                    newline: $('#kintoneplugin-setting-tbody > tr:eq(' + row + ') .NewLine-column').prop('checked') ? "yes" : "no",
                    titleName: $('#kintoneplugin-setting-tbody > tr:eq(' + row + ') .title-field-column').val(),
                    fieldType: $('#kintoneplugin-setting-tbody > tr:eq(' + row + ') select[name="field_dropdown_column"] option:selected').attr("type"),
                    fieldCode: [$('#kintoneplugin-setting-tbody > tr:eq(' + row + ') .select_field_column').val()],
                    multipleFields: $('#kintoneplugin-setting-tbody > tr:eq(' + row + ') .multipleField').prop('checked') ? "yes" : "no",
                }
            } else {
                fieldData = {
                    partial: $('#kintoneplugin-setting-tbody > tr:eq(' + row + ') .choiceSelected').prop('checked') ? "yes" : "no",
                    newline: $('#kintoneplugin-setting-tbody > tr:eq(' + row + ') .NewLine-column').prop('checked') ? "yes" : "no",
                    titleName: $('#kintoneplugin-setting-tbody > tr:eq(' + row + ') .title-field-column').val(),
                    fieldType: "MultiFieldText",
                    fieldCode: multiSelectedArray,
                    multipleFields: $('#kintoneplugin-setting-tbody > tr:eq(' + row + ') .multipleField').prop('checked') ? "yes" : "no",
                }
            }
            DATA.push(fieldData);
        }

    }
    //---------------------------Function validation---------------------
    function validation() {
        let dropdownArray = [];
        let duplicateDropdown = "";
        let duplicateMultiselect = "";
        for (let i = 0; i < DATA.length; i++) {
            switch (true) {
                // Case Empty title name
                case !DATA[i].titleName:
                    Swal10.fire({
                        icon: "error",
                        title: "Error",
                        text: "Line: " + [i + 1] + " Please enter the following items.・Display item Title name.",
                    });
                    return false;
                // Case multipleFields is no
                case DATA[i].multipleFields == "no":
                    if (DATA[i].fieldCode == "-----") {
                        Swal10.fire({
                            icon: "error",
                            title: "Error",
                            text: "Line: " + [i + 1] + " Please enter the following items.・Display item Fields",
                        });
                        return false;
                    } else {
                        dropdownArray.push(DATA[i].fieldCode);
                    }
                    duplicateDropdown = dropdownArray.some(([value], index, arr) => arr.findIndex(([otherValue], otherIndex) => index !== otherIndex && value === otherValue) !== -1);
                    if (duplicateDropdown) {
                        Swal10.fire({
                            icon: "error",
                            title: "Error",
                            text: "Line: " + [i + 1] + " Please select fields that do not overlap",
                        });
                        return false;
                    }
                    break;
                // Case multipleFields is yes
                case DATA[i].multipleFields == "yes":
                    if (DATA[i].fieldCode <= 0) {
                        Swal10.fire({
                            icon: "error",
                            title: "Error",
                            text: "Line: " + [i + 1] + " Please enter the following items.・Display item Fields",
                        });
                        return false;
                    } else {
                        duplicateMultiselect = {};
                        for (let i = 0; i < DATA.length; i++) {
                            let { multipleFields, fieldCode } = DATA[i];// ດຶງຂໍ້ມູນຈາກ multipleFields ແລະ fieldCode
                            if (multipleFields === "yes") {
                                if (duplicateMultiselect[fieldCode]) { //ຖ່າຫາກວ່າ property fieldCode ມີ value = true
                                    Swal10.fire({
                                        icon: "error",
                                        title: "error",
                                        text: "Line: " + [i + 1] + " Please select fields that do not overlap",
                                    });
                                    return false;
                                }
                                duplicateMultiselect[fieldCode] = true; //ເກັບ property fieldCode ທີມີ value = true ເຂົ້າໄປໃນ duplicateMultiselect
                            }
                        }
                    }
                    break;
            }
        }
    }
    // --------------------------Function create config------------------
    function createConfig() {
        let configCreate = {};
        let fields = [];
        let fieldCreate = "";
        configCreate.initial_display = $('.Initial_display').prop('checked') ? "yes" : "no";
        for (let i = 0; i < DATA.length; i++) {
            fieldCreate = {
                partial: DATA[i].partial,
                newline: DATA[i].newline,
                titleName: DATA[i].titleName,
                fieldType: DATA[i].fieldType,
                fieldCode: DATA[i].fieldCode,
                multipleFields: DATA[i].multipleFields,
            }
            fields.push(fieldCreate);
            configCreate.fields = JSON.stringify(fields);
        }
        return configCreate;
    }
    // --------------------------handleSelectChange----------------------
    function ShowMultipleField(SELECTEDROW) {
        SELECTEDROW.find(".kintoneplugin-select").css("display", "none");
        SELECTEDROW.find(".multiple-select").css("display", "block");
        SELECTEDROW.find(".search-conditions").css("display", "block")
    }
    function HideMultipleField(SELECTEDROW) {
        SELECTEDROW.find(".kintoneplugin-select").css("display", "block");
        SELECTEDROW.find(".multiple-select").css("display", "none");
        SELECTEDROW.find(".search-conditions").css("display", "none")
    }
    // -----------------set default dropdown and multiselect-------------
    let SELECTEDROW = "";
    let SELECTEDTYPE = "";
    let MULTISELECTEDITEM = "";
    function handleChangeDropdown() {
        SELECTEDROW = $(this).closest("tr");
        SELECTEDTYPE = $(this).find("option:selected").attr("type");
        if (SELECTEDTYPE === "SINGLE_LINE_TEXT") {
            SELECTEDROW.find(".search-conditions").css("display", "block");
        } else {
            SELECTEDROW.find(".search-conditions").css("display", "none");
        }
    }
    function checkMultipleField() {
        SELECTEDROW = $(this).closest("tr");
        if (this.checked) {
            ShowMultipleField($(SELECTEDROW));
        }
    }
    function ToggleDefaultField(event) {
        SELECTEDROW = $(this).closest("tr");
        MULTISELECTEDITEM = SELECTEDROW.find(".multiple-select .kintoneplugin-dropdown-list-item-selected");
        if (event.target.checked) {
            for (let i = 0; i < MULTISELECTEDITEM.length; i++) {
                MULTISELECTEDITEM[i].classList.remove("kintoneplugin-dropdown-list-item-selected");
            }
            ShowMultipleField($(SELECTEDROW));
        } else {
            SELECTEDROW.find(".select_field_column").val("-----");
            HideMultipleField($(SELECTEDROW));
        }
    }
    //-----------------------------Check row nuber---------------------
    function checkRowNumber() {
        const removeButtons = $("#kintoneplugin-setting-tbody > tr .removeRow");
        const rows = $("#kintoneplugin-setting-tbody > tr");
        console.log(rows);
        if (rows.length <= 2) {
            removeButtons.eq(1).css("display", "none");
        } else {
            removeButtons.each(function () {
                $(this).css("display", "inline-block");
            });
        }
    };
    // -----------------------------Create new row---------------------
    function createNewRow(type, row) {
        const ROWTOCLONE = $("#kintoneplugin-setting-tbody tr:first-child");
        const rowToSet = $("#kintoneplugin-setting-tbody tr:last-child");
        const newRow = ROWTOCLONE.clone(true);
        ROWCOUNT++;
        newRow.removeAttr("hidden")
        newRow.find('input[type="radio"]').each((index, radio) => {
            $(radio).attr("name", "choice" + ROWCOUNT);
            radio.checked = index === 0; // Checked the first radio button
        });
        if (type === "new") {
            //ເຂົ້າເຖິງ tr ຂອງແຖວທີ່ຖີກກົດປຸ່ມ
            row.parent().parent().after(newRow);
        } else {
            rowToSet.after(newRow);
        }
    }
    $(document).ready(function () {
        setFieldList();
        setDefaultConfig('default');
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
        $(".js-save-button").click(function () {
            DATA = [];
            getData();
            let validationSave = validation();
            let configSave = "";
            if (validationSave === false) {
                return
            } else {
                configSave = createConfig();
                kintone.plugin.app.setConfig(configSave, function () {
                    Swal10.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'successfully',
                        text: 'The plug-in settings have been saved. Please update the app!,',
                        showConfirmButton: true,
                    }).then(function () {
                        window.location.href = '../../flow?app=' + kintone.app.getId() + '#section=settings';
                    });
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
                    CONFIGIMPORT = JSON.parse(fileContent);
                    CHECKFIELDS = CONFIGIMPORT.fields ? JSON.parse(CONFIGIMPORT.fields) : [];
                    if (!fileContent) {
                        Swal10.fire({
                            icon: "error",
                            title: "error",
                            text: "File is empty!",
                        });
                        return
                    }
                    if (CHECKFIELDS.length <= 0) {
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
                return alert('error import');
            }
        })
        // ------------------------export button----------------------------
        $(".js-export-button").click(function () {
            DATA = [];
            getData();
            let configExport = createConfig();
            // Create link of json file for download 
            let blob = new Blob([JSON.stringify(configExport)], {
                type: 'application/json'
            });
            let date = new Date().toJSON().slice(0, 10);
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `${kintone.app.getId()}_search_plug-in_${date}.json`;
            link.click();
        });
    });
})(jQuery, Sweetalert2_10.noConflict(true), kintone.$PLUGIN_ID);
