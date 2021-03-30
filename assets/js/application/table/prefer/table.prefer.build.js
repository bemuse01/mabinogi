TABLE.prefer.build = class{
    constructor(){
        this.#create()
    }


    // init
    #init(){
    }


    // create
    #create(){
        this.element = []
    }


    // event
    set(list, prefer){
        this.element = []
        const filter = list.filter(e => prefer.includes(e.stat)) 

        filter.forEach((e, i) => {
            const range = e.level_range.split('-').map(e => parseInt(e.trim()))
            const min = range[0]
            const max = range[1] 

            this.element[i] = {
                key: i,
                stat: e.stat,
                level_range: e.level_range,
                value: min,
                param: {
                    min: min,
                    max: max
                }
            }
        })
    }
    change(index, event){
        let value = parseInt(event.target.value)
        const e = this.element[index]

        value = Math.max(value, e.param.min)
        value = Math.min(value, e.param.max)
        
        e.value = value
        event.target.value = value
    }


    // get
    get(){
        return this.element
    }
}