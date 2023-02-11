import { useState, useEffect } from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import Sort from '../Sort/sort';
import './index.css';
import SeachInfo from '../SeachInfo';
import Button from '../Button/button';
import api  from '../../utility/Api';  
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utility/productliked';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceValue = useDebounce(searchQuery, 500);
  
 
  function handleProductLike(product) {
		const liked = isLiked(product.likes, currentUser._id)
		api.changeLikeProductStatus(product._id, liked)
    .then((newCard) => { 
			const newCards = cards.map((c) => {
       return c._id === newCard._id ? newCard : c
      });
			setCards(newCards);
		});
	}

  const handleRequest = async () => {
    const filterCards = await api.search(debounceValue);
    if (!debounceValue) {
     setCards(filterCards.products); 
    } else {
      setCards(filterCards);
    }
    
  }

  useEffect(()=>{
    handleRequest()
  },[debounceValue])

  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserInfo()])
       .then(([productData, userData]) => {
         setCurrentUser(userData);
         setCards(productData.products);
       });
   }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  function handleUpdateUser(userUpdate) {
		api.setUserInfo(userUpdate).then((newUserData) => {
			setCurrentUser(newUserData);
		  });
	}

  return (
    <>
      <Header user ={currentUser} onUpdateUser={handleUpdateUser}>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange}/>
        </>
      </Header>
      <main className='content container'>
      <SeachInfo searchCount={cards.length} searchText={debounceValue}/>
       <Sort/>
        <div className='content__cards'>
         <CardList goods={cards} onProductLike = {handleProductLike} currentUser = {currentUser}/>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default App;
