# Before Getting Started

The starting code for this project is very similar to the previous project. The only changes are as follows:

1. A new `prisma` folder has been added which includes all the code for the database we will be using with this project.
2. A new `src/db` folder has been added which includes all the functions for interfacing with the database. These are one to one mappings of all the functions in the `src/api` folder.
3. The `src/app/posts/page.tsx` route has been modified to include a search form that currently does nothing. The `loading.tsx` file has also been removed in favor of `Suspense` inside the `page.tsx` file.
4. A `.env` file has been added which includes the `DATABASE_URL` environment variable. This is for Prisma so it knows where our database is. You do not need to change this.
5. A new `FormGroup` component was added which is used by the `SearchForm` component.

The main goal of this project is to practice working with a database instead of `fetch` as well as practice working with search parameters. To get the database working you will need to run the following commands:

1. `npm install` - This will install all the dependencies for the project.
2. `npx prisma db push` - This will create the database and all the tables.
3. `npx prisma db seed` - This will seed the database with data that is very similar to the data from the API.
4. You may need to run `npx prisma generate` if you get any errors about missing types. If this doesn't fix the typing errors just run the command `TypeScript: Restart TS Server` in the VSCode command palette or restart VSCode.
5. `npm run dev` - This will start the development server. There is no need for an API server anymore.

# Database Information

All the functions you need to access the database are already created in the `src/db` folder so you shouldn't need to directly interact with the database at all. You will need to make changes to the code in these files for some of the parts of this project, but you don't need to understand how Prisma works to make these changes.

# Instructions

1. Replace all the `fetch` calls in the `src/api` folder with calls to the database functions in the `src/db` folder. I manually added a 2 second delay to each database function call so you can still see your loading states.
2. Add a search form to the `src/app/posts/page.tsx` page that allows the user to search for posts by `title`/`body` and the `userId`.
   - This search form will most likely use a combination of the `searchParams` prop, the `useSearchParams` hook, and the `useRouter` hook to update the URL when the user submits the form.

# Bonus:

1. Ensure the user and posts data is loaded in parallel to ensure the `/posts` route is loaded as fast as possible.
2. Add caching for all the database calls so the results will be stored in the full page cache and the data cache.
