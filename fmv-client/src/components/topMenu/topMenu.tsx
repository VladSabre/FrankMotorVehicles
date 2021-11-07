import React from 'react';
import './topMenu.css';

export class TopMenu extends React.Component {
    public render(): JSX.Element {
        return (
            <div className="navbar navbar-expand-sm bg-dark navbar-dark container-fluid">
                <div className="navbar-brand">Frank Motor Vehicles</div>
            </div>
        );
    }
}