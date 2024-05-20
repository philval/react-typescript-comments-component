# React Typescript Comments Component

The ["Interactive comments section"](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9) challenge from frontendmentor.io using React and Typescript.

## Live Demo

The project is built and deployed on vercel.com at:

[react-typescript-comments-component.vercel.app](https://react-typescript-comments-component.vercel.app/)

## Requirements

Users should be able to:

- View the optimal layout for the app depending on their device's screen size.

- See hover states for all interactive elements on the page.

- Create, Read, Update, and Delete comments and replies.

- Upvote and downvote comments.

Other:

- A user can only edit or delete their own comments and replies.

- A user can not vote on their own comments.

- Replies and comments show date as "today".

- First-level comments should be ordered by their score, whereas nested replies are ordered by time added.

- Replying to a comment adds the new reply to the bottom of the nested replies within that comment.

- A confirmation modal should pop up before a comment or reply is deleted.

## Background

I have been learning Typescript for a while via [executeprogram.com](https://www.executeprogram.com/), and recognised it was time to build something non-trivial, so after some research, I decided on the "Interactive comments section" challenge from frontendmentor.io

## Starting Out

Initially I started on codesandbox.io, built some static components, forms, etc. using TS "strict" mode, loaded the initial data with a useEffect hook, and rendered the UI with minimal styling. The UI was very basic at this point, and until I was happy with the components, decide to defer any CSS concerns:

![static UI minimal CSS](https://raw.githubusercontent.com/philval/react-typescript-comments-component/main/static-UI-minimal-CSS.png)

Getting to this point, with no compile errors or warnings, was an eye-opener. Typescript enforces the code to be precise about the shape of data (eg. the comments Interface), what can be passed to and returned from functions/components, and ensures "undefined" is handled (eg. optional? replies to comments).

## Component Hierarchy Part One

...and then this happened:

![component hierarchy start](https://raw.githubusercontent.com/philval/react-typescript-comments-component/main/components-start.png)

The component hierarchy was poor. I had been ignoring a "Warning: Each child in a list should have a unique "key" prop." and it turns out this was non-trivial. So after a refactor, the component hierarchy actually looked like the hierarchy I had in mind:

![component hierarchy after refactor](https://raw.githubusercontent.com/philval/react-typescript-comments-component/main/components-after-refactor.png)

This of course all might change...

## React Testing Library (RTL)

RTL was new to me, so a slow-down in progress for some learnings. I had implemented Cypress in a previous role on a non-trivial React UI, and we looked into RTL on that project but did not adopt it. So I decided to go for RTL, and kinda like it.

To quote Robin Wieruch, "React Testing Library moves you towards testing user behavior and not implementation details". I was expecting to refactor components and state management, but users don't care about the implementation at all, so adopting RTL was a good investment.

RTL tests are run by Jest, and on "watch mode" feedback is relatively instant with no context switching, so the DX is good. One nice feature of RTL is that selection of HTML elements is often by their aria-role, mimicking how a screen-reader sees the app.

The library jest-dom extends RTL with "custom jest matchers to test the state of the DOM".
[https://github.com/testing-library/jest-dom](https://github.com/testing-library/jest-dom).

## Dev Container

I switched from codesandbox.io to a github.com devcontainer, and have enjoyed the simplicity (DX) of: 1. spinning up the container directly from the github repo, and 2. working on the same "powerful" box from any location/device.

Customising the build using a dockerfile was essential. It took some research to figure out how to run cypress.io (E2E testing) in headless mode, notably the requirement for [xvfb](https://en.wikipedia.org/wiki/Xvfb). Running a browser within the .devcontainer was beyond me, but cypress.io provides videos of failed E2E tests.

## Component Hierarchy Part Two

Did you ever code a component hierarchy perfectly on your first try?

The latest (final?) hierarchy looks like this:

![component hierarchy part two](https://raw.githubusercontent.com/philval/react-typescript-comments-component/main/components-part-two.png)

- A single `<Comment />` component is recursively rendered (its only a function). With E2E tests running, I felt confident in both moving to recursion, and deleting the former `<CommentReply />` component.
- `<ReplyForm />` and `<EditForm />` components are conditionally rendered when the user clicks on the relevant button.
- The `<DeleteModal />` component uses the HTML `dialog` element, available across "baseline" browsers since March 2022 (ref: [caniuse.com](https://caniuse.com/dialog)) and MDN.

## State

No state libraries, just React.

However the `<Comments />` state object is "hierarchical" and new comments can be created, updated, deleted on any `node` in the hierarchy.

React is very particular about not mutating state, and recommends ["flattening"](https://react.dev/learn/choosing-the-state-structure#avoid-deeply-nested-state) nested objects.

Spreading complex objects suffers from "shallow copies". So, I have used the structuredClone (web API) to "deep copy" existing state, and then feel confident in using mutating methods such as Array.prototype.push() on the state. The pattern:

```
setComments((prevComments: IComment[]): IComment[] => {
  const copiedComments = structuredClone(prevComments);
  ....
```

## CSS

The project uses a single `styles.css` file. Options are numerous for CSS in react projects:

- Global CSS
- Inline styles
- CSS modules
- CSS in JS eg. styled-components
- CSS Frameworks eg. Tailwind, Material-UI, Chakra UI, Mantine...
- StyleX from Facebook no less.

_"CSS fatigue" anyone ?_

Adopting any of them adds a dependency and increases maintenance effort. My primary objective is a Typescript project. I have used functional CSS before namely [Tachyons](https://tachyons.io/) (on a custom Wordpress Theme). If this component was part of a larger application, I would be very concerned about CSS scoping.

## Migrating to Vite

Switching away from Create-React-App to Vite was well overdue.

It went suprisingly smoothly on a separate branch, after following this [migration guide](https://www.robinwieruch.de/vite-create-react-app/).

The startup times are impressive, as promised!

- webpack 5.70.0 compiled successfully in 3296 ms
- webpack 5.70.0 compiled successfully in 2895 ms
- webpack 5.70.0 compiled successfully in 2204 ms

versus...

- VITE v5.2.8 ready in 197 ms
- VITE v5.2.8 ready in 283 ms

_"That is until I ran the tests!"_

The E2@ Cypress tests were fine, requiring one small change for PORT 5173 used by Vite.

The unit and RTL tests were throwing dozens of errors. Diagnosing and fixing them morphed into the hardest and most frustrating part of the whole project, "more rabbit holes than a warren".

There were too many moving parts : Typescript, Jest, RTL, testing in the DOM environment, my current configs, CRA no longer being maintained, and more. I had stalled. Badly. how to proceed?

_"When faced with a complex problem, one of the most effective strategies is to divide and conquer. This approach involves breaking down the problem into smaller, more manageable parts, and tackling each part individually."_

So. I started from 1st principles and setup a new repo based on the react-ts "template preset" from the Vite docs "Getting Started" guide.

```
npm create vite@latest react-ts -- --template react-ts
```

Then I installed Jest and wrote a few simple unit tests (no JSX) and got those working. Then installed RTL and wrote a few simple tests that included JSX, and got those working too.

Finally I updated my packages, configs, and tests with all the "findings" from the react-ts repo and "Voilà".

A beneficial sideeffect was updating my tests to Typescript and learning from that process too.

A second sideeffect was simplifying my test setup for a `<Dialog />` component. As far as I can tell, the ["HTMLDialogElement is not supported by Jest"](https://github.com/jsdom/jsdom/issues/3294) as yet, and found a solution via this issue on GitHub.

My feeling is that CRA was doing "a lot of magic under the hood", including using Jest as its test runner out of the box. Setting Jest up from scratch was a good process to go through.

## Deployment to Vercel

After switching to Vite, the deployment to Vercel failed with:

_"Error: No Output Directory named "build" found after the Build completed. You can configure the Output Directory in your Project Settings."_

The `/build` directory definitely contained bundle assets when running `npm run build` in my devcontainer. So, I deleted `/build`, ran `npm run build` again... and the build directory was now `/dist` - Vite defaults to `/dist`. The problem was that the Vercel "Framework Preset" was configured for Create-React-App. One small Vercel settings update to Vite, and the deployment succeeded.

... end ...
