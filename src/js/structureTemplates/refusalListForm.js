import headerButtons from "./header/refusalHeaderButtons";


export default {
    structureType: "Form",
    components: [
        {
            id: 1,
            priority: 1,
            parentId: 0,
            visible: true,
            componentName: "RefusalListHeader",
            component: "EPCSFormHeader",
            props: { title: "Отказы в выдаче разрешения", headerButtons },
        },
        {
            id: 2,
            parentId: 0,
            priority: 2,
            visible: true,
            componentName: "RefusalListDataGrid",
            enumeration: true,
            component: "EPCSDataGrid",
            props: {
                noDataText: "Отказы отсутствуют",
                tableData: [],
                pageSize: 10,
                selectionMode: "single",
                inputColumnNames: {
                    rowNumber: "N",
                    shipName: "Судно",
                    imo: "IMO",
                    registerNumber: "Регистровый номер",
                    applicantName: "Заявитель",
                    rejectDate: "Дата выдачи отказа",
                },
                inputColumnSortNames: {
                    rejectDate: "dateRejectDate",
                }
            }
        },
        {
            id: 3,
            priority: 1,
            parentId: 0,
            visible: true,
            component: "EPCSPopup",
            componentName: "EPCSPopup",
        },
        {
            id: 4,
            priority: 1,
            parentId: 0,
            visible: true,
            component: "EPCSToggle",
            componentName: "isMine",
            props: {
                value: false,
                event: "refusalIsMineChange",
                labelLeft: "Мои отказы",
                label: "Все отказы",
                keepState: true,
            }
        },
    ],
};