import {useState, useEffect} from 'react'
import Model from '../components/Model';
const localCache= {};
const Users = () => {
    const [opt, setOption] = useState("");
    const [passwd, setPasswd] = useState("")
    const [users, setUsers] = useState([]); 
    const filter = users.filter((e)=>e.name === opt);
    const fetchUsers = async()=>{
        const fetchData = await fetch('http://localhost:4000/users');
        const json = await fetchData.json();
        localCache['users'] = json || [];
        setUsers(localCache['users']);
    }
    useEffect(()=>{
        localCache['users'] ? setUsers(localCache['users']) : fetchUsers();
    }, []);    
    
  return (
    <div className='users'>
        <div className='select'>
            <label htmlFor="users">select user</label>
            <select name="users" id="users" onChange={(e)=>setOption(e.target.value)}>
                <option value="">select user</option>
                {users.map((e)=>(
                    <option value={e.name} key={e.id}>{e.name}</option>
                ))}
            </select>
        </div>
        {opt.length > 0 && <Model user = {filter} passwd = {setPasswd} />}
    </div>
  )
}

export default Users