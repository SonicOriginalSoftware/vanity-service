import { expect, test } from "vitest"

import { semanticVersionFull, validPath } from "../test/data.js"
import { env } from "../test/env.js"
import all from "./index.js"
import { VcsVariant } from "./vcs_variant.js"

test("invalid method request", async () => {
  const request = new Request(`${env.ORIGINAL_HOST}/${validPath}`, { method: "POST" })
  const response = await all.fetch(request, env)

  const text = await response.text()

  expect(response.status).toBe(405)
  expect(text).toBe("Method not allowed. Only GET requests are supported.")
})

test("valid health check request", async () => {
  const request = new Request(`${env.ORIGINAL_HOST}/health`)
  const response = await all.fetch(request, env)

  const text = await response.text()

  expect(response.status).toBe(200)
  expect(text).toBe(JSON.stringify({ status: "healthy" }))
})

test("valid path with no go-get parameter", async () => {
  const request = new Request(`${env.ORIGINAL_HOST}/${validPath}`)
  const response = await all.fetch(request, env)

  const text = await response.text()

  expect(response.status).toBe(400)
  expect(text).toBe("Missing 'go-get' parameter.")
})

test("valid request", async () => {
  const original = `${env.ORIGINAL_HOST}/${validPath}/v${semanticVersionFull}`
  const request = new Request(`${original}?go-get=1`)
  const meta = `<meta name="go-import" content="${original} ${VcsVariant.Git} ${env.REDIRECT_HOST}/${validPath}" />`
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      ${meta}
    </head>
  </html>
  `
  const response = await all.fetch(request, env)

  const text = await response.text()

  expect(response.status).toBe(200)
  expect(text).equals(html)
})
