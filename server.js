'use strict';

const { query } = require('express');
// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan('tiny'))

  // Any requests for static files will go into the public folder
  .use(express.static('public'))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  .get('/bot-jokes', (req, res) =>{
    let switzerland = "Whats the best thing about switzerland? ...I don’t know, but the flag is a big plus.";
    let math = "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them";
    let fonts = "Helvetica and Times New Roman walk into a bar... Get out of here!” shouts the bartender. “We don’t serve your type.";
    let substraction = "How many times can you subtract 10 from 100? Once. The next time you would be subtracting 10 from 90.";
    let karma = "Hear about the new restaurant called Karma? There’s no menu: You get what you deserve.";
    let myJokes = [switzerland, math, fonts, substraction, karma];
    const incomingMsg = req.query.message;
    let message;
    if(incomingMsg.toLowerCase() === 'yes'){
      let aJoke = `${myJokes[Math.floor(Math.random() * myJokes.length)]} LOL!! ...do you want to hear another one? pls answer YES or NO`;
      message = { author: 'bot', text: aJoke }
    } else{
      message = { author: 'bot', text: 'goodbye' }
    }
    const randomTime = Math.floor(Math.random() * 3000);
      setTimeout(() => {
        res.status(200).json({ status: 200, message });
      }, randomTime);
  })
  .get('/bot-message', (req, res) => {
    const getBotMessage = (text) => {
      
      const commonGreetings = ["hi", "hello", "howdy"];
      const commonAdios = ["adios", "bye", "hasta la vista"]
      let botMsg = "";
      for(let idx = 0; idx < commonGreetings.length; idx++){
        if(text.toLowerCase().includes(commonGreetings[idx])){
          
          botMsg = "Bzzt Hello"
        } 
      }
      for(let idx = 0; idx < commonAdios.length; idx++){
        if(text.toLowerCase().includes(commonAdios[idx])){
          
          botMsg = `Bzzt ${commonAdios[Math.floor(Math.random() * commonAdios.length)]}`
        } 
      }
      if(botMsg === ""){
        botMsg = `Bzzt ${req.query.message}`
      }
      return botMsg;
    };
    let message;
    const incomingMsg = req.query.message;
    if(incomingMsg === "something funny"){
      message = { author: 'bot', text: 'Do you want to hear a joke? pls answer YES or NO' };
    } else{
      message = { author: 'bot', text: getBotMessage(req.query.message) }
    }
    
    
    const randomTime = Math.floor(Math.random() * 3000);
      setTimeout(() => {
        res.status(200).json({ status: 200, message });
      }, randomTime);
    
  })
  .get('/parrot-message', (req, res) => {
    
    const message = { author: 'parrot', text: `${req.query.message}` };
    const randomTime = Math.floor(Math.random() * 3000);
      setTimeout(() => {
        res.status(200).json({ status: 200, message });
      }, randomTime);
    
  })

  .get('/cat-message', (req, res) => {
    const message = { author: 'cat', text: 'Meow' };
    const randomTime = Math.floor(Math.random() * 3000);
      setTimeout(() => {
        res.status(200).json({ status: 200, message });
      }, randomTime);
    
  })

  .get('/monkey-message', (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const item = messages[Math.floor(Math.random() * messages.length)];
    const message = { author: 'monkey', text: item };
    const randomTime = Math.floor(Math.random() * 3000);
      setTimeout(() => {
        res.status(200).json({ status: 200, message });
      }, randomTime);
    
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get('/', (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get('*', (req, res) => {
    res
      .status(404)
      .json({
        status: 404,
        message: 'This is obviously not the page you are looking for.',
      });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
