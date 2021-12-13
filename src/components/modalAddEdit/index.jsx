import './style.css';
import useGlobal from '../../hooks/useGlobal';
import CloseIcon from '../../assets/biggerXig.svg';

export default function ModalAddEdit({}) {
    const {
        tableItems,
        modalSettings, setModalSettings,
        useState
    } = useGlobal();


    const Week = ['Domingo', 'Segunda', 'Terça',
        'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    
    const [formData, setFormData] = useState({
        value: '',
        category: '',
        date: '',
        weekDay: '',
        description: '',
        paymentMethod: ''
    })

    function handleCloseModal() {
        setFormData({
            value: '',
            category: '',
            date: '',
            weekDay: '',
            description: '',
            paymentMethod: ''
        });
        setModalSettings({
            ...modalSettings,
            mode: '',
            lineID: ''
        });
      
    };

    async function handleInsertion() {
        if (!formData.date ||
            !formData.category ||
            !formData.description ||
            !formData.value ||
            !formData.paymentMethod) {
            alert('todos os campos são obrigatórios.');
            return;
        };

        try {
            const fetch_request = await fetch('http://localhost:3333/transactions',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
            
            if (fetch_request.status !== 200) {
                return console.log({
                    POST: fetch_request
                });
            };
            handleCloseModal();
        } catch ({message}) {
            return console.log({
                message: message
            });
        };
    };

    async function handleEditing(id) {
        if (!formData.date &&
            !formData.category &&
            !formData.description &&
            !formData.value &&
            !formData.paymentMethod) {
            alert('Ao menos um item é necessário a ser editado.');
            return;
        };
        if (formData.value) {
            if (!formData.paymentMethod) {
                alert('Valor precisa ser saída ou entrada.');
                return;
            };
        };
        function previousValues() {
            const previousData = tableItems.find(item =>
                item.id === id
            );
            return previousData;
        };

        try {
            const previousData = await previousValues();
            const dataToBePut = {
                date: formData.date ? formData.date : previousData.date,
                weekDay: formData.date ? formData.weekDay : previousData.weekDay,
                description: formData.description ? formData.description : previousData.description,
                category: formData.category ? formData.category : previousData.category,
                value: formData.value ? formData.value : previousData.value,
                type: formData.paymentMethod
            };
            const fetch_request = await fetch(`http://localhost:3333/transactions/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToBePut)
                });
            if (fetch_request.status !== 200) {
                return console.log({
                    PUT: fetch_request
                });
            };
            handleCloseModal();
        } catch ({message}) {
            console.log({
                message: message
            })
        };
    };

    
    return (
        <div className={`modalAddEdit-screen-container`}>
            <div className='main-container-modalAddEdit'>
                <div className='modalAddEdit-header'>
                    <h2>{modalSettings.title}</h2>
                    <img
                        onClick={() => handleCloseModal()}
                        src={CloseIcon} alt='close icon' />
                </div>

                <div className='modalAddEdit-payment-methods'>
                    <div
                        onClick={() => {
                            setFormData({
                                ...formData,
                                paymentMethod: 'credit'
                            });
                        }}
                        className={`modalAddEdit-in
                     ${formData.paymentMethod === 'credit' ? '' : 'modalAdd-Edit-disabled-button'}`}
                    >Entrada
                    </div>

                    <div
                        onClick={() => {
                            setFormData({
                                ...formData,
                                paymentMethod: 'debit'
                            });
                        }}
                        className={`modalAddEdit-out
                    ${formData.paymentMethod === 'debit' ? '' : 'modalAdd-Edit-disabled-button'}`}
                    >Saída
                    </div>
                </div>

                <form className='modalAddEdit-form'
                    onSubmit={(event) => {
                        event.preventDefault();
                        modalSettings.mode === 'add' ?
                            handleInsertion() : handleEditing(modalSettings.lineID);
                    }}>

                    <label htmlFor="modalAddEdit-valor">Valor</label>
                    <input
                        id='modalAddEdit-valor'
                        type='number'
                        value={formData.value}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                value: event.target.value
                            });
                        }} />
        
                    <label htmlFor="modalAddEdit-categoria">Categoria</label>
                    <input
                        id='modalAddEdit-valor'
                        type='text'
                        value={formData.category}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                category: event.target.value
                            });
                        }} />

                    <label htmlFor="modalAddEdit-data">Data</label>
                    <input
                        id='modalAddEdit-data'
                        type='date'
                        value={formData.date}
                        onChange={(event) => {
                            const getWeekDay = new Date(event.target.value).getDay();
                            setFormData({
                                ...formData,
                                date: event.target.value,
                                weekDay: Week[getWeekDay]
                            });
                        }} />

                    <label htmlFor="modalAddEdit-descricao">Descrição</label>
                    <input
                        id='modalAddEdit-descricao'
                        type='text'
                        value={formData.description}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                description: event.target.value
                            });
                        }} />
        
                    <button type='submit'>Confirmar</button>
                </form>
            </div>
        </div>
    );
};