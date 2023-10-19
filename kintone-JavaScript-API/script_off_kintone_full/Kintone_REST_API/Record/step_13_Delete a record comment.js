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
      pp.innerHTML = "Delete a record comment" 
      pp.addEventListener('click', function(e) {
        //   console.log(e);
          /*
            On click  
          */
            var body = {
                'app': kintone.app.getId(),
                'record': 1,
                'comment': 2
              };
              
              kintone.api(kintone.api.url('/k/v1/record/comment.json', true), 'DELETE', body, function(resp) {
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