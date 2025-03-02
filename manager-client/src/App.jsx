import { useState, useEffect } from "react"
import axios from 'axios'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import People from './People.jsx'
import Profile from './Profile.jsx'
import Operations from './Operations.jsx'
import Tasks from './Tasks.jsx'

function App() {

  const [people, setPeople] = useState([])
  const [tasks, setTasks] = useState([])
  const [personClicked, setPersonClicked] = useState("")
  const [operations, setOperations] = useState([])
  const [capabilities, setCapabilities] = useState([])

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await axios.get("http://127.0.0.1:8080/api/people");
      setPeople(response.data.people);
    };

    const fetchTasks = async () => {
      const response = await axios.get("http://127.0.0.1:8080/api/tasks");
      setTasks(response.data.tasks);
    };
    const fetchOperations = async () => {
      const response = await axios.get("http://127.0.0.1:8080/api/operations");
      setOperations(response.data.operations);
    };

    fetchPeople();
    fetchTasks();
    fetchOperations();
  }, []);



  return (
    <>
      <Header />
      <div className="people-profile-parent">
        <People people={people} setPeople={setPeople} setPersonClicked={setPersonClicked}/>
        <Profile personClicked={personClicked} setPersonClicked={setPersonClicked} operations={operations} capabilities={capabilities} setCapabilities={setCapabilities}/>
      </div>
      <div>
        <Operations operations={operations} setOperations={setOperations} people={people}/>
        <Tasks tasks={tasks} />
      </div>
      <Footer />
    </>
  );
}

export default App
