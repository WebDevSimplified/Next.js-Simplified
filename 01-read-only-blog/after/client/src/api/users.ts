type User = {
  id: number
  name: string
  email: string
  website: string
  address: {
    city: string
    street: string
    zipcode: string
    suite: string
  }
  company: {
    name: string
  }
}

export async function getUsers() {
  await wait(2000)
  return fetch(`${process.env.API_URL}/users`)
    .then(res => res.json())
    .then(data => data as User[])
}

export async function getUser(userId: string | number) {
  await wait(2000)
  return fetch(`${process.env.API_URL}/users/${userId}`)
    .then(res => res.json())
    .then(data => data as User)
}

function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
