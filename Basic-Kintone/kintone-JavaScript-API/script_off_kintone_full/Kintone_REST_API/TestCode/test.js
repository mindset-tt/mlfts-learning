(function() {
  'use strict'

  const fname = document.getElementById('7_2017-:39-text');

  kintone.events.on('app.record.edit.show', (evals) =>{
    console.log(evals);
    console.log(fname);
  })

})();