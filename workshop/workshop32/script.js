$(document).ready(function () {
    displayResult = () => {
        let codeHTML = $('#html').val();
        let codeCSS = $('#css').val();
        let codeJS = $('#js').val();
        let result = $('#output');
        result.contents().find('html').html('<style>' + codeCSS + '</style>' + codeHTML);
        // Executing JavaScript code
        let iframe = result.get(0);
        let iframeWindow = iframe.contentWindow;
        iframeWindow.eval(codeJS);
    };
});