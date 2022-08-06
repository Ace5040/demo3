export default [
    {
        id: 1,
        component: "EPCSDirection",
        componentName: "worksRow",
        col: 12,
        props: {
            type: "row",
        },
    },
    {
        id: 2,
        parentId: 1,
        component: "EPCSFormInput",
        componentName: "workTypeSelector",
        col: 6,
        props: {
            type: "select",
            placeholder: "Выберите вид работ",
            label: "Вид работ в акватории СМП",
            labelPosition: "left",
        }
    },
    {
        id: 3,
        parentId: 1,
        component: "EPCSFormInput",
        componentName: "workTypeDescription",
        col: 6,
        props: {
            type: "text",
            placeholder: "Опишите работы",
            label: "Описание работ",
            labelPosition: "left",
        }
    },
    {
        id: 4,
        parentId: 1,
        component: "EPCSButton",
        col: 1,
        componentName: "addButton",
        props: {
            type: "icon",
            label: "F012",
            event: "addWork",
        },
    },
    {
        id: 5,
        parentId: 1,
        component: "EPCSButton",
        col: 1,
        componentName: "deleteButton",
        props: {
            type: "icon",
            label: "F03C",
            event: "deleteWork",
        },
    },
]