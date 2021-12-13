import useGlobal from '../../hooks/useGlobal';
import './style.css';

export default function Resume() {
    const {
        tableItems,
        modalSettings, setModalSettings,
        useState, useEffect
    } = useGlobal();

    const [resumeValues, setResumeValues] = useState({
        value_in: 0,
        value_out: 0,
        value_total: 0
    });

    useEffect(() => {
        function Calculate() {
            let localIn = 0;
            let localOut = 0;
            tableItems.forEach(item => {
                if (item.type === 'credit' || item.paymentMethod === 'credit') {
                    localIn = (localIn + Number(item.value))
                };
                if (item.type === 'debit' || item.paymentMethod === 'debit') {
                    localOut = (localOut + Number(item.value))
                };
            });
            setResumeValues({
                value_in: localIn,
                value_out: localOut,
                value_total: localIn - localOut
            });
        };
        Calculate();
    }, [tableItems]);

    return (
        <div className='resume-add-register-container'>
            <div className='resume-container'>
                <h3 className='resume-container-title'>
                    Resumo
                </h3>

                <div className='resume-in'>
                    <h4>Entradas</h4>
                    <span >R$: {resumeValues.value_in / 100}</span>
                </div>

                <div className='resume-out'>
                    <h4 >Saídas</h4>
                    <span>R$: {resumeValues.value_out / 100}</span>
                </div>
                
                <div className='resume-balance'>
                    <h4>Saldo</h4>
                    <span>R$: {resumeValues.value_total / 100}</span>
                </div>
            </div>

            <div
                onClick={() => {
                    setModalSettings({
                        ...modalSettings,
                        title: 'Adicionar Registro',
                        mode: 'add'
                    });
                }}
                className='resume-add-register rubik-button'>
                <h4>Adicionar Registro</h4>
            </div>
          
        </div>
    );
}