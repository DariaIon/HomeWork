import React, { useState, useEffect, useCallback } from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import './index.css';
import SeachInfo from '../SeachInfo';
import { FavoritePage } from '../../pages/FavoritePage/favoritePage';
import api  from '../../utility/Api';  
import useDebounce from '../../hooks/useDebounce';
import { isLiked }  from '../../utility/productliked';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext }  from "../../context/currentUserContext";
import { CatalogPage }  from '../../pages/CatalogPage';
import  ProductPage     from '../../pages/ProductPage';
import { NotFound }   from '../../pages/notFound/NotFound';
import { CardContext } from '../../context/cardContext';
import { SortContext } from '../../context/sortContext';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const debounceValue = useDebounce(searchQuery, 500);
  const [favorites, setFavorites] = useState([]);
  const [selectedTabId, setSelectedTabId] = useState("cheap");
  const navigate = useNavigate()


  const handleRequest = useCallback(() => {
    setIsLoading(true);
    api.search(searchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }, [searchQuery])


  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getProductList(), api.getUserInfo()])
       .then(([productData, userData]) => {
         setCurrentUser(userData);
         setCards(productData.products);
         const favoriteProducts = productData.products.filter(item => isLiked(item.likes, userData._id));
         setFavorites(prevState => favoriteProducts)
       })
       .catch(err => console.log(err))
       .finally(() =>{
        setIsLoading(false);
       })
   }, []); 
   
   
  useEffect(()=>{
    handleRequest()
  },[debounceValue])
  
  
  const handleFormSubmit = (inputValue) => {
    setSearchQuery(inputValue);
    navigate('/');
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


  const handleProductLike = useCallback((product)  => {
		const liked = isLiked(product.likes, currentUser._id)
		return api.changeLikeProductStatus(product._id, liked)
    .then((updateCard) => { 
			const newCards = cards.map((cardState) => {
       return cardState._id === updateCard._id ? updateCard : cardState
      })

      if (!liked) {
        setFavorites(prevState => [...prevState, updateCard])
      } else {
        setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
      }

  	setCards(newCards);
      return updateCard;
		})
	}, [currentUser, cards])


 

  return ( 
    <SortContext.Provider value={{ selectedTabId, setSelectedTabId }}>
      <CurrentUserContext.Provider value={{ user: currentUser, isLoading }}>
        <CardContext.Provider value={{ cards, favorites, handleLike: handleProductLike }}>
      <Header>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Routes>
            <Route path='/' element={
              <Search
          onSubmit={handleFormSubmit} 
          onInput={handleInputChange}
          />
       }  />
       </Routes>
       </> 
      </Header>
      <main className='content container'>
      <SeachInfo searchText={searchQuery}/>

      <Routes>
        <Route index element={
          <CatalogPage />
        } />

          <Route path="/product/:productId" element={
            <ProductPage
               isLoading={isLoading}
          />
        } />
          <Route path='/favorites' element={
            <FavoritePage />}
            />

        <Route path="*" element={<NotFound/>}/>  
      </Routes>     
       </main>
      <Footer/>
        </CardContext.Provider>
      </CurrentUserContext.Provider>
    </SortContext.Provider>
  )
}

export default App;
