import { RouteMilestone } from "../../../routes";
import "./Menu.scss";

export default function Menu({ routeMilestones, onClose }: { routeMilestones: RouteMilestone[]; onClose: () => void }) {
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
                    <div className="item-wrapper columns">
                        <div className="column">
                            <img className="logo" src={milestone.logo} alt="logo" />
                        </div>
                        <div className="column fill-width">
                            <a className="item" href={milestone.path} style={{ color: milestone.color }}>
                                {milestone.name}
                            </a>
                        </div>
                    </div>
                ))}
            </article>
        </section>
    );
}
