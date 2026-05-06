import React from 'react'

const ProductImages = [
  'https://assets.upstox.com/content/assets/images/news/investing-for-future.webp',
  'https://cardinsider.com/wp-content/uploads/2022/07/kotak-bank-corporate-gold-credit-card.png',
  'https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2024/03/04105350/maxresdefault-2.jpg'
]

export default function Products() {
  const products = [
    { 
      img: ProductImages[0], 
      title: 'Grow Your Wealth', 
      desc: 'Build your wealth with our range of investment options including Mutual Funds, FDs, and more.'
    },
    { 
      img: ProductImages[1], 
      title: 'Credit Cards', 
      desc: 'Choose from a range of credit cards with exciting rewards, cashback, and lifestyle benefits.'
    },
    { 
      img: ProductImages[2], 
      title: 'Loans', 
      desc: 'Quick approvals on Personal Loans, Home Loans, and Car Loans at competitive interest rates.', 
      features: ['Instant Personal Loan approval', 'Home Loan starting @ 8.50%', 'Car Loan with minimal documentation']
    }
  ]

  return (
    <div className="py-8 px-4">
      <h1 className="text-center text-[#c41e3a] text-[24px] font-bold mb-8">Our Products</h1>
      <div className="max-w-[900px] mx-auto">
        {products.map((product, index) => (
          <div key={index} className="mb-6 rounded-[15px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <img src={product.img} alt={product.title} className="w-full h-[200px] object-cover" />
            <div className="p-5">
              <h3 className="text-[#c41e3a] text-[20px] font-bold mb-3">{product.title}</h3>
              <p className="text-gray-600 mb-3">{product.desc}</p>
              {product.features && (
                <ul className="ml-5 text-[14px] text-gray-600">
                  {product.features.map((feature, i) => (
                    <li key={i} className="mt-2 list-disc">{feature}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
