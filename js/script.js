
let div = null;
// Toast message generate
function generateToastMessage(msg) {
    // div creating
    div = document.createElement('div');
    div.innerText = msg;
    div.className = 'toast-message my-btn-pulse-grow toast-message-slide-in';

    div.addEventListener('click', function () {
        div.classList.remove('toast-message-slide-in');
        div.classList.add('toast-message-slide-out');

        div.addEventListener('animationend', function () {
            div.remove();
            div = null;
        });
    });
    document.body.appendChild(div);
}

function getInput(identity) {
    if (!identity || typeof identity !== 'string') return false;

    // element area 
    const element = document.querySelector(identity);
    const elementData = parseFloat(element.value);

    if (typeof elementData !== 'number' || isNaN(elementData) || elementData < 0) {
        const errFeedback = document.querySelector(`.invalid-feedback[data-target='${identity}']`);

        if (errFeedback) {
            errFeedback.innerText = 'please enter a valid number'
            if (div !== null) {
                div.remove();
                div = null;
                return generateToastMessage(`Income not sufficient `);
            }
        }

        element.classList.add('is-invalid')
        return false;
    }

    element.classList.remove('is-invalid')
    return elementData;
}

function getExpenses() {
    // expenses area
    const totalExpenses = document.getElementById('expenses');
    const balance = document.getElementById('balance');

    totalExpenses.innerText = '00';
    balance.innerText = '00';

    const food = getInput('#food');
    const rent = getInput('#rent');
    const clothes = getInput('#clothes');
    const income = getInput('#income');

    if (food === false || rent === false || clothes === false || income === false) return;

    if (food + rent + clothes > income) {
        let totalExpenses = parseFloat(food + rent + clothes)
        let sortMoney = totalExpenses - income;
        return generateToastMessage(` Your income low `);

    }
    totalExpenses.innerText = food + rent + clothes;
    balance.innerText = income - (food + rent + clothes);

}

function calcSavings() {
    // Money saving
    const balance = document.getElementById('balance');
    const balanceData = parseFloat(balance.innerText);

    const savings = document.getElementById('savings');
    savings.innerText = '00';

    const remainBalance = document.getElementById('remaining-balance');
    remainBalance.innerText = '00';

    const save = getInput('#save');
    const income = getInput('#income');

    if (save === false) return;

    const saved = (income * save) / 100;
    // validation checking
    if (saved > income) {
        const availableSavingPercent = Math.floor(
            (income / save) * 100
        );
        return generateToastMessage(`Not valid ${availableSavingPercent} from your income`);
    }
    savings.innerText = saved;
    remainBalance.innerText = balanceData - saved;
    if (remainBalance.innerText < 0) {
        remainBalance.innerText = '00'
        return generateToastMessage(`Please insert valid number`);
    }

}