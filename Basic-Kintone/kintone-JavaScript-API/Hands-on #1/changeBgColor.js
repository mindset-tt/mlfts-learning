(function() {
  'use strict';

  var changeSalesStageFieldColor = function(params) {
    var element = params.element;
    var value = params.value;
    var backgroundColor;
    var fontWeight;
    switch (value) {
      case 'Qualification':
        backgroundColor = '#FED101';
        break;
      case 'Evaluation':
        backgroundColor = '#BFFF50';
        break;
      case 'Negotiation':
        backgroundColor = '#34FFF5';
        break;
      case 'Closed-Won':
      case 'Contract':
        backgroundColor = '#F9B1FB';
        fontWeight = 'bold';
        break;
      case 'Closed-Lost':
        backgroundColor = '#C6C3C3';
        break;
      default:
        break;
    }

    if (backgroundColor) {
      element.style.backgroundColor = backgroundColor;
    }
    if (fontWeight) {
      element.style.fontWeight = fontWeight;
    }
  };

  kintone.events.on('app.record.detail.show', function(event) {
    var record = event.record;
    var salesStage = record.Sales_Stage.value;
    var salesStageElement = kintone.app.record.getFieldElement('Sales_Stage');
    changeSalesStageFieldColor({element: salesStageElement, value: salesStage});
    return event;
  });

  kintone.events.on('app.record.index.show', function(event) {
    var records = event.records;
    var salesStageElements = kintone.app.getFieldElements('Sales_Stage');
    for (var i = 0; i < records.length; i++) {
      var record = records[i];
      var salesStage = record.Sales_Stage.value;
      var salesStageElement = salesStageElements[i];
      changeSalesStageFieldColor({element: salesStageElement, value: salesStage});
    }
    return event;
  });

})();
