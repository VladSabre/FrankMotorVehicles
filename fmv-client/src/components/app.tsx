import React from 'react';
import { Loader } from './loader/loader';
import { TopMenu } from '../components/topMenu/topMenu';
import { VehicleList } from './vehicleList/vehicleList';
import { AddedVehicle } from '../models/addedVehicle';
import './app.scss';

export namespace AppComponent {
    export interface State {
        isLoaderVisible: boolean;
        cart: AddedVehicle[];
    }
}

class App extends React.Component<{}, AppComponent.State> {
    constructor() {
        super({});

        this.state = { isLoaderVisible: false, cart: [] };

        this.setLoaderVisibility = this.setLoaderVisibility.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    private setLoaderVisibility(visibility: boolean): void {
        this.setState({ isLoaderVisible: visibility });
    }

    private addToCart(vehicle: AddedVehicle): void {
        this.setState((state) => ({
            cart: !state.cart.some(x => x.Id === vehicle.Id) ? state.cart.concat(vehicle) : state.cart
        }));
    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <TopMenu cart={this.state.cart} />
                <VehicleList setLoaderVisibility={this.setLoaderVisibility} addToCart={this.addToCart} />
                {this.state.isLoaderVisible && <Loader />}
            </React.Fragment>
        );
    }
}

export default App;
