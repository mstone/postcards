var Home = {
	controller: function () {
		return this;
	},
	view: function (c) {
		return m("form.container",
			m("div.row",
				m("div.col-xs-12",
					m("h1", "Remember how you feel today.", m("br"), "Remind yourself to act tomorrow.")
				)
			),
			m("div.row",
				m("div.col-xs-12",
					m("p", "In the wake of the 2016 election many of us are having some pretty strong feelings, and we're looking for ways to get involved, but as anyone with a New Year's resolution knows, life can get in the way of the best intentioned plans.  We invite you to write yourself a postcard today, we promise to print and send your postcard 6 months before the next election – early enough to get involved.")
				)
			),
			m("div.row",
				m("div", {
						"class": "col-xs-12 form-group form-inline"
					},
					m("label", {
						"for": "salutation"
					}, "Dear"),
					" ",
					m("input", {
						"type": "text",
						"class": "form-control",
						"id": "salutation",
						"placeholder": "Jane"
					}),
					","
				)
			),
			m("div.row",
				m("div", {
						"class": "col-xs-12 form-group"
					},
					m("label", {
						"for": "body"
					}, "In 2016, Trump won and I felt"),
					m("textarea.form-control", {
						"rows": 2,
						"id": "body",
						"placeholder": "..."
					})
				)
			),
			m("div.row",
				m("div", {
						"class": "form-group col-xs-12",
					},
					m("label", {
						"for": "address1",
						"class": ""
					}, "Street address"),
					" ",
					m("small", "(Note: We will use your address to send you the reminder you wrote above and for no other purpose.)"),
					m("input", {
						"type": "text",
						"id": "address1",
						"class": "form-control"
					}),
					m("input", {
						"type": "text",
						"id": "address2",
						"class": "form-control"
					})
				)
			),
			m("div.row",
				m("div", {
						"class": "form-group col-xs-4"
					},
					m("label", {
						"for": "city"
					}, "City"),
					m("input", {
						"type": "text",
						"id": "city",
						"class": "form-control"
					})
				),
				m("div", {
						"class": "form-group col-xs-4"
					},
					m("label", {
						"for": "state"
					}, "State"),
					m("input", {
						"type": "text",
						"id": "state",
						"class": "form-control"
					})),
				m("div", {
						"class": "form-group col-xs-4"
					},
					m("label", {
						"for": "zip"
					}, "ZIP Code"),
					m("input", {
						"type": "text",
						"id": "zip",
						"class": "form-control"
					}))
			),
			m("div.row", m("div", {
					"class": "col-xs-12 form-group"
				},
				m("label", "I'm most excited to get involved in"),
				m("div", {
						"class": "radio"
					},
					m("label",
						m("input", {
							"type": "radio",
							"name": "election",
							"value": "house"
						}),
						"House elections"
					)
				),
				m("div", {
						"class": "radio"
					},
					m("label",
						m("input", {
							"type": "radio",
							"name": "election",
							"value": "senate"
						}),
						"Senate elections"
					)
				),
				m("div", {
						"class": "radio"
					},
					m("label",
						m("input", {
							"type": "radio",
							"name": "election",
							"value": "president"
						}),
						"Presidential elections"
					)
				),
				m("div", {
						"class": "radio"
					},
					m("label",
						m("input", {
							"type": "radio",
							"name": "election",
							"value": "state"
						}),
						"State and local elections"
					)
				),
				m("div", {
						"class": "radio"
					},
					m("label",
						m("input", {
							"type": "radio",
							"name": "election",
							"value": "civil"
						}),
						"Protecting civil liberties outside of Washington"
					)
				)
			)),
			m("div.row", m("div", {
					"class": "col-xs-12 form-group"
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
			))
		);
	}
};

m.route.mode = "pathname";

m.route(document.body, "/", {
	"/": Home,
});

m.route("/");