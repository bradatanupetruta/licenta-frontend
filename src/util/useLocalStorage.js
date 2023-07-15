import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function useLocalState(defaultValue, key) {
    const [value, setValue] = useState(() => {
        const localStorageValue = localStorage.getItem(key);

        return localStorageValue !== null
            ? JSON.parse(localStorageValue)
            : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

function useEvaluationToNavigation() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!hasValueForKey("user")) {
            navigate("/");
        }
    }, [navigate]);
}

function hasValueForKey(key) {
    const localStorageValue = localStorage.getItem(key);
    const parsedValue = localStorageValue !== null ? JSON.parse(localStorageValue) : null;

    if (!!parsedValue && Object.keys(parsedValue).length > 0) {
        return true;
    }
    return false;
}

function getValueForKey(key) {
    if (hasValueForKey(key)) {
        return JSON.parse(localStorage.getItem(key));
    }
    return null;
}

export {useLocalState, useEvaluationToNavigation, getValueForKey};