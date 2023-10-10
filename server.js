const express = require('express');
const app = express()
const path = require('path')
const cors = require('cors')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//****Static routes*****//
app.use(express.static(path.join(__dirname, 'public')))

app.use(logger)
const whiteList = ['https://www.aaaa.com', 'http://127.0.0.1:3000', 'https:localhost:3100'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORs'))
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
//OR
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

//OR
app.get('^/$|/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})


// app.get('/new-page', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
// })

// app.get('^/$|/index(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
// })

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

// OR (Redirect)
app.get('/testing(.html)?', (req, res) => {
    res.redirect(path.join(__dirname, 'views', 'new-page.html'))
})

//OR
// app.get('/testing(.html)?', (req, res) => {
//     res.redirect(301, 'new-page.html')
// })

/// **************************Route Handler**************************//
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Hmm we are kuku moving');
    next()
}, (req, res) => {
    res.send('Hey Bosses how unah dey')
})

//******************Chaining Route Handler**********************//
const cohort1 = (req, res, next) => {
    console.log('Kalas Qodri');
    next()
}

const cohort2 = (req, res, next) => {
    console.log('Muhammed Rocco');
    next()
}

const cohort3 = (req, res, next) => {
    console.log('Muhammed KennyMax');
    next()
}

const cohort4 = (req, res) => {
    console.log('Supreme HaliyahFather');
    res.send(`They're gurus in tech`)
}

app.get('/big-devs(.html)?', [cohort1, cohort2, cohort3, cohort4])

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', '404.html'))
// })

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts(html)) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ 'error': '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)
app.listen(PORT, () => console.log(`server running on port ${PORT}`))