import './App.css';
import Overview from './components/Overview/Overview';
import Header from './components/Header/Header';
import SideDraver from './components/Draver/SideDraver';
import { StateProvider } from './context/index';

const App = () => {
  return (
    <div className="App">
      <StateProvider>
        <SideDraver />
        <Header />
        <Overview />
      </StateProvider>
    </div>
  );
}

export default App;
