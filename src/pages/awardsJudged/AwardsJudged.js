import { useDocument } from '../../hooks/useDocument'

import CountData from './CountData'

export default function AwardsJudged() {
  const { document } = useDocument('award-info', '3RWf2J0uS8BX4MIsPU87')
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
            {document && document.adjudicators.map((judge) => (
              <CountData key={judge} judge={judge}/>
            ))}
        </tbody>
      </table>
    </div>
  )
}
