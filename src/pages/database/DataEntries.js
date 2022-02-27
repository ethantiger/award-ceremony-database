import { db } from "../../firebase/config"
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"
import { useFirestore } from '../../hooks/useFirestore'


export default function DataEntries({award, name, year, pair}) {
    const { deleteDocument } = useFirestore('award-entry')
    const [documents, setDocuments] = useState(null)

    useEffect(() => {
      let ref = collection(db, 'award-entry')
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
    })
    return () => unsub()  
    },[setDocuments, award, name, year, pair])

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
                <td>{document.difficulty} <span className="float-end" onClick={() => handleClick(document.id)}><i className="bi bi-trash-fill"></i></span></td>
            </tr>
        ))}
    </>
  )
}
