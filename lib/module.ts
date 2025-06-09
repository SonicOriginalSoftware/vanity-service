import type { VcsVariant } from "./vcs_variant.js"

export type Module = {
  readonly name: string
  readonly version?: string
  readonly vcsVariant: VcsVariant
}
