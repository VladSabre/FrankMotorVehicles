import React from 'react';
import './topMenu.css';

export class TopMenu extends React.Component {
    public render(): JSX.Element {
        const blockClass = "top-menu";
        return (
            <div className={blockClass}>
                <div className={`${blockClass}_brand`}>Frank Motor Vehicles</div>
            </div>
        );
    }
}