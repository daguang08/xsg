require(['jquery', 'knockout', 'bootstrap', 'uui', 'director',"dataPickerCN","dataPicker","ip"], function ($, ko) {
    window.ko = ko;
    //预约时间段数组
    var visitTimeArray=["上午8点  ~ 上午10点","上午10点  ~ 上午12点","下午1点  ~ 下午3点","下午3点  ~ 下午5点","下午5点  ~ 下午7点"];
    
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
			if (RegExp.test(phone_num) == false && telphoneRegExp.test(phone_num) == false) {
				$("#warning").html("号码格式不正确或者位数不正确");
				$("#"+id).focus();
				return false;
			}
			else{
				$("#warning").html("");
			}
		}
		//参观人数校验
		if(id == "visit_num"){
			var visit_num=$("#visit_num").val();
			//参观人数必须正确填写
	    	if(visit_num <= 0){
	    		$("#"+id).focus();
	    		return false;
	    	}
		}
	};
	
	

	
	
	//重置方法
	viewModel.resetForm= function() {
		$("#unit").val('');
		$("#contacts").val('');
		$("#phone_num").val('');
		$("#visit_date").val('');
		$("#visit_num").val('');
		$('#remark') .val('');
	};
	
    //保存方法
    viewModel.saveReservation = function() {
    	var unit=$("#unit").val();
    	var contacts=$("#contacts").val();
    	var phone_num=$("#phone_num").val();
    	var visit_date=$("#visit_date").val();
    	var visit_num=$("#visit_num").val();
    	var remark =$('#remark') .val();
    	
    	//参观人数必须正确填写
    	if(visit_num <= 0){
    		$("#visit_num").focus();
			ip.ipInfoJump("参观人数必须正确填写!", "error");
    		return false;
    	}
    	//参观单位必须正确填写
    	if(unit ==""){
    		$("#unit").focus();
    		ip.ipInfoJump("参观单位必须正确填写!", "error");
    		return false;
    	}
    	//联系人必须正确填写
    	if(contacts == ""){
    		$("#contacts").focus();
    		ip.ipInfoJump("联系人必须正确填写!", "error");
    		return false;
    	}
    	//联系电话必须正确填写
    	if(phone_num ==""){
    		$("#phone_num").focus();
    		ip.ipInfoJump("联系电话必须正确填写!", "error");
    		return false;
    	}
    	//参观日期必须正确填写
    	if(visit_date ==""){
    		$("#visit_date").focus();
    		ip.ipInfoJump("参观日期必须正确填写!", "error");
    		return false;
    	}
    	
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
    				ip.ipInfoJump(data.msg, "success");
    				window.location.href="/xsg/view/reservation/success.html?guid="+data.guid; 
    			}
    			else if(data.result=="fail"){
    				ip.ipInfoJump(data.msg, "error");
    			}
    		},
    		error:function(data){
    			console.log(data);
    		}
    	});
	};

 
    $(function () {
    	ko.cleanNode($('body')[0]);
		var app = u.createApp({
			el : "body",
			model : viewModel
		});
    });

});
