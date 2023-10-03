(function() {
    'use strict'
    //ເມື່ອມີການເປິດໜ້າ detail ຈະເພີ່ມຂໍ້ມູນໃສ່ຢູ່ໜ້າ index 
    kintone.events.on('app.record.index.show', async (event) => {
      console.log(event);

      var recordId = kintone.app.record.getId();
    //   console.log(recordId);
    //   console.log(event);
       
      let bodys = kintone.app.getHeaderMenuSpaceElement();
    //   console.log(body)
      let pp = document.createElement("button")

      pp.classList.add('opBtn')
      pp.innerHTML = "Chang Data" 
      pp.addEventListener('click', function(e) {
        //   console.log(e);
          /*
            On click  
          */
            var body = {
                'app': kintone.app.getId(),
                'records': [
                  {
                    'id': 1,
                    'record': {
                      'name': {
                        'value': 'Silver plates'
                      },
                      'lname': {
                        'value': 'The quick brown fox.'
                      }
                    }
                  }
                ]
              };
              
              kintone.api(kintone.api.url('/k/v1/records.json', true), 'PUT', body, function(resp) {
                // success
                console.log(resp);
              }, function(error) {
                // error
                console.log(error);
              });
          /*
           End On click  
          */

      })
      bodys.appendChild(pp);
  
    })
})();