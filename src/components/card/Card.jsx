import style from "./card.module.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/actions";
import { useState, useEffect } from "react";

function Card(props) {
  const { character, onClose, addFavorite, removeFavorite, favorites } = props;
  const navigate = useNavigate();
  const {image, name, species, gender, id} = character;
  const [closeBtn, setCloseBtn] = useState(true);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (!onClose) {
      setCloseBtn(false);
    }
  }, []);

  useEffect(() => {
    favorites.forEach((fav) => {
      if (fav.id === id) {
        setFav(true);
      }
    });
  }, [favorites]);

  function navigateHandler() {
    navigate(`/detail/${character.id}`);
  }

  function handleFavorite(data) {
    if (!fav) {
      addFavorite(data)
      setFav(true)
    } else {
      removeFavorite(data)
      setFav(false)
    }
  }

  return (
    <div className={style.cardContainer}>
      <div className={style.imageContainer}>
        <img
          className={style.characterContainer}
          onClick={navigateHandler}
          src={image}
          alt={name}
        />
        <h2 className={style.name}>{name}</h2>
        {
          fav ? (
            <button onClick={() => handleFavorite(id)}>❤️</button>
          ) : (
            <button onClick={() => handleFavorite(character)}>🤍</button>
          )
        }
        {closeBtn && (
          <button
            className={style.closeButton}
            onClick={() => {
              onClose(id);
            }}
          >
            X
          </button>
        )}
      </div>

      <div className={style.atributes}>
        <h2>{species}</h2>
        <h2>{gender}</h2>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (character) => dispatch(addFavorite(character)),
    removeFavorite: (id) => dispatch(removeFavorite(id)),
  }
}

const mapSateToProps = (state) => {
  return {
    favorites: state.myFavorites
  }
}

export default connect(mapSateToProps, mapDispatchToProps)(Card)