# Before Getting Started

The starting code for this project is very similar to the previous project. The only changes are as follows:

1. The `src/db/posts.ts` file has been updated to include functions for creating, updating, and deleting posts.
2. The `src/app/posts/page.tsx` file has been updated to include a `New Post` button that links to the new post page.
3. The `UserSelectOptions` component has been moved into its own file `src/app/posts/userSelectOptions.tsx`.
4. A new page has been added for creating posts `src/app/posts/new.tsx`.
5. New `PostForm` and `SkeletonPostForm` components has been added to the `src/components/PostForm.tsx` file.

The main goal of this project is to practice working with server actions and dealing with loading states, and data revalidation.

# Database Information

All the functions you need to access the database are already created in the `src/db` folder so you shouldn't need to directly interact with the database at all.

# Instructions

1. Make the new post page actually functional using server actions.
   - Ensure all caches are properly revalidated.
2. Create an edit post page and make it functional using server actions.
   - Ensure all caches are properly revalidated.
   - Add an edit button to the post page that links to the edit page.
3. Add a delete button to the post page that deletes the post and redirects to the home page.
   - Ensure all caches are properly revalidated.

# Bonus:

1. Add loading states for the new/edit pages and the delete button.
   - This includes page loading states and button/form loading states.
2. Add data validation to the new/edit pages that requires the title/userId/body to be filled in.
   - This data validation should be done within the server action as well as on the client with the `required` HTML attribute.
