export async function readClipboardTextOrBlank(): Promise<string> {
    try {
        return await window.navigator.clipboard.readText();
    } catch (e) {
        return "";
    }
}

export async function safelyWriteToClipboard(text: string) {
    try {
        await window.navigator.clipboard.writeText(text);
    } catch (e) {}
}
