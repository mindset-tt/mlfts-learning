$(document).ready(function () {
    let city = "Tokyo";
    const apiKey = "35821fc5d9ac8a40b94a520c06d6aa41";
    const form = $('#form');
    const search = $('#search');
    const cityElement = $('#city');
    const stateElement = $('#state');
    const weatherElement = $('#weather');
    const statusElement = $('#status');
    const humidityElement = $('#humidity');
    const windElement = $('#wind');
    //make function to set data into website
    setData = () => {
        showWeather();
    }
    //make function to show weather
    showWeather = () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            //make ajax request api
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
    //make function to show data to UI
    showDataToUI = (data) => {

        cityElement.text(data.name);
        stateElement.text(data.sys.country);
        weatherElement.children().eq(0).html(calculate(parseInt(data.main.temp)) + " C&deg;");
        weatherElement.children().eq(1).html("min: " + calculate(parseInt(data.main.temp_min)) + " C&deg; max: " + calculate(parseInt(data.main.temp_max)) + " C&deg;");

        // status of weather
        statusElement.text(data.weather[0].main);
        humidityElement.text("Humidity: " + data.main.humidity);
        windElement.text("Wind: " + data.wind.speed);
    }
    //make function to calculate temperature from kelvin to celcius
    calculate = (k) => {
        return k - 273;
    }
    //make function to call data api
    callDataAPI = (e) => {
        e.preventDefault();
        city = search.val();
        showWeather();
    }
    //make event listener for form
    form.on('submit', callDataAPI);
    setData();
});