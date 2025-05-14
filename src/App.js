import { useState, useEffect } from 'react';
import './App.css';
import Select from 'react-select';

function App() {
  const [input, setInput] = useState('');
  const [submit, setIngredientSubmission] = useState('');
  const [ingre_dropdown, setIngreDropdown] = useState('');

  useEffect(() => {
    fetch("http://localhost:8000/ingredients")
      .then((res) => res.json())
      .then((data) => setIngreDropdown(data))
      .catch((err) => console.error("Error fetching ingredients:", err));
  }, []);

  return (
    <div>

      <h1>Recipe Generator</h1>
      <br/>
      <p>Enter ingredients here:</p>
      {/* <input type="search" id="test_input" onChange={(e) => setInput(e.target.value)}/> */}
      {/* <br/> */}
      {/* <p>You inputted: {input}</p> */}
      {/* <button onClick={() => setIngredientSubmission(input)}>Submit</button> */}
      {/* <p>Submitted: {submit}</p> */}
      {/* <br/> */}
      <Select
        defaultValue={[]}
        isMulti
        name="colors"
        options={ingre_dropdown}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      <button onClick={() => setIngredientSubmission(input)}>Submit</button>



    </div>
  );
}

export default App;
