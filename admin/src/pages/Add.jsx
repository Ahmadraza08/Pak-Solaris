import React, { useState } from 'react';
import { assets } from '../assets/assets.js';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
    const [image2, setImage2] = useState(false);
    const [image1, setImage1] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [bestseller, setBestseller] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("bestseller", bestseller);

            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message);
                setName('');
                setDescription('');
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setPrice('');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div className='mb-2'>
                <p>Upload Image</p>
                <div className='flex gap-2'>
                    {[setImage1, setImage2, setImage3, setImage4].map((setImage, index) => (
                        <label key={index} htmlFor={`image${index + 1}`}>
                            <img className='w-20' src={!eval(`image${index + 1}`) ? assets.upload_area : URL.createObjectURL(eval(`image${index + 1}`))} alt="" />
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id={`image${index + 1}`} hidden />
                        </label>
                    ))}
                </div>
            </div>

            <div className='w-full'>
                <p className='mb-2'>Product Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Product Description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
            </div>

            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <p className='mb-2 text-base font-normal'>Product Category</p>
                <label className="flex gap-2">
                    <input
                        className="w-3"
                        type="radio"
                        value="SOLAR PANELS"
                        onChange={(e) => setCategory(e.target.value)}
                        checked={category === "SOLAR PANELS"}
                        name="category"
                    />
                    SOLAR PANELS
                </label>
                <label className="flex gap-2">
                    <input
                        className="w-3"
                        type="radio"
                        value="INVERTERS"
                        onChange={(e) => setCategory(e.target.value)}
                        checked={category === "INVERTERS"}
                        name="category"
                    />
                    INVERTERS
                </label>
                <label className="flex gap-2">
                    <input
                        className="w-3"
                        type="radio"
                        value="BATTERIES"
                        onChange={(e) => setCategory(e.target.value)}
                        checked={category === "BATTERIES"}
                        name="category"
                    />
                    BATTERIES
                </label>
                <label className="flex gap-2">
                    <input
                        className="w-3"
                        type="radio"
                        value="PARTS"
                        onChange={(e) => setCategory(e.target.value)}
                        checked={category === "PARTS"}
                        name="category"
                    />
                    PARTS
                </label>
                <label className="flex gap-2">
                    <input
                        className="w-3"
                        type="radio"
                        value="INSTALLATION PACKAGES"
                        onChange={(e) => setCategory(e.target.value)}
                        checked={category === "INSTALLATION PACKAGES"}
                        name="category"
                    />
                    INSTALLATION PACKAGES
                </label>
            </div>

            <div>
                <p className='mb-2'>Product Price</p>
                <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='1000' required />
            </div>

            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestseller(prev => !prev)} type="checkbox" checked={bestseller} id='bestseller' />
                <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
            </div>

            <button
                type='submit'
                className='w-28 py-3 mt-4 bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={loading}
            >
                {loading ? "Adding..." : "ADD"}
            </button>
        </form>
    );
};

export default Add;

