const StatusBadge = ({ status }) => {
  const statusClasses =
    status === "new"
      ? "bg-green-200 text-green-700"
      : "bg-yellow-200 text-yellow-700";
  const dotClasses = status === "new" ? "bg-green-500" : "bg-yellow-500";
  const statusText = status === "new" ? "Nova" : "Já vista";

  return (
    <div className={`flex items-center p-2 rounded-full ${statusClasses}`}>
      <div className={`w-3 h-3 rounded-full ${dotClasses} mr-2`}></div>
      <span>{statusText}</span>
    </div>
  );
};

export default StatusBadge;
