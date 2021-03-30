TABLE.race.build = class{
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
    click(index){
        // v-model 적용 시켜야 되는 방법, 왜 되는지 모름 미해결.
        this.element.forEach((e, i) => {
            if(index === i) {
                e._class = 'item item-race on-click-item'
                e.param.clicked = true
            }else{
                e._class = 'item item-race'
                e.param.clicked = false
            }
        })

        // v-model 적용 안시켜도 되는 방법
        // const temp = [...this.element]
        // for(let i = 0; i < temp.length; i++){
        //     const e = temp[i]
        //     if(index === i) {
        //         e._class = 'item item-race on-click-item'
        //         e.param.clicked = true
        //     }else{
        //         e._class = 'item item-race'
        //         e.param.clicked = false
        //     }
        // }
        // this.element = temp
    }
    set(race){
        this.element = []
        race.forEach((e, i) => {
            this.element[i] = {
                key: i,
                name: e,
                _class: 'item item-race',
                _id: `item-race-${i}`,
                param: {
                    clicked: false
                }
            }
        })
    }


    // get
    get(){
        return this.element
    }
}