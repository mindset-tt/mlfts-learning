$(document).ready(function () {
    const balance = $('#balance');
    const money_plus = $('#money-plus');
    const money_minus = $('#money-minus');
    const list = $('#list');
    const form = $('#form');
    const text = $('#text');
    const amount = $('#amount');

    let transactions = [];

    let init = () => {
        list.html('');
        transactions.forEach(addDataToList);
        calculateMoney();
    }

    let addDataToList = (transactions) => {
        let symbol, status;
        if (transactions.amount < 0) {
            symbol = '-';
            status = 'minus';
        } else {
            symbol = '+';
            status = 'plus';
        }
        const item = $('<li></li>');
        const result = formatNumber(Math.abs(transactions.amount));
        item.addClass(status);
        item.html(`${transactions.text}<span>${symbol}${result}</span><button class="delete-btn">x</button>`);
        item.find('.delete-btn').click(() => removeData(transactions.id));
        list.append(item);
    }

    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    const autoID = () => {
        return Math.floor(Math.random() * 1000000);
    }

    const calculateMoney = () => {
        const amounts = transactions.map(transaction => transaction.amount);
        const total = amounts.reduce((result, item) => (result += item), 0).toFixed(2);
        const income = amounts.filter(item => item > 0).reduce((result, item) => (result += item), 0).toFixed(2);
        const expense = (amounts.filter(item => item < 0).reduce((result, item) => (result += item), 0) * -1).toFixed(2);
        balance.text(`₭${formatNumber(total)}`);
        money_plus.text(`₭${formatNumber(income)}`);
        money_minus.text(`₭${formatNumber(expense)}`);
    }

    const removeData = (id) => {
        transactions = transactions.filter(transaction => transaction.id !== id);
        init();
    }

    const addTransaction = (e) => {
        e.preventDefault();
        if (text.val().trim() === '' || amount.val().trim() === '') {
            alert("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ");
        } else {
            const data = {
                id: autoID(),
                text: text.val(),
                amount: +amount.val()
            };

            transactions.push(data);
            addDataToList(data);
            calculateMoney();
            text.val('');
            amount.val('');
        }
    }

    form.submit(addTransaction);
    init();
});