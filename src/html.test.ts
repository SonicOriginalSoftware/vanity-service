import { expect, test } from "vitest"

import { render } from "./html.js"

test("valid name and version", async () => {
  const name = "user/repo"
  const version = "1.0.0"
  const originalHost = "https://example.com"
  const redirectHost = "https://example.com/redirect"
  const original = `${originalHost}/${name}/v${version}`
  const redirect = `${redirectHost}/${name}`
  const meta = `<meta name="go-import" content="${original} git ${redirect}" />`

  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      ${meta}
    </head>
  </html>
  `
  const rendered = await render(originalHost, redirectHost, name, version)

  expect(rendered).toBe(html)
})
