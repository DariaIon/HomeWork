import s from './index.module.css';
import cn from 'classnames';
import { useState } from 'react';

function Header({user, children}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  return (
    <header className={cn(s.header,'cover')}>
      <div className= "container">
        <div className={s.wrapper}>
          {children}
        </div>
      </div>
      <div className={s.datesUsers}>
        Данные пользователя:
     <input type ="text" 
             value={user.name} 
             onChange = {(e) => {
             setName(e.target.value)
             }}/> 
     <input type ="text" 
             value={user.email} 
             onChange = {(e) => {
             setEmail(e.target.value)
             }}/>        
     </div>
     
    </header>
  )
}

export default Header;
