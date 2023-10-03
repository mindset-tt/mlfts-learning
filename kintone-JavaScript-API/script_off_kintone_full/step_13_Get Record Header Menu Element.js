(function() {
    'use strict'

        // ເຫດການເກິດຂື້ນເມື່ອເປິດໜ້າ Detail
        kintone.events.on('app.record.index.show', function(event){
            // ສ້າງຕົວປ່ຽນ recordId ເພື່ອເກັບກຳຂໍ້ມູນ id recrod
            var recordId = kintone.app.record.getId();
            console.log(recordId);
            console.log(event);
            
            // ສ້າງຕົວປ່ຽນ body ເພື່ອເກັບກຳຂໍ້ມູນການສ້າງເມນູຢູ່ Herder Space(ສ່ວນຫົວ) 
            let body = kintone.app.record.getHeaderMenuSpaceElement();
            // ສ້າງຕົວປ່ຽນ pp ເພື່ອເກັບກຳຂໍ້ມູນການສ້າງແທັກ p
            let pp = document.createElement("p")

            // ເຂົ້າຫາແທັກ pp ເພື່ອສ້າງ class text ໃຫ້ແທັກ p
            pp.classList.add('text');
            
            pp.style.color ="blue";
            
            // ເຂົ້າຫາແທັກ pp ເພື່ອໃສ່ຈໍ້ຄວາມໃຫ້ປຸ້ມ
            pp.innerHTML = "This is kintone"

            body.appendChild(pp)
        }); 

    // kintone.events.on('app.record.detail.show', (event) => {
    //     console.log(event);

    //     // Get the DOM element of a space with the ID "mySpace"
    //     var spaceElement = kintone.app.record.getSpaceElement();

    //     // Modify the content of the space element
    //     spaceElement.innerHTML = 'Hello, Kintone!';

    //     // Add a new element to the space element
    //     var newElement = document.createElement('div');
    //     newElement.textContent = 'New element';
    //     spaceElement.appendChild(newElement);
    // });
})();