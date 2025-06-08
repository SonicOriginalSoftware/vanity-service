//revive:disable:package-comments
package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/health", HealthCheck)
	http.HandleFunc("/", VanityHandler)

	const port = 8080
	fmt.Printf("Server is listening on port %d...\n", port)

	s := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)

	if s != nil {
		log.Fatal(s)
	}
}
