const path = require('path')
const express = require('express')

const DIST_DIR = path.join(__dirname, "dist")
const PORT = 3000
const app = express()

// Serving the files on the dist folder
app.use(express.static(DIST_DIR))

// Send index.html when the user access the web
app.get("*", (req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"))
})

const listener = app.listen(PORT, () => { 
  console.log(`App is running on port ${listener.address().port}`)
})