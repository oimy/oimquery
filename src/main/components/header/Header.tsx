import { useState } from "react";
import { RouteMilestone } from "../../../routes";
import Menu from "../menu/Menu";
import "./Header.scss";

export default function Header({ routeMilestones }: { routeMilestones: RouteMilestone[] }) {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

    return (
        <header>
            <section className="container header">
                {!isOpenMenu && (
                    <button className="menu" onClick={() => setIsOpenMenu(true)}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                )}
            </section>
            {isOpenMenu && (
                <Menu
                    routeMilestones={routeMilestones}
                    onClose={() => {
                        setIsOpenMenu(false);
                    }}
                />
            )}
        </header>
    );
}
