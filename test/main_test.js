describe('buildBarcode', () => {

    it('12345 correct', () => {
        const barcode = buildBarcode('12345');

        expect(barcode).toEqual('|:::||::|:|::||::|::|:|:|::|:|:|');
    });

    it('123451234 correct', () => {
        const barcode = buildBarcode('123451234');

        expect(barcode).toEqual('|:::||::|:|::||::|::|:|:|::::||::|:|::||::|::|:|:|:|');
    });

    it('12345-1234 correct', () => {
        const barcode = buildBarcode('12345-1234');

        expect(barcode).toEqual('|:::||::|:|::||::|::|:|:|::::||::|:|::||::|::|:|:|:|');
    });

    it('checkLegal 123455 error', () => {
        const leagal = checkLegal('123455');

        expect(leagal).toEqual(undefined);
    });

    it('checkLegal 12345 correct', () => {
        const leagal = checkLegal('12345');

         expect(leagal).toEqual(['1','2','3','4','5']);
    });

 
    it('buildZipCode', () => {
        const zipCode = buildZipCode(['1','2','3','4','5']);

        expect(zipCode).toEqual('|:::||::|:|::||::|::|:|:|::|:|:|');
    });
    
});



describe('buildZipCode2', () => {
    it('should print correct', () => {
        const barcode = buildZipCode2('|:::||::|:|::||::|::|:|:|::|:|:|');

        expect(barcode).toEqual('12345');
    });

    it('should print correct', () => {
        const barcode = buildZipCode2('|:::||::|:|::||::|::|:|:|::::||::|:|::||::|::|:|:|:|');

        expect(barcode).toEqual('12345-1234');
    });


    it('checkZipLegal', () => {
        const ziplegal = checkZipLegal('|:::||::|:|::||::|::|:|:|::|:|:|');

        expect(ziplegal).toEqual([':::||','::|:|','::||:',':|::|',':|:|:',':|:|:']);
    });

    it('checkZipLegal 123455 error', () => {
        const ziplegal = checkZipLegal('123455');

        expect(ziplegal).toEqual(undefined);
    });

    it('getWeight', () => {
        const weight = getWeight([':::||','::|:|','::||:',':|::|',':|:|:',':|:|:']);

        expect(weight).toEqual(['1', '2', '3', '4', '5', '5']);
    });

    it("getZipCode ['1', '2', '3', '4', '5', '5']", () => {
        const ziplegal = getZipCode(['1', '2', '3', '4', '5', '5']);

        expect(ziplegal).toEqual('12345');
    });

    it(("getZipCode ['1', '2', '3', '4', '5', '4']"), () => {
        const ziplegal = getZipCode(['1', '2', '3', '4', '5', '4']);

        expect(ziplegal).toEqual(undefined);
    });

})