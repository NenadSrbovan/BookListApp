# BookListApp
React app
Create a reusable React component that displays a list of books. Each item should have:

A title: Displayed prominently.
A description: Shown below the title.
An optional image: Displayed alongside the title and description (consider providing a placeholder image URL if no image is provided).
A toggle: Allows the user to show/hide the description.
A new item button: On click adds a new book and causes an automatic update of the list
There is no need to consider persisted storage for this scenario, use of a pre-populated mocked data model in memory is sufficient.
We should be able to run the solution to see the component in action.
Added functionality edit a book, delete a book.

Component Reusability: The component should accept the title, description, and image URL as props. It should handle cases where the description or image URL are missing.
State Management: The component should use React state to manage the visibility of the description.
JSX and Styling: The component should use JSX for rendering and basic CSS (inline or a simple stylesheet) for styling. Avoid overly complex styling.
Error Handling: The component should gracefully handle potential errors, such as an invalid image URL. A simple placeholder message would suffice.
Testing: Request a simple test (e.g., using Jest or React Testing Library) to cover at least one aspect of the component's functionality. 

There’s only 1 explicit non-functional requirement:
Structure your code using modern development practices, the type you’d be proud to see in production
Consider accessibility standards (WCAG)
