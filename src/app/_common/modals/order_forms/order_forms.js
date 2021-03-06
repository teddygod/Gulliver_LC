$(function () {
	$('#datepicker1').datepicker({
		locale: 'ua',
		format: 'yyyy/mm/dd',
		icons: {
			time: "fa fa-clock-o",
			date: "fa fa-calendar",
			up: "fa fa-arrow-up",
			down: "fa fa-arrow-down"
		}
	});
	$('#datepicker2').datepicker({
		locale: 'ua',
		format: 'yyyy/mm/dd',
		icons: {
			time: "fa fa-clock-o",
			date: "fa fa-calendar",
			up: "fa fa-arrow-up",
			down: "fa fa-arrow-down"
		},
		useCurrent: false //Important! See issue #1075
	});
	$("#datepicker1").on("dp.change", function (e) {
		$('#datepicker2').data("DateTimePicker").minDate(e.date);
	});
	$("#datepicker2").on("dp.change", function (e) {
		$('#datepicker1').data("DateTimePicker").maxDate(e.date);
	});

	 $('#datetimepicker1').datetimepicker({
		 locale: 'ua',
		 icons: {
			 time: "fa fa-clock-o",
			 date: "fa fa-calendar",
			 up: "fa fa-arrow-up",
			 down: "fa fa-arrow-down"
		 }
	 });
	 $('#datetimepicker2').datetimepicker({
		 locale: 'ua',
		 icons: {
			 time: "fa fa-clock-o",
			 date: "fa fa-calendar",
			 up: "fa fa-arrow-up",
			 down: "fa fa-arrow-down"
		 }
	 });
});
$(function () {
	$('#datepicker11').datepicker({
		locale: 'ua',
		format: 'yyyy/mm/dd',
		icons: {
			time: "fa fa-clock-o",
			date: "fa fa-calendar",
			up: "fa fa-arrow-up",
			down: "fa fa-arrow-down"
		}
	});
	$('#datepicker12').datepicker({
		locale: 'ua',
		format: 'yyyy/mm/dd',
		icons: {
			time: "fa fa-clock-o",
			date: "fa fa-calendar",
			up: "fa fa-arrow-up",
			down: "fa fa-arrow-down"
		},
		useCurrent: false //Important! See issue #1075
	});
	$("#datepicker11").on("dp.change", function (e) {
		$('#datepicker12').data("DateTimePicker").minDate(e.date);
	});
	$("#datepicker12").on("dp.change", function (e) {
		$('#datepicker11').data("DateTimePicker").maxDate(e.date);
	});

	$('#datetimepicker11').datetimepicker({
		locale: 'ua',
		icons: {
			time: "fa fa-clock-o",
			date: "fa fa-calendar",
			up: "fa fa-arrow-up",
			down: "fa fa-arrow-down"
		}
	});
	$('#datetimepicker12').datetimepicker({
		locale: 'ua',
		icons: {
			time: "fa fa-clock-o",
			date: "fa fa-calendar",
			up: "fa fa-arrow-up",
			down: "fa fa-arrow-down"
		}
	});


	$('#datepicker_add_inform').datepicker({
		locale: 'ua',
		format: 'yyyy/mm/dd',
		icons: {
			time: "fa fa-clock-o",
			date: "fa fa-calendar",
			up: "fa fa-arrow-up",
			down: "fa fa-arrow-down"
		}
	});

});
$(function () {
	$('#datepicker21').datepicker({
		locale: 'ua',
		format: 'yyyy/mm/dd',
		icons: {
			time: "fa fa-clock-o",
			date: "fa fa-calendar",
			up: "fa fa-arrow-up",
			down: "fa fa-arrow-down"
		}
	});
	$('#datepicker22').datepicker({
		locale: 'ua',
		format: 'yyyy/mm/dd',
		icons: {
			time: "fa fa-clock-o",
			date: "fa fa-calendar",
			up: "fa fa-arrow-up",
			down: "fa fa-arrow-down"
		},
		useCurrent: false //Important! See issue #1075
	});
	$("#datepicker21").on("dp.change", function (e) {
		$('#datepicker22').data("DateTimePicker").minDate(e.date);
	});
	$("#datepicker22").on("dp.change", function (e) {
		$('#datepicker21').data("DateTimePicker").maxDate(e.date);
	});

	$('#datetimepicker21').datetimepicker({
		locale: 'ua',
		icons: {
			time: "fa fa-clock-o",
			date: "fa fa-calendar",
			up: "fa fa-arrow-up",
			down: "fa fa-arrow-down"
		}
	});
	$('#datetimepicker22').datetimepicker({
		locale: 'ua',
		icons: {
			time: "fa fa-clock-o",
			date: "fa fa-calendar",
			up: "fa fa-arrow-up",
			down: "fa fa-arrow-down"
		}
	});
});

		$("#department").on("change", function(){
			var department = $("#department").val(),
				securety = $("#securety"),
				marcet = $("#marcet"),
				it_dep = $("#it_dep"),
				others = $("#others"),
				date_time = $(".date_time"),
				owner_order = $(".owner_order"),
				append_form_SB = $(".append_form_SB"),
				append_form_MARC = $(".append_form_MARC"),
				append_form_IT = $(".append_form_IT"),
				append_form_OTHER = $(".append_form_OTHER"),
				defaults = $("#default");

			switch (department){
				case "1" :
					defaults.css("display", "block");
					securety.css("display", "none");
					marcet.css("display", "none");
					it_dep.css("display", "none");
					others.css("display", "none");
					//next level form
					date_time.css("display", "none");
					owner_order.css("display", "none");
					append_form_SB.css("display", "none");
					append_form_MARC.css("display", "none");
					append_form_IT.css("display", "none");
					append_form_OTHER.css("display", "none");
					break;
				case "2" :
					defaults.css("display", "none");
					securety.css("display", "block");
					marcet.css("display", "none");
					it_dep.css("display", "none");
					others.css("display", "none");
					owner_order.css("display", "block");
					//next level form
					date_time.css("display", "none");
					owner_order.css("display", "none");
					append_form_SB.css("display", "none");
					append_form_MARC.css("display", "none");
					append_form_IT.css("display", "none");
					append_form_OTHER.css("display", "none");
					break;
				case "3" :
					defaults.css("display", "none");
					securety.css("display", "none");
					marcet.css("display", "block");
					it_dep.css("display", "none");
					others.css("display", "none");
					owner_order.css("display", "block");
					//next level form
					date_time.css("display", "none");
					owner_order.css("display", "none");
					append_form_SB.css("display", "none");
					append_form_MARC.css("display", "none");
					append_form_IT.css("display", "none");
					append_form_OTHER.css("display", "none");
					break;
				case "4" :
					defaults.css("display", "none");
					securety.css("display", "none");
					marcet.css("display", "none");
					it_dep.css("display", "block");
					others.css("display", "none");
					owner_order.css("display", "block");
					//next level form
					date_time.css("display", "none");
					owner_order.css("display", "none");
					append_form_SB.css("display", "none");
					append_form_MARC.css("display", "none");
					append_form_IT.css("display", "none");
					append_form_OTHER.css("display", "none");
					break;
				case "5" :
					defaults.css("display", "none");
					securety.css("display", "none");
					marcet.css("display", "none");
					it_dep.css("display", "none");
					others.css("display", "block");
					owner_order.css("display", "block");
					//next level form
					date_time.css("display", "none");
					owner_order.css("display", "none");
					append_form_SB.css("display", "none");
					append_form_MARC.css("display", "none");
					append_form_IT.css("display", "none");
					append_form_OTHER.css("display", "none");
					break;
				default:
					defaults.css("display", "block");
					securety.css("display", "none");
					marcet.css("display", "none");
					it_dep.css("display", "none");
					others.css("display", "none");
					//next level form
					date_time.css("display", "none");
					owner_order.css("display", "none");
					append_form_SB.css("display", "none");
					append_form_MARC.css("display", "none");
					append_form_IT.css("display", "none");
					append_form_OTHER.css("display", "none");
					break;
			}

		})
		.change();

		$("#securety").on("change", function () {
			var securety = $("#securety").val(),
				date_time = $(".date_time"),
				date_times = $(".date_times"),
				owner_order = $(".owner_order"),
				contract_numb = $(".contract_numb"),
				owner_order_phone = $(".owner_order_phone"),
				owner_order_email = $(".owner_order_email"),
				append_form_SB = $(".append_form_SB"),
				material_badge = $(".material_badge"),
				permanent_badge = $(".permanent_badge"),
				guest_badge = $(".guest_badge"),
				temporary_badge = $(".temporary_badge"),
				territory_badge = $(".territory_badge");

				$(".material_badge").css("display", "none")
				$(".permanent_badge").css("display", "none");
				$(".guest_badge").css("display", "none");
				$(".temporary_badge").css("display", "none");
				$(".territory_badge").css("display", "none");
				$(".contract_numb").css("display", "none");
				$(".owner_order_phone").css("display", "none");
				$(".owner_order_email").css("display", "none");


			switch (securety){
				case "1" :
					date_time.css("display", "none");
					owner_order.css("display", "none");
					append_form_SB.css("display", "none");
					break;
				case "2" : //material_badge
					date_time.css("display", "flex");
					owner_order.css("display", "block");
					append_form_SB.css("display", "block");
					material_badge.css("display", "block");

					contract_numb.css("display", "none");
					owner_order_phone.css("display", "none");
					owner_order_email.css("display", "none");
					break;
				case "3" : //permanent_badge
					date_time.css("display", "none");
					owner_order.css("display", "block");
					append_form_SB.css("display", "block");
					permanent_badge.css("display", "block");

					contract_numb.css("display", "block");
					owner_order_phone.css("display", "none");
					owner_order_email.css("display", "none");
					break;
				case "4" : //guest_badge
					date_time.css("display", "none");
					owner_order.css("display", "block");
					append_form_SB.css("display", "block");
					guest_badge.css("display", "block");
					contract_numb.css("display", "block");
					owner_order_phone.css("display", "none");
					owner_order_email.css("display", "none");
					break;
				case "5" : //temporary_badge
					date_time.css("display", "none");
					owner_order.css("display", "block");
					append_form_SB.css("display", "block");
					temporary_badge.css("display", "block");
					contract_numb.css("display", "block");
					owner_order_phone.css("display", "block");
					owner_order_email.css("display", "none");
					break;
				case "6" : territory_badge
					date_time.css("display", "none");
					//date_times.css("display", "flex");
					owner_order.css("display", "block");
					append_form_SB.css("display", "block");
					territory_badge.css("display", "block");
					contract_numb.css("display", "block");
					owner_order_phone.css("display", "block");
					owner_order_email.css("display", "none");
					break;
				default:
					securety.css("display", "none");
					marcet.css("display", "none");
					it_dep.css("display", "none");
					others.css("display", "none");
					//next level form
					date_time.css("display", "none");
					owner_order.css("display", "none");
					append_form_SB.css("display", "none");
					append_form_MARC.css("display", "none");
					break;
			}
		})

		$("#marcet").on("change", function () {
			var marcet = $("#marcet").val(),
				date_time = $(".date_time"),
				date_times = $(".date_times"),
				owner_order = $(".owner_order"),
				contract_numb = $(".contract_numb"),
				owner_order_phone = $(".owner_order_phone"),
				owner_order_email = $(".owner_order_email"),
				append_form_MARC = $(".append_form_MARC"),
				decorate_vitrina = $(".decorate_vitrina"),
				add_inform = $(".add_inform"),
				add_in_magazine = $(".add_in_magazine"),
				foto_vodeo = $(".foto_vodeo"),
				foto_vid = $("#foto_vid"),
				action_owner = $(".action_owner");

				$(".decorate_vitrina").css("display", "none")
				$(".add_inform").css("display", "none");
				$(".add_in_magazine").css("display", "none");
				$(".foto_vodeo").css("display", "none");
				$(".action_owner").css("display", "none");
				$("#foto_vid").css("display", "none");
				$(".contract_numb").css("display", "none");
				$(".owner_order_phone").css("display", "none");
				$(".owner_order_email").css("display", "none");


			switch (marcet){
				case "1" :
					date_time.css("display", "none");
					owner_order.css("display", "none");
					append_form_MARC.css("display", "none");
					break;
				case "2" : //decorate_vitrina
					date_time.css("display", "none");
					owner_order.css("display", "block");
					append_form_MARC.css("display", "block");
					decorate_vitrina.css("display", "block");
					contract_numb.css("display", "block");
					owner_order_phone.css("display", "block");
					owner_order_email.css("display", "none");
					break;
				case "3" : //add_inform
					date_time.css("display", "none");
					owner_order.css("display", "block");
					append_form_MARC.css("display", "block");
					add_inform.css("display", "block");
					contract_numb.css("display", "none");
					owner_order_phone.css("display", "block");
					owner_order_email.css("display", "block");
					break;
				case "4" : //add_in_magazine
					date_time.css("display", "none");
					owner_order.css("display", "block");
					append_form_MARC.css("display", "block");
					add_in_magazine.css("display", "block");
					contract_numb.css("display", "none");
					owner_order_phone.css("display", "block");
					owner_order_email.css("display", "block");
					break;
				case "5" : //foto_vodeo
					date_time.css("display", "none");
					owner_order.css("display", "block");
					foto_vid.css("display", "block");
					append_form_MARC.css("display", "block");
					foto_vodeo.css("display", "block");
					contract_numb.css("display", "none");
					owner_order_phone.css("display", "block");
					owner_order_email.css("display", "block");
					break;
				case "6" : //action_owner
					date_time.css("display", "none");
					//date_times.css("display", "flex");
					owner_order.css("display", "block");
					append_form_MARC.css("display", "block");
					action_owner.css("display", "block");
					contract_numb.css("display", "none");
					owner_order_phone.css("display", "block");
					owner_order_email.css("display", "block");
					break;
				default:
					securety.css("display", "none");
					marcet.css("display", "none");
					it_dep.css("display", "none");
					others.css("display", "none");
					//next level form
					date_time.css("display", "none");
					owner_order.css("display", "none");
					append_form_SB.css("display", "none");
					append_form_MARC.css("display", "none");
					break;
			}
		})

		$("#it_dep").on("change", function () {
			var it_dep = $("#it_dep").val(),
				date_time = $(".date_time"),
				date_times = $(".date_times"),
				owner_order = $(".owner_order"),
				contract_numb = $(".contract_numb"),
				owner_order_phone = $(".owner_order_phone"),
				owner_order_email = $(".owner_order_email"),
				append_form_IT = $(".append_form_IT");

				$(".telephony").css("display", "none")
				$(".internet").css("display", "none");
				$(".data_channel").css("display", "none");
				$(".contract_numb").css("display", "none");
				$(".owner_order_phone").css("display", "none");
				$(".owner_order_email").css("display", "none");


			switch (it_dep){
				case "1" :
					date_time.css("display", "none");
					owner_order.css("display", "none");
					append_form_IT.css("display", "none");
					break;
				case "2" :
					date_time.css("display", "none");
					owner_order.css("display", "block");
					append_form_IT.css("display", "block");
					contract_numb.css("display", "block");
					owner_order_phone.css("display", "block");
					owner_order_email.css("display", "block");
					break;
				default:
					securety.css("display", "none");
					marcet.css("display", "none");
					it_dep.css("display", "none");
					others.css("display", "none");
					//next level form
					date_time.css("display", "none");
					owner_order.css("display", "none");
					append_form_SB.css("display", "none");
					append_form_MARC.css("display", "none");
					break;
			}
		})

		$("#others").on("change", function () {
			var others = $("#others").val(),
				date_time = $(".date_time"),
				date_times = $(".date_times"),
				owner_order = $(".owner_order"),
				contract_numb = $(".contract_numb"),
				owner_order_phone = $(".owner_order_phone"),
				owner_order_email = $(".owner_order_email"),
				append_form_OTHER = $(".append_form_OTHER");

				$(".append_form_OTHER").css("display", "none");
				$(".contract_numb").css("display", "none");
				$(".owner_order_phone").css("display", "none");
				$(".owner_order_email").css("display", "none");



			switch (others){
				case "1" :
					date_time.css("display", "none");
					owner_order.css("display", "none");
					append_form_OTHER.css("display", "none");
					break;
				case "2" :
					date_time.css("display", "none");
					owner_order.css("display", "block");
					append_form_OTHER.css("display", "block");
					contract_numb.css("display", "none");
					owner_order_phone.css("display", "block");
					owner_order_email.css("display", "block");
					break;
				default:
					securety.css("display", "none");
					marcet.css("display", "none");
					it_dep.css("display", "none");
					others.css("display", "none");
					//next level form
					date_time.css("display", "none");
					owner_order.css("display", "none");
					append_form_SB.css("display", "none");
					append_form_MARC.css("display", "none");
					append_form_IT.css("display", "none");
					append_form_OTHER.css("display", "none");
					break;
			}
		})

		$("#communication_service").on("change", function () {
			var communication_service = $("#communication_service").val(),
				telephony = $(".telephony"),
				internet = $(".internet"),
				data_channel = $(".data_channel");

				$(".telephony").css("display", "none");
				$(".internet").css("display", "none");
				$(".data_channel").css("display", "none");


			switch (communication_service){
				case "1" :
					telephony.css("display", "none");
					internet.css("display", "none");
					data_channel.css("display", "none");
					break;
				case "2" :
					telephony.css("display", "block");
					break;
				case "3" :
					internet.css("display", "block");
					break;
				case "4" :
					data_channel.css("display", "block");
					break;
				default:
					telephony.css("display", "none");
					internet.css("display", "none");
					data_channel.css("display", "none");
					break;
			}
		})

		$("#terytorya").on("change", function () {
			var terytorya = $("#terytorya").val(),
				contract_numb = $(".contract_numb");

			switch (terytorya){
				case "1" :
					contract_numb.val("Територия");
					break;
				case "2" :
					contract_numb.val("Договор 007 от 07.10.2007");
					break;
				case "3" :
					contract_numb.val("Договор 107 от 07.10.2012");
					break;
				case "4" :
					contract_numb.val("Договор 127 от 31.12.2017");
					break;
				default:

					break;
			}
		})

		$("#owner_order").on("change", function () {
			var owner_order = $("#owner_order").val(),
				position = $(".owner_order_position"),
				phone = $(".owner_order_phone"),
				email = $(".owner_order_email")
			;

			switch (owner_order){
				case "1" :
					contract_numb.val("Територия");
					break;
				case "2" :
					position.val("Бухгалтер");
					phone.val("+3809900990099");
					email.val("test@tecsd.com");
					break;
				case "3" :
					position.val("Менеджер");
					phone.val("+3809905590099");
					email.val("test@te.com");
					break;
				case "4" :
					position.val("Царь");
					phone.val("+3809300990099");
					email.val("tt@td.com");
					break;
				case "5" :
					position.val("Менеджер");
					phone.val("+3806600990099");
					email.val("test@csd.com");
					break;
				default:

					break;
			}
		})

