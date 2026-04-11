def create_plan(places, hotels, transport, days):
    max_places = days * 2
    selected = places[:max_places]

    itinerary = []
    idx = 0

    for d in range(days):
        day_plan = []
        for _ in range(2):
            if idx < len(selected):
                day_plan.append(selected[idx]["name"])
                idx += 1
        itinerary.append(day_plan)

    total_cost = 1000 * days

    return {
        "itinerary": itinerary,
        "total_cost": total_cost,
        "hotel": "Budget Stay",
        "explanation": f"Plan for {days} days covering top places"
    }


def generate_plan(data, budget, days, travel_type):
    places = sorted(data["places"], key=lambda x: x["rating"], reverse=True)

    fast_days = max(1, days - 2)
    balanced_days = days
    relaxed_days = days + 2

    return {
        "plans": {
            "fast": create_plan(places, [], [], fast_days),
            "balanced": create_plan(places, [], [], balanced_days),
            "relaxed": create_plan(places, [], [], relaxed_days),
        },
        "recommended_plan": "balanced"
    }