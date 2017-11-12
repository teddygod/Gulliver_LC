
	$( ".modal_triggeron" ).click(function() {

		var
			marcet = $("#marcet"),
			securety = $("#securety"),
			it_dep = $("#it_dep"),
			others = $("#others"),
			date_time = $(".date_time"),
			owner_order = $(".owner_order"),
			append_form_SB = $(".append_form_SB"),
			append_form_MARC = $(".append_form_MARC"),
			append_form_IT = $(".append_form_IT"),
			append_form_OTHER = $(".append_form_OTHER"),
			defaults = $("#default"),
			date_times = $(".date_times"),
			contract_numb = $(".contract_numb"),
			owner_order_phone = $(".owner_order_phone"),
			owner_order_email = $(".owner_order_email"),
			decorate_vitrina = $(".decorate_vitrina"),
			add_inform = $(".add_inform"),
			add_in_magazine = $(".add_in_magazine"),
			foto_vodeo = $(".foto_vodeo"),
			foto_vid = $("#foto_vid"),
			action_owner = $(".action_owner");

		$("#department").change().val('3');
		$("#department option[value='3']").attr("selected","selected");

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
		defaults.css("display", "none");
		marcet.css("display", "block");
		owner_order.css("display", "block");

		$(".decorate_vitrina").css("display", "none")
		$(".add_inform").css("display", "none");
		$(".add_in_magazine").css("display", "none");
		$(".foto_vodeo").css("display", "none");
		$(".action_owner").css("display", "none");
		$("#foto_vid").css("display", "none");
		$(".contract_numb").css("display", "none");
		$(".owner_order_phone").css("display", "none");
		$(".owner_order_email").css("display", "none");

		$("#marcet").change().val('6');
		$("#marcet option[value='6']").attr("selected","selected");

		date_time.css("display", "none");
		//date_times.css("display", "flex");
		owner_order.css("display", "block");
		append_form_MARC.css("display", "block");
		action_owner.css("display", "block");
		contract_numb.css("display", "none");
		owner_order_phone.css("display", "block");
		owner_order_email.css("display", "block");

		defaults.css("display", "none");
		 // $depart = $("#department").find("option").val(3);
		 // $marct = $("#marcet").find("option").val(6);
		 // $depart.attr('selected');
		 // $marct.attr('selected');

	});

	$(".modal_triggeradd").click(function () {

		$("#department").change().val('3');
		$("#department option[value='3']").attr("selected","selected");
	});
$(".clear_form").click(function () {

	$("#department option[value='3']").removeAttr("selected","selected");
	$("#department").change().val('1');
	$("#securety").change().val('1');
	$("#marcet option[value='6']").removeAttr("selected","selected");
	$("#marcet").change().val('1');
	$("#it_dep").change().val('1');

	$("#others").change().val('1');
	$("#communication_service").change().val('1');
	$("#terytorya").change().val('1');
	$("#owner_order").change().val('1');
});
