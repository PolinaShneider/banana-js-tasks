import './App.css';
import data from "./tasks";
import {useEffect, useState} from "react";
import {Card} from "./components/Card/Card";
import {CardsHolder} from "./components/CardsHolder/CardsHolder";

function App() {
    const [completedTasks, setCompletedTasks] = useState(() => JSON.parse(localStorage.getItem("completed")) || []);
    const [userTasks, setUserTasks] = useState(data.tasks || []);
    const [randomTaskId, setRandomTaskId] = useState(-1);

    useEffect(() => {
        setUserTasks(userTasks.filter((task) => !completedTasks.includes(task.id)));
    }, [completedTasks]);

    useEffect(() => {
        if (userTasks.length > 0) {
            setRandomTaskId(generateRandomTask())
        }
    }, [userTasks]);

    const generateRandomTask = () => {
        const idx = Math.floor(Math.random() * userTasks.length);
        return userTasks[idx].id;
    };

    useEffect(() => {
        localStorage.setItem("completed", JSON.stringify(completedTasks));
    }, [completedTasks])

    const completeTask = (taskId) => {
        setCompletedTasks([...completedTasks, taskId]);
    };

    return (
        <div className="App">
            <h1>Приветствую, JavaScript-джедай!</h1>
            <p>Ты проделал долгий путь, настало время победить финального босса</p>
            {!userTasks.length && <span className="congrats">Поздравляю! Ты выполнил все задания</span>}
            <CardsHolder>
                {
                    userTasks.map((task) => <Card
                        key={task.id}
                        isCurrent={task.id === randomTaskId}
                        markCompleted={completeTask}
                        {...task}
                    />)
                }
            </CardsHolder>
        </div>
    );
}

export default App;
