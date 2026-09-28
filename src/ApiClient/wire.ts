/** Convert deprecated request field names without mutating the caller's object.
 * Canonical fields take precedence, including false, zero and empty strings. */
export function toWireRequest(request: object, aliases: Record<string, string>): Record<string, unknown> {
  const body: Record<string, unknown> = { ...request };
  for (const [legacy, canonical] of Object.entries(aliases)) {
    if (body[canonical] === undefined && body[legacy] !== undefined) body[canonical] = body[legacy];
    delete body[legacy];
  }
  return body;
}
