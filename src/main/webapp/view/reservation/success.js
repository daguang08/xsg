require(['jquery', 'knockout', 'bootstrap', 'uui', 'director'], function ($, ko) {
    window.ko = ko;
    //预约时间段数组
    var visitTimeArray=["上午8点  ~ 上午10点","上午10点  ~ 上午12点","下午1点  ~ 下午3点","下午3点  ~ 下午5点","下午5点  ~ 下午7点"];
    
    
    var viewModel={
    		
    };
    
	//获取数据
	viewModel.initData= function() {
		$.ajax({
    		url:"/xsg/reservation/getReservationById",
    		type: 'GET',
    		dataType: 'json',
    		data:{"guid":getQueryString("guid")},
    		success: function (data){
    			if(data.result == "success"){
    				var appendHtml="";
    				var dataList=data.resData;
    				var reservationListEle=$("#reservationData");
    				var index=dataList.visit_time;
    				appendHtml +="<p>"+"参观单位："+dataList.unit+"</p>";
    				appendHtml +="<p>"+"参观时间："+dataList.visit_date+" "+visitTimeArray[index]+"</p>";
    				appendHtml +="<p>"+"参观人数："+dataList.visit_num +"</p>";
    				appendHtml +="<p>"+"联系人："+dataList.contacts+"</p>";
    				appendHtml +="<p>"+"联系电话："+dataList.phone_num+"</p>";
    				appendHtml +="<p>"+"其他说明："+dataList.remark+"</p>";
    				reservationListEle.append(appendHtml);
    			}
    		}
	});
	};
	
	//获取url参数
	function getQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return unescape(r[2]); return null; 
	} 
	
	
	$(function () {
		ko.cleanNode($('body')[0]);
		var app = u.createApp({
			el : "body",
			model : viewModel
		});
		
		viewModel.initData();
    });
	
});