package web

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
	"google.golang.org/appengine/log"

	"github.com/juju/errors"
)

func init() {
	http.HandleFunc(acmePrefix, acmeHandler)
	http.HandleFunc("/", handler)
}

type Blob struct {
	Version int
	Key     string
	Data    string
}

const acmePrefix = "/.well-known/acme-challenge/"
const acmeFingerprint = "cJatbZTTFRDthVaJ66dPsQZPzKVpcTcFJRuBrQJ0klI"

func acmeHandler(w http.ResponseWriter, r *http.Request) {
	challenge := strings.TrimPrefix(r.URL.Path, acmePrefix)
	w.Header().Set("Content-Type", "text/plain")
	w.WriteHeader(200)
	fmt.Fprintf(w, "%s.%s", challenge, acmeFingerprint)
}

const maxBlobSize = 1024 * 10

func handler(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)

	switch r.Method {
	case "POST":
		defer r.Body.Close()

		blob := Blob{}
		if err := json.NewDecoder(io.LimitReader(r.Body, maxBlobSize)).Decode(&blob); err != nil {
			log.Errorf(ctx, "post err: %q", errors.Trace(err))
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		log.Infof(ctx, "post got: %+v", blob)
		key := datastore.NewKey(ctx, "blob", blob.Key, 0, nil)
		_, err := datastore.Put(ctx, key, &blob)
		if err != nil {
			log.Errorf(ctx, "post err: %q", errors.Trace(err))
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		w.WriteHeader(http.StatusOK)
		return
	case "GET":
		http.Redirect(w, r, "/static/main.html", http.StatusFound)
		return
	}
}
