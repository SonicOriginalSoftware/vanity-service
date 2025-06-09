import { handle as goGetHandler } from "./handlers/go_get.js"
import { handle as healthHandler } from "./handlers/health.js"
import type { Env } from "./lib/env.js"

async function fetch(request: Request, env: Env): Promise<Response> {
  console.debug("Received request:", request.method, request.url, JSON.stringify(request.headers))

  const url = new URL(request.url)
  const path = url.pathname
  const params = url.searchParams

  if (path === "/health") return healthHandler()
  else if (params.has("go-get")) return goGetHandler(path, env)
  else {
    console.error("Bad Request:", path, url.searchParams.toString())
    return new Response("Bad Request", {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    })
  }
}

export default { fetch }
