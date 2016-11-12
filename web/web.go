package web

import (
	"encoding/json"
	"net/http"

	"google.golang.org/appengine"
	"google.golang.org/appengine/log"

	"github.com/juju/errors"
)

func init() {
	http.HandleFunc("/", handler)
}

type Postcard struct {
	Salutation string
	Message    string
	Address1   string
	Address2   string
	City       string
	State      string
	Zip        string
	Email      string
}

func handler(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)

	switch r.Method {
	case "POST":
		defer r.Body.Close()

		card := Postcard{}
		if err := json.NewDecoder(r.Body).Decode(&card); err != nil {
			log.Errorf(ctx, "post err: %q", errors.Trace(err))
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		log.Infof(ctx, "post got: %+v", card)
		w.WriteHeader(http.StatusOK)
	case "GET":
		http.Redirect(w, r, "/static/main.html", http.StatusFound)
		return
	}
}
