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
                list: ''
            },
            style: {
                pick: {display: 'none'}
            },
            num: 0,
            cost: 1200
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
            return this.num * this.cost
        }
    },
    watch: {
        watchType(){
            const race = this.element.table.type.get().find(e => e.param.clicked === true)
            if(race === undefined) return

            this.model.race = ''
            this.clear()
            this.element.table.race.set(race.child)
        },
        watchRace(){
            if(this.model.type === '' || this.model.race === '') {
                this.element.table.list.clear()
                return
            }

            this.model.list = ''
            this.clear()
            this.element.table.list.set(this.model.type, this.model.race)
        },
        watchList(){
            this.clear()
        }
    },
    mounted(){
    },
    methods: {
        // init
        clickPickButton(){
            if(this.element.table.list.get().length === 0) return

            this.num++
            this.style.pick.display = 'block' 

            this.element.table.pick.click(this.element.table.list.get())
        },
        clear(){
            this.num = 0
            this.element.table.pick.clear()
            this.style.pick.display = 'none' 
        }
    }
})