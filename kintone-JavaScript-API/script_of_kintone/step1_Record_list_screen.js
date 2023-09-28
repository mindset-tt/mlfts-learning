(() => {
  //After displaying the list screen
  kintone.events.on('app.record.index.show', (event) => {
    console.log(event);

    // Get the query string from the URL
    var body = {
      // get the app ID
      'app': kintone.app.getId(),
      // the query string
      'query': 'Expected_Close_Date = "2023-09-13"',
      // the fields to get
      'fields': ['$id', 'Company_Name_Search', 'Contact_Name']
    };
    // Call the API
    kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body, function(resp) {
      // success
      console.log(resp);
    }, function(error) {
      // error
      console.log(error);
    });
  });
  // When you start inline editing
  kintone.events.on('app.record.index.edit.show', (event) => {
    console.log(event);
  });

  // When you change a field value in an inline edit and When saving with inline editing
  kintone.events.on(['app.record.index.edit.change.Date', 'app.record.index.edit.submit', 'app.record.index.edit.submit.success'], (event) => {
    console.log(event);
  });
  //before you delete a record
  kintone.events.on('app.record.index.delete.submit', (event) => {
    console.log(event);
  });

})();
