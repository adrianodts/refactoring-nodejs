class Performances {
    constructor(playID, audience) {
        this.playID = playID
        this.audience = audience
    }

    playID = () => { return this.playID }
    audience = () => { return this.audience }
}
module.exports = Performances