
import { useEffect, useState } from "react";
import api from "../../Service/api";


import {
    Trash2,
    Edit3,
    X,
    Image,
    Star,
    Link as LinkIcon,

    Hash,
    AlignLeft,
    Tag,

    Save
} from 'lucide-react';





const Projects = () => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // full edit state
    const [editData, setEditData] = useState({
        id: "",
        name: "",
        thumbnailimage: "",
        description: "",
        category: "",
        href: "",
        screenshots: [],
        Features: []
    });

    // GET ALL PROJECTS
    const getProjects = async () => {
        try {
            const { data } = await api.get("/api/projects");
            setProjects(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        getProjects();

        
    }, []);

    // DELETE
    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/projects/delete/${id}`);
            setProjects((prev) => prev.filter((item) => item._id !== id));
            alert("Project Deleted");
        } catch (error) {
            console.log(error);
        }
    };

    // OPEN MODAL (FULL DATA)
    const openUpdateModal = (item) => {
        setSelectedId(item._id);

        setEditData({
            id: item.id,
            name: item.name,
            thumbnailimage: item.thumbnailimage,
            description: item.description,
            category: item.category,
            href: item.href,
            screenshots: item.screenshots || [],
            Features: item.Features || []
        });

        setShowModal(true);
    };

    // INPUT CHANGE
    const handleChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        });
    };

    // SCREENSHOT CHANGE
    const handleScreenshotChange = (idx, value) => {
        const updated = [...editData.screenshots];
        updated[idx] = value;
        setEditData({ ...editData, screenshots: updated });
    };

    // FEATURE CHANGE
    const handleFeatureChange = (idx, field, value) => {
        const updated = [...editData.Features];
        updated[idx][field] = value;
        setEditData({ ...editData, Features: updated });
    };

    // UPDATE API
    const handleUpdate = async () => {
        try {
            await api.put(`/api/projects/update/${selectedId}`, editData);

            alert("Project Updated Successfully");

            setShowModal(false);
            getProjects();

        } catch (error) {
            console.log(error);
        }
    };

    return (




        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-light text-gray-800 tracking-tight">
                        My <span className="font-medium">Projects</span>
                    </h1>
                    <div className="w-12 h-0.5 bg-gray-400 mt-2"></div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-pulse text-gray-500">Loading projects...</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:gap-8">
                        {projects.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:shadow-md hover:border-gray-300"
                            >

                                {item.thumbnailimage && (
                                    <div className="w-full h-48 md:h-56 overflow-hidden bg-gray-100">
                                        <img
                                            src={item.thumbnailimage}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                                        />
                                    </div>
                                )}


                                <div className="p-5">

                                    <div className="flex justify-between items-start gap-3 flex-wrap">
                                        <div>
                                            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{item.name}</h2>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Tag className="w-3.5 h-3.5 text-gray-400" />
                                                <span className="text-sm text-gray-500">{item.category || 'Uncategorized'}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openUpdateModal(item)}
                                                className="group flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all"
                                            >
                                                <Edit3 className="w-3.5 h-3.5 group-hover:rotate-6 transition" />
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="group flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all"
                                            >
                                                <Trash2 className="w-3.5 h-3.5 group-hover:scale-105 transition" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>



                                    {item.description && (
                                        <div className="mt-4 flex items-start gap-2 text-gray-600">
                                            <AlignLeft className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                                            <p className="text-sm leading-relaxed">{item.description}</p>
                                        </div>
                                    )}


                                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 border-t border-gray-100 pt-3">
                                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                            <Hash className="w-3 h-3" />
                                            <span className="font-mono">{item.id}</span>
                                        </div>
                                        {item.href && (
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded hover:text-gray-700 transition"
                                            >
                                                <LinkIcon className="w-3 h-3" />
                                                <span className="truncate max-w-[200px]">{item.href}</span>
                                            </a>
                                        )}
                                    </div>


                                    {item.screenshots?.length > 0 && (
                                        <div className="mt-5">
                                            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                                                <Image className="w-3.5 h-3.5" /> Screenshots ({item.screenshots.length})
                                            </h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                                {item.screenshots.map((img, i) => (
                                                    <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                                        <img
                                                            src={img}
                                                            alt={`Screenshot ${i + 1}`}
                                                            className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}


                                    {item.Features?.length > 0 && (
                                        <div className="mt-5">
                                            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                                                <Star className="w-3.5 h-3.5" /> Features ({item.Features.length})
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {item.Features.map((f, i) => (
                                                    <div key={i} className="border border-gray-100 rounded-lg p-3 bg-gray-50/30 hover:bg-gray-50 transition">
                                                        <h4 className="font-medium text-gray-800 text-sm">{f.title}</h4>
                                                        {f.caption && <p className="text-xs text-gray-500 mt-0.5">{f.caption}</p>}
                                                        {f.image && (
                                                            <div className="mt-2 w-full h-24 rounded-md overflow-hidden border border-gray-100">
                                                                <img src={f.image} alt={f.title} className="w-full h-full object-cover" />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}


                {showModal && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg border border-gray-200">

                            <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-3 flex justify-between items-center">
                                <h2 className="text-base font-medium text-gray-800">Update Project</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-600 transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>




                            <div className="p-5 space-y-4" >




                                <div className="space-y-3">
                                    <input
                                        name="id"
                                        value={editData.id}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                                        placeholder="ID"
                                    />
                                    <input
                                        name="name"
                                        value={editData.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                                        placeholder="Name"
                                    />
                                    <input
                                        name="thumbnailimage"
                                        value={editData.thumbnailimage}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                                        placeholder="Thumbnail URL"
                                    />
                                    <input
                                        name="category"
                                        value={editData.category}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                                        placeholder="Category"
                                    />
                                    <input
                                        name="href"
                                        value={editData.href}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                                        placeholder="URL (href)"
                                    />
                                    <textarea
                                        name="description"
                                        value={editData.description}
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                                        placeholder="Description"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-xs font-semibold text-gray-500 mb-1">Screenshots</h3>
                                    {editData.screenshots.map((img, i) => (
                                        <input
                                            key={i}
                                            value={img}
                                            onChange={(e) => handleScreenshotChange(i, e.target.value)}
                                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg mb-1"
                                            placeholder={`Screenshot ${i + 1} URL`}
                                        />
                                    ))}
                                </div>


                                <div>
                                    <h3 className="text-xs font-semibold text-gray-500 mb-1">Features</h3>
                                    {editData.Features.map((f, i) => (
                                        <div key={i} className="border border-gray-100 rounded-lg p-2 mb-2 bg-gray-50">
                                            <input
                                                value={f.title}
                                                onChange={(e) => handleFeatureChange(i, "title", e.target.value)}
                                                className="w-full px-2 py-1 text-sm border border-gray-200 rounded mb-1"
                                                placeholder="Title"
                                            />
                                            <input
                                                value={f.caption}
                                                onChange={(e) => handleFeatureChange(i, "caption", e.target.value)}
                                                className="w-full px-2 py-1 text-sm border border-gray-200 rounded mb-1"
                                                placeholder="Caption"
                                            />
                                            <input
                                                value={f.image}
                                                onChange={(e) => handleFeatureChange(i, "image", e.target.value)}
                                                className="w-full px-2 py-1 text-sm border border-gray-200 rounded"
                                                placeholder="Image URL"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>




                            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 py-3 flex justify-end gap-2">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="px-3 py-1.5 text-sm bg-gray-800 text-white rounded-lg hover:bg-black flex items-center gap-1"
                                >
                                    <Save className="w-3.5 h-3.5" /> Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>













    );
};

export default Projects;