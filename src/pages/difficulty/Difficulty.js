import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useDocument } from '../../hooks/useDocument'
import { useCollection } from '../../hooks/useCollection'

import RankingData from './RankingData'

export default function Difficulty() {
  const { document } = useDocument('award-info', '3RWf2J0uS8BX4MIsPU87')
  const { documents: entries } = useCollection('award-entry')
  const [years, setYears] = useState([])
  const [curYear, setCurYear] = useState('')

  useEffect(() => {
    if (document) {
      setYears(document.years.map((year) => {
        return {value: year, label: year}
      }))
    }
  },[document])

  useEffect(() => {
    if (entries) {
      console.log(entries.length)
    }
  },[entries])


  return (
    <div className="mt-5 container-xxl">
      <div className="row">
        <div className="col-md-6">
          <div className="d-flex">
            <h4 className="me-2">Year: </h4>
            <Select 
              styles={{
                container: base => ({
                    ...base,
                    flex: 1
                  })
              }}
              onChange={(option) => setCurYear(option.value)}
              options={[{value: '', label: 'All'}, ...years]}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col"># of High Awards</th>
                <th scope="col"># of Medium Awards</th>
                <th scope="col"># of Low Awards</th>
                <th scope="col">Rank</th>
              </tr>
            </thead>
            <tbody>
                {document && entries && document.adjudicators.map((judge) => (
                  <RankingData key={judge} judge={judge} year={curYear} documents={entries}/>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h4>All Time</h4>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col"># of High Awards</th>
                <th scope="col"># of Medium Awards</th>
                <th scope="col"># of Low Awards</th>
                <th scope="col">Rank</th>
              </tr>
            </thead>
            <tbody>
                {document && entries && document.adjudicators.map((judge) => (
                  <RankingData key={judge} judge={judge} documents={entries}/>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
