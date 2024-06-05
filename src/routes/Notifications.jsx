import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotificationCard from "../components/notifications/NotificationsCard";
import { getNotifications, markAsRead, put } from "../store/notificationSlice";

function Notification() {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const notificationStatus = useSelector((state) => state.notifications.status);

  // Component Did Mount
  useEffect(() => {
    async function fetchNotifications() {
      await dispatch(getNotifications());
    }

    fetchNotifications();
  }, [dispatch]);

  const markAsReadHandler = (id) => {
    async function awaitDispatch() {
      await dispatch(markAsRead(id));
      await dispatch(put({ id }));
    }

    awaitDispatch();
  };

  return (
    <div className="mx-auto">
      <h2 className="text-xl font-semibold mb-4">Notificações</h2>
      <div>
        {notifications.items.length === 0 ? (
          <div className="p-4 bg-white shadow rounded-lg mb-4">
            <p className="text-center font-bold">Nenhuma Notificação</p>
          </div>
        ) : (
          notifications.items.map((notification, index) => (
            <NotificationCard
              key={index}
              status={notification.status}
              title={notification.title}
              description={notification.description}
              date={notification.date}
              onMarkAsRead={() => markAsReadHandler(notification.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;
