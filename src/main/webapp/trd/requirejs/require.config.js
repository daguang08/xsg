require.config({
	baseUrl: "/xsg/",
	waitSeconds: 0,
	paths: {
		text: "trd/requirejs/text",
		css: "trd/requirejs/css",
		jquery: "trd/jquery/jquery-1.12.3.min",
		bootstrap: 'trd/bootstrap/js/bootstrap',
		knockout: "trd/knockout/knockout-3.2.0.debug",
		uui: "trd/uui/js/u",
		director:"trd/director/director",
		polyFill: "trd/uui/js/u-polyfill",
		tree: "trd/uui/js/u-tree",
		grid: "trd/uui/js/u-grid",
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
		}
	}
});
