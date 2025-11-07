import { expect, test } from "vitest"

import all from "../index.js"
import { VcsVariant } from "../lib/vcs_variant.js"
import { semanticVersionFull, validPath } from "../test/data.js"
import { env } from "../test/env.js"

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

test("short request", async () => {
  const original = `${env.ORIGINAL_HOST}/${validPath}`
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
