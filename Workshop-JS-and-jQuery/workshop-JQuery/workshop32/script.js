$(document).ready(function () {
    displayResult = () => {
        let codeHTML = $('#html').val();
        let codeCSS = $('#css').val();
        let codeJS = $('#js').val();
        let result = $('#output');
        result.contents().find('html').html('<style>' + codeCSS + '</style>' + codeHTML);
        // Executing JavaScript code
        let iframe = result.get(0);
        // get iframe contentWindow 
        let iframeWindow = iframe.contentWindow;
        // set iframeWindow to eval codeJS
        iframeWindow.eval(codeJS);
    };
});