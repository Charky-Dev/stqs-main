# STQS

## Developer Notes
I chose to spend a little more time on this than was probably expected. Partly this was because I have been genuinely enjoying myself, and am continuing to develop my frontend for fun - I would like to actually play the game. I am particularly excited about the idea of implementing a map of the galaxy, so I am currently working towards that goal.
Another reason, however, is that the exercise has been quite informative. Completing this exercise in a relatively pure version of react has taught me that my employer's current React implementation is quite non-standard. It has also improved my understanding of the underlying framework, without having a long list of packages to navigate.

I chose to spend time implementing a login system before working on the actual quickstart. My reasons for this were:
- I believe the api has changed since this task was first issued; you can no longer fetch an account api key directly from the provided quickstart app.
- I felt that needing to create a new agent each time the page was refreshed was an inappropriate drain on the SpaceTraders server, and wanted to log in as an agent I had already created.
- I would not be violating basic security principles by embedding my account API key into the codebase, so I would need you to provide your own account API keys. The updated instructions for doing so should be embedded into the login / signup form.

I have tried to create a simple but effective user interface. The icons and photos used are all my own, to avoid copyright issues.

## Goal
Your goal is to visit [SpaceTraders.io](https://docs.spacetraders.io/quickstart/new-game) and implement as many features from the quickstart as you feel able to.

> SpaceTraders is a fun, free game driven entirely through API interactions. It is not affiliated with us in any way, so please ensure you abide by their [rate limits](https://docs.spacetraders.io/api-guide/rate-limits).
## Delivery
We have scaffolded a small project (this repo) to get you started. It contains everything you need to run and work on your quickstart. We will be running it when we receive your submission, so please ensure it works and contains any additional information we need to run it.

On completion, return the repository to us, either zipped as an attachment or uploaded to a Git hosting service.

## Tips
We suggest focusing on a quality **vertical slice**, rather than lots of functionality. Consider this an opportunity to show us how you might approach building an application, which you will then have the chance to walk us through later. You do not need to build a large application - focus on demonstrating experience over feature completion.

Areas we will be looking to discuss include:
- How you structure your code
- Idiomatic use of React and ECMAScript
- How you use the type system to build confidence in your code
- Performance considerations when dealing with side effects and state
- How styling is organized and applied (we don't expect you to be a designer, so don't worry about aesthetic choices)
- How you use source code management (Git) to segment your changes

We have implemented the very first part of the quickstart here to get you moving (see `NewGame.tsx`), but how you structure things (and how you present the user interface) is entirely up to you.

## Requirements

NodeJS 18+
NPM

## Running

`npm ci`
`npm run dev`
See `package.json` for more details on available scripts.

## Exercise

Run the project (or read `./src/App.tsx`) for details of the exercise.