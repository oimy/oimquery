import { useState } from "react";
import { Table } from "../../tools/drawio/models/table";
import { KotlinEntityOption } from "../../tools/format/KotlinFormatter";
import ClassPreview from "./components/ClassPreview";
import MakeButton from "./components/MakeButton";

export default function Kotlin() {
    const [table, setTable] = useState<Table>();
    const [isShowResult, setIsShowResult] = useState<boolean>(false);

    const [option, setOption] = useState<KotlinEntityOption>({
        pluralRemovalCount: 1,
        ignoreNames: ["srl", "createdBy", "createdAt", "modifiedBy", "modifiedAt"],
        inheritanceClass: {
            name: "BaseEntity",
            properties: [{ name: "createdBy", dataType: "varchar(20)" }],
        },
    });

    function renderResults() {
        return <ClassPreview table={table} option={option} />;
    }

    return (
        <section className="container kotlin">
            <MakeButton
                setOption={setOption}
                onGenerate={(table: Table) => {
                    setTable(table);
                    setIsShowResult(true);
                }}
                onFail={() => setIsShowResult(false)}
            />
            {renderResults()}
        </section>
    );
}
