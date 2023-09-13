$(document).ready(function () {
    const currencyOne = $("#currency-one");
    const currencyTwo = $("#currency-two");
    const amountOne = $("#amount-one");
    const amountTwo = $("#amount-two");
    const rateText = $("#rate");
    const swap = $("#btn");

    currencyOne.on('change', calculateMoney);
    currencyTwo.on('change', calculateMoney);
    amountOne.on('input', calculateMoney);
    amountTwo.on('input', calculateMoney);

    let calculateMoney = () => {
        const one = currencyOne.val();
        const two = currencyTwo.val();
        $.ajax({
            url: `https://api.exchangerate-api.com/v4/latest/${one}`,
            dataType: "json",
            success: (data) => {
                const rate = data.rates[two];
                rateText.text(`1 ${one} = ${rate} ${two}`);
                amountTwo.val((amountOne.val() * rate).toFixed(2));
            }
        });
    }

    $.ajax({
        url: "https://openexchangerates.org/api/currencies.json",
        dataType: "json",
        success: (data) => {
            const selectElement = $("#currency-one");
            const selectElement2 = $("#currency-two");

            for (const currencyCode in data) {
                const option = $("<option>").val(currencyCode).text(currencyCode);
                console.log(option);
                selectElement.append(option);
                selectElement2.append(option.clone());
            }
        },
        error: function (error) {
            console.error("Error fetching currency codes:", error);
        }
    });

    swap.on('click', function () {
        const temp = currencyOne.val();
        currencyOne.val(currencyTwo.val());
        currencyTwo.val(temp);
        calculateMoney();
    });

    calculateMoney();
});