import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContents } from "../../store/contentsSlice";

const Materials = () => {
  const dispatch = useDispatch();
  const contents = useSelector((state) => state.contents.items);
  const status = useSelector((state) => state.contents.status);
  const error = useSelector((state) => state.contents.error);

  // Component Did Mount
  useEffect(() => {
    dispatch(getContents());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold">Últimos Materiais</h2>
      <ul>
        {contents.length === 0 && <li>Nenhum material encontrado</li>}
        {contents.slice(0, 5).map((content, index) => (
          <li key={index} className="text-blue-500">
            {content.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Materials;
