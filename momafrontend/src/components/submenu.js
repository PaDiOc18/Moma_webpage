import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import './css/submenu.css';

const Submenu = ({item}) =>{
    const [subnav, setSubNav] = useState(false)

    const showSubnav = () => setSubNav(!subnav)

    return (
        <Fragment>
            <Link className='SidebarLink' to={item.path} onClick={item.subNav && showSubnav}>
                <div>
                    {item.icon}
                    <span className='SidebarLabel'>{item.title}</span>
                </div>
                <div>
                    {item.subNav && subnav 
                    ? item.iconOpened
                    : item.subNav 
                    ? item.iconClosed
                    : null}
                </div>
            </Link>
            {subnav && item.subNav.map((item,index) => {
                return(
                    <Link className='DropdownLink' to={item.path} key={index}>
                        {item.icon}
                        <span className='SidebarLabel'>{item.title}</span>
                    </Link>
                );
            })}
        </Fragment>
    )
}

export default Submenu;
