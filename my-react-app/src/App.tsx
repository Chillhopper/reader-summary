import './App.css';
import FileDrop from './assets/components/FileDrop';
import fileReader from './assets/components/Reader';
;
function App() {
  return (
    <>
      <div>
        <FileDrop onDrop={fileReader}/>
      </div>
    </>
  )
}

export default App
