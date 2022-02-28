export default function RankingData({judge, year, documents}) {
    const highDocuments = documents.filter((document) => {
      if (year) {
        return document.name === judge && document.year === year && document.difficulty === 'High'
      } else {
        return document.name === judge && document.difficulty === 'High'
      }
    })
    const medDocuments = documents.filter((document) => {
      if (year) {
        return document.name === judge && document.year === year && document.difficulty === 'Medium'
      } else {
        return document.name === judge && document.difficulty === 'Medium'
      }
    })
    const lowDocuments = documents.filter((document) => {
      if (year) {
        return document.name === judge && document.year === year && document.difficulty === 'Low'
      } else {
        return document.name === judge && document.difficulty === 'Low'
      }
    })
  return (
    <>
    {highDocuments && medDocuments && lowDocuments && 
        <tr>
            <td>{judge}</td>
            <td>{highDocuments.length}</td>
            <td>{medDocuments.length}</td>
            <td>{lowDocuments.length}</td>
            <td>{highDocuments.length * 3 + medDocuments.length * 2 + lowDocuments.length}</td>
        </tr>
    }
    </>
  )
}
