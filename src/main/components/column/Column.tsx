import { ReactNode } from "react";

export default function Column({
    children,
    className,
    style,
}: {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties | undefined;
}) {
    return (
        <div className={"column" + (className ? ` ${className}` : "")} style={style}>
            {children}
        </div>
    );
}
