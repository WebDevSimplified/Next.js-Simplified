# Before Getting Started

For this project we will be building the same blog style application that we have been working on with the app router, but this time we will be using the pages directory for everything. This pages version of the project will be a simpler version since we will be ignoring all complex loading states since they do not translate well to the pages directory and the way the loading is done is the same as any normal React application so it is not something specific to the pages directory.

The starting code has all the pages you will need already created and mostly implemented. All the JSX is pretty much done for you, but all the data fetching/mutation is left up to you. You will notice many places in the app where the are variables defined such as `const user: any = {}` that are used as placeholders for the data that should be fetched. This is done to minimize the amount of code you actually need to create for this project since writing all the JSX from scratch would be very repetitive. The goal of this project is to implement all the logic and data fetching/mutation for the application so it works the same way as the app router version of the project.

To get the database working you may need to run the following commands:

1. `npm install` - This will install all the dependencies for the project.
2. `npx prisma db push` - This will create the database and all the tables.
3. `npx prisma db seed` - This will seed the database with data that is very similar to the data from the API.
4. You may need to run `npx prisma generate` if you get any errors about missing types. If this doesn't fix the typing errors just run the command `TypeScript: Restart TS Server` in the VSCode command palette or restart VSCode.
5. `npm run dev` - This will start the development server. There is no need for an API server anymore.

# Database Information

All the functions you need to access the database are already created in the `src/db` folder so you shouldn't need to directly interact with the database at all.

# Instructions

1. Render each route dynamically or statically where appropriate.
   1. The `/users`, `/users/[userId]`, `/todos`, and `/posts/new` routes should be statically rendered.
   2. The `/posts`, `/posts/[postId]`, and `/posts/[postId]/edit` routes should be dynamically rendered.
2. Fetch all the data for each page using the appropriate methods based on how the pages should be rendered.
3. Ensure the search form on the `/posts` route works as expected.
4. Add the functionality to create a new post from the `/posts/new` route.
5. Add the functionality to edit a post from the `/posts/[postId]/edit` route.
6. Add the functionality to delete a post from the `/posts/[postId]` route.

## Bonus:

1. Add loading states to the submits buttons in all the forms that disable the buttons and display alternate text while the form is submitting.
   1. The new post form
   2. The edit post form
   3. The delete post button
   4. The search form
2. Ensure all static routes are properly revalidated whenever the data on those pages changes.
