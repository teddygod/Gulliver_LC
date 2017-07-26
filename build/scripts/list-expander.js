"use strict";

function ListExpander(sSelector) { }

ListExpander.prototype.mount = function() {
  var $list_expander=$('.list-expander'),
      $expandable_list=$list_expander.siblings("ul"),
      $workers_placeholder=$expandable_list.find('input').attr('placeholder'),
      $next_worker_i=4,
      $next_worker;
  $list_expander.click(function () {
    $next_worker=$('<li><input type="text" id="worker-name-'+$next_worker_i+'" name="worker-name-'+$next_worker_i+'" placeholder="'+$workers_placeholder+'"></li>');
    $expandable_list.append($next_worker);
    $next_worker_i++;
  });
};
