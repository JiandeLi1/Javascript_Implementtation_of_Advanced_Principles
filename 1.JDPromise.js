class JDPromise {
    constructor(executor) {
        //executor is synchronous
        this.PromiseState = 'pending';
        this.PromiseResult = null;
        this.callbacks = []

        const resolve = (data) => {
            if (this.PromiseState === 'pending') {
                    //Modifying the state of the object (Promise state)
                    this.PromiseState = 'fulfilled'
                    //setting the result value of the object (Promise result)
                    this.PromiseResult = data
                    setTimeout(() => {
                    this.callbacks.forEach(item => {
                        item.onResolved(data)
                    })  
                })
            }
        }

        const reject = (data) => {
            if (this.PromiseState==='pending') {
                //Modifying the state of the object (Promise state)
                this.PromiseState = 'rejected'
                //setting the result value of the object (Promise result)
                this.PromiseResult = data
                setTimeout(() => {
                this.callbacks.forEach(item => {
                    item.onRejected(data)
                })  
                })
            }
        }
    
        try {
            executor(resolve, reject);
        } catch(error) {
            reject(error)
        }
    }

    //Adding then() to JDPromise
    //Two callbacks for parameters, onResolved, onReject
    then(onResolved, onRejected) {
    
    if (typeof onRejected !== 'function') {
        onRejected = reason => {
            throw reason
        }
    }

    if (typeof onResolved !== 'function') {
        onResolved= value => value;
    }

    return new JDPromise((resolve, reject) => {
        const callback = (type) => {
            try {
                let result = type(this.PromiseResult)
                if (result instanceof JDPromise) {
                    result.then(v => {
                        resolve(v)
                    }, r => {
                        reject(r)
                    })
                } else {
                    resolve(result);
                }
            } catch(error){
                reject(error)
            }
        }
        if (this.PromiseState === 'fulfilled') {
            setTimeout(() => {
              callback(onResolved)  
            })
        }
        if (this.PromiseState === 'rejected') {
            setTimeout(() => {
                callback(onRejected)    
            })
            
        }

        if (this.PromiseState === 'pending') {
            this.callbacks.push({
                onResolved: () => {
                   callback(onResolved)
                },
                onRejected: () => {
                   callback(onRejected)
                },
            })
        }
    })
    }

    catch(onRejected) {
        return this.then(undefined, onRejected)
    }
    
    static resolve(value) {
        return new JDPromise((resolve, reject) => {
            if (value instanceof JDPromise) {
                value.then(v => resolve(v), r => reject(r))
            } else {
                resolve(value)
            }
        })
    }

    static reject(reason) {
        return new JDPromise((resolve, reject) => {
            reject(reason)
        })
    }

    static all(JDPromises) {
        return new JDPromise((resolve, reject) => {
            let count = 0
            let JDPs = Array(JDPromises.length).fill(null)
            for(let i = 0; i < JDPromises.length; i++){
                JDPromises[i].then(v => {
                    count++
                    JDPs[i] = v
                    if (count === JDPromises.length) {
                        resolve(JDPs)
                    }
                }, r => {
                    reject(r)
                })
            }  
        })
    }

    static race = function (JDPromises) {
        return new JDPromise((resolve, reject) => {
            for (let i = 0; i < JDPromises.length; i++) {
                JDPromises[i].then(v=>resolve(v),r=>reject(r))
            }  
        })
    }
}





