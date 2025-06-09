export async function handle(): Promise<Response> {
  const responseBody = JSON.stringify({ status: "healthy" })

  return new Response(responseBody, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
