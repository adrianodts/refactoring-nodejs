class Plays {
    constructor(playID, name, type) {
        this.playID = playID;
        this.name = name;
        this.type = type;
    }
    playID = () => { return this.playID }
    name = () => { return this.name }
    type = () => { return this.type }
}
module.exports = Plays