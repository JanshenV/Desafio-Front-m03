import { useState } from 'react';
import useGlobal from '../../../hooks/useGlobal';
import './style.css'

function CustomFilterValueInput({ children, handleValue}) {
    return (
        <div className='container-filter-value-input'>
            <label htmlFor='custom-filter-value-id'>
                {children}
            </label>
            <input
                id='custom-filter-value-id'
                type='number'
                onChange={(event) => handleValue(event)}
            />
        </div>
    );
};

export default function FilterValue({ }) {
    const { valuesFilters, setValuesFilters } = useGlobal();

    function handleMinValue(event) {
        setValuesFilters({
            ...valuesFilters,
            min: event.target.value
       
        });
    };

    function handleMaxValue(event) {
        setValuesFilters({
            ...valuesFilters,
            max: event.target.value
        });
    };



    return (
        <div className='filters-value'>
            <h3 className='filters-value-title'>Valor</h3>

            <div className='container-filter-value-input'>
                <label htmlFor='min-filter-value-id'>
                    Min
                </label>
                <input
                    id='min-filter-value-id'
                    type='number'
                    value={valuesFilters.min}
                    onChange={(event) => handleMinValue(event)}
                />
                
                <div className='container-filter-value-input'>
                    <label htmlFor='max-filter-value-id'>
                        Max
                    </label>
                    <input
                        id='max-filter-value-id'
                        type='number'
                        value={valuesFilters.max}
                        onChange={(event) => handleMaxValue(event)}
                    />
                </div>
            </div>
        </div>
    );
};