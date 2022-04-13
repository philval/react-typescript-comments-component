# React Typescript Comments Component

The [Frontend Mentor Challenge](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9) using React and Typescript, Hooks, and useReducer for state.

WIP.

## Background

I have been learning Typescript for a while via [executeprogram.com](https://www.executeprogram.com/), and recognised it was time to build something non-trivial, so after some research, I decided on the comments component from frontendmentor.io

## Starting Out

Initially I started on codesandbox.io, built some static components, forms, etc. using TS "strict" mode, loaded the initial data with a useEffect hook, and rendered the UI with minimal styling. No state updates as yet as I wanted to learn useReducer and expose that state via a Context(s). The UI was very basic at this point, and until I was happy with the components, decide to defer any CSS concerns :

![static UI minimal CSS](https://raw.githubusercontent.com/philval/react-typescript-comments-component/main/static-UI-minimal-CSS.png)

Getting to this point, with no compile errors or warnings was an eye-opener. Typescript enforces the code to be precise about the shape of data (eg. the comments Interface), what can be passed to and returned from functions/components, and ensures "undefined" is handled (eg. optional? replies to comments).

## Component Hierarchy

and then this happened :

![component hierarchy start](https://raw.githubusercontent.com/philval/react-typescript-comments-component/main/components-start.png)

The component hierarchy was poor. I had been ignoring a "Warning: Each child in a list should have a unique "key" prop." and it turns out this was non-trivial. So after a refactor, the component hierarchy actually looked like the hierarchy I had in mind:

![component hierarchy after refactor](https://raw.githubusercontent.com/philval/react-typescript-comments-component/main/components-after-refactor.png)

This of course all might change...

## React Testing Library

RTL was new to me, so a slow-down in progress for some learnings. I had implemented Cypress in a previous role on a non-trivial React UI, and we looked into RTL on that project but did not adopt it. So I decided to go for RTL, and kinda like it.

To quote Robin Wieruch, "React Testing Library moves you towards testing user behavior and not implementation details". I was expecting to refactor components and state management, but users don't care implementation at all, so adopting RTL was a good investment. As I became more fluent with RTL too, it was possible to start writing the component tests first aka TDD.

RTL tests are run by Jest, and on "watch mode" feedback is relatively instant with no context switching, so the DX is good. One nice feature of RTL is that selection of HTML elements is often by their aria-role, mimicking how a screen-reader sees the app.

The library jest-dom extends RTL with custom jest matchers to test the state of the DOM :
[https://github.com/testing-library/jest-dom](https://github.com/testing-library/jest-dom)

One useful reference from the RTL author Kent C. Dodds :
[Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
