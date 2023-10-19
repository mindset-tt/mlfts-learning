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
      pp.innerHTML = "Add a guest" 
      pp.addEventListener('click', function(e) {
        //   console.log(e);
          /*
            On click  
          */
            var body = {
                'guests': [
                  {
                    'code': 'guest1@example.com',
                    'password': 'password',
                    'timezone': 'America/Los_Angeles',
                    'locale': 'en',
                    'image': '78a586f2-e73e-4a70-bec2-43976a60746e',
                    'name': 'John Doe',
                    'company': 'Company Name',
                    'division': 'Sales',
                    'phone': '999-456-7890',
                    'callto': 'skypecallto'
                  },
                  {
                    'code': 'guest2@example.com',
                    'password': 'password',
                    'timezone': 'America/Los_Angeles',
                    'locale': 'en',
                    'image': '78a586f2-e73e-4a70-bec2-43976a60746e',
                    'name': 'Jane Roe',
                    'company': 'Company Name',
                    'division': 'Sales',
                    'phone': '999-456-7890',
                    'callto': 'skypecallto'
                  }
                ]
              };
              
              kintone.api(kintone.api.url('/k/v1/guests.json', true), 'POST', body, function(resp) {
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