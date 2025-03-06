$(function () {
    let isOperatorLast = false;
    let isEqualPressed = false;

    $('.buttons button').on('click', function () {
        const buttonValue = $(this).data('value');
        const inputField = $('#input');
        const currentInput = inputField.val();

        if (buttonValue === 'C') {
            inputField.val('');
            isOperatorLast = false;
            isEqualPressed = false;
            return;
        }

        if (buttonValue === '=') {
            const result = evaluateExpression(currentInput);
            if (result !== 'Ошибка') {
                addToHistory(`${currentInput} = ${result}`);
                inputField.val(result);
            } else {
                inputField.val('Ошибка');
            }
            isEqualPressed = true;
        } else {
            if (isEqualPressed) {
                inputField.val('');
                isEqualPressed = false;
            }

            if (isOperator(buttonValue) && isOperator(getLastCharacter(currentInput))) {
                return;
            }

            if (buttonValue === '.') {
                if (isOperatorLast || currentInput === '') {
                    return;
                }
                if (hasDecimalInLastNumber(currentInput)) {
                    return;
                }
            }

            inputField.val(currentInput + buttonValue);
            isOperatorLast = isOperator(buttonValue);
        }
    });

    function evaluateExpression(expression) {
        try {
            return math.evaluate(expression);
        } catch (error) {
            return 'Ошибка';
        }
    }

    function addToHistory(entry) {
        $('#history').append(`<div>${entry}</div>`);
    }

    function isOperator(value) {
        return ['+', '-', '*', '/'].includes(value);
    }

    function getLastCharacter(str) {
        return str.slice(-1);
    }

    function hasDecimalInLastNumber(str) {
        const lastNumber = str.split(/[\+\-\*\/]/).pop();
        return lastNumber.includes('.');
    }
});