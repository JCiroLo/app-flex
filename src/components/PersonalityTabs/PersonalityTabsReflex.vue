<template>
    <div id="tabOuterContainer">
        <div class="tabs" ref="tabbar">
            <div class="tabitem" :class="index === activetab ? 'active' : ''"  v-for="(tab, index) in items" @click="switchtab(index)" :key="index" ref="tab">{{tab.title}}</div>
            <!-- <div class="slider" :style="'transform:translateX('+(activetab*tabwidth - items.length*tabwidth)+'px)'"></div> -->
        </div>

        <div 
            ref="tcon"
            class="tabcontainer" 
            v-on="pointer?{pointerdown: ($event)=>start($event), pointermove: ($event)=>move($event), pointerup: ($event)=>end($event)} 
            :{touchstart: ($event)=>start($event), touchmove: ($event)=>move($event), touchend: ($event)=>end($event)}"
        >
            <!-- Start Content -->
            <div v-for="(tab, index) in items" :key="index">
                <div class="slide-container" v-if="index === activetab">
                    <div class="personality-description">{{ tab.description }}</div>
                    <div class="personality-container">
                        <img class="dist-img" :src="tab.personalitySrc" />
                    </div>
                </div>
            </div>
            <!-- End Content -->
        </div>
    </div>

</template>

<script>
/* 
* Adapted from
* https://gist.github.com/dagalti/eea7f49378d9fa21de5e359dde0f859a 
*/
export default {
    name: 'PersonalityTabs',
    data() {
        return {
            transition: "slide-next",
            activetab: 0,
            tabwidth: 135, // 135
            items:[],
            sizeStr: '',
            touch:{sx:null, sy: null, st:null, ex:null, ey:null, et:null},
            size65: [
                {
                    title: 'Únicos',
                    description: '2 Alcobas principales',
                    personalitySrc: 'img/personality/reflex-planta-unicos.jpg'
                },
                {
                    title: 'Tradicionales',
                    description: '3 Alcobas',
                    personalitySrc: 'img/personality/reflex-planta-tradicionales.jpg'
                }
            ],
            size55: [
                {
                    title: 'Prácticos',
                    description: '2 Alcobas',
                    personalitySrc: 'img/personality/reflex-planta-practicos.jpg'
                },
                {
                    title: 'Anfitriones',
                    description: '1 Alcoba ampliada + Huésped',
                    personalitySrc: 'img/personality/reflex-planta-anfitriones.jpg'
                },
                {
                    title: 'Emprendedores',
                    description: '1 Alcoba ampliada + Estudio',
                    personalitySrc: 'img/personality/reflex-planta-emprendedores.jpg'
                },
                {
                    title: 'Conectados',
                    description: '1 Alcoba con estudio en la alcoba principal',
                    personalitySrc: 'img/personality/reflex-planta-conectados.jpg'
                },
                {
                    title: 'Sofisticados',
                    description: '1 Alcoba + Estudio en la zona social',
                    personalitySrc: 'img/personality/reflex-planta-sofisticados.jpg'
                }
            ]   
        }
    },
    mounted() {
        this.$refs.tabbar.style.setProperty('--tabwidth', this.tabwidth+'px')

        // retrieve and setup data to show personalities
        const { size } = JSON.parse(window.localStorage.getItem("apartment"))
        this.sizeStr = size;
        this.items = this.sizeStr === '55 M2' ? this.size55 : this.size65;
    },
    computed: {
        pointer(){
            if(window.PointerEvent) return true
            else return false
        }
    },
    methods: {
        switchtab(n){
            let scroll, scond
            if(this.activetab>n){
                this.transition = "slide-prev"
                scroll = n-1
                if(scond)this.$refs.tab[scroll].scrollIntoView({behavior:'smooth'})
            }else if(this.activetab<n){
                this.transition = "slide-next"
                scroll = n+1
            }
            scond = scroll>=0 && scroll < this.items.length
            if(scond)this.$refs.tab[scroll].scrollIntoView({behavior:'smooth'})

            this.activetab = n

            this.notifySelection(n)
        },
        start(e){
            this.settouchpos(e, 'start')       
        }, 
        move(e){
            this.settouchpos(e, 'move')  
        },
        end(e){
            this.settouchpos(e, 'end') 
            let dx = this.touch.sx - this.touch.ex,
                dy = this.touch.sy - this.touch.ey,
                dt = this.touch.et - this.touch.st,
                dir = Math.sign(dx),
                ntab = this.activetab+dir,
                vmove =  Math.abs(dx) / Math.abs(dy) < Math.sqrt(4) 
                ntab = ntab >=0 && ntab<this.items.length ? ntab : null
            if(Math.abs(dx)>10 && ntab !==null && !vmove && dt<300)      this.switchtab(ntab)
        },
        settouchpos(e, event){
            let ev = e.changedTouches ? e.changedTouches[0] : e
            if(event === 'start'){
                this.touch.sx = ev.clientX
                this.touch.sy = ev.clientY
                this.touch.st = Date.now()
            }else{
                this.touch.ex = ev.clientX
                this.touch.ey = ev.clientY
                this.touch.et = Date.now()
            }
        },
        notifySelection(n) {
            const sizeData = this.sizeStr === '55 M2' ? this.size55 : this.size65;
            const personality = sizeData[n].title;
            this.$emit('p-select', personality)
        }
    }
}
</script>

<style scoped>
.slide-next-leave-active, .slide-next-enter-active, .slide-prev-enter-active, .slide-prev-leave-active {
  transition: .5s;
}
.slide-next-enter,.slide-next-leave, .slide-prev-leave-to 
{
  transform: translate(100%, 0);
}
 
.slide-next-leave-to, .slide-prev-enter, .slide-prev-leave {
  transform: translate(-100%, 0);
}

.tabs{
  display:flex;
  position:relative;
  /* background-color:#e1830d; */
  color: #f1f1f1;
  height:48px;
  /* box-shadow:0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 7px 0 rgba(0,0,0,.12); */
  overflow-x:scroll;
  overflow: -moz-scrollbars-none; 
  -ms-overflow-style: none;
    max-width: fit-content;
    margin: 0 auto;
}
.tabs::-webkit-scrollbar  {
    width: 0 !important;
    height:0 !important;
}
.tabitem{
  display:flex;
  align-items:center;
  justify-content:center;
  /* min-width:var(--tabwidth); */
  min-width: fit-content;
  padding: 0 15px;
  cursor:pointer;
  text-transform:uppercase;
  font-size:14px;
    background-color:#C94690;
    border-radius: 4px;
    margin: 0 2px;
}
.tabitem.active{
  font-weight: 500;
  color: white;
    transition:.5s ease;
    background-color: #00B1C9;
    /* border-bottom: 2px solid white; */
    height: 45px; /* // ### */
}
.slider{
  position:absolute;
  bottom:0px;
  height:2px;
  width:var(--tabwidth);
  background:white;
  transition:.5s ease;
}

.tabcontainer {
  position: relative;
  min-height: 100%;
  width: 100%;
  touch-action:pan-y;
}
   
.tabpane{
    position: absolute;
    width: 100%;
    font-size:32px;
    display:flex;
    align-items:center;
    justify-content:center;
    height:300px;  
    }

#tabOuterContainer{
  margin:0 auto;
  text-align:center;
 }


 body{
    font-family: "Roboto", Helvetica, sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    margin:0;
}
/* Slides style */
.slide-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.personality-description {
    border-radius: 3px;
    padding: 20px 0;
    margin-bottom: 5px;
    color: #00B1C9;
    /* font-family: 'Latinotype-ArquitectaHeavy'; */
    font-size: 28px !important;
    font-weight: bold;
}
.personality-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.dist-img {
    width: 550px;
    height: 530px;
}

@media screen and (max-width: 550px) {
    .dist-img {
        max-width: 100%;
        height: auto;
    }
}
</style>