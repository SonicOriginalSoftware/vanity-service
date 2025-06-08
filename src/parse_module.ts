import type { Module } from "./module.ts"

export async function parse(path: string): Promise<Module> {
  const parts = path.split("/").filter(Boolean)
  if (parts.length < 2)
    throw new Error("Invalid path. Module path must have at least two segments (user/repo).")
  let version = parts.pop()

  let name = parts.join("/")

  if (version && version[0] !== "v") {
    name = `${name}/${version}`
    version = undefined
  } else if (version && version[0] === "v") {
    version = version.substring(1)
  }

  const module: Module = { name, version }

  return module
}
