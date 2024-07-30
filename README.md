# Tradingview Style Nifty 50 Heatmap Visualization

![Nifty 50 Heatmap](https://www.marketcalls.in/wp-content/uploads/2024/07/Screenshot-2024-07-30-at-9.47.32 PM.png)

## Description

This project provides a dynamic and interactive heatmap visualization of the Nifty 50 stocks using Highcharts and Flask. The heatmap displays stock performance with box sizes representing market capitalization and colors indicating percentage changes.

## Features

- Real-time data fetching from Yahoo Finance
- Interactive treemap heatmap visualization
- Box sizes based on market capitalization
- Color coding based on stock price percentage change
- Responsive design for various screen sizes
- Tooltip with detailed stock information

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/marketcalls/highcharts-heatmap.git
   cd highcharts-heatmap
   ```

2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

4. Ensure you have a `symbols.csv` file in the root directory with the Nifty 50 stock symbols.

## Usage

1. Run the Flask application:
   ```
   python app.py
   ```

2. Open a web browser and navigate to `http://localhost:5000`

3. The heatmap will load, displaying the Nifty 50 stocks. Hover over boxes for more details.

## Configuration

- Modify `symbols.csv` to change the list of stocks displayed.
- Adjust the color scheme in `index.html` by modifying the `colorStops` array.
- Customize the data fetching interval in `app.py` by changing the `timedelta` value.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any queries or suggestions, please open an issue on this repository.

## Acknowledgements

- [Highcharts](https://www.highcharts.com/)
- [Flask](https://flask.palletsprojects.com/)
- [yfinance](https://github.com/ranaroussi/yfinance)

---

Created by [marketcalls](https://github.com/marketcalls)
