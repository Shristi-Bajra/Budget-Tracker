import { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb: (...args: any[]) => Promise<any>) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const fn = async(...args: any[]) => {
        setLoading(true);
        setError(null)
        try {
            const response = await cb(...args);
            setData(response)
            setError(null);
        } catch (error) {
            setError(error as any);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };
    return {data, loading, error,fn, setData};
};

export default useFetch