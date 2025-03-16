import { getUsers } from "@/db/users"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Link from "next/link"

export default function UsersPage({
  users,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {users.map(user => (
          <div key={user.id} className="card">
            <div className="card-header">{user.name}</div>
            <div className="card-body">
              <div>{user.companyName}</div>
              <div>{user.website}</div>
              <div>{user.email}</div>
            </div>
            <div className="card-footer">
              <Link className="btn" href={`users/${user.id.toString()}`}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export const getStaticProps = (async () => {
  const users = await getUsers()

  return { props: { users } }
}) satisfies GetStaticProps
