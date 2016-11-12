var Home = {
	controller: function () {
		return this;
	},
	view: function (c) {
		return m("div.container",
			m("div", {
					"class": "row col-xs-12"
				},
				m("h1", "Remember how you feel today, remind yourself to act tomorrow")
			),
			m("div", {
					"class": "row col-xs-12"
				},
				m("p", "In the wake of the 2016 election many of us are having some pretty strong feelings, and we're looking for ways to get involved, but as anyone with a New Year's resolution knows, life can get in the way of the best intentioned plans.  We invite you to write yourself a postcard today, we promise to print and send your postcard 6 months before the next election – early enough to get involved.")
			),
			m("div", {
					"class": "row col-xs-10 col-xs-offset-0"
				},
				m("form.form-horizontal",
					m("div", {
							"class": "row form-group"
						},
						m("label", {
							"for": "salutation"
						}, "Dear"),
						m("input", {
							"type": "text",
							"class": "form-control",
							"id": "salutation",
							"placeholder": "Jane"
						})
					),
					m("div", {
							"class": "row form-group"
						},
						m("label", {
							"for": "body"
						}, "In 2016, Trump won and I felt"),
						m("textarea.form-control", {
							"rows": 2,
							"id": "body",
							"placeholder": "..."
						})
					),
					m("div", {
							"class": "row form-group"
						},
						m("label", {
							"for": "address",
						}, "Address"),
						m("textarea.form-control", {
							"rows": 4,
							"id": "address",
							"placeholder": "..."
						}),
						m("small", "(Note: We will never share your address for any other purpose, but we will use it to send you the reminder you wrote above.)")
					),
					m("div", {
							"class": "row form-group"
						},
						m("label", "I'm most excited to get involved in"),
						m("div", {
								"class": "checkbox"
							},
							m("label",
								m("input", {
									"type": "checkbox",
									"value": ""
								}),
								"House elections"
							)
						),
						m("div", {
								"class": "checkbox"
							},
							m("label",
								m("input", {
									"type": "checkbox",
									"value": ""
								}),
								"Senate elections"
							)
						),
						m("div", {
								"class": "checkbox"
							},
							m("label",
								m("input", {
									"type": "checkbox",
									"value": ""
								}),
								"Presidential elections"
							)
						),
						m("div", {
								"class": "checkbox"
							},
							m("label",
								m("input", {
									"type": "checkbox",
									"value": ""
								}),
								"State and local elections"
							)
						),
						m("div", {
								"class": "checkbox"
							},
							m("label",
								m("input", {
									"type": "checkbox",
									"value": ""
								}),
								"Protecting civil liberties outside of Washington"
							)
						)
					),
					m("div", {
							"class": "row form-group"
						},
						m("label", {
							"for": "email"
						}, "Want to help us send more postcards? Sign up with your email address:"),
						m("input", {
							"type": "text",
							"class": "form-control",
							"id": "email",
							"placeholder": "jane.roe@gmail.com"
						})
					)
				)
			)
		);
	}
};

m.route.mode = "pathname";

m.route(document.body, "/", {
	"/": Home,
});

m.route("/");