const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

// The variables to hold my personal data
const var_status = "success"
const var_full_name = "Nsiela Denzel"
const var_email = "suhdenzo04@gmail.com"
const var_stack = "Python/FastAPI & Node.js/Express.js"
var var_cat_fact = "A cat is an animal"

app.get('/',(req, res) => {
    res.send('The Backend Stage One HNG13 task')
});

app.get('/me', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    let date = new Date(Date.now()).toISOString()
    try{
        const response = await axios.get('https://catfact.ninja/fact')
        var_cat_fact = response.data['fact']
    } catch(error){
        console.error('Error:', error.message)
        res.status(500).send('Failed to fetch interesting facts about cats :(.')
        var_cat_fact = "Cats are felines"
    }
    res.json({
        "status": var_status,
        "user": {
            "email": var_email,
            "name": var_full_name,
            "stack": var_stack
        },
        "timestamp": date,
        "fact": var_cat_fact
    })
});

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`Server listening on port ${port}`)
});