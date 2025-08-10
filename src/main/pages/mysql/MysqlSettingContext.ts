import { createContext } from "react";

export interface MysqlSetting {
    isShowTablePreview: boolean;
    isShowQueryPreview: boolean;
    isShowQueryStat: boolean;
    isCopyOnGenerate: boolean;
    isShowClipboardHint: boolean;
}

const DEFAULT_MYSQL_SETTING = {
    isShowTablePreview: true,
    isShowQueryPreview: true,
    isShowQueryStat: true,
    isCopyOnGenerate: true,
    isShowClipboardHint: true,
};

const MYSQL_SETTING_KEY = "MYSQL_SETTING";

export const saveMysqlSetting = (option: MysqlSetting) => {
    localStorage.setItem(MYSQL_SETTING_KEY, JSON.stringify(option));
};

export const loadMysqlSetting = (): MysqlSetting => {
    const savedDrawioOption = localStorage.getItem(MYSQL_SETTING_KEY);
    if (savedDrawioOption) {
        return JSON.parse(savedDrawioOption);
    }
    return DEFAULT_MYSQL_SETTING;
};

export const MysqlSettingContext = createContext<MysqlSetting>(loadMysqlSetting());
