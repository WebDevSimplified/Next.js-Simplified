export function validatePost({
  title,
  body,
  userId,
}: {
  title: string
  body: string
  userId: number
}) {
  const errors: { title?: string; body?: string; userId?: string } = {}
  let isValid = true

  if (title === "") {
    errors.title = "Required"
    isValid = false
  }

  if (body === "") {
    errors.body = "Required"
    isValid = false
  }

  if (isNaN(userId)) {
    errors.userId = "Required"
    isValid = false
  }

  return [isValid ? { title, body, userId } : undefined, errors] as const
}
