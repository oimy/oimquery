import "./Tooltip.scss";

const MAX_TEXT_LENGTH = 500;

export default function Tooltip({
    text,
    clientX,
    clientY,
    isShow,
}: {
    text: string;
    clientX: number;
    clientY: number;
    isShow: boolean;
}) {
    return (
        <pre
            className="tooltip"
            style={{ top: clientY, left: clientX, display: isShow ? "block" : "none" }}
        >
            {text.length > MAX_TEXT_LENGTH ? text.substring(0, MAX_TEXT_LENGTH) + "..." : text}
        </pre>
    );
}
