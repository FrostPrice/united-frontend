import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotifications } from "../../store/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.items);
  const status = useSelector((state) => state.notifications.status);
  const error = useSelector((state) => state.notifications.error);

  // Component Did Mount
  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const unreadNotifications = notifications
    .filter((notification) => notification.status === "new")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div className="grid grid-cols-4 gap-6">
      {unreadNotifications.length > 0 ? (
        unreadNotifications.map((notification) => (
          <div
            className="p-4 bg-white shadow rounded-lg mb-4"
            key={notification.id}
          >
            <h3 className="text-lg font-semibold">{notification.title}</h3>
            <p>{notification.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(notification.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p className="p-4 bg-white shadow rounded-lg mb-4 col-span-4">
          Nenhuma notificação nova
        </p>
      )}
    </div>
  );
};

export default Notification;
