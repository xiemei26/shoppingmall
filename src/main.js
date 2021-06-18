import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bus from './bus.js'


const app = createApp(App)

app.config.globalProperties.$bus = bus

app.use(bus).use(store).use(router).mount('#app')

// 这一步的修改是为了练习使用事件总线监测图片的加载完成，加载完成后需要更新better-scroll的scrollHeight,
// 这样就不会出现下滑卡顿的现象
// 实际上，为了改变这个现象，最好的方法是在better-scroll对象创建的时候添加属性 observeImage:true