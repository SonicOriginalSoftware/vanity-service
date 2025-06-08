import { expect, test } from "vitest"

import all from "./index.js"

const validPath = "user/repo"

const env = {
  ORIGINAL_HOST: "http://localhost",
  REDIRECT_HOST: "http://localhost/redirect",
}

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

  expect(response.status).toBe(200)
})

test("valid path with no go-get parameter", async () => {
  const request = new Request(`${env.ORIGINAL_HOST}/${validPath}`)
  const response = await all.fetch(request, env)

  expect(response.status).toBe(400)
  expect(await response.text()).toBe("Missing 'go-get' parameter.")
})

test("invalid path request", async () => {
  const request = new Request(`${env.ORIGINAL_HOST}?go-get=1`)
  const response = await all.fetch(request, env)

  expect(response.status).toBe(404)
  expect(await response.text()).toBe("Invalid path. Please specify a module path.")
})

test("valid request", async () => {
  const request = new Request(`${env.ORIGINAL_HOST}/${validPath}?go-get=1`)
  const response = await all.fetch(request, env)

  const text = await response.text()

  expect(response.status).toBe(200)
  expect(text).toContain("go-import")
})
