TABLE.pick.build = class{
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
    pickManual(list){
        this.element = []
        const sort = [...list].sort((x, y) => this.#sortList(x, y, 'chance_of_appearance'))
        const temp = [], stat = []

        while(temp.length !== 3){
            const random = Math.random() * 100
            let sum = 0

            for(let j = 0; j < sort.length; j++){
                const chance = parseFloat(sort[j].chance_of_appearance)

                sum += chance
                if(random <= sum){
                    const item = sort[j]

                    if(!temp.includes(item)){
                        temp.push(item)
                        if(temp.length === 3) break
                        if(item.duplication && Math.random() <= 0.01) {
                            temp.push(item)
                            console.log('work')
                        }
                    }

                    break
                }
            }
        }

        temp.forEach(_ => {
            const each = [..._.chance_of_each_level].sort((x, y) => this.#sortList(x, y, 'inner_chance'))
            const random = Math.random() * 100
            let sum = 0

            for(let i = 0; i < each.length; i++){
                const chance = parseFloat(each[i].inner_chance)

                sum += chance
                if(random <= sum){
                    stat.push({
                        key: stat.length,
                        level: each[i].level,
                        name: _.stat
                    })
                    break
                }
            }
        })

        this.element = stat
    }
    pickAuto(list, prefer, calc){
        this.element = []
        const sort = [...list].sort((x, y) => this.#sortList(x, y, 'chance_of_appearance'))
        let temp = [], stat = []
        const preferName = prefer.map(e => e.stat)
        let pick3 = true
        calc.num = 0

        while(stat.length !== 3){
            stat = []
            pick3 = true

            while(pick3){
                temp = []
                while(temp.length !== 3){
                    const random = Math.random() * 100
                    let sum = 0

                    for(let j = 0; j < sort.length; j++){
                        const chance = parseFloat(sort[j].chance_of_appearance)

                        sum += chance
                        if(random <= sum){
                            const item = sort[j]

                            if(!temp.includes(item)){
                                temp.push(item)
                                if(temp.length === 3) break
                                if(item.duplication && Math.random() <= 0.01) {
                                    temp.push(item)
                                }
                            }

                            break
                        }
                    }

                }
                
                calc.num++

                const tempName = temp.map(e => e.stat)
                for(let i = 0; i < prefer.length; i++){
                    if(tempName.includes(preferName[i])) {
                        if(i === prefer.length - 1) pick3 = false
                    }else break
                }
            }

            temp.forEach(_ => {
                const each = [..._.chance_of_each_level].sort((x, y) => this.#sortList(x, y, 'inner_chance'))
                const random = Math.random() * 100
                let sum = 0

                for(let i = 0; i < each.length; i++){
                    const chance = parseFloat(each[i].inner_chance)
                    const preferLevel = prefer.find(e => e.stat === _.stat)

                    sum += chance
                    if(random <= sum){
                        if(preferLevel){
                            const level = parseInt(each[i].level)
                            
                            if(level >= preferLevel.value){
                                stat.push({
                                    key: stat.length,
                                    level: each[i].level,
                                    name: _.stat
                                })
                            }else break
                        }else{
                            stat.push({
                                key: stat.length,
                                level: each[i].level,
                                name: _.stat
                            })
                        }
                        break
                    }
                }
            })
        }

        this.element = stat
    }
    clear(){
        this.element = []
    }


    // method
    #sortList(x, y, name){
        x = parseFloat(x[name])
        y = parseFloat(y[name])
        
        if(x < y) return -1
        else if(x > y) return 1
        else return 0
    }


    // get
    get(){
        return this.element
    }
}