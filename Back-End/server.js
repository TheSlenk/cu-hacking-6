const express = require('express')
const fs = require('fs')
const cors = require('cors');
const app = express()
const {generateImage, generateScript} = require('./ai.js')
const PORT = 8080

let FILE_ID_COUNTER = fs.readdirSync('./Database').length

//#region GET

app.use(cors());

app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/home', homePageHandler)
//#endregion

console.log(`Listening on port ${PORT}...`)
app.listen(PORT)

//#region Handler Functions
async function homePageHandler(req, res) {
    const subject = req.query.path
    if (subject) {
        const result = await generateJsonScript(subject)
        FILE_ID_COUNTER += 1
        await fs.writeFileSync(`Database/${FILE_ID_COUNTER}.json`, JSON.stringify(result))
        res.status(200).send(result)
    } else {
        if (FILE_ID_COUNTER > 0) {
            const content = await fs.readFileSync(`Database/${getRandomInt(1, FILE_ID_COUNTER)}.json`, 'utf-8')
            res.status(200).send(JSON.parse(content))
        } else {
            res.status(404).send('No presaved video')
        }
    }
}
//#endregion

//#region Helper Functions
async function generateJsonScript(prompt) {
    const jsonScript = await generateScript(prompt)
    const parsedJsonScript = parseJsonScript(jsonScript)
    const sections = parsedJsonScript[Object.keys(parsedJsonScript).pop()]
    const newSections = []
    for (let section of sections) {
        const img = section['image']
        if (img) {
            try {
                const ans = await generateImage(img);
                console.log(`Generated an image for "${img}"`)
                section['image'] = ans
                newSections.push(JSON.parse(JSON.stringify(section)))
                continue
            }
            catch(err) {
                console.log(`Unable to fetch images for "${img}"`);
            }
        }
        section['image'] = undefined
        newSections.push(JSON.parse(JSON.stringify(section)))
    }

    console.log(newSections)
    return newSections
}

function parseJsonScript(jsonScript) {
    jsonScript = jsonScript.replaceAll('```json', '')
    jsonScript = jsonScript.replaceAll('```', '')
    return JSON.parse(jsonScript)
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
//#endregion