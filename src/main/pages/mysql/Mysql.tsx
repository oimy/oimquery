import { useState } from "react";
import { Table } from "../../components/toast/models/table";
import "./Mysql.scss";
import { loadDrawioOption, MysqlOption, MysqlOptionContext } from "./MysqlOptionContext";
import GenerateButton from "./components/GenerateButton";
import QueryPreview from "./components/QueryPreview";
import QueryStat from "./components/QueryStat";
import TablePreview from "./components/TablePreview";

export default function Mysql() {
    const [table, setTable] = useState<Table>();
    const [isShowResult, setIsShowResult] = useState<boolean>(false);

    const [option, setOption] = useState<MysqlOption>(loadDrawioOption());

    function renderQuery() {
        if (option.isShowQueryPreview && option.isShowQueryStat) {
            return (
                <div className="columns">
                    <div className="column two-third">
                        <QueryPreview table={table} />
                    </div>
                    <div className="column one-third">
                        <QueryStat table={table} />
                    </div>
                </div>
            );
        }
        if (option.isShowQueryPreview) {
            return <QueryPreview table={table} />;
        }
        if (option.isShowQueryStat) {
            return <QueryStat table={table} />;
        }
        return;
    }

    function renderResults() {
        return (
            <div className={`generate-result ${isShowResult ? "show" : "hide"}`}>
                {option.isShowTablePreview && <TablePreview table={table} />}
                {renderQuery()}
            </div>
        );
    }

    return (
        <MysqlOptionContext.Provider value={option}>
            <section className="container mysql">
                <GenerateButton
                    setOption={setOption}
                    onGenerate={(table: Table) => {
                        setTable(table);
                        setIsShowResult(true);
                    }}
                    onFail={() => setIsShowResult(false)}
                />
                {renderResults()}
            </section>
        </MysqlOptionContext.Provider>
    );
}
