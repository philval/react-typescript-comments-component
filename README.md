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
