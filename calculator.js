// js
// 100 + 20 * 12
// const res = eval("10 + 2")
// document
// const btn = document.getElementById()
// btn.addEventListener("click", () => {})
// input.value

// css
// grid
// display: grid;
// grid-template-row: 10px 20px 30px; -- height
// grid-template-column: 20px 30px; -- width

// + - * /

const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const display = document.querySelector(".display")
const equals = document.querySelector(".equals")
const acBtn = document.getElementById("ac-btn")
const cBtn = document.getElementById("c-btn")

for (const number of numbers) {
    number.addEventListener("click", () => {
        if (Number(display.value) === 0 && number.innerText !== ",") {
            display.value = ""
        }

        display.value += number.innerText
    })
}

function clearAllPrevOps() {
    const preLastIndex = display.value.length - 2
    while (checkIfOp(display.value[preLastIndex])) {
        display.value = display.value.slice(0, preLastIndex)
    }
}

function checkIfOp(symbol) {
    const ops = ["+", "–", "x", "/"]
    return ops.includes(symbol)
}

for (const operator of operators) {
    operator.addEventListener("click", () => {
        if (Number(display.value) === 0 && operator.innerText === "–") {
            display.value = ""
        }

        const lastIndex = display.value.length - 1
        const isLastSymbolOp = checkIfOp(display.value[lastIndex])
        if (isLastSymbolOp) {
            clearAllPrevOps()
            const canBeOp = operator.innerText === "–" && display.value[lastIndex] !== "–"
            if (canBeOp) {
                display.value += operator.innerText
            } else {
                display.value = display.value.slice(0, lastIndex) + operator.innerText
            }
        } else {
            display.value += operator.innerText
        }
    })
}

equals.addEventListener("click", () => {
    const lastIndex = display.value.length - 1
    if (checkIfOp(display.value[lastIndex])) {
        display.value = display.value.slice(0, lastIndex)
    }

    display.value = display.value.replaceAll("–","-")
    display.value = display.value.replaceAll("x","*")
    display.value = display.value.replaceAll(",",".")
    try {
        display.value = eval(display.value)
    } catch(error) {
        console.error(error)
    }

    display.value = display.value.replaceAll("-","–")
    display.value = display.value.replaceAll("*","x")
    display.value = display.value.replaceAll(".",",")
})

acBtn.addEventListener("click", () => {
    display.value = "0"
})

cBtn.addEventListener("click", () => {
    if (display.value.length <= 1) {
        display.value = "0"
    } else {
        display.value = display.value.slice(0, display.value.length - 1)
    }
})

display.addEventListener("input", (event) => {
    event.preventDefault()
    display.value = display.value.replace(/\D/g, '');
})


