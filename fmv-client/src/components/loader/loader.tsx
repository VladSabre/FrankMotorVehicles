import React from 'react';
import './loader.css'

export class Loader extends React.Component {
    public render(): JSX.Element {
        return (
            <span className="overlay">
                <span className="spinner"></span>
            </span>
        );
    }
}