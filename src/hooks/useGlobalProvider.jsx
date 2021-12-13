import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function useGlobalProvider() {
    const [weekDays, setWeekDays] = useState([
        { id: 0, day: 'Domingo', selected: false },
        { id: 1, day: 'Segunda', selected: false },
        { id: 2, day: 'Terça', selected: false },
        { id: 3, day: 'Quarta', selected: false },
        { id: 4, day: 'Quinta', selected: false },
        { id: 5, day: 'Sexta', selected: false },
        { id: 6, day: 'Sábado', selected: false }
    ]);

    const [categories, setCategories] = useState([]);

    const [modalSettings, setModalSettings] = useState({
        title: '',
        mode: '',
        lineID: ''
    });

    const [valuesFilters, setValuesFilters] = useState({
        min: '',
        max: ''
    });


    const [tableItems, setTableItems] = useState([]);
    const [hiddenFilter, setHiddenFilter] = useState(false);

    const [sortingArrowsDate, setSortingArrowsDate] = useState({
        ascending: true,
        descending: false
    });

    const [sortingArrowsWeekDay, setSortingArrowsWeekDay] = useState({
        ascending: true,
        descending: false
    });

    const [sortingArrowsValues, setSortingArrowsValues] = useState({
        ascending: true,
        descending: false
    });



    return {
        weekDays, setWeekDays,
        tableItems, setTableItems,
        useState, useEffect, format,
        modalSettings, setModalSettings,
        hiddenFilter, setHiddenFilter,
        sortingArrowsDate, setSortingArrowsDate,
        sortingArrowsWeekDay, setSortingArrowsWeekDay,
        sortingArrowsValues, setSortingArrowsValues,
        categories, setCategories,
        valuesFilters, setValuesFilters
    };
};