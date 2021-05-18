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
        const units = ["kg", "lbs", "km", "mi", "gal", "l"];

        // regex to check for any alphabets at the end of the input
        // that might constitute a unit
        const matchPattern = /[^0-9\.\/]*$/g;

        const unit = input
            .match(matchPattern)
            .filter((elem) => elem !== "")
            .join("")
            .toLowerCase();

        if (units.indexOf(unit) !== -1) {
            // If the unit is litres we only return it in the uppercase
            // format to make it more readable
            return unit === "l" ? "L" : unit;
        }

        return "invalid unit";
    };

    this.getReturnUnit = function (initUnit) {
        const unitLookup = {
            km: "mi",
            mi: "km",
            kg: "lbs",
            lbs: "kg",
            L: "gal",
            gal: "L",
        };

        return unitLookup[initUnit];
    };

    this.spellOutUnit = function (unit) {
        const unitLookup = {
            km: "kilometers",
            mi: "miles",
            kg: "kilograms",
            lbs: "pounds",
            L: "liters",
            gal: "gallons",
        };

        return unitLookup[unit];
    };

    this.convert = function (initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;

        const conversionTable = {
            gal: (num) => num * galToL,
            L: (num) => num / galToL,
            lbs: (num) => num * lbsToKg,
            kg: (num) => num / lbsToKg,
            mi: (num) => num * miToKm,
            km: (num) => num / miToKm,
        };

        return conversionTable[initUnit](initNum).toFixed(5);
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        let result;

        return result;
    };
}

module.exports = ConvertHandler;
