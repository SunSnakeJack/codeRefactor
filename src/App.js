import {Routes, Route} from "react-router-dom"
import CommissionCalculator from "./commission";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CommissionCalculator/>}/>
 
      </Routes>

    </div>
  );
}

export default App;

