$(document).ready(function () {
    const amountEl = $('#amount');
    const outputEl = $('#output');
    const outputEl2 = $('#output2');
    const outputEl3 = $('#output3');

    //when the amount changes, update the output
    amountEl.on('input', function () {
        const amount = $(this).val();
        const result = Intl.NumberFormat(undefined,{
            style: "currency",
            currency: "LAK",
            currencyDisplay: 'name'
        }).format(amount);//format the amount to full name of currency
        const result2 = Intl.NumberFormat(undefined,{
            style: "currency",
            currency: "LAK",
            currencyDisplay: 'code'
        }).format(amount);//format the amount to code of currency
        const result3 = Intl.NumberFormat(undefined,{
            notation: "compact",
        }).format(amount);//format the amount to compact notation(K, M, B, T)
        outputEl.html(result);
        outputEl2.html(result2);
        outputEl3.html(result3);
    });
});