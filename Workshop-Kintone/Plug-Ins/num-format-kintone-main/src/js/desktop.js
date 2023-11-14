/*
 * Aggregation Plug-in
 *
 * Index show customize
 */
jQuery.noConflict();

(function ($, PLUGIN_ID) {
  "use strict";

  //get setting config
  var config = kintone.plugin.app.getConfig(PLUGIN_ID);

  //event index.show
  kintone.events.on("app.record.index.show", function (event) {
    if (kintone.app.getHeaderSpaceElement().childElementCount != 0) {
      return;
    }

    // create display element
    const headerStyle = "width:100%;position:flex;text-align:" + config.displayposition;
    const divInputData = document.createElement("div");
    divInputData.style.cssText = headerStyle
    const table = document.createElement("tb");

    var params = {
      app: event.appId, // can get from event too
      filterCond: kintone.app.getQueryCondition(),
    };
    //get records from kintone
    getRecords(params)
      .then(function (res) {
        var records = res.records;
        for (let i = 1; i <= parseInt(config.row_number); i++) {
          let item = JSON.parse(config["row" + i]);
          var result = 0;
          //calculate sum value of the target field
          for (let k = 0; k < records.length; k++) {
            result += Number(records[k][item.fieldCode].value);
          }

          if (item.calMethod === "avg" && records.length > 0) {
            //adverage
            result = Number(result / records.length);
          }
          //create value display element as table
          const labelStyle = "margin-left: 15px;font-weight: 900;text-align: right;font-size:" + item.fontSize + "; color:" + item.letterColor;
          const tr = document.createElement("tr");
          const tdLabel = document.createElement("td");
          const tdValue = document.createElement("td");
          tdLabel.innerText = item.prefix;
          tdLabel.style.cssText = labelStyle;
          result = formatNum(
            result,
            item.roundMethod,
            item.decimalDegits,
            item.thousandsSeperator
          );
          tdValue.innerText = result + item.suffix;
          tdValue.style.cssText = labelStyle;

          // append table into new created div element
          tr.appendChild(tdLabel);
          tr.appendChild(tdValue);
          table.appendChild(tr);
          divInputData.appendChild(table);
        }

        //append new created div to kintone header space
        kintone.app.getHeaderSpaceElement().appendChild(divInputData);
      })
      .catch(function (error) {
        alert(error.message || error);
      });
  });

  /**
   * change number format
   * @param {*} value number
   * @param {*} roundMethed 1:round,2:ceil,3:floor
   * @param {*} digit max 10
   * @param {*} thousandsSeparator 1:use,0 not use
   * @returns formated value
   */
  function formatNum(value, roundMethed, digit, thousandsSeparator) {
    var result = 0;
    var roundFactor = Math.pow(10, digit);
    if (roundMethed === "1") {
      //round
      result = Math.round(value * roundFactor) / roundFactor;
    } else if (roundMethed === "2") {
      //round up
      result = Math.ceil(value * roundFactor) / roundFactor;
    } else {
      //round down
      result = Math.floor(value * roundFactor) / roundFactor;
    }

    var seperator = true;
    if (thousandsSeparator === "0") {
      seperator = false;
    }
    var dec_point = ".";
    var thousands_sep = ",";
    // var parts = result.toString().split(".");
    var parts = result.toFixed(digit).split(".");
    parts[0] = seperator
      ? parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep)
      : parts[0];
    return parts.join(dec_point);
  }

  /**
   * get bulk kintone records
   * @param {*} _params request parameters
   * @returns all matched records existed in the app
   */
  function getRecords(_params) {
    var MAX_READ_LIMIT = 500;
    var params = _params || {};
    var app = params.app || kintone.app.getId();
    var filterCond = params.filterCond;
    var sortConds = params.sortConds || ['$id asc'];
    var fields = params.fields;
    var data = params.data;

    if (!data) {
      data = {
        records: [],
        lastRecordId: 0,
      };
    }

    //reset condition
    var conditions = [];
    if (filterCond) {
      conditions.push(filterCond);
    }
    conditions.push("$id > " + data.lastRecordId);
    var sortCondsAndLimit = ' order by ' + sortConds.join(', ') + ' limit ' + MAX_READ_LIMIT;
    var query = conditions.join(' and ') + sortCondsAndLimit;
    var body = {
      app: app,
      query: query
    };

    return kintone
      .api(kintone.api.url("/k/v1/records", true), "GET", body)
      .then(function (r) {
        //add new get records to data
        data.records = data.records.concat(r.records);
        if (r.records.length >= MAX_READ_LIMIT) {
          // When the number of retrieved records is the same as the limit,there may be remaining records that have not been retrieved.
          //In that case, recursively call getRecords to retrieve the remaining records.
          data.lastRecordId = r.records[r.records.length - 1].$id.value;
          return getRecords({
            app: app,
            filterCond: filterCond,
            fields: fields,
            data: data,
          });
        }
        delete data.lastRecordId;
        return data;
      });
  }
})(jQuery, kintone.$PLUGIN_ID);
