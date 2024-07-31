const colorStops = [
    [-4, '#d35054'],
    [-3, '#d35054'],
    [-2, '#ff3e46'],
    [-1, '#ff656a'],
    [0, '#c5c3c3'],
    [1, '#6ecfa0'],
    [2, '#00904a'],
    [3, '#27A844'],
    [4, '#27A844']
];

const legendContainer = document.getElementById('legend');
colorStops.forEach(([value, color]) => {
    const item = document.createElement('span');
    item.className = 'legend-item';
    item.style.backgroundColor = color;
    item.textContent = value + '%';
    legendContainer.appendChild(item);
});

fetch('/get_data')
    .then(response => response.json())
    .then(data => {
        Highcharts.chart('container', {
            chart: {
                height: 800,
            },
            colorAxis: {
                stops: colorStops.map(([value, color]) => [((value + 4) / 8), color]),
                min: -4,
                max: 4
            },
            series: [{
                type: 'treemap',
                layoutAlgorithm: 'squarified',
                dataLabels: {
                    enabled: true,
                    useHTML: true,
                    formatter: function() {
                        const point = this.point;
                        const shapeArgs = point.shapeArgs || {};
                        const width = shapeArgs.width || 0;
                        const height = shapeArgs.height || 0;
                        const minDimension = Math.min(width, height);
                        const imgSize = Math.min(48, minDimension * 0.5);
                        const fontSize = Math.max(6, Math.min(14, minDimension / 8));
                        const [symbol, price, change] = point.name.split('|');

                        let content = `<img src="${point.image}" class="circle-img" style="width:${imgSize}px;height:${imgSize}px;object-fit:contain;">`;
                        
                        if (minDimension >= 60) {
                            content += `
                                <div style="font-weight:bold;font-size:${fontSize}px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;text-align:center;">${symbol}</div>
                                <div style="font-size:${fontSize * 0.9}px;text-align:center;">${price}</div>
                                <div style="font-size:${fontSize * 0.9}px;text-align:center;">${change}</div>
                            `;
                        }

                        return `<div style="width:${width}px;height:${height}px;display:flex;flex-direction:column;justify-content:center;align-items:center;overflow:hidden;padding:2px;box-sizing:border-box;">
                            ${content}
                        </div>`;
                    },
                    style: {
                        color: '#ffffff',
                        textOutline: 'none',
                    },
                    padding: 0,
                    allowOverlap: true
                },
                data: data
            }],
            title: {
                text: 'Nifty 50 Heatmap'
            },
            tooltip: {
                useHTML: true,
                formatter: function() {
                    const [symbol, price, change] = this.point.name.split('|');
                    return `<b>${symbol}</b><br/>Price: ${price}<br/>Change: ${change}`;
                },
                positioner: function(labelWidth, labelHeight, point) {
                    return {
                        x: point.plotX + 10,
                        y: point.plotY - labelHeight - 10
                    };
                }
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('container').innerHTML = 'Error loading data. Please check the console for details.';
    });