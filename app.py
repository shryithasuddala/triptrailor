from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = []

# ---------------- SIGNUP ----------------
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json

    for user in users:
        if user["email"] == data["email"]:
            return jsonify({"error": "User already exists"}), 400

    users.append(data)
    return jsonify({"message": "User registered successfully"})


# ---------------- LOGIN ----------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    for user in users:
        if user["email"] == data["email"] and user["password"] == data["password"]:
            return jsonify({"message": "Login successful"})

    return jsonify({"error": "Invalid credentials"}), 401


# ---------------- PLAN TRIP ----------------
@app.route("/plan-trip", methods=["POST"])
def plan_trip():
    data = request.json

    budget = data.get("budget", 0)
    days = data.get("days", 1)

    # Dummy itinerary
    places = ["Charminar", "Golconda Fort", "Ramoji Film City", "Birla Mandir"]

    def generate_itinerary(d):
        itinerary = []
        index = 0
        for i in range(d):
            day = []
            for _ in range(2):
                if index < len(places):
                    day.append(places[index])
                    index += 1
            itinerary.append(day)
        return itinerary

    # Create plans
    plans = {
        "fast": {
            "itinerary": generate_itinerary(max(1, days - 1)),
            "total_cost": budget,
            "hotel": "Budget Hotel"
        },
        "balanced": {
            "itinerary": generate_itinerary(days),
            "total_cost": budget + 500,
            "hotel": "Comfort Stay"
        },
        "relaxed": {
            "itinerary": generate_itinerary(days + 1),
            "total_cost": budget + 1000,
            "hotel": "Luxury Hotel"
        }
    }

    return jsonify({
        "status": "success",
        "plans": plans
    })


if __name__ == "__main__":
    app.run(debug=True)