package main

import (
	"log"
	"net/http"
)

// HealthCheck responds to health check requests
func HealthCheck(w http.ResponseWriter, r *http.Request) {
	log.Println("Received request:", r.Method, r.URL.Path)

	w.Write([]byte("OK"))
}
