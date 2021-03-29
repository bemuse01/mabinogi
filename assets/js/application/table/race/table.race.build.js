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
        this.element.forEach((e, i) => {
            if(index === i) {
                e._class = 'item item-race on-click-item'
                e.param.clicked = true
            }else{
                e._class = 'item item-race'
                e.param.clicked = false
            }
        })
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