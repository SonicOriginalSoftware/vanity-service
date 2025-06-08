import { expect, test } from "vitest"

import {
  semanticVersionFull,
  semanticVersionMinimal,
  semanticVersionShort,
  validPath,
} from "../test/data.js"
import type { Module } from "./module.js"
import { parse } from "./parse_module.js"
import { VcsVariant } from "./vcs_variant.js"

test("valid path with full semver version", async () => {
  const path = `${validPath}/v${semanticVersionFull}`
  const expected: Module = {
    name: validPath,
    version: semanticVersionFull,
    vcsVariant: VcsVariant.Git,
  }

  const module = await parse(path, VcsVariant.Git)
  console.log("Module:", module)

  expect(module).toEqual(expected)
})

test("valid path with shortened semver version", async () => {
  const path = `${validPath}/v${semanticVersionShort}`
  const expected: Module = {
    name: validPath,
    version: semanticVersionShort,
    vcsVariant: VcsVariant.Git,
  }

  const module = await parse(path, VcsVariant.Git)
  console.log("Module:", module)

  expect(module).toEqual(expected)
})

test("valid path with minimal semver version", async () => {
  const path = `${validPath}/v${semanticVersionMinimal}`
  const expected: Module = {
    name: validPath,
    version: semanticVersionMinimal,
    vcsVariant: VcsVariant.Git,
  }

  const module = await parse(path, VcsVariant.Git)
  console.log("Module:", module)

  expect(module).toEqual(expected)
})

test("valid path with no version", async () => {
  const path = `${validPath}`
  const expected: Module = {
    name: validPath,
    vcsVariant: VcsVariant.Git,
  }

  const module = await parse(path, VcsVariant.Git)
  console.log("Module:", module)

  expect(module).toEqual(expected)
})
