export async function render(
  originalHost: string,
  redirectHost: string,
  name: string,
  version?: string,
  vcsVariant: string = "git"
): Promise<string> {
  const original = (version && `${originalHost}/${name}/v${version}`) || `${originalHost}/${name}`
  const redirect = `${redirectHost}/${name}`

  const meta = `<meta name="go-import" content="${original} ${vcsVariant} ${redirect}" />`

  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      ${meta}
    </head>
  </html>
  `

  return html
}
