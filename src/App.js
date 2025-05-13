import { useState } from 'react';
import './App.css';
import Select from 'react-select';

function App() {
  const [input, setInput] = useState('');
  const [submit, setIngredientSubmission] = useState('');

  return (
    <div>
      <h1>Recipe Generator</h1>
      <br/>
      <p>Enter ingredients here:</p>
      <input type="search" id="test_input" onChange={(e) => setInput(e.target.value)}/>
      <br/>
      <p>You inputted: {input}</p>
      <button onClick={() => setIngredientSubmission(input)}>Submit</button>
      <p>Submitted: {submit}</p>
      <br/>
      <Select
        defaultValue={[]}
        isMulti
        name="colors"
        options={
          [
            {"value": "egg", "label": "Egg"},
            {"value": "milk", "label": "Milk"}
          ]
        }
        className="basic-multi-select"
        classNamePrefix="select"
      />




    </div>
  );
}

export default App;
