const fs = require('fs')
const { exec } = require('child_process')
const { error } = require('console')

function generateScript(subject) {
    const LOCATION = 'us-central1'
    const PROJECT_ID = 'cu-hacking-6'
    const MODEL_ID = 'gemini-2.0-flash-001'

    const request = {
        "contents": [{
            "role": "user",
            "parts": [
                {
                    "text": `Can you make a script for an educational reel about ${subject} that is 30 seconds long and includes 3 images. Can you return the script in a json format that has 3 properties for each text, (text, time, image?) The Text is the full script, the time is at what seconds it should be played the audio, and the image is a description of an image and it is optional so you only have the image for some of them so its an optional property`
                }
            ]
        }]
    }

    generateToken((token) => {
        const response = fetch(`https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_ID}:generateContent`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(request)
            }
        )
    
        response.then((res) => {
            res.text().then((txt) => {
                if (res.ok) {
                    const data = JSON.parse(txt)
                    const ai_response = data.candidates[0].content.parts[0].text
                    console.log(ai_response)
                    return ai_response
                } else {
                    console.error(`Error with message: ${txt}`)
                }
            })
        })
    })

}


function generateImage(subject) {
    const PROJECT_ID = "cu-hacking-6"
    const LOCATION_ID = "us-central1"
    const API_ENDPOINT = "us-central1-aiplatform.googleapis.com"
    const MODEL_ID = "imagen-3.0-generate-002"


    const request = 
    {
        "endpoint": "projects/cu-hacking-6/locations/us-central1/publishers/google/models/imagen-3.0-generate-002",
        "instances": [
            {
                "prompt": subject,
            }
        ],
        "parameters": {
            "aspectRatio": "1:1",
            "sampleCount": 4,
            "negativePrompt": "",
            "enhancePrompt": false,
            "personGeneration": "",
            "safetySetting": "",
            "addWatermark": true,
            "includeRaiReason": true,
            "language": "auto",
        }
    }
    generateToken((token) => {
        const response = fetch(`https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:predict`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            }
        )
    
        response.then((res) => {
            res.text().then((txt) => {
                fs.writeFile('./text.txt', txt, fsErrorHandler)
                const data = JSON.parse(txt)
                const perd = data.predictions[0]
                
                if(perd.raiFilteredReason) {
                    throw error(`Prompt against the guide lines for image generation! message: ${perd.raiFilteredReason}`)
                }
                const base64Image = `data:${perd.mimeType};base64,${perd.bytesBase64Encoded}`
                const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
                const imageBuffer = Buffer.from(base64Data, 'base64');
                fs.writeFile('output-image.png', imageBuffer, fsErrorHandler);
            })
        })
    })
}

function fsErrorHandler(err) {
    if(err) throw err
}

function generateToken(_callback) {
    const command = 'gcloud auth print-access-token'

    exec(command, (error, stdout, stderr) => {
        if(error || stderr) {
            throw error ? error : stderr
        }
        _callback(stdout.trim())
    });
}