import PerformanceCalculator from './performanceCalculator.js';

export default function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;

    function enrichPerformance(aPerformance) {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }

    function createPerformanceCalculator(aPerformance, aPlay) {
        return new PerformanceCalculator(aPerformance, aPlay);
    }

    function playFor(aPerformance) {
        return plays.find((play) => { 
            return play.playID === aPerformance.playID
        });
    }

    function totalAmount(data) {
        return data.performances
            .reduce((total, p) => total + p.amount, 0);
    }

    function totalVolumeCredits(data) {
        let result = 0;
        for(let perf of data.performances) {
            result += perf.volumeCredits;
        }
        return result;
    }
}