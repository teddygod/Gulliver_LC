$(function () {

	var timeout = 300001;
	var curUSD = $("span.cur_usd-count"),
		curEUR = $("span.cur_eur-count"),
		tocken = '199244c956f088da8d83a2a6869107a2d4f51d96',
		curRU = $("span.cur_rub-count");

	$.ajaxSetup({
		headers : {
			'Access-Control-Allow-Origin' : '*'
		}
	});

	(function hits() {
		$.ajax({
			url: 'http://api.minfin.com.ua/nbu/' + tocken,
			type: 'GET',
			dataType: 'jsonp',
			crossDomain: true,
			success: function (json) {

				$cur_USD = Number(json.usd.bid).toFixed(2);
				$cur_EUR = Number(json.eur.bid).toFixed(2);
				$cur_RU = Number(json.rub.bid).toFixed(2);
				curUSD.text($cur_USD);
				curEUR.text($cur_EUR);
				curRU.text($cur_RU);
				//console.log('123 ' + curUSD);
			}
		}).done(function () {
			setTimeout(hits, timeout);
		});
	})();

});
