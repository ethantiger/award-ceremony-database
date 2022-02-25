import { useCollection } from '../../hooks/useCollection'

export default function CountData({judge}) {
    const { documents } = useCollection('award-entry', ['name', '==', judge])
    let inPair = []
    if (documents) {
        inPair = documents.filter((document) => {
            return document.pair
        })
    }
    
  return (
    <>
    {documents && 
        <tr>
            <td>{judge}</td>
            <td>{documents.length}</td>
            <td>{inPair.length}</td>
            <td>{documents.length - inPair.length}</td>
        </tr>
    }
    </>
  )
}
