// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import Title from '../components/Title';
// import ProductItem from '../components/ProductItem';
// import LoadingWrapper from '../components/LoadingWrapper'




// const Collection = () => {
//   const { products, search, showSearch } = useContext(ShopContext);
//   const [showFilters, setShowFilters] = useState(false);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState('');
//   const [sortType, setSortType] = useState('relavent');

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading delay
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const toggleCategory = (e) => {
//     setCategory(e.target.value);
//   };

//   const applyFilter = () => {
//     let productCopy = products.slice();

//     if (showSearch && search.length) {
//       productCopy = productCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
//     }

//     if (category) {
//       productCopy = productCopy.filter(item => item.category === category);
//     }

//     setFilterProducts(productCopy);
//   };

//   const sortProduct = () => {
//     let fpCopy = filterProducts.slice();
//     switch (sortType) {
//       case 'low-high':
//         setFilterProducts([...fpCopy].sort((a, b) => a.price - b.price));
//         break;

//       case 'high-low':
//         setFilterProducts([...fpCopy].sort((a, b) => b.price - a.price));
//         break;

//       default:
//         applyFilter();
//         break;
//     }
//   };

//   useEffect(() => {
//     sortProduct();
//   }, [sortType]);

//   useEffect(() => {
//     applyFilter();
//   }, [category, search, showSearch, products]);

//   return (
//   <LoadingWrapper isLoading={loading}>
//     <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
//       {/* Filter options */}
//       <div className="min-w-60">
//         <p
//           onClick={() => setShowFilters(!showFilters)}
//           className="my-2 text-xl flex items-center cursor-pointer gap-2"
//         >
//           FILTERS
//           <img
//             className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''} sm:block`}
//             src={assets.dropdown_icon}
//             alt="Filter Icon"
//           />
//         </p>

//         {/* Category Filter */}
//         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block`}>
//           <p className="mb-3 text-sm font-medium">CATEGORIES</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             <label className="flex gap-2">
//               <input className="w-3" type="radio" value="ALL" onChange={toggleCategory} name="category" /> ALL
//             </label>
//             <label className="flex gap-2">
//               <input className="w-3" type="radio" value="SOLAR PANELS" onChange={toggleCategory} name="category" /> SOLAR PANELS
//             </label>
//             <label className="flex gap-2">
//               <input className="w-3" type="radio" value="INVERTERS" onChange={toggleCategory} name="category" /> INVERTERS
//             </label>
//             <label className="flex gap-2">
//               <input className="w-3" type="radio" value="BATTERIES" onChange={toggleCategory} name="category" /> BATTERIES
//             </label>
//             <label className="flex gap-2">
//               <input className="w-3" type="radio" value="PARTS" onChange={toggleCategory} name="category" /> PARTS
//             </label>
//             <label className="flex gap-2">
//               <input className="w-3" type="radio" value="INSTALLATION PACKAGES" onChange={toggleCategory} name="category" /> INSTALLATION PACKAGES
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* Right Side */} 
//       <div className="flex-1">
//         <div className="flex justify-between text-base sm:text-2xl mb-4">
//           <Title text1={'ALL'} text2={'COLLECTION'} />

//           {/* Product Sort */}
//           <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
//             <option value="relavent">Sort by: Relevant</option>
//             <option value="low-high">Sort by: Low to High</option>
//             <option value="high-low">Sort by: High to Low</option>
//           </select>
//         </div>

//         {/* Product Map */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
//           {filterProducts.map((item, index) => (
//             <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
//           ))}
//         </div>
//       </div>
//     </div>
//   </LoadingWrapper>

//   );
// };

// export default Collection;

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import LoadingWrapper from '../components/LoadingWrapper';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sortType, setSortType] = useState('relavent');

  const [loading, setLoading] = useState(true);

  // Track child components ready
  const [componentsLoaded, setComponentsLoaded] = useState(false);

  // Category toggle
  const toggleCategory = (e) => {
    setCategory(e.target.value);
  };

  // Apply filters
  const applyFilter = () => {
    let productCopy = products.slice();

    if (showSearch && search.length) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category && category !== 'ALL') {
      productCopy = productCopy.filter((item) => item.category === category);
    }

    setFilterProducts(productCopy);
  };

  // Sort products
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts([...fpCopy].sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts([...fpCopy].sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  // Apply sorting when sortType changes
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // Apply filters whenever dependencies change
  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, products]);

  // Stop loading when filterProducts is ready
  useEffect(() => {
    if (filterProducts.length || products.length === 0) {
      setComponentsLoaded(true);
    }
  }, [filterProducts, products]);

  useEffect(() => {
    if (componentsLoaded) {
      setLoading(false);
    }
  }, [componentsLoaded]);

  return (
    <LoadingWrapper isLoading={loading}>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        {/* Filter options */}
        <div className="min-w-60">
          <p
            onClick={() => setShowFilters(!showFilters)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            FILTERS
            <img
              className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''} sm:block`}
              src={assets.dropdown_icon}
              alt="Filter Icon"
            />
          </p>

          {/* Category Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block`}>
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <label className="flex gap-2">
                <input className="w-3" type="radio" value="ALL" onChange={toggleCategory} name="category" /> ALL
              </label>
              <label className="flex gap-2">
                <input className="w-3" type="radio" value="SOLAR PANELS" onChange={toggleCategory} name="category" /> SOLAR PANELS
              </label>
              <label className="flex gap-2">
                <input className="w-3" type="radio" value="INVERTERS" onChange={toggleCategory} name="category" /> INVERTERS
              </label>
              <label className="flex gap-2">
                <input className="w-3" type="radio" value="BATTERIES" onChange={toggleCategory} name="category" /> BATTERIES
              </label>
              <label className="flex gap-2">
                <input className="w-3" type="radio" value="PARTS" onChange={toggleCategory} name="category" /> PARTS
              </label>
              <label className="flex gap-2">
                <input className="w-3" type="radio" value="INSTALLATION PACKAGES" onChange={toggleCategory} name="category" /> INSTALLATION PACKAGES
              </label>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1={'ALL'} text2={'COLLECTION'} />

            {/* Product Sort */}
            <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Product Map */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))}
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default Collection;