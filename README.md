## PandoraBoxChain Explorer Web Application

The pretty straightforward SPA with React/Redux architecture

**NOTE: You only need to run this once!**

```sh
$ npm install # This will install the necessary packages to use the app
```

### To run the app in Development Mode

```sh
$ npm run dev
```

Wait about 30 seconds for your development environment to initialize.

When it finishes, open your browser and go to `http://localhost:8080/`

If you see the landing page, it means you have set up everything successfully.


### List of NPM Commands


```sh
$ npm run dev       # build and watch, but javascript not minified
$ npm run build     # build a minified production version
$ npm run lint      # linting using ESLint
$ npm run test      # run test using Jest
$ npm run clean     # it runs before each build, so you don't need to
$ npm run storybook # it starts storybook server
```


## Suggested Workflow

After you check out the repo:

0. Go to your project root in your host machine  ( e.g. your Mac )
1. Run `npm run dev` in your terminal ( wait until the dashboard show complete status )
2. Go to your browser and go to `localhost:8080`
3. Make code changes
4. If there are compilation errors, you will see it in the terminal dashboard
5. Watch your code changes reflect on browser without refreshing
6. Repeat your development steps

## Run boxplorer in docker container locally

* `docker-compose up --build`

`--build` property is required for the building/rebuilding of the container  
