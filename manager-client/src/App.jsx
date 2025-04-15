import { useState, useEffect } from "react"
import axios from 'axios'
import Header from './Header.jsx'
import People from './People.jsx'
import Profile from './Popups/Profile.jsx'
import Operations from './Operations.jsx'
import Tasks from './Tasks.jsx'
import TaskNotes from './Popups/TaskNotes.jsx'
import TaskForm from './Popups/TaskForm.jsx'
import PeopleForm from './Popups/PeopleForm.jsx'
import OperationsForm from './Popups/OperationsForm.jsx'
import OperationDetails from "./Popups/OperationDetails.jsx"


function App() {

  const [people, setPeople] = useState([])
  const [tasks, setTasks] = useState([])
  const [personClicked, setPersonClicked] = useState("")
  const [operations, setOperations] = useState([])
  const [capabilities, setCapabilities] = useState([])
  const [peopleForm, setPeopleForm] = useState(false)
  const [operationsForm, setOperationsForm] = useState(false)
  const [taskForm, setTaskForm] = useState(false)
  const [taskClicked, setTaskClicked] = useState();
  const [operationClicked, setOperationClicked] = useState("");
  const taskStatuses = ["To do", "Planned", "On hold", "Complete"];


  useEffect(() => {
    const fetchPeople = async () => {
      const response = await axios.get("http://127.0.0.1:8080/api/people");
      setPeople(response.data.people);
    };

    const fetchOperations = async () => {
      const response = await axios.get("http://127.0.0.1:8080/api/operations");
      setOperations(response.data.operations);
    };

    fetchPeople();
    fetchOperations();
  }, [personClicked, operationClicked]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get("http://127.0.0.1:8080/api/tasks");
      setTasks(response.data.tasks);
    };

    fetchTasks();
  }, [taskForm, taskClicked]);


  return (
    <>
      <Header />
      <Tasks tasks={tasks} setTaskClicked={setTaskClicked} setTaskForm={setTaskForm} taskStatuses={taskStatuses} people={people} />
      <div className="parent-div">
        <Operations operations={operations} setOperations={setOperations} people={people} setOperationsForm={setOperationsForm} setOperationClicked={setOperationClicked} />
        <People people={people} setPersonClicked={setPersonClicked} setPeopleForm={setPeopleForm} />
      </div>
      <TaskNotes taskClicked={taskClicked} setTaskClicked={setTaskClicked} people={people} taskStatuses={taskStatuses} tasks={tasks} setTasks={setTasks} />
      <Profile personClicked={personClicked} setPersonClicked={setPersonClicked} operations={operations} capabilities={capabilities} setCapabilities={setCapabilities} />
      <PeopleForm peopleForm={peopleForm} people={people} setPeople={setPeople} setPeopleForm={setPeopleForm} />
      <OperationsForm operationsForm={operationsForm} operations={operations} setOperations={setOperations} setOperationsForm={setOperationsForm} />
      <TaskForm taskForm={taskForm} setTaskForm={setTaskForm} people={people} taskStatuses={taskStatuses} />
      <OperationDetails operationClicked={operationClicked} setOperationClicked={setOperationClicked} operations={operations}/>
    </>
  );
}

export default App
