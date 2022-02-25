//import { useCollection } from "../../hooks/useCollection"
import { db } from "../../firebase/config"
import { useEffect, useState, useRef } from 'react'
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"

export default function DataEntries({award, name, year, pair, awards, judges, years}) {
   // const { documents, error } = useCollection('award-entry')
    const [documents, setDocuments] = useState(null)

    let query_award = null
    let query_name = null
    let query_year = null
    let query_pair = null
    if (award) {
        query_award = ['award', '==', award.value]
    }
    if (name) {
        query_name = ['name', '==', name.value]
    }
    if (year) {
        query_year = ['year', '==', year.value]
    }
    if (pair) {
        query_pair = ['pair', '==', pair.value]
    }
    console.log("query_award", query_award)
    const q_award = useRef(query_award).current
    const q_name = useRef(query_name).current
    const q_year = useRef(query_year).current
    const q_pair = useRef(query_pair).current
    console.log('q_award', q_award)
    
    useEffect(() => {
      let ref = collection(db, 'award-entry')
      if (q_award) {
        ref = query(ref, where(...q_award))
      }
      if (q_name) {
        ref = query(ref, where(...q_name))
      }
      if (q_year) {
        ref = query(ref, where(...q_year))
      }
      if (q_pair) {
        ref = query(ref, where(...q_pair))
      }
      
      const unsub = onSnapshot(ref, (snapshot) => {
        let results = []
        snapshot.docs.forEach(doc => {
            results.push({...doc.data(), id: doc.id})
        })
        setDocuments(results)
        console.log('documents',documents)
    })
    return () => unsub()  
    },[setDocuments, q_award, q_name, q_year, q_pair])


    
  return (
    <>
        {documents && documents.map((document) => (
            <tr key={document.id}>
                <td>{document.award}</td>
                <td>{document.name}</td>
                <td>{document.year}</td>
                <td>{document.pair ? <i className="bi bi-check"></i>:<i className="bi bi-x"></i>}</td>
                <td>{document.difficulty}</td>
            </tr>
        ))}
    </>
  )
}
