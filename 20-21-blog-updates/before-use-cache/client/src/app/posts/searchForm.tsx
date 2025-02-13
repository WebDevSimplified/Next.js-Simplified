"use client"

import { FormGroup } from "@/components/FormGroup"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FormEvent, ReactNode, Suspense, useRef } from "react"

export function SearchForm({ userOptions }: { userOptions: ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const query = searchParams.get("query") || ""
  const userId = searchParams.get("userId") || ""
  const queryRef = useRef<HTMLInputElement>(null)
  const userRef = useRef<HTMLSelectElement>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const params = new URLSearchParams(searchParams)
    params.set("query", queryRef.current?.value || "")
    params.set("userId", userRef.current?.value || "")

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="form mb-4">
      <div className="form-row">
        <FormGroup>
          <label htmlFor="query">Query</label>
          <input
            type="search"
            name="query"
            id="query"
            defaultValue={query}
            ref={queryRef}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={userId} ref={userRef}>
            <Suspense fallback={<option value="">Loading...</option>}>
              {userOptions}
            </Suspense>
          </select>
        </FormGroup>
        <button className="btn">Filter</button>
      </div>
    </form>
  )
}
