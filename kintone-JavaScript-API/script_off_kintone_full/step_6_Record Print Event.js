(function() {
    'use strice'

    kintone.events.on('app.record.print.show', (event) => {
        console.log(event);
        console.log("Onload Event Print");
        var record = event.record;
        alert('ທ່ານຕ້ອງການປິ້ນຂໍ້ມູນຂອງ :' + record.Text.value + 'ຫຼືບໍ່.');
    });

})();