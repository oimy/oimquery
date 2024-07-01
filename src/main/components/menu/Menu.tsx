import { RouteMilestone } from "../../../routes";
import "./Menu.scss";

export default function Menu({
    routeMilestones,
    onClose,
}: {
    routeMilestones: RouteMilestone[];
    onClose: () => void;
}) {
    return (
        <section className="menu-container">
            <div className="background" onClick={onClose} />
            <article className="block">
                <div className="header">
                    <button className="exit" onClick={onClose}>
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>
                {routeMilestones.map((milestone) => (
                    <div className="item-wrapper">
                        <a
                            className="item"
                            href={milestone.path}
                            style={{ color: milestone.color }}
                        >
                            {milestone.name}
                        </a>
                    </div>
                ))}
            </article>
        </section>
    );
}
