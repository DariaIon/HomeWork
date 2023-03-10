import './index.css';
import {ReactComponent as SearchIcon} from './ic-search.svg';
import {ReactComponent as CloseIcon} from './ic-close-input.svg';
import { useState } from 'react';


function Search({onSubmit: propsOnSubmit, onInput}) {
const [inputText, setInputText] = useState('')

  const handleInput = (e) => {
    setInputText(e.target.value)
    onInput && onInput(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    propsOnSubmit(inputText)
  }
    
    const handleClearInput = (e) => {
    e.stopPropagation()
    setInputText("");
    onInput && onInput("")
  }
    
  return (
   <form className="search" onSubmit={handleFormSubmit}>
        <input type="text" value={inputText} className='search__input' placeholder='Поиск' onInput={handleInput}/>
        <button className='search__btn'>
           {inputText && <CloseIcon onClick={handleClearInput} className='search__icon-clear' />}
            {false && <SearchIcon onClick={handleFormSubmit} className='search__icon'/>}
        </button>
   </form>
  )
}

export default Search;
