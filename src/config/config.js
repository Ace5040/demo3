
export default {
    //publicationURL: "http://127.0.0.1:8080",
    publicationURL: process.env.GEO || "http://10.20.30.102:3000",

    //Статусы для Разрешений
    permitStatuses: ["Одобрено"],

    //Статусы для Отказов
    refusalStatuses: ["Отказано", "Отказано в АСМП", "Отказано в ШМО"],

    statuses: {
        Draft: 1,
        New: 2
    },

    maxDistancePathKm: 100000,
    notificationsLimit: 100,
    notificationsDaysLimit: 30,

    //Кнопка "Редактировать" активна только у заявлений в статусах: Черновик, Новое, На рассмотрении, На согласовании, Отказано в АСМП
    editStatuses: ["Черновик", "Новое", "На рассмотрении", "Отказано в АСМП", "На согласовании"],
}
