
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Form from './Module/Pages/Form';
import Projects from './Module/Pages/Projects';




function App() {


  return (


    <BrowserRouter>




      <Routes>

   
        <Route path="/" element={<Form />} />
        <Route path="/projects" element={<Projects />} />


      </Routes>




    </BrowserRouter>



  );
}

export default App;