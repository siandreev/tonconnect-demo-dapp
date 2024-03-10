import {useEffect, useState} from "react";
import {Locales, THEME, useTonConnectUI} from "@tonconnect/ui-react";

export const Settings = () => {
    const [lang, setLang] = useState('en');
    const [theme, setTheme] = useState(THEME.DARK);
    const [_, setOptions] = useTonConnectUI();

    useEffect(() => {
        setOptions({
            language: lang as Locales
        })
    }, [setOptions, lang]);

    useEffect(() => {
        setOptions({
            uiPreferences: {
                theme
            }
        })
    }, [setOptions, theme]);

    return <div>
        Settings
        <select value={lang} onChange={e => setLang(e.target.value)}>
            <option value="ru">ru</option>
            <option value="en">en</option>
        </select>

        <select value={theme} onChange={e => setTheme(e.target.value as THEME)}>
            <option value={THEME.DARK}>DARK</option>
            <option value={THEME.LIGHT}>LIGHT</option>
        </select>
    </div>
}
