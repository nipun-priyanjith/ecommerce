from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from sklearn.decomposition import TruncatedSVD
import pandas as pd
import numpy as np

# Initialize Flask app  hellow
app = Flask(__name__)
CORS(app)

# MongoDB connection URL
mongo_url = ""

# Connect to MongoDB
client = MongoClient(mongo_url)

# Database and Collections
db = client["test"]
users_collection = db["users"]
order_histories_collection = db["orderhistories"]
user_searches_collection = db["usersearches"]
products_collection = db["products"]

# Function to fetch user-product interactions
def fetch_user_product_interactions():
    # Get all orders and user-product interactions
    orders = order_histories_collection.find()
    interactions = []

    for order in orders:
        user_id = str(order["orderData"]["user"])  # Extract user_id
        for item in order["orderData"]["cartItems"]:
            product_id = str(item["pid"])  # Extract product_id
            interactions.append({"user_id": user_id, "product_id": product_id, "rating": 1})  # Use '1' as a purchase indicator

    return pd.DataFrame(interactions)

# Function to train the recommendation model (SVD)
def train_model():
    interactions_df = fetch_user_product_interactions()

    # Create a user-item interaction matrix
    interaction_matrix = interactions_df.pivot_table(index="user_id", columns="product_id", values="rating", fill_value=0)

    # Dynamically adjust n_components based on the number of features
    n_components = min(20, interaction_matrix.shape[1])  # Ensure n_components <= number of products
    svd = TruncatedSVD(n_components=n_components)

    # Apply SVD (Singular Value Decomposition)
    svd_matrix = svd.fit_transform(interaction_matrix)

    # Save the SVD model and user-product matrix
    return svd, interaction_matrix


# Function to recommend products using SVD
def recommend_products(user_id, svd, interaction_matrix):
    # Get the index of the user in the interaction matrix
    user_idx = interaction_matrix.index.get_loc(user_id)

    # Get the user vector
    user_vector = svd.components_[:, user_idx]

    # Compute the similarity scores with all other products
    product_scores = np.dot(svd.components_.T, user_vector)

    # Sort the products by score
    product_indices = np.argsort(product_scores)[::-1]

    recommended_products = []
    for idx in product_indices[:10]:  # Top 10 products
        product_id = interaction_matrix.columns[idx]
        product = products_collection.find_one({"_id": ObjectId(product_id)})
        if product:
            recommended_products.append({
                "id": str(product["_id"]),
                "name": product["name"],
                "category": product["category"],
                "price": product["price"],
                "description": product["description"],
                "stockCount": product.get("stockCount", 0),
                "images": product.get("images", []),
                "colors": product.get("colors", []),
                "availableSize": product.get("availableSize", []),
                "rating": product.get("rating", 0)
            })

    return recommended_products

# Route to get recommendations
@app.route("/recommend/<user_id>", methods=["GET"])
def get_recommendations(user_id):
    try:
        print(f"Fetching recommendations for user: {user_id}")  # Debug log to track the user_id

        # Train the model (SVD)
        svd, interaction_matrix = train_model()

        print("Model trained successfully.")  # Debug log after training

        # Get recommendations for the user
        recommendations = recommend_products(user_id, svd, interaction_matrix)

        if not recommendations:
            print("No recommendations found.")  # Debug log if no recommendations
            return jsonify({"error": "No recommendations found"}), 404

        print(f"Found {len(recommendations)} recommendations.")  # Debug log showing the number of recommendations
        return jsonify({"recommendations": recommendations}), 200

    except Exception as e:
        print(f"Error occurred: {e}")  # Log the actual error
        return jsonify({"error": str(e)}), 500


# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
