const processor = require("./inputProcessor");

function ConvertHandler() {
    this.getNum = function (input) {
        // regex pattern to remove any non-numeric characters
        // at the end of the input
        const splitRegex = /[^0-9\.\/]*$/g;

        // regex pattern to check if the entire input is made
        // of alphabetical characters which means it is most
        // likely a unit-only input
        const unitOnlyRegex = /^[^0-9\.\/]*$/g;

        // If the input is unit-only, return the default qantity which is 1
        if (input.match(unitOnlyRegex)) {
            return 1;
        }

        const cleanInput = input.split(splitRegex).join("");

        if (!processor.validQuantity(cleanInput)) {
            return "invalid number";
        }

        // If all the tests pass, return the quantity as a number
        // by passing the input to the eval() function. Using the
        // eval() function in this case should be safe, since the
        // method ensures that the input passed to it is only made
        // of digits, decimal points and a maximum of 1 division
        // operator
        return eval(cleanInput);
    };

    this.getUnit = function (input) {
        let result;

        return result;
    };

    this.getReturnUnit = function (initUnit) {
        let result;

        return result;
    };

    this.spellOutUnit = function (unit) {
        let result;

        return result;
    };

    this.convert = function (initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        let result;

        return result;
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        let result;

        return result;
    };
}

module.exports = ConvertHandler;
