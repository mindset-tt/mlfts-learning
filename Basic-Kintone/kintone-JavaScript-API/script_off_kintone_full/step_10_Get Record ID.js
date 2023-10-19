(function(){
    'use strict'

    kintone.events.on('app.record.index.show', function(event){

        var recordId = kintone.app.record.getId();
        // console.log(recordId);
        // console.log(event);
         
        let body = kintone.app.getHeaderMenuSpaceElement();
        // console.log(body)
        let pp = document.createElement("button")

        pp.classList.add('opBtn')
        pp.innerHTML = "Add Data" 
        pp.addEventListener('click', function(e) {
            console.log(e);

            var record = kintone.app.record.get();
            console.log(record);

        })
        body.appendChild(pp);
    }); 

})();

