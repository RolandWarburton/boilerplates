package main

import (
	"fmt"
	"net/http"
	"strings"
)

func createSuffixChecker(path string) func(extension string) bool {
	return func(extension string) bool {
		return strings.HasSuffix(path, extension)
	}
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		suffix := createSuffixChecker(r.URL.Path)

		if suffix(".js") || suffix(".js.map") || suffix(".css") || suffix(".css.map") {
			http.ServeFile(w, r, "./dist"+r.URL.Path)
			return
		}

		// fallback on serving index page for any request that is not above
		http.ServeFile(w, r, "./dist/index.html")
	})

	fmt.Println("Server started on localhost:8081")
	http.ListenAndServe(":8081", nil)
}
