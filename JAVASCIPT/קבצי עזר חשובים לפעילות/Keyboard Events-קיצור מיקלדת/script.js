window.onload = main();
let num_ctrl = 0;//ctrl סופרת מספר הפעמים שלחצת על הכפתור 
let num_alt = 0;//ctrl סופרת מספר הפעמים שלחצת על הכפתור 
function main() {
    alert("נגמר לטעון");


    window.addEventListener("keydown", (event) => {
        if (event.altKey) {
            // do your stuff
            num_alt++;
            const elem_alt = window.document.querySelector("#alt");

            elem_alt.innerHTML = `altKey :${num_alt}=מספר לחיצות על כפתור`
        }
        if (event.ctrlKey) {
            // do your stuff
            num_ctrl++;
            const elem_ctrl = window.document.querySelector("#ctrl");

            elem_ctrl.innerHTML = `ctrlKey :${num_ctrl}=מספר לחיצות על כפתור`
        }


    });
}
