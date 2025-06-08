import type { Module } from "./module.ts"

export async function parse(path: string): Promise<Module> {
  const parts = path.split("/")
  let version = parts.pop()

  let name = parts.join("/")

  if (version && version[0] !== "v") {
    name = `${name}/${version}`
    version = ""
  }

  const module: Module = { name, version }

  return module
}
