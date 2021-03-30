new Vue({
    el: '#wrap',
    data(){
        return{
            element: {
                table: new TABLE.build()
            },
            model: {
                type: '',
                race: '',
                list: []
            },
            style: {
                pick: {display: 'none'}
            },
            button: {
                auto: '뽑기'
            },
            calc: {
                num: 0,
                cost: 1200,
            },
            option: 'manual'
        }
    },
    computed: {
        watchType(){
            return this.model.type
        },
        watchRace(){
            return this.model.race
        },
        watchList(){
            return this.model.list
        },
        getPrice(){
            return this.calc.num * this.calc.cost
        }
    },
    watch: {
        watchType(){
            const race = this.element.table.type.get().find(e => e.param.clicked === true)
            if(race === undefined) return

            this.model.race = ''
            this.model.list = []
            this.clear()
            this.element.table.race.set(race.child)
        },
        watchRace(){
            if(this.model.type === '' || this.model.race === '') {
                this.element.table.list.clear()
                return
            }

            this.clear()
            this.element.table.list.set(this.model.type, this.model.race)
        },
        watchList(){
            this.element.table.list.select(this.model.list)
            if(this.model.list.length === 2) this.element.table.list.disable()
            else this.element.table.list.enable()
            
            this.clear()
            this.element.table.prefer.set(this.element.table.list.get(), this.model.list)
        }
    },
    mounted(){
    },
    methods: {
        clickManualPickButton(){
            if(this.element.table.list.get().length === 0) return

            this.calc.num++
            this.style.pick.display = 'block'

            this.element.table.pick.pickManual(this.element.table.list.get())
        },
        clickAutoPickButton(){
            const list = this.element.table.list.get()
            const prefer = this.element.table.prefer.get()
            if(list.length === 0 || prefer.length === 0) return

            this.style.pick.display = 'block'

            this.element.table.pick.pickAuto(list, prefer, this.calc)
        },
        clear(){
            this.calc.num = 0
            this.element.table.pick.clear()
            this.style.pick.display = 'none' 
        },
        changePickMethodToManual(){
            if(this.option === 'manual') return

            this.clear()
            this.option = 'manual'
            this.model.list = []
        },
        changePickMethodToAuto(){
            if(this.option === 'auto') return

            this.clear()
            this.option = 'auto'
        }
    }
})