# Weather application - JavaScript

A minimalist Weather web application, crafted with pure JavaScript, offers real-time weather updates based on user location or input. It fetches data from a reliable API, providing current conditions, forecasts, and interactive features for a seamless weather tracking experience.

## Description

The user-friendly and feature-rich JavaScript-based Weather web application was created to offer users precise and up-to-date weather information. This application provides a comprehensive and seamless weather tracking experience by utilizing the strength of two well-known APIs, OpenCage for reverse geocoding and OpenWeatherData for weather data retrieval.

**Location Accuracy with OpenCage API**

The application's foundation is made of the reverse geocoding-focused OpenCage API. The process of converting geographic coordinates (latitude and longitude) into location data that can be read by humans, such as city names, postal codes, and country names, is known as reverse geocoding. Users can easily enter their desired location using this capability, whether it be a city, landmark, or even just GPS coordinates. The OpenCage API guarantees accurate and trustworthy location data in addition to improving user convenience.

**The OpenWeatherData API provides real-time weather updates**

The program seamlessly integrates with the OpenWeatherData API to offer users up-to-date weather reports and forecasts. A wide range of meteorological data, including temperature, humidity, wind speed, atmospheric pressure, and more, are available through this API. Users have access to up-to-date weather data for the area they have chosen, ensuring that they are always ready for any changes in the weather.

**User-Friendly User Interface**

The program has a simple and eye-catching user interface. Users are welcomed by the app's clean, responsive, and user-friendly design as soon as they launch it. Users can enter their desired location into a search bar, and the application quickly locates it using the OpenCage API and the input. The OpenWeatherData API then retrieves the most recent weather information for that location and presents it in a clear manner.

**Comprehensive Weather Data**

Users can anticipate having access to a wealth of weather data. Current weather information is provided by the app, including temperature, humidity, wind speed, and more.

In conclusion, this JavaScript-based Weather web application is a strong and user-focused tool that makes use of the OpenCage API for accurate location data and the OpenWeatherData API for thorough weather updates. It is a useful tool for people who want to stay informed about the weather in their area or any other location of their choice because of its user-friendly interface, accurate data, and customizable features. 

## Features

- Built with vanilla JavaScript
- [Tailwind](https://tailwindcss.com/)
- [Feather Icons](https://feathericons.com/)
- [Parcel](https://parceljs.org/)
- [OpenCage API](https://opencagedata.com/)
- [OpenWeatherData API](https://openweathermap.org/)
## Getting Started

### Prerequisites

The only prerequisites you need to have in place are [Node.js](https://nodejs.org/en) and [Visual Studio Code](https://code.visualstudio.com/) (VS Code).

Furthermore, to unlock the full functionality of the application, you'll need to obtain API secret keys from two essential sources:

1. **OpenCage API**: Navigate to [OpenCage API](https://opencagedata.com/) and sign up for an API key. This key is essential for enabling precise reverse geocoding, allowing the application to convert coordinates into human-readable location information and vice-versa.
2. **OpenWeatherData API**: Head over to [OpenWeatherData API](https://openweathermap.org/) and create an account to acquire an API key. This key will grant you access to a wealth of weather data, including current conditions and forecasts, empowering the application to provide real-time weather updates.

The next step is to incorporate the secret keys into your project for seamless functionality after you have successfully obtained them from the OpenCage API and OpenWeatherData API. What you must do is as follows:

1. Copy `.env.example` to `.env`
2. Edit `.env` file: There are placeholders for the API keys inside the file. Put the actual API keys you got from OpenCage and OpenWeatherData in these placeholders.
```env
OPENGATE_API_KEY=your_opencage_api_key_here
OPENWEATHER_API_KEY=your_openweather_api_key_here
```


### Installation

To ensure a smooth setup process, it is essential to follow step-by-step the installation instructions.

```sh
# Install packages
npm install

# Run in dev mode
npm run dev

# Run in prod mode
# npm run serve
```
