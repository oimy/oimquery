import "./Switch.scss";

export default function Switch({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (value: boolean) => void;
}) {
    return (
        <label className="switch">
            <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
            <span className="slider round"></span>
            <span className={`label left ${checked && "active"}`}>
                <i className="fa-solid fa-o" />
            </span>
            <span className={`label right ${!checked && "active"}`}>
                <i className="fa-solid fa-x" />
            </span>
        </label>
    );
}
