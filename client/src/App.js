import './App.css';

// import styled from 'styled-components'
import Routes from './Routes'
import OrderRoutes from './orders/Routes'
import Aheader from './components/header'

function App() {
  return (
    <div className='App'>
      <Aheader />  

      <Routes/>
      <OrderRoutes/>

  </div>

  );
}

export default App;
