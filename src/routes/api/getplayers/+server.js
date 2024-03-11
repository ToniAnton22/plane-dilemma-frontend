import { DB_HOST } from "$env/static/private";

// Define the GET request handler
export async function GET() {
    // Recursive function to attempt fetching data with retries
    async function dataFetch(retries = 3, delay =6000) {
        try {
            const response = await fetch(`${DB_HOST}players`);
           
            
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
            const players = await response.json();

            // Handle undefined or empty responses
            if (!players) {
                return new Response("No players found", { status: 404 });
            }

            // Successfully retrieved and parsed players data
      
            return new Response(JSON.stringify(players), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            // Handle fetch errors (e.g., network issues, invalid DB_HOST)

            console.error("Fetch error:", error);
            return new Response("Error fetching players data", { status: 500 });
        }
    }

    // Initiate the data fetch with retries
    return await dataFetch();
}
