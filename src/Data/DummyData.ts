import { INotification } from "../Interfaces/Data";

export const DummyNotifications:INotification[] = [
  {
      "ID": 46,
      "RECIPIENTS": "actor",
      "AGE_FROM": 3,
      "AGE_TO": 90,
      "DEPARTMENT": 247,
      "LOCALITY": 12382,
      "MESSAGE_TITLE": "Mensaje1",
      "MESSAGE_BODY": "Mensaje",
      "ATTACHMENT_TYPE": "none",
      "NOTIFICATION_DATE_FROM": new Date("2023-04-05 00:00:00"),
      "NOTIFICATION_DATE_TO": new Date("2024-05-04 00:00:00"),
      "SEND_BY_EMAIL": false,
      "CREATED_AT": new Date("2023-05-15 19:46:47")
  },
  {
      "ID": 47,
      "RECIPIENTS": "actor",
      "AGE_FROM": 3,
      "AGE_TO": 90,
      "DEPARTMENT": 247,
      "LOCALITY": 12382,
      "MESSAGE_TITLE": "Mensaje2",
      "MESSAGE_BODY": "Contenido mensaje 2",
      "ATTACHMENT_TYPE": "none",
      "NOTIFICATION_DATE_FROM": new Date("2023-05-04 00:00:00"),
      "NOTIFICATION_DATE_TO": new Date("2024-05-04 00:00:00"),
      "SEND_BY_EMAIL": false,
      "CREATED_AT": new Date("2023-05-15 19:54:40")
  },
  {
      "ID": 48,
      "RECIPIENTS": "actor",
      "AGE_FROM": 3,
      "AGE_TO": 90,
      "DEPARTMENT": 247,
      "LOCALITY": 12382,
      "MESSAGE_TITLE": "Mensaje3",
      "MESSAGE_BODY": "Contenido mensaje 3",
      "ATTACHMENT_TYPE": "none",
      "NOTIFICATION_DATE_FROM": new Date("2023-05-05 00:00:00"),
      "NOTIFICATION_DATE_TO": new Date("2024-05-05 00:00:00"),
      "SEND_BY_EMAIL": false,
      "CREATED_AT": new Date("2023-05-15 20:15:18")
  },
  {
      "ID": 49,
      "RECIPIENTS": "actor",
      "AGE_FROM": 3,
      "AGE_TO": 90,
      "DEPARTMENT": 247,
      "LOCALITY": 12382,
      "MESSAGE_TITLE": "Mensaje4",
      "MESSAGE_BODY": "Contenido mensaje 4",
      "ATTACHMENT_TYPE": "none",
      "NOTIFICATION_DATE_FROM": new Date("2023-05-05 00:00:00"),
      "NOTIFICATION_DATE_TO": new Date("2024-05-05 00:00:00"),
      "SEND_BY_EMAIL": false,
      "CREATED_AT": new Date("2023-05-15 20:21:25")
  },
  {
      "ID": 50,
      "RECIPIENTS": "both",
      "AGE_FROM": 0,
      "AGE_TO": 100,
      "DEPARTMENT": 0,
      "LOCALITY": 0,
      "MESSAGE_TITLE": "Notificacion Prueba2",
      "MESSAGE_BODY": "Prueba2",
      "ATTACHMENT_TYPE": "none",
      "NOTIFICATION_DATE_FROM": new Date("2023-01-01 00:00:00"),
      "NOTIFICATION_DATE_TO": new Date("2023-12-01 00:00:00"),
      "SEND_BY_EMAIL": false,
      "CREATED_AT": new Date("2023-05-16 18:44:22")
  }
]