import { useCallback, useEffect, useRef, useState } from "react";
import BASE_URL from "../util/constant";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHTTPRequest = useRef([]);

    // UseCallback hook is used to create any method for only one time. Like Standalone function.
    //  just prevents the infinite loop of creating the method every time.
    const sendRequest = useCallback(
        async (url, method = "GET", body = null, headers = {}) => {
            setIsLoading(true);

            //AbortController can use to abort the http request.
            const httpAbortController = new AbortController();
            activeHTTPRequest.current.push(httpAbortController);
            try {
                const response = await fetch(`${BASE_URL}${url}`, {
                    method,
                    body,
                    headers,
                    signal: httpAbortController.signal,
                });

                const responseData = await response.json();

                activeHTTPRequest.current = activeHTTPRequest.current.filter(
                    (reqCtrl) => reqCtrl !== httpAbortController
                );

                if (!response.ok) throw new Error(responseData.message);
                return responseData;
            } catch (err) {
                setError(err.message);
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );
    const clearError = () => setError(null);

    // Clean Up function when the abort controller is done the task.
    // when useeffect is return a  function at that time that function is called clean up function.
    useEffect(() => {
        return () => {
            activeHTTPRequest.current.forEach((abortCtrl) => abortCtrl.abort());
        };
    }, []);

    return { sendRequest, isLoading, error, clearError };
};
