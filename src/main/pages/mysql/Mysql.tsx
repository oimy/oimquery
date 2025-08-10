import { useState } from "react";
import { Table } from "../../tools/drawio/models/table";
import "./Mysql.scss";
import { loadMysqlSetting, MysqlSetting, MysqlSettingContext } from "./MysqlSettingContext";
import GenerateButton from "./components/GenerateButton";
import QueryPreview from "./components/QueryPreview";
import QueryStat from "./components/QueryStat";
import TablePreview from "./components/TablePreview";

export default function Mysql() {
    const [table, setTable] = useState<Table>();
    const [isShowResult, setIsShowResult] = useState<boolean>(false);

    const [option, setOption] = useState<MysqlSetting>(loadMysqlSetting());

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
            <div className={`generate-results ${isShowResult ? "show" : "hide"}`}>
                {option.isShowTablePreview && <TablePreview table={table} />}
                {renderQuery()}
            </div>
        );
    }

    return (
        <MysqlSettingContext.Provider value={option}>
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
        </MysqlSettingContext.Provider>
    );
}
