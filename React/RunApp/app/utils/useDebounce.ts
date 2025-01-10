import { useState, useEffect } from "react"

export default function useDebounce<T>(value: T, id: string,  delay: number = 500){
    const [debounceValue, setDebounceValue] = useState<T>(value);
    const [debounceId, setDebounceId] = useState<string>(id);
    const [actionTrigger, setActionTrigger] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value);
            setDebounceId(id);
            setActionTrigger(true);
        }, delay);

        return () => clearTimeout(timer);
    } , [value, id, delay])

    return {debounceValue, debounceId, actionTrigger};
}