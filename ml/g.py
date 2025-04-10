from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# MongoDB connection
mongo_url = ""
client = MongoClient(mongo_url)
db = client["test"]  # Replace with your actual database name

# Collections
products_collection = db["products"]
orders_collection = db["orderhistories"]

# Google Gemini API Key
GEMINI_API_KEY = ""  #  Replace with your actual API key
genai.configure(api_key=GEMINI_API_KEY)

# FAQ stored in Python dictionary
faq_data = [
    {"question": "What is your return policy?", "answer": "You can return items within 30 days."},
    {"question": "How long does shipping take?", "answer": "Shipping usually takes 3-5 business days."},
    {"question": "Do you offer international shipping?", "answer": "Yes, we ship worldwide."},
    {"question": "How can I track my order?", "answer": "You will receive a tracking number via email once your order ships."}
]

# Helper function to find matching FAQ
def get_faq_answer(user_input):
    for faq in faq_data:
        if user_input.lower() in faq["question"].lower():
            return faq["answer"]
    return None

@app.route("/chatbot", methods=["POST"])
def chatbot():
    user_input = request.json.get("message")

    # Check FAQ
    faq_answer = get_faq_answer(user_input)
    if faq_answer:
        return jsonify({"reply": faq_answer})

    # Check product-related queries
    product = products_collection.find_one({"name": {"$regex": user_input, "$options": "i"}})
    if product:
        return jsonify({"reply": f"{product['name']} costs ${product['price']} and is in stock: {product['stockCount']} units."})

    # Check order status
    if "order" in user_input.lower():
        order = orders_collection.find_one({"orderData.user": {"$regex": user_input, "$options": "i"}})
        if order:
            return jsonify({"reply": f"Your order {order['orderData']['order_id']} is currently {order['orderData']['status']}."})
        return jsonify({"reply": "I couldn't find your order. Please check your order ID."})

    # Use Google's Gemini API for other queries
    try:
        model = genai.GenerativeModel("gemini-pro")  # Using the latest model
        response = model.generate_content(user_input)
        reply = response.text if response.text else "I'm sorry, I couldn't process your request."
    except Exception as e:
        print("Error:", e)
        reply = "I'm sorry, I couldn't process your request at the moment."

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
