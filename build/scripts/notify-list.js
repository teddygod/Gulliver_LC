var NotifyList = function() { };

NotifyList.prototype.mount = function() {
    setTimeout(function() {
        var $notify_item=$(".notify-list__item"),
            $notify_open=$(".notify-list__item-open-btn"),
            $notify_cont=$(".notify-list__item-content");

        $notify_open.click(function () {
            $(this).parent($notify_item).toggleClass("active");
            $(this).parent($notify_item).find($notify_cont).slideToggle(400);
        });
    }, 0);
};

NotifyList.prototype.unmount = function() {
    setTimeout(function() {
        var $notify_item=$(".notify-list__item"),
            $notify_open=$(".notify-list__item-open-btn"),
            $notify_cont=$(".notify-list__item-content");

        $notify_open.unbind();
    }, 0);
};
