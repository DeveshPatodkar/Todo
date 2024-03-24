import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FaCircleArrowUp } from "react-icons/fa6";
import { Button } from 'react-bootstrap';


const Tasks = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [showCompletedTasks, setShowCompletedTasks] = useState(false);
    // Function to handle opening and closing of modal
    const handleShowCompletedTasks = () => {
        setShowCompletedTasks(!showCompletedTasks);
    };

    useEffect(() => {
        getTasks();
    }, []);

    const handleCreateTask = async () => {
        const taskValue = task.trim();

        if (!taskValue) {

            return;
        }

        const token = localStorage.getItem("token");
        try {
            await axios.post("http://localhost:8000/create_task", {
                token,
                task: taskValue,
            });
            setTask("");
            await getTasks();
        } catch (error) {
            console.error("Create Task Error:", error);
        }
    };


    const handleDeleteTask = async (id) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete("http://localhost:8000/delete_task", {
                data: { token, id },
            });
            await getTasks();
        } catch (error) {
            console.error("Delete Task Error:", error);
        }
    };

    const handleMarkAsDone = async (id) => {
        const token = localStorage.getItem("token");
        try {
            await axios.put("http://localhost:8000/done_task", {
                token,
                id,
            });
            await getTasks();
        } catch (error) {
            console.error("Mark As Done Error:", error);
        }
    };

    const getTasks = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post("http://localhost:8000/get_task", {
                token,
            });
            console.log(response);
            setTasks(response.data);
        } catch (error) {
            console.error("Get Tasks Error:", error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <div style={{ diplay: 'flex', flexDirection: 'column' }}>

                <div style={{ marginBottom: '40px', border: '3px solid white', width: '258px', height: '126px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ justifyContent: 'center', alignItems: 'center', width: '236px', height: '104px', color: 'white', fontWeight: '400', border: ' 3px solid #FFFCFC', fontSize: '60px', display: 'flex' }}>Tasks</div>
                </div>
                <Button onClick={handleShowCompletedTasks} style={{ border: 'white 2px solid', backgroundColor: 'transparent', color: 'white', marginBottom: '5px' }}>Show Completed Tasks</Button>
            </div>
            <div style={{ border: '3px solid white', width: '80%', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'row', border: '3px solid white', width: '97%', height: '95%', position: 'relative', justifyContent: 'center' }}>
                    {!showCompletedTasks ? (
                        <ol style={{ listStyleType: 'none', padding: 0, color: 'white', width: '91%', marginRight: '10px' }}>
                            {tasks.map((task, index) => (
                                <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '35px', fontWeight: '400', marginBottom: '10px' }}>
                                    <div style={{ wordWrap: 'break-word' }}>
                                        <span style={{ fontWeight: '700' }}>{`task ${index + 1} :`}</span> {task.task}{" "}
                                    </div>
                                    <div>
                                        <FaCheck style={{ marginLeft: '10px', cursor: 'pointer', marginRight: '20px', color: task.is_complete ? 'blue' : 'white' }} onClick={() => handleMarkAsDone(task.id)} />
                                        <FaTrash style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleDeleteTask(task.id)} />
                                    </div>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <ol style={{ listStyleType: 'none', padding: 0, color: 'white', width: '91%', marginRight: '10px' }}>
                            {tasks.filter(task => task.is_complete).map((task, index) => (
                                <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '35px', fontWeight: '400', marginBottom: '10px' }}>
                                    <div style={{ wordWrap: 'break-word' }}>
                                        <span style={{ fontWeight: '700' }}>{`task ${index + 1} :`}</span> {task.task}{" "}
                                    </div>
                                    <div>
                                        <FaTrash style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleDeleteTask(task.id)} />
                                    </div>
                                </li>
                            ))}
                        </ol>
                    )}


                    <div style={{ display: 'flex', position: 'absolute', bottom: '10px', width: '100%', backgroundColor: 'transparent', padding: 10, alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="Enter new task here ..."
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            style={{ marginLeft: '20px', marginRight: '20px', width: '90%', color: 'white', backgroundColor: 'transparent', border: '3px solid white', paddingLeft: 10, height: '40px' }}
                        />


                        <FaCircleArrowUp style={{ marginRight: 20, marginLeft: 10, cursor: 'pointer', color: 'white', height: '50px', width: '50px' }} onClick={handleCreateTask} />


                    </div>
                </div>
            </div>
        </div>
    );

};

export default Tasks;
