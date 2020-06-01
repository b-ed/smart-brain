const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: '9c4bcf40372d4968a6e090fb0e51b18f'
   });

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('unable to work with api'))
}


const handleImage = db => (req, res) => {
    const { id, faces } = req.body
    db('users')
        .returning('*')
        .where({id})
        .increment('entries', faces)
        .then(user => {
            if (user.length) {
            res.json(user[0])
            } else {
                res.status(404).json('user not found');
            }
        })
        .catch(err => {
            res.status(404).json('could not update');
        });
}

module.exports = {
    handleImage,
    handleApiCall
}