import { useState, useCallback } from "react";

const useCookie = (name: string, defaultValue?: any) => {
    const [value, setValue] = useState(() => {
        const cookie = window.localStorage.getItem(name)
        if (cookie) return cookie
        window.localStorage.setItem(name, defaultValue)
        return defaultValue
    })

    const updateCookie = useCallback(
        (newValue: any) => {
            window.localStorage.setItem(name, newValue)
            setValue(newValue)
        },
        [name]
    )

    const deleteCookie = useCallback(() => {
        window.localStorage.removeItem(name)
        setValue(null)
    }, [name])

    return [value, updateCookie, deleteCookie]
}

export default useCookie;