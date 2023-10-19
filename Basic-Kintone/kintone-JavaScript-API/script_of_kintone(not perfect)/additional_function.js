(function () {

    'use strict';



    // define variables

    var GROUP1 = 'Company_Name'; // field code of Field Group 1

    var GROUP2 = 'E_mail'; // field code of Field Group 2

    // var GROUP3 = 'group_partnership'; // field code of Field Group 3

    // var GROUP4 = 'group_other'; // field code of Field Group 4



    var RADIOBUTTON = 'Radio_button_0'; // field code of radio button field

    var FIELDVALUE1 = 'sample1'; // first value of radio button field

    var FIELDVALUE2 = 'sample2'; // second value of radio button field

    // var FIELDVALUE3 = 'Partnership'; // third value of radio button field

    // var FIELDVALUE4 = 'Other'; // fourth value of radio button field



    var eventsSubmit = ['app.record.detail.show',

        'app.record.create.show',

        'app.record.edit.show',

        'app.record.create.change.' + RADIOBUTTON,

        'app.record.edit.change.' + RADIOBUTTON];

    kintone.events.on(eventsSubmit, function (e) {

        var record = e.record;

        var radioButtonValue = record[RADIOBUTTON].value;



        // First, close all Field Groups

        kintone.app.record.setGroupFieldOpen(GROUP1, false);

        kintone.app.record.setGroupFieldOpen(GROUP2, false);

        // kintone.app.record.setGroupFieldOpen(GROUP3, false);

        // kintone.app.record.setGroupFieldOpen(GROUP4, false);



        // open/close Field Groups depending on radio button choice

        switch (radioButtonValue) {

            case FIELDVALUE1:

                kintone.app.record.setGroupFieldOpen(GROUP1, true);

                break;

            case FIELDVALUE2:

                kintone.app.record.setGroupFieldOpen(GROUP2, true);

                break;

            // case FIELDVALUE3:

            //     kintone.app.record.setGroupFieldOpen(GROUP3, true);

            //     break;

            // case FIELDVALUE4:

            //     kintone.app.record.setGroupFieldOpen(GROUP4, true);

            //     break;

        }

    });

    kintone.events.on('app.record.detail.show', function(event) {
        kintone.app.record.setFieldShown('Text_0', false);
      });
})();


