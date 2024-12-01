# Real-Time Cryptocurrency Tracker

![Crypto Tracker](https://via.placeholder.com/1200x300.png?text=Real-Time+Cryptocurrency+Tracker)

## Overview

The **Real-Time Cryptocurrency Tracker** is a single-page web application (SPA) that allows users to view, sort, and compare cryptocurrencies in real-time using data fetched from the [CoinGecko API](https://www.coingecko.com/en/api). This project showcases a professional and user-friendly design with interactive features, ensuring a seamless user experience.

---

## Features

### 🔍 **Cryptocurrency Listing**

- Displays a table of the top cryptocurrencies, including:
  - **Logo**: A visual representation of each cryptocurrency.
  - **Name and Symbol**: To easily identify coins.
  - **Current Price**: Real-time USD prices.
  - **24-Hour Change**: Percentage change in price over the last 24 hours (color-coded for gain/loss).
  - **Market Cap**: Total market capitalization.
- Dynamic sorting by market cap to identify leading cryptocurrencies.

---

### 📊 **Comparison Section**

- Users can select up to **5 cryptocurrencies** for comparison.
- Each comparison card displays:
  - Coin **logo**, **name**, and **symbol**.
  - Current **price** and **24-hour price change** (with color-coded indicators).
- Cards are displayed in a responsive **grid layout**, ensuring usability across all devices.
- Users can remove coins from the comparison list, with updates persisting via **local storage**.

---

### 🛠️ **Preferences**

- **Sort by Market Cap**: A one-click button to reorder the cryptocurrency table by descending market cap.
- **Persistent Preferences**: Selected comparison coins are saved in local storage and restored automatically upon revisiting the app.

---

## Technologies Used

### 🖥️ **Frontend**

- **HTML5**: Semantic structure for the application.
- **CSS3 (via Tailwind CSS)**: A modern, responsive, and utility-first styling framework.
- **JavaScript (jQuery)**: For dynamic data fetching, DOM manipulation, and interactivity.

### 🔗 **API Integration**

- **[CoinGecko API](https://www.coingecko.com/en/api)**:
  - Provides real-time data for cryptocurrencies.
  - Free tier with generous limits for seamless integration.

### 💾 **Local Storage**

- Persistent comparison list and user preferences using the browser's local storage API.

---

## Installation and Setup

### Prerequisites

- A browser with JavaScript enabled.
- Basic knowledge of Git and GitHub for deployment (optional).

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
