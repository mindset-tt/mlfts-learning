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
      pp.innerHTML = "Download a file" 
      pp.addEventListener('click', function(e) {
        //   console.log(e);
          /*
            On click  
          */
            var fileKey = kintone.app.record.get().record.file.value[0].fileKey;
            console.log(fileKey);
            var url = 'https://5cqc473u2w1j.cybozu.com/k/v1/file.json?fileKey=' + fileKey;
            
            var xhr = new XMLHttpRequest();
            
            xhr.open('GET', url);
            
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            
            xhr.responseType = 'blob';
            
            xhr.onload = function() {
            
              if (xhr.status === 200) {
            
                // success
            
                var blob = new Blob([xhr.response]);
            
                var windowUrl = window.URL || window.webkitURL;
            
                var blobUrl = windowUrl.createObjectURL(blob);
            
                console.log(blobUrl);
            
              } else {
            
                // error
            
                console.log(xhr.responseText);
            
              }
            
            };
            
            xhr.send();
            
          /*
           End On click  
          */

      })
      bodys.appendChild(pp);
  
    })
})();