jQuery.noConflict();

(function($, PLUGIN_ID) {
  'use strict';

  var $form = $('.js-submit-settings');
  var $cancelButton = $('.js-cancel-button');
  var $bronze = $('.bronze-color');
  var $diamond = $('.diamond-color');
  var $master = $('.master-color');
  var config = kintone.plugin.app.getConfig(PLUGIN_ID);

  $('.bronze-color').on('change',function(){
    $bronze.val($(this).val());
    // console.log($bronze.val());
  });

  $('.diamond-color').on('change',function(){
    $diamond.val($(this).val());
    // console.log($diamond.val());
  });

  $('.master-color').on('change',function(){
    $master.val($(this).val());
    // console.log($master.val());
  });

  if (!($form.length > 0 && $cancelButton.length > 0 && $bronze.length > 0)) {
    throw new Error('Required elements do not exist.');
  }

  if (config.bronze && config.diamond && config.master) {
    $bronze.val(config.bronze);
    $diamond.val(config.diamond);
    $master.val(config.master);
  }

  $form.on('submit', function(e) {
    e.preventDefault();
    // console.log($bronze.val());
    kintone.plugin.app.setConfig({
      bronze: $bronze.val(),
      diamond: $diamond.val(),
      master: $master.val()}, function() {
      alert('Succseefully');
      window.location.href = '../../flow?app=' + kintone.app.getId();
    });

  });
  $cancelButton.on('click', function() {
    window.location.href = '../../' + kintone.app.getId() + '/plugin/';
  });
})(jQuery, kintone.$PLUGIN_ID);
