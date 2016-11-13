package web

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"google.golang.org/appengine"
	"google.golang.org/appengine/log"

	"github.com/juju/errors"
)

func init() {
	http.HandleFunc(acmePrefix, acmeHandler)
	http.HandleFunc("/", handler)
}

type Blob struct {
	Data string
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

const acmePrefix = "/.well-known/acme-challenges/"
const acmeFingerprint = "ZqVBf2SKHT-hfXZqASyY0ngetlEP5XFOhocQibrqEsw"

func acmeHandler(w http.ResponseWriter, r *http.Request) {
	challenge := strings.TrimPrefix(r.URL.Path, acmePrefix)
	w.Header().Set("Content-Type", "text/plain")
	w.WriteHeader(200)
	fmt.Fprintf(w, "%s.%s", challenge, acmeFingerprint)
}

func handler(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)

	switch r.Method {
	case "POST":
		defer r.Body.Close()

		blob := Blob{}
		if err := json.NewDecoder(r.Body).Decode(&blob); err != nil {
			log.Errorf(ctx, "post err: %q", errors.Trace(err))
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		log.Infof(ctx, "post got: %+v", blob)
		w.WriteHeader(http.StatusOK)
	case "GET":
		http.Redirect(w, r, "/static/main.html", http.StatusFound)
		return
	}
}
