function createCard(name, description, pictureUrl, starts, ends, location) {
    return `
    <div class="col-sm">
        <div class="card shadow-lg mt-3">
            <img src="${pictureUrl}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                <p class="card-text">${description}</p>
            </div>
        </div>
        <div class="card-footer text-muted">
        ${starts} - ${ends}
        </div>
    </div>
`;
  }

  function alert(){
    return`
    <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">There was an error loading the conference data. </h4>
        <p></p>
        <p>Please try again later.</p>
    </div>
    `
  }



  window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // Figure out what to do when the response is bad
        const body = document.querySelector('main');
        const error = alert();
        body.innerHTML += error;
  ;
      } else {
        const data = await response.json();
        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const name = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const starts = new Date(details.conference.starts);
            const ends = new Date(details.conference.ends);
            const location = details.conference.location.name;
            const html = createCard(name, description, pictureUrl,
            starts.toLocaleDateString('en-US'), ends.toLocaleDateString('en-US'), location);
            console.log(html);
            const row = document.querySelector('.row');
            row.innerHTML += html;
          }
        }
      }
    } catch (e) {
      // Figure out what to do if an error is raised

      const body = document.querySelector('main');
      const error = alert();
      body.innerHTML += error;
      console.error('error', e);

    }
  });
