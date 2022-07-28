import './App.css';
import FormComponent from './FormComponent';

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
        <FormComponent></FormComponent>
      </div>
      <div>
        data
      </div>
      </div>
    </div>
  );
}

export default App;
