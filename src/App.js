import './App.css';
import {User} from './User'
import WebSocketComponent from './WebSocketComponent';

import { useState } from 'react';

function App() {

const age = 25;
const names = ["Jake", "Pedro", "Maciej", "Fernando"];
const users = [{name: "Maciej", age: 21},
                {name: "Krzysztof", age: 32},
              {name: "Laura", age: 9}]

//useState używamy, żeby strona ponownie zrenderowała wartości, bo jak zmienimy np const age, to nic się nie stanie

const [increment, setIncrement] = useState(0);

//funkcja
const GetNameFunction = (name) => {
  return name;
}

const Increment = () => {
  setIncrement(increment + 1);
}

//component
const GetNameComponent = (name) => {
  return <h1>{name}</h1>
}
              
  return (
    <div className="App">
      {GetNameFunction("function")}

      {GetNameComponent("component")}

      <User name="Krzysiek" age={22} email="krzysiek.misiek@gamil.com"></User>

      {age < 23 ? <h1 style={{color: "green"}}>Młody</h1> : <h1 style={{color: "red"}}>Stary</h1>}

      {names.map((name, key) => {
        return <p>{key} {name}</p>
      })}

      {users.map((user, key) => {
        return <User name={user.name} age={user.age}></User>
      })}

    <WebSocketComponent />

      <button onClick={Increment}> {increment} </button>
      </div>

      
  );

  
}


export default App;
