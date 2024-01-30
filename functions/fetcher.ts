// How does fetcher function work?
// 1. Create constant variable named fetcher.
// 2. Call fetch function with url.
// 3. Read HTTP Response as JSON.
//const fetcher = (...args) => fetch(...args).then(res => res.json())
const fetcher = async (url: string) => {
    const response = await fetch(url);

    return response.json();
}

export default fetcher;