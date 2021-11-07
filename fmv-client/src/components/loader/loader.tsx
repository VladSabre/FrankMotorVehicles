import React from 'react';

export class Loader extends React.Component {
    public render(): JSX.Element {
        return (
            <span className="overlay">
                <span className="spinner-border"></span>
            </span>
        );
    }
}