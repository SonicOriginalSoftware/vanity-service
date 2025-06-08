package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

// VanityHandler handles requests for vanity URLs
func VanityHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("Received request:", r.Method, r.URL.Path)

	if r.URL.Query().Get("go-get") == "" {
		http.NotFound(w, r)
		return
	}

	name, version, err := ParseModuleRequest(r.URL.Path)
	if err != nil {
		http.Error(w, "Invalid module request", http.StatusBadRequest)
		fmt.Fprintln(os.Stderr, "Error parsing module request:", err)
		return
	}

	log.Println("Looking up module:", name, "version:", version)

	b, err := LoadTemplate(name, version)
	if err != nil {
		http.Error(w, "Error loading template", http.StatusInternalServerError)
		fmt.Fprintln(os.Stderr, "Error loading template:", err)
		return
	}

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Write(b)
}
