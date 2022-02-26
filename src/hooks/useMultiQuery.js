import { useEffect, useState, useRef } from 'react'
import { db } from '../firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

export const useMultiQuery = (col, _q, _q2, year) => {
    const [ documents, setDocuments ] = useState(null)
    const [error, setError] = useState(null)

    // if we don't use a ref --> infinite loop in useEffect
    // _query is an array and is "different" on every function call
    const q = useRef(_q).current
    const q2 = useRef(_q2).current

    useEffect(() => {
         let ref = collection(db, col)

         if (q) {
            ref = query(ref, where(...q))
         }
         if (q2) {
             ref = query(ref, where(...q2))
         }
         if (year) {
             ref = query(ref, where('year', '==', year))
         }

         const unsub = onSnapshot(ref,(snapshot) => {
             let results = []
             snapshot.docs.forEach(doc => {
                 results.push({...doc.data(), id: doc.id})
             })

             // update state
             setDocuments(results)
             setError(null)
         }, (error) => {
             console.log(error)
             setError('could not fetch the data')
         })

         // unsubscribe on unmount
         return () => unsub()
    }, [col, q, q2,year])

    return { documents, error }
}