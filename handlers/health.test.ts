import { expect, test } from "vitest"

import all from "../index.js"
import { env } from "../test/env.js"

test("valid health check request", async () => {
  const request = new Request(`${env.ORIGINAL_HOST}/health`)
  const response = await all.fetch(request, env)

  const text = await response.text()

  expect(response.status).toBe(200)
  expect(text).toBe(JSON.stringify({ status: "healthy" }))
})
