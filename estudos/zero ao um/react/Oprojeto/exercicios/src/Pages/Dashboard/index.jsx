import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import Modal from '../../components/Modal';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { db } from '../../services/firebaseConnection';
import { query, orderBy, limit, collection, getDocs, startAfter } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './dashboard.css';
import { toast } from 'react-toastify'
import { format } from 'date-fns';


const Dashboard = () => {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDocs, setLastDocs] = useState();
  const [isEmpty, setIsEmpty] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

  const chooseColor = (colorName) => {
    const color = {
     Aberto: '#5cb85c',
     Atendido: '#999',
     Progresso: '#4a28e4'
    };

    return color[colorName];
  }



  

   async function updateState(snapshot, isMore){
    const isCollectionEmpty = snapshot.length < -1;

    if(!isCollectionEmpty){
      let lista =[];

      snapshot.forEach((doc) => {
       lista.push({
        id: doc.id,
        assunto: doc.data().assunto,
        cliente: doc.data().cliente,
        clienteId: doc.data().clienteId,
        created: doc.data().created,
        createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
        status: doc.data().status,
        complemeto: doc.data().complemento
       });
      });

      const lastDoc = snapshot[snapshot.length -1];

      if(isMore) {
        setChamados(chamados => [ ...chamados, ...lista]);
      } else {
        setChamados(lista);
      }     

      setLastDocs(lastDoc);

    } else {
      setIsEmpty(true);
    } 
    setLoading(false);
   };

   async function handleMore(){
    setLoadingMore(true);
    const showAfter = query(collection(db,'chamados'), orderBy("created", 'desc'), startAfter(lastDocs), limit(5));

    await getDocs(showAfter).then((snapshot) => updateState(snapshot.docs, true))
    .catch((error) => {
      toast.error('Ocorreu algum erro ao ler as chamadas!');
      console.error(error);
    }).finally(() => setLoadingMore(false));
   };

   function togglePostModal(item){
    setShowPostModal(!showPostModal);
    setDetail(item);
   }

   useEffect(() => {
    const first = query(collection(db, "chamados"), orderBy("created", 'desc'), limit(5));

    const loadChamados = async () => {
      await getDocs(first).then((snapshot) => {
       updateState(snapshot.docs, false);
      }).catch((err) => {
       toast.error('Ocorreu algum erro ao ler as chamadas!');
       console.error(err);
      });
   };
    loadChamados();
    return () => { }
  }, []);
 

  if(loading){
  return (
    <div>
      <Header/>

      <div className= "content">
        <Title name="Atendimento">
          <FiMessageSquare size={25} />
        </Title>

        <div className="container dashboard">
          <span>Buscando chamados...</span>
        </div>

      </div>
    </div>
  )
}

  return(
    <div>
    <Header/>
    
    <div className="content">
      <Title name="Atendimentos">
        <FiMessageSquare size={25} />
      </Title>

      {chamados.length === 0 ? (
      <div className="container dashboard">
        <span>Nenhum chamado registrado...</span>

        <Link to="/new" className="new">
          <FiPlus size={25} color="#FFF" />
          Novo chamados
        </Link>
    </div>
) : (
  <>
  <Link to="/new" className="new">
    <FiPlus size={25} color="#FFF" />
    Novo chamado
  </Link>
   <table>
    <thead>
      <tr>
        <th scope="col">Cliente</th>
        <th scope="col">Assunto</th>
        <th scope="col">Status</th>
        <th scope="col">Cadastro em</th>
        <th scope="col">#</th>
      </tr>
    </thead>
    <tbody>
      {chamados.map((item, index)=> {
        return (
     <tr key={index}>
      <td data-label="Cliente">{item.cliente}</td>
      <td data-label="Assunto">{item.assunto}</td>
      <tb data-label="Status">
      <span className="badge" style={{backgroundColor: chooseColor(item.status) }}>{item.status}</span>
      </tb>

      <tb data-label="Cadastrado">{item.createdFormated}</tb>
      <td data-label="#">
        <button className="action" style={{backgroundColor: '#3583f6'}} onClick={() => togglePostModal(item)}>
          <FiSearch color="#FFF" size={17}/>
        </button>
        <Link className="action" style={{backgroundColor: '#F6a935'}} to={`/new/${item.id}`}>
          <FiEdit2 color="#FFF" size={17}/>
        </Link>
      </td>
     </tr>
       ) 
      })}

    </tbody>
   </table>
   {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15 }}>Buscando dados...</h3>}
   { !loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar mais</button>}
  </> 
)}

</div>
   

 {showPostModal && (
  <Modal conteudo={detail} close={setShowPostModal} />
 )}

</div>    
  )
};

export default Dashboard;