import type { Module } from "./module.ts"
import { VcsVariant } from "./vcs_variant.js"

export async function parse(path: string, vcsVariant: VcsVariant): Promise<Module> {
  const parts = path.split("/").filter(Boolean)
  let version = parts.pop()

  let name = parts.join("/")

  if (version && version[0] !== "v") {
    name = `${name}/${version}`
    version = undefined
  } else if (version && version[0] === "v") {
    version = version.substring(1)
  }

  const module: Module = { name, version, vcsVariant }

  return module
}
