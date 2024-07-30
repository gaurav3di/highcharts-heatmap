from flask import Flask, render_template, jsonify
import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta
import concurrent.futures
import csv

app = Flask(__name__)

def load_symbols():
    with open('symbols.csv', 'r') as f:
        reader = csv.reader(f)
        next(reader)  # Skip the header
        return [row[0] for row in reader]

nifty50_symbols = load_symbols()

def get_stock_data(symbol):
    try:
        ticker = yf.Ticker(f"{symbol}.NS")
        info = ticker.info
        market_cap = info.get('marketCap', 0)
        
        end_date = datetime.now()
        start_date = end_date - timedelta(days=5)
        history = ticker.history(start=start_date, end=end_date)
        
        if len(history) >= 2:
            latest_price = history['Close'].iloc[-1]
            previous_price = history['Close'].iloc[-2]
            change_percent = ((latest_price - previous_price) / previous_price) * 100
            
            return {
                'name': f"{symbol}|{latest_price:.2f}|{change_percent:.2f}%",
                'value': float(market_cap),
                'colorValue': float(change_percent),
                'image': f'/static/images/nifty50_icons/{symbol}.svg'
            }
        else:
            print(f"Not enough data for {symbol}")
            return None
    except Exception as e:
        print(f"Error processing {symbol}: {e}")
        return None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_data')
def get_data():
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        results = list(executor.map(get_stock_data, nifty50_symbols))
    
    results = [r for r in results if r is not None]
    results.sort(key=lambda x: x['value'], reverse=True)  # Sort by market cap

    print("Final results:", results)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)