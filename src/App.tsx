import './App.css';
import FormComponent from './FormComponent';
import EditComponent from './EditComponent';
import EventsGateway from './EventsGateway';
import logo from './img/SaaS3Logo.png';
function App() {

  return (
    <div>
      <div className="App-header">
      <div className='iconpanel bg-light'>
        <img src={logo}></img>
      </div>
      <div className='sidepanel border-left border-right'>
      <div className='flex-column'>
      <span>Input You Request</span>
      </div>
        {/* <FormComponent></FormComponent> */}
        <EditComponent></EditComponent>
      </div>
      <div style={{ margin: '4rem', width:'100%', height:'100vh', top:'6rem'}}>
        <EventsGateway></EventsGateway>
      </div>
      </div>
    </div>
  );
}

export default App;
