(function() {
    'use strict'
    //ເມື່ອມີການເປິດໜ້າ detail ຈະເພີ່ມຂໍ້ມູນໃສ່ຢູ່ໜ້າ index 
    kintone.events.on('app.record.index.show', async (event) => {
      console.log(event);

      var recordId = kintone.app.record.getId();
      console.log(recordId);
      console.log(event);
       
      let body = kintone.app.getHeaderMenuSpaceElement();
      console.log(body)
      let pp = document.createElement("button")

      pp.classList.add('opBtn')
      pp.innerHTML = "+ Add Data" 
      pp.addEventListener('click', function(e) {
          console.log(e);

          var bodys = {
            'app': kintone.app.getId(),
            'records': [
              {
                'name': {
                  'value': 'name Sample001'
                },
                'lname': {
                  'value': 'name Sample001'
                }
              },
              {
                'name': {
                  'value': 'name Sample002'
                },
                'lname': {
                  'value': 'lname Sample002'
                }
              },
              {
                'name': {
                  'value': 'name Sample003'
                },
                'lname': {
                  'value': 'name Sample003'
                }
              },
              {
                'name': {
                  'value': 'name Sample004'
                },
                'lname': {
                  'value': 'lname Sample005'
                }
              }
            ]
          };
          
          kintone.api(kintone.api.url('/k/v1/records.json', true), 'POST', bodys, function(resp) {
            alert('Add data')
            console.log(resp);
          }, function(error) {
            // error
            console.log(error);
          });

      })
      body.appendChild(pp);
  
    })
})();