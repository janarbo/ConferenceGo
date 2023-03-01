import React, {useEffect, useState} from 'react';

function ConferenceForm() {

    const [locations, setLocations] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);

        }
    }

    const [name, setName] = useState("");
    const [starts, setStarts] = useState("")
    const [ends, setEnds] = useState("")
    const [description, setDescription] = useState("")
    const [maxPresentations, setMaxPresentations] = useState("")
    const [maxAttendees, setMaxAttendees] = useState("")
    const [location, setLocation] = useState("")


    const handleNameChange = (event) => {
        setName(event.target.value);

    }

    const handleStartsChange = (event) => {
        setStarts(event.target.value);

    }

    const handleEndsChange = (event) => {
        setEnds(event.target.value);

    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);

    }

    const handleMaxPresentationsChange = (event) => {
        setMaxPresentations(event.target.value);

    }

    const handleMaxAttendeesChange = (event) => {
        setMaxAttendees(event.target.value);

    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);

    }


    useEffect (() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name= name;
        data.starts = starts;
        data.ends= ends;
        data.description = description;
        data.max_presentations = maxPresentations;
        data.max_attendees = maxAttendees;
        data.location = location;
        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
          const newConference = await response.json();
          console.log(newConference);
          setName("");
          setStarts("");
          setEnds("")
          setDescription("")
          setMaxPresentations("")
          setMaxAttendees("")
          setLocation("")
        }
      }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleStartsChange} value={starts}placeholder="Starts" required type="date" name="starts" id="starts" className="form-control"/>
                <label htmlFor="starts">Starts</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleEndsChange} value={ends} placeholder="Ends" required type="date" name="ends" id="ends" className="form-control"/>
                <label htmlFor="ends">Ends</label>
              </div>
              <div className="mb-3">
                <label htmlFor="Description" className="form-label">Description</label>
                <textarea onChange={handleDescriptionChange} value={description} className="form-control"  name="Description" id="Description" rows="3"></textarea>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleMaxPresentationsChange} value={maxPresentations} placeholder="Max_presentations" required type="text" name="max_presentations" id="max_presentations" className="form-control"/>
                <label htmlFor="max_presentations">Maximum presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleMaxAttendeesChange} value={maxAttendees} placeholder="Max_attendees" required type="text" name="max_attendees" id="max_attendees" className="form-control"/>
                <label htmlFor="max_attendees">Maximum attendees</label>
              </div>
              <div className="mb-3">
                <select onChange={handleLocationChange} value={location} required name="location" id="location" className="form-select">
                  <option value="">Choose a location</option>
                    {locations.map(location => {
                        return (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                        );
                    })}
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
