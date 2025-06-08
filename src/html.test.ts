import { expect, test } from "vitest"

import { semanticVersionFull, validPath } from "../test/data.js"
import { env } from "../test/env.js"
import { render } from "./html.js"

test("valid name and version", async () => {
  const original = `${env.ORIGINAL_HOST}/${validPath}/v${semanticVersionFull}`
  const redirect = `${env.REDIRECT_HOST}/${validPath}`
  const meta = `<meta name="go-import" content="${original} mod ${redirect}" />`
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      ${meta}
    </head>
  </html>
  `

  const rendered = await render(
    env.ORIGINAL_HOST,
    env.REDIRECT_HOST,
    validPath,
    semanticVersionFull
  )

  expect(rendered).equals(html)
})
