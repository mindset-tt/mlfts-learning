((PLUGIN_ID) => {
  'use strict';
  //get config data
  const config = kintone.plugin.app.getConfig(PLUGIN_ID);
  //get login user code
  const loginUserCode = kintone.getLoginUser().code;
  console.log(config.bgColor);
  // Change the background color
  const changeUserSelectionFieldColor = (element) => {
    if (element) {
      element.style.backgroundColor = config.bgColor;
    }
  };

  kintone.events.on('app.record.detail.show', (event) => {
    const record = event.record;
    const userEl = kintone.app.record.getFieldElement(config.fieldSelection);
    if (!userEl) {
      return event;
    }
    const users = record[config.fieldSelection].value;
    const userList = users.map((user) => {
      return user.code;
    });
    if (userList.includes(loginUserCode)) {
      changeUserSelectionFieldColor(userEl);
    }
    alert('The plug-in settings have been saved. Please update the app!');
    return event;
  });

  kintone.events.on('app.record.index.show', (event) => {
    if (!event.size) {
      return event;
    }
    //change color of user selection field
    const userEls = kintone.app.getFieldElements(config.fieldSelection);

    if (!userEls) {
      return event;
    }
    //get user selection field
    event.records.forEach((record, i) => {
      const users = record[config.fieldSelection].value;
      //get user list
      const userList = users.map((user) => {
        //get user code
        return user.code;
      });
      //check if login user is in user list
      if (userList.includes(loginUserCode)) {
        const userEl = userEls[i];
        //change color of user selection field
        changeUserSelectionFieldColor(userEl);
      }
    });
    
    alert('If you want to change color please go to plug in setting page');
    //change color of record list
    var divElements = document.getElementsByClassName("recordlist-row-gaia");
    console.log(divElements);
    for (var i = 0; i < divElements.length; i++) {
      divElements[i].style.backgroundColor = "red";
    }
    return event;
  });

})(kintone.$PLUGIN_ID);
