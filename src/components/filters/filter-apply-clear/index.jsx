import './style.css';
import useGlobal from '../../../hooks/useGlobal';

export default function FilterApplyClear({ }) {
    const { weekDays, setWeekDays,
        categories, setCategories,
        valuesFilters, setValuesFilters,
        setTableItems, tableItems} = useGlobal();
    
    function clearFilters() {
        const localWeekDays = weekDays;
        const localCategories = categories;

        localWeekDays.map(day => {
            day.selected = false;
        });


        localCategories.map(category => {
            category.selected = false;
        });

        setWeekDays([...localWeekDays]);
        setCategories([...localCategories]);
        setValuesFilters({
            min: '',
            max: ''
        });
    };

    async function apllyFilters() {
        const localTableItems = [...tableItems];
        const selectedDay = weekDays.find(day => day.selected === true);
        const selectedCategory = categories.filter(category => category.selected === true);
        const selectedMinValue = valuesFilters.min !== '' ? valuesFilters.min * 100 : '';
        const selectedMaxValue = valuesFilters.max !== '' ? valuesFilters.max * 100 : '';

        function redudantMinMaxValues(arrayFrom) {
            if (selectedMinValue && selectedMaxValue) {
                const filteredByValues = arrayFrom.filter(item => item.value >= selectedMinValue && item.value <= selectedMaxValue);
                clearFilters();
                return setTableItems([...filteredByValues]);
            };
            if (selectedMinValue) {
                const filteredByValues = arrayFrom.filter(item => item.value >= selectedMinValue);
                clearFilters();
                return setTableItems([...filteredByValues]);
            }
            if (selectedMaxValue) {
                const filteredByValues = arrayFrom.filter(item => item.value <= selectedMaxValue);
                clearFilters();
                return setTableItems([...filteredByValues]);
            };
        }

        function redudantCategoryLength(arrayFrom) {
            const filteredByCategory = arrayFrom.filter(item => {
                for (let i = 0; i < selectedCategory.length; i++) {
                    if (item.category === selectedCategory[i].name) return item;
                };
            });
            return filteredByCategory;
        };

        if (selectedDay) {
            const filteredByWeekDay = localTableItems.filter(item => item.weekDay === selectedDay.day);

            if (selectedCategory.length > 0 && filteredByWeekDay.length > 0) {
                const filteredByCategory = await redudantCategoryLength(filteredByWeekDay);

                if ((selectedMinValue || selectedMaxValue) && filteredByCategory.length > 0) {
                    return redudantMinMaxValues(filteredByCategory); 
                };

                clearFilters();
                return setTableItems([...filteredByCategory]);
            };
            
            if (selectedMinValue || selectedMaxValue) {
                redudantMinMaxValues(filteredByWeekDay); 
            };
         
            clearFilters();
            return setTableItems([...localTableItems]);
        };

        if (selectedCategory.length > 0 ) {
            const filteredByCategory = await redudantCategoryLength(tableItems);

            if (selectedMinValue || selectedMaxValue) {
                return redudantMinMaxValues(filteredByCategory); 
            };
            clearFilters();
            return setTableItems([...filteredByCategory]);
        };

        if (selectedMinValue || selectedMaxValue) {
            return redudantMinMaxValues(tableItems); 
        };

        return setTableItems([...localTableItems]);
    };
    
    return (
        <div className='filters-buttons-clear-apply'>
            <div
                className='white_button_class'
                onClick={() => clearFilters()}>
                Limpar Filtros
            </div>

            <div
                className='blue_button_class'
                onClick={() => apllyFilters()}>
                
                Aplicar Filtros
            </div>
        </div>
    );
};