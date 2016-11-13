package main

import (
	"encoding/json"
	"flag"
	"log"
	"os"

	"github.com/jamesruan/sodium"

	"github.com/juju/errors"
)

func main() {
	flag.Parse()
	kp := sodium.MakeBoxKP()

	kpMsg := struct {
		PublicKey []byte
		SecretKey []byte
	}{
		PublicKey: []byte(kp.PublicKey.Bytes),
		SecretKey: []byte(kp.SecretKey.Bytes),
	}
	if err := json.NewEncoder(os.Stdout).Encode(kpMsg); err != nil {
		log.Fatalf("err: %q", errors.Trace(err))
	}
}
