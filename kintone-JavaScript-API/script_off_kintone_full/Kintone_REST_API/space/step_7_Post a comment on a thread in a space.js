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
      pp.innerHTML = "Delete the cursor" 
      pp.addEventListener('click', function(e) {
        //   console.log(e);
          /*
            On click  
          */
            var body = {
                'space': 1,
                'thread': 1,
                'comment': {
                  'text': 'This is the Golden Gate Bridge in San Francisco. \nIsn\'t it gorgeous?',
                  'mentions': [
                    {
                      'code': 'john',
                      'type': 'USER'
                    },
                    {
                      'code': 'HR_EBbG2z',
                      'type': 'ORGANIZATION'
                    },
                    {
                      'code': 'Travel Club_9mhZNJ',
                      'type': 'GROUP'
                    }
                  ],
                  'files': [
                    {
                      'fileKey': 'a8c5360e-e919-4ac6-a300-b24fbc9ee1ec',
                      'width': 400
                    }
                  ]
                }
              };
              
              kintone.api(kintone.api.url('/k/v1/space/thread/comment.json', true), 'POST', body, function(resp) {
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