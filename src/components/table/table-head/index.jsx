import './style.css';
import arrowUp from '../../../assets/PolygonUp.svg';
import arrowDown from '../../../assets/PolygonDown.svg';
import useGlobal from '../../../hooks/useGlobal';

export default function TableHead({ }) {
    const {
        sortingArrowsDate, setSortingArrowsDate,
        sortingArrowsWeekDay, setSortingArrowsWeekDay,
        sortingArrowsValues, setSortingArrowsValues,
        tableItems, setTableItems
    } = useGlobal();

    function sortDataByDate() {
        const sortTableItems = sortingArrowsDate.descending ?
            tableItems.sort((itemA, itemB) => new Date(itemA.date) - new Date(itemB.date))
            :
            tableItems.sort((itemA, itemB) => new Date(itemB.date) - new Date(itemA.date));
        
        setTableItems(sortTableItems);
    };

    function sortDataByWeekDay() {
        const sortTableItems = sortingArrowsWeekDay.descending ?
            tableItems.sort((itemA, itemB) => new Date(itemA.date).getDay() - new Date(itemB.date).getDay())
            :
            tableItems.sort((itemA, itemB) => new Date(itemB.date).getDay() - new Date(itemA.date).getDay());
        
        setTableItems(sortTableItems);
    };

    function sortDataByValue() {
        const sortTableItems = sortingArrowsValues.descending ?
            tableItems.sort((itemA, itemB) => itemA.value - itemB.value)
            :
            tableItems.sort((itemA, itemB) => itemB.value - itemA.value);
        
        setTableItems(sortTableItems);
    };

    return (
        <div className='table-head'>
            <h3
                className='column-title'
                style={{
                    cursor: 'pointer',
                    userSelect: 'none'
                }}
                onClick={() => {
                    setSortingArrowsDate({
                        ascending: !sortingArrowsDate.ascending,
                        descending: !sortingArrowsDate.descending
                    });
                    sortDataByDate();
                }}>
                Data
                <img
                    src={sortingArrowsDate.ascending ? arrowUp : arrowDown}
                    alt='arrow' />
            </h3>
            <h3
                className='column-title'
                style={{
                    cursor: 'pointer',
                    userSelect: 'none'
                }}
                onClick={() => {
                    setSortingArrowsWeekDay({
                        ascending: !sortingArrowsWeekDay.ascending,
                        descending: !sortingArrowsWeekDay.descending
                    });
                    sortDataByWeekDay();
                }}>
                Dia da semana
                <img
                    src={sortingArrowsWeekDay.ascending ? arrowUp : arrowDown}
                    alt='arrow' />
            </h3>
            <h3 className='column-title'>Descrição</h3>
            <h3 className='column-title'>Categoria</h3>
            <h3
                className='column-title'
                style={{
                    cursor: 'pointer',
                    userSelect: 'none'
                }}
                onClick={() => {
                    setSortingArrowsValues({
                        ascending: !sortingArrowsValues.ascending,
                        descending: !sortingArrowsValues.descending
                    });
                    sortDataByValue();
                }}
            >Valor
             <img
                src={sortingArrowsValues.ascending ? arrowUp : arrowDown}
                alt='arrow' />
            </h3>
        </div>
    );
}
