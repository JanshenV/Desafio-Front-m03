import './style.css';
import Filters from '../filters/filter-main/index';
import FilterIcon from '../../assets/Filter.svg';
import Table from '../table/table-main/index';
import Resume from '../resume/index';
import useGlobal from '../../hooks/useGlobal';
import ModalAddEdit from '../modalAddEdit/index';

export default function Body({ }) {
    const {
        setTableItems,
        modalSettings,
        hiddenFilter, setHiddenFilter,
        useEffect,
    } = useGlobal();

    useEffect(() => {
        async function fetchData() {
            try {
                const fetch_request = await fetch('http://localhost:3333/transactions',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                
                if (fetch_request.status !== 200) {
                    return console.log({
                        GET: fetch_request
                    });
                };

                const fetch_response = await fetch_request.json();
                setTableItems(fetch_response);
            } catch ({ message }) {
                return console.log({
                    MESSAGE: message
                })
            };
        };
        fetchData();
    }, [modalSettings.mode]);



    return (
        
        <div className='body-container'>
            <div className='filters-table-container'>
                <div
                    className='button-show-filters'
                    onClick={() => {
                        setHiddenFilter(!hiddenFilter);
                    }}>
                    <img src={FilterIcon} alt="Button filter" />
                    Filtrar
                </div>
                {hiddenFilter && <Filters />}
                <Table />
            </div>
            <Resume />
            {(modalSettings.mode === 'edit' || modalSettings.mode === 'add') && <ModalAddEdit />}
        </div>
    );
}