$(document).ready(function () {
    let city = "Tokyo";
    const apiKey = "35821fc5d9ac8a40b94a520c06d6aa41";

    const form = $('#form');
    const search = $('#search');

    setData = () => {
        showWeather();
    }

    showWeather = () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            $.ajax({
                url: url,
                method: 'GET',
                success: function (data) {
                    console.log(data);
                    showDataToUI(data);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    showDataToUI = (data) => {
        const cityElement = $('#city');
        const stateElement = $('#state');
        const weatherElement = $('#weather');
        const statusElement = $('#status');
        const humidityElement = $('#humidity');
        const windElement = $('#wind');

        cityElement.text(data.name);
        stateElement.text(data.sys.country);
        weatherElement.children().eq(0).html(calculate(parseInt(data.main.temp)) + " C&deg;");
        weatherElement.children().eq(1).html("min: " + calculate(parseInt(data.main.temp_min)) + " C&deg; max: " + calculate(parseInt(data.main.temp_max)) + " C&deg;");

        // status
        statusElement.text(data.weather[0].main);
        humidityElement.text("Humidity: " + data.main.humidity);
        windElement.text("Wind: " + data.wind.speed);
    }

    calculate = (k) => {
        return k - 273;
    }

    callDataAPI = (e) => {
        e.preventDefault();
        city = search.val();
        showWeather();
    }

    form.on('submit', callDataAPI);
    setData();
});