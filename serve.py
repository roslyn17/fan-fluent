"""Local dev server for Fan Fluent. Standard library only.

Same as `python3 -m http.server`, but tells the browser not to keep old copies
of files, so edits always show up on a normal refresh.

Usage: python3 serve.py [port]   (default port 8173)
"""
import http.server
import sys


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8173
    print(f"Fan Fluent running at http://localhost:{port}  (Ctrl+C to stop)")
    http.server.ThreadingHTTPServer(("", port), NoCacheHandler).serve_forever()
