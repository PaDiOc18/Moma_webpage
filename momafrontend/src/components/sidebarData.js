import React from 'react';
import * as BootstrapIcons from "react-icons/bs";
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri'

export const SidebarData = [
    {
        title: 'Paciente',
        icon: <BootstrapIcons.BsFillPersonFill/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav:[
            {
                title: 'Agregar',
                path: '/agregarpaciente',
                icon: <BootstrapIcons.BsPersonPlusFill/>
            },
            {
                title: 'Buscar',
                path: '/buscarpaciente',
                icon: <BootstrapIcons.BsSearch/>
            },
            {
                title: 'Consultar historial',
                path: '/historialpaciente',
                icon: <BootstrapIcons.BsClipboard/>
            }
        ]
    },
    {
        title: 'Consulta',
        icon: <BootstrapIcons.BsPersonPlusFill/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav:[
            {
                title: 'ver',
                path: '/citas',
                icon: <BootstrapIcons.BsPersonPlusFill/>
            },
            {
                title: 'Buscar',
                path: '/agregarconsulta',
                icon: <BootstrapIcons.BsPersonPlusFill/>
            },
            {
                title: 'Agregar',
                path: '/agregarconsulta',
                icon: <BootstrapIcons.BsPersonPlusFill/>
            }
        ]
    }
];