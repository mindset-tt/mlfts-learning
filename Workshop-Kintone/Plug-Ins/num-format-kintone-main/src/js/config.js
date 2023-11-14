jQuery.noConflict();

(function ($, PLUGIN_ID) {
  'use strict';

  const $cancelButton = document.querySelector('.js-cancel-button');
  const $importButton = document.querySelector('.js-import-button');
  const $importInput = document.querySelector('.js-import-input');

  // select the table row to clone
  const rowToClone = document.querySelector('#kintoneplugin-setting-tbody tr:last-child');

  const tBodyContainer = document.getElementById('kintoneplugin-setting-tbody');
  // Variable to keep track of the row count
  let rowCount = 1;
  tBodyContainer.addEventListener('click', (event) => {
    const target = event.target;

    // Check if the clicked element or its parent has the class 'check'
    if (target.classList.contains('check') || target.parentElement.classList.contains('check')) {

      // Find the closest row element to the clicked checkbox
      const row = target.closest('tr');
      if (row) {
        // Find the 'multiple-select' and 'kintoneplugin-select' elements within the row
        const rowMultipleSelect = row.querySelector('.multiple-select');
        const rowDropdownSelect = row.querySelector('.kintoneplugin-select');

        if (target.checked) {
          console.log("checked");

          // Hide the dropdown_select within the clicked row
          rowDropdownSelect.style.display = "none";

          // Toggle the 'multiple-select' within the clicked row
          rowMultipleSelect.style.display = "block";
        } else {
          // Show the dropdown_select within the clicked row
          rowDropdownSelect.style.display = "block";

          // Toggle the 'multiple-select' within the clicked row
          rowMultipleSelect.style.display = "none";
        }
      }
    }
  });

  // --------------------------------------------------------------------



  // check row to hide remove row button if its has one row 
  function checkRowNumber() {
    const removeButtons = document.querySelectorAll('#kintoneplugin-setting-tbody > tr .removeRow');
    const rows = document.querySelectorAll('#kintoneplugin-setting-tbody > tr');

    if (rows.length === 1) {
      removeButtons[0].style.display = 'none';
    } else {
      removeButtons.forEach((button) => {
        button.style.display = 'inline-block';
      });
    }
  };


  function createNewRow(type, row) {

    // clone the row without its data
    const newRow = rowToClone.cloneNode(true);
    // Increment the row count
    rowCount++;

    // reset inputs in the new row
    const inputs = newRow.querySelectorAll('input[type="text"]');
    for (const input of inputs) {
      input.value = '';
    }

    // reset radio buttons and checkboxes in the new row
    const radioInputs = newRow.querySelectorAll('input[type="radio"]');
    for (const radio of radioInputs) {
      radio.setAttribute("name", "choice" + rowCount);
      radio.checked = false;
    }

    const checkboxInputs = newRow.querySelectorAll('input[type="checkbox"]');
    for (const checkbox of checkboxInputs) {
      checkbox.checked = false;
    }

    // show dropdown and hide multiple-select in the new row
    newRow.querySelector('.kintoneplugin-select').style.display = 'block';
    newRow.querySelector('.multiple-select').style.display = 'none';

    // reset multiple select
    const selectedItems = newRow.querySelectorAll('.kintoneplugin-dropdown-list-item-selected');
    for (const item of selectedItems) {
      item.classList.remove('kintoneplugin-dropdown-list-item-selected');
    }

    // clone row after clicking row if adding a new row
    if (type === 'new') {
      row.parent().parent().after(newRow)

    }

  };


  checkRowNumber();

  // Delegate the click event for dynamically added radio buttons
  $('#kintoneplugin-setting-tbody').on('click', '.radio', function () {
    console.log('Radio button clicked in row ' + ($(this).closest('tr').index() + 1));
  });
  // Delegate the click event for dynamically added rows
  $('#kintoneplugin-setting-tbody').on('click', '.kintoneplugin-dropdown-list-item-name', function () {
    // Toggle the 'kintoneplugin-dropdown-list-item-selected' class for the clicked item's parent
    console.log("multiple select");
    $(this).parent().toggleClass('kintoneplugin-dropdown-list-item-selected');
  });

  $(document).ready(async function () {

    // add new row in table setting
    document.addEventListener('click', function (event) {
      const target = event.target;

      // Add new row
      if (target.classList.contains('addRow')) {
        createNewRow('new', $(target));
        checkRowNumber();
      }

      // Remove selected row
      if (target.classList.contains('removeRow')) {
        target.closest('tr').remove();
        checkRowNumber();
      }
    });



    // cancel button
    $cancelButton.addEventListener('click', function () {
      window.location.href = '../../' + kintone.app.getId() + '/plugin/';
    });

    // click to call input file to import json file
    $importButton.addEventListener('click', function () {
      $importInput.click()
    })




    // drag and drop table row
    $('#kintoneplugin-setting-tbody').sortable({
      axis: 'y',
      handle: '.drag-handle',
      helper: function (event, ui) {
        ui.children().each(function () {
          $(this).width($(this).width());
        });
        return ui;
      },
      start: function (event, ui) {
        ui.item.addClass('dragging');
      },
      stop: function (event, ui) {
        ui.item.removeClass('dragging');
      }
    });
  })
})(jQuery, kintone.$PLUGIN_ID);