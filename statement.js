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
        volumeCredits += volumeCreditsFor(perf);
        //exibe a linha para esta requisicao
        result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }
    result += `Amount owed is ${ format(totalAmount/100) }\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;

    function amountFor(aPerformace) {
        let result = 0;
        switch (playFor(aPerformace).type) {
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
                throw new Error(`unknow type: ${playFor(aPerformace).type}`);
        }
        return result;
    }

    function playFor(aPerformace) {
        return plays.find((play) => { 
            return play.playID === aPerformace.playID
        });
    }

    function volumeCreditsFor(aPerformace) {
        let volumeCredits = 0;
        volumeCredits += Math.max(aPerformace.audience -30, 0);
        if ("comedy" === playFor(aPerformace).type) volumeCredits += Math.floor(aPerformace.audience / 5)
        return volumeCredits;
    }
}
module.exports = statement