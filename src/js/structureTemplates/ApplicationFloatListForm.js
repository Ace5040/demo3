import headerButtons from "./header/applicationFloatHeaderButtons";


export default {
    structureType: "Form",
    components: [
        {
            id: 1,
            priority: 1,
            parentId: 0,
            component: "EPCSFormHeader",
            componentName: "ApplicationFloatListHeader",
            props: { title: "Заявления", headerButtons },
        },
        {
            id: 2,
            parentId: 0,
            priority: 2,
            component: "EPCSDataGrid",
            componentName: "ApplicationFloatListDataGrid",
            enumeration: true,
            props: {
                noDataText: "Заявления отсутствуют",
                tableData: [],
                eventDoubleClick: "openApplicationFloat",
                eventClick: "activeRowApplicationFloat",
                eventLoadState: "loadStateApplicationFloat",
                pageSize: 10,
                selectionMode: "single",
                inputColumnNames: {
                    rowNumber: "N",
                    outgoingNumber: "Вх. номер",
                    shipName: "Судно",
                    imo: "IMO",
                    registerNumber: "Регистровый номер",
                    applicantName: "Заявитель",
                    sendDate: "Дата подачи",
                    reviewPeriod: "Срок рассмотрения",
                    statusName: "Статус рассмотрения"
                },
                inputColumnSortNames: {
                    sendDate: "dateSendDate",
                    reviewPeriod: "dateReviewPeriod",
                }
            }
        },
        {
            id: 3,
            priority: 1,
            parentId: 0,
            component: "EPCSPopup",
            componentName: "EPCSPopup",
        },
    ],
};
