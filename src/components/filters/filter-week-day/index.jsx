import './style.css';
import useGlobal from '../../../hooks/useGlobal';
import plus from '../../../assets/plus.svg';
import xis from '../../../assets/exs.svg';



export default function WeekdayFilter({ }) {
    const { weekDays, setWeekDays } = useGlobal();
    
    function handleSelectWeekday(event) {
        const localWeekDays = [...weekDays];
        const daySelected = event.target.innerText;

        localWeekDays.map(day => {
            day.day === daySelected ?
                day.selected = !day.selected : day.selected = false; 
        });
        setWeekDays(localWeekDays);
     };
     

return (
    <div className='filters-week-days'>
        <h3
            className='filters-week-days-title'>
            Dias da semana
        </h3>
        <div className='week-days'>
            {weekDays && weekDays.map(day => {
                return (
                    <div
                        key={day.day}
                        className={`Filter-Select-Class
                             ${day.selected ? 'selected' : ''}`}
                        onClick={(event) => handleSelectWeekday(event)}>
                        {day.day}
                        <img src={day.selected ? xis : plus} alt='select' />
                    </div>
                );
            })}
        </div>
    </div>
    );
};