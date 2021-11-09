/// <reference types="jest" />
import { render, screen, waitFor } from '@testing-library/react';
import { TopMenu } from '../../src/components/topMenu/topMenu';
import { AddedVehicle } from '../../src/models/addedVehicle';
import userEvent from '@testing-library/user-event';
import '../setupTests';

describe('TopMenu component tests', () => {
    it('TopMenu rendered', async () => {
        const brandLabel = 'Frank Motor Vehicles';
        const cartButtonTitle = 'my-cart';

        render(<TopMenu cart={[]} />);

        expect(screen.queryByText(brandLabel)).toBeInTheDocument();
        expect(screen.queryByTitle(cartButtonTitle)).toBeInTheDocument();
    });

    it('TopMenu cart badge and popover rendered', async () => {
        const cartButtonTitle = 'my-cart';
        const cart: AddedVehicle[] = [
            {
                Id: 1,
                Car: 'Some car',
                Price: 13000.50
            },
            {
                Id: 2,
                Car: 'Some other car',
                Price: 21432.23
            }
        ]

        const total = cart[0].Price + cart[1].Price;

        render(<TopMenu cart={cart} />);

        expect(screen.queryByText('2')).toBeInTheDocument;

        userEvent.click(screen.getByTitle(cartButtonTitle));

        await waitFor(() => expect(screen.queryByText('Cars to compare:')).toBeInTheDocument());

        expect(screen.queryByText('Some car')).toBeInTheDocument;
        expect(screen.queryByText('Some other car')).toBeInTheDocument;
        expect(screen.queryByText(`Total amount is : ${total}`)).toBeInTheDocument;
    });
});
