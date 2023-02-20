import React, { useState, useEffect } from "react";
import "/workspace/react-hello/src/styles/index.css"

//create your first component
const Home = () => {
const [tasks, setTasks] = useState([])
const [newTask, setNewTask] = useState("")
function addTask(e) {
if (e.code == "Enter" && newTask != "") {
setTasks([...tasks, { label: newTask, done: false }])
setNewTask("")
}
}
useEffect(async () => {
	if (tasks.length > 0) {
		var resp = await fetch("http://assets.breatheco.de/apis/fake/todos/user/hon07", {
			method: "PUT",
			body: JSON.stringify(tasks),
			headers: {
				"Content-Type": "application/json"
			}

		})
		if (resp.ok) {
			console.info("Lista actualizada")
		}
	}
}, [tasks])

useEffect(async () => {
	var respuesta = await fetch("http://assets.breatheco.de/apis/fake/todos/user/hon07")
	if (respuesta.status == 404) {
		//crear lista
		respuesta = await fetch("http://assets.breatheco.de/apis/fake/todos/user/hon07", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
		respuesta = await fetch("http://assets.breatheco.de/apis/fake/todos/user/hon07")
	} else if (!respuesta.ok) {
		//error
		console.error("Error al cargar la lista: " + respuesta.statusText)

		//Eliminar elementos
	} else if (index == "")
		respuesta = await fetch("http://assets.breatheco.de/apis/fake/todos/user/hon07", {
			method: "DELETE",
			body: []
		})
	//cargar la data del body
	var data = await respuesta.json()
	setTasks(data)
}, [])


function removeTask(index) {
	console.log(index)

	var newTasks = [...tasks]
	newTasks.splice(index, 1)
	setTasks(newTasks)

}

function checkTask (index) {
	let newTask = [...tasks]
	newTask[index] = {...newTask[index], done: !newTask[index].done}
	setTasks(newTask)
}


return (
	<div className="container">
		<h1>TO DO LIST</h1>
		<div className="container-fluid d-flex mt-5 justify-content-center">

			<ul className="list-group w-90">
				<li className="list-group-item d-flex justify-content-between align-items-center">
					<input
						className="form-control"
						type="text"
						onKeyDown={e => addTask(e)}
						onChange={e => setNewTask(e.target.value)}
						value={newTask}
						name="task" id="task" 
						placeholder="What we have to do?" />
				</li>
				{tasks.map((task, index) => (
					<li key={index}
						className="list-group-item d-flex justify-content-between  align-items-center">
						<div className="form-check">
							<input 
							onChange={() => checkTask(index)}
							className="form-check-input" 
							type="checkbox" 
							value= {tasks.done} 
							id="flexCheckDefault" />
							<label className="form-check-label">
							{task.label}
							</label>
						</div>
						<button 
						onClick={() =>removeTask(index)}
						className="badge bg-danger rounded-pill">Delete</button>
											</li>
				))}
				<li className="list-group-item text-center disabled text-muted d-flex justify-content-center align-items-center">
					<small>
						{tasks.length} {tasks.length === 1 ? "item" : "items"}.
					</small>
				</li>
			</ul>

		</div>
	</div>
);
};

export default Home;
