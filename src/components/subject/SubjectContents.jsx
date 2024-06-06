const SubjectContents = ({subjectContents}) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Conteúdos</h2>
            <table className="min-w-full bg-white border mt-2">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Nome</th>
                        <th className="border px-4 py-2">Última Alteração</th>
                        <th className="border px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {subjectContents.length === 0 && (
                        <tr>
                            <td>Nenhum Conteúdo Postado</td>
                        </tr>
                    )}
                    {subjectContents.map(content => (
                        <tr key={content.id}>
                            <td className="border px-4 py-2">{content.name}</td>
                            <td className="border px-4 py-2 text-center w-40">
                                {new Date(content.lastModified).toLocaleDateString()}
                            </td>
                            <td className="border px-4 py-2 text-center w-24">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Ver
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SubjectContents;
