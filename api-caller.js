export async function getWeatherData(location) {
  try {
    const { latitude, longitude, hourly = "temperature_2m" } = await getCoordinates(location);
    const params = {
      latitude: latitude,
      longitude: longitude,
      hourly: hourly,
    };
    const url = "https://api.open-meteo.com/v1/forecast?latitude=" + params.latitude + "&longitude=" + params.longitude + "&hourly=" + params.hourly + "&current_weather=true";
    const responsesData = await fetch(url);
    const responses = await responsesData.json();

    if (responses && responses.current_weather) {
      return responses.current_weather;
    } else {
      throw new Error("Invalid response from weather API");
    }
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}
async function getCoordinates(location) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data && data.results && data.results.length > 0) {
    return {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
    };
  } else {
    throw new Error("Location not found");
  }
}