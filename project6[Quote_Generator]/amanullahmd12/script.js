// Function to fetch a random quote from the Quotable API
async function fetchRandomQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();

        if (response.ok) {
            const randomQuote = `${data.content} - ${data.author}`;
            document.getElementById("quote").textContent = randomQuote;
        } else {
            throw new Error(`Failed to fetch data: ${data.message}`);
        }
    } catch (error) {
        console.error(error);
        document.getElementById("quote").textContent = "Failed to fetch a quote. Please try again later.";
    }
}


function copyText() {
    let quote = document.getElementById("quote").textContent;
    navigator.clipboard.writeText(quote);
    document.getElementById("copy-quote"). textContent = "text copied";
    setTimeout(() => {
        document.getElementById("copy-quote"). textContent = "Copy Quote";
    }, 1000);
    
}

// Attach the event listener to the button
document.getElementById("generate").addEventListener("click", fetchRandomQuote);
// Attach the event listener to the copy button
document.getElementById("copy-quote").addEventListener("click", copyText);

// Initial quote fetch
fetchRandomQuote();
