(() => {
    "use strict";
    kintone.events.on('app.record.index.show', (event) => {
        console.log(event);
        var appId = kintone.app.getId(); // It's getId, and not recordValue
        console.log(appId);

        var recordValue = kintone.app.record.get(); // It's get recordValue, and not getId
        console.log(recordValue);

        // Retrieve the field element of field with the field code of "Company_Name"
        kintone.app.record.getFieldElement('Company_Name');

        // Set Record Value 
        var record = kintone.app.record.get();
        record.record.single_text_field.value = 'new content!';
        kintone.app.record.set(record);

        //Get Record Header Menu Element
        kintone.app.record.getHeaderMenuSpaceElement();

        //Get Space Element
        kintone.app.record.getSpaceElement('space1');

        //Get Related Records Target
        kintone.app.record.getRelatedRecordsTargetAppId('E_mail');

        //Get Lookup Target
        kintone.app.record.getLookupTargetAppId('Company_Name');

        var uiVer = kintone.getUiVersion();
        console.log(uiVer);
    });
})