import { db } from "../../firebase/config"
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where, orderBy, limit } from "firebase/firestore"
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from "../../hooks/useAuthContext"

export default function DataEntries({award, name, year, pair, lim}) {
    const { user } = useAuthContext()
    const { deleteDocument } = useFirestore('award-entry')
    const [documents, setDocuments] = useState(null)

    useEffect(() => {
      let ref = collection(db, 'award-entry')
      if (lim) {
        ref = query(ref, limit(lim))
      }
      if (award.value) {
        ref = query(ref, where('award', '==', award.value))
      }
      if (name.value) {
        ref = query(ref, where('name', '==', name.value))
      }
      if (year.value) {
        ref = query(ref, where('year', '==', year.value))
      }
      if (pair !== null) {
        ref = query(ref, where('pair', '==', pair))
      }
      ref = query(ref, orderBy('createdAt', 'desc'))
      
      const unsub = onSnapshot(ref, (snapshot) => {
        let results = []
        snapshot.docs.forEach(doc => {
            results.push({...doc.data(), id: doc.id})
        })
        setDocuments(results)
        console.log(`Document Reads: ${results.length}`)
    })
    return () => unsub()  
    },[setDocuments, award, name, year, pair,lim])

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
