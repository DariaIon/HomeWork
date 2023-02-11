import "./index.css";

const SeachInfo = ({searchText, searchCount}) => {
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
