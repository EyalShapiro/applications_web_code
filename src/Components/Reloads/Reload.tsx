import './load.css'
/**
 * Render a loader component.
 * @return {JSX.Element} The body element with a loader component.
 */
export default function Reload(): JSX.Element {
    return (<body>
        <div className="loader">
            <span className='pokeball-spin'></span>
        </div>
    </body>)
}
