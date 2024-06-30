import { ReactNode } from "react";
import "./Box.scss";

export default function Box({
    className = "",
    children,
}: {
    className?: string;
    children: ReactNode[];
}) {
    return (
        <section className="box-container">
            <article className={`box ${className ? className : ""}`.trim()}>{children}</article>
        </section>
    );
}
