TABLE.type.build = class{
    constructor(){
        this.#create()
    }


    // init
    #init(){
    }


    // create
    #create(){
        const type = this.#createType()
        this.element = type.map((e, i) => ({
            key: i,
            name: e[0],
            child: e[1],
            _class: 'item item-type',
            _id: `item-type-${i}`,
            param: {
                clicked: false
            }
        }))
    }
    #createType(){
        const obj = {}
        for(let i = 0; i < METAL.data.length; i++){
            if(obj[METAL.data[i].type] === undefined) obj[METAL.data[i].type] = []
            obj[METAL.data[i].type].push(METAL.data[i].race)
        }
        return Object.entries(obj)
    }


    // event
    click(index){
        this.element.forEach((e, i) => {
            if(index === i) {
                e._class = 'item type-item on-click-item'
                e.param.clicked = true
            }else{
                e._class = 'item type-item'
                e.param.clicked = false
            }
        })
    }


    // get
    get(){
        return this.element
    }
}