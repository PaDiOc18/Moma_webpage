import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import './css/sidebar.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './sidebarData';
import Submenu from './submenu';

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => {
        setSidebar(!sidebar)
        if(sidebar === false){
            document.getElementsByClassName('SidebarNav')[0].style.left = '-100%';
        }
        else{
            document.getElementsByClassName('SidebarNav')[0].style.left = '0';
        }
    }

    return (
        <Fragment>
            {/* Para la barra de arriba*/}
            <div className='Nav'>
                <Link className='NavIconClose' to='#'>
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
            </div>

            {/* Para la barra de la izquierda*/}
            <div className='SidebarNav' sidebar={sidebar.toString()} style={{zIndex: 1}}>
                <div className='SidebarWrap'>
                    <Link className='NavIconOpen' to='#'>
                        <AiIcons.AiOutlineClose style={{margin: '1rem'}} onClick={showSidebar}/>
                    </Link>
                    {SidebarData.map((item,index) => {
                        return <Submenu item={item} key={index}/>;
                    })}
                </div>
            </div>
        </Fragment>
    )
}

export default Sidebar;


