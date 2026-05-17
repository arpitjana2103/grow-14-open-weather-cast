export default function sleepQuery(ms: number, signal?: AbortSignal) {
    return new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(resolve, ms);

        signal?.addEventListener("abort", () => {
            clearTimeout(timeout);
            reject(new Error("Aborted"));
        });
    });
}
