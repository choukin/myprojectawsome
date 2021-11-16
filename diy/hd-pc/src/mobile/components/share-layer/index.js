import Vue from 'vue'
import LayerVue from './share-layer.vue'

const LayerConstructor = Vue.extend(LayerVue)

let instance

const initInstance = () => {
  if (!instance) {
    instance = new LayerConstructor({
      el: document.createElement('div')
    })
  }
}

function Layer(isLock = true) {
  if (!instance) {
    initInstance()
  }
  instance.isLock = isLock
  document.getElementById('app').lastChild.appendChild(instance.$el)
}

export default Layer
