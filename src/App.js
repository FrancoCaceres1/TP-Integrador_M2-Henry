import "./App.css";
import Cards from "./components/cards/Cards";
import logoRM from "./assets/logorm.png";
import NavBar from "./components/navBar/navBar";
import {useState, useEffect} from "react";
import axios from "axios";
import About from "./views/about/about";
import ErrorPage from "./views/error/errorPage";
import {Route, Routes, Navigate, useNavigate, useLocation} from "react-router-dom";
import Detail from "./views/detail/detail";
import Form from "./views/form/form";
import {removeFavorite} from "./redux/actions";
import Favorites from "./views/favorites/favorites";
import {useDispatch} from "react-redux";

function App() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(false);
  const [access, setAccess] = useState(false);
  const EMAIL = 'francocaceres008@gmail.com';
  const PASSWORD = '123456';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    !access && navigate('/');
  }, [access, navigate]);

  function searchHandler(id) {

    axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        setError(true);
      }
    })
      .catch(() => {
        setError(true);
      })

  }

  function closeHandler(id) {
    let deleted = characters.filter(character => character.id !== Number(id));
    dispatch(removeFavorite(id));
    setCharacters(deleted);
  }

  function randomHandler() {
    let haveIt = [];
    //Generate random number
    let random = (Math.random() * 826).toFixed();

    //Coerce to number by boxing
    random = Number(random);

    if (!haveIt.includes(random)) {
      haveIt.push(random);
      fetch(`https://rickandmortyapi.com/api/character/${random}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
          } else {
            setError(true);
          }
        })
        .catch(() => {
          setError(true);
        })
    } else {
      console.log("Ya agregaste todos los personajes");
      return false;
    }
  }

  function login(userData) {
    if (userData.password === PASSWORD && userData.email === EMAIL) {
      setAccess(true);
    }
  }

  const Navigation = () => {
    const location = useLocation();
    const showNavBar = location.pathname !== '/';

    return showNavBar ? <NavBar onSearch={searchHandler} random={randomHandler} /> : null;
  };

  return (
    <div className="App">
      <img className="title" src={logoRM} alt="logo" />
      <Navigation />
      <Routes>
      <Route
          path="/"
          element={
            access ? (
              <Navigate to="/home" replace />
            ) : (
              <Form onLogin={login} />
            )
          }
        />
        <Route
          path="/home"
          element={
            access ? (
              error ? (
                <Navigate to="/error" replace />
              ) : (
                <Cards characters={characters} onClose={closeHandler} />
              )
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorites />} />
        {error && <Route path="/error" element={<ErrorPage />} />}
      </Routes>
    </div>
  );
}

export default App;
