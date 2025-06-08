import { expect, test } from "vitest"

import {
  semanticVersionFull,
  semanticVersionMinimal,
  semanticVersionShort,
  validPath,
} from "../test/data.js"
import { parse } from "./parse_module.js"

test("valid path with full semver version", async () => {
  const path = `${validPath}/v${semanticVersionFull}`

  const module = await parse(path)
  console.log("Module:", module)

  expect(module).toEqual({ name: validPath, version: semanticVersionFull })
})

test("valid path with shortened semver version", async () => {
  const path = `${validPath}/v${semanticVersionShort}`

  const module = await parse(path)
  console.log("Module:", module)

  expect(module).toEqual({ name: validPath, version: semanticVersionShort })
})

test("valid path with minimal semver version", async () => {
  const path = `${validPath}/v${semanticVersionMinimal}`

  const module = await parse(path)
  console.log("Module:", module)

  expect(module).toEqual({ name: validPath, version: semanticVersionMinimal })
})

test("valid path with no version", async () => {
  const path = `${validPath}`

  const module = await parse(path)
  console.log("Module:", module)

  expect(module).toEqual({ name: validPath })
})

test("invalid path", async () => {
  const path = ""

  const module = parse(path)

  await expect(module).rejects.toThrow(
    "Invalid path. Module path must have at least two segments (user/repo)."
  )
})
