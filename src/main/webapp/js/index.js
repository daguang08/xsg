require(['jquery', 'knockout', 'bootstrap', 'uui', 'director',"dataPickerCN","dataPicker","ip"], function ($, ko) {
    window.ko = ko;
    //预约时间段数组
    var visitTimeArray=common.visitTimeArray;
    
    var viewModel={
    		
    };
    validateInput = function(id, value){
		if(value == ""){
    		ip.ipInfoJump("不能为空！", "error");
			$("#"+id).focus();
			return false;
		}
		//电话号码个数验证
		if(id == "phone_num"){
			var phone_num=$("#phone_num").val();
			var RegExp = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
			var telphoneRegExp=/\d{3}-\d{8}|\d{4}-\d{7}|\d{4}-\d{8}/;
			if (!(RegExp.test(phone_num) || telphoneRegExp.test(phone_num)) ) {
				$("#warning").html("请输正确手机号，如果是固话加‘-’，如  0371-2XXXXXXX ");
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
	    		ip.ipInfoJump("参观人数必须正确填写！", "error");
	    		$("#"+id).focus();
	    		return false;
	    	}
		}
	};
	
	//初始化下拉列表
	viewModel.initDropDownList=function(){
		var selectEle = $("#visit_time_select");
		selectEle.empty();
		for(var i=0,length=visitTimeArray.length;i<length;i++) {
		    var option = $("<option>").text(visitTimeArray[i]).val(i);
		    selectEle.append(option);
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
    	if(visit_num =="" || visit_num <= 0){
			ip.ipInfoJump("参观人数必须正确填写!", "error");
			$("#visit_num").focus();
    		return false;
    	}
    	else if(visit_num > 300){
    		ip.ipInfoJump("您的预约参观人数超过限制，请重新预约!", "error");
			$("#visit_num").focus();
    		return false;
    	}
    	//参观单位必须正确填写
    	if(unit ==""){
    		ip.ipInfoJump("参观单位必须正确填写!", "error");
    		$("#unit").focus();
    		return false;
    	}
    	//参观事由必须正确填写
    	if(remark ==""){
    		ip.ipInfoJump("参观事由或者介绍必须正确填写!", "error");
    		$("#remark").focus();
    		return false;
    	}
    	
    	//联系人必须正确填写
    	if(contacts == ""){
    		ip.ipInfoJump("联系人必须正确填写!", "error");
    		$("#contacts").focus();
    		return false;
    	}
    	//联系电话必须正确填写
    	if(phone_num ==""){
    		ip.ipInfoJump("联系电话必须正确填写!", "error");
    		$("#phone_num").focus();
    		return false;
    	}
    	else{
    		var RegExp = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
			var telphoneRegExp=/\d{3}-\d{8}|\d{4}-\d{7}|\d{4}-\d{8}/;
			if (!(RegExp.test(phone_num) || telphoneRegExp.test(phone_num)) ) {
				$("#warning").html("请输正确手机号，如果是固话加‘-’，如  0371-2XXXXXXX ");
				$("#phone_num").focus();
				return false;
			}
			else{
				$("#warning").html("");
			}
    	}
    	//参观日期必须正确填写
    	if(visit_date ==""){
    		ip.ipInfoJump("参观日期必须正确填写!", "error");
    		$("#visit_date").focus();
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
		//初始化下拉列表
		viewModel.initDropDownList();
    });

});
