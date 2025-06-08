package main

import (
	"strings"
)

// ParseModuleRequest parses the request URL to extract the module name and version.
func ParseModuleRequest(path string) (string, string, error) {
	// Split the path to get the module name and version
	parts := strings.Split(path, "/")

	// Name is everything except the leading slash and trailing version
	name := strings.Join(parts[1:len(parts)-1], "/")

	version := parts[len(parts)-1]
	if version[0] != 'v' {
		version = ""

		name = strings.Join(parts[1:], "/")
	} else {
		// Remove the leading 'v' from the version
		version = version[1:]
	}

	return name, version, nil
}
