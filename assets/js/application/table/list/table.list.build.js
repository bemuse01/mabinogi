TABLE.list.build = class{
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
        const temp = [...this.element]
        temp.forEach((e, i) => {
            if(index === i && e.param.clicked === false) {
                e._class = 'item item-list on-click-item'
                e.param.clicked = true
                e.style.display = 'block'
            }else{
                e._class = 'item item-list'
                e.param.clicked = false
                e.style.display = 'none'
            }
        })
        this.element = temp
    }
    set(type, race){
        this.element = []
        const table = METAL.data.find(e => e.type === type && e.race === race).table

        table.forEach((e, i) => {
            this.element[i] = {
                key: i,
                ...e,
                chance_of_each_level: e.chance_of_each_level.map((_, j) => ({
                    key: j,
                    ..._
                })),
                _class: 'item item-list',
                _id: `item-list-${i}`,
                param: {
                    clicked: false,
                    checked: false,
                    disable: false
                },
                style: {
                    display: 'none'
                }
            }
        })
    }
    select(list){
        this.element.forEach(e => {
            if(list.includes(e.stat)) e.param.checked = true
            else e.param.checked = false
        })
    }
    disable(){
        this.element.forEach(e => {
            if(!e.param.checked) e.param.disable = true
        })
    }
    enable(){
        this.element.forEach(e => {
            e.param.disable = false
        })
    }
    clear(){
        this.element = []
    }


    // get
    get(){
        return this.element
    }
}