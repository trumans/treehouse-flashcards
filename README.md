
Flashcard application with cookie to store user name

Typical flow
  - In a browser open localhost:3000
  - If a user name cookie does not exist, a form is displayed to enter it.
  - After the user name is submitted a "welcome" message is displayed with
    button to start flashcards.
  - A random question is displayed. The page has buttons to display the answer,
    show a hint and display another random card.
    - The card also has a button to clear the user name and return to name input
      form.

Web application used
  Express framework
  Pug to render templates
  body-parser middleware
  cookie-parser middleware

To launch app
  1. (Optional, to have nodemon autorestart app) in terminal window: nodemon app.js  
  2. in terminal window: node app.js
  3. in browser goto localhost:3000

Routes (i.e. localhost:3000/...)
  All routes use response.render and Pug template to generate pages.

  Templates utilize a shared template (e.g extends layout) which in
  turn includes template pieces (e.g. include includes/header.pug).

  / (root)
    Displays user name in a welcome box if the username cookie is set, otherwise
    it redirects to /hello. Page has a Begin button to display a flashcard.

    Next to the Welcome box is a button to clear the user name that submits a
    post to /goodbye.

  /hello, get request
     Displays a form to submit a user name if there is no username cookie,
     otherwise redirects to root route. The welcome box displays the message
     "hello, student". The name entered is submitted with a post request.

  /hello, post request
    The user name is extracted from the request and is saved as a cookie. The
    client is then redirected to root route.

  /goodbye
     Defined for only post requests. Clears the user name cookie and redirects
     to hello.

  /cards/<#>?side=<type>
     Display the card indexed by <#> from the cards array. <type> is either
     'question' or 'answer'. The question/answer and hint is passed to the Pug
     template using response.locals properties. If the side displayed is the
     question the HTML includes a JS script which adds a Show Hint button which
     shows the hint when clicked.

     Both sides have buttons to flip to the other side and display another
     random card.

     The welcome box described above for the root and /hello routes is displayed.
     Displaying a card is not dependent on a saved user name.

     If the 'side' query parameter is neither 'question' or 'answer' the
     question side is displayed.

  /cards
     Redirects to the question side of random card.

  error handling
    All errors should be captured and redirected to an error page which displays the
    error status, a "desktop" graphic and the stack dump in a scrolling window.

    If the card index in the URL is invalid a 404 error is displayed.

Project file structure

  /data - the flat file containing the questions in json format.

  /js-express-basics-flashcard-assets - the designer html files and images.

  /node_modules - packages install by npm.

  /public - static assets: images, client-side JS file, CSS files.

  /routes - JS files that explicitly define routes (e.g. /cards, /hello).

  /views - Pug templates called by route functions, extended shared templates and
  included partial templates.

  app.js - the main application JS file, which is launched by Node.
    - declares pug as the template renderer.
    - declares files containing routes for explicitly defined routes.
    - declares error handling middleware
