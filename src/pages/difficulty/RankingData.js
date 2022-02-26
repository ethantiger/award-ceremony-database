import { useMultiQuery } from "../../hooks/useMultiQuery"

export default function RankingData({judge, year}) {
    const { documents: highDocuments } = useMultiQuery('award-entry', ['name', '==', judge], ['difficulty', '==', 'High'], year)
    const { documents: medDocuments } = useMultiQuery('award-entry', ['name', '==', judge], ['difficulty', '==', 'Medium'], year)
    const { documents: lowDocuments } = useMultiQuery('award-entry', ['name', '==', judge], ['difficulty', '==', 'Low'], year)
  return (
    <>
    {highDocuments && medDocuments && lowDocuments && 
        <tr>
            <td>{judge}</td>
            <td>{highDocuments.length}</td>
            <td>{medDocuments.length}</td>
            <td>{lowDocuments.length}</td>
        </tr>
    }
    </>
  )
}
