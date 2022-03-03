import { useState, useEffect } from 'react'
import Select from 'react-select'

import RankingData from './RankingData'

export default function Difficulty({info, entries}) {
  const [years, setYears] = useState([])
  const [curYear, setCurYear] = useState('')

  useEffect(() => {
    if (info) {
      setYears(info.years.map((year) => {
        return {value: year, label: year}
      }))
    }
  },[info])

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
                {info && entries && info.adjudicators.map((judge) => (
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
                {info && entries && info.adjudicators.map((judge) => (
                  <RankingData key={judge} judge={judge} documents={entries}/>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
