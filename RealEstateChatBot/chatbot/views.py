import pandas as pd
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import google.generativeai as genai


@csrf_exempt
def analyze_area(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=400)

    query = request.POST.get("query")
    file = request.FILES.get("file")

    if not query:
        return JsonResponse({"error": "Query is required"}, status=400)

    if not file:
        return JsonResponse({"error": "Upload Excel file"}, status=400)

    # Load Excel using pandas
    df = pd.read_excel(file)

    # Extract last word from query as area
    place = query.lower().split()[-1]

    filtered = df[df["Area"].str.lower() == place]

    if filtered.empty:
        return JsonResponse({"error": "No data found for this area"}, status=404)

    # Chart data (sent to React)
    chart_data = {
        "years": filtered["Year"].tolist(),
        "price": filtered["Price"].tolist(),
        "demand": filtered["Demand"].tolist(),
    }

    # ---------- FREE AI VIA GEMINI ----------
    genai.configure(api_key=settings.GEMINI_API_KEY)

    model = genai.GenerativeModel("models/gemini-flash-lite-latest")  # 100% FREE

    prompt = f"""
    You are a real estate analyst.
    Create a clear, short 3–4 sentence market summary for **{place.upper()}**.

    Here is the dataset:
    {filtered.to_string(index=False)}

    Mention:
    - The price trend
    - Demand change
    - Possible investment potential
    """

    ai_response = model.generate_content(prompt)
    summary = ai_response.text

    # Final JSON response
    return JsonResponse({
        "summary": summary,
        "chart": chart_data,
        "table": filtered.to_dict(orient="records")
    })
