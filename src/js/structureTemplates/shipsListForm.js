import headerButtons from "./header/shipsHeaderButtons";


export default {
    structureType: "Form",
    components: [
        {
            id: 1,
            priority: 1,
            parentId: 0,
            visible: true,
            componentName: "ShipsListHeader",
            component: "EPCSFormHeader",
            props: { title: "Флот", headerButtons },
        },
        {
            id: 2,
            parentId: 0,
            priority: 2,
            visible: true,
            componentName: "ShipsListDataGrid",
            enumeration: true,
            component: "EPCSDataGrid",
            props: {
                noDataText: "Суда отсутствуют",
                tableData: [],
                eventDoubleClick: "openShip",
                eventClick: "activeRowShip",
                eventLoadState: "loadStateShip",
                pageSize: 10,
                selectionMode: "single",
                inputColumnNames: {
                    rowNumber: "N",
                    name: "Наименование",
                    flag: "Флаг",
                    imo: "IMO",
                    registerNumber: "Регистровый номер",
                    shipType: "Тип судна",
                    iceClass: "Ледовый класс",
                },
                columnComponents: {
                    flag: "flag",
                },
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
    ],
};