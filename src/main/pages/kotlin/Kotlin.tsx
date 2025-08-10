import { useState } from "react";
import { Table } from "../../tools/drawio/models/table";
import ClassPreview from "./components/EntityClassPreview";
import MakeButton from "./components/MakeButton";
import { KotlinSetting, KotlinSettingContext, loadKotlinSetting } from "./KotlinSettingContext";

export default function Kotlin() {
    const [table, setTable] = useState<Table>();
    const [isShowResult, setIsShowResult] = useState<boolean>(false);

    const [setting, setSetting] = useState<KotlinSetting>(loadKotlinSetting());

    function renderResults() {
        return <ClassPreview table={table} />;
    }

    return (
        <KotlinSettingContext.Provider value={setting}>
            <section className="container kotlin">
                <MakeButton
                    setSetting={setSetting}
                    onGenerate={(table: Table) => {
                        setTable(table);
                        setIsShowResult(true);
                    }}
                    onFail={() => setIsShowResult(false)}
                />
                {isShowResult && renderResults()}
            </section>
        </KotlinSettingContext.Provider>
    );
}
