const express = require('express');
const dogRoutes = require('./routes/dogs_mine')
const shelterRoutes = require('./routes/shelters_mine')
const adminRoutes = require('./routes/admin_mine')
const app = express()
const port = 3000

app.use('/dogs', dogRoutes)
app.use('/shelters', shelterRoutes)
app.use('/admin', adminRoutes)
//we can change the routes as well
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})