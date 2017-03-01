import { Server } from 'http'
import Express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import Routes from './app/routes'

const app = new Express()
const server = new Server(app)
app.set('view engine', 'ejs')
app.set('views', './src-full/views')
app.use(Express.static('./public'))

app.get('*', (req, res) => {
  match(
    { Routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      if (err) 
        return res.status(500).send(err.message)

      if (redirectLocation) 
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search)

      let markup
      if (renderProps) {
        markup = renderToString(<RouterContext {...renderProps}/>)
      } else {
        res.status(404)
      }
      return res.render('index', { markup })
    }
  );
});

const port = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'production'
server.listen(port, err => {
  if (err) {
    return console.error(err)
  }
  console.info(`Server running on http://localhost:${port} [${env}]`)
})