const handleProfile = db => (req, res) => {
    const { id } = req.params;
    db('users')
        .where({id})
        .then(resp => {
            if (resp.length) {
                res.json(resp[0]);
            } else { 
                res.status(404).json('no such user');
            }
        })
        .catch(err => {
            res.status(404).json('Error getting user');
        })    
}

module.exports = {
    handleProfile
}