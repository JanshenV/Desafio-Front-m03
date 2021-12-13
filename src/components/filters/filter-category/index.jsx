import './style.css';
import useGlobal from '../../../hooks/useGlobal';
import plus from '../../../assets/plus.svg';
import xis from '../../../assets/exs.svg';



export default function FilterCategory({ }) {
    const {
        tableItems,
        useEffect, useState,
        categories, setCategories} = useGlobal();

    
    useEffect(() => {
        function SelectCategories() {
            const localCategories = [];
  
            tableItems.forEach(item => {
                const duplicatedItem = localCategories.find(duplicated =>  duplicated.name === item.category);

                if (!duplicatedItem) {
                    localCategories.push({
                        name: item.category,
                        selected: false
                    });
                };
            });

            setCategories(localCategories);
        };
        SelectCategories();
    }, [tableItems]);

    function handleSelectCategory(event) {
        const localCategories = [...categories];
        const selectedCategory = event.target.innerText;


        localCategories.map(category => {
            if (category.name === selectedCategory) {
                category.selected = !category.selected;
            };
        });
        setCategories(localCategories);  
    };


    return (
        <div className='filters-category'>
            <h3 className='filter-category-title'>
                Categoria
            </h3>
            <div className='categories'>
                {categories && categories.map(category => {
                    return (
                        <div
                            key={category.name}
                        className={`Filter-Select-Class
                             ${category.selected ? 'selected' : ''}`}
                            onClick={(event) =>handleSelectCategory(event)}>
                            {category.name}
                        <img src={category.selected ? xis : plus} alt='select' />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};