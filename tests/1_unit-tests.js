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
});

