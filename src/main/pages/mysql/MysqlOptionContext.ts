import { createContext } from "react";

export interface MysqlOption {
    isShowTablePreview: boolean;
    isShowQueryPreview: boolean;
    isShowQueryStat: boolean;
    isCopyOnGenerate: boolean;
    isShowClipboardHint: boolean;
}

const DEFAULT_DRAWIO_OPTION = {
    isShowTablePreview: true,
    isShowQueryPreview: true,
    isShowQueryStat: true,
    isCopyOnGenerate: true,
    isShowClipboardHint: true,
};

const DRAWIO_OPTION_KEY = "DRAWIO_OPTION";

export const saveDrawioOption = (option: MysqlOption) => {
    localStorage.setItem(DRAWIO_OPTION_KEY, JSON.stringify(option));
};

export const loadDrawioOption = (): MysqlOption => {
    const savedDrawioOption = localStorage.getItem(DRAWIO_OPTION_KEY);
    if (savedDrawioOption) {
        return JSON.parse(savedDrawioOption);
    }
    return DEFAULT_DRAWIO_OPTION;
};

export const MysqlOptionContext = createContext<MysqlOption>(loadDrawioOption());
