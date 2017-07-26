"use strict";

function DateRange (elem, mode) {
    var self = this;
    this.elem = elem;
    this.mode = mode || 'range';

    setTimeout(function() {
        var picker = $(elem).find('input[name="daterange"]');

        var daysOfWeek = [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ];
        var monthNames = [
            "Январь", "Февраль", "Март", "Апрель", "Май",
            "Июнь", "Июль", "Август", "Сентябрь",
            "Октябрь", "Ноябрь", "Декабрь" ];

        var locale = {
            "format": "DD.MM.YYYY",
            "applyLabel": null,
            "cancelLabel": "Отмена",
            "fromLabel": "От",
            "toLabel": "К",
            "weekLabel": "Н",
            "daysOfWeek": daysOfWeek,
            "monthNames": monthNames,
            "firstDay": 1
        };

        if (self.mode === 'range') {
            picker.daterangepicker({
                "autoApply": true,
                locale: locale
            });
        } else if (self.mode === 'time') {
            picker.daterangepicker({
                "singleDatePicker": true,
                "timePicker": true,
                "timePicker24Hour": true,
                "autoApply": true,
                locale: locale
            });
        }

        picker.on('apply.daterangepicker', function(ev, picker) {
            self.onChange(picker.startDate, picker.endDate);
        });
    }, 0);
}

DateRange.prototype = new component();

DateRange.prototype.unmount = function() {
    var picker = $(this.elem).find('input[name="daterange"]');
    picker.unbind();
}
