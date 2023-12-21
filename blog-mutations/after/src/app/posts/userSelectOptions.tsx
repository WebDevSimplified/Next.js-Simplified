import { getUsers } from "@/db/users"

export async function UserSelectOptions({
  withAnyOption = false,
  users,
}: {
  withAnyOption?: boolean
  users?: Awaited<ReturnType<typeof getUsers>>
}) {
  if (users == null) users = await getUsers()

  return (
    <>
      {withAnyOption && <option value="">Any</option>}
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </>
  )
}
