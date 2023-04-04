const express = require('express');
const app = express();
const port = 3000;


const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml');
const fileupload = require('express-fileupload');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileupload());

let courses = [
    {
        id: 11,
        name: "NodeJS",
        price: 1000
    },
    {
        id: 12,
        name: "ReactJS",
        price: 2000
    },
    {
        id: 13,
        name: "AngularJS",
        price: 3000
    }
]


app.get('/', (req, res) => {
    res.send('Hello World!')    
})

app.get('/api/v1/sduttt', (req, res) => {
    res.send('Hello SDUTTT!')
})

app.get('/api/v1/sduttt/myobject', (req, res) => {
    res.send({name: "SDUTTT", age: 20})
})

app.get('/api/v1/sduttt/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/v1/sduttt/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === req.params.id)
    res.send(course)
})

app.post('/api/v1/sduttt/adsdcourse', (req, res) => {
    console.log(req.body)
    courses.push(req.body)
    res.send(courses)
})

app.get('/api/v1/sduttt/coursequery', (req, res) => {
    let location = req.query.location
    let device = req.query.device

    res.send({location, device})
})

app.post('/api/v1/sduttt/courseupload', (req, res) => {
    console.log(req.headers)
    const file = req.files.file
    console.log(file)
    let path = __dirname + "/images/" + Date.now() + ".jpg"
    file.mv(path, (err) => {
        if(err) {
            console.log(err)
            res.send("Fail")
        } else {
            res.send("Success")
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening at port ${port}`)
})