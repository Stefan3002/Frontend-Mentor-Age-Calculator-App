
const addRemoveErrorMessage = (inputWrappers, idx, behaviour, msg) => {
    const alreadyThere = document.querySelector(`.error-msg-${idx}`)
    if(behaviour === 'add') {
        if (!alreadyThere) {
            const newError = document.createElement('p')
            newError.classList.add('wrong')
            newError.classList.add(`error-msg-${idx}`)
            newError.innerText = msg
            inputWrappers[idx].appendChild(newError)
        }
    }
    else
        if(alreadyThere)
            inputWrappers[idx].removeChild(inputWrappers[idx].lastChild)

}


const validateForm = (day, month, year) => {
    const labels = document.querySelectorAll('.label-upper')
    const inputs = document.querySelectorAll('.input-lower')
    const inputWrappers = document.querySelectorAll('.input-wrapper')

    let hadErrors = false

    let msg = 'This field is required!'

    if(!day || day <= 0 || day >= 32){
        labels[0].classList.add('wrong')
        inputs[0].classList.add('wrong-input')
        if(day)
            msg = 'Must be a valid day!'
        addRemoveErrorMessage(inputWrappers, 0, 'add', msg)
        hadErrors = true
    }
    else{
        labels[0].classList.remove('wrong')
        inputs[0].classList.remove('wrong-input')
        addRemoveErrorMessage(inputWrappers, 0, 'remove')
    }
    if(!month || month <= 0 || month >= 13){
        labels[1].classList.add('wrong')
        inputs[1].classList.add('wrong-input')
        if(month)
            msg = 'Must be a valid month!'
        addRemoveErrorMessage(inputWrappers, 1, 'add', msg)
        hadErrors = true
    }else{
        labels[1].classList.remove('wrong')
        inputs[1].classList.remove('wrong-input')
        addRemoveErrorMessage(inputWrappers, 1, 'remove')
    }
    if(!year || year <= 1300 || year >= new Date().getFullYear()){
        labels[2].classList.add('wrong')
        inputs[2].classList.add('wrong-input')
        if(year)
            msg = 'Year must be in the past, after 1300!'
        addRemoveErrorMessage(inputWrappers, 2, 'add', msg)
        hadErrors = true
    }else{
        labels[2].classList.remove('wrong')
        inputs[2].classList.remove('wrong-input')
        addRemoveErrorMessage(inputWrappers, 2, 'remove')
    }
    return !hadErrors
}


(() => {
    document.querySelector('.button').addEventListener('click', () => {
        const inputs = document.querySelectorAll('.input-lower')
        const day = inputs[0].value
        const month = inputs[1].value
        const year = inputs[2].value

        if(!validateForm(day, month, year))
            return;


        const inputDate = new Date(`${year}-${month}-${day}`)

        const ans = new Date() - inputDate
        // Credits to: https://stackoverflow.com/questions/38355157/is-there-a-method-to-convert-miliseconds-to-years-months-days-minutes-seconds-in
        //  4castle for the math here
        let seconds = Math.floor(ans / 1000),
            minutes = Math.floor(seconds / 60),
            hours   = Math.floor(minutes / 60),
            days    = Math.floor(hours / 24),
            months  = Math.floor(days / 30),
            years   = Math.floor(days / 365);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;
        days %= 30;
        months %= 12;

        document.querySelector('.result-years').innerHTML = `<span class="high">${years}</span> years`
        document.querySelector('.result-months').innerHTML = `<span class="high">${months}</span> months`
        document.querySelector('.result-days').innerHTML = `<span class="high">${days}</span> days`
    })
})()