import {useState} from 'react'
import './index.css';
import close from './assets/delete.svg'

function App(){
  const [tarefas, setTarefas] = useState([])

  const [remain, setRemain] = useState(0)
  const [allTasks, setAllTasks] = useState([])
  const [remainTasks, setRemainTasks] = useState([])
  const [completedTask, setCompletedTasks] = useState([])
  const [color, setColor] = useState('all')
  
  

  function Tarefa ({children, handleDelete, handleComplete, id, completa, escondido}){
    return (
      <div className={`tarefa`}>
      <li className='task'>
       <span onClick={() => handleComplete(id)}
       style={{textDecoration: completa===true?'line-through':'none'}}
       >{children}
       </span>
       <button className='close' onClick={() => handleDelete(id)} ><img src={close}></img></button>
      </li>
  
       </div>
    )
  }
  function handleKeyDown(event){
    

    if(event.key !== 'Enter' || event.target.value.trim() ==='') return
  
    const novasTarefas = [...tarefas, {id: Math.random(), texto:event.target.value, completa: false, task:true}]
    
    setTasks(novasTarefas)
    setRemain(remain + 1)

    event.target.value = ''
  }
  
function setTasks(task){
  setTarefas(task)
  setAllTasks(task)
  setCompletedTasks(task)
  setRemainTasks(task)
}
  function handleComplete(id){
    const novasTarefas = [...tarefas]
    const tarefaCompletada = novasTarefas.find(tarefa => tarefa.id === id)

    tarefaCompletada.completa = !tarefaCompletada.completa
    
    setTasks(novasTarefas)

    const remainsActivies = tarefaCompletada.completa===true?remain - 1: remain + 1
    setRemain(remainsActivies)
    
  }

  function handleDelete(id){
   
    const novasTarefas = tarefas.filter((tarefa) =>{
      return (tarefa.id !== id)
    })

    const tarefaCompleta = tarefas.find((tarefa)=>{
      return tarefa.id === id
    })

    setRemain(tarefaCompleta.completa===true?remain:remain-1)
    setTarefas(novasTarefas)
  } 

  function handleAll(){
    setColor('all')
    const novasTarefas = allTasks.filter((tarefa)=>{
      return tarefa
    })
    setTarefas(novasTarefas)
  }

 
    function handleAtivas(){
     setColor('actives')
     const novasTarefas = remainTasks.filter((tarefa)=>{
       return tarefa.completa===false
     })
    
     setTarefas(novasTarefas)
     
     
    }

    function filterComplete(){
      setColor('completed')
      const novasTarefas = completedTask.filter((tarefa)=>{
        return tarefa.completa===true
      })
      setTarefas(novasTarefas)
    }

    function cleanComplete(){
      setColor('cleaned')
      const novasTarefas = completedTask.filter((tarefa)=>{
        return tarefa.completa===false
      })
      setTasks(novasTarefas)
    }

    function stringRemain(){
      if(remain ===0){
        return ''
      } else if(remain ===1){
        return '1 item restante'
      } else {
        return `${remain} itens restantes`
      }
    }

  return (
    <div className='info'>
      <div className='header'>
        <div className='header__info'>
          <h1>TAREFAS</h1>
          <input onKeyDown={handleKeyDown} placeholder='Criar uma nova tarefa'/>
        </div>
      </div>
      <div className='main'>
        <ul>
        {tarefas.map((tarefa) =>{
          return (
            <Tarefa key={tarefa.id}
            id={tarefa.id}
            handleDelete={handleDelete}
            handleComplete={handleComplete}
            completa={tarefa.completa}
            >
              {tarefa.texto}
            </Tarefa>
          )
        })}
        </ul>
      </div>
      <div className='filtros'>
        <span>{remain===0?'Adicione tarefas':''}{stringRemain()} </span>

        <span><button className={`btn ${color==='all'?'blue':''}`} onClick={handleAll}>Todas</button></span>
        <span><button className={`btn ${color==='actives'?'blue':''}`} onClick={handleAtivas}>Ativas</button></span>
        <span><button className={`btn ${color ==='completed'?'blue':''}`} onClick={filterComplete}>Completadas</button></span>
        <span><button className={`btn ${color ==='cleaned'?'blue':''}`} onClick={cleanComplete}>Limpar Completadas</button></span>
        </div>
    </div>
  )

}
export default App;



