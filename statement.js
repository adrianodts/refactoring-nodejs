function statement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US", {
        style: "currency", 
        currency: "USD",
        minimumFractionDigits: 2
    }).format;
    
    for(let perf of invoice.performances) {
        let thisAmount = amountFor(perf, playFor(perf));

        //soma creditos por volume
        volumeCredits += Math.max(perf.audience -30, 0);
        //soma um credito extra para cada dez espectadores de comedia
        if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5)

        //exibe a linha para esta requisicao
        result += ` ${playFor(perf).name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${ format(totalAmount/100) }\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;

    function amountFor(aPerformace, play) {
        let result = 0;
        switch (play.type) {
            case "tragedy":
                result = 40000;
                if(aPerformace.audience > 30) {
                    result += 1000 * (aPerformace.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if(aPerformace.audience > 20) {
                    result += 1000 + 500 * (aPerformace.audience - 20);
                }
                result += 300 * aPerformace.audience;
                break;
            default:
                throw new Error(`unknow type: ${play.type}`);
        }
        return result;
    }

    function playFor(aPerformace) {
        return plays.find((play) => { 
            return play.playID === aPerformace.playID
        });
    }
}
module.exports = statement