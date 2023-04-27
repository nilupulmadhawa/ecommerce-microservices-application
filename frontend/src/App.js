import './App.css';
import { Router } from './routes/router';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (<>
    <ToastContainer autoClose={3000} />
    <Router></Router>
  </>

  );
}

export default App;
