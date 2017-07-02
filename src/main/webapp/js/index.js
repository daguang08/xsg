require(['jquery', 'knockout', 'bootstrap', 'uui', 'director',"dataPicker","dataPickerCN"], function ($, ko) {
    window.ko = ko;
    
    var viewModel={
    		
    };
    //保存方法
    viewModel.saveReservation = function() {
    	var options={};
    	
    	options["unit"]=$("#unit").val();
    	options["contacts"] =$("#contacts").val();
    	options["phone_num"] =$("#phone_num").val();
    	options["visit_date"] =$("#visit_date").val();
    	options["visit_num"] =$("#visit_num").val();
    	options["visit_time"] =$('#visit_time option:selected') .val();
      	$.ajax({
    		url:"/xsg/reservation/save",
    		type: 'GET',
    		data:JSON.stringify(options),
    		dataType: 'json',
    		success: function (data){
    		console.log(data);
    		}
    	});

	};

 
    $(function () {
    	console.log(123);
    	$('.form_date').datetimepicker({
    		format: "yyyy-mm-dd",
            language:  'zh',
            weekStart: 1,
            todayBtn:  1,
    		autoclose: 1,
    		todayHighlight: 1,
    		startView: 2,
    		minView: 2,
    		forceParse: 0
        });
    	console.log(145);
    	$.ajax({
    		url:"/xsg/index",
    		type: 'GET',
    		data:{"a":"abc"},
    		dataType: 'json',
    		success: function (data){
    		console.log(data);
    		}
    	});
    	ko.cleanNode($('body')[0]);
		var app = u.createApp({
			el : "body",
			model : viewModel
		});
    });

});
