function statement (invoice, plays) {
    return renderPlaintext(invoice, plays);
}
function renderPlaintext (invoice, plays) {
    let result = `Statement for ${invoice.customer}\n`;
    for(let perf of invoice.performances) {
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${ usd(totalAmount()) }\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;

    function totalAmount() {
        let result = 0;
        for(let perf of invoice.performances) {
            result += amountFor(perf);
        }
        return result;
    }

    function totalVolumeCredits() {
        let result = 0;
        for(let perf of invoice.performances) {
            result += volumeCreditsFor(perf);
        }
        return result;
    }

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US", {
            style: "currency", 
            currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber/100);
    }

    function volumeCreditsFor(aPerformace) {
        let result = 0;
        result += Math.max(aPerformace.audience -30, 0);
        if ("comedy" === playFor(aPerformace).type) result += Math.floor(aPerformace.audience / 5)
        return result;
    }

    function playFor(aPerformace) {
        return plays.find((play) => { 
            return play.playID === aPerformace.playID
        });
    }

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
                    result += 10000 + 500 * (aPerformace.audience - 20);
                }
                result += 300 * aPerformace.audience;
                break;
            default:
                throw new Error(`unknow type: ${playFor(aPerformace).type}`);
        }
        return result;
    }
}
module.exports = statement