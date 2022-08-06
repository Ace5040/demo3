import headerButtons from "./header/permitHeaderButtons";

export default {
    structureType: "Form",
    components: [
        {
            id: 1,
            priority: 1,
            parentId: 0,
            visible: true,
            componentName: "PermitListHeader",
            component: "EPCSFormHeader",
            props: { title: "Разрешения", headerButtons },
        },
        {
            id: 2,
            parentId: 0,
            priority: 2,
            visible: true,
            componentName: "PermitListDataGrid",
            enumeration: true,
            component: "EPCSDataGrid",
            props: {
                noDataText: "Разрешения отсутствуют",
                tableData: [],
                pageSize: 10,
                selectionMode: "single",
                inputColumnNames: {
                    rowNumber: "N",
                    shipName: "Судно",
                    imo: "IMO",
                    registerNumber: "Регистровый номер",
                    applicantName: "Заявитель",
                    acceptDate: "Дата выдачи разрешения",
                    endDate: "Дата окончания действия",
                },
                inputColumnSortNames: {
                    acceptDate: "dateAcceptDate",
                    endDate: "dateEndDate",
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
                event: "permitIsMineChange",
                labelLeft: "Мои разрешения",
                label: "Все разрешения",
                keepState: true,
            }
        },
    ],
};