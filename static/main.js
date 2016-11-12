

var Home = {
	controller: function() {
		return this;
	},
	view: function(c) {
		return m("h1", "Hello World");
	}
};

m.route.mode = "pathname";

m.route(document.body, "/", {
	"/": Home,
});
m.route("/");