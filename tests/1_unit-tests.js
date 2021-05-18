const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
    test("convertHandler should correctly read a whole number input", function () {
        assert.equal(convertHandler.getNum("5kg"), 5);
        assert.equal(convertHandler.getNum("10"), 10);
        assert.equal(convertHandler.getNum("hgr10"), "invalid number");
        assert.equal(convertHandler.getNum("1ht0"), "invalid number");
    });
    test("convertHandler should correctly read a decimal number input", function () {
        assert.equal(convertHandler.getNum("5.5kg"), 5.5);
        assert.equal(convertHandler.getNum("5.34.4kg"), "invalid number");
        assert.equal(convertHandler.getNum("5..4kg"), "invalid number");
        assert.equal(convertHandler.getNum("hjer5.34kg"), "invalid number");
        assert.equal(convertHandler.getNum("5.hg34kg"), "invalid number");
    });
    test("convertHandler should correctly read a fractional input", function () {
        assert.equal(convertHandler.getNum("5/2kg"), 2.5);
        assert.equal(convertHandler.getNum("10/2"), 5);
        assert.equal(convertHandler.getNum("hhgk5/2kg"), "invalid number");
        assert.equal(convertHandler.getNum("5r/h2kg"), "invalid number");
        assert.equal(convertHandler.getNum("5/h2kg"), "invalid number");
        assert.equal(convertHandler.getNum("5r/2kg"), "invalid number");
    });
    test("convertHandler should correctly read a fractional input with a decimal", function () {
        assert.equal(convertHandler.getNum("10.5/2kg"), 5.25);
        assert.equal(convertHandler.getNum("10.5/2.5kg"), 4.2);
        assert.equal(convertHandler.getNum("10..5/2kg"), "invalid number");
        assert.equal(convertHandler.getNum("10..5/2..5kg"), "invalid number");
        assert.equal(convertHandler.getNum("ghfg10.5/5kg"), "invalid number");
        assert.equal(convertHandler.getNum("10fy.5/2kg"), "invalid number");
    });
    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)", function () {
        assert.equal(convertHandler.getNum("3/2/3kg"), "invalid number");
    });
    test("convertHandler should default to numerical input of 1 when no numerical input is provided", function () {
        assert.equal(convertHandler.getNum("kg"), 1);
        assert.equal(convertHandler.getNum("lbs"), 1);
        assert.equal(convertHandler.getNum("L"), 1);
        assert.equal(convertHandler.getNum("km"), 1);
        assert.equal(convertHandler.getNum("mi"), 1);
        assert.equal(convertHandler.getNum("hfr"), 1);
    });
    test("convertHandler should correctly read each valid input unit", function () {
        assert.equal(convertHandler.getUnit("5.5kg"), "kg");
        assert.equal(convertHandler.getUnit("5.5KG"), "kg");
        assert.equal(convertHandler.getUnit("5.5Kg"), "kg");
        assert.equal(convertHandler.getUnit("5.5kG"), "kg");
        assert.equal(convertHandler.getUnit("10lbs"), "lbs");
        assert.equal(convertHandler.getUnit("10LBS"), "lbs");
        assert.equal(convertHandler.getUnit("10Lbs"), "lbs");
        assert.equal(convertHandler.getUnit("88728mi"), "mi");
        assert.equal(convertHandler.getUnit("88728Mi"), "mi");
        assert.equal(convertHandler.getUnit("88728MI"), "mi");
        assert.equal(convertHandler.getUnit("4.25km"), "km");
        assert.equal(convertHandler.getUnit("4.25Km"), "km");
        assert.equal(convertHandler.getUnit("4.25KM"), "km");
        assert.equal(convertHandler.getUnit("76gal"), "gal");
        assert.equal(convertHandler.getUnit("76Gal"), "gal");
        assert.equal(convertHandler.getUnit("76GAL"), "gal");
        assert.equal(convertHandler.getUnit("45.5L"), "L");
        assert.equal(convertHandler.getUnit("15l"), "L");
        assert.equal(convertHandler.getUnit("kjhgs8867km"), "km");
        assert.equal(convertHandler.getUnit("786ghjgg887gal"), "gal");
    });
    test("convertHandler should correctly return an error for an invalid input unit", function () {
        assert.equal(convertHandler.getUnit("5.5gm"), "invalid unit");
        assert.equal(convertHandler.getUnit("10jhgsd"), "invalid unit");
        assert.equal(convertHandler.getUnit("5m"), "invalid unit");
        assert.equal(convertHandler.getUnit("8765"), "invalid unit");
        assert.equal(convertHandler.getUnit("iuy7786hkjh"), "invalid unit");
        assert.equal(convertHandler.getUnit("gjg77iui00lkk"), "invalid unit");
    });
    test("convertHandler should return the correct return unit for each valid input unit", function () {
        assert.equal(convertHandler.getReturnUnit("km"), "mi");
        assert.equal(convertHandler.getReturnUnit("mi"), "km");
        assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
        assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
        assert.equal(convertHandler.getReturnUnit("L"), "gal");
        assert.equal(convertHandler.getReturnUnit("gal"), "L");
        assert.isUndefined(convertHandler.getReturnUnit("kjhggkjh"));
        assert.isUndefined(convertHandler.getReturnUnit("564jhgg"));
    });
    test("convertHandler should correctly return the spelled-out string unit for each valid input", function () {
        assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
        assert.equal(convertHandler.spellOutUnit("mi"), "miles");
        assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
        assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
        assert.equal(convertHandler.spellOutUnit("L"), "liters");
        assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
        assert.isUndefined(convertHandler.spellOutUnit("kjhggkjh"));
        assert.isUndefined(convertHandler.spellOutUnit("564jhgg"));
    });
    test("convertHandler should correctly convert gal to L", function () {
        assert.equal(convertHandler.convert(5.5, "gal"), "20.81976");
        assert.equal(convertHandler.convert(20, "gal"), "75.70820");
    });
    test("convertHandler should correctly convert L to gal", function () {
        assert.equal(convertHandler.convert(10, "L"), "2.64172");
        assert.equal(convertHandler.convert(25.25, "L"), "6.67035");
    });
    test("convertHandler should correctly convert mi to km", function () {
        assert.equal(convertHandler.convert(120, "mi"), "193.12080");
        assert.equal(convertHandler.convert(75.5, "mi"), "121.50517");
    });
    test("convertHandler should correctly convert km to mi", function () {
        assert.equal(convertHandler.convert(90, "km"), "55.92355");
        assert.equal(convertHandler.convert(135.5, "km"), "84.19601");
    });
    test("convertHandler should correctly convert lbs to kg", function () {
        assert.equal(convertHandler.convert(100, "lbs"), "45.35920");
        assert.equal(convertHandler.convert(55.5, "lbs"), "25.17436");
    });
    test("convertHandler should correctly convert kg to lbs", function () {
        assert.equal(convertHandler.convert(60.75, "kg"), "133.93093");
        assert.equal(convertHandler.convert(120, "kg"), "264.55493");
    });
});
