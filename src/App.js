import logo from './logo.svg';
import './App.css';
import { mockData } from './mockData';
import DataContext from './DataContext';
import TreeComponent from './TreeComponent/TreeComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DataContext.Provider value={mockData}>
          <TreeComponent />
        </DataContext.Provider>
      </header>
    </div>
  );
}

export default App;
