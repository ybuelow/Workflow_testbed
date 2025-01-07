import { capitalizeFirstLetter } from './capitalize';

describe('Method capitalizeFirstLetter', () => {
    it('should capitalize the first letter', () => {
        const Capitalized = 'Zürich';
        const toCapitalize = 'zürich';
        const final = capitalizeFirstLetter(toCapitalize);
        expect(final).toBe(Capitalized);
    });
});
