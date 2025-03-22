import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell } from 'recharts';

const ROASCalculator = () => {
  const [grossMargin, setGrossMargin] = useState(50);
  const [adSpend, setAdSpend] = useState(13000);
  const [roasTarget, setRoasTarget] = useState(3.0);
  const [sellingPrice, setSellingPrice] = useState(100);
  const [costOfGoods, setCostOfGoods] = useState(50);
  
  // Calculated values
  const [revenue, setRevenue] = useState(39000);
  const [cogs, setCogs] = useState(19500);
  const [profit, setProfit] = useState(6500);
  const [breakEvenRoas, setBreakEvenRoas] = useState(2.00);
  const [avgOrderValue, setAvgOrderValue] = useState(100);
  const [adSpendPerOrder, setAdSpendPerOrder] = useState(33.33);
  const [profitPerOrder, setProfitPerOrder] = useState(16.67);
  
  // Calculate all metrics when inputs change
  useEffect(() => {
    // Calculate gross margin based on selling price and cost
    const calculatedGrossMargin = ((sellingPrice - costOfGoods) / sellingPrice) * 100;
    setGrossMargin(calculatedGrossMargin);
    
    // Basic calculations
    const calculatedRevenue = adSpend * roasTarget;
    const calculatedCogs = calculatedRevenue * (1 - grossMargin / 100);
    const calculatedProfit = calculatedRevenue - calculatedCogs - adSpend;
    const calculatedBreakEvenRoas = 1 / (grossMargin / 100);
    
    // Order-based calculations
    const totalOrders = calculatedRevenue / avgOrderValue;
    const calculatedAdSpendPerOrder = adSpend / totalOrders;
    const calculatedCostOfGoodsSold = avgOrderValue * (1 - grossMargin / 100);
    const calculatedProfitPerOrder = avgOrderValue - calculatedCostOfGoodsSold - calculatedAdSpendPerOrder;
    
    // Update state with calculations
    setRevenue(calculatedRevenue);
    setCogs(calculatedCogs);
    setProfit(calculatedProfit);
    setBreakEvenRoas(calculatedBreakEvenRoas);
    setAdSpendPerOrder(calculatedAdSpendPerOrder);
    setProfitPerOrder(calculatedProfitPerOrder);
  }, [grossMargin, adSpend, roasTarget, avgOrderValue, sellingPrice, costOfGoods]);
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Data for revenue breakdown chart
  const revenueBreakdownData = [
    { name: 'Revenue', value: revenue, color: '#2e7d32' },
    { name: 'COGS', value: cogs, color: '#d32f2f' },
    { name: 'Ad Spend', value: adSpend, color: '#ff9800' },
    { name: 'Profit', value: profit, color: '#388e3c' }
  ];
  
  return (
    <div className="font-sans bg-gray-50 p-4">
      <div className="text-center mb-4">
        <div className="text-xs uppercase tracking-wide text-green-800 font-medium mb-1">MARKETING PROFITABILITY TOOLKIT</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Return on Ad Spend Calculator</h1>
        <p className="text-gray-600 text-sm mb-4 max-w-2xl mx-auto">
          Optimize your advertising strategy by calculating the profit contribution of your campaigns.
          <br />
          Adjust the parameters below to see how different variables affect your bottom line.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm mb-4">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800 mb-0">ROAS Calculator</h2>
          <p className="text-gray-600 text-sm m-0">Discover how your ad spend and gross margin impact your overall profitability</p>
        </div>
        
        <div className="bg-gray-50 rounded-md m-4 p-4">
          <h3 className="text-md font-medium text-gray-700 mb-4">Input Parameters</h3>
          
          <div className="mb-5">
            <div className="flex justify-between mb-1">
              <label className="text-gray-700">Gross Margin</label>
              <span className="font-medium">{Math.round(grossMargin)}%</span>
            </div>
            <div className="bg-green-100 h-2 w-full rounded-full overflow-hidden">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${grossMargin}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-5">
            <div className="flex justify-between mb-1">
              <label className="text-gray-700">Ad Spend</label>
              <span className="font-medium">₹{adSpend.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="50000000"
              step="10000"
              value={adSpend}
              onChange={(e) => setAdSpend(parseInt(e.target.value))}
              className="w-full cursor-pointer"
              style={{
                height: '2px',
                borderRadius: '4px',
                background: 'linear-gradient(to right, #4caf50, #a5d6a7)',
                WebkitAppearance: 'none'
              }}
            />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <label className="text-gray-700">ROAS Target</label>
              <span className="font-medium">{roasTarget.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={roasTarget}
              onChange={(e) => setRoasTarget(parseFloat(e.target.value))}
              className="w-full cursor-pointer"
              style={{
                height: '2px',
                borderRadius: '4px',
                background: 'linear-gradient(to right, #4caf50, #a5d6a7)',
                WebkitAppearance: 'none'
              }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-4 px-4 gap-4">
          <div className="p-0">
            <div className="text-gray-600 text-sm">Marginality Per Order</div>
            <div className="text-xl font-bold text-gray-800">{Math.round(grossMargin)}.00%</div>
            <div className="text-xs text-gray-500">Profit margin per order</div>
          </div>
          
          <div className="p-0">
            <div className="text-gray-600 text-sm">Monthly Profit</div>
            <div className="text-xl font-bold text-green-700">₹{Math.round(profit).toLocaleString()}</div>
            <div className="text-xs text-gray-500">Net profit per month</div>
          </div>
          
          <div className="p-0">
            <div className="text-gray-600 text-sm">Break-even ROAS</div>
            <div className="text-xl font-bold text-blue-600">{breakEvenRoas.toFixed(2)}x</div>
            <div className="text-xs text-gray-500">Minimum ROAS to be profitable</div>
          </div>
          
          <div className="p-0">
            <div className="text-gray-600 text-sm">Total Revenue</div>
            <div className="text-xl font-bold text-amber-500">₹{Math.round(revenue).toLocaleString()}</div>
            <div className="text-xs text-gray-500">Monthly revenue</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 px-4 mt-6 gap-4">
          <div className="p-0">
            <div className="text-gray-600 text-sm">Revenue</div>
            <div className="text-xl font-bold text-gray-800">₹{Math.round(revenue).toLocaleString()}</div>
          </div>
          
          <div className="p-0">
            <div className="text-gray-600 text-sm">COGS</div>
            <div className="text-xl font-bold text-red-600">₹{Math.round(cogs).toLocaleString()}</div>
          </div>
          
          <div className="p-0 bg-green-50 rounded-lg px-3 py-2">
            <div className="text-gray-600 text-sm">Profit Contribution</div>
            <div className="text-xl font-bold text-green-700">₹{Math.round(profit).toLocaleString()}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 px-4 mt-6 gap-8 mb-6">
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Revenue Breakdown</h4>
            <div className="h-48">
              <BarChart
                width={460}
                height={180}
                data={revenueBreakdownData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" tickFormatter={(value) => `₹${value.toLocaleString()}`} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fill: '#555', fontSize: 12 }}
                  width={100}
                />
                <Bar dataKey="value">
                  {revenueBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Per Order Breakdown</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-gray-700">Average Order Value</span>
                  <svg className="w-4 h-4 ml-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-900 font-medium">₹{Math.round(avgOrderValue)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Cost of Goods Sold</span>
                <span className="text-red-600 font-medium">₹{Math.round(avgOrderValue * (1 - grossMargin / 100))}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Ad Spend Per Order</span>
                <span className="text-amber-600 font-medium">₹{Math.round(adSpendPerOrder)}</span>
              </div>
              
              <div className="h-px bg-gray-200 my-3"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Profit Per Order</span>
                <span className="text-gray-900 font-medium">₹{Math.round(profitPerOrder)}</span>
              </div>
              
              <div className="mt-2">
                {profitPerOrder > 0 ? (
                  <span className="inline-block px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">Profitable</span>
                ) : (
                  <span className="inline-block px-3 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">Not Profitable</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-md p-4 mb-4 flex justify-between items-center">
        <span className="text-gray-600 text-sm">Adjust parameters to see how they affect your profitability metrics</span>
        <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm">
          Save Results
        </button>
      </div>

      <div className="flex p-2">
        <div className="flex flex-1 items-center">
          <label className="text-sm text-gray-700 mr-2">Ad Spend (₹):</label>
          <input 
            type="number" 
            className="w-32 border rounded px-2 py-1 text-sm" 
            value={adSpend}
            onChange={(e) => setAdSpend(Number(e.target.value))}
            min="10000"
            max="50000000"
            step="10000"
          />
        </div>
        <div className="flex flex-1 items-center">
          <label className="text-sm text-gray-700 mr-2">Selling Price (₹):</label>
          <input 
            type="number" 
            className="w-24 border rounded px-2 py-1 text-sm" 
            value={sellingPrice}
            onChange={(e) => setSellingPrice(Number(e.target.value))}
            min="1"
          />
        </div>
        <div className="flex flex-1 items-center">
          <label className="text-sm text-gray-700 mr-2">Cost of Goods (₹):</label>
          <input 
            type="number" 
            className="w-24 border rounded px-2 py-1 text-sm" 
            value={costOfGoods}
            onChange={(e) => setCostOfGoods(Number(e.target.value))}
            min="0"
            max={sellingPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default ROASCalculator;
