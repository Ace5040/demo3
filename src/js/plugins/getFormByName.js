export default {
    install(Vue) {
        Vue.prototype.$getFormName = (name) => {
            console.log(name);
        }
    }
}