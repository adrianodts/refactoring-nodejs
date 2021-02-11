function statement (invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);    
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return renderPlaintext(statementData, plays);
    
    function enrichPerformance(aPerformace) {
        const result = Object.assign({}, aPerformace);
        result.play = playFor(result);
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }

    function playFor(aPerformace) {
        return plays.find((play) => { 
            return play.playID === aPerformace.playID
        });
    }

    function amountFor(aPerformace) {
        let result = 0;
        switch (aPerformace.play.type) {
            case "tragedy":
                result = 40000;
                if(aPerformace.audience > 30) {
                    result += 1000 * (aPerformace.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if(aPerformace.audience > 20) {
                    result += 10000 + 500 * (aPerformace.audience - 20);
                }
                result += 300 * aPerformace.audience;
                break;
            default:
                throw new Error(`unknow type: ${playFor(aPerformace).type}`);
        }
        return result;
    }

    function volumeCreditsFor(aPerformace) {
        let result = 0;
        result += Math.max(aPerformace.audience -30, 0);
        if ("comedy" === aPerformace.play.type) result += Math.floor(aPerformace.audience / 5)
        return result;
    }

    function totalAmount(data) {
        let result = 0;
        for(let perf of data.performances) {
            result += perf.amount;
        }
        return result;
    }

    function totalVolumeCredits(data) {
        let result = 0;
        for(let perf of data.performances) {
            result += perf.volumeCredits;
        }
        return result;
    }
}
function renderPlaintext (data, plays) {
    let result = `Statement for ${data.customer}\n`;
    for(let perf of data.performances) {
        result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${ usd(data.totalAmount) }\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US", {
            style: "currency", 
            currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber/100);
    }
}
module.exports = statement