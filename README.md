# FE Testing Workshop

## Prerequisites

To attend the workshop (but just watching and listening is okay, too), you will need:

* A code editor that understands Web languages. I recommend VSCode (https://code.visualstudio.com/)
* Recommended: Git (https://git-scm.com/downloads) unless you want to just download the code. 

## Installation (mainly for Windows)

* Install latest LTS Version of Node from https://nodejs.org/
* Checkout repository via Git ow just download as ZIP (search for green button with *Code* on it)
* Optional, if you want to keep your work: First fork the repository into your own Github account, then checkout from there.
* Open a command line of your choice in the project directory (CMD, Powershell, Git Bash ... all should work).

On command line in project directory type:

```bash
npm install
npm run start
```

Then open in your Webbrowser http://localhost:4200 and have a look at the app we are going to test. 

Disclaimer: The API this app uses to load the jokes from is https://api.chucknorris.io/. I was simply to lazy to also provide a backend API ;)

## Run the tests

To run the unit|component|API tests with Jest (https://jestjs.io/):

```bash
npm run test
```

The code coverage report for is written to directory *coverage*.

To run the e2e tests with Playwright (https://playwright.dev/):

```bash
npm run e2e
```

