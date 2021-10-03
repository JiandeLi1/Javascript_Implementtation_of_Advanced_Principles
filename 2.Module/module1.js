class lesson {
    data = []
    init() {
        this.data = [
            { name: "js", price: 99 },
            { name: 'react', price: 100 }
        ]
    }
    add(name, price) {
        this.data = [...this.data, {name, price}]
    }
    get() {
        return this.data
    }
}

let obj = new lesson();
obj.init()
export { obj }