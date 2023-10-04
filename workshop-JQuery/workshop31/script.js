$(document).ready(function() {
    const data = [
        'python',
        'java',
        'c++',
        'c#',
        'javascript',
        'php',
        'ruby',
        'swift',
        'go',
        'scala',
        'kotlin',
        'rust',
        'perl',
        'r',
        'matlab',
        'sql',
        'html',
        'css',
        'xml',
        'json',
        'yaml',
        'toml',
        'ini',
        'dockerfile',
        'makefile',
        'cmake',
        'bash',
        'powershell',
        'shell',
        'batch',
        'lua',
        'groovy',
        'haskell',
        'typescript',
        'coffeescript',
        'dart',
        'elixir',
        'erlang',
        'fortran',
        'f#',
        'julia',
        'lisp',
        'nim',
        'ocaml',
        'pascal',
        'reactJS',
        'vueJS',
        'angularJS',
        'emberJS',
        'backboneJS',
        'nodeJS',
        'expressJS',
        'django',
        'flask',
        'laravel',
        'symfony',
        'spring',
        'asp.net',
    ];

    const search = $('#search');
    const output = $('#output');

    search.on('keyup', function() {
        let word = $(this).val();
        let result = [];
        if(word.length) {
            result = data.filter(function(item) {
                return item.toLowerCase().includes(word.toLowerCase());
            });
        }

        if (result.length > 0) {
            const content = result.map(function(item) {
               return `<li onclick=selectChoice(this)>${item}</li>`;
            });

            output.html("<ul>" + content.join("") + "</ul>");
        }
        else {
            output.html("");
        }
    });

    selectChoice =(element)=> {
        search.val(element.textContent);
    }
});