import type { Env } from "../lib/env.js"
import { render } from "../lib/html.js"
import { parse } from "../lib/parse_module.js"
import { VcsVariant } from "../lib/vcs_variant.js"

export async function handle(pathname: string, env: Env): Promise<Response> {
  const vcsVariant = VcsVariant.Git
  console.debug("Received request for path:", pathname)
  let module = await parse(pathname, vcsVariant)

  console.debug("Looking up module:", JSON.stringify(module))

  const html = await render(
    env.ORIGINAL_HOST,
    env.REDIRECT_HOST,
    module.name,
    module.version,
    module.vcsVariant
  )

  return new Response(html, { headers: { "Content-Type": "text/html" } })
}
