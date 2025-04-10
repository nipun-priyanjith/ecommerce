from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
# Initialize Flask app
app = Flask(__name__)
# MongoDB connection URL
CORS(app)
mongo_url = ""

# Connect to MongoDB
client = MongoClient(mongo_url)

# Database and Collections
db = client["test"]  # Replace "test" with your actual database name
users_collection = db["users"]
order_histories_collection = db["orderhistories"]
user_searches_collection = db["usersearches"]
products_collection = db["products"]

# Recommendation logic
def recommend_products(user, all_products):
    recommendations = []

    for product in all_products:
        product_score = 0

        # Check favorite categories
        product_categories = product.get("category", [])
        if isinstance(product_categories, str):
            product_categories = [product_categories]
        product_score += len(set(product_categories) & set(user["favorite_categories"]))

        # Check if product matches user hobbies
        product_score += len(set(product_categories) & set(user["hobbies"]))

        # Boost score for previously searched products
        if str(product["_id"]) in user["search_product_ids"]:
            product_score += 3

        # Boost score for previously ordered products
        if str(product["_id"]) in user["ordered_product_ids"]:
            product_score += 2

        # Append product with its score
        recommendations.append((product, product_score))

    # Sort recommendations by score (highest first)
    recommendations.sort(key=lambda x: x[1], reverse=True)
    return recommendations

# Route to get recommendations
@app.route("/recommend/<user_id>", methods=["GET"])
def get_recommendations(user_id):
    try:
        # Fetch user data
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404

        favorite_categories = user.get("favorite_categories", [])
        hobbies = user.get("hobbies", [])

        # Fetch order histories
        order_histories = order_histories_collection.find({"orderData.user": ObjectId(user_id)})
        ordered_product_ids = []
        for order in order_histories:
            cart_items = order.get("orderData", {}).get("cartItems", [])
            for item in cart_items:
                ordered_product_ids.append(str(item.get("pid", "")))

        # Fetch user searches
        user_search = user_searches_collection.find_one({"user_id": ObjectId(user_id)})
        search_product_ids = []
        if user_search:
            search_product_ids = [str(prod_id) for prod_id in user_search.get("related_products_ids", [])]

        # Fetch all products
        all_products = list(products_collection.find())

        # User preferences
        user_preferences = {
            "favorite_categories": favorite_categories,
            "hobbies": hobbies,
            "search_product_ids": search_product_ids,
            "ordered_product_ids": ordered_product_ids
        }

        # Get recommendations
        recommendations = recommend_products(user_preferences, all_products)

        # Prepare response with all product data
        recommended_products = [
            {
                "id": str(product["_id"]),  # Convert ObjectId to string
                "name": product["name"],
                "category": product["category"],
                "price": product["price"],
                "description": product["description"],
                "stockCount": product.get("stockCount", 0),
                "images": product.get("images", []),
                "colors": product.get("colors", []),
                "availableSize": product.get("availableSize", []),
                "rating": product.get("rating", 0),
                "score": score
            }
            for product, score in recommendations[:10]  # Limit to top 10 recommendations
        ]

        return jsonify({"recommendations": recommended_products}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    #app.run(debug=True)
    app.run(debug=True, host="0.0.0.0", port=5001)
