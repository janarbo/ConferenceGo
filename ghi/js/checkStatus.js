// Get the cookie out of the cookie store
const payloadCookie = await cookieStore.get('jwt_access_payload');// FINISH THIS
if (payloadCookie) {
    // The cookie value is a JSON-formatted string, so parse it
    //const encodedPayload = JSON.parse(payloadCookie.value);
    console.log(payloadCookie.value);

    // Convert the encoded payload from base64 to normal string
    const decodedPayload = atob(payloadCookie.value);
    // FINISH THIS

    // The payload is a JSON-formatted string, so parse it
    const payload = JSON.parse(decodedPayload);// FINISH THIS

    // Print the payload
    // console.log(payload);

    const permissions = payload.user.perms
    const locationTag = document.getElementById("new-location");
    const conferenceTag = document.getElementById("new-conference");
    const presentationTag = document.getElementById("new-presentation")

    // Check if "events.add_conference" is in the permissions
    if (permissions.includes('events.add_conference')) {
        // If it is, remove 'd-none' from the link
        conferenceTag.classList.remove("d-none");
    }

    // Check if "events.add_location" is in the permissions
    if (permissions.includes("events.add_location")) {
        // If it is, remove 'd-none' from the link
        locationTag.classList.remove("d-none");
    }

    if (permissions.includes("presentations.add_presentation")) {
        // If it is, remove 'd-none' from the link
        presentationTag.classList.remove("d-none");
    }

}
