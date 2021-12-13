import './style.css';
import Polygon1 from '../../assets/Polygon1.svg';
import Polygon2 from '../../assets/Polygon2.svg';

export default function Header() {
    return (
        <div className='header-container'>
            <div className='header-logos-container'>
                <img
                    className='polygon1'
                    src={Polygon1} alt='Logo' />
                <img
                    className='polygon2'
                    src={Polygon2} alt='Logo' />
            </div>
            <h1>Dindin</h1>
        </div>
    );
};