export default function Home() {
  return (
    <div className="container-xxl">
      <div className="row mt-5 text-center">
        <h1>Welcome to the Database!</h1>
      </div>
      <div className="row mt-5">
        <div className="col-md-8">
          <h3 className="text-center">How to use it</h3>
          <p>Switch through tabs with the orange navigation bar at the top.</p>
          <h5>Database</h5>
          <p>Shows a record all past adjudicators and the awards that they judged. Use filter options to search for more specific data entries. More than one filter option may be used at a time.</p>
          <h5>Awards Judged</h5>
          <p>Displays the total number of awards judged by an adjudicator. Also shows how many of those awards judged were in pairs or solo.</p>
          <h5>Difficulty</h5>
          <p>Displays the number of high, medium, awards an adjudicator judged in the past and provides a ranking based on these awards. Use filter to see rankings for a specific year. Ranking calculated as: # of High * 3 + # of Medium * 2 + # of Low.<br />The higher the rank means the harder the adjudicator had to work.</p>
        </div>
        <div className="col-md-4">
          <h3 className="text-center">Create</h3>
          <p>In order to create and delete data, you must login. <br />After logging in, the Create button will now be accessible. <br />To ensure there are no spelling mistakes, you must first create a new type of adjudicator, award, and year. <br />After this is completed, then you may use the data entry form to create a new entry.<br />Click on the trash bin icon to delete entries as well as types of adjudicators, awards, and years.</p>
        </div>
      </div>
    </div>
  )
}
