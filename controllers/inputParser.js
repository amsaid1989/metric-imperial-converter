module.exports = {
    validQuantity: function (input) {
        // regex pattern to make sure that the input doesn't contain
        // an characters other than digits, decimal points and the
        // division operator
        const containsLettersPattern = /[^0-9\.\/]*/g;

        const divisionSymbolPattern = /\//g;
        const decimalPointPattern = /\./g;

        // Tests the input to see if it contains any alphabetical
        // letters and stores how many matches it found, if any
        const alphabetCount = input
            .match(containsLettersPattern)
            .filter((elem) => elem !== "").length;

        // Tests the input to make sure it only contains a maximum
        // of one division operator and stores the count of the
        // operators
        const divOperatorCount = [...input.matchAll(divisionSymbolPattern)]
            .length;

        // Tests the input to check how many decimal points are
        // included and stores the count. This is needed to make
        // sure that the input is valid when it is a number rather
        // than an expression that contains a division operator
        const decimalPointCount = [...input.matchAll(decimalPointPattern)]
            .length;

        if (
            alphabetCount > 0 ||
            divOperatorCount > 1 ||
            (divOperatorCount === 0 && decimalPointCount > 1)
        ) {
            return false;
        }

        // If there is a division operator, then we split the operands
        // and test each one of them to make sure it only includes
        // a maximum of 1 decimal point. The test will return false if
        // any of the operands includes more than 1 decimal points.
        // Otherwise, it returns true
        if (divOperatorCount === 1) {
            const operands = input.split("/");

            return operands.every(
                (operand) =>
                    [...operand.matchAll(decimalPointPattern)].length <= 1
            );
        }

        return true;
    },
};
