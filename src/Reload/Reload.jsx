import React from 'react'
import './load.css'
//https://uiverse.io/adamgiebl/stale-puma-26

export default function Reload() {
    return (<body>
        <div className="loader">
            <span></span>
        </div>
    </body>)
}

// const converted_Load = {
//     ".loader": {
//         position: "relative",
//         width: "150px",
//         height: "150px",
//         background: "transparent",
//         borderRadius: "50%",
//         boxShadow: "25px 25px 75px rgba(0,0,0,0.55)",
//         border: "1px solid #fac142",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         overflow: "hidden"
//     },
//     ".loader::before": {
//         content: "''",
//         position: "absolute",
//         inset: "20px",
//         background: "transparent",
//         border: "1px dashed #fac142",
//         borderRadius: "50%",
//         boxShadow:
//             "inset -5px -5px 25px rgba(0,0,0,0.25),\n  inset 5px 5px 35px rgba(0,0,0,0.25)"
//     },
//     ".loader::after": {
//         content: "''",
//         position: "absolute",
//         width: "50px",
//         height: "50px",
//         borderRadius: "50%",
//         border: "1px dashed #fac142",
//         boxShadow:
//             "inset -5px -5px 25px rgba(0,0,0,0.25),\n  inset 5px 5px 35px rgba(0,0,0,0.25)"
//     },
//     ".loader span": {
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         width: "50%",
//         height: "100%",
//         background: "transparent",
//         transformOrigin: "top left",
//         animation: "radar82 2s linear infinite",
//         borderTop: "1px dashed #fff"
//     },
//     ".loader span::before": {
//         content: "''",
//         position: "absolute",
//         top: "0",
//         left: "0",
//         width: "100%",
//         height: "100%",
//         background: "#fac142",
//         transformOrigin: "top left",
//         transform: "rotate(-55deg)",
//         filter: "blur(30px) drop-shadow(20px 20px 20px #fac142)"
//     },
//     "@keyframes radar82": {
//         "0%": { transform: "rotate(0deg)" },
//         "100%": { transform: "rotate(360deg)" }
//     }
// }
