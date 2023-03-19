import s from './index.module.css';
import cn from 'classnames';
import { useContext } from 'react';
import { CurrentUserContext } from '../../context/currentUserContext';
import { CardContext } from '../../context/cardContext';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as FavoriteIcon } from './favorites.svg';


function Header({children}) {
  const { favorites } = useContext(CardContext);
  const location = useLocation();
  


  return (
    <header className={cn(s.header,'cover')}>
      <div className= "container">
        <div className={s.header__wrapper}>
          {children}
     <div className={s.iconsMenu}>
    <Link className= {s.favoritesLink} to = {{pathname:"/favorites", state: 'sfsdfsdf'}}>
      <FavoriteIcon />
      {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
      </Link> 
    <div className={s.authorization}>
     <Link to='/login' state={{backgroundLocation: location, initialPath: location.pathname}}>Войти</Link>  
    </div>
     
     </div>
    </div>
   </div>
    </header>
  )
}

export default Header;
