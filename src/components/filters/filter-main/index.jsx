import './style.css';
import WeekdayFilter from '../filter-week-day';
import FilterCategory from '../filter-category';
import FilterValue from '../filter-value';
import FilterApplyClear from '../filter-apply-clear';
import useGlobal from '../../../hooks/useGlobal';

export default function Filters() {
    return (
        <div className={`main-container-filters`}>
            <WeekdayFilter />
            <FilterCategory />
            <FilterValue />
            <FilterApplyClear />
        </div>
    );
}