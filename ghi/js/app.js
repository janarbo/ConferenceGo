function createCard(name, description, pictureUrl, start, end) {

    return `
      <div class="card">
        <div class="card shadow-lg mt-3">
          <img src="${pictureUrl}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${description}</p>
          </div>
        <div>  <p class="card-footer text-muted">${startDate} - ${endDate}</p>
        </div>
      </div>
    `;
  }
window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';
    const columns = document.querySelectorAll('.col')
    let colIndx = 0

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // Figure out what to do when the response is bad
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
                    const starts = new Date(details.conference.starts).toLocaleDateString();
                    const ends = new Date(details.conference.ends).toLocaleDateString();

                    const html = createCard(name, description, pictureUrl, start, end);
                    const column = columns[colIndx % 2];
                    column.innerHTML += html;
                    colIndx = (colIndx + 1) % 2

                }
            }

        }
    } catch (e) {
        console.error(e);
        // Figure out what to do if an error is raised
    }

});
