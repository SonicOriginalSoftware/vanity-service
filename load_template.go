package main

import (
	"bytes"
	"html/template"
)

// LoadTemplate loads the vanity template for a given module name and version
func LoadTemplate(name, version string) (b []byte, e error) {
	module := Module{Name: name, Version: version}

	t, e := template.ParseFiles("vanity.html")
	if e != nil {
		return nil, e
	}

	var buf bytes.Buffer
	err := t.Execute(&buf, module)
	if err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}
