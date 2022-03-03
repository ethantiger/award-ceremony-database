import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from "../../hooks/useAuthContext"

export default function DataEntries({entries, award, name, year, pair}) {
    const { user } = useAuthContext()
    const { deleteDocument } = useFirestore('award-entry')
    let documents = entries
    
    if (award) {
      documents = documents.filter((document) => {
        return document.award === award
      })
    }
    if (name) {
      documents = documents.filter((document) => {
        return document.name === name
      })
    }
    if (year) {
      documents = documents.filter((document) => {
        return document.year === year
      })
    }
    if (pair !== null) {
      documents = documents.filter((document) => {
        return document.pair === pair
      })
    }

    const handleClick = async (id) => {
      await deleteDocument(id)
    }

  return (
    <>
        {documents && documents.map((document) => (
            <tr key={document.id}>
                <td>{document.award}</td>
                <td>{document.name}</td>
                <td>{document.year}</td>
                <td>{document.pair ? <i className="bi bi-check"></i>:<i className="bi bi-x"></i>}</td>
                <td>{document.difficulty} 
                  {user && <div className="modal fade" id={`ID${document.id}`} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure?</h5>
                            </div>
                            <div className="modal-body">
                                <p>You are about to delete a data entry.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => handleClick(document.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                  </div>}
                {user && <span className="float-end" data-bs-toggle="modal" data-bs-target={`#ID${document.id}`}><i className="bi bi-trash-fill"></i></span>}</td>
            </tr>
        ))}
    </>
  )
}
