import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Badge, Button, Container, Navbar, OverlayTrigger, Popover } from 'react-bootstrap';
import { AddedVehicle } from '../../models/addedVehicle';
import './topMenu.scss';

export namespace TopMenuComponent {
    export interface Props {
        cart: AddedVehicle[];
    }
}

export class TopMenu extends React.Component<TopMenuComponent.Props> {
    constructor(props: TopMenuComponent.Props) {
        super(props);
    }

    private renderCartContent(): JSX.Element {
        const total = this.props.cart.reduce((partial_sum, a) => partial_sum + a.Price, 0).toFixed(2);

        if (this.props.cart.length > 0)
            return (
                <React.Fragment>
                    <ul>{this.props.cart.map(e => <li key={e.Id}>{e.Car}</li>)}</ul>
                    Total amount is : ${total}
                </React.Fragment>
            );

        return (<div>Add cars to cart</div>)
    }

    private renderCartPopover(): JSX.Element {
        return (
            <Popover id="popover-basic">
                <Popover.Header as="h3">Cars to compare:</Popover.Header>
                <Popover.Body>
                    {this.renderCartContent()}
                </Popover.Body>
            </Popover>
        );
    }

    private renderBadge(cartContanierBlock: string): JSX.Element {
        if (this.props.cart.length > 0)
            return (<Badge pill bg="danger" className={`${cartContanierBlock}_counter`}>{this.props.cart.length}</Badge>);

        return (<React.Fragment />);
    }

    public render(): JSX.Element {
        const cartContanierBlock = "cart-container";

        return (
            <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
                <Container >
                    <Navbar.Brand href="#home">Frank Motor Vehicles</Navbar.Brand>
                    <div className={cartContanierBlock}>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={this.renderCartPopover()}>
                            <Button variant="info" title="my-cart">
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </Button>
                        </OverlayTrigger>
                        {this.renderBadge(cartContanierBlock)}
                    </div>
                </Container>
            </Navbar>
        );
    }
}