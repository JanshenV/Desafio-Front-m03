import './style.css';
import TableHead from '../table-head/index';
import TableLines from '../table-lines/index';
import useGlobal from '../../../hooks/useGlobal';

export default function Table({ }) {
    const { tableItems } = useGlobal();
    return (
        <div className='table'>
            <TableHead />
            <div className='table-body'>
                {tableItems.map(item => {
                    return (
                        <TableLines
                            key={item.id}
                            date={item.date}
                            weekDay={item.weekDay}
                            category={item.category}
                            description={item.description}
                            value={item.value}
                            paymentMethod={item.type ? item.type : item.paymentMethod}
                            itemID={item.id}
                        />
                    );
                })}
            </div>
        </div>
    );
}