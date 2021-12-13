import './style.css';
import useGlobal from '../../hooks/useGlobal';

export default function ModalDelete({ }) {
    const {
        modalSettings, setModalSettings,
    } = useGlobal();


    function handleCloseModal() {
        setModalSettings({
            ...modalSettings,
            lineID: '',
            mode: ''
        });
    };

    async function handleDelete(id) {
        try {
            const fetch_request = await fetch(`http://localhost:3333/transactions/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                }
                });
            if (fetch_request.status !== 200) {
                return console.log({
                    DELETE: fetch_request
                });
            };
        } catch ({message}) {
            return console.log({
                MESSAGE: message
            });
        };
    };

    

    return (
        <div className={`modal-delete-container`}>
            <div className='modal-delete-title'>
                <span>Apagar item?</span>
            </div>
            <div className='modal-delete-confirm'>
                <div
                    onClick={() => {
                        handleDelete(modalSettings.lineID);
                        handleCloseModal();
                    }}
                    className='confirm-delete'>
                    Sim
                </div>
                <div
                    onClick={() => handleCloseModal()}
                    className='deny-delete'>
                    Não
                </div>
            </div>
        </div>
    );
};