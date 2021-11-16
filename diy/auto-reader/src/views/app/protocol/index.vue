<template>
  <div
    ref="content"
    class="content"
    v-html="htmlContent"
  />
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
const { VUE_APP_HOST } = process.env
// eslint-disable-next-line no-unused-vars
import {unescapeHTML} from '@/utils/tool'
import {setTitle} from '@/utils/app.ts'
@Component({
  name: 'taskdetail',
  filters:{unescapeHTML},
  components:{
  
  }
})
export default class Ranking extends Vue {
  content: string = ''
  get htmlContent() {
    return unescapeHTML(this.content||'')
  }
  
  async created() {
   
    await this.fetchDetail()
  }
  mounted() {
    let type = this.$route.query.type as string
    if (type === '5'){
      let content = this.$refs.content  as HTMLElement
      content.style.padding = '0px'
    }
  }
  /**
   * 
   */
  async fetchDetail() {
    let type = this.$route.query.type
    let data = await this.$get(VUE_APP_HOST + `/gunsApi/readAppApi/getHtmlTextByType`,{type})
    this.content = data.content
    setTitle(data.htmlName)
  }
}
</script>
<style>
.content p img{
    width:100%;
}
.content a img{
height: 100vh;
width:100vw;
}
</style>

<style lang="scss"  scoped>
.content {
  font-size:.28rem;
  padding:.3rem;
  p img{
    width:100%;
  }
}
</style>