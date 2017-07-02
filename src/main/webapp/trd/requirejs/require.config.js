require.config({
	baseUrl: "/xsg/",
	waitSeconds: 0,
	paths: {
		text: "trd/requirejs/text",
		css: "trd/requirejs/css",
		jquery: "trd/jquery/jquery-3.2.1.min",
		bootstrap: 'trd/bootstrap/js/bootstrap',
		knockout: "trd/knockout/knockout-3.2.0.debug",
		uui: "trd/uui/js/u",
		director:"trd/director/director",
		polyFill: "trd/uui/js/u-polyfill",
		tree: "trd/uui/js/u-tree",
		grid: "trd/uui/js/u-grid",
		dataPicker:"trd/datepicker/js/bootstrap-datetimepicker",
		dataPickerMin:"bootstrap-datetimepicker.min",
		dataPickerCN:"trd/datepicker/js/bootstrap-datetimepicker.zh-CN"
	},
	shim: {
		'uui':{
			deps: ["jquery","bootstrap","polyFill", "css!trd/uui/css/font-awesome.min.css"]
		},
		'bootstrap': {
			deps: ["jquery"]
		},
		'tree': {
			deps: ["uui"]
		},
		'grid': {
			deps: ["uui"]
		},
		"dataPicker":{
			deps: ["jquery","bootstrap","css!trd/datepicker/css/datepicker.css"]
		},
		"dataPickerCN":{
			deps: ["dataPicker"]
		}
	}
});
