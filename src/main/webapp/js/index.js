require(['jquery', 'knockout', 'bootstrap', 'uui', 'director'], function ($, ko) {
    window.ko = ko;
 
    $(function () {
    	
    	$.ajax({
    		url:"/xsg/index",
    		type: 'GET',
    		data:{"a":"abc"},
    		dataType: 'json',
    		success: function (data){
    		console.log(data);
    		}
    	});
		
    });
});
