let bag = (() => {
    //The list store the dependentces
    const list = []
    
    const define = (name, modules, action) => {
        //The modeles is using for store names of the dependentces you want
        //Replace the name in the modules by dependentces
        modules.map((n, i) => {
            modules[i]=list[n]
        })

        //The list keep the modules, and action has the depandentces inside
        list[name]=action.apply(null, modules)
    }
    return {define}
})()

bag.define('count', [], () => {
    return {
        max: (arr,key) => {
            return arr.sort((a, b) => b[key] - a[key])[0]
        },
        min: (arr,key) => {
            return arr.sort((a, b) => a[key] - b[key])[0]
        },
    }
})

bag.define('lessons', ['count'], (count) => {
    let data = [
        { name: 'JD', grade: 100 },
        { name: 'JC', grade:50}
    ]
    console.log(count.max(data,'grade'))
    console.log(count.min(data,'grade'))
})
