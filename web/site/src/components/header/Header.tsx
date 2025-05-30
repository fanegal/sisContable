import { Icon } from '../icon/Icon'
import './header.scss'
export function Header({ isMobile = false, onClickOpenMenu = () => {

} }) {
    return <header className='as-header'>

        {
            isMobile && <div className='menu-bar' onClick={onClickOpenMenu}>
                <Icon name='menu' />
            </div>
        }

        <input placeholder="Buscar..." className="search-input" />

        <div className="header-icons">
           

            <div className='capsule-square' onClick={() => {

            }}>
                <Icon name='notifications' />
            </div>

            <div className='capsule-square' onClick={() => {

            }}>
                <Icon name='person' />
            </div>
            <div className='capsule-square' onClick={() => {

            }}>
                <Icon name='settings' />
            </div>

        </div>
    </header>
}