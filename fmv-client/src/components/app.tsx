import React from 'react';
import { Loader } from './loader/loader';
import { TopMenu } from '../components/topMenu/topMenu';
import { VehicleList } from './vehicleList/vehicleList';
import './app.scss';

export namespace AppComponent {
    export interface State {
        isLoaderVisible: boolean;
    }
}

class App extends React.Component<{}, AppComponent.State> {
    constructor() {
        super({});

        this.state = { isLoaderVisible: false };

        this.setLoaderVisibility = this.setLoaderVisibility.bind(this);
    }

    private setLoaderVisibility(visibility: boolean): void {
        this.setState({ isLoaderVisible: visibility });
    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <TopMenu />
                <VehicleList setLoaderVisibility={this.setLoaderVisibility} />
                {this.state.isLoaderVisible && <Loader />}
            </React.Fragment>
        );
    }
}

export default App;
