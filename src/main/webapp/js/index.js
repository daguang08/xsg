require(['jquery', 'knockout', 'bootstrap', 'uui', 'director',"dataPicker","dataPickerCN"], function ($, ko) {
    window.ko = ko;
    
    var viewModel={
    		
    };
    validateInput = function(id, value){
		if(value == ""){
			$("#"+id).focus();
			return false;
		}
		//电话号码个数验证
		if(id == "phone_num"){
			var phone_num=$("#phone_num").val();
			var RegExp = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
			var telphoneRegExp=/^(0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?)$/;
			if (RegExp.test(phone_num) == false ) {
				$("#warning").html("号码格式不正确或者位数不正确");
				$("#"+id).focus();
				return false;
			}
			else{
				$("#warning").html("");
			}
		}
	};
    //保存方法
    viewModel.saveReservation = function() {
    	var unit=$("#unit").val();
    	var contacts=$("#contacts").val();
    	var phone_num=$("#phone_num").val();
    	var visit_date=$("#visit_date").val();
    	var visit_num=$("#visit_num").val();
    	var remark =$('#remark') .val();
    	
    	
    
    	
    	var options={};
    	options["unit"] = unit;
    	options["contacts"] = contacts;
    	options["phone_num"] = phone_num;
    	options["visit_date"] = visit_date;
    	options["visit_num"] = visit_num;
    	options["visit_time"] =$('#visit_time option:selected') .val();
    	options["remark"] =$('#remark') .val();
    	
    	
      	$.ajax({
    		url:"/xsg/reservation/save",
    		type: 'GET',
    		data:options,
    		dataType: 'json',
    		success: function (data){
    			if(data.result=="success"){
    				alert(data.msg);
    			}
    			else if(data.result=="fail"){
    				alert(data.msg);
    			}
    		},
    		error:function(data){
    			console.log(data);
    		}
    	});
	};

 
    $(function () {
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
