
$(document).ready(function() {
    let lastWasOperator = false; 
    let equalPressed = false; 

    $('.buttons button').on('click', function() {
        const value = $(this).data('value'); 

        if (value === '=') {
            const currentInput = $('#input').val(); 
            const result = calculate(currentInput);
            addToHistory(currentInput + '='+ result); 
            $('#input').val(''); 
            equalPressed = true; 
        } else {
            const currentInput = $('#input').val();
            const lastChar = currentInput.slice(-1);

            
            if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(lastChar)) {
                return; 
            }

            if (value === '.') {
                if (lastWasOperator || currentInput === '') {
                    return; 
                }
                if (currentInput.split(/[\+\-\*\/]/).pop().includes('.')) {
                    return; 
                }
            }

            $('#input').val(currentInput + value); 
            lastWasOperator = ['+', '-', '*', '/'].includes(value); 
    
        }
        
    });
    
    function calculate(expression) {
        try {
            return math.evaluate(expression); 
        } catch (error) {
            return 'Ошибка'; 
        }
    }

    function addToHistory(entry) {
        $('#history').append('<div>' + entry + '</div>'); }

});