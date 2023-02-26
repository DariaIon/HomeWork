import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import "./index.css";

const SeachInfo = ({searchText}) => {
	const {cards} = useContext(CardContext);
	const searchCount = cards.length;

	return (
		searchText && <section className="search-title">
			По запросу <span>{searchText}</span> найдено {searchCount} 
			{(searchCount % 10) === 1 && ' товар'}
			{(searchCount % 10) > 1 && searchCount < 5 && ' товара'}
			{(searchCount % 10) >= 5 && ' товаров'}
			{!searchCount && ' товаров'}
		</section>
	);
};

export default SeachInfo;
