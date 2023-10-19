(function () {
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
        pp.innerHTML = "Upload a file"
        pp.addEventListener('click', function (e) {
            //   console.log(e);
            /*
              On click  
            */

            var blob = new Blob(['Sample Test File'], { type: 'text/plain' });
            var formData = new FormData();
            formData.append('__REQUEST_TOKEN__', kintone.getRequestToken());
            formData.append('file', blob, 'test.txt');

            var url = 'https://5cqc473u2w1j.cybozu.com/k/v1/file.json';
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // success
                    console.log(JSON.parse(xhr.responseText));
                } else {
                    // error
                    console.log(JSON.parse(xhr.responseText));
                }
            };
            xhr.send(formData);

            /*
             End On click  
            */

        })
        bodys.appendChild(pp);

    })
})();