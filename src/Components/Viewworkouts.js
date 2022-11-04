import React, {useState, useEffect} from 'react'
export default function Viewworkouts() {
 const [workouts, setWorkouts] = useState([])
  useEffect(() => {
    fetch('http://localhost:8000/workouts')
    .then(res=>res.json())
    .then((data)=> {
        console.log(data)
        setWorkouts(data)
    })
  }, [])
 const deleteworkouts = (id) => { 
     let fileteredWorkouts = workouts.filter((workout)=>workout.id != id)
fetch('http://localhost:8000/workouts/' + id, {
        method: "DELETE"
    })
    .then(res=>{
        console.log(res);
        return res.json();
    })
    .then((data)=> {
        console.log(data)
        setWorkouts(fileteredWorkouts)
    })
  }

  const startTime = (id) => {
  // console.log('Add workout.. ',  time)
    //http post
    fetch('http://localhost:8000/workouts/' + id, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({startTime: new Date()})
    })
  }
  const endTime = (id, startTime, cburn) => {
    // console.log('Add workout.. ',  time)
    //http post
    let endTime =  new Date();
    let Totalcburn = getDifferenceInMinutes(new Date(startTime),endTime,cburn);
    console.log(Totalcburn);

    fetch('http://localhost:8000/workouts/' + id, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({endTime, TotalCalories: Totalcburn})
    })
    .then(res=> {
      console.log(res);
     

    })
   
      
  }

  function getDifferenceInMinutes(startTime, endTime,cburn ) {
    const diffInMs = Math.abs((endTime - startTime)* cburn);
    return diffInMs / (1000 * 60);
 
  }
  






    
  
  





 let workoutList = workouts.map((workout)=> {
    return (
        <tr key={workout.id}>
      <th scope="row">{workout.id}</th>
      <td>{workout.title}</td>
      <td>{workout.cburn}</td>
      <td>{workout.description}</td>
      <td><button onClick={()=>deleteworkouts(workout.id)} className='btn btn-danger'> delete </button></td>
      <td><button onClick={()=>startTime(workout.id)} className='btn btn-dark'> Start Time </button></td>
      <td><button onClick={()=>endTime(workout.id, workout.startTime,workout.cburn)} className='btn btn-dark'> End Time </button></td>
       <td>{workout.TotalCalories}</td>
       </tr>
    )
  })
  
    
  return (
    <table variant="dark" className="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Title</th>
      <th scope="col">calories</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
      <th scope="col">StartTime</th>
      <th scope="col">EndTime</th>
      <th scope="col">TotalCaloriesBurn</th>
    </tr>
  </thead>
  <tbody>
    {workoutList}
  </tbody>
</table>
  )
}