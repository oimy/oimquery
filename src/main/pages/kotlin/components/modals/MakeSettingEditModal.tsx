import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useMount } from "../../../../../hooks/useMount";
import Column from "../../../../components/column/Column";
import Columns from "../../../../components/column/Columns";
import Modal from "../../../../components/modal/Modal";
import Switch from "../../../../components/switch/Switch";
import { KotlinSetting, KotlinSettingContext } from "../../KotlinSettingContext";
import "./MakeSettingEditModal.scss";

export default function MakeSettingEditModal({
    onChange,
    onClose,
}: {
    onChange: (setting: KotlinSetting) => void;
    onClose: () => void;
}) {
    const setting: KotlinSetting = useContext(KotlinSettingContext);

    const [formIgnoreName, setFormIgnoreName] = useState<string>("");
    const [formInheritanceClassName, setFormInheritanceClassName] = useState<string>("");
    const [formInheritanceFieldName, setFormInheritanceFieldName] = useState<string>("");
    const [formInheritanceFieldNames, setFormInheritanceFieldNames] = useState<string[]>([]);

    useMount(() => {
        if (setting.inheritanceClass) {
            setFormInheritanceClassName(setting.inheritanceClass.name);
            setFormInheritanceFieldNames(setting.inheritanceClass.properties.map((property) => property.name));
        }
    });

    return (
        <Modal onClose={onClose}>
            <article className="box make-setting-edit-modal">
                <Columns>
                    <Column className="half">
                        <p className="title">Copy On Click</p>
                        <div style={{ textAlign: "center" }}>
                            <Switch
                                checked={setting.isCopyOnClick}
                                onChange={(value) =>
                                    onChange({
                                        ...setting,
                                        isCopyOnClick: value,
                                    })
                                }
                            />
                        </div>
                    </Column>
                    <Column className="half">
                        <p className="title">Show Clipboard Hint</p>
                        <div style={{ textAlign: "center" }}>
                            <Switch
                                checked={setting.isShowClipboardHint}
                                onChange={(value) =>
                                    onChange({
                                        ...setting,
                                        isShowClipboardHint: value,
                                    })
                                }
                            />
                        </div>
                    </Column>
                </Columns>
                <br />
                <p className="title">Name Removal Count from End</p>
                <div style={{ textAlign: "center" }}>
                    <input
                        className="input name-removal-count"
                        type="number"
                        step={1}
                        min={0}
                        max={10}
                        value={setting.pluralRemovalCount}
                        onChange={(event) => onChange({ ...setting, pluralRemovalCount: parseInt(event.target.value) })}
                    />
                </div>
                <br />
                <Columns>
                    <Column className="half">
                        <p className="title">Ignore Names</p>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <table className="ignore-name-table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                className="input"
                                                type="text"
                                                value={formIgnoreName}
                                                onChange={(event) => setFormIgnoreName(event.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="button"
                                                onClick={() => {
                                                    if (setting.ignoreNames.includes(formIgnoreName)) {
                                                        toast(
                                                            `name '${formIgnoreName}' already exists in setting, try other one.`,
                                                            { type: "error" }
                                                        );
                                                        return;
                                                    }
                                                    onChange({
                                                        ...setting,
                                                        ignoreNames: setting.ignoreNames.concat([formIgnoreName]),
                                                    });
                                                }}
                                            >
                                                <i className="fa-solid fa-plus" />
                                            </button>
                                        </td>
                                    </tr>
                                    {setting.ignoreNames.map((name) => (
                                        <tr>
                                            <td>
                                                <p>{name}</p>
                                            </td>
                                            <td>
                                                <button
                                                    className="button"
                                                    onClick={() => {
                                                        onChange({
                                                            ...setting,
                                                            ignoreNames: setting.ignoreNames.filter(
                                                                (ignoreName) => name !== ignoreName
                                                            ),
                                                        });
                                                    }}
                                                >
                                                    <i className="fa-solid fa-minus" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Column>
                    <Column className="half">
                        <p className="title">Inheritance Class</p>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Columns>
                                <Column className="has-1-2" style={{ display: "flex", alignItems: "center" }}>
                                    <p className="title" style={{ fontSize: "0.8em", margin: 0, marginRight: "20px" }}>
                                        Name
                                    </p>
                                </Column>
                                <Column>
                                    <input
                                        className="input"
                                        type="text"
                                        value={formInheritanceClassName}
                                        onChange={(event) => setFormInheritanceClassName(event.target.value)}
                                    />
                                </Column>
                            </Columns>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                            }}
                        >
                            <p className="title" style={{ fontSize: "0.8em", marginBottom: "10px" }}>
                                Field
                            </p>
                            <table className="inheritance-column-name-table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                className="input"
                                                type="text"
                                                value={formInheritanceFieldName}
                                                onChange={(event) => setFormInheritanceFieldName(event.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="button"
                                                onClick={() => {
                                                    if (formInheritanceFieldNames.includes(formInheritanceFieldName)) {
                                                        toast(
                                                            `name '${formInheritanceFieldName}' already exists in setting, try other one.`,
                                                            { type: "error" }
                                                        );
                                                        return;
                                                    }
                                                    setFormInheritanceFieldNames(
                                                        formInheritanceFieldNames.concat([formInheritanceFieldName])
                                                    );
                                                }}
                                            >
                                                <i className="fa-solid fa-plus" />
                                            </button>
                                        </td>
                                    </tr>
                                    {formInheritanceFieldNames.map((name) => (
                                        <tr>
                                            <td>
                                                <p>{name}</p>
                                            </td>
                                            <td>
                                                <button
                                                    className="button"
                                                    onClick={() => {
                                                        setFormInheritanceFieldNames(
                                                            formInheritanceFieldNames.filter(
                                                                (fieldName) => fieldName !== name
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <i className="fa-solid fa-minus" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button
                                className="button inheritance"
                                onClick={() => {
                                    if (formInheritanceClassName.length === 0) {
                                        toast.error("parent's class name is not given");
                                        return;
                                    }
                                    onChange({
                                        ...setting,
                                        inheritanceClass: {
                                            name: formInheritanceClassName,
                                            properties: formInheritanceFieldNames.map((field) => ({
                                                name: field,
                                                dataType: "varchar",
                                            })),
                                        },
                                    });
                                }}
                            >
                                SAVE
                            </button>
                        </div>
                    </Column>
                </Columns>
            </article>
        </Modal>
    );
}
