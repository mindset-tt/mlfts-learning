(function () {
    'use strict'

    kintone.events.on('portal.show', (event) => {
        console.log(event);
        // alert("Hello Kintone");
        var space = [];
        space = document.getElementsByClassName("gaia-argoui-spacescrollinglist-item");
        for (var i = 0; i <= space.length - 1; i++) {
            // console.log(space[i].title);
            var number = space[i].title;
            
            console.log(number);
        }


        /*
        Add drodow
        */

        var selectElement = document.createElement("select");
        var option0 = document.createElement("option");
        var option1 = document.createElement("option");
        var option2 = document.createElement("option");
        var option3 = document.createElement("option");

        option0.text = "-----";
        option0.value = "-----";
        selectElement.add(option0);

        option1.text = "Option 1";
        option1.value = "option1";
        selectElement.add(option1);

        var option2 = document.createElement("option");
        option2.text = "Option 2";
        option2.value = "option2";
        selectElement.add(option2);

        var option3 = document.createElement("option");
        option3.text = "Option 3";
        option3.value = "option3";
        selectElement.add(option3);

        document.body.appendChild(selectElement);

    });
})();