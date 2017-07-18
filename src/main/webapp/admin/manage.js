require(['jquery', 'knockout', 'bootstrap', 'uui', 'director',"dataPickerCN","dataPicker","grid"], function ($, ko) {
    window.ko = ko;
    //预约时间段数组
    var visitTimeArray=["上午8点  ~ 上午10点","上午10点  ~ 上午12点","下午1点  ~ 下午3点","下午3点  ~ 下午5点","下午5点  ~ 下午7点"];
    
    var viewModel={
    		dataTableReserveList: new u.DataTable({
				meta : {
					"id" : {},
					'unit' : {},
					'visit_date' : {},
					'contacts' : {},
					'phone_num':{},
					'remark':{}
				}
			}),

    };
    //待完成 有个渲染功能
    //删除 获取选中行的id数组
    viewModel.delSelectedItems= function(){
    	
    };
    
	viewModel.initDataList = function(){
	 	$.ajax({
    		url:"/xsg/reservation/getReservationList",
    		type: 'GET',
    		dataType: 'json',
    		success: function (data){
    			if(data.result=="success"){
    				viewModel.dataTableReserveList.setSimpleData(data.dataList);
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
    	ko.cleanNode($('body')[0]);
		var app = u.createApp({
			el : "body",
			model : viewModel
		});
		
		viewModel.initDataList();
    });

});
