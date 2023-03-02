import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm'
import AttendConferenceForm from './AttendConferenceForm'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PresentationForm from './PresentationForm'
import MainPage from './MainPage';


function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="locations">
            <Route path="new" element={<LocationForm />} />
          </Route>
          <Route path="conferences">
            <Route path="new" element={<ConferenceForm />} />
          </Route>
          <Route path="attendees" element={<AttendeesList attendees={props.attendees} />} />
          <Route path="attendees/new" element={<AttendConferenceForm />} />
          <Route path="presentations/new" element={<PresentationForm />} />
          <Route index element={<MainPage />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
{/*<AttendConferenceForm />*/ }
{/*<ConferenceForm />*/ }
{/*<LocationForm />*/ }
{/*<AttendeesList attendees={props.attendees} /> */ }
