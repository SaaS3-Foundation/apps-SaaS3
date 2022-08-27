import './App.css';
import EditComponent from './EditComponent';
import EventsGateway from './EventsGateway';
import logo from './img/SaaS3Logo.png';
function App() {

  return (
    <div>
      <div className="App-header">
      <div className='iconpanel bg-light'>
        <img src={logo} onClick={()=>window.location.href='https://saas3.io/marketplace'}></img>
      </div>
      <div className="panelleft" style={{width:'50%', height:"100vh"}}>
        <div style={{display:'flex',flexDirection:"row"}} >
          <EventsGateway></EventsGateway>
        </div>
      </div>
      <div className='sidepanel border-left border-right'>
        <div className='flex-column'>
          <span>Input You Oracle Config</span>
        </div>
        <EditComponent></EditComponent>
        </div>
      </div>
    </div>
  );
}

export default App;
