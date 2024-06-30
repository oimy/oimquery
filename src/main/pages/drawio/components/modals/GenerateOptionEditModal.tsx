import { useContext } from "react";
import Switch from "../../../../components/Switch";
import { DrawioOption, DrawioOptionContext } from "../../DrawioOptionContext";
import "./GenerateOptionEditModal.scss";

export default function GenerateOptionEditModal({
    onChange,
}: {
    onChange: (option: DrawioOption) => void;
}) {
    const option: DrawioOption = useContext(DrawioOptionContext);

    return (
        <article className="box generate-option-edit-modal">
            <p className="title">Display</p>
            <div className="columns options">
                <div className="column has-1-3">
                    <button
                        className={option.isShowTablePreview ? "active" : ""}
                        onClick={() =>
                            onChange({
                                ...option,
                                isShowTablePreview: !option.isShowTablePreview,
                            })
                        }
                    >
                        Table Preview
                    </button>
                </div>
                <div className="column has-1-3">
                    <button
                        className={option.isShowQueryPreview ? "active" : ""}
                        onClick={() =>
                            onChange({
                                ...option,
                                isShowQueryPreview: !option.isShowQueryPreview,
                            })
                        }
                    >
                        Query Preview
                    </button>
                </div>
                <div className="column has-1-3">
                    <button
                        className={option.isShowQueryStat ? "active" : ""}
                        onClick={() =>
                            onChange({
                                ...option,
                                isShowQueryStat: !option.isShowQueryStat,
                            })
                        }
                    >
                        Query Stat
                    </button>
                </div>
            </div>
            <br />
            <p className="title">Copy On Generate</p>
            <div style={{ textAlign: "center" }}>
                <Switch
                    checked={option.isCopyOnGenerate}
                    onChange={(value) =>
                        onChange({
                            ...option,
                            isCopyOnGenerate: value,
                        })
                    }
                />
            </div>
            <br />
            <p className="title">Show Clipboard Hint</p>
            <div style={{ textAlign: "center" }}>
                <Switch
                    checked={option.isShowClipboardHint}
                    onChange={(value) =>
                        onChange({
                            ...option,
                            isShowClipboardHint: value,
                        })
                    }
                />
            </div>
        </article>
    );
}
