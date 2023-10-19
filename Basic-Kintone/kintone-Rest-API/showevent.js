kintone.events.on('app.record.index.show', function (event) {
    console.log(event);
    alert('Do you want to edit?');
});

// Display the updated date time after saving.
kintone.events.on('app.record.index.edit.submit.success', function (event) {
    var record = event.record;
    alert('The updated date time is ' + record.Updated_datetime.value + '.');
    console.log(record);
});