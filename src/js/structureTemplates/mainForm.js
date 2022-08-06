import inputComponentProps from "./popup-menu/main-poup-menu";

export default {
    structureType: "Form",
    components: [
        {
            id: 10,
            priority: 1,
            parentId: 0,
            component: "FormTemplate",
            componentName: "content",
            props: {
                nameForm: "ApplicationFloatListForm",
            },
        },
        {
            id: 11,
            priority: 1,
            parentId: 0,
            component: "EPCSPopupMenu",
            componentName: "navigationPopupMenu",
            props: {
                iconData: "61454",
                label: "Навигация",
                width: 340,
                inputComponentProps,
            },
        },
        {
            id: 12,
            priority: 1,
            parentId: 0,
            component: "EPCSPopupMenu",
            componentName: "notificationsPopupMenu",
            props: {
                iconData: "61454",
                type: "right",
                width: 340,
                inputComponentProps: {
                    selectionMode: "single",
                    eventDoubleClick: "openNotification",
                }
            }
        },
        {
            id: 13,
            priority: 1,
            parentId: 0,
            component: "EPCSJoystick",
            componentName: "joystick",
        },
    ]
};
