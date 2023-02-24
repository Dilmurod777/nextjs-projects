import {useContext, useEffect, useState} from "react";
import {fallback} from "google-gax";
import {EmailContext} from "@/utils/context";

export function useLocalStorage<T>(key: string, fallbackValue: T) {
    const [value, setValue] = useState(fallbackValue);
    useEffect(() => {
        const email = localStorage.getItem(key);
        setValue(email as T || fallbackValue);
    }, [fallbackValue, key]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}

export function useEmail() {
    return useLocalStorage<string>('email', '');
}

export function useEmailContext() {
    return useContext(EmailContext)
}