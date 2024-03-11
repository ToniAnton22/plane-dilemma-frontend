import { DB_HOST } from "$env/static/private";

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    // Recursive function to attempt fetching data with retries
    async function dataFetch(retries = 3, delay =6000) {
        try {
            const response = await fetch(`${DB_HOST}summary`);

            // Check if the database returned a "502 Bad Gateway" status
            if (response?.status == 502 || response?.status == 504 || response?.status==500) {
                // If retries are exhausted, return a 502 response
                if (retries <= 0) {
                    return new Response("Database not responsive", { status: 502 });
                }

                // Wait for the specified delay before retrying
                await new Promise(resolve => setTimeout(resolve, delay));
                
                // Recursively call dataFetch with decremented retries
                return dataFetch(retries - 1, delay);
            }

            // Attempt to parse the JSON response
            const summaries = await response.json();

            // Handle undefined or empty responses
            if (!summaries) {
                return new Response("No summaries found", { status: 404 });
            }

            // Successfully retrieved and parsed summaries data
            return new Response(JSON.stringify(summaries), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            // Handle fetch errors (e.g., network issues, invalid DB_HOST)
            console.error("Fetch error:", error);
            return new Response("Error fetching summaries data", { status: 500 });
        }
    }

    // Initiate the data fetch with retries
    return await dataFetch();
}