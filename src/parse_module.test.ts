import { expect, test } from "vitest"

import { parse } from "./parse_module.js"

test("valid path with full semver version", async () => {
  const name = "user/repo"
  const version = "v1.0.0"
  const path = `${name}/${version}`

  const module = await parse(path)
  console.log("Module:", module)

  expect(module).toEqual({
    name: "user/repo",
    version: "v1.0.0",
  })
})

test("valid path with shortened semver version", async () => {
  const name = "user/repo"
  const version = "v2.0"
  const path = `${name}/${version}`

  const module = await parse(path)
  console.log("Module:", module)

  expect(module).toEqual({ name, version })
})

test("valid path with minimal semver version", async () => {
  const name = "user/repo"
  const version = "v2"
  const path = `${name}/${version}`

  const module = await parse(path)
  console.log("Module:", module)

  expect(module).toEqual({ name, version })
})

test("valid path with no version", async () => {
  const name = "user/repo"
  const version = ""
  const path = `${name}`

  const module = await parse(path)
  console.log("Module:", module)

  expect(module).toEqual({ name, version })
})
