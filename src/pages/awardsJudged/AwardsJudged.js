import CountData from './CountData'

export default function AwardsJudged({entries, info}) {
  return (
    <div className="mt-5 container-xxl">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Total Awards Judged</th>
            <th scope="col">Total Judged in Pair</th>
            <th scope="col">Total Judged Solo</th>
          </tr>
        </thead>
        <tbody>
            {entries && info && info.adjudicators.map((judge) => (
              <CountData key={judge} entries={entries} judge={judge}/>
            ))}
        </tbody>
      </table>
    </div>
  )
}
