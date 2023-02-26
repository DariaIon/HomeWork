import s from './index.module.css';
import cn from 'classnames';
import { useContext } from 'react';
import { CurrentUserContext } from '../../context/currentUserContext';
import { CardContext } from '../../context/cardContext';
import { Link } from 'react-router-dom';
import { ReactComponent as FavoriteIcon } from './favorites.svg';


function Header({children}) {
  const currentUser = useContext(CurrentUserContext);
  const { favorites } = useContext(CardContext);
  


  return (
    <header className={cn(s.header,'cover')}>
      <div className= "container">
        <div className={s.header__wrapper}>
          {children}
        
      <div className={s.datesUsers}>
        Данные пользователя:
        <span>Darya</span>
        <span>darya@mail.ru</span>
     </div>
     <div className={s.iconsMenu}>
    <Link className= {s.favoritesLink} to = {{pathname:"/favorites", state: 'sfsdfsdf'}}>
      <FavoriteIcon />
      {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
      
      </Link> 
     </div>
    </div>
   </div>
    </header>
  )
}

export default Header;
