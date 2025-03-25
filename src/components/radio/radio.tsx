import './styles.css';

type Props = {
    onChange: () => void,
    isChecked: boolean,
    id: string,
    text: string
}
function Radio ({onChange, id, isChecked, text}: Props) {
    return <label className="radio">
        <input type="radio" id={id} name="filter-radio" onChange={onChange} checked={isChecked}/>
        {text}
    </label>
}

export default Radio;