var Home = {
	controller: function () {
		var c = this;

		c.success = m.prop(false);
		c.err = m.prop();
		c.salutation = m.prop("");
		c.message = m.prop("");
		c.address1 = m.prop("");
		c.address2 = m.prop("");
		c.city = m.prop("");
		c.state = m.prop("");
		c.zip = m.prop("");
		c.election = m.prop("");
		c.email = m.prop("");

		this.save = function (e) {
			e.preventDefault();

			var recipient_pk = sodium.from_hex("1dbcd662fc6aa689321eb659b7d5c537a9c69951b1aa808ef5b4759c2ac56864");
			var plaintext = JSON.stringify({
				Salutation: c.salutation(),
				Message: c.message(),
				Address1: c.address1(),
				Address2: c.address2(),
				City: c.city(),
				State: c.state(),
				Zip: c.zip(),
				Election: c.election(),
				Email: c.email()
			});

			var ciphertext = sodium.to_hex(sodium.crypto_box_seal(plaintext, recipient_pk));
			var hash = sodium.to_hex(sodium.crypto_generichash(16, plaintext));

			m.request({
				"method": "POST",
				"url": "/",
				"data": {
					"Version": 2,
					"Key": hash,
					"Data": ciphertext
				}
			}).then(function (res) {
				c.success(true)
			}).catch(function (err) {
				c.err(err)
			})
		};

		return this;
	},
	view: function (c) {
		var radio = function (value, label, prop) {
			var checked = prop() === value;
			var attrs = {
				"type": "radio",
				"value": value,
				"name": "election",
				"onclick": m.withAttr("value", prop)
			};
			if (checked) {
				attrs.checked = true;
			}
			return m("div", {
					"class": "radio"
				},
				m("label",
					m("input", attrs),
					label
				)
			)
		};

		if (c.success()) {
			return m("div.container",
				m("div.row",
					m("div.col-xs-12",
						m("h1", "Thanks! :-)"))),
				m("div.row",
					m("div.col-xs-12",
						m("h3", "-- the Nov. 8 Postcard Team"))),
				m("br"),
				m("br"),
				m("div.row",
					m("div.col-xs-12",
						m("button", {
							"class": "btn btn-primary",
							"onclick": function (e) {
								c.success(false);
							}
						}, "Continue"))));
		}
		if (c.err()) {
			return m("div.container",
				m("div.row",
					m("div.col-xs-12",
						m("h1", "Sorry, something went wrong; please try again! :-)"))),
				m("div.row",
					m("div.col-xs-12",
						m("h3", "-- the Nov. 8 Postcard Team"))),
				m("br"),
				m("br"),
				m("div.row",
					m("div.col-xs-12",
						m("button", {
							"class": "btn btn-primary",
							"onclick": function (e) {
								c.success(false);
							}
						}, "Try Again"))));
		}
		return m("form", {
				"class": "container",
				"onsubmit": c.save
			},
			m("div.row",
				m("div.col-xs-12",
					m("h1", "Remember how you feel today.", m("br"), "Remind yourself to act tomorrow.")
				)
			),
			m("div.row",
				m("div", {
						"class": "col-xs-12 col-md-8"
					},
					m("p", "In the wake of the 2016 election many of us are having some pretty strong feelings, and we're looking for ways to get involved, but as anyone with a New Year's resolution knows, life can get in the way of the best intentioned plans."),
					m("p", "We invite you to write yourself a postcard today. We will print and send your postcard 6 months before the next election – early enough to get involved.")
				)
			),
			m("br"),
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
						"placeholder": "Jane Roe",
						"value": c.salutation(),
						"oninput": m.withAttr("value", c.salutation)
					})
				)
			),
			m("div.row",
				m("div", {
						"class": "col-xs-12 col-md-6 form-group"
					},
					m("label", {
						"for": "message"
					}, "In 2016, Trump won and I felt"),
					m("textarea.form-control", {
						"rows": 4,
						"id": "message",
						"placeholder": "...",
						"value": c.message(),
						"oninput": m.withAttr("value", c.message)
					})
				)
			),
			m("div.row",
				m("div", {
						"class": "form-group col-xs-12 col-md-6",
					},
					m("label", {
						"for": "address1",
						"class": ""
					}, "Street address"),
					m("input", {
						"type": "text",
						"id": "address1",
						"placeholder": "100 W Main St",
						"class": "form-control",
						"value": c.address1(),
						"oninput": m.withAttr("value", c.address1)
					}),
					m("input", {
						"type": "text",
						"id": "address2",
						"placeholder": "Suite 4",
						"class": "form-control",
						"value": c.address2(),
						"oninput": m.withAttr("value", c.address2)
					})
				)
			),
			m("div.row",
				m("div", {
						"class": "form-group col-xs-6 col-md-3"
					},
					m("label", {
						"for": "city"
					}, "City"),
					m("input", {
						"type": "text",
						"id": "city",
						"placeholder": "Oklahoma City",
						"class": "form-control",
						"value": c.city(),
						"oninput": m.withAttr("value", c.city)
					})
				),
				m("div", {
						"class": "form-group col-xs-3 col-md-1"
					},
					m("label", {
						"for": "state"
					}, "State"),
					m("input", {
						"type": "text",
						"id": "state",
						"placeholder": "OK",
						"class": "form-control",
						"value": c.state(),
						"oninput": m.withAttr("value", c.state)
					})),
				m("div", {
						"class": "form-group col-xs-4 col-md-2"
					},
					m("label", {
						"for": "zip"
					}, "ZIP Code"),
					m("input", {
						"type": "text",
						"id": "zip",
						"placeholder": "73102",
						"class": "form-control",
						"value": c.zip(),
						"oninput": m.withAttr("value", c.zip)
					}))
			),
			m("div.row", m("div", {
					"class": "col-xs-12 form-group"
				},
				m("label", "I'm most excited to get involved in"),
				radio("house", "House elections", c.election),
				radio("senate", "Senate elections", c.election),
				radio("president", "Presidential elections", c.election),
				radio("state", "State and local elections", c.election),
				radio("civil", "Protecting civil liberties beyond Washington", c.election)
			)),
			m("div.row", m("div", {
					"class": "col-xs-12 col-md-6 form-group"
				},
				m("label", {
					"for": "email"
				}, "Email Signup (optional)"),
				m("p", m("small", "(We're a small team not affiliated with any candidate and while we can commit to sending our first thousand or so cards, we might need your help after that. :-)")),
				m("input", {
					"type": "email",
					"class": "form-control",
					"id": "email",
					"placeholder": "jane.roe@gmail.com",
					"value": c.email(),
					"oninput": m.withAttr("value", c.email)
				})
			)),
			m("div.row", m("div", {
					"class": "col-xs-12 form-group",
				},
				m("button", {
					"type": "submit",
					"class": "btn btn-primary",
					"onclick": c.save
				}, "Send my postcard!")
			))
		);
	}
};

m.route.mode = "pathname";

m.route(document.body, "/", {
	"/": Home,
});

m.route("/");