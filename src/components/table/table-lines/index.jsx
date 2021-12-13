import './style.css';
import deleteIcon from '../../../assets/Lixeira.svg';
import editIcon from '../../../assets/Lápis.svg';
import useGlobal from '../../../hooks/useGlobal';
import ModalDelete from '../../modalDelete/index';


export default function TableLines({
    date, weekDay, category,
    description, value, paymentMethod, itemID
}) {

    const {
        modalSettings, setModalSettings,
        format
    } = useGlobal();

    return (
        <div className='table-line'>
            <span className='line-items'>{format(new Date(date), 'dd-MM-yyyy')}</span>
            <span className='line-items'>{weekDay}</span>
            <span className='line-items'>{description}</span>
            <span className='line-items'>{category}</span>
            <span
                className={`line-items
             ${paymentMethod === 'credit' ?
                'type-credit' : 'type-debit'}`}>R$: {value / 100}
            </span>
            <div className='table-line-button'>
                <img
                    onClick={() => {
                        setModalSettings({
                            title: 'Editar Registro',
                            mode: 'edit',
                            lineID: itemID
                        });
                    }}
                    className='table-lines-edit-icon'
                    src={editIcon}
                    alt='Edit icon' />
                <img
                    onClick={() => {
                        setModalSettings({
                            ...modalSettings,
                            mode: modalSettings.mode === 'delete' ? '' : 'delete',
                            lineID: itemID
                        });
                    }}
                    className='table-lines-delete-icon'
                    src={deleteIcon}
                    alt='Delete icon'
                />
            </div>
            {(modalSettings.lineID  === itemID && modalSettings.mode === 'delete' )  && <ModalDelete />}
        </div>
    );
};