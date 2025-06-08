import type { Env } from "./env.js"
import { healthCheck } from "./health.js"
import { render } from "./html.js"
import { parse } from "./parse_module.js"

async function fetch(request: Request, env: Env): Promise<Response> {
  console.debug("Received request:", request.method, request.url)

  if (request.method !== "GET") {
    console.error("Unsupported method:", request.method)
    return new Response("Method not allowed. Only GET requests are supported.", {
      status: 405,
      headers: { "Content-Type": "text/plain" },
    })
  }

  const url = new URL(request.url)

  if (url.pathname === "/health") return healthCheck()

  if (!url.searchParams.has("go-get")) {
    console.error("Missing 'go-get' parameter in request.")
    return new Response("Missing 'go-get' parameter.", {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    })
  }

  if (url.pathname === "/") {
    console.error("Invalid path request.")
    return new Response("Invalid path. Please specify a module path.", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    })
  }

  const module = await parse(url.pathname)

  console.debug("Looking up module:", module)

  const html = await render(env.ORIGINAL_HOST, env.REDIRECT_HOST, module.name, module.version)

  return new Response(html, { headers: { "Content-Type": "text/html" } })
}

export default { fetch }
