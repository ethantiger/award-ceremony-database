import { useMultiQuery } from "../../hooks/useMultiQuery"

export default function RankingData({judge, year}) {
    console.log('year', year)
    const { documents: highDocuments } = useMultiQuery('award-entry', ['name', '==', judge], ['difficulty', '==', 'High'])
    
  return (
    <>
    {highDocuments && 
        <tr>
            <td>{judge}</td>
            <td>{highDocuments.length}</td>
        </tr>
    }
    </>
  )
}
