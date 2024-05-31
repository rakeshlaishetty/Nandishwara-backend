// Function to generate a random review from the first three reviews
function generateReview() {
    const reviews = [
        "Great product!",
        "Highly recommended!",
        "Best purchase ever!",
        "Could be better.",
        "Not satisfied with the quality.",
        "Average product.",
        "Excellent service!",
        "Wouldn't buy again."
    ];

    // Select a random index from the first three indexes
    const randomIndex = Math.floor(Math.random() * 3); // Random number between 0 and 2

    // Get the review at the selected index
    return reviews[randomIndex];
}

module.exports = generateReview