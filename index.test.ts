import { expect, test } from "vitest"

import all from "./index.js"
import { validPath } from "./test/data.js"
import { env } from "./test/env.js"

test("valid path with no query", async () => {
  const request = new Request(`${env.ORIGINAL_HOST}/${validPath}`)
  const response = await all.fetch(request, env)

  const text = await response.text()

  expect(response.status).toBe(400)
  expect(text).toBe("Bad Request")
})
