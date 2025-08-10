import { createContext } from "react";
import { KotlinEntityInheritanceClass } from "../../tools/format/KotlinEntityClassFormatter";

export interface KotlinSetting {
    isCopyOnClick: boolean;
    isShowClipboardHint: boolean;
    pluralRemovalCount: number;
    ignoreNames: string[];
    inheritanceClass?: KotlinEntityInheritanceClass;
}

const DEFAULT_KOTLIN_SETTING = {
    isCopyOnClick: true,
    isShowClipboardHint: true,
    pluralRemovalCount: 0,
    ignoreNames: [],
    inheritanceClass: undefined,
};

const KOTLIN_SETTING_KEY = "KOTLIN_SETTING";

export const saveKotlinSetting = (option: KotlinSetting) => {
    localStorage.setItem(KOTLIN_SETTING_KEY, JSON.stringify(option));
};

export const loadKotlinSetting = (): KotlinSetting => {
    const savedDrawioOption = localStorage.getItem(KOTLIN_SETTING_KEY);
    if (savedDrawioOption) {
        return JSON.parse(savedDrawioOption);
    }
    return DEFAULT_KOTLIN_SETTING;
};

export const KotlinSettingContext = createContext<KotlinSetting>(loadKotlinSetting());
