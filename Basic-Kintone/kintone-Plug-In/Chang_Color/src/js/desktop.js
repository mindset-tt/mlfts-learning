jQuery.noConflict();

(function ($, PLUGIN_ID) {
  'use strict';

  // kintone.events.on('app.record.index.show', function() {
  //   var config = kintone.plugin.app.getConfig(PLUGIN_ID);

  //   var spaceElement = kintone.app.getHeaderSpaceElement();
  //   if (spaceElement === null) {
  //     throw new Error('The header element is unavailable on this page');
  //   }
  //   var fragment = document.createDocumentFragment();
  //   var headingEl = document.createElement('h3');
  //   var messageEl = document.createElement('p');

  //   messageEl.classList.add('plugin-space-message');
  //   messageEl.textContent = config.message;
  //   headingEl.classList.add('plugin-space-heading');
  //   headingEl.textContent = 'Hello kintone plugin!';

  //   fragment.appendChild(headingEl);
  //   fragment.appendChild(messageEl);
  //   spaceElement.appendChild(fragment);
  // });


  const config = kintone.plugin.app.getConfig(PLUGIN_ID);
  const loginUserCode = kintone.getLoginUser().code;

  var changeSalesStageFieldColor = function (params) {
    console.log(params);
    var element = params.element;
    // console.log(element);
    var value = params.value;
    // console.log(value);
    var backgroundColor;
    switch (value) {
      case 'bronze':
        backgroundColor = config.bronze;
        break;
      case 'diamond':
        backgroundColor = config.diamond;
        break;
      case 'master':
        backgroundColor = config.master;
        break;
      default:
        break;
    }

    if (backgroundColor) {
      element.style.backgroundColor = backgroundColor;
    }
  };

  kintone.events.on('app.record.index.show', function (event) {
    // console.log(event.records[0].$id.value);
    // console.log(config);
    // console.log(loginUserCode);

    var records = event.records;
    // console.log(record);
    // var salesStageElements = kintone.app.getFieldElements('Code_Color');
    // console.log(salesStageElements);

    var divElements = document.getElementsByClassName("recordlist-row-gaia");
    // i.style.backgroundColor = "red";
    // console.log(divElements);
    for (var i = 0; i < divElements.length; i++) {
      var record = records[i];
      var salesStage = record.Code_Color.value;
      var salesStageElement = divElements[i];
      changeSalesStageFieldColor({ element: salesStageElement, value: salesStage });
    }

    // Delete Button

    let pp = document.createElement("button");
    let bodys = kintone.app.getHeaderMenuSpaceElement();
    //   console.log(body)
      pp.classList.add('opBtn')
      pp.innerHTML = "Detete Data" 
      pp.addEventListener('click', function(e) {
        //   console.log(e);
          /*
            On click  
          */

            var o = [];
            console.log(event.records.length)
            if(event.records.length <= 0){
              
            }else{
              for(let i=0;i<=event.records.length-1;i++){
                o.push(event.records[i].$id.value);
              }
            }
            // console.log(o);

            var body = {
                'app': kintone.app.getId(),
                'ids': o
              };

              kintone.api(kintone.api.url('/k/v1/records.json', true), 'DELETE', body, function(resp) {
                // success
                // console.log(resp);
              }, function(error) {
                // error
                // console.log(error);
              });
          /*
           End On click  
          */

      })
      bodys.appendChild(pp);

    return event;
  });

  kintone.events.on('app.record.detail.show', function (event) {
    var record = event.record;
    var salesStage = record.Code_Color.value;
    var salesStageElement = kintone.app.record.getFieldElement('Code_Color');
    changeSalesStageFieldColor({ element: salesStageElement, value: salesStage });
    return event;
  });


})(jQuery, kintone.$PLUGIN_ID);
