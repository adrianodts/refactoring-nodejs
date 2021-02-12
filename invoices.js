export default class Invoices {
    constructor(customer, performances) {
        this.customer = customer
        this.performances = performances
    }
    customer = () => { return this.customer }
    performances = () => { return this.performances }
}