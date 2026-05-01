


import { useState } from "react";


import {
    Info,
    Image,
    Star,
    Send,
    Trash2,
    Plus,
    Hash,

    AlignLeft,
    Tag,
    Upload,

    Link,
    CheckCircle2,
    Folder
} from 'lucide-react';




import api from "../../Service/api";





const Form = () => {

    const [Form, setForm] = useState({
        id: "",
        name: "",
        thumbnailimage: "",
        description: "",
        category: "",
        href: "",
        screenshots: [""],
        Features: [
            {
                title: "",
                caption: "",
                image: ""
            }
        ],
    });




    // input change
    const handleChange = (e) => {
        setForm({ ...Form, [e.target.name]: e.target.value });
    };




    // screenshots
    const handleScreenshotChange = (idx, value) => {
        const updated = [...Form.screenshots];
        updated[idx] = value;
        setForm({ ...Form, screenshots: updated });
    };




    const addScreenshot = () => {
        setForm({ ...Form, screenshots: [...Form.screenshots, ""] });
    };




    const removeScreenshot = (idx) => {
        const filtered = Form.screenshots.filter((_, i) => i !== idx);
        setForm({ ...Form, screenshots: filtered });
    };




    // features
    const handleFeatureChange = (idx, field, value) => {
        const updated = [...Form.Features];
        updated[idx][field] = value;
        setForm({ ...Form, Features: updated });
    };



    const addFeature = () => {
        setForm({
            ...Form,
            Features: [...Form.Features, { title: "", caption: "", image: "" }],
        });
    };





    const removeFeature = (idx) => {
        const filtered = Form.Features.filter((_, i) => i !== idx);
        setForm({ ...Form, Features: filtered });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {


            const formData = new FormData();


            formData.append("id", Form.id);
            formData.append("name", Form.name);
            formData.append("category", Form.category);
            formData.append("href", Form.href);
            formData.append("description", Form.description);


            formData.append("screenshots", JSON.stringify(Form.screenshots));
            formData.append("Features", JSON.stringify(Form.Features));


            if (Form.thumbnailimage) {
                formData.append("image", Form.thumbnailimage);
            }

            const { data } = await api.post("/api/projects/add", formData);

            console.log("Response:", data);

            if (data.success) {
                alert("Project saved successfully");

                setForm({
                    id: "",
                    name: "",
                    thumbnailimage: "",
                    description: "",
                    category: "",
                    href: "",
                    screenshots: [""],
                    Features: [
                        { title: "", caption: "", image: "" }
                    ],
                });
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };







    return (




        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">

            <div className="max-w-5xl mx-auto">



                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                        <span className="tracking-wide">FORMS</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-500">project data</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-light text-gray-800 tracking-tight">
                        Project <span className="font-medium">Data</span>
                    </h1>
                    <div className="w-12 h-0.5 bg-gray-400 mt-2"></div>
                </div>





                <form onSubmit={handleSubmit} className="space-y-6">






                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all hover:shadow-md hover:border-gray-300">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                            <Info className="w-4 h-4 text-gray-400" />
                            <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Basic Information</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">ID</label>
                                <div className="relative group">
                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-hover:text-gray-500 transition" />
                                    <input
                                        name="id"
                                        placeholder="id...."
                                        value={Form.id}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-all group-hover:border-gray-300"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">Name</label>
                                <div className="relative group">
                                    <Folder className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-hover:text-gray-500 transition" />
                                    <input
                                        name="name"
                                        placeholder="Name of Platform"
                                        value={Form.name}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-all group-hover:border-gray-300"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-xs text-gray-500">Thumbnail</label>
                                <div className="relative group">
                                    <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-hover:text-gray-500 transition" />
                                    <input
                                        type="file"
                                        onChange={(e) => setForm({ ...Form, thumbnailimage: e.target.files[0] })}
                                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-gray-800 file:text-white hover:file:bg-black transition-all group-hover:border-gray-300"
                                    />
                                </div>
                                {Form.thumbnailimage && (
                                    <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3 text-gray-600" /> {Form.thumbnailimage.name}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">Category</label>
                                <div className="relative group">
                                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-hover:text-gray-500 transition" />
                                    <input
                                        name="category"
                                        placeholder="Web / Mobileapp"
                                        value={Form.category}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-all group-hover:border-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">URL(href)</label>
                                <div className="relative group">
                                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-hover:text-gray-500 transition" />
                                    <input
                                        name="href"
                                        placeholder="https://..."
                                        value={Form.href}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-all group-hover:border-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-xs text-gray-500">Description</label>
                                <div className="relative group">
                                    <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-gray-300 group-hover:text-gray-500 transition" />
                                    <textarea
                                        name="description"
                                        placeholder="Overview of the project..."
                                        value={Form.description}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-all group-hover:border-gray-300 resize-y"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>






                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all hover:shadow-md hover:border-gray-300">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                            <Image className="w-4 h-4 text-gray-400" />
                            <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Screenshots</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-3">
                                {Form.screenshots.map((url, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row gap-3 group/item">
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                value={url}
                                                onChange={(e) => handleScreenshotChange(idx, e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-all hover:border-gray-300"
                                            />
                                        </div>
                                        {Form.screenshots.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeScreenshot(idx)}
                                                className="text-gray-400 hover:text-red-500 transition flex items-center gap-1 text-sm justify-center sm:justify-start"
                                            >
                                                <Trash2 className="w-4 h-4" /> Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addScreenshot}
                                    className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
                                >
                                    <Plus className="w-4 h-4" /> Add screenshot
                                </button>
                            </div>
                        </div>
                    </div>





                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all hover:shadow-md hover:border-gray-300">

                        
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                            <Star className="w-4 h-4 text-gray-400" />
                            <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Features</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {Form.Features.map((feat, idx) => (
                                    <div key={idx} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-all">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-gray-400 block mb-1">Title</label>
                                                <input
                                                    placeholder="Real-time sync"
                                                    value={feat.title}
                                                    onChange={(e) => handleFeatureChange(idx, "title", e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-all hover:border-gray-300"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-400 block mb-1">Caption</label>
                                                <input
                                                    placeholder="Short description"
                                                    value={feat.caption}
                                                    onChange={(e) => handleFeatureChange(idx, "caption", e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-all hover:border-gray-300"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="text-xs text-gray-400 block mb-1">Image URL</label>
                                                <input
                                                    placeholder="https://..."
                                                    value={feat.image}
                                                    onChange={(e) => handleFeatureChange(idx, "image", e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-all hover:border-gray-300"
                                                />
                                            </div>
                                        </div>
                                        {Form.Features.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(idx)}
                                                className="mt-3 text-xs text-gray-400 hover:text-red-500 transition flex items-center gap-1"
                                            >
                                                <Trash2 className="w-3 h-3" /> Remove feature
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
                                >
                                    <Plus className="w-4 h-4" /> Add feature
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            className="group px-8 py-3 bg-gray-900 text-white rounded-xl font-medium flex items-center gap-2 transition-all hover:bg-black hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            Submit Project
                        </button>
                    </div>



                </form>



            </div>
        </div>








    );



};






export default Form;