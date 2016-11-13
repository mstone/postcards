package main

import (
	"bufio"
	"encoding/hex"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/jamesruan/sodium"

	"github.com/juju/errors"
)

type KpMsg struct {
	PublicKey []byte
	SecretKey []byte
}

func main() {
	generate := flag.Bool("g", false, "generate keys")
	decrypt := flag.Bool("d", false, "decrypt messages")
	keypairPath := flag.String("k", "keys", "path to keypair")
	flag.Parse()

	switch {
	case *generate:
		kp := sodium.MakeBoxKP()

		kpMsg := KpMsg{
			PublicKey: []byte(kp.PublicKey.Bytes),
			SecretKey: []byte(kp.SecretKey.Bytes),
		}

		if err := json.NewEncoder(os.Stdout).Encode(kpMsg); err != nil {
			log.Fatalf("err: %q", errors.Trace(err))
		}
	case *decrypt:
		keypairFile, err := os.Open(*keypairPath)
		if err != nil {
			log.Fatalf("err: %q", errors.Trace(err))
		}

		kpMsg := KpMsg{}

		if err = json.NewDecoder(keypairFile).Decode(&kpMsg); err != nil {
			log.Fatalf("err: %q", errors.Trace(err))
		}

		kp := sodium.BoxKP{
			PublicKey: sodium.BoxPublicKey{
				Bytes: sodium.Bytes(kpMsg.PublicKey),
			},
			SecretKey: sodium.BoxSecretKey{
				Bytes: sodium.Bytes(kpMsg.SecretKey),
			},
		}

		scanner := bufio.NewScanner(os.Stdin)
		for scanner.Scan() {
			ctxt, err := hex.DecodeString(strings.Trim(scanner.Text(), "\n"))
			if err != nil {
				log.Printf("err: %q", errors.Trace(err))
				continue
			}
			ptxt, err := sodium.Bytes(ctxt).SealedBoxOpen(kp)
			if err != nil {
				log.Printf("err: %q", errors.Trace(err))
			}
			fmt.Printf("%s\n", ptxt)
		}
	}
}
