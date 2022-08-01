import './App.css';
import FormComponent from './FormComponent';
import EditComponent from './EditComponent';

function App() {

  return (
    <div>
      <div className="App-header">
      <div className='iconpanel bg-light'>
        icon
      </div>
      <div className='sidepanel border-left border-right'>
      <div className='flex-column'>
      <span>Input You Request</span>
      </div>
        {/* <FormComponent></FormComponent> */}
        <EditComponent></EditComponent>
      </div>
      <div>
        data
      </div>
      </div>
    </div>
  );
}

export default App;
