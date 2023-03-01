import React, {useEffect, useState} from 'react';

function ConferenceForm(props) {

    const [locations, setLocations] = useState([]);



    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);

        }
    }

    useEffect (() => {
        fetchData();
    }, []);



    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form id="create-conference-form">
              <div className="form-floating mb-3">
                <input placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Starts" required type="date" name="starts" id="starts" className="form-control"/>
                <label htmlFor="starts">Starts</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Ends" required type="date" name="ends" id="ends" className="form-control"/>
                <label htmlFor="ends">Ends</label>
              </div>
              <div className="mb-3">
                <label for="Description" className="form-label">Description</label>
                <textarea className="form-control"  name="Description" id="Description" rows="3"></textarea>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Max_presentations" required type="text" name="max_presentations" id="max_presentations" className="form-control"/>
                <label htmlFor="max_presentations">Maximum presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Max_attendees" required type="text" name="max_attendees" id="max_attendees" className="form-control"/>
                <label htmlFor="max_attendees">Maximum attendees</label>
              </div>
              <div className="mb-3">
                <select required name="location" id="location" className="form-location">
                  <option selected value="">Choose a location</option>
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>


    );
}

export default ConferenceForm;
