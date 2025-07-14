import { TableHeader } from '../BeeHelper/BeeHelperElements.js';

function HelperWordTable({wordList}) {    

    return (
        <div className="d-sm-flex mt-5 flex-column justify-content-center">
            <h2 className="text-center">Words</h2>
            <div className="table-responsive" style={{ display: "flex", justifyContent: "center" }}>
                <table className="table table-bordered" style={{ width: '40%' }}>
                    <thead className="table-primary">
                        <TableHeader>Word</TableHeader>
                    </thead>
                    {Array.isArray(wordList) ? (
                        <tbody>
                            {wordList.map((data) => (
                                <tr key={data._id}>
                                    <td className="text-center">
                                        {data.word}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="4">Loading words...</td>
                            </tr>
                        </tbody>
                    )}


                </table>
            </div>
        </div>
    )

}

export default HelperWordTable;