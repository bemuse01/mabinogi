TABLE.build = class{
    constructor(){
        this.#create()
    }


    // init
    #init(){
    }


    // create
    #create(){
        this.#createType()
        this.#createRace()
        this.#createList()
        this.#createPick()
    }
    #createType(){
        this.type = new TABLE.type.build()
    }
    #createRace(){
        this.race = new TABLE.race.build()
    }
    #createList(){
        this.list = new TABLE.list.build()
    }
    #createPick(){
        this.pick = new TABLE.pick.build()
    }
}