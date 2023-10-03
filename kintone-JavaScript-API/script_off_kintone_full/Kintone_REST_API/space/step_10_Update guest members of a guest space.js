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
      pp.innerHTML = "Detele a guest" 
      pp.addEventListener('click', function(e) {
        //   console.log(e);
          /*
            On click  
          */
            var body = {
                'id': 1,
                'guests': [
                  'guest1@example.com',
                  'guest2@example.com',
                  'guest3@example.com'
                ]
              };
              
              kintone.api(kintone.api.url('/k/guest/{guestspaceId}/v1/space/guests.json', false), 'PUT', body, function(resp) {
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