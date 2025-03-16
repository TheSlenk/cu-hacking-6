const express = require('express')
const app = express()
const {generateImage, generateScript} = require('./ai.js')
const PORT = 8080

//#region GET
app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/generateJsonScript', (req, res) => {
    const inputString = req.body;
    if (!inputString) {
        return res.status(400).send('Missing string in request body');
    }
    const generatedScript = generateJsonScript(inputString);
    res.status(200).json({ script: generatedScript });
});

app.get('/home', homePageHandler)
//#endregion

console.log(`Listening on port ${PORT}...`)
app.listen(PORT)

//#region Handler Functions
async function homePageHandler(req, res) {
    const result = await generateJsonScript('Math')
    res.status(200).send(result)
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
//#endregion