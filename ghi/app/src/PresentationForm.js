import React, { useEffect, useState } from 'react';


function PresentationForm () {
    const [conferences, setConferences] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setConferences(data.conferences);

        }
      }
    const [presenterName, setPresenterName] = useState("")
    const [presenterEmail, setPresenterEmail] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [title, setTitle] = useState("")
    const [synopsis,setSynopsis] = useState("")
    const [conference, setConference] = useState("")

    const handlePresenterNameChange = (event) => {
        setPresenterName(event.target.value);
      }

    const handlePresenterEmailChange = (event) => {
        setPresenterEmail(event.target.value);
      }

    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value);
      }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
      }

    const handleSynopsisChange = (event) => {
        setSynopsis(event.target.value);
      }

    const handleConferenceChange = (event) => {
        setConference(event.target.value);
      }




      useEffect(() => {
        fetchData();
      }, []);


      const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.presenter_name = presenterName;
        data.presenter_email = presenterEmail;
        data.company_name = companyName;
        data.title = title;
        data.synopsis = synopsis;
        console.log(data);

        const url = `http://localhost:8000/api/conferences/${conference}/presentations/`;
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          const newPresentation= await response.json();
          console.log(newPresentation);
          setPresenterName("");
          setPresenterEmail("");
          setCompanyName("");
          setSynopsis("");
          setTitle("");
          setConference("");
        }
      }


    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={handleSubmit} id="create-presentation-form">
              <div className="form-floating mb-3">
                <input onChange={handlePresenterNameChange} value={presenterName} placeholder="Presenter_name" required type="text" name="presenter_name" id="presenter_name" className="form-control"/>
                <label htmlFor="presenter_name">Presenter name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePresenterEmailChange} value={presenterEmail} placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control"/>
                <label htmlFor="presenter_email">Presenter email</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleTitleChange} value={title} placeholder="Title" required type="text" name="title" id="title" className="form-control"/>
                <label htmlFor="title">Title</label>
              </div>
              <div className="mb-3">
                <label htmlFor="synopsis">Synopsis</label>
                <textarea onChange={handleSynopsisChange} value={synopsis} className="form-control"  name="synopsis" id="synopsis" rows="3" cols="18"></textarea>
              </div>
              <div className="mb-3">
                <select  onChange={handleConferenceChange} value={conference}required name="conference" id="conference" className="form-select">
                  <option value="">Choose a conference</option>
                  {conferences.map(conference => {
                      return (
                        <option key={conference.id} value={conference.id}>
                          {conference.name}
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

export default PresentationForm;
