import React from 'react';
import { realEstateTips, marketTrends } from '../assets/constants';


const BlogNewsSection = () => {
  return (
    <section className="bg-gray-100 py-12 mx-14">
      <div className="container mx-auto px-4 grid grid-cols-2">
        {/* Real Estate Tips */}
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold mb-4">Real Estate Tips</h2>
          <p className="text-lg text-gray-600 mb-6">
            Get valuable tips and insights for buying, selling, or renting properties.
          </p>
          <ul className="list-disc pl-5 space-y-4">
            {realEstateTips.map((tip, index) => (
              <li key={index} className="text-lg">
                <a href={tip.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {tip.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Market Trends */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4">Market Trends</h2>
          <p className="text-lg text-gray-600 mb-6">
            Stay updated with the latest trends and insights in the real estate market.
          </p>
          <ul className="list-disc pl-5 space-y-4">
            {marketTrends.map((trend, index) => (
              <li key={index} className="text-lg">
                <a href={trend.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {trend.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BlogNewsSection;
