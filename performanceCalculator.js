export class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }
    
    get amount() {
        throw new Error('subclass responsability')
    }

    get volumeCredits() {
        let result = 0;
        result += Math.max(this.performance.audience -30, 0);
        if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5)
        return result;
    }
}

export class TragedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 0;
        result = 40000;
        if(this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result;
    }
}

export class ComedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 0;
        result = 30000;
        if(this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result;
    }
}