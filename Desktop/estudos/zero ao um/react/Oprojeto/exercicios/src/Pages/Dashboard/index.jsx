import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth'; 
import Header from '../../components/Header';


const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  return (
    <>
    <Header />
    <h1>DashBoard</h1>
    <button onClick={logout}>Deslogar</button>
    </>
  )
}

export default Dashboard