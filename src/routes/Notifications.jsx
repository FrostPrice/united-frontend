import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotificationCard from "../components/notifications/NotificationsCard";
import { get, markAsRead, put } from "../store/notificationSlice";

function Notification() {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const notificationStatus = useSelector((state) => state.notifications.status);

  useEffect(() => {
    if (notificationStatus === "idle") {
      dispatch(get());
    }
  }, [notificationStatus, dispatch]);

  const markAsReadHandler = (id) => {
    dispatch(markAsRead(id));
    dispatch(put({ id }));
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
              price={notification.price}
              onMarkAsRead={() => markAsReadHandler(notification.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;
