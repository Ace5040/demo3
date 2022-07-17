// import Application from './js/application/Application.js';
// import allStructures from './js/structureTemplates/allStructures.js';
// import allPopupStructures from './js/structureTemplates/popup/allPopupStructures.js';
// import FormTemplate from './components/FormTemplate.vue.js';
// import 'axios';

var App = {
    render: function(){
        var _vm=this;
        var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"epcs-dispatching",attrs:{"id":"app"}},1)
    },
    // staticRenderFns: [],
    name: "App",
    components: {
        // FormTemplate,
    },
    data() {
        return {
            // application: null,
            // formController: null,
            // structureController: null,
            // allStructures,
            // formsForTpl: null,
            // forTpl: null,
            // formByName: null,
            // updateKey: 0,
            // allPopupStructures,
        };
    },
    beforeMount() {
        //Создаем новое приложение и передаем туда все структуры
        // const structures = {
        //     allStructures: this.allStructures,
        //     allPopupStructures: this.allPopupStructures,
        // };
        // this.application = new Application(structures);
        // this.getComponent({ nameForm: "weatherMain" });
        console.log('demo test');
    },
    methods: {
        // getComponent(data) {
        //     console.log('data: ', data);
        //     // запрашивает структуру необходимой нам формы
        //     this.formByName = this.application.getFormByName(data.nameForm, data);
        //     console.log('this.formByName: ', this.formByName);
        //     // запрашивает структуры всех попапов
        //     this.formPopups = this.application.getAppAllPopupForms();
        //     //Генерируем компоненты нужной формы
        //     this.formsForTpl = this.formByName.getFormForVue();
        // },
    },
    beforeDestroy() {
        // this.$bus.$off("addNewShip");
        // this.$bus.$off("backPage");
        // this.$bus.$off("goToMainShipPage");
    },
};

export { App as default };
