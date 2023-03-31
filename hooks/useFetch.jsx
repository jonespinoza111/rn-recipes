import { useState, useEffect } from "react";

const useFetch = (url, opts) => {
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    useEffect(() => {
        console.log('this is the url for this one', url);
        setLoading(true)
        fetch(url, opts)
            .then(res => {
                return res.json()
            })
            .then((res) => {
                console.log('this is the res, ', res);
                if (res) {
                    console.log('Hello i just got the results back now');
                    let recipes = [res];
                    setResponse(response => response.concat(recipes));
                    setLoading(false);
                } else {
                    throw Error;
                }
            })
            .catch((err) => {
                setHasError(true)
                console.log('This is the searchError on here right now', err)
                setLoading(false)
            })
    }, [ url ])
    return [ response, loading, hasError ]
}

export default useFetch;