function getAllUser(req, res) {
    res.send('Hello all users are : \nname : Harshit\nage : 21\naddress : Anjad')
}

function getAllUserById(req, res) {
    res.send('Hello UserNot Found at id : ' + req.params.id)
}

function insertRecord(req, res) {
    res.json("Data")
}
module.exports = {
    getAllUser, getAllUserById, insertRecord
}