import BackTop from 'components/content/backtop/BackTop.vue'

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            backtop_show: false,
            is_tabfixed: false,
        }
    },
    methods: {
        backtop_click() {
            // console.log("backtop_click");
            //this.$refs.scroll拿到b-scroll这个组件，再.scroll拿到组件里的new出来的scroll对象，这个对象里面就有scrollTo这个方法
            // this.$refs.scroll.scroll.scrollTo(0, 0, 500);再在scroll.vue里重新封装了
            this.$refs.scroll.scrollTo(0, 0);
        },
        listenBackTop(position) {
            this.backtop_show = -position.y > 1000;
            this.is_tabfixed = -position.y > this.tab_offsettop;
        }
    }
}