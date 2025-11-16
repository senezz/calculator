const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const display = document.querySelector(".display")
const equals = document.querySelector(".equals")
const acBtn = document.getElementById("ac-btn")
const cBtn = document.getElementById("c-btn")
const themeSwitchBtn = document.getElementById("theme-switch-btn")

numbers.forEach(number => number.addEventListener("click", onNumberClick))
operators.forEach(operator => operator.addEventListener("click", onOperatorClick))

equals.addEventListener("click", onEquals)
acBtn.addEventListener("click", onClearAll)
cBtn.addEventListener("click", onClear)
display.addEventListener("input", onDisplay)
themeSwitchBtn.addEventListener("click", onThemeSwitch)

function onNumberClick({target: number}) {
    if (Number(display.value) === 0 && number.innerText !== ",") {
        display.value = ""
    }

    display.value += number.innerText
}

function onOperatorClick({target: operator}) {
    if (Number(display.value) === 0 && operator.innerText === "–") {
        display.value = ""
    }

    const lastIndex = display.value.length - 1
    const isLastSymbolOp = checkIfOp(display.value[lastIndex])
    if (isLastSymbolOp) {
        clearAllPrevOps()
        const canBeOp = operator.innerText === "–" && display.value[lastIndex] !== "–"
        const slicedDisplay = display.value.slice(0, lastIndex)
        display.value = canBeOp ? 
            display.value + operator.innerText :
            slicedDisplay + operator.innerText
    } else {
        display.value += operator.innerText
    }
}

function onEquals() {
    const lastIndex = display.value.length - 1
    if (checkIfOp(display.value[lastIndex])) {
        display.value = display.value.slice(0, lastIndex)
    }

    if (display.value[lastIndex] === '%') {
        display.value = display.value.slice(0, lastIndex)
    }

    const subs = [["–","-"], ["x","*"], [",","."]];
    subs.forEach(([newValue, oldValue]) => 
        display.value = display.value.replaceAll(newValue, oldValue))

    try {
        let result = Number(eval(display.value))
        if (Number.isNaN(result) || !Number.isFinite(result)) {
            result = "0"
        }
        display.value = result
    } catch(error) {
        console.error(error)
    }

    subs.forEach(([newValue, oldValue]) => 
        display.value = display.value.replaceAll(oldValue, newValue))
}

function onClearAll() {
    display.value = "0"
}

function onClear() {
    const slicedDisplay = display.value.slice(0, display.value.length - 1)
    display.value = display.value.length <= 1 ? "0" : slicedDisplay
}

function onDisplay(event) {
    event.preventDefault()
    display.value = display.value.replace(/\D/g, '');
}

function clearAllPrevOps() {
    const preLastIndex = display.value.length - 2
    while (checkIfOp(display.value[preLastIndex])) {
        display.value = display.value.slice(0, preLastIndex)
    }
}

function checkIfOp(symbol) {
    const ops = ["+", "–", "x", "/", "%"]
    return ops.includes(symbol)
}

function onThemeSwitch() {
    const theme = document.body.classList.toggle('light-theme') ? 'light' : 'dark'
    localStorage.setItem('theme', theme)
    document.getElementById("theme-switch-img")
        .setAttribute('src', `./assets/${theme}-theme.svg`)
}

const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'light') {
    document.body.classList.add('light-theme')
    document.getElementById("theme-switch-img")
        .setAttribute('src', './assets/light-theme.svg')
} else {
    document.getElementById("theme-switch-img")
        .setAttribute('src', './assets/dark-theme.svg')
}
